# Template Base

El template base para las landings geolocalizadas es el archivo:

```
src/pages/consultor-seo-chile.astro
```

Este archivo se lee directamente desde su ubicacion original en el proyecto Astro.
No se duplica aqui para evitar desincronizacion.

Si el template original cambia, las nuevas landings generadas usaran la version actualizada automaticamente.
Las landings ya generadas NO se actualizan automaticamente — deben regenerarse manualmente si se necesita.
