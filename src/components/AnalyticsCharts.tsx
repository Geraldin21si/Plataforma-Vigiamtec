import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  Line,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { RegionMetrics } from '../types/gee';

interface AnalyticsChartsProps {
  region: RegionMetrics;
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ region }) => {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
      {/* Gráfico 1: Correlación Incendios (CO) y Contaminación (NO2) */}
      <div className="rounded-2xl border border-emerald-900/60 bg-[#071712] p-5 xl:col-span-7">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white">
              Dinámica Atmosférica: Monóxido de Carbono (Incendios) vs. NO₂ (Humo y Aire)
            </h3>
            <p className="text-xs text-slate-400">
              Serie temporal Sentinel-5P TROPOMI · Picos de CO confirman combustión de biomasa
            </p>
          </div>
          <span className="rounded-md border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 font-mono text-[11px] text-orange-300">
            COPERNICUS/S5P/OFFL
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={region.timeSeries} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#153a2e" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis
                yAxisId="left"
                stroke="#f97316"
                fontSize={11}
                tickFormatter={(v) => `${v}`}
                label={{ value: 'CO (mol/m²)', angle: -90, position: 'insideLeft', fill: '#fb923c', fontSize: 10 }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#ec4899"
                fontSize={11}
                label={{ value: 'NO₂ (µmol/m²)', angle: 90, position: 'insideRight', fill: '#f472b6', fontSize: 10 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#040d0a',
                  borderColor: '#153a2e',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
              <Bar
                yAxisId="right"
                dataKey="no2_umol"
                name="NO₂ Contaminación Aire (µmol/m²)"
                fill="#ec4899"
                fillOpacity={0.35}
                radius={[4, 4, 0, 0]}
                barSize={26}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="co_mol"
                name="CO Incendios / Humo (mol/m²)"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ r: 4, fill: '#f97316' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico 2: Clasificación Random Forest Cobertura */}
      <div className="rounded-2xl border border-emerald-900/60 bg-[#071712] p-5 xl:col-span-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white">
              Cobertura Forestal (Modelo Random Forest)
            </h3>
            <p className="text-xs text-slate-400">
              Distribución interoperable sobre {region.areaHa.toLocaleString()} ha
            </p>
          </div>
          <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 font-mono text-[11px] text-emerald-300">
            RF Classifier
          </span>
        </div>

        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={region.landCoverBreakdown}
                dataKey="percentage"
                nameKey="className"
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={78}
                paddingAngle={3}
              >
                {region.landCoverBreakdown.map((entry) => (
                  <Cell key={entry.className} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, _name: string, props: { payload?: { hectares?: number } }) => [
                  `${value}% (${props?.payload?.hectares?.toLocaleString()} ha)`,
                  'Cobertura'
                ]}
                contentStyle={{
                  backgroundColor: '#040d0a',
                  borderColor: '#153a2e',
                  borderRadius: '10px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 space-y-1.5">
          {region.landCoverBreakdown.map((item) => (
            <div key={item.className} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300">{item.className}</span>
              </div>
              <span className="font-mono font-semibold text-white">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gráfico 3: Evolución NDVI y Estabilidad de Biomasa */}
      <div className="rounded-2xl border border-emerald-900/60 bg-[#071712] p-5 xl:col-span-12">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white">
              Evolución de Vigor Vegetal (NDVI) y Retención de Biomasa Aérea
            </h3>
            <p className="text-xs text-slate-400">
              Monitoreo multitemporal Sentinel-2 SR · Detección temprana de pérdida de dosel antes de tala rasa
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              NDVI Medio ({region.ndviMean})
            </span>
            <span className="flex items-center gap-1.5 text-teal-300">
              <span className="h-2 w-2 rounded-full bg-teal-400" />
              Índice Biomasa ({region.estimatedBiomassTonHa} t/ha)
            </span>
          </div>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={region.timeSeries} margin={{ top: 10, right: 16, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="ndviGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#153a2e" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis domain={[0.5, 1]} stroke="#10b981" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#040d0a',
                  borderColor: '#153a2e',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}
              />
              <Area
                type="monotone"
                dataKey="ndvi"
                name="NDVI Sentinel-2"
                stroke="#10b981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#ndviGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
