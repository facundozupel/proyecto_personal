# Diagnóstico de Canibalización — facundogrowth.com

**Fecha:** Febrero 2026 (actualizado con datos GSC dic 2025 – feb 2026)
**Alcance:** Páginas Core Section (servicios) + Blog
**Método:** Análisis de Title, H1, Meta Description, contenido, overlap semántico + datos reales de Google Search Console (últimos 3 meses)
**Fuente de datos:** `scripts/gsc-extract/extract.py` — 617 filas, 46 páginas indexadas, 153 queries únicas

---

## Resumen Ejecutivo

- 1 conflicto crítico resuelto: `/seo-tecnico` vs `/auditoria-seo-chile` — ya no comparten queries en GSC
- 2 redirects 301 funcionando: `/consultoria-seo-mensual` y `/posicionamiento-web-chile` → `/consultor-seo-chile`
- 1 problema nuevo: `/blog/consultor-seo-para-pymes` sigue apareciendo en GSC a pesar del 301
- 1 problema técnico: `/blog/que-es-seo` aparece con y sin trailing slash (señal duplicada)
- 1 canibalización leve: Home (`/`) compite con Hub (`/consultor-seo-chile`) por queries "consultor seo"
- 0 canibalización entre Core Section pages (bien diferenciadas en GSC)

---

## Datos GSC: Performance por Página (dic 2025 – feb 2026)

| URL | Clicks | Impressions | Pos. media |
|-----|--------|-------------|------------|
| `/blog/que-es-seo/` | 0 | 908 | 76.5 |
| `/analizador-seo` | 1 | 666 | 74.2 |
| `/blog/claude-code-seo` | 10 | 196 | 7.4 |
| `/blog/como-funciona-google` | 0 | 127 | 31.8 |
| `/` (home) | 8 | 98 | 4.1 |
| `/migracion-seo/` | 0 | 78 | 52.5 |
| `/blog/keywords-research-guia/` | 0 | 71 | 20.0 |
| `/blog/mcp-servers-seo` | 4 | 71 | 8.8 |
| `/blog/cuanto-cuesta-seo-chile/` | 0 | 64 | 8.8 |
| `/blog/claude-code-vs-openclaw-seo` | 5 | 55 | 6.0 |
| `/blog/optimizacion-on-page/` | 0 | 46 | 6.8 |
| `/blog/consultor-seo-para-pymes/` | 0 | 44 | 21.2 |
| `/consultor-seo-arica/` | 1 | 32 | 22.5 |
| `/consultor-seo-chile/` | 0 | 29 | 50.8 |
| `/auditoria-seo-chile/` | 0 | 28 | 81.6 |
| `/seo-local-chile/` | 0 | 25 | 10.5 |
| `/calculadora-roi-seo` | 0 | 24 | 67.8 |
| `/blog/ia-seo-2026` | 0 | 19 | 5.9 |
| `/seo-tecnico/` | 0 | 10 | 65.9 |
| `/posicionamiento-web-chile/` | 0 | 10 | 30.1 |
| `/estrategia-seo/` | 0 | 5 | 10.4 |
| `/consultoria-seo-mensual/` | 1 | 1 | 4.0 |

---

## Análisis de Canibalización con Datos GSC

### Conflicto 1 — RESUELTO: `/seo-tecnico` vs `/auditoria-seo-chile`

**Status:** Resuelto. Las acciones implementadas funcionaron.

**Evidencia GSC:**
- `/seo-tecnico/` solo aparece para queries de "seo técnico" (3 imp) y "que es el seo tecnico" (2 imp). Ya no compite por queries de auditoría.
- `/auditoria-seo-chile/` aparece solo para "auditoria seo chile" (23 imp). Sin overlap.
- No hay ninguna query donde ambas páginas aparezcan simultáneamente.

**Acciones completadas:**
1. Title de `/seo-tecnico` cambiado (eliminado "Auditoría Profesional")
2. Secciones de servicio de auditoría eliminadas
3. CTA cruzado a `/auditoria-seo-chile` agregado

---

### Conflicto 2 — RESUELTO: `/estrategia-seo` vs `/consultoria-seo-mensual`

**Status:** Resuelto. `/consultoria-seo-mensual` redirige 301 a `/consultor-seo-chile`.

**Evidencia GSC:**
- `/consultoria-seo-mensual/` solo registra 1 clic y 1 impresión en 3 meses (residual de caché de Google)
- `/estrategia-seo/` aparece para 5 impresiones con pos. 10.4, sin competir con nadie
- No hay overlap de queries entre ambas URLs

**Acción pendiente:** Limpiar FAQ de `/estrategia-seo` (eliminar mención a "consultoría mensual"). Bajo impacto pero mantiene coherencia.

---

### Conflicto 3 — RESUELTO: `/posicionamiento-web-chile` → 301

**Status:** Resuelto pero con residuo en GSC.

**Evidencia GSC:**
- `/posicionamiento-web-chile/` aún muestra 10 impresiones y 0 clicks en 3 meses
- Google todavía no terminó de consolidar el redirect en el índice
- No requiere acción, se resuelve solo con el tiempo

---

### NUEVO — Problema 4: `/blog/consultor-seo-para-pymes/` sigue indexada

**Severidad:** Baja (por ahora)

**Evidencia GSC:**
- 44 impresiones, 0 clicks, posición media 21.2 en los últimos 3 meses
- Últimas impresiones registradas: febrero 2026 (la página sigue activa en el índice)
- Compite con el Hub por las mismas queries:

| Query | Página 1 | Imp | Pos | Página 2 | Imp | Pos |
|-------|----------|-----|-----|----------|-----|-----|
| consultor seo chile | `/consultor-seo-chile/` | 5 | 78.0 | `/blog/consultor-seo-para-pymes/` | 1 | 52.0 |
| consultor seo growth | `/consultor-seo-chile/` | 6 | 5.1 | `/blog/consultor-seo-para-pymes/` | 2 | 57.5 |
| consultor seo para pymes | `/blog/consultor-seo-para-pymes/` | 5 | 76.0 | `/consultor-seo-chile/` | 1 | 35.0 |

**Diagnóstico:** El redirect 301 de `/blog/consultor-seo-para-pymes` a `/consultor-seo-chile` existe en `astro.config.mjs`, pero Google aún muestra la URL original en el índice. Esto genera canibalización leve en el cluster "consultor seo".

**Acción recomendada:**
1. Verificar que el 301 está funcionando correctamente (curl -I)
2. Solicitar eliminación de la URL antigua en Google Search Console (Removals tool)
3. Monitorear en 30 días — si persiste, considerar canonical tag adicional

---

### NUEVO — Problema 5: Home (`/`) compite con Hub (`/consultor-seo-chile`)

**Severidad:** Baja

**Evidencia GSC:**

| Query | Home `/` | Hub `/consultor-seo-chile/` |
|-------|----------|---------------------------|
| consultor seo | 3 imp, pos 4.8 | 1 imp, pos 18.0 |
| consultor seo santiago | 5 imp, pos 1.3 | — |
| consultora seo | 1 imp, pos 14.0 | 1 imp, pos 32.0 |

**Diagnóstico:** El Home rankea mejor que el Hub para queries de "consultor seo". Esto no es necesariamente un problema — Google puede preferir la home como landing para queries de marca/profesional. Pero el Hub debería ser la página principal para este cluster.

**Acción recomendada:**
- No intervenir por ahora. El volumen es muy bajo (< 10 impresiones totales).
- Si el sitio escala en autoridad, evaluar si el Home está robando tráfico transaccional al Hub.
- Asegurar que el Hub tenga más internal links y señal que el Home para "consultor seo chile".

---

### NUEVO — Problema 6: `/blog/que-es-seo` duplicada (trailing slash)

**Severidad:** Media (técnica)

**Evidencia GSC:**

| URL | Impressions | Posición |
|-----|-------------|----------|
| `/blog/que-es-seo/` | 908 | 76.5 |
| `/blog/que-es-seo` | 25 | 70.0 |

**Diagnóstico:** Google está indexando ambas variantes. La versión con trailing slash concentra el 97% de las impresiones, pero la señal se diluye. Esto aplica también a `/seo-local-chile` (2 imp con `/`, 11 imp sin `/`).

**Acción recomendada:**
1. Configurar trailing slash policy en `astro.config.mjs` (`trailingSlash: 'always'` o `'never'`)
2. Asegurar que las rutas sin trailing slash hagan 301 a la versión canónica
3. Esto es una corrección técnica global, no específica de canibalización

---

## Páginas SIN canibalización (confirmado con GSC)

| URL | Queries exclusivas | Por qué no canibaliza |
|-----|-------------------|----------------------|
| `/seo-local-chile` | "consultor seo local", "seo en santiago" | Vertical geográfico, queries únicas |
| `/seo-ecommerce` | — (sin impresiones en período) | Sin visibilidad aún, no puede canibalizar |
| `/migracion-seo` | "fases migracion seo" | Servicio técnico específico, queries únicas |
| `/auditoria-seo-chile` | "auditoria seo chile" | Query exclusiva, sin overlap con otras páginas |
| `/analizador-seo` | "analisis seo", "analizador seo", "analizar seo" | Cluster propio de 600+ impresiones, sin competencia interna |
| `/consultor-seo-[ciudad]` | Queries geo-específicas | Cada landing tiene modificador geo único |

---

## Matriz de Overlap Semántico (actualizada con GSC)

```
                    Hub      Auditoría  SEO Tech  Estrategia  Local   Ecommerce  Migración  Analizador
                    Chile    Chile                            Chile                          SEO
─────────────────────────────────────────────────────────────────────────────────────────────────────────
"seo técnico"       —        —          PRIMARY    —          —       —          —          —
"auditoría seo"     —        PRIMARY    —          —          —       —          —          —
"estrategia seo"    —        —          —          PRIMARY    —       —          —          —
"consultor seo"     ALTO*    —          —          —          —       —          —          —
"analisis seo"      —        —          —          —          —       —          —          PRIMARY
"seo local"         —        —          —          —          PRIMARY —          —          —
"migración seo"     —        —          —          —          —       —          PRIMARY    —

* Home (/) también compite para "consultor seo" con mejor posición
```

PRIMARY = keyword principal confirmada en GSC
ALTO = overlap confirmado con datos
— = sin competencia detectada en GSC

---

## Plan de Acción Priorizado

| # | Acción | Conflicto | Impacto | Esfuerzo | Estado |
|---|--------|-----------|---------|----------|--------|
| 1 | ~~Cambiar title de `/seo-tecnico`~~ | Conflicto 1 | Alto | Bajo | Completado |
| 2 | ~~Eliminar secciones de auditoría en `/seo-tecnico`~~ | Conflicto 1 | Alto | Medio | Completado |
| 3 | ~~Agregar CTA en `/seo-tecnico` → `/auditoria-seo-chile`~~ | Conflicto 1 | Alto | Bajo | Completado |
| 4 | ~~Redirect `/consultoria-seo-mensual` → Hub~~ | Conflicto 2 | — | — | Completado |
| 5 | Limpiar FAQ de `/estrategia-seo` (eliminar mención a consultoría) | Conflicto 2 | Bajo | Bajo | Pendiente |
| 6 | Solicitar removal de `/blog/consultor-seo-para-pymes` en GSC | Problema 4 | Medio | Bajo | Pendiente |
| 7 | Configurar trailing slash policy en `astro.config.mjs` | Problema 6 | Medio | Bajo | Pendiente |
| 8 | Monitorear Home vs Hub para "consultor seo" | Problema 5 | Bajo | — | Monitoreo |

---

> Documento de contexto para uso del agente IA. Actualizar después de implementar cada acción.
> Última actualización con datos GSC: 28 febrero 2026 (período: dic 2025 – feb 2026).
