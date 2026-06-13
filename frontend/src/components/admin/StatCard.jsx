import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const useCountUp = (target, duration = 1200) => {
  const [current, setCurrent] = useState(0);
  const startTime = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    const step = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) rafId.current = requestAnimationFrame(step);
    };
    rafId.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId.current);
  }, [target, duration]);

  return current;
};

export default function StatCard({ icon: Icon, label, value, subLabel, trend, trendValue, color = 'brand', delay = 0 }) {
  const numericValue = typeof value === 'number' ? value : parseFloat(value);
  const isPercent = typeof value === 'string' && value.includes('%');
  const displayCount = useCountUp(numericValue, 1000 + delay * 200);

  const trendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const TrendIcon = trendIcon;

  const colorMap = {
    brand: { icon: 'text-brand-400 bg-brand-500/10', trend: 'text-accent-green' },
    green: { icon: 'text-accent-green bg-accent-green/10', trend: 'text-accent-green' },
    yellow: { icon: 'text-accent-yellow bg-accent-yellow/10', trend: 'text-accent-yellow' },
    red: { icon: 'text-accent-red bg-accent-red/10', trend: 'text-accent-red' },
    blue: { icon: 'text-accent-blue bg-accent-blue/10', trend: 'text-accent-blue' },
  };
  const c = colorMap[color] || colorMap.brand;

  return (
    <div className="stat-card group hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-5 bg-brand-500 pointer-events-none" />

      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.icon}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trendValue && (
          <div className={`flex items-center gap-1 text-xs font-medium ${c.trend}`}>
            <TrendIcon className="w-3 h-3" />
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      <div className="mt-1">
        <p className="text-2xl font-bold text-white tabular-nums">
          {displayCount.toLocaleString()}
          {isPercent && '%'}
        </p>
        <p className="text-sm text-gray-400 mt-0.5">{label}</p>
        {subLabel && <p className="text-xs text-gray-600 mt-1">{subLabel}</p>}
      </div>
    </div>
  );
}
