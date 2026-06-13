import React from 'react';
import { useChat } from '../../hooks/useChat';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInputBar from './ChatInputBar';
import EscalationBanner from './EscalationBanner';

export default function ChatPage() {
  const { messages, isTyping, isEscalated, sessionId, sendMessage, setFeedback, clearChat } = useChat();

  return (
    <div className="flex flex-col h-full bg-surface-900">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50 pointer-events-none" />

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
