import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import ChatPage from './components/chat/ChatPage';
import AdminDashboard from './components/admin/AdminDashboard';
import KnowledgeBase from './components/admin/KnowledgeBase';
import Escalations from './components/admin/Escalations';
import AgentSettings from './components/admin/AgentSettings';

function NotFound() {
  return (
    <div className="relative flex items-center justify-center h-full text-center p-6 bg-surface-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-35 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-brand-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -right-24 w-80 h-80 rounded-full bg-accent-green/10 blur-3xl pointer-events-none" />

      <div className="glass-card relative overflow-hidden max-w-lg w-full p-8 sm:p-10 border border-white/[0.08]">
        <div className="absolute inset-0 bg-gradient-card opacity-70 pointer-events-none" />
        <div className="relative space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-[11px] font-medium text-brand-300 mx-auto w-fit">
            SupportAI routing
          </div>
          <p className="text-6xl font-black gradient-text">404</p>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Page not found</h1>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
              The page you’re looking for does not exist or has been moved to a different route.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/" className="btn-primary w-full sm:w-auto justify-center">
              Back to chat
            </Link>
            <Link to="/admin" className="btn-ghost w-full sm:w-auto justify-center border border-white/[0.06]">
              Open dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<ChatPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/knowledge" element={<KnowledgeBase />} />
          <Route path="/admin/escalations" element={<Escalations />} />
          <Route path="/admin/settings" element={<AgentSettings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
