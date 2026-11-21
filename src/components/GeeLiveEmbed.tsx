import React, { useState } from 'react';
import { ExternalLink, Maximize2, Info, AlertTriangle, RefreshCw } from 'lucide-react';
import { GEE_APP_URL } from '../data/geeDatasets';

export const GeeLiveEmbed: React.FC = () => {
  const [iframeKey, setIframeKey] = useState(0);

  return (
    <div className="space-y-4">
      {/* Banner explicativo para evaluadores de incubadora */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
          <div className="text-xs text-slate-300">
            <p className="font-semibold text-white">
              Motor Geoespacial Conectado: Google Earth Engine App (interopclassifierrf)
            </p>
            <p className="mt-1 text-slate-400">
              Este módulo incrusta el visor oficial del equipo técnico conectado directamente a los catálogos de{' '}
              <span className="font-mono text-emerald-300">earthengine.google.com</span>. Nota: Al seleccionar áreas extensas o ejecutar Random Forest, los cálculos en servidores de Google pueden demorar entre <strong className="text-amber-300">1 y 3 minutos</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIframeKey((k) => k + 1)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-800 bg-[#071712] px-3 py-2 text-xs font-medium text-slate-200 hover:border-emerald-500 hover:text-white"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Recargar Visor
          </button>
          <a
            href={GEE_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-500"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            Pantalla Completa en GEE
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Contenedor Iframe */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-900/80 bg-[#071712] shadow-2xl">
        <div className="flex items-center justify-between border-b border-emerald-900/60 bg-[#040d0a] px-4 py-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-slate-300">{GEE_APP_URL}</span>
          </div>
          <span className="text-[11px] text-slate-500">
            Si el navegador bloquea el iframe por políticas X-Frame, usa "Pantalla Completa en GEE"
          </span>
        </div>

        <div className="relative h-[680px] w-full bg-[#040d0a]">
          <iframe
            key={iframeKey}
            src={GEE_APP_URL}
            title="VIGIAMTEC Google Earth Engine App"
            className="h-full w-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>

      {/* Nota técnica al pie */}
      <div className="flex items-center gap-2 rounded-xl border border-amber-500/25 bg-amber-950/20 px-4 py-3 text-xs text-amber-200/90">
        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" />
        <span>
          <strong>Transparencia Científica:</strong> Mientras GEE procesa capas ráster pesadas bajo demanda, el usuario puede auditar métricas agregadas en la pestaña <em>Panel Analítico & KPIs</em> sin tiempos de espera.
        </span>
      </div>
    </div>
  );
};
