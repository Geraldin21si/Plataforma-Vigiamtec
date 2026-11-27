export type LayerId =
  | 'ndvi_full'
  | 'ndvi_mean'
  | 'ndmi_moisture'
  | 'dynamic_world_trees'
  | 'sentinel1_radar'
  | 'nasa_firms';

export interface GeeDatasetSpec {
  id: LayerId;
  shortName: string;
  title: string;
  sourceBadge: string;
  geeCollectionId: string;
  spatialResolution: string;
  unit: string;
  scientificDescription: string;
  caveatsAndLimitations: string[];
  colorScale: { label: string; color: string; range: string }[];
}

export interface TimeSeriesPoint {
  period: string;       // Ej. "2018", "2020", ..., "2026-11"
  ndviFullPct: number;  // Verde pleno (NDVI >= 0.75) [%]
  ndviFullBaseline: number;
  ndviMean: number;     // NDVI medio [índice]
  ndviMeanBaseline: number;
  ndmi: number;         // NDMI humedad vegetación [índice]
  ndmiBaseline: number;
  dwTreesPct: number;   // Probabilidad de árboles Dynamic World [%]
  dwTreesBaseline: number;
  s1RadarVhDb: number | null; // Radar Sentinel-1 VH [dB] (null en 2022-2024 por hueco Sentinel-1B)
  s1BaselineDb: number;
  firmsHotspots: number; // Focos de calor NASA FIRMS
  isPartialMonth?: boolean;
}

export interface AmazonZoneMetrics {
  id: string;
  name: string;
  department: string;
  areaHa: number;
  coordinates: string;
  partialCutDate: string;

  // 1. Verde pleno (NDVI >= 0.75) [%]
  ndviFullPct: number;
  ndviFullAnomaly: string;
  ndviFullTrend: string;

  // 2. NDVI medio [índice]
  ndviMean: number;
  ndviMeanAnomaly: string;
  ndviMeanTrend: string;

  // 3. NDMI (humedad de la vegetación) [índice]
  ndmiValue: number;
  ndmiAnomaly: string;
  ndmiTrend: string;

  // 4. Árboles (Dynamic World) [%]
  dwTreesPct: number;
  dwTreesAnomaly: string;
  dwTreesTrend: string;
  dwIsProvisional: boolean;

  // 5. Radar Sentinel-1 VH [dB]
  s1RadarVhDb: number;
  s1RadarAnomaly: string;
  s1RadarTrend: string;

  // 6. NASA FIRMS (Focos activos)
  firmsHotspots: number;
  firmsAlertLevel: 'Bajo' | 'Moderado' | 'Alto';

  timeSeries: TimeSeriesPoint[];
}