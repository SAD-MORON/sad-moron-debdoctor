# DebDoctor — candidato web local

**Secretaría de Asuntos Docentes de Morón — Provincia de Buenos Aires**

Prototipo documental de consulta en versión de revisión. No publicado y sin integración con 5650, Apps Script o sistemas operativos. El proyecto tiene un repositorio Git local sin commits, staging ni remoto configurado.

## Uso

Desde la carpeta del candidato:

`python3 -m http.server 8080 --directory web`

Abrir `http://localhost:8080`. Requiere servidor local porque usa módulos JavaScript y carga un JSON. No requiere instalar dependencias, claves ni cuentas. Después de cargar los archivos locales, únicamente los enlaces de fuente abren sitios externos cuando el usuario los elige.

## Contenido

- `web/`: sitio estático; catálogo, filtros, fichas, mapa y metodología.
- `data/catalogo-inicial.json`: proyección estructurada del Excel. Es una referencia inicial, no una consolidación jurídica.
- `web/data.json`: copia de distribución del catálogo. Regenerar desde `data/catalogo-inicial.json` cuando cambie, preservando una fuente canónica.
- `data/provenance.json`: procedencia y hash del Excel utilizado.
- `docs/MODELO_VERSIONADO.md`: diseño propuesto, no base histórica implementada.
- `.gitignore`: exclusiones básicas propuestas.
- `.github/workflows/pages.yml`: preparación manual y acotada de GitHub Pages; valida y distribuye únicamente `web/`.

El README existente en la Mac debe preservarse. Este paquete aporta documentación complementaria.

## Alcance y límites

Hay 43 fichas, incluyendo normas, instrumentos y categorías por completar. Los enlaces se conservaron del Excel. No se afirma haber comprobado de nuevo la disponibilidad de todos los destinos. Las descripciones son síntesis de trabajo. No hay estados denominados vigente o consolidado sin prueba.

Las fichas de jurisprudencia y de actos individuales representan categorías; no son fallos ni actos individuales localizados. Los documentos del Drive aportado se inventariaron por nombre. La copia de Resolución 2672/15 estaba pendiente de recuperación/cotejo: el prototipo no habilita su enlace fallido.

La identidad institucional fue indicada por el responsable humano y no acredita consolidación jurídica del catálogo. Incluye marca visible de revisión y robots `noindex,nofollow`; esto último evita indexación cooperativa, no es un control de acceso. No hay despliegue remoto.

No hay carga de documentos, cuenta, administración, formularios de denuncias, analítica, datos personales ni consultas jurídicas automáticas. La consulta por fecha no está implementada: requiere consolidación y validación de intervalos de vigencia. Los filtros por ámbito son una clasificación de navegación preliminar; no determinan aplicabilidad jurídica.

## Gobernanza local

DebDoctor hereda principios de gobernanza de Janus Core a través de `SAD-MORON-FRAMEWORK`. El workflow preparado no configura un remoto, no activa Pages y no autoriza publicación. `documentos/` y `fuentes/` se conservan localmente fuera del conjunto propuesto para Git.

## Revisión previa a publicación

Comprobar textos, permisos de fuentes, fechas, relaciones y encuadre institucional; obtener una revisión jurídica/documental independiente del candidato exacto. Acordar audiencia, responsabilidad editorial y procedimiento de correcciones. Una vista de navegador o un test técnico no valida el contenido jurídico.
