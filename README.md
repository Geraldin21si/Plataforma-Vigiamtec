# VIGIAMTEC — Plataforma Web de Inteligencia Satelital y Conservación Amazónica

MVP web diseñado para concursos de emprendimiento e incubadoras (enfoque **ODS 15: Vida de Ecosistemas Terrestres**), integrando el motor geoespacial de **Google Earth Engine** (`interopclassifierrf`) con analítica ejecutiva, series temporales y transparencia científica.

## Características Principales
1. **Panel Analítico & KPIs (Sin fricción de espera):** Visualiza biomasa aérea (NDVI Sentinel-2), trazadores de incendios forestales (**CO** Sentinel-5P), contaminación del aire y humo (**NO₂** Sentinel-5P) e integridad de bosque mediante clasificación **Random Forest**.
2. **Gestión Inteligente de Latencia GEE:** Incluye flujo de ejecución asíncrona que comunica al usuario y al jurado por qué los cálculos ráster en Google Earth Engine demoran entre 1 y 3 minutos, ofreciendo indicadores pre-cacheados mientras se ejecuta el geoprocesamiento.
3. **Visor GEE Nativo Integrado:** Pestaña dedicada que embebe directamente la aplicación oficial del equipo (`https://interopclassifierrf.projects.earthengine.app/view/vigiamtec`).
4. **Transparencia Científica (Explicaciones y Limitaciones):** Cada dataset de `earthengine.google.com` documenta su colección exacta (`COPERNICUS/S2_SR_HARMONIZED`, `COPERNICUS/S5P/OFFL/L3_CO`, `COPERNICUS/S5P/OFFL/L3_NO2`), criterios de interpretación y limitaciones físicas/atmosféricas.

## Instalación y Ejecución Local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

Abre `http://localhost:5173` en tu navegador.
