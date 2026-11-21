import { GeeDatasetMetadata, RegionMetrics } from '../types/gee';

export const GEE_APP_URL = 'https://interopclassifierrf.projects.earthengine.app/view/vigiamtec';

export const GEE_DATASETS: Record<string, GeeDatasetMetadata> = {
  ndvi_biomass: {
    id: 'ndvi_biomass',
    shortName: 'NDVI / Biomasa',
    title: 'Vigor Vegetal y Estimación de Biomasa Aérea (Sentinel-2)',
    geeCollectionId: 'COPERNICUS/S2_SR_HARMONIZED',
    sensor: 'MSI (MultiSpectral Instrument) - ESA Sentinel-2A/2B',
    spatialResolution: '10 m / píxel',
    temporalResolution: '5 días (Composición mediana libre de nubes)',
    unit: 'Índice NDVI (-1 a +1) / tCO₂e',
    colorScale: [
      { label: 'Suelo desnudo / Agua', color: '#78350f', range: '< 0.20' },
      { label: 'Vegetación estresada / Rala', color: '#eab308', range: '0.20 - 0.50' },
      { label: 'Bosque secundario activo', color: '#22c55e', range: '0.50 - 0.75' },
      { label: 'Dosel primario denso (Alta biomasa)', color: '#065f46', range: '> 0.75' },
    ],
    scientificDescription:
      'Calcula el Índice de Vegetación de Diferencia Normalizada ((B8 - B4) / (B8 + B4)) sobre reflectancia de superficie armonizada para cuantificar actividad fotosintética, densidad del dosel y stock de carbono forestal.',
    interpretationNote:
      'Valores sostenidos > 0.75 indican bosque amazónico primario intacto. Caídas abruptas (> 0.18 en 30 días) alertan apertura de trochas, tala selectiva o degradación temprana.',
    limitations: [
      'Cobertura nubosa persistente en la Amazonía puede requerir ventanas compuestas de 15 a 30 días usando máscara QA60 / s2cloudless.',
      'El NDVI tiende a saturarse en bosques muy densos; se complementa con clasificación Random Forest para estructura de cobertura.',
      'El cálculo en tiempo real sobre polígonos > 50,000 ha en Google Earth Engine puede demorar entre 1 y 3 minutos.'
    ],
    processingTimeSec: 95
  },
  co_fire_smoke: {
    id: 'co_fire_smoke',
    shortName: 'CO (Incendios / Humo)',
    title: 'Monóxido de Carbono (CO) — Trazador de Plumas de Incendios Forestales',
    geeCollectionId: 'COPERNICUS/S5P/OFFL/L3_CO',
    sensor: 'TROPOMI - ESA Sentinel-5 Precursor',
    spatialResolution: '1,113 m (1.1 km)',
    temporalResolution: 'Diaria (Paso orbital ~13:30 hora local)',
    unit: 'mol/m² (Densidad vertical total de columna)',
    colorScale: [
      { label: 'Línea base amazónica limpia', color: '#0ea5e9', range: '< 0.028' },
      { label: 'Dispersión leve de humo', color: '#facc15', range: '0.028 - 0.036' },
      { label: 'Quema activa / Pluma densa', color: '#f97316', range: '0.036 - 0.048' },
      { label: 'Incendio forestal severo', color: '#ef4444', range: '> 0.048' },
    ],
    scientificDescription:
      'Mide la densidad vertical de columna de Monóxido de Carbono (CO) mediante espectrometría infrarroja de onda corta (SWIR). En la cuenca amazónica, el CO actúa como trazador químico directo de combustión incompleta de biomasa e incendios forestales.',
    interpretationNote:
      'A diferencia de las anomalías térmicas puras que pierden fuegos bajo el dosel o nubes finas, el CO detecta el penacho de humo transportado por el viento incluso horas después de iniciada la quema.',
    limitations: [
      'El CO específicamente rastrea emisiones de incendios y quema de biomasa; no distingue por sí solo el origen legal o ilegal de la quema sin cruce catastral.',
      'El transporte eólico puede desplazar la pluma de CO decenas de kilómetros respecto al foco térmico original (VIIRS/FIRMS).',
      'La agregación estadística de series temporales TROPOMI en GEE demora ~90 segundos por cuenca.'
    ],
    processingTimeSec: 110
  },
  no2_air_quality: {
    id: 'no2_air_quality',
    shortName: 'NO₂ (Contaminación Aire)',
    title: 'Dióxido de Nitrógeno (NO₂) — Humo y Contaminación Atmosférica',
    geeCollectionId: 'COPERNICUS/S5P/OFFL/L3_NO2',
    sensor: 'TROPOMI - ESA Sentinel-5 Precursor',
    spatialResolution: '1,113 m (1.1 km)',
    temporalResolution: 'Diaria',
    unit: 'µmol/m² (Columna troposférica)',
    colorScale: [
      { label: 'Aire prístino', color: '#14b8a6', range: '< 15' },
      { label: 'Aporte moderado humo/tránsito', color: '#a855f7', range: '15 - 30' },
      { label: 'Contaminación troposférica alta', color: '#ec4899', range: '30 - 55' },
      { label: 'Alerta crítica calidad de aire', color: '#e11d48', range: '> 55' },
    ],
    scientificDescription:
      'Cuantifica la densidad troposférica de Dióxido de Nitrógeno (NO₂), monitoreando simultáneamente el impacto del humo de quemas de biomasa y focos de contaminación del aire asociados a corredores viales, minería aluvial y centros poblados.',
    interpretationNote:
      'Al cruzar NO₂ con CO se diferencia contaminación asociada a humo de incendios (alta correlación CO + NO₂) frente a emisiones urbanas o maquinaria pesada (picos aislados de NO₂).',
    limitations: [
      'Vida media atmosférica corta (pocas horas), por lo que refleja emisiones recientes cercanas al horario de paso satelital.',
      'Sensible a nubes convectivas densas (se aplica filtro qa_value > 0.75 en el script de Earth Engine).',
      'Requiere reducción espacial en servidor GEE antes de renderizar curvas históricas.'
    ],
    processingTimeSec: 85
  },
  rf_land_cover: {
    id: 'rf_land_cover',
    shortName: 'Clasificador RF (Interoperabilidad)',
    title: 'Clasificación Supervisada Random Forest — Cobertura y Uso de Suelo',
    geeCollectionId: 'VIGIAMTEC/RF_INTEROP_V2 (Sentinel-2 + Landsat 8/9 + SRTM)',
    sensor: 'Fusión Multisensor Interoperable (Optical + Radar/Topografía)',
    spatialResolution: '10 m - 30 m',
    temporalResolution: 'Trimestral / Bajo demanda',
    unit: 'Clases categóricas & Probabilidad (%)',
    colorScale: [
      { label: 'Bosque Primario Húmedo', color: '#059669', range: 'Clase 1' },
      { label: 'Bosque Secundario / Purma', color: '#34d399', range: 'Clase 2' },
      { label: 'Agricultura / Pastizal', color: '#fbbf24', range: 'Clase 3' },
      { label: 'Suelo Degradado / Minería', color: '#dc2626', range: 'Clase 4' },
    ],
    scientificDescription:
      'Modelo de aprendizaje automático Random Forest ejecutado en la nube de Google Earth Engine (referencia operativa interopclassifierrf) que integra bandas espectrales, índices de textura y elevación para discriminar cobertura forestal frente a intervención antrópica.',
    interpretationNote:
      'Permite auditar compromisos de cero deforestación y medir el porcentaje real de integridad ecológica dentro de concesiones de conservación, comunidades nativas o áreas amortiguamiento.',
    limitations: [
      'Es el proceso computacionalmente más intensivo: entrenar/inferir Random Forest sobre múltiples escenas puede tomar de 2 a 4 minutos en GEE.',
      'Confusión espectral posible entre cultivos agroforestales jóvenes (cacao/café bajo sombra) y bosque secundario temprano.'
    ],
    processingTimeSec: 150
  }
};

export const AMAZON_REGIONS: RegionMetrics[] = [
  {
    id: 'tambopata',
    name: 'Corredor Tambopata - Bahuaja Sonene',
    department: 'Madre de Dios',
    areaHa: 142500,
    coordinates: "12°50'S 69°17'W",
    ndviMean: 0.81,
    ndviDeltaYoY: -0.03,
    estimatedBiomassTonHa: 284,
    coColumnDensity: 0.041,
    coFireAlertLevel: 'Alto',
    no2Tropospheric: 34.2,
    rfForestIntegrityPct: 91.4,
    activeHotspots: 14,
    timeSeries: [
      { month: 'Jun', ndvi: 0.84, co_mol: 0.025, no2_umol: 14.1, biomass_index: 95 },
      { month: 'Jul', ndvi: 0.83, co_mol: 0.029, no2_umol: 18.5, biomass_index: 94 },
      { month: 'Ago', ndvi: 0.82, co_mol: 0.038, no2_umol: 28.9, biomass_index: 92 },
      { month: 'Sep', ndvi: 0.79, co_mol: 0.049, no2_umol: 41.0, biomass_index: 90 },
      { month: 'Oct', ndvi: 0.80, co_mol: 0.044, no2_umol: 36.8, biomass_index: 91 },
      { month: 'Nov', ndvi: 0.81, co_mol: 0.041, no2_umol: 34.2, biomass_index: 91.4 },
    ],
    landCoverBreakdown: [
      { className: 'Bosque Primario Denso', percentage: 82.6, hectares: 117705, color: '#059669' },
      { className: 'Bosque Secundario / Ribereño', percentage: 8.8, hectares: 12540, color: '#34d399' },
      { className: 'Cuerpos de Agua / Humedales', percentage: 4.1, hectares: 5842, color: '#0284c7' },
      { className: 'Intervención / Suelo Expuesto', percentage: 4.5, hectares: 6413, color: '#ef4444' },
    ]
  },
  {
    id: 'pacaya_samiria',
    name: 'Reserva Nacional Pacaya Samiria (Zona Amortiguamiento)',
    department: 'Loreto',
    areaHa: 215800,
    coordinates: "05°15'S 74°40'W",
    ndviMean: 0.86,
    ndviDeltaYoY: +0.01,
    estimatedBiomassTonHa: 312,
    coColumnDensity: 0.026,
    coFireAlertLevel: 'Bajo',
    no2Tropospheric: 12.8,
    rfForestIntegrityPct: 96.8,
    activeHotspots: 2,
    timeSeries: [
      { month: 'Jun', ndvi: 0.85, co_mol: 0.023, no2_umol: 11.2, biomass_index: 96 },
      { month: 'Jul', ndvi: 0.85, co_mol: 0.024, no2_umol: 11.9, biomass_index: 96 },
      { month: 'Ago', ndvi: 0.86, co_mol: 0.028, no2_umol: 14.5, biomass_index: 96.5 },
      { month: 'Sep', ndvi: 0.85, co_mol: 0.031, no2_umol: 16.2, biomass_index: 96.2 },
      { month: 'Oct', ndvi: 0.86, co_mol: 0.027, no2_umol: 13.4, biomass_index: 96.7 },
      { month: 'Nov', ndvi: 0.86, co_mol: 0.026, no2_umol: 12.8, biomass_index: 96.8 },
    ],
    landCoverBreakdown: [
      { className: 'Bosque Inundable / Primario', percentage: 89.2, hectares: 192494, color: '#059669' },
      { className: 'Aguajales / Vegetación Húmeda', percentage: 7.6, hectares: 16401, color: '#34d399' },
      { className: 'Cocha / Ríos Amazónicos', percentage: 2.3, hectares: 4963, color: '#0284c7' },
      { className: 'Uso Agroforestal Comunal', percentage: 0.9, hectares: 1942, color: '#f59e0b' },
    ]
  },
  {
    id: 'ucayali_aguatia',
    name: 'Cuenca Media Aguaytía - Padre Abad',
    department: 'Ucayali',
    areaHa: 98400,
    coordinates: "08°58'S 75°30'W",
    ndviMean: 0.72,
    ndviDeltaYoY: -0.07,
    estimatedBiomassTonHa: 218,
    coColumnDensity: 0.051,
    coFireAlertLevel: 'Crítico',
    no2Tropospheric: 46.5,
    rfForestIntegrityPct: 78.2,
    activeHotspots: 29,
    timeSeries: [
      { month: 'Jun', ndvi: 0.78, co_mol: 0.028, no2_umol: 19.0, biomass_index: 84 },
      { month: 'Jul', ndvi: 0.76, co_mol: 0.035, no2_umol: 26.4, biomass_index: 82 },
      { month: 'Ago', ndvi: 0.73, co_mol: 0.047, no2_umol: 39.8, biomass_index: 80 },
      { month: 'Sep', ndvi: 0.69, co_mol: 0.058, no2_umol: 52.1, biomass_index: 77 },
      { month: 'Oct', ndvi: 0.71, co_mol: 0.054, no2_umol: 48.9, biomass_index: 77.8 },
      { month: 'Nov', ndvi: 0.72, co_mol: 0.051, no2_umol: 46.5, biomass_index: 78.2 },
    ],
    landCoverBreakdown: [
      { className: 'Bosque Remanente de Colina', percentage: 61.5, hectares: 60516, color: '#059669' },
      { className: 'Bosque Secundario (Purma)', percentage: 16.7, hectares: 16433, color: '#34d399' },
      { className: 'Cultivos / Pasturas', percentage: 15.4, hectares: 15154, color: '#fbbf24' },
      { className: 'Suelo Quemado / Degradado', percentage: 6.4, hectares: 6297, color: '#dc2626' },
    ]
  }
];