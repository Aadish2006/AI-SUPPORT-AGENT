import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { SUGGESTED_PROMPTS } from '../../data/mockMessages';
import { Sparkles } from 'lucide-react';

export default function MessageList({ messages, isTyping, onFeedback, onSuggest }) {
  const bottomRef = useRef(null);
  const isInitialEmpty = messages.length === 1 && messages[0].type === 'system';

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto py-4 space-y-0.5">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} onFeedback={onFeedback} />
      ))}

      {isTyping && <TypingIndicator />}

      {/* Suggested prompts shown when conversation is effectively empty */}
      {isInitialEmpty && !isTyping && (
        <div className="px-6 pt-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span className="text-sm text-gray-400 font-medium">Suggested questions</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt.text}
                onClick={() => onSuggest(prompt.text)}
                className="flex items-center gap-2.5 px-4 py-3 bg-surface-700 hover:bg-surface-600 border border-white/[0.06] hover:border-brand-500/30 rounded-xl text-left text-sm text-gray-300 hover:text-white transition-all duration-200 group"
              >
                <span className="text-base">{prompt.icon}</span>
                <span className="leading-snug text-xs">{prompt.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
