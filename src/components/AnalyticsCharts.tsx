import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { AmazonZoneMetrics } from '../types/gee';

interface AnalyticsChartsProps {
  region: AmazonZoneMetrics;
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ region }) => {
  return (
    <div className="space-y-5">
      {/* Leyenda compartida estilo monitoreo GEE */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#16422c] bg-[#081d13] px-5 py-3 text-xs">
        <span className="font-bold text-white">
          Series Históricas Multifuente (2018 – 2026) · {region.name}
        </span>
        <div className="flex flex-wrap items-center gap-5 text-[#cde5d8]">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
            Observado
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#f97316]" />
            Mes parcial ({region.partialCutDate})
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-4 border-t-2 border-dashed border-slate-400" />
            Media del mes (línea base)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Gráfico 1: Verde Pleno (NDVI >= 0.75) [%] */}
        <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-5">
          <div className="mb-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-white">
                Verde pleno (NDVI ≥ 0.75) [%]
              </h3>
              <span className="rounded-md bg-[#22a31c]/20 px-2 py-0.5 font-mono text-[11px] font-semibold text-[#4ade80]">
                Sentinel-2
              </span>
            </div>
            <p className="mt-1 text-xs text-[#94b3a3]">
              Último ({region.partialCutDate}): <strong className="text-white">{region.ndviFullPct}%</strong> ·{' '}
              <span className="text-[#4ade80]">Anomalía: {region.ndviFullAnomaly}</span> · Tendencia: {region.ndviFullTrend}
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={region.timeSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#16422c" />
                <XAxis dataKey="period" stroke="#94b3a3" fontSize={11} />
                <YAxis stroke="#94b3a3" fontSize={11} domain={[0, 100]} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#04120b',
                    borderColor: '#16422c',
                    borderRadius: '10px',
                    color: '#f0fdf4'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="ndviFullBaseline"
                  name="Media del mes (%)"
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                  dot={false}
                  strokeWidth={1.8}
                />
                <Line
                  type="monotone"
                  dataKey="ndviFullPct"
                  name="Verde pleno (%)"
                  stroke="#22c55e"
                  strokeWidth={2.5}
                  dot={{ r: 3.5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2.5 text-[11px] leading-relaxed text-[#94b3a3]">
            Umbral exigente (NDVI ≥ 0.75): al no saturarse en selva densa, refleja mejor el ciclo estacional y el estrés leve del dosel.
          </p>
        </div>

        {/* Gráfico 2: Probabilidad de Árboles (Dynamic World) [%] */}
        <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-5">
          <div className="mb-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-white">
                Probabilidad de árboles (Dynamic World) [%]
              </h3>
              <span className="rounded-md bg-[#eab308]/20 px-2 py-0.5 font-mono text-[11px] font-semibold text-[#facc15]">
                Dynamic World IA
              </span>
            </div>
            <p className="mt-1 text-xs text-[#94b3a3]">
              Último (2026-11): <strong className="text-white">{region.dwTreesPct}%</strong> ·{' '}
              <span className="text-orange-300">
                Anomalía: {region.dwTreesAnomaly} {region.dwIsProvisional ? '⚠ provisional' : ''}
              </span>
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={region.timeSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#16422c" />
                <XAxis dataKey="period" stroke="#94b3a3" fontSize={11} />
                <YAxis stroke="#94b3a3" fontSize={11} domain={[0, 100]} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#04120b',
                    borderColor: '#16422c',
                    borderRadius: '10px',
                    color: '#f0fdf4'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="dwTreesBaseline"
                  name="Media del mes (%)"
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                  dot={false}
                  strokeWidth={1.8}
                />
                <Line
                  type="monotone"
                  dataKey="dwTreesPct"
                  name="Probabilidad árboles (%)"
                  stroke="#4ade80"
                  strokeWidth={2.5}
                  dot={{ r: 3.5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2.5 text-[11px] leading-relaxed text-[#94b3a3]">
            Clasificador de Google casi en tiempo real sobre Sentinel-2. La bruma o pocos datos en mes parcial pueden moverlo un par de puntos: confirmar con NDVI y radar.
          </p>
        </div>

        {/* Gráfico 3: NDMI (Humedad de la vegetación) [índice] */}
        <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-5">
          <div className="mb-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-white">
                NDMI (humedad de la vegetación) [índice]
              </h3>
              <span className="rounded-md bg-[#06b6d4]/20 px-2 py-0.5 font-mono text-[11px] font-semibold text-[#22d3ee]">
                Sentinel-2 SWIR
              </span>
            </div>
            <p className="mt-1 text-xs text-[#94b3a3]">
              Último (2026-11): <strong className="text-white">{region.ndmiValue}</strong> ·{' '}
              <span className="text-[#22d3ee]">Anomalía: {region.ndmiAnomaly}</span> · Tendencia: {region.ndmiTrend}
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={region.timeSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#16422c" />
                <XAxis dataKey="period" stroke="#94b3a3" fontSize={11} />
                <YAxis stroke="#94b3a3" fontSize={11} domain={[0.24, 0.37]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#04120b',
                    borderColor: '#16422c',
                    borderRadius: '10px',
                    color: '#f0fdf4'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="ndmiBaseline"
                  name="Media del mes"
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                  dot={false}
                  strokeWidth={1.8}
                />
                <Line
                  type="monotone"
                  dataKey="ndmi"
                  name="NDMI observado"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  dot={{ r: 3.5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2.5 text-[11px] leading-relaxed text-[#94b3a3]">
            Contenido de agua en las hojas (NIR vs. SWIR). Si baja, las hojas están más secas (estrés hídrico). Mide agua foliar, no lluvia ni suelo.
          </p>
        </div>

        {/* Gráfico 4: Radar Sentinel-1 VH [dB] con hueco 2022-2024 documentado */}
        <div className="rounded-2xl border border-[#16422c] bg-[#081d13] p-5">
          <div className="mb-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-white">
                Radar Sentinel-1 VH [dB] (Banda C · Atraviesa Nubes)
              </h3>
              <span className="rounded-md bg-[#06b6d4]/20 px-2 py-0.5 font-mono text-[11px] font-semibold text-[#22d3ee]">
                Sentinel-1 SAR
              </span>
            </div>
            <p className="mt-1 text-xs text-[#94b3a3]">
              Último (2026-11): <strong className="text-white">{region.s1RadarVhDb} dB</strong> ·{' '}
              <span className="text-[#4ade80]">Anomalía: {region.s1RadarAnomaly}</span> · Tendencia: {region.s1RadarTrend}
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={region.timeSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#16422c" />
                <XAxis dataKey="period" stroke="#94b3a3" fontSize={11} />
                <YAxis stroke="#94b3a3" fontSize={11} domain={[-14.7, -13.8]} unit=" dB" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#04120b',
                    borderColor: '#16422c',
                    borderRadius: '10px',
                    color: '#f0fdf4'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="s1BaselineDb"
                  name="Media del mes (dB)"
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                  dot={false}
                  strokeWidth={1.8}
                />
                <Line
                  type="monotone"
                  dataKey="s1RadarVhDb"
                  name="Radar VH (dB)"
                  stroke="#22c55e"
                  strokeWidth={2.5}
                  connectNulls={false}
                  dot={{ r: 3.5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2.5 text-[11px] leading-relaxed text-[#94b3a3]">
            Nota técnica: el hueco entre 2022 y 2024 responde a la falla de Sentinel-1B en dic. 2021 y se restablece con Sentinel-1C en 2025 (no es fallo del script).
          </p>
        </div>
      </div>
    </div>
  );
};