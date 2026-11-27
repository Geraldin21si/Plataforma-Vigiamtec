import React from 'react';
import {
  ArrowRight,
  Flame,
  Trees,
  Radio,
  Sparkles,
  ExternalLink,
  Layers,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { GEE_APP_URL } from '../data/geeDatasets';

interface LandingIntroProps {
  onEnterDashboard: () => void;
  onEnterGeeLive: () => void;
}

export const LandingIntro: React.FC<LandingIntroProps> = ({
  onEnterDashboard,
  onEnterGeeLive
}) => {
  return (
    <div className="space-y-9">
      {/* Hero Principal */}
      <section className="relative overflow-hidden rounded-3xl border border-[#16422c] bg-gradient-to-br from-[#081d13] via-[#07261a] to-[#05232b] p-7 sm:p-10 lg:p-12 shadow-2xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#eab308]/50 bg-[#eab308]/15 px-4 py-1.5 text-xs font-semibold text-[#facc15]">
              <Sparkles className="h-4 w-4" />
              <span>VIGIAMTEC · Vigilancia Geoespacial Amazónica Multifuente</span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Monitoreo satelital integrado para la{' '}
              <span className="bg-gradient-to-r from-[#4ade80] via-[#22d3ee] to-[#facc15] bg-clip-text text-transparent">
                conservación amazónica
              </span>
            </h1>

            <p className="max-w-3xl text-base leading-relaxed text-[#cde5d8] sm:text-lg">
              Las organizaciones de conservación necesitan vigilar los cambios ambientales de sus territorios sin perder tiempo cruzando fuentes dispersas.{' '}
              <strong className="text-white">VIGIAMTEC</strong> centraliza en un panel interactivo datos de{' '}
              <strong className="text-[#4ade80]">Sentinel-2</strong>,{' '}
              <strong className="text-[#facc15]">Dynamic World</strong>,{' '}
              <strong className="text-[#22d3ee]">Radar Sentinel-1</strong> y{' '}
              <strong className="text-orange-300">NASA FIRMS</strong> sobre Google Earth Engine.
            </p>

            {/* Botones de Acción */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onEnterDashboard}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#22c55e] px-6 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg transition hover:brightness-110 sm:text-base"
              >
                <span>Explorar Panel por Zonas</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onEnterGeeLive}
                className="inline-flex items-center gap-2 rounded-xl border border-[#eab308]/60 bg-[#081d13] px-5 py-3.5 text-sm font-semibold text-[#facc15] transition hover:border-[#eab308] hover:bg-[#0e2b1d] hover:text-white sm:text-base"
              >
                <span>Visor GEE Interactivo</span>
              </button>

              <a
                href={GEE_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#94b3a3] underline-offset-4 hover:text-white hover:underline sm:text-sm"
              >
                <span>Abrir App GEE (interopclassifierrf)</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Tarjeta Propuesta de Valor + Logo */}
          <div className="flex flex-col items-center rounded-2xl border border-[#06b6d4]/35 bg-[#04120b]/85 p-7 text-center lg:col-span-4">
            <img
              src="/logo.jpeg"
              alt="Logo de VIGIAMTEC"
              className="h-32 w-32 rounded-full border-4 border-[#eab308] bg-white object-cover shadow-xl"
            />
            <h2 className="mt-4 text-xl font-extrabold text-white">Propuesta de Valor</h2>
            <p className="mt-2 text-xs leading-relaxed text-[#94b3a3] sm:text-sm">
              Centralizar información ambiental satelital en un panel geoespacial claro e interactivo que facilite la consulta, comparación y comprensión de ecosistemas amazónicos por zonas.
            </p>
            <div className="mt-5 grid w-full grid-cols-4 gap-1.5 border-t border-[#16422c] pt-4 text-center">
              <div>
                <p className="text-xs font-extrabold text-[#4ade80]">NDVI</p>
                <p className="text-[10px] text-[#94b3a3]">Verdor</p>
              </div>
              <div>
                <p className="text-xs font-extrabold text-[#22d3ee]">NDMI</p>
                <p className="text-[10px] text-[#94b3a3]">Humedad</p>
              </div>
              <div>
                <p className="text-xs font-extrabold text-[#facc15]">SAR</p>
                <p className="text-[10px] text-[#94b3a3]">Radar</p>
              </div>
              <div>
                <p className="text-xs font-extrabold text-orange-300">FIRMS</p>
                <p className="text-[10px] text-[#94b3a3]">Fuego</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Recursos Satelitales Integrados */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#22a31c]/20 text-[#4ade80]">
            <Trees className="h-6 w-6" />
          </div>
          <h3 className="mt-3.5 text-base font-bold text-white">Sentinel-2 (Óptico)</h3>
          <p className="mt-1.5 text-xs leading-relaxed text-[#cde5d8]">
            Evalúa <strong>Verde Pleno (NDVI ≥ 0.75)</strong>, <strong>NDVI medio</strong> y <strong>NDMI</strong> para detectar estrés hídrico foliar y vigor del dosel.
          </p>
        </div>

        <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eab308]/20 text-[#facc15]">
            <Layers className="h-6 w-6" />
          </div>
          <h3 className="mt-3.5 text-base font-bold text-white">Dynamic World (IA)</h3>
          <p className="mt-1.5 text-xs leading-relaxed text-[#cde5d8]">
            Clasificador de Google casi en tiempo real sobre Sentinel-2 que estima la <strong>probabilidad de cobertura arbórea (%)</strong> por zona.
          </p>
        </div>

        <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#06b6d4]/20 text-[#22d3ee]">
            <Radio className="h-6 w-6" />
          </div>
          <h3 className="mt-3.5 text-base font-bold text-white">Sentinel-1 (Radar SAR)</h3>
          <p className="mt-1.5 text-xs leading-relaxed text-[#cde5d8]">
            Radar de banda C (polarización VH en dB) que <strong>atraviesa las nubes</strong> y funciona de noche para confirmar pérdida estructural o inundación.
          </p>
        </div>

        <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/20 text-orange-300">
            <Flame className="h-6 w-6" />
          </div>
          <h3 className="mt-3.5 text-base font-bold text-white">NASA FIRMS</h3>
          <p className="mt-1.5 text-xs leading-relaxed text-[#cde5d8]">
            Detección térmica activa de focos de calor para cruzar alertas tempranas de incendios con la humedad foliar (NDMI).
          </p>
        </div>
      </section>

      {/* Rigor Técnico y Tiempos de Procesamiento */}
      <section className="grid grid-cols-1 gap-5 rounded-2xl border border-[#eab308]/40 bg-[#081d13] p-6 md:grid-cols-2">
        <div className="flex items-start gap-3.5">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#eab308]" />
          <div>
            <h4 className="text-base font-bold text-[#facc15]">Procesamiento en Google Earth Engine</h4>
            <p className="mt-1 text-sm leading-relaxed text-[#cde5d8]">
              El cálculo multitemporal (2018–2026) por zona en Earth Engine puede tomar 1 a 3 minutos; el panel muestra cortes parciales verificados y permite lanzar recálculos guiados.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#22d3ee]" />
          <div>
            <h4 className="text-base font-bold text-white">Interpretación científica transparente</h4>
            <p className="mt-1 text-sm leading-relaxed text-[#cde5d8]">
              Cada indicador incluye su línea base mensual, anomalía (puntaje z), tendencia anual y advertencias técnicas (saturación óptica, bruma provisional y hueco Sentinel-1B).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};