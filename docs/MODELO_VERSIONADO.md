# Base versionada — propuesta de diseño

**Secretaría de Asuntos Docentes de Morón — Provincia de Buenos Aires**

El catálogo inicial no implementa todavía un historial normativo. La siguiente estructura orienta su evolución.

| Entidad | Identidad y campos | Función |
|---|---|---|
| Norma | ID estable, jurisdicción, organismo, tipo, número, año | Identificar el objeto jurídico sin confundirlo con un archivo |
| Unidad | ID estable, norma, artículo/inciso/anexo, padre | Vincular fragmentos concretos |
| Versión de unidad | ID, unidad, texto, válida desde/hasta, precisión, fuente | Conservar cada redacción y su vigencia jurídica |
| Fuente | ID, URL, hash, consulta, publicación, archivo | Acreditar procedencia e integridad |
| Relación | Origen, destino, tipo, alcance, fecha, evidencia | Registrar modificaciones, derogaciones, reglamentaciones y anexos |
| Aplicabilidad | Sujetos, régimen, nivel, modalidad, territorio, condiciones | Separar vigencia de aplicación a un caso |
| Revisión | Objeto, estado, responsable, fecha, evidencia | Diferenciar localización, cotejo y consolidación |
| Registro temporal | Registrado desde/hasta, motivo | Conservar cuándo la base conoció cada dato |

Las fechas desconocidas permanecen desconocidas. La fecha de descarga no se convierte en entrada en vigor. Los cambios se registran, sin reemplazar silenciosamente el texto histórico. Una respuesta por fecha debe mostrar las fuentes y vacíos que sustentan su reconstrucción.

Próxima fase propuesta: consolidar un conjunto reducido del Estatuto y su reglamentación, cotejando cada cambio, antes de habilitar consultas históricas.
