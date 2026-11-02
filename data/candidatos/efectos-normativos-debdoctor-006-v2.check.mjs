import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const candidatePath = new URL("./efectos-normativos-debdoctor-006-v2.json", import.meta.url);
const catalogPath = new URL("../catalogo-inicial.json", import.meta.url);

const [candidateText, catalogText] = await Promise.all([
  readFile(candidatePath, "utf8"),
  readFile(catalogPath, "utf8")
]);
const candidate = JSON.parse(candidateText);
const catalog = JSON.parse(catalogText);

assert.equal(candidate.schema_version, "2.0.0");
assert.equal(candidate.candidate, true);
assert.equal(candidate.candidate_status, "CANDIDATE_NOT_APPROVED");
assert.equal(candidate.canonical_catalog_modified, false);
assert.equal(candidate.published_web_modified, false);
assert.equal(candidate.consolidated_validity_declared, false);
assert.equal(candidate.derived_from.availability, "LOCAL_UNPUBLISHED");
assert.equal(candidate.derived_from.sha256, "fb485422b12a1789f0ee9589199d157a131207927b5fddea333d81acb59810dd");

assert.equal(candidate.relations.length, 21);
assert.equal(candidate.relations.filter(r => r.verification === "VERIFIED").length, 16);
assert.equal(candidate.relations.filter(r => r.verification === "UNKNOWN").length, 5);
const expectedIds = [
  "REL-001", "REL-002", "REL-003", "REL-004", "REL-005", "REL-006",
  "REL-007", "REL-008", "REL-009", "REL-010", "REL-011", "REL-012",
  "REL-013", "REL-014", "REL-015", "REL-016",
  "REL-U01", "REL-U02", "REL-U03", "REL-U04", "REL-U05"
];
assert.deepEqual(
  candidate.relations.map(r => r.id).sort(),
  expectedIds.sort(),
  "La identidad de relaciones cambió"
);

const sourceIds = new Set(candidate.sources.map(s => s.id));
const normIds = new Set(candidate.norms.map(n => n.id));
for (const relation of candidate.relations) {
  assert.equal(relation.effective_date, null);
  assert.equal(relation.effective_date_status, "UNKNOWN");
  assert.ok(["VERIFIED", "INFERRED", "UNKNOWN"].includes(relation.interpretation_status));
  assert.ok(["VERIFIED", "INFERRED", "UNKNOWN"].includes(relation.scope_status));
  assert.equal(typeof relation.source_disposition, "string");
  assert.ok(relation.source_ids.every(id => sourceIds.has(id)));
  if (relation.origin_id !== null) assert.ok(normIds.has(relation.origin_id));
  if (relation.affected_id !== null) assert.ok(normIds.has(relation.affected_id));
}

const reorganizations = candidate.relations.filter(r => r.interpreted_effect === "REORGANIZACION" && r.verification === "VERIFIED");
assert.equal(reorganizations.length, 8);
for (const relation of reorganizations) {
  assert.equal(relation.literal_action, "MODIFICAR");
  assert.equal(relation.interpretation_status, "INFERRED");
  assert.equal(relation.scope, "PARCIAL_ESTRUCTURAL");
  assert.equal(relation.scope_status, "INFERRED");
}

const leavesWithoutEffect = candidate.relations.filter(r => r.interpreted_effect === "DEJA_SIN_EFECTO");
assert.equal(leavesWithoutEffect.length, 3);
assert.ok(leavesWithoutEffect.every(r => r.literal_action === "DEJAR_SIN_EFECTO"));
assert.ok(leavesWithoutEffect.every(r => !r.interpreted_effect.startsWith("DEROGACION")));

const unknown = candidate.relations.filter(r => r.verification === "UNKNOWN");
assert.ok(unknown.every(r => r.effective_date === null && r.effective_date_status === "UNKNOWN"));
assert.ok(unknown.every(r => r.interpretation_status === "UNKNOWN"));
assert.ok(unknown.every(r => r.scope_status === "UNKNOWN"));

const ley10614 = candidate.relations.find(r => r.id === "REL-006");
assert.equal(ley10614.affected_provision, null);
assert.equal(ley10614.scope, "UNKNOWN");
assert.match(ley10614.pending, /No completar artículos/);

const catalogIds = new Set((Array.isArray(catalog) ? catalog : catalog.records ?? catalog.items ?? catalog.normas ?? []).map(item => item.id));
for (const norm of candidate.norms.filter(n => n.catalog_id !== null)) {
  assert.ok(catalogIds.has(norm.catalog_id), `ID de catálogo inexistente: ${norm.catalog_id}`);
}

assert.equal(candidate.document_conflicts.length, 2);
assert.ok(candidate.document_conflicts.every(c => c.status === "CONFLICT"));

console.log("PASS: v2 conserva 21 relaciones (16 VERIFIED, 5 UNKNOWN), separa literal/interpretación/alcance y no integra producción.");
