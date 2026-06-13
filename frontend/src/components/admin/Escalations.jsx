import React, { useState, useEffect } from 'react';
import { Inbox, MessageSquare, ShieldAlert, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { apiClient } from '../../api/client';

const INITIAL_ESCALATIONS = [
  {
    id: 'esc-1',
    conversation_summary: 'Customer inquiring about bulk license discounts and setup packages for a school class of 30 devices.',
    reason: 'Out-of-scope price negotiation',
    status: 'pending',
    created_at: '2026-06-13T10:45:00Z',
    messages: [
      { sender: 'user', text: 'Hey, I am buying 30 licenses for my high school classroom. Can I get a pricing setup deal?' },
      { sender: 'ai', text: 'To get specific bulk licensing quotes, I recommend connecting with our sales support team.' }
    ]
  },
  {
    id: 'esc-2',
    conversation_summary: 'Customer requesting refund for hardware order #9283 due to shipping delivery delay exceeding two weeks.',
    reason: 'Defective/Refund requests',
    status: 'pending',
    created_at: '2026-06-13T11:20:00Z',
    messages: [
      { sender: 'user', text: 'My order is delayed by two weeks. I want a refund now.' },
      { sender: 'ai', text: 'I understand you want to refund this purchase. Let me connect you with billing specialists.' }
    ]
  },
  {
    id: 'esc-3',
    conversation_summary: 'Customer VPN connection errors during setup config on Windows 11 Enterprise environments.',
    reason: 'No matching knowledge base document found',
    status: 'resolved',
    created_at: '2026-06-12T15:30:00Z',
    messages: [
      { sender: 'user', text: 'My VPN wont connect after the corporate network update.' },
      { sender: 'ai', text: 'I cannot find any documentation regarding this network layout. Escalating to IT support.' }
    ]
  }
];

export default function Escalations() {
  const [escalations, setEscalations] = useState(INITIAL_ESCALATIONS);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadEscalations = async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.getEscalations();
      if (data && data.length > 0) {
        setEscalations(data);
      }
    } catch (err) {
      console.warn("Using offline mock escalations list:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEscalations();
  }, []);

  const handleStatusChange = async (escId, status) => {
    try {
      await apiClient.updateEscalationStatus(escId, { status, agentNotes: 'Resolved by Admin' });
      loadEscalations();
    } catch (err) {
      // Offline fallback state update
      setEscalations((prev) =>
        prev.map((e) => (e.id === escId ? { ...e, status } : e))
      );
    }
    if (selectedTicket?.id === escId) {
      setSelectedTicket((prev) => ({ ...prev, status }));
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface-900 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-surface-800/80 backdrop-blur-sm border-b border-white/[0.05] px-6 py-4">
        <div>
          <h1 className="text-lg font-bold text-white">Escalation Queue</h1>
          <p className="text-xs text-gray-500 mt-0.5">View and manage support tickets handed off by the AI assistant</p>
        </div>
      </div>

      <div className="p-6 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Escalation List */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1.5 mb-2">
            <Inbox className="w-3.5 h-3.5" />
            Tickets ({escalations.length})
          </h2>

          <div className="space-y-3">
            {escalations.map((item) => {
              const dateStr = new Date(item.created_at || item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              const isSelected = selectedTicket?.id === item.id;
              const isResolved = item.status === 'resolved';

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedTicket(item)}
                  className={`glass-card p-4 cursor-pointer hover:border-brand-500/40 transition-all ${
                    isSelected ? 'border-brand-500 ring-1 ring-brand-500/20' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`status-badge text-[10px] ${
                        isResolved ? 'bg-accent-green/10 text-accent-green border-accent-green/20' : 'bg-accent-red/10 text-accent-red border-accent-red/20'
                      }`}>
                        {isResolved ? 'Resolved' : 'Pending'}
                      </span>
                      <span className="text-[10px] text-gray-500">{dateStr}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-accent-yellow bg-accent-yellow/5 px-2 py-0.5 rounded border border-accent-yellow/15">
                      <ShieldAlert className="w-3 h-3" />
                      {item.reason}
                    </div>
                  </div>

                  <p className="text-xs text-gray-200 mt-3 font-medium leading-relaxed">
                    {item.conversation_summary || item.summary || 'Summary not available'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Ticket Drawer / Detail */}
        <div className="lg:col-span-1">
          {selectedTicket ? (
            <div className="glass-card p-5 sticky top-24 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Ticket details</h3>
                <p className="text-[10px] text-gray-500 font-mono mt-0.5">{selectedTicket.id}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Escalation Reason</p>
                <p className="text-xs text-accent-yellow font-medium">{selectedTicket.reason}</p>
              </div>

              {/* Chat history list */}
              <div className="space-y-2">
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Dialogue Snippet</p>
                <div className="bg-surface-700/60 p-3 rounded-xl border border-white/[0.04] space-y-3 max-h-48 overflow-y-auto">
                  {selectedTicket.messages?.map((msg, index) => (
                    <div key={index} className="space-y-0.5">
                      <span className={`text-[9px] font-bold ${msg.sender === 'user' ? 'text-brand-400' : 'text-accent-green'}`}>
                        {msg.sender === 'user' ? 'USER' : 'AI'}
                      </span>
                      <p className="text-[11px] text-gray-300 leading-snug">{msg.text}</p>
                    </div>
                  )) || (
                    <p className="text-[10px] text-gray-500 italic">No chat log attached.</p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.05] space-y-2">
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-2">Actions</p>
                {selectedTicket.status === 'pending' ? (
                  <button
                    onClick={() => handleStatusChange(selectedTicket.id, 'resolved')}
                    className="w-full btn-primary text-xs py-2 justify-center"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Resolve Ticket</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-accent-green bg-accent-green/5 border border-accent-green/15 p-2 rounded-xl justify-center font-medium">
                    <CheckCircle className="w-4 h-4" />
                    <span>Marked Resolved</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="glass-card p-8 text-center text-gray-500 flex flex-col items-center justify-center space-y-2 h-[220px]">
              <MessageSquare className="w-6 h-6 opacity-30 text-brand-400" />
              <p className="text-xs">Select a ticket to review full summary and dialogue history.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
