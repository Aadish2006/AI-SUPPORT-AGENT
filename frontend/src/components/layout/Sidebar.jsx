import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  MessageSquare,
  BarChart3,
  Zap,
  Settings,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Chat', icon: MessageSquare, to: '/' },
  { label: 'Dashboard', icon: BarChart3, to: '/admin' },
];

const BOTTOM_ITEMS = [
  { label: 'Settings', icon: Settings, to: '#' },
  { label: 'Help', icon: HelpCircle, to: '#' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-60 bg-surface-800 border-r border-white/[0.05] flex flex-col shrink-0 h-full">
      {/* Logo */}
      <div className="p-5 border-b border-white/[0.05]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center shadow-glow-sm">
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>
          <div>
            <span className="font-bold text-white text-sm">SupportAI</span>
            <p className="text-[10px] text-gray-500 leading-none mt-0.5">Powered by Gemini</p>
          </div>
        </div>
      </div>

      {/* Status indicator */}
      <div className="px-4 py-3 border-b border-white/[0.04]">
        <div className="flex items-center gap-2 px-3 py-2 bg-accent-green/5 border border-accent-green/15 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
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
        <div className="mt-3 p-3 bg-surface-700 rounded-xl">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-brand flex items-center justify-center text-xs font-bold text-white">
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
