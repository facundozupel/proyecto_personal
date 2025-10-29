# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

### Added
- **Calculadora de Rentabilidad Interactiva** (2025-10-29)
  - Componente ProfitabilityCalculator con slider interactivo
  - Permite simular cambios en tráfico y visualizar impacto en rentabilidad
  - Soporte para múltiples canales (SEO Orgánico, Google Ads, Facebook Ads, etc.)
  - Soporte multimoneda (USD, EUR, ARS, MXN, COP, CLP, GBP)
  - Cálculos en tiempo real de tráfico y ganancia proyectados
  - Mensaje CTA: "Si no conoces los datos necesarios, seguramente estás perdiendo muchas oportunidades para rentabilizar tu negocio. El trabajo con datos reales en cada canal es mi especialidad."
  - Responsive design (mobile y desktop)
  - 8 tests unitarios completos

### Changed
- **Calculadora de Rentabilidad** (2025-10-29)
  - Eliminada visualización gráfica con línea animada por decisión de diseño
  - Simplificado el componente manteniendo toda la funcionalidad de cálculo

### Technical
- Commits realizados:
  - `e3c6005` - refactor: Eliminar visualización gráfica de la calculadora
  - `538de72` - feat: Agregar mensaje CTA debajo de calculadora
  - `0e84a5c` - feat: Agregar calculadora interactiva de rentabilidad

---

## Formato de Registro

### Added
Para nuevas funcionalidades.

### Changed
Para cambios en funcionalidades existentes.

### Deprecated
Para funcionalidades que pronto serán eliminadas.

### Removed
Para funcionalidades eliminadas.

### Fixed
Para corrección de bugs.

### Security
Para correcciones de seguridad.
