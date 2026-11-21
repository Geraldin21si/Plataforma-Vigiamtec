export type LayerId =
  | 'ndvi_biomass'
  | 'co_fire_smoke'
  | 'no2_air_quality'
  | 'rf_land_cover';

export interface GeeDatasetMetadata {
  id: LayerId;
  shortName: string;
  title: string;
  geeCollectionId: string;
  sensor: string;
  spatialResolution: string;
  temporalResolution: string;
  unit: string;
  colorScale: { label: string; color: string; range: string }[];
  scientificDescription: string;
  interpretationNote: string;
  limitations: string[];
  processingTimeSec: number;
}

export interface RegionMetrics {
  id: string;
  name: string;
  department: string;
  areaHa: number;
  coordinates: string;
  ndviMean: number;
  ndviDeltaYoY: number;
  estimatedBiomassTonHa: number;
  coColumnDensity: number; // mol/m^2
  coFireAlertLevel: 'Bajo' | 'Moderado' | 'Alto' | 'Crítico';
  no2Tropospheric: number; // umol/m^2
  rfForestIntegrityPct: number;
  activeHotspots: number;
  timeSeries: {
    month: string;
    ndvi: number;
    co_mol: number;
    no2_umol: number;
    biomass_index: number;
  }[];
  landCoverBreakdown: {
    className: string;
    percentage: number;
    hectares: number;
    color: string;
  }[];
}
