import React, { useState, useRef, useCallback } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';

export default function ChatInputBar({ onSend, disabled }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  const handleSend = useCallback(() => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue('');
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
    // Auto-resize
    const ta = textareaRef.current;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="px-4 pb-4 pt-3 border-t border-white/[0.05] bg-surface-800/30 shrink-0">
      <div className={`flex items-end gap-2 bg-surface-700 border rounded-2xl px-4 py-3 transition-all duration-200 ${
        canSend ? 'border-brand-500/40 shadow-glow-sm' : 'border-white/[0.07]'
      }`}>
        {/* Attachment */}
        <button className="p-1.5 text-gray-600 hover:text-gray-300 transition-colors shrink-0 mb-0.5">
          <Paperclip className="w-4 h-4" />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question or describe your issue…"
          rows={1}
          disabled={disabled}
          className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 resize-none outline-none leading-relaxed max-h-40 py-0.5 scrollbar-hide"
        />

        {/* Right actions */}
        <div className="flex items-center gap-1 shrink-0 mb-0.5">
          <button className="p-1.5 text-gray-600 hover:text-gray-300 transition-colors">
            <Mic className="w-4 h-4" />
          </button>

          <button
            onClick={handleSend}
            disabled={!canSend}
            className={`p-2 rounded-xl transition-all duration-200 ${
              canSend
                ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-glow-sm hover:shadow-glow-brand active:scale-95'
                : 'bg-surface-600 text-gray-600 cursor-not-allowed'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <p className="text-center text-[10px] text-gray-700 mt-2">
        AI responses are generated from your knowledge base · Always verify critical information
      </p>
    </div>
  );
}
