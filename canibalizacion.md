# Diagnóstico de Canibalización — facundogrowth.com

**Fecha:** Febrero 2026
**Alcance:** Páginas Core Section (servicios)
**Método:** Análisis de Title, H1, Meta Description, contenido y overlap semántico entre páginas

---

## Resumen Ejecutivo

- 1 conflicto crítico: `/seo-tecnico` vs `/auditoria-seo-chile`
- 1 conflicto moderado: `/estrategia-seo` vs `/consultoria-seo-mensual`
- 1 conflicto resuelto: `/posicionamiento-web-chile` → 301 a `/consultor-seo-chile`
- 1 riesgo bajo: `/consultor-seo-chile` vs `/consultoria-seo-mensual`

---

## Inventario de Páginas Core Analizadas

| URL | Keyword Principal | Vol. | Title | H1 |
|-----|-------------------|------|-------|-----|
| `/consultor-seo-chile` | consultor seo chile | 70 | Consultor SEO Chile — Facundo Zupel \| Posicionamiento Web | Consultor SEO en Chile: posiciono tu negocio en Google con datos, no con promesas |
| `/consultoria-seo-mensual` | consultoria seo | 320 | Consultoría SEO Mensual en Chile: Posicionamiento Continuo | Consultoría SEO mensual: crecimiento orgánico constante para tu negocio |
| `/posicionamiento-web-chile` | posicionamiento web chile | 90 | 301 redirect → /consultor-seo-chile | N/A |
| `/seo-tecnico` | seo tecnico | 12,100 | SEO Técnico: Guía Completa + Auditoría Profesional \| Chile | SEO Técnico: la base para que Google entienda y posicione tu sitio web |
| `/auditoria-seo-chile` | auditoria seo | 50 | Auditoría SEO Chile: Análisis Profesional de tu Sitio Web | Auditoría SEO en Chile: descubre qué está frenando tu posicionamiento en Google |
| `/estrategia-seo` | estrategia seo | 70 | Estrategia SEO: Plan de Posicionamiento Web Orientado a Resultados | Estrategia SEO: el plan que convierte tu sitio web en una máquina de tráfico orgánico |
| `/seo-local-chile` | seo local chile | 70 | SEO Local Chile: Posiciona tu Negocio en Google Maps | SEO Local: posiciona tu negocio en Google Maps y atrae clientes de tu zona |
| `/seo-ecommerce` | seo ecommerce | 20-50 | SEO para Ecommerce en Chile: Posiciona tu Tienda Online | SEO para Ecommerce: haz que tu tienda online venda más con tráfico orgánico |
| `/migracion-seo` | migracion seo | 10-20 | Migración SEO: Guía Completa + Checklist para No Perder Posicionamiento | Migración SEO: cómo cambiar tu sitio web sin perder posicionamiento |
| `/consultor-seo-regiones` | consultor seo [ciudades] | — | Consultor SEO en Chile por Ciudad — Todas las Regiones | Escala tu negocio a lo largo de todo Chile |

---

## Conflicto 1 — CRÍTICO: `/seo-tecnico` vs `/auditoria-seo-chile`

### Problema

El title de `/seo-tecnico` incluye "Auditoría Profesional" y el contenido ofrece "Auditoría SEO Técnica Completa" como servicio. Esto genera competencia directa con `/auditoria-seo-chile` por las queries:

- "auditoría seo técnica"
- "revisión técnica seo"
- "errores seo técnicos"
- "auditoría técnica web"

### Overlap de contenido detectado

| Aspecto | `/seo-tecnico` | `/auditoria-seo-chile` |
|---------|----------------|------------------------|
| Title usa "Auditoría" | Sí ("Guía Completa + Auditoría Profesional") | Sí ("Auditoría SEO Chile: Análisis Profesional") |
| Sección de auditoría técnica | Sí (servicio de "Auditoría SEO Técnica Completa") | Sí (servicio principal de la página) |
| Menciona problemas técnicos | Sí (rastreo, indexación, Core Web Vitals) | Sí ("problemas técnicos, de contenido y de autoridad") |
| CTA de diagnóstico | Sí | Sí |

### Solución propuesta

1. **Reposicionar `/seo-tecnico` como contenido educativo/guía:**
   - Cambiar title a: "SEO Técnico: Qué Es, Cómo Funciona y Por Qué Es Clave | Facundo Zupel"
   - Eliminar las secciones que ofrecen auditoría como servicio
   - Reemplazar por CTA que envíe a `/auditoria-seo-chile`: "¿Necesitás una auditoría técnica profesional?"
   - Mantener el enfoque en: qué es SEO técnico, pilares, cómo funciona, checklist educativo

2. **Consolidar `/auditoria-seo-chile` como LA página de servicio de auditoría:**
   - Mantener como está, es la página transaccional correcta
   - Absorber las keywords de auditoría que hoy compite `/seo-tecnico`

### Impacto esperado

- Google deja de dudar entre ambas páginas para queries de auditoría
- `/seo-tecnico` se posiciona mejor para "seo tecnico" (12,100 vol) sin diluir señal
- `/auditoria-seo-chile` captura todo el intent transaccional de auditoría

---

## Conflicto 2 — MODERADO: `/estrategia-seo` vs `/consultoria-seo-mensual`

### Problema

Ambas páginas hablan de "plan", "definición de estrategia" y "ejecución". La FAQ de `/estrategia-seo` menciona "Todos mis planes de consultoría mensual incluyen una auditoría inicial", lo que mezcla ambos servicios. Para el usuario (y para Google) la diferencia entre "te doy un plan" y "te acompaño mes a mes" no es clara.

### Overlap de contenido detectado

| Aspecto | `/estrategia-seo` | `/consultoria-seo-mensual` |
|---------|-------------------|---------------------------|
| Habla de "plan" | Sí (servicio principal) | Sí (incluye planificación) |
| Habla de "ejecución" | Menciona implementación | Servicio principal |
| Habla de "definición de estrategia" | Sí | Sí |
| Menciona auditoría inicial | Sí (en FAQ) | Sí (como parte del proceso) |
| Diferenciador real | Entrega one-shot: roadmap | Servicio recurrente mensual |

### Keywords en riesgo de competencia interna

- "estrategia seo" — debería ir 100% a `/estrategia-seo`
- "plan seo" — ambas compiten
- "consultoría seo" — debería ir 100% a `/consultoria-seo-mensual`
- "asesoría seo" — ambas compiten

### Solución propuesta

1. **Diferenciar el posicionamiento de cada página:**
   - `/estrategia-seo` = "Necesito un plan" → entrega un roadmap de 90 días, diagnóstico + hoja de ruta, sin ejecución continua
   - `/consultoria-seo-mensual` = "Necesito ejecución continua" → plan + implementación + reportes + iteración mes a mes

2. **Agregar sección diferenciadora en ambas páginas:**
   - Tabla comparativa: "Estrategia SEO vs Consultoría Mensual"
   - CTA cruzado: "¿Solo necesitás el plan? → /estrategia-seo" / "¿Necesitás plan + ejecución? → /consultoria-seo-mensual"

3. **Limpiar la FAQ de `/estrategia-seo`:**
   - Eliminar la mención a "consultoría mensual" que confunde el intent
   - Enfocar en: qué entrego, en cuánto tiempo, qué incluye el diagnóstico

### Impacto esperado

- Mejor conversión: el usuario llega a la página correcta según su intent
- Google diferencia claramente ambas URLs para queries distintas

---

## Conflicto 3 — RESUELTO: `/posicionamiento-web-chile` → `/consultor-seo-chile`

**Status:** Resuelto con redirect 301.

La página `/posicionamiento-web-chile` ahora redirige al Hub principal. "Posicionamiento web chile" se consolida bajo `/consultor-seo-chile` que ya usa "Posicionamiento Web" como keyword secundaria en el title.

No requiere acción adicional.

---

## Riesgo 4 — BAJO: `/consultor-seo-chile` vs `/consultoria-seo-mensual`

### Contexto

"Consultor SEO" y "consultoría SEO" son cuasi-sinónimos para Google. Ambas páginas podrían competir por variaciones como "consultor seo chile" y "consultoría seo chile".

### Por qué el riesgo es bajo

- El Hub (`/consultor-seo-chile`) tiene intent de "quién es" / "qué hace" → página general del profesional
- `/consultoria-seo-mensual` tiene intent de "contratar servicio recurrente" → página de servicio específico
- La diferencia de intent es suficiente si se mantiene clara
- El Hub recibe muchos más internal links (15+ vs 8+) lo que le da señal jerárquica clara

### Acción recomendada

- Monitorear en GSC cuando haya datos disponibles
- Si ambas páginas aparecen para la misma query, evaluar consolidación o canonical

---

## Páginas SIN canibalización (bien diferenciadas)

| URL | Por qué no canibaliza |
|-----|----------------------|
| `/seo-local-chile` | Keyword única ("seo local"), vertical geográfico, menciona Google Maps |
| `/seo-ecommerce` | Keyword única ("seo ecommerce"), vertical de industria |
| `/migracion-seo` | Keyword única ("migración seo"), servicio técnico muy específico |
| `/consultor-seo-[ciudad]` | Cada una tiene modificador geo único, no compiten con el Hub nacional |
| `/consultor-seo-regiones` | Página directorio/índice, no compite por keywords transaccionales |

---

## Matriz de Overlap Semántico

```
                    Hub      Auditoría  SEO Tech  Estrategia  Consultoría  Local   Ecommerce  Migración
                    Chile    Chile                            Mensual      Chile
───────────────────────────────────────────────────────────────────────────────────────────────────────
"seo técnico"       MED      ALTO       PRIMARY    BAJO       BAJO         BAJO    BAJO       BAJO
"auditoría"         MED      PRIMARY    ALTO       BAJO       BAJO         BAJO    BAJO       BAJO
"estrategia"        MED      BAJO       BAJO       PRIMARY    MED          BAJO    BAJO       BAJO
"consultoría"       ALTO     BAJO       BAJO       MED        PRIMARY      BAJO    BAJO       BAJO
"plan seo"          BAJO     MED        BAJO       MED        MED          BAJO    MED        BAJO
"posicionamiento"   PRIMARY  MED        BAJO       BAJO       MED          BAJO    MED        BAJO
```

PRIMARY = keyword principal de la página
ALTO = overlap significativo (riesgo de canibalización)
MED = relación semántica existente
BAJO = sin riesgo

---

## Plan de Acción Priorizado

| # | Acción | Conflicto | Impacto | Esfuerzo | Estado |
|---|--------|-----------|---------|----------|--------|
| 1 | Cambiar title de `/seo-tecnico` (sacar "Auditoría Profesional") | Conflicto 1 | Alto | Bajo | Completado |
| 2 | Eliminar secciones de servicio de auditoría en `/seo-tecnico` | Conflicto 1 | Alto | Medio | Completado |
| 3 | Agregar CTA en `/seo-tecnico` que envíe a `/auditoria-seo-chile` | Conflicto 1 | Alto | Bajo | Completado |
| 4 | Diferenciar messaging hero en `/estrategia-seo` vs `/consultoria-seo-mensual` | Conflicto 2 | Medio | Bajo | Pendiente |
| 5 | Limpiar FAQ de `/estrategia-seo` (eliminar mención a consultoría mensual) | Conflicto 2 | Medio | Bajo | Pendiente |
| 6 | Agregar tabla comparativa "Estrategia vs Consultoría" en ambas páginas | Conflicto 2 | Medio | Medio | Pendiente |
| 7 | Configurar monitoreo GSC para "consultor seo" vs "consultoria seo" | Riesgo 4 | Bajo | Bajo | Pendiente (requiere GSC activo) |

---

> Documento de contexto para uso del agente IA. Actualizar después de implementar cada acción.
