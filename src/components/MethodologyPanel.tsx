import React from 'react';
import { Database, AlertTriangle, Cpu, ExternalLink, Layers } from 'lucide-react';
import { GEE_DATASETS, GEE_APP_URL } from '../data/geeDatasets';
import { LayerId } from '../types/gee';

export const MethodologyPanel: React.FC = () => {
  const datasetList = Object.values(GEE_DATASETS) as (typeof GEE_DATASETS)[LayerId][];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#06b6d4]/30 bg-[#06b6d4]/10 px-3 py-1 text-xs font-medium text-[#22d3ee]">
              <Database className="h-3.5 w-3.5" />
              Arquitectura de Datos Geoespaciales · VIGIAMTEC
            </div>
            <h2 className="mt-2 text-xl font-bold text-white">
              Fuentes Satelitales, Series Multitemporales y Limitaciones Técnicas
            </h2>
            <p className="mt-1 max-w-3xl text-sm text-[#cde5d8]">
              El MVP integra información de <strong className="text-white">Google Earth Engine</strong>,{' '}
              <strong className="text-[#4ade80]">Sentinel-2</strong>,{' '}
              <strong className="text-[#facc15]">Dynamic World</strong>,{' '}
              <strong className="text-[#22d3ee]">Sentinel-1 (Radar Banda C)</strong> y{' '}
              <strong className="text-orange-300">NASA FIRMS</strong> para facilitar el seguimiento de ecosistemas amazónicos por zonas.
            </p>
          </div>

          <a
            href={GEE_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[#06b6d4]/40 bg-[#06b6d4]/10 px-4 py-2.5 text-xs font-semibold text-[#22d3ee] transition hover:bg-[#06b6d4]/20"
          >
            <span>Explorar App GEE Nativa</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-[#16422c] bg-[#04120b] p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#22d3ee]">
              <Layers className="h-4 w-4" />
              1. Fuentes Multifuente
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#cde5d8]">
              Combina reflectancia óptica/SWIR de Sentinel-2, clasificación arbórea de Dynamic World, retrodispersión SAR de Sentinel-1 y focos térmicos de NASA FIRMS por zona.
            </p>
          </div>

          <div className="rounded-xl border border-[#16422c] bg-[#04120b] p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4ade80]">
              <Cpu className="h-4 w-4" />
              2. Línea Base y Mes Parcial
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#cde5d8]">
              Compara los valores observados y el corte parcial del mes en curso frente a la media histórica mensual (línea base), anomalías (puntaje z) y tendencia anual.
            </p>
          </div>

          <div className="rounded-xl border border-[#16422c] bg-[#04120b] p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#facc15]">
              <AlertTriangle className="h-4 w-4" />
              3. Latencia y Validación Cruzada
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#cde5d8]">
              Las consultas amplias en Earth Engine toman 1–3 minutos; las métricas provisionales o afectadas por bruma/nubes deben contrastarse entre sensores ópticos, radar y focos térmicos.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {datasetList.map((ds) => (
          <div
            key={ds.id}
            className="flex flex-col justify-between rounded-2xl border border-[#16422c] bg-[#081d13] p-5"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-md bg-[#04120b] px-2.5 py-1 font-mono text-[11px] text-[#22d3ee]">
                  {ds.geeCollectionId}
                </span>
                <span className="rounded-full border border-[#eab308]/40 bg-[#eab308]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#facc15]">
                  {ds.sourceBadge}
                </span>
              </div>

              <h3 className="mt-3 text-base font-bold text-white">{ds.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#cde5d8]">
                {ds.scientificDescription}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-[#16422c] bg-[#04120b] p-3 text-xs">
                <div>
                  <span className="text-[#94b3a3]">Resolución:</span>
                  <p className="font-medium text-white">{ds.spatialResolution}</p>
                </div>
                <div>
                  <span className="text-[#94b3a3]">Unidad:</span>
                  <p className="font-mono text-[#4ade80]">{ds.unit}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 border-t border-[#16422c] pt-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#facc15]">
                Limitaciones y notas de interpretación
              </p>
              <ul className="mt-1.5 space-y-1 text-xs text-[#cde5d8]">
                {ds.caveatsAndLimitations.map((lim, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#eab308]" />
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
