import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  MessageSquare,
  BarChart3,
  Zap,
  ChevronRight,
  Database,
  Inbox,
  Sliders,
  HelpCircle,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Customer Chat', icon: MessageSquare, to: '/' },
  { label: 'Admin Dashboard', icon: BarChart3, to: '/admin' },
  { label: 'Knowledge Base', icon: Database, to: '/admin/knowledge' },
  { label: 'Escalations', icon: Inbox, to: '/admin/escalations' },
  { label: 'Agent Settings', icon: Sliders, to: '/admin/settings' },
];

const BOTTOM_ITEMS = [
  { label: 'Help & Docs', icon: HelpCircle, to: '#' },
];

export default function Sidebar() {
  const location = useLocation();

  const activeLabel = NAV_ITEMS.find((item) => item.to === location.pathname)?.label || 'Workspace';

  return (
    <aside className="w-64 bg-surface-800 border-r border-white/[0.05] flex flex-col shrink-0 h-full">
      {/* Logo */}
      <div className="p-5 border-b border-white/[0.05] space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow-sm ring-1 ring-white/10">
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>
          <div>
            <span className="font-bold text-white text-sm tracking-wide">SupportAI</span>
            <p className="text-[10px] text-gray-500 leading-none mt-0.5">Intelligent Customer Support</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.05] bg-surface-700/50 p-3 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] uppercase tracking-wider text-gray-500">Current view</p>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20">
              Live
            </span>
          </div>
          <p className="text-sm font-semibold text-white">{activeLabel}</p>
          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <span>Session routing</span>
            <span className="text-accent-green font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Status indicator */}
      <div className="px-4 py-3 border-b border-white/[0.04]">
        <div className="flex items-center gap-2 px-3 py-2 bg-accent-green/5 border border-accent-green/15 rounded-xl">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-green" />
          </span>
          <span className="text-xs text-accent-green font-medium">AI Agent Online</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-600 mb-2 mt-1">
          Navigation
        </p>
        {NAV_ITEMS.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="flex-1">{label}</span>
            {location.pathname === to && (
              <ChevronRight className="w-3.5 h-3.5 text-brand-400" />
            )}
          </NavLink>
        ))}
      </nav>

      {/* Session info */}
      <div className="p-3 border-t border-white/[0.05]">
        {BOTTOM_ITEMS.map(({ label, icon: Icon, to }) => (
          <a key={label} href={to} className="nav-item">
            <Icon className="w-4 h-4 shrink-0" />
            <span>{label}</span>
          </a>
        ))}
        <div className="mt-3 p-3 bg-surface-700 rounded-xl border border-white/[0.04] shadow-card">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center text-xs font-bold text-white ring-1 ring-white/10">
              A
            </div>
            <div>
              <p className="text-xs font-medium text-white">Admin User</p>
              <p className="text-[10px] text-gray-500">admin@supportai.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
