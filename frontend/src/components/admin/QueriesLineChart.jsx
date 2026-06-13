import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-600 border border-white/10 rounded-xl px-3 py-2.5 shadow-card text-xs space-y-1">
      <p className="text-gray-400 mb-1.5">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-gray-300 capitalize">{p.name}:</span>
          <span className="text-white font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

const RANGES = ['7D', '14D', '30D'];

export default function QueriesLineChart({ data }) {
  const [range, setRange] = useState('30D');

  const sliceMap = { '7D': 7, '14D': 14, '30D': 30 };
  const sliced = data.slice(-sliceMap[range]);

  return (
    <div className="glass-card p-5 flex flex-col flex-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Queries Over Time</h3>
        <div className="flex items-center gap-1 bg-surface-700 rounded-lg p-0.5">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                range === r
                  ? 'bg-brand-500 text-white shadow-glow-sm'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[220px]">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={sliced} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradQueries" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradResolved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3a5" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22d3a5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#6b7280', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval={Math.floor(sliced.length / 5)}
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={7}
              formatter={(v) => <span className="text-xs text-gray-400 capitalize">{v}</span>}
            />
            <Area
              type="monotone"
              dataKey="queries"
              name="Total"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#gradQueries)"
              animationDuration={900}
            />
            <Area
              type="monotone"
              dataKey="resolved"
              name="Resolved"
              stroke="#22d3a5"
              strokeWidth={2}
              fill="url(#gradResolved)"
              animationDuration={1100}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
