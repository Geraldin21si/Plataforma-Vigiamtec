import React from 'react';
import {
  ArrowRight,
  Flame,
  Wind,
  Trees,
  Clock,
  ExternalLink,
  Sparkles,
  ShieldCheck
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
      {/* Hero Principal Llamativo */}
      <section className="relative overflow-hidden rounded-3xl border border-[#16422c] bg-gradient-to-br from-[#081d13] via-[#07261a] to-[#05232b] p-7 sm:p-10 lg:p-12 shadow-2xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#eab308]/50 bg-[#eab308]/15 px-4 py-1.5 text-xs font-semibold text-[#facc15]">
              <Sparkles className="h-4 w-4" />
              <span>VIGIAMTEC · Inteligencia Satelital para la Amazonía</span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Protegemos el bosque y el aire con{' '}
              <span className="bg-gradient-to-r from-[#4ade80] via-[#22d3ee] to-[#facc15] bg-clip-text text-transparent">
                Google Earth Engine
              </span>
            </h1>

            <p className="max-w-3xl text-base leading-relaxed text-[#cde5d8] sm:text-lg">
              En <strong className="text-white">VIGIAMTEC</strong> convertimos datos satelitales abiertos en información clara para monitorear{' '}
              <strong className="text-[#4ade80]">biomasa y cobertura vegetal</strong>, detectar{' '}
              <strong className="text-[#facc15]">incendios forestales mediante Monóxido de Carbono (CO)</strong> y vigilar{' '}
              <strong className="text-[#22d3ee]">humo y contaminación del aire con NO₂</strong>.
            </p>

            {/* Botones de Acción Directa */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onEnterDashboard}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#22c55e] px-6 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg transition hover:brightness-110 sm:text-base"
              >
                <span>Explorar Panel Analítico</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onEnterGeeLive}
                className="inline-flex items-center gap-2 rounded-xl border border-[#eab308]/60 bg-[#081d13] px-5 py-3.5 text-sm font-semibold text-[#facc15] transition hover:border-[#eab308] hover:bg-[#0e2b1d] hover:text-white sm:text-base"
              >
                <span>Probar Visor GEE</span>
              </button>

              <a
                href={GEE_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#94b3a3] underline-offset-4 hover:text-white hover:underline sm:text-sm"
              >
                <span>Ver app nativa (interopclassifierrf)</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Tarjeta Visual con el Logo y Resumen Rápido */}
          <div className="flex flex-col items-center rounded-2xl border border-[#06b6d4]/35 bg-[#04120b]/85 p-7 text-center lg:col-span-4">
            <img
              src="/logo.jpeg"
              alt="Logo de VIGIAMTEC"
              className="h-32 w-32 rounded-full border-4 border-[#eab308] bg-white object-cover shadow-xl"
            />
            <h2 className="mt-4 text-xl font-extrabold text-white">¿Qué hacemos en simple?</h2>
            <p className="mt-2 text-xs leading-relaxed text-[#94b3a3] sm:text-sm">
              Unimos teledetección satelital, clasificación Random Forest y analítica visual para que comunidades, proyectos ambientales y evaluadores tomen decisiones rápidas.
            </p>
            <div className="mt-5 grid w-full grid-cols-3 gap-2 border-t border-[#16422c] pt-4 text-center">
              <div>
                <p className="text-base font-extrabold text-[#4ade80]">NDVI</p>
                <p className="text-[11px] text-[#94b3a3]">Biomasa</p>
              </div>
              <div>
                <p className="text-base font-extrabold text-[#facc15]">CO</p>
                <p className="text-[11px] text-[#94b3a3]">Incendios</p>
              </div>
              <div>
                <p className="text-base font-extrabold text-[#22d3ee]">NO₂</p>
                <p className="text-[11px] text-[#94b3a3]">Humo / Aire</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pilares Claros */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#22a31c]/20 text-[#4ade80]">
            <Trees className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-white">1. Biomasa y Cobertura</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#cde5d8]">
            Seguimos el vigor de la vegetación y la integridad del bosque mediante índices espectrales y clasificación Random Forest sobre datos de Google Earth Engine.
          </p>
        </div>

        <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eab308]/20 text-[#facc15]">
            <Flame className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-white">2. Monóxido de Carbono (CO)</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#cde5d8]">
            El CO se usa específicamente para rastrear emisiones de incendios forestales y quema de biomasa, complementando el seguimiento de focos y plumas.
          </p>
        </div>

        <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#06b6d4]/20 text-[#22d3ee]">
            <Wind className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-white">3. Humo y Calidad del Aire (NO₂)</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#cde5d8]">
            Monitoreamos el Dióxido de Nitrógeno (NO₂) para evaluar el impacto de humo y contaminación atmosférica en zonas sensibles.
          </p>
        </div>
      </section>

      {/* Nota Honesta de Tiempos de Cálculo y Limitaciones */}
      <section className="grid grid-cols-1 gap-5 rounded-2xl border border-[#eab308]/40 bg-[#081d13] p-6 md:grid-cols-2">
        <div className="flex items-start gap-3.5">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#eab308]" />
          <div>
            <h4 className="text-base font-bold text-[#facc15]">Tiempos de cómputo en Earth Engine</h4>
            <p className="mt-1 text-sm leading-relaxed text-[#cde5d8]">
              Algunos cálculos en Google Earth Engine pueden demorar un par de minutos al procesar áreas amplias o modelos; por eso el panel integra gráficos y datos listos para revisar sin cortes.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#22d3ee]" />
          <div>
            <h4 className="text-base font-bold text-white">Transparencia y limitaciones</h4>
            <p className="mt-1 text-sm leading-relaxed text-[#cde5d8]">
              Dentro del panel y en la sección de metodología incluimos descripciones, explicaciones y limitaciones de cada dataset satelital para que la lectura sea responsable.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};