import React, { useState } from 'react';
import {
  Trees,
  Flame,
  Wind,
  ShieldAlert,
  Play,
  MapPin,
  Info,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Layers
} from 'lucide-react';
import { Navbar, NavTab } from './components/Navbar';
import { LandingIntro } from './components/LandingIntro';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { GeeComputationModal } from './components/GeeComputationModal';
import { GeeLiveEmbed } from './components/GeeLiveEmbed';
import { MethodologyPanel } from './components/MethodologyPanel';
import { AMAZON_REGIONS, GEE_DATASETS, GEE_APP_URL } from './data/geeDatasets';
import { LayerId } from './types/gee';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('intro');
  const [selectedRegionId, setSelectedRegionId] = useState<string>(AMAZON_REGIONS[0].id);
  const [selectedLayer, setSelectedLayer] = useState<LayerId>('co_fire_smoke');
  const [isComputing, setIsComputing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Hoy, 12:45 PET (Caché GEE)');

  const currentRegion =
    AMAZON_REGIONS.find((r) => r.id === selectedRegionId) || AMAZON_REGIONS[0];
  const currentDataset = GEE_DATASETS[selectedLayer];

  const handleRunGeeAnalysis = () => {
    setIsComputing(true);
  };

  const handleComputationComplete = () => {
    setIsComputing(false);
    const now = new Date();
    setLastSyncTime(
      `Sincronizado ${now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })} PET`
    );
  };

  const alertBadgeStyle = {
    Bajo: 'border-[#22a31c]/50 bg-[#22a31c]/15 text-[#4ade80]',
    Moderado: 'border-[#eab308]/50 bg-[#eab308]/15 text-[#facc15]',
    Alto: 'border-orange-500/50 bg-orange-500/15 text-orange-300',
    Crítico: 'border-red-500/50 bg-red-500/15 text-red-300'
  }[currentRegion.coFireAlertLevel];

  return (
    <div className="min-h-screen bg-[#04120b] text-[#f0fdf4]">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <GeeComputationModal
        isComputing={isComputing}
        dataset={currentDataset}
        regionName={currentRegion.name}
        onComplete={handleComputationComplete}
      />

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6">
        {activeTab === 'intro' && (
          <LandingIntro
            onEnterDashboard={() => setActiveTab('dashboard')}
            onEnterGeeLive={() => setActiveTab('gee_live')}
          />
        )}

        {activeTab !== 'intro' && (
          <section className="mb-6 rounded-2xl border border-[#16422c] bg-gradient-to-r from-[#081d13] via-[#0b2a1c] to-[#062329] p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#eab308]/40 bg-[#eab308]/10 px-3 py-1 text-[11px] font-semibold text-[#facc15]">
                  <span>MVP Incubadora · Conservación Amazónica & MRV Satelital</span>
                </div>
                <h1 className="mt-2.5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Monitoreo Satelital de Biomasa, Incendios y Calidad del Aire
                </h1>
                <p className="mt-1.5 text-sm text-[#cde5d8]">
                  Transformamos petabytes de datos abiertos de <strong className="text-white">Google Earth Engine</strong> en alertas tempranas accionables para organizaciones de conservación, proyectos de carbono y gobiernos regionales.
                </p>
              </div>

              {/* Selector de Cuenca / Área de Monitoreo */}
              <div className="flex flex-col gap-2 rounded-xl border border-[#06b6d4]/40 bg-[#04120b]/90 p-3.5 sm:min-w-[330px]">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#22d3ee]">
                  <MapPin className="h-3.5 w-3.5" />
                  Unidad de Monitoreo Amazónico (AOI)
                </label>
                <select
                  value={selectedRegionId}
                  onChange={(e) => setSelectedRegionId(e.target.value)}
                  className="rounded-lg border border-[#16422c] bg-[#081d13] px-3 py-2 text-xs font-medium text-white focus:border-[#06b6d4] focus:outline-none"
                >
                  {AMAZON_REGIONS.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name} ({region.department})
                    </option>
                  ))}
                </select>
                <div className="flex items-center justify-between text-[11px] text-[#94b3a3]">
                  <span>Coord: {currentRegion.coordinates}</span>
                  <span>{currentRegion.areaHa.toLocaleString()} ha</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Barra de Control de Capas Satelitales y Ejecución GEE */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#16422c] bg-[#081d13] p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 flex items-center gap-1.5 text-xs font-semibold text-[#cde5d8]">
                  <Layers className="h-4 w-4 text-[#06b6d4]" />
                  Capa Activa:
                </span>
                {(Object.keys(GEE_DATASETS) as LayerId[]).map((layerKey) => {
                  const ds = GEE_DATASETS[layerKey];
                  const active = selectedLayer === layerKey;
                  return (
                    <button
                      key={layerKey}
                      onClick={() => setSelectedLayer(layerKey)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                        active
                          ? 'border-[#06b6d4] bg-[#06b6d4] font-semibold text-slate-950 shadow-sm'
                          : 'border-[#16422c] bg-[#04120b] text-[#cde5d8] hover:border-[#22a31c] hover:text-white'
                      }`}
                    >
                      {ds.shortName}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden items-center gap-1.5 text-xs text-[#94b3a3] sm:inline-flex">
                  <Clock className="h-3.5 w-3.5 text-[#eab308]" />
                  {lastSyncTime}
                </span>
                <button
                  onClick={handleRunGeeAnalysis}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#eab308] px-4 py-2 text-xs font-bold text-slate-950 shadow-lg transition hover:bg-[#facc15]"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  Recalcular en Earth Engine
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {/* KPI 1: Biomasa & NDVI */}
              <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#94b3a3]">Biomasa Aérea & Vigor (NDVI)</span>
                  <div className="rounded-lg bg-[#22a31c]/20 p-2 text-[#4ade80]">
                    <Trees className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-white">
                    {currentRegion.estimatedBiomassTonHa} t/ha
                  </span>
                  <span className="font-mono text-xs text-[#4ade80]">
                    NDVI {currentRegion.ndviMean}
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#94b3a3]">
                  Variación interanual:{' '}
                  <span className={currentRegion.ndviDeltaYoY >= 0 ? 'text-[#4ade80]' : 'text-[#facc15]'}>
                    {currentRegion.ndviDeltaYoY >= 0 ? `+${currentRegion.ndviDeltaYoY}` : currentRegion.ndviDeltaYoY} NDVI
                  </span>
                </p>
              </div>

              {/* KPI 2: Monóxido de Carbono (Incendios) */}
              <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#94b3a3]">CO Columna (Incendios Forestales)</span>
                  <div className="rounded-lg bg-[#eab308]/20 p-2 text-[#facc15]">
                    <Flame className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-white">
                    {currentRegion.coColumnDensity}
                  </span>
                  <span className="font-mono text-xs text-[#94b3a3]">mol/m²</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${alertBadgeStyle}`}>
                    Riesgo Quema: {currentRegion.coFireAlertLevel}
                  </span>
                  <span className="text-xs text-[#94b3a3]">{currentRegion.activeHotspots} anomalías</span>
                </div>
              </div>

              {/* KPI 3: NO2 Humo y Contaminación del Aire */}
              <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#94b3a3]">NO₂ Troposférico (Humo & Aire)</span>
                  <div className="rounded-lg bg-[#06b6d4]/20 p-2 text-[#22d3ee]">
                    <Wind className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-white">
                    {currentRegion.no2Tropospheric}
                  </span>
                  <span className="font-mono text-xs text-[#94b3a3]">µmol/m²</span>
                </div>
                <p className="mt-2 text-xs text-[#94b3a3]">
                  Sensor Sentinel-5P TROPOMI · Trazador de plumas de humo
                </p>
              </div>

              {/* KPI 4: Integridad Bosque Random Forest */}
              <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#94b3a3]">Integridad Bosque (Random Forest)</span>
                  <div className="rounded-lg bg-[#06b6d4]/20 p-2 text-[#22d3ee]">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-white">
                    {currentRegion.rfForestIntegrityPct}%
                  </span>
                  <span className="text-xs text-[#22d3ee]">dosel conservado</span>
                </div>
                <p className="mt-2 text-xs text-[#94b3a3]">
                  Modelo interoperable{' '}
                  <a
                    href={GEE_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#facc15] underline hover:text-white"
                  >
                    interopclassifierrf <ArrowUpRight className="h-3 w-3" />
                  </a>
                </p>
              </div>
            </div>

            {/* Ficha Contextual de la Capa Seleccionada */}
            <div className="grid grid-cols-1 gap-4 rounded-2xl border border-[#16422c] bg-[#081d13] p-5 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-[#06b6d4]/15 px-2.5 py-1 font-mono text-xs font-semibold text-[#22d3ee]">
                    {currentDataset.geeCollectionId}
                  </span>
                  <span className="text-xs text-[#94b3a3]">
                    Resolución: <strong className="text-white">{currentDataset.spatialResolution}</strong>
                  </span>
                </div>
                <h2 className="mt-2 text-base font-bold text-white">{currentDataset.title}</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-[#cde5d8]">
                  {currentDataset.scientificDescription}
                </p>

                {/* Leyenda de colores */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {currentDataset.colorScale.map((c) => (
                    <div
                      key={c.label}
                      className="flex items-center gap-2 rounded-lg border border-[#16422c] bg-[#04120b] px-2.5 py-1.5 text-[11px]"
                    >
                      <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: c.color }} />
                      <span className="text-[#f0fdf4]">{c.label}</span>
                      <span className="font-mono text-[#94b3a3]">({c.range})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Caja de Limitaciones Técnicas */}
              <div className="rounded-xl border border-[#eab308]/35 bg-[#04120b] p-4 lg:col-span-5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#facc15]">
                  <ShieldAlert className="h-4 w-4" />
                  <span>Notas Metodológicas y Limitaciones del Sensor</span>
                </div>
                <ul className="mt-2.5 space-y-2 text-xs text-[#cde5d8]">
                  {currentDataset.limitations.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#eab308]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Gráficos Analíticos */}
            <AnalyticsCharts region={currentRegion} />
          </div>
        )}

        {activeTab === 'gee_live' && <GeeLiveEmbed />}

        {activeTab === 'methodology' && <MethodologyPanel />}
      </main>
    </div>
  );
}

export default App;