import React, { useState, useEffect } from 'react';
import { Sliders, Save, Check, RotateCcw } from 'lucide-react';

export default function AgentSettings() {
  const [agentName, setAgentName] = useState('SupportAI');
  const [responseStyle, setResponseStyle] = useState('professional');
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('agentSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        if (parsed.agentName) setAgentName(parsed.agentName);
        if (parsed.responseStyle) setResponseStyle(parsed.responseStyle);
        if (parsed.memoryEnabled !== undefined) setMemoryEnabled(parsed.memoryEnabled);
      } catch (e) {
        console.error("Failed loading settings from local storage:", e);
      }
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const settings = { agentName, responseStyle, memoryEnabled };
    localStorage.setItem('agentSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (!window.confirm('Reset settings to default?')) return;
    setAgentName('SupportAI');
    setResponseStyle('professional');
    setMemoryEnabled(true);
    localStorage.removeItem('agentSettings');
  };

  return (
    <div className="flex flex-col h-full bg-surface-900 overflow-y-auto">
      <div className="p-6 max-w-4xl w-full mx-auto space-y-6">
        <div className="glass-card relative overflow-hidden p-6 sm:p-7 bg-gradient-card">
          <div className="absolute inset-0 bg-gradient-glow opacity-25 pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-[11px] font-medium text-brand-300 mb-3">
              <Sliders className="w-3 h-3" />
              Assistant configuration
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Agent Settings</h1>
            <p className="text-sm text-gray-400 mt-2 max-w-2xl leading-relaxed">
              Configure the assistant identity, tone, and memory behavior from a single place.
            </p>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-brand-400" />
            <h2 className="text-sm font-semibold text-white">Identity & Logic Config</h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-gray-400 bg-surface-700/70 border border-white/[0.05] px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
              Local settings only
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Agent Name */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Agent Name</label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="input-base text-xs py-2 px-3"
                placeholder="e.g. SupportAI"
                maxLength={24}
                required
              />
              <p className="text-[10px] text-gray-600 mt-1">This name is shown in the chat window header.</p>
            </div>

            {/* Response Style dropdown */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Response Style</label>
              <select
                value={responseStyle}
                onChange={(e) => setResponseStyle(e.target.value)}
                className="input-base text-xs py-2 px-3"
              >
                <option value="professional">Professional (Default)</option>
                <option value="friendly">Friendly & Warm</option>
                <option value="concise">Concise & Direct</option>
              </select>
              <p className="text-[10px] text-gray-600 mt-1">Controls the tone and format of AI responses.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/[0.05] bg-surface-700/50 px-3 py-3">
                <p className="text-[10px] uppercase tracking-wider text-gray-500">Assistant</p>
                <p className="mt-1 text-sm font-semibold text-white truncate">{agentName}</p>
              </div>
              <div className="rounded-xl border border-white/[0.05] bg-surface-700/50 px-3 py-3">
                <p className="text-[10px] uppercase tracking-wider text-gray-500">Tone</p>
                <p className="mt-1 text-sm font-semibold text-white capitalize">{responseStyle}</p>
              </div>
              <div className="rounded-xl border border-white/[0.05] bg-surface-700/50 px-3 py-3">
                <p className="text-[10px] uppercase tracking-wider text-gray-500">Memory</p>
                <p className="mt-1 text-sm font-semibold text-white">{memoryEnabled ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>

            {/* Memory Enabled */}
            <div className="flex items-center justify-between p-4 bg-surface-700/60 rounded-xl border border-white/[0.04]">
              <div>
                <span className="block text-xs font-semibold text-white">Multi-turn Memory</span>
                <span className="block text-[10px] text-gray-400 mt-0.5">Remember conversation history in each chat session</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={memoryEnabled}
                  onChange={(e) => setMemoryEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-surface-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-500"></div>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
              <button
                type="submit"
                className="flex-1 btn-primary text-xs py-2 justify-center"
              >
                {saved ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Config</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="btn-ghost text-xs border border-white/[0.06] hover:bg-surface-750"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card p-4">
            <p className="text-[10px] uppercase tracking-wider text-gray-500">Identity</p>
            <p className="text-sm font-semibold text-white mt-1 truncate">{agentName}</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-[10px] uppercase tracking-wider text-gray-500">Tone</p>
            <p className="text-sm font-semibold text-white mt-1 capitalize">{responseStyle}</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-[10px] uppercase tracking-wider text-gray-500">Memory</p>
            <p className="text-sm font-semibold text-white mt-1">{memoryEnabled ? 'Enabled' : 'Disabled'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
