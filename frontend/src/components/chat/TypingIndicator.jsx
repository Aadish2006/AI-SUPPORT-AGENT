import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 animate-fade-in px-4 py-2">
      {/* AI Avatar */}
      <div className="w-7 h-7 rounded-full bg-gradient-brand flex items-center justify-center shrink-0 shadow-glow-sm">
        <span className="text-[10px] font-bold text-white">AI</span>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-1.5 bg-surface-700 border border-white/[0.06] rounded-2xl rounded-tl-sm px-4 py-3 shadow-message">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse-dot"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
