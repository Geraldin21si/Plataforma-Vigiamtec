import React, { useEffect, useState } from 'react';
import { Cpu, CheckCircle2, Loader2, Server } from 'lucide-react';
import { GeeDatasetMetadata } from '../types/gee';

interface GeeComputationModalProps {
  isComputing: boolean;
  dataset: GeeDatasetMetadata;
  regionName: string;
  onComplete: () => void;
}

const PIPELINE_STEPS = [
  'Conectando con Google Earth Engine Python/JS API...',
  'Filtrando colección satelital y aplicando máscara de nubes (QA60 / qa_value)...',
  'Ejecutando reducción espacial (ee.Reducer.mean / Random Forest Classifier)...',
  'Sincronizando series temporales de biomasa, CO (incendios) y NO₂...'
];

export const GeeComputationModal: React.FC<GeeComputationModalProps> = ({
  isComputing,
  dataset,
  regionName,
  onComplete
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isComputing) {
      setStepIndex(0);
      setProgress(0);
      return;
    }

    const totalDuration = 2600; // Simulación ágil para demo de pitch (explicando latencia real GEE)
    const intervalMs = 50;
    const increment = 100 / (totalDuration / intervalMs);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + increment, 100);
        setStepIndex(Math.min(Math.floor((next / 100) * PIPELINE_STEPS.length), PIPELINE_STEPS.length - 1));
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 250);
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isComputing, onComplete]);

  if (!isComputing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-emerald-500/40 bg-[#071712] p-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
            <Cpu className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Procesando Colección en Google Earth Engine
            </h3>
            <p className="font-mono text-xs text-emerald-400">
              {dataset.geeCollectionId}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-emerald-900/70 bg-[#040d0a] p-3.5 text-xs text-slate-300">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Área de Interés (AOI):</span>
            <span className="font-semibold text-white">{regionName}</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-slate-400">Tiempo estimado en servidor GEE real:</span>
            <span className="font-mono text-amber-300">~{dataset.processingTimeSec}s (2-3 min en polígonos extensos)</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5">
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="font-medium text-emerald-300">Ejecución distribuida en nube</span>
            <span className="font-mono text-slate-300">{Math.round(progress)}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-emerald-950">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="mt-5 space-y-2.5">
          {PIPELINE_STEPS.map((label, idx) => {
            const done = idx < stepIndex || progress === 100;
            const active = idx === stepIndex && progress < 100;
            return (
              <div key={label} className="flex items-center gap-2.5 text-xs">
                {done ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                ) : active ? (
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin text-amber-400" />
                ) : (
                  <Server className="h-4 w-4 shrink-0 text-slate-600" />
                )}
                <span className={done ? 'text-slate-200' : active ? 'font-medium text-white' : 'text-slate-500'}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
