import { AmazonZoneMetrics, GeeDatasetSpec, LayerId } from '../types/gee';

export const GEE_APP_URL =
  'https://ee-jalfaroc00.projects.earthengine.app/view/interopclassifierrf';

export const GEE_DATASETS: Record<LayerId, GeeDatasetSpec> = {
  ndvi_full: {
    id: 'ndvi_full',
    shortName: 'Verde Pleno (NDVI ≥ 0.75)',
    title: 'Verde pleno (NDVI ≥ 0.75) [%] — Dosel de Alto Vigor',
    sourceBadge: 'Sentinel-2 · Óptico',
    geeCollectionId: 'COPERNICUS/S2_SR_HARMONIZED',
    spatialResolution: '10 m',
    unit: '%',
    scientificDescription:
      'Porcentaje del territorio con un umbral exigente de verdor (NDVI ≥ 0.75). Al no saturarse tan rápido como el NDVI promedio, refleja mucho mejor el ciclo estacional y el estrés leve del dosel amazónico.',
    caveatsAndLimitations: [
      'El umbral (0.75) es una elección de calibración: conviene ajustarlo mirando el mapa de cada zona (parámetro NDVI_FULL).',
      'La línea gris en los gráficos representa la media histórica del mes para comparar si el mes parcial (2026-11) presenta anomalía.'
    ],
    colorScale: [
      { label: 'Estrés / baja cobertura', color: '#eab308', range: '< 50%' },
      { label: 'Vigor moderado', color: '#22c55e', range: '50% - 75%' },
      { label: 'Verde pleno denso', color: '#15803d', range: '≥ 75%' }
    ]
  },
  ndvi_mean: {
    id: 'ndvi_mean',
    shortName: 'NDVI Medio [índice]',
    title: 'NDVI medio [índice] — Índice de Verdor (NIR vs. Rojo)',
    sourceBadge: 'Sentinel-2 · Óptico',
    geeCollectionId: 'COPERNICUS/S2_SR_HARMONIZED',
    spatialResolution: '10 m',
    unit: 'índice',
    scientificDescription:
      'Índice de verdor calculado entre infrarrojo cercano y rojo. En selva amazónica sana suele mantenerse entre 0.70 y 0.85; valores más altos indican hojas verdes y vigorosas.',
    caveatsAndLimitations: [
      'Satura en dosel denso: por eso casi no cambia entre estaciones en bosque cerrado.',
      'Para observar con mayor detalle el ciclo anual estacional, se complementa con EVI y Verde Pleno (NDVI ≥ 0.75).'
    ],
    colorScale: [
      { label: 'Suelo / alteración', color: '#dc2626', range: '< 0.45' },
      { label: 'Vegetación secundaria', color: '#eab308', range: '0.45 - 0.70' },
      { label: 'Selva sana vigorosa', color: '#16a34a', range: '0.70 - 0.85' }
    ]
  },
  ndmi_moisture: {
    id: 'ndmi_moisture',
    shortName: 'NDMI (Humedad Vegetal)',
    title: 'NDMI (humedad de la vegetación) [índice]',
    sourceBadge: 'Sentinel-2 · SWIR',
    geeCollectionId: 'COPERNICUS/S2_SR_HARMONIZED',
    spatialResolution: '20 m',
    unit: 'índice',
    scientificDescription:
      'Mide el contenido de agua dentro de las hojas combinando infrarrojo cercano (NIR) frente a infrarrojo de onda corta (SWIR). Si baja, indica hojas más secas (estrés hídrico); si sube, mayor humedad foliar.',
    caveatsAndLimitations: [
      'Mide exclusivamente el agua retenida en las hojas del dosel, no la lluvia caída ni la humedad del suelo.',
      'Debe interpretarse junto con los indicadores climáticos y estacionales de la cuenca.'
    ],
    colorScale: [
      { label: 'Estrés hídrico foliar', color: '#f97316', range: '< 0.25' },
      { label: 'Humedad intermedia', color: '#38bdf8', range: '0.25 - 0.32' },
      { label: 'Dosel bien hidratado', color: '#0284c7', range: '> 0.32' }
    ]
  },
  dynamic_world_trees: {
    id: 'dynamic_world_trees',
    shortName: 'Árboles (Dynamic World)',
    title: 'Probabilidad de árboles (Dynamic World) [%]',
    sourceBadge: 'Dynamic World · IA Google',
    geeCollectionId: 'GOOGLE/DYNAMICWORLD/V1',
    spatialResolution: '10 m',
    unit: '%',
    scientificDescription:
      'Probabilidad media de cobertura arbórea estimada casi en tiempo real por el clasificador de aprendizaje profundo de Google sobre imágenes Sentinel-2.',
    caveatsAndLimitations: [
      'Cada imagen se clasifica por separado, por lo que la bruma o pocos datos en un mes parcial pueden mover la cifra un par de puntos (dato provisional).',
      'Si la variación histórica es muy pequeña, el puntaje z exagera la anomalía: confirma siempre con NDVI y radar Sentinel-1 antes de emitir alerta.'
    ],
    colorScale: [
      { label: 'Cobertura no arbórea', color: '#eab308', range: '< 45%' },
      { label: 'Transición / borde', color: '#22d3ee', range: '45% - 65%' },
      { label: 'Cobertura arbórea', color: '#16a34a', range: '> 65%' }
    ]
  },
  sentinel1_radar: {
    id: 'sentinel1_radar',
    shortName: 'Radar Sentinel-1 VH [dB]',
    title: 'Radar (Sentinel-1) — Retrodispersión Banda C Polarización VH [dB]',
    sourceBadge: 'Sentinel-1 · Radar SAR',
    geeCollectionId: 'COPERNICUS/S1_GRD',
    spatialResolution: '10 m',
    unit: 'dB',
    scientificDescription:
      'Radar de apertura sintética en banda C que atraviesa nubes y opera de día y de noche. Responde a la estructura tridimensional y humedad del dosel; caídas fuertes y sostenidas revelan pérdida de bosque o inundación.',
    caveatsAndLimitations: [
      'Los valores se expresan en decibelios negativos (ej. -14.14 dB); lo relevante para vigilancia es la caída sostenida respecto a su media mensual, no el signo.',
      'Hueco histórico (aprox. 2022 a marzo de 2025): tras la falla de Sentinel-1B en dic. 2021 hubo menos adquisiciones en varias zonas hasta el restablecimiento con Sentinel-1C en 2025.'
    ],
    colorScale: [
      { label: 'Caída fuerte (tala/agua)', color: '#ef4444', range: '< -15.0 dB' },
      { label: 'Variación estacional', color: '#eab308', range: '-15.0 a -14.3 dB' },
      { label: 'Estructura dosel estable', color: '#06b6d4', range: '> -14.3 dB' }
    ]
  },
  nasa_firms: {
    id: 'nasa_firms',
    shortName: 'Focos de Calor (NASA FIRMS)',
    title: 'Vigilancia Térmica y Anomalías de Fuego — NASA FIRMS',
    sourceBadge: 'NASA FIRMS · Térmico',
    geeCollectionId: 'FIRMS',
    spatialResolution: '375 m - 1 km',
    unit: 'focos',
    scientificDescription:
      'Detección satelital de anomalías térmicas activas para ubicar con rapidez focos de fuego dentro o en el borde de zonas amazónicas priorizadas.',
    caveatsAndLimitations: [
      'Complementa el análisis de estrés hídrico (NDMI) y pérdida estructural (Sentinel-1) para distinguir quemas recientes de cambios estacionales.',
      'La cobertura nubosa muy espesa puede atenuar detecciones térmicas puntuales, por lo que el cruce con radar SAR aporta respaldo continuo.'
    ],
    colorScale: [
      { label: 'Sin anomalías térmicas', color: '#22c55e', range: '0 focos' },
      { label: 'Vigilancia preventiva', color: '#eab308', range: '1 - 5 focos' },
      { label: 'Alerta activa en zona', color: '#ef4444', range: '> 5 focos' }
    ]
  }
};

export const AMAZON_ZONES: AmazonZoneMetrics[] = [
  {
    id: 'tambopata-madre-de-dios',
    name: 'Zona Priorizada Tambopata – Madre de Dios',
    department: 'Madre de Dios',
    areaHa: 142500,
    coordinates: '12°50′S 69°17′W',
    partialCutDate: '2026-11 · MES PARCIAL hasta 2026-11-21',
    ndviFullPct: 87.53,
    ndviFullAnomaly: '+11.73 (z = 0.41)',
    ndviFullTrend: '+0.81 por año',
    ndviMean: 0.78,
    ndviMeanAnomaly: '+0.01 (z = 0.23)',
    ndviMeanTrend: '+0 por año',
    ndmiValue: 0.31,
    ndmiAnomaly: '-0.01 (z = -0.76)',
    ndmiTrend: '+0 por año',
    dwTreesPct: 68.9,
    dwTreesAnomaly: '-1.91 (z = -3.32)',
    dwTreesTrend: '+0.21 por año',
    dwIsProvisional: true,
    s1RadarVhDb: -14.14,
    s1RadarAnomaly: '+0.16',
    s1RadarTrend: '0 por año',
    firmsHotspots: 4,
    firmsAlertLevel: 'Moderado',
    timeSeries: [
      { period: '2018', ndviFullPct: 78.4, ndviFullBaseline: 76.0, ndviMean: 0.76, ndviMeanBaseline: 0.77, ndmi: 0.31, ndmiBaseline: 0.32, dwTreesPct: 70.1, dwTreesBaseline: 70.5, s1RadarVhDb: -14.32, s1BaselineDb: -14.25, firmsHotspots: 3 },
      { period: '2019', ndviFullPct: 82.1, ndviFullBaseline: 76.5, ndviMean: 0.79, ndviMeanBaseline: 0.77, ndmi: 0.30, ndmiBaseline: 0.31, dwTreesPct: 69.8, dwTreesBaseline: 70.5, s1RadarVhDb: -14.12, s1BaselineDb: -14.22, firmsHotspots: 5 },
      { period: '2020', ndviFullPct: 74.2, ndviFullBaseline: 76.2, ndviMean: 0.75, ndviMeanBaseline: 0.77, ndmi: 0.29, ndmiBaseline: 0.31, dwTreesPct: 68.4, dwTreesBaseline: 70.4, s1RadarVhDb: -14.08, s1BaselineDb: -14.20, firmsHotspots: 7 },
      { period: '2021', ndviFullPct: 84.6, ndviFullBaseline: 76.8, ndviMean: 0.78, ndviMeanBaseline: 0.77, ndmi: 0.33, ndmiBaseline: 0.32, dwTreesPct: 70.6, dwTreesBaseline: 70.6, s1RadarVhDb: -14.28, s1BaselineDb: -14.24, firmsHotspots: 2 },
      { period: '2022', ndviFullPct: 79.5, ndviFullBaseline: 76.4, ndviMean: 0.77, ndviMeanBaseline: 0.77, ndmi: 0.31, ndmiBaseline: 0.31, dwTreesPct: 69.2, dwTreesBaseline: 70.5, s1RadarVhDb: null, s1BaselineDb: -14.23, firmsHotspots: 4 },
      { period: '2023', ndviFullPct: 71.8, ndviFullBaseline: 75.9, ndviMean: 0.74, ndviMeanBaseline: 0.76, ndmi: 0.28, ndmiBaseline: 0.31, dwTreesPct: 67.9, dwTreesBaseline: 70.3, s1RadarVhDb: null, s1BaselineDb: -14.25, firmsHotspots: 9 },
      { period: '2024', ndviFullPct: 83.4, ndviFullBaseline: 76.5, ndviMean: 0.78, ndviMeanBaseline: 0.77, ndmi: 0.32, ndmiBaseline: 0.32, dwTreesPct: 70.4, dwTreesBaseline: 70.6, s1RadarVhDb: null, s1BaselineDb: -14.22, firmsHotspots: 5 },
      { period: '2025', ndviFullPct: 89.2, ndviFullBaseline: 76.8, ndviMean: 0.80, ndviMeanBaseline: 0.77, ndmi: 0.32, ndmiBaseline: 0.32, dwTreesPct: 70.8, dwTreesBaseline: 70.7, s1RadarVhDb: -14.10, s1BaselineDb: -14.21, firmsHotspots: 3 },
      { period: '2026-11', ndviFullPct: 87.53, ndviFullBaseline: 75.8, ndviMean: 0.78, ndviMeanBaseline: 0.77, ndmi: 0.31, ndmiBaseline: 0.32, dwTreesPct: 68.9, dwTreesBaseline: 70.81, s1RadarVhDb: -14.14, s1BaselineDb: -14.30, firmsHotspots: 4, isPartialMonth: true }
    ]
  },
  {
    id: 'pacaya-samiria-loreto',
    name: 'Reserva Pacaya Samiria – Loreto',
    department: 'Loreto',
    areaHa: 2080000,
    coordinates: '05°15′S 74°40′W',
    partialCutDate: '2026-11 · MES PARCIAL hasta 2026-11-21',
    ndviFullPct: 91.4,
    ndviFullAnomaly: '+4.12 (z = 0.28)',
    ndviFullTrend: '+0.35 por año',
    ndviMean: 0.82,
    ndviMeanAnomaly: '+0.01 (z = 0.19)',
    ndviMeanTrend: '+0 por año',
    ndmiValue: 0.34,
    ndmiAnomaly: '+0.01 (z = 0.42)',
    ndmiTrend: '+0 por año',
    dwTreesPct: 74.2,
    dwTreesAnomaly: '-0.65 (z = -0.84)',
    dwTreesTrend: '+0.14 por año',
    dwIsProvisional: true,
    s1RadarVhDb: -13.92,
    s1RadarAnomaly: '+0.09',
    s1RadarTrend: '0 por año',
    firmsHotspots: 1,
    firmsAlertLevel: 'Bajo',
    timeSeries: [
      { period: '2018', ndviFullPct: 88.2, ndviFullBaseline: 87.1, ndviMean: 0.81, ndviMeanBaseline: 0.81, ndmi: 0.33, ndmiBaseline: 0.33, dwTreesPct: 74.5, dwTreesBaseline: 74.8, s1RadarVhDb: -14.02, s1BaselineDb: -14.01, firmsHotspots: 1 },
      { period: '2019', ndviFullPct: 89.5, ndviFullBaseline: 87.2, ndviMean: 0.82, ndviMeanBaseline: 0.81, ndmi: 0.34, ndmiBaseline: 0.33, dwTreesPct: 74.8, dwTreesBaseline: 74.8, s1RadarVhDb: -13.95, s1BaselineDb: -14.00, firmsHotspots: 2 },
      { period: '2020', ndviFullPct: 87.0, ndviFullBaseline: 87.0, ndviMean: 0.80, ndviMeanBaseline: 0.81, ndmi: 0.32, ndmiBaseline: 0.33, dwTreesPct: 73.9, dwTreesBaseline: 74.7, s1RadarVhDb: -13.98, s1BaselineDb: -14.01, firmsHotspots: 2 },
      { period: '2021', ndviFullPct: 90.1, ndviFullBaseline: 87.3, ndviMean: 0.82, ndviMeanBaseline: 0.81, ndmi: 0.35, ndmiBaseline: 0.33, dwTreesPct: 75.0, dwTreesBaseline: 74.8, s1RadarVhDb: -14.05, s1BaselineDb: -14.02, firmsHotspots: 0 },
      { period: '2022', ndviFullPct: 89.3, ndviFullBaseline: 87.2, ndviMean: 0.81, ndviMeanBaseline: 0.81, ndmi: 0.33, ndmiBaseline: 0.33, dwTreesPct: 74.6, dwTreesBaseline: 74.8, s1RadarVhDb: null, s1BaselineDb: -14.01, firmsHotspots: 1 },
      { period: '2023', ndviFullPct: 86.4, ndviFullBaseline: 87.0, ndviMean: 0.80, ndviMeanBaseline: 0.81, ndmi: 0.31, ndmiBaseline: 0.33, dwTreesPct: 73.5, dwTreesBaseline: 74.7, s1RadarVhDb: null, s1BaselineDb: -14.02, firmsHotspots: 3 },
      { period: '2024', ndviFullPct: 90.6, ndviFullBaseline: 87.3, ndviMean: 0.82, ndviMeanBaseline: 0.81, ndmi: 0.34, ndmiBaseline: 0.33, dwTreesPct: 74.9, dwTreesBaseline: 74.8, s1RadarVhDb: null, s1BaselineDb: -14.00, firmsHotspots: 1 },
      { period: '2025', ndviFullPct: 91.8, ndviFullBaseline: 87.4, ndviMean: 0.83, ndviMeanBaseline: 0.81, ndmi: 0.34, ndmiBaseline: 0.33, dwTreesPct: 75.1, dwTreesBaseline: 74.8, s1RadarVhDb: -13.90, s1BaselineDb: -14.00, firmsHotspots: 1 },
      { period: '2026-11', ndviFullPct: 91.4, ndviFullBaseline: 87.28, ndviMean: 0.82, ndviMeanBaseline: 0.81, ndmi: 0.34, ndmiBaseline: 0.33, dwTreesPct: 74.2, dwTreesBaseline: 74.85, s1RadarVhDb: -13.92, s1BaselineDb: -14.01, firmsHotspots: 1, isPartialMonth: true }
    ]
  },
  {
    id: 'purus-ucayali',
    name: 'Corredor Alto Purús – Ucayali',
    department: 'Ucayali',
    areaHa: 510000,
    coordinates: '10°12′S 71°05′W',
    partialCutDate: '2026-11 · MES PARCIAL hasta 2026-11-21',
    ndviFullPct: 79.8,
    ndviFullAnomaly: '-4.25 (z = -0.62)',
    ndviFullTrend: '-0.18 por año',
    ndviMean: 0.75,
    ndviMeanAnomaly: '-0.02 (z = -0.48)',
    ndviMeanTrend: '+0 por año',
    ndmiValue: 0.27,
    ndmiAnomaly: '-0.03 (z = -1.15)',
    ndmiTrend: '-0.01 por año',
    dwTreesPct: 65.4,
    dwTreesAnomaly: '-2.40 (z = -1.95)',
    dwTreesTrend: '-0.12 por año',
    dwIsProvisional: true,
    s1RadarVhDb: -14.48,
    s1RadarAnomaly: '-0.22',
    s1RadarTrend: '-0.03 por año',
    firmsHotspots: 11,
    firmsAlertLevel: 'Alto',
    timeSeries: [
      { period: '2018', ndviFullPct: 85.1, ndviFullBaseline: 84.0, ndviMean: 0.78, ndviMeanBaseline: 0.77, ndmi: 0.31, ndmiBaseline: 0.30, dwTreesPct: 68.5, dwTreesBaseline: 67.8, s1RadarVhDb: -14.22, s1BaselineDb: -14.25, firmsHotspots: 4 },
      { period: '2019', ndviFullPct: 84.4, ndviFullBaseline: 84.0, ndviMean: 0.77, ndviMeanBaseline: 0.77, ndmi: 0.30, ndmiBaseline: 0.30, dwTreesPct: 68.1, dwTreesBaseline: 67.8, s1RadarVhDb: -14.25, s1BaselineDb: -14.25, firmsHotspots: 6 },
      { period: '2020', ndviFullPct: 81.9, ndviFullBaseline: 83.8, ndviMean: 0.76, ndviMeanBaseline: 0.77, ndmi: 0.28, ndmiBaseline: 0.30, dwTreesPct: 67.2, dwTreesBaseline: 67.8, s1RadarVhDb: -14.31, s1BaselineDb: -14.26, firmsHotspots: 9 },
      { period: '2021', ndviFullPct: 84.8, ndviFullBaseline: 84.1, ndviMean: 0.78, ndviMeanBaseline: 0.77, ndmi: 0.31, ndmiBaseline: 0.30, dwTreesPct: 68.0, dwTreesBaseline: 67.8, s1RadarVhDb: -14.27, s1BaselineDb: -14.25, firmsHotspots: 5 },
      { period: '2022', ndviFullPct: 82.5, ndviFullBaseline: 83.9, ndviMean: 0.76, ndviMeanBaseline: 0.77, ndmi: 0.29, ndmiBaseline: 0.30, dwTreesPct: 67.0, dwTreesBaseline: 67.8, s1RadarVhDb: null, s1BaselineDb: -14.26, firmsHotspots: 8 },
      { period: '2023', ndviFullPct: 78.2, ndviFullBaseline: 83.7, ndviMean: 0.74, ndviMeanBaseline: 0.77, ndmi: 0.26, ndmiBaseline: 0.30, dwTreesPct: 65.8, dwTreesBaseline: 67.7, s1RadarVhDb: null, s1BaselineDb: -14.26, firmsHotspots: 14 },
      { period: '2024', ndviFullPct: 82.0, ndviFullBaseline: 83.9, ndviMean: 0.76, ndviMeanBaseline: 0.77, ndmi: 0.29, ndmiBaseline: 0.30, dwTreesPct: 66.9, dwTreesBaseline: 67.8, s1RadarVhDb: null, s1BaselineDb: -14.26, firmsHotspots: 9 },
      { period: '2025', ndviFullPct: 81.3, ndviFullBaseline: 84.0, ndviMean: 0.76, ndviMeanBaseline: 0.77, ndmi: 0.28, ndmiBaseline: 0.30, dwTreesPct: 66.2, dwTreesBaseline: 67.8, s1RadarVhDb: -14.39, s1BaselineDb: -14.26, firmsHotspots: 10 },
      { period: '2026-11', ndviFullPct: 79.8, ndviFullBaseline: 84.05, ndviMean: 0.75, ndviMeanBaseline: 0.77, ndmi: 0.27, ndmiBaseline: 0.30, dwTreesPct: 65.4, dwTreesBaseline: 67.8, s1RadarVhDb: -14.48, s1BaselineDb: -14.26, firmsHotspots: 11, isPartialMonth: true }
    ]
  }
];