import React, { useEffect, useState } from 'react';
import { Loader2, Satellite, CheckCircle2, Clock } from 'lucide-react';
import { GeeDatasetSpec } from '../types/gee';

interface GeeComputationModalProps {
  isComputing: boolean;
  dataset: GeeDatasetSpec;
  regionName: string;
  onComplete: () => void;
}

const STEPS = [
  'Autenticando sesión en Google Earth Engine...',
  'Filtrando colecciones Sentinel-1 / Sentinel-2 / Dynamic World / FIRMS...',
  'Calculando series multitemporales (2018–2026) y media mensual...',
  'Consolidando anomalías y estado parcial por zona amazónica...'
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

    const totalDurationMs = 3600;
    const intervalMs = 120;
    const increment = 100 / (totalDurationMs / intervalMs);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + increment);
        const newStep = Math.min(
          STEPS.length - 1,
          Math.floor((next / 100) * STEPS.length)
        );
        setStepIndex(newStep);

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 300);
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isComputing, onComplete]);

  if (!isComputing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-[#16422c] bg-[#081d13] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#06b6d4]/15 text-[#22d3ee]">
              <Satellite className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Procesando consulta en Google Earth Engine
              </h3>
              <p className="text-xs text-[#94b3a3]">
                Zona: <span className="font-medium text-[#22d3ee]">{regionName}</span>
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-[#eab308]/40 bg-[#eab308]/10 px-2.5 py-1 text-[11px] font-medium text-[#facc15]">
            <Clock className="h-3 w-3" />
            ~1–3 min en GEE
          </span>
        </div>

        <div className="mt-5 rounded-xl border border-[#16422c] bg-[#04120b] p-3.5 text-xs">
          <div className="flex items-center justify-between text-[#94b3a3]">
            <span>Colección / Fuente:</span>
            <span className="font-mono text-[#22d3ee]">{dataset.geeCollectionId}</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[#94b3a3]">
            <span>Indicador activo:</span>
            <span className="font-medium text-white">{dataset.shortName}</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[#94b3a3]">
            <span>Resolución espacial:</span>
            <span className="font-medium text-[#4ade80]">{dataset.spatialResolution}</span>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 font-medium text-[#cde5d8]">
              {progress < 100 ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[#22d3ee]" />
              ) : (
                <CheckCircle2 className="h-3.5 w-3.5 text-[#4ade80]" />
              )}
              {STEPS[stepIndex]}
            </span>
            <span className="font-mono text-[#94b3a3]">{Math.round(progress)}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#04120b]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#22c55e] via-[#06b6d4] to-[#eab308] transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-[#94b3a3]">
          En producción, las series multitemporales (2018–2026) y anomalías mensuales en Earth Engine pueden demorar entre 1 y 3 minutos según la extensión de la zona y la cadencia satelital. Esta simulación muestra el flujo esperado en el MVP.
        </p>
      </div>
    </div>
  );
};