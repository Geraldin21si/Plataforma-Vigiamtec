import React, { useState } from 'react';
import {
  Trees,
  Flame,
  Droplets,
  Radio,
  Layers,
  ShieldAlert,
  Play,
  MapPin,
  Info,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { Navbar, NavTab } from './components/Navbar';
import { LandingIntro } from './components/LandingIntro';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { GeeComputationModal } from './components/GeeComputationModal';
import { GeeLiveEmbed } from './components/GeeLiveEmbed';
import { MethodologyPanel } from './components/MethodologyPanel';
import { AMAZON_ZONES, GEE_DATASETS, GEE_APP_URL } from './data/geeDatasets';
import { LayerId } from './types/gee';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('intro');
  const [selectedZoneId, setSelectedZoneId] = useState<string>(AMAZON_ZONES[0].id);
  const [selectedLayer, setSelectedLayer] = useState<LayerId>('ndvi_full');
  const [isComputing, setIsComputing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Corte 2026-11-21 (Caché GEE)');

  const currentZone =
    AMAZON_ZONES.find((z) => z.id === selectedZoneId) || AMAZON_ZONES[0];
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

  const firmsBadgeStyle = {
    Bajo: 'border-[#22a31c]/50 bg-[#22a31c]/15 text-[#4ade80]',
    Moderado: 'border-[#eab308]/50 bg-[#eab308]/15 text-[#facc15]',
    Alto: 'border-red-500/50 bg-red-500/15 text-red-300'
  }[currentZone.firmsAlertLevel];

  return (
    <div className="min-h-screen bg-[#04120b] text-[#f0fdf4]">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <GeeComputationModal
        isComputing={isComputing}
        dataset={currentDataset}
        regionName={currentZone.name}
        onComplete={handleComputationComplete}
      />

      <main className="mx-auto max-w-[1680px] px-3 py-5 sm:px-5 lg:px-7">
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
                  <span>Vigilancia Ambiental por Zonas · Sentinel-1 · Sentinel-2 · Dynamic World · NASA FIRMS</span>
                </div>
                <h1 className="mt-2.5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Monitoreo Geoespacial de Ecosistemas Amazónicos
                </h1>
                <p className="mt-1.5 text-sm text-[#cde5d8]">
                  Consulta integrada de series históricas (2018–2026), anomalías respecto a la media mensual y estado parcial por zona amazónica.
                </p>
              </div>

              {/* Selector de Zona Amazónica */}
              <div className="flex flex-col gap-2 rounded-xl border border-[#06b6d4]/40 bg-[#04120b]/90 p-3.5 sm:min-w-[360px]">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#22d3ee]">
                  <MapPin className="h-3.5 w-3.5" />
                  Zona de Vigilancia Amazónica
                </label>
                <select
                  value={selectedZoneId}
                  onChange={(e) => setSelectedZoneId(e.target.value)}
                  className="rounded-lg border border-[#16422c] bg-[#081d13] px-3 py-2 text-xs font-medium text-white focus:border-[#06b6d4] focus:outline-none"
                >
                  {AMAZON_ZONES.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name} ({zone.department})
                    </option>
                  ))}
                </select>
                <div className="flex items-center justify-between text-[11px] text-[#94b3a3]">
                  <span>Coord: {currentZone.coordinates}</span>
                  <span>{currentZone.areaHa.toLocaleString()} ha</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Barra de Selección de Capa Satelital y Recálculo GEE */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#16422c] bg-[#081d13] p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 flex items-center gap-1.5 text-xs font-semibold text-[#cde5d8]">
                  <Layers className="h-4 w-4 text-[#06b6d4]" />
                  Indicador:
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
                  Consultar en Earth Engine
                </button>
              </div>
            </div>

            {/* 5 KPI Cards Reales del Script */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {/* KPI 1: Verde Pleno (NDVI >= 0.75) */}
              <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#94b3a3]">Verde Pleno (NDVI ≥ 0.75)</span>
                  <div className="rounded-lg bg-[#22a31c]/20 p-1.5 text-[#4ade80]">
                    <Trees className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-2.5 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-white">{currentZone.ndviFullPct}%</span>
                  <span className="font-mono text-[11px] text-[#4ade80]">NDVI {currentZone.ndviMean}</span>
                </div>
                <p className="mt-1.5 text-[11px] text-[#94b3a3]">
                  Anomalía: <span className="text-[#4ade80]">{currentZone.ndviFullAnomaly}</span>
                </p>
              </div>

              {/* KPI 2: Árboles (Dynamic World) */}
              <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#94b3a3]">Árboles (Dynamic World)</span>
                  <div className="rounded-lg bg-[#eab308]/20 p-1.5 text-[#facc15]">
                    <Layers className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-2.5 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-white">{currentZone.dwTreesPct}%</span>
                  <span className="rounded bg-orange-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-orange-300">
                    provisional
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] text-[#94b3a3]">
                  Anomalía: <span className="text-orange-300">{currentZone.dwTreesAnomaly}</span>
                </p>
              </div>

              {/* KPI 3: NDMI Humedad Vegetación */}
              <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#94b3a3]">NDMI (Humedad Vegetal)</span>
                  <div className="rounded-lg bg-[#06b6d4]/20 p-1.5 text-[#22d3ee]">
                    <Droplets className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-2.5 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-white">{currentZone.ndmiValue}</span>
                  <span className="font-mono text-[11px] text-[#22d3ee]">índice SWIR</span>
                </div>
                <p className="mt-1.5 text-[11px] text-[#94b3a3]">
                  Anomalía: <span className="text-[#cde5d8]">{currentZone.ndmiAnomaly}</span>
                </p>
              </div>

              {/* KPI 4: Radar Sentinel-1 VH */}
              <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#94b3a3]">Radar Sentinel-1 VH</span>
                  <div className="rounded-lg bg-[#06b6d4]/20 p-1.5 text-[#22d3ee]">
                    <Radio className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-2.5 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-white">{currentZone.s1RadarVhDb}</span>
                  <span className="font-mono text-xs text-[#94b3a3]">dB</span>
                </div>
                <p className="mt-1.5 text-[11px] text-[#94b3a3]">
                  Anomalía: <span className="text-[#4ade80]">{currentZone.s1RadarAnomaly}</span> · Banda C
                </p>
              </div>

              {/* KPI 5: NASA FIRMS Focos Activos */}
              <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#94b3a3]">NASA FIRMS (Focos Calor)</span>
                  <div className="rounded-lg bg-orange-500/20 p-1.5 text-orange-300">
                    <Flame className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-2.5 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-white">{currentZone.firmsHotspots}</span>
                  <span className="text-xs text-[#94b3a3]">anomalías</span>
                </div>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${firmsBadgeStyle}`}>
                    Riesgo: {currentZone.firmsAlertLevel}
                  </span>
                  <a
                    href={GEE_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[11px] text-[#facc15] underline hover:text-white"
                  >
                    App GEE <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Ficha Explicativa y Advertencias ("Ojo:") del Indicador Seleccionado */}
            <div className="grid grid-cols-1 gap-4 rounded-2xl border border-[#16422c] bg-[#081d13] p-5 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-[#22a31c]/20 px-2.5 py-1 text-xs font-semibold text-[#4ade80]">
                    {currentDataset.sourceBadge}
                  </span>
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

                {/* Escala de referencia */}
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

              {/* Caja "Ojo / Notas técnicas" tal como en el script */}
              <div className="rounded-xl border border-[#eab308]/35 bg-[#04120b] p-4 lg:col-span-5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#facc15]">
                  <ShieldAlert className="h-4 w-4" />
                  <span>Ojo · Notas de Interpretación y Limitaciones</span>
                </div>
                <ul className="mt-2.5 space-y-2 text-xs text-[#cde5d8]">
                  {currentDataset.caveatsAndLimitations.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#eab308]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Gráficos Históricos 2018-2026 */}
            <AnalyticsCharts region={currentZone} />
          </div>
        )}

        {activeTab === 'gee_live' && <GeeLiveEmbed />}

        {activeTab === 'methodology' && <MethodologyPanel />}
      </main>
    </div>
  );
}

export default App;