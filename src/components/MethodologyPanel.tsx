import React from 'react';
import { Database, AlertCircle, CheckCircle2, Flame, Wind, Trees, Cpu } from 'lucide-react';
import { GEE_DATASETS } from '../data/geeDatasets';

export const MethodologyPanel: React.FC = () => {
  const datasets = Object.values(GEE_DATASETS);

  const getIcon = (id: string) => {
    switch (id) {
      case 'co_fire_smoke':
        return <Flame className="h-5 w-5 text-orange-400" />;
      case 'no2_air_quality':
        return <Wind className="h-5 w-5 text-pink-400" />;
      case 'rf_land_cover':
        return <Cpu className="h-5 w-5 text-teal-400" />;
      default:
        return <Trees className="h-5 w-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-emerald-900/60 bg-[#071712] p-6">
        <div className="flex items-center gap-2.5 text-emerald-400">
          <Database className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Arquitectura de Datos Abiertos & Rigor Científico
          </span>
        </div>
        <h2 className="mt-2 text-xl font-bold text-white">
          Datasets de Google Earth Engine, Interpretación y Limitaciones Operativas
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-300">
          VIGIAMTEC democratiza el acceso a teledetección satelital de grado científico sobre la Amazonía, combinando análisis de biomasa con trazadores atmosféricos de incendios (<strong className="text-orange-300">CO</strong>) y contaminación del aire (<strong className="text-pink-300">NO₂</strong>), documentando explícitamente sus alcances y restricciones físicas.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {datasets.map((ds) => (
          <div
            key={ds.id}
            className="flex flex-col justify-between rounded-2xl border border-emerald-900/60 bg-[#071712] p-5"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-800/70 bg-[#040d0a]">
                    {getIcon(ds.id)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{ds.title}</h3>
                    <p className="font-mono text-xs text-emerald-400">{ds.geeCollectionId}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-emerald-900/50 bg-[#040d0a] p-3 text-xs">
                <div>
                  <span className="text-slate-500">Sensor / Misión:</span>
                  <p className="font-medium text-slate-200">{ds.sensor}</p>
                </div>
                <div>
                  <span className="text-slate-500">Resolución Espacial:</span>
                  <p className="font-medium text-slate-200">{ds.spatialResolution}</p>
                </div>
                <div>
                  <span className="text-slate-500">Frecuencia:</span>
                  <p className="font-medium text-slate-200">{ds.temporalResolution}</p>
                </div>
                <div>
                  <span className="text-slate-500">Latencia Cómputo GEE:</span>
                  <p className="font-mono text-amber-300">~{ds.processingTimeSec} seg</p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-300">
                {ds.scientificDescription}
              </p>

              <div className="mt-3 rounded-xl border border-emerald-500/25 bg-emerald-950/25 p-3 text-xs text-emerald-200">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Criterio de Interpretación:</span>
                </div>
                <p className="mt-1 leading-relaxed">{ds.interpretationNote}</p>
              </div>
            </div>

            <div className="mt-4 border-t border-emerald-900/50 pt-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>Limitaciones Técnicas Documentadas:</span>
              </div>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-400">
                {ds.limitations.map((lim, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400" />
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
