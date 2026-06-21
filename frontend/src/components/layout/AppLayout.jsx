import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-auto bg-surface-900">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="app-container p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
