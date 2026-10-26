# Contribuciones

Las correcciones se presentan mediante solicitudes de cambios (PR) contra
`main`, indicando el problema, el cambio propuesto y sus comprobaciones.
Los cambios del catálogo deben conservar las fuentes y los pendientes.

## Identidad de los commits

Antes de crear un commit local, revisar la identidad efectiva:

```sh
git var GIT_AUTHOR_IDENT
git var GIT_COMMITTER_IDENT
```

Usar un correo verificado de la cuenta de quien contribuye o copiar su
dirección privada `noreply` desde la configuración de correo de GitHub.
No copiar correos de ejemplo. Si se configura la identidad para este
proyecto, usar el alcance local del repositorio; no cambiar la configuración
global de otros proyectos.

El commit inicial del candidato conserva un correo de ejemplo y no quedó
asociado al perfil personal. Este registro se documenta sin reescribir la
historia ni hacer publicaciones forzadas.

## Comprobaciones

```sh
node check.mjs
node --check web/app.mjs
node --check web/catalog.mjs
node --check web/graph.mjs
```

Revisar en navegador las vistas afectadas. Los datos canónicos y su copia
de distribución deben coincidir. Una prueba técnica no certifica vigencia
normativa ni aplicabilidad jurídica.

La fusión de un PR y el despliegue manual de Pages son operaciones distintas.
Abrir un PR no publica sus cambios en la web.
