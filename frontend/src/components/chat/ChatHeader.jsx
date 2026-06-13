import React from 'react';
import { RotateCcw, Shield, Wifi } from 'lucide-react';

export default function ChatHeader({ isEscalated, sessionId, onClear }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05] bg-surface-800/50 backdrop-blur-sm shrink-0">
      <div className="flex items-center gap-3">
        {/* AI Avatar */}
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-gradient-brand flex items-center justify-center shadow-glow-sm">
            <span className="text-sm font-bold text-white">AI</span>
          </div>
          <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-surface-800 ${
            isEscalated ? 'bg-accent-red' : 'bg-accent-green'
          }`} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-white">SupportAI Assistant</h2>
            {isEscalated && (
              <span className="status-badge bg-accent-red/10 border border-accent-red/20 text-accent-red">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
                Escalated
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <div className="flex items-center gap-1">
              <Wifi className="w-3 h-3 text-accent-green" />
              <span className="text-[11px] text-gray-500">Online · Avg 1.4s response</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-700 border border-white/[0.06]">
          <Shield className="w-3 h-3 text-brand-400" />
          <span className="text-[10px] text-gray-400 font-mono">{sessionId.slice(0, 8)}</span>
        </div>
        <button
          onClick={onClear}
          className="btn-ghost text-xs"
          title="Clear conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Chat</span>
        </button>
      </div>
    </header>
  );
}
