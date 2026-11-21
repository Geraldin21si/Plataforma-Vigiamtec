import React from 'react';
import { ShieldCheck, ExternalLink, Sparkles, Layers } from 'lucide-react';
import { GEE_APP_URL } from '../data/geeDatasets';
export type NavTab = 'intro' | 'dashboard' | 'gee_live' | 'methodology';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-[#16422c] bg-[#04120b]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpeg"
            alt="Logo de VIGIAMTEC"
            className="h-11 w-11 rounded-full border-2 border-[#eab308]/70 bg-white object-cover shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight text-white">
                VIGIAMTEC
              </span>
              <span className="rounded-full border border-[#eab308]/50 bg-[#eab308]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#facc15]">
                ODS 15 · Earth Engine
              </span>
            </div>
            <p className="text-xs text-[#94b3a3]">
              Inteligencia Satelital de Biomasa, Incendios y Calidad del Aire Amazónico
            </p>
          </div>
        </div>

        {/* Navigation Pills */}
        <nav className="flex items-center gap-1 rounded-xl border border-[#16422c] bg-[#081d13] p-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-[#06b6d4] font-semibold text-slate-950 shadow-sm'
                : 'text-[#cde5d8] hover:bg-[#0e2b1d] hover:text-white'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            Panel Analítico & KPIs
          </button>

          <button
            onClick={() => setActiveTab('gee_live')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeTab === 'gee_live'
                ? 'bg-[#06b6d4] font-semibold text-slate-950 shadow-sm'
                : 'text-[#cde5d8] hover:bg-[#0e2b1d] hover:text-white'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Visor GEE Interactivo
          </button>

          <button
            onClick={() => setActiveTab('methodology')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeTab === 'methodology'
                ? 'bg-[#06b6d4] font-semibold text-slate-950 shadow-sm'
                : 'text-[#cde5d8] hover:bg-[#0e2b1d] hover:text-white'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Datasets & Limitaciones
          </button>
        </nav>

        {/* Direct Link to Lead's GEE App */}
        <a
          href={GEE_APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-[#eab308]/50 bg-[#081d13] px-3.5 py-2 text-xs font-semibold text-[#facc15] transition hover:border-[#eab308] hover:bg-[#0e2b1d] hover:text-white"
        >
          <span>Abrir App GEE Nativa</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
};