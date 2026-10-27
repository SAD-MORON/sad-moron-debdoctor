# DebDoctor

**Secretaría de Asuntos Docentes de Morón — Provincia de Buenos Aires**

DebDoctor es una base documental versionada centrada en el Estatuto del
Docente bonaerense. Está preparada como módulo propio de SAD Morón Sistemas y
podrá alimentar a 5650 u otros sistemas mediante integraciones futuras,
separadas y gobernadas.

Es un desarrollo de la Secretaría de Asuntos Docentes de Morón, en el ámbito
de la Dirección General de Cultura y Educación de la Provincia de Buenos
Aires.

Su propósito es facilitar el acceso a las fuentes normativas y la comprensión
de sus relaciones mediante un buscador, fichas documentales y un mapa
interactivo con la Ley 10.579 como eje.

Esta es una **versión de revisión**. El catálogo contiene 69 referencias,
incluido el módulo candidato sobre ascensos y funciones jerárquicas del
artículo 75, y pendientes de cotejo; no constituye un digesto exhaustivo, un
texto jurídicamente consolidado ni asesoramiento sobre casos individuales. La
consulta histórica todavía no está implementada y la cobertura del
nomenclador de enfermedades continúa siendo parcial.

## Web de consulta

[Acceder a DebDoctor](https://sad-moron.github.io/sad-moron-debdoctor/).

La primera publicación se realizó el 26/10/2026 desde el commit
`3f00390e823c4c1b5e7884ce624ec2879dd9caba`. El catálogo permanece en revisión.
El mapa candidato contiene 37 nodos: 35 con identificación verificada,
24 conexiones verificadas, 19 pendientes y ninguna versión completamente
reconstruida. Los estados se refieren a la evidencia registrada, no a una
certificación de vigencia.

## Créditos

**Desarrollo colaborativo:** Débora Vigne y Martín N. Sánchez Morales<br>
**Gestión:** Claudia Capineri

Esta atribución reconoce la participación en el proyecto. No implica aprobación
jurídica automática de las normas, relaciones ni conclusiones documentales del
catálogo.

## Ejecución local

No requiere instalar dependencias:

```sh
node check.mjs
node --check web/app.mjs
python3 -m http.server 8080 --directory web
```

Luego abrir `http://127.0.0.1:8080/`.

## Consulta disponible

- Búsqueda por tema, número de norma y palabras.
- Fichas con fuentes, relaciones y pendientes documentales.
- Árbol de navegación con ramas expandibles, zoom y desplazamiento.
- Relaciones jurídicas visibles al seleccionar una norma.
- Lista accesible equivalente al mapa gráfico.
- Módulo específico del artículo 75 con catálogo integrado, árbol navegable y
  recorrido autoformativo sin acreditación ni puntaje.

Las agrupaciones del árbol facilitan la navegación; no establecen por sí
mismas una jerarquía o relación jurídica. Las síntesis documentales no
sustituyen las fuentes oficiales ni el análisis de cada situación concreta.

## Estructura

- `web/`: sitio estático y único contenido destinado al artefacto de GitHub
  Pages.
- `data/`: catálogo canónico inicial y registro de procedencia.
- `docs/`: diseño, límites, verificación y gobernanza documental.
- `documentos/`: matrices de trabajo locales; su contenido se excluye de Git.
- `fuentes/`: documentos originales locales; su contenido se excluye de Git.
- `check.mjs`: comprobaciones deterministas previas a publicación.
- `sync-data.mjs`: proyección controlada de los datos canónicos hacia `web/`.

## Procedencia

`data/provenance.json` registra el nombre y la huella SHA-256 del Excel de
origen. `data/catalogo-inicial.json` es la referencia estructurada y
`web/data.json` es su copia de distribución. `data/articulo-75.json` conserva
el inventario SHA-256 de 25 documentos, sus relaciones candidatas y el
recorrido formativo; `web/ascensos/data.json` es su proyección. Los PDF y el
ZIP originales se conservan localmente en `fuentes/` y no se distribuyen. ABC / DGCyE, Normas GBA,
el Boletín Oficial provincial, Argentina.gob.ar y cualquier otra fuente
oficial requieren identificación, cotejo y control de versiones antes de
respaldar una afirmación de vigencia o consolidación.

Las modificaciones, complementarias, reglamentaciones, derogaciones y fechas
de vigencia se registran con evidencia. Los vacíos documentales permanecen
identificados y las pruebas técnicas no certifican vigencia ni aplicabilidad
jurídica.

## Publicación acotada

El workflow `.github/workflows/pages.yml` sólo se inicia manualmente mediante
`workflow_dispatch`. Primero ejecuta las validaciones locales y después carga
exclusivamente `web/` como artefacto de Pages. No se ejecuta en pull requests.
La existencia del workflow no activa Pages ni autoriza un despliegue.

## Gobernanza

Este repositorio es una implementación de dominio que hereda principios de
gobernanza de Janus Core a través de
[SAD-MORON Framework](https://github.com/SAD-MORON/sad-moron-framework).
Mantiene ejecución acotada, trazabilidad, continuidad institucional,
separación público/privado y revisión humana. No incorpora credenciales,
conectores operativos, datos personales ni autoridad implícita para modificar
sistemas SAD. DebDoctor conserva un ámbito propio de desarrollo; su integración
futura con otros sistemas SAD requiere un alcance definido.

El contenido público se limita a documentación y referencias normativas. Los
expedientes, legajos, historias clínicas, credenciales y referencias privadas
de trabajo quedan fuera de la publicación.

## Licencias y fuentes de terceros

El código y la documentación originales de DebDoctor se ofrecen bajo Apache
License 2.0; véase `LICENSE`. Esa licencia no relicencia textos normativos,
documentos oficiales, marcas, enlaces ni otros materiales de terceros. El
detalle de límites se encuentra en `docs/LICENCIAS_Y_FUENTES.md`.

## Contribuciones

Las mejoras se proponen mediante solicitudes de cambios (PR). Antes de
crear un commit local, verificar la identidad de Git y consultar
[las indicaciones de contribución](docs/CONTRIBUCIONES.md).
