import React from 'react';
import { useChat } from '../../hooks/useChat';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInputBar from './ChatInputBar';
import EscalationBanner from './EscalationBanner';
import ConfidencePill from './ConfidencePill';

export default function ChatPage() {
  const { messages, isTyping, isEscalated, sessionId, sendMessage, setFeedback, clearChat } = useChat();
  const latestConfidence = messages
    .slice()
    .reverse()
    .find((message) => typeof message.confidence === 'number')?.confidence ?? 0.78;

  return (
    <div className="relative flex flex-col h-full bg-surface-900">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50 pointer-events-none" />

      <div className="relative px-4 sm:px-6 pt-4 pb-3 border-b border-white/[0.05] bg-surface-900/50 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-gray-500">Support workspace</p>
            <h1 className="text-lg sm:text-xl font-semibold text-white mt-1">Customer support console</h1>
            <p className="text-xs text-gray-400 mt-1 max-w-2xl">
              Ask questions, review responses, and escalate edge cases without leaving the chat screen.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <ConfidencePill score={latestConfidence} />
            <span className="status-badge bg-surface-700/80 border border-white/[0.06] text-gray-300 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
              Session {sessionId.slice(0, 8)}
            </span>
          </div>
        </div>
      </div>

      <ChatHeader
        isEscalated={isEscalated}
        sessionId={sessionId}
        onClear={clearChat}
      />

      <MessageList
        messages={messages}
        isTyping={isTyping}
        onFeedback={setFeedback}
        onSuggest={sendMessage}
      />

      {isEscalated && <EscalationBanner />}

      <ChatInputBar onSend={sendMessage} disabled={isTyping} />
    </div>
  );
}
