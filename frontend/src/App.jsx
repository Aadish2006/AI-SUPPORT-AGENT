import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import ChatPage from './components/chat/ChatPage';
import AdminDashboard from './components/admin/AdminDashboard';
import KnowledgeBase from './components/admin/KnowledgeBase';
import Escalations from './components/admin/Escalations';
import AgentSettings from './components/admin/AgentSettings';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-surface-900">
      <p className="text-6xl font-black text-surface-600 mb-4">404</p>
      <h1 className="text-xl font-bold text-white mb-2">Page not found</h1>
      <p className="text-gray-500 text-sm">The page you're looking for doesn't exist.</p>
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
