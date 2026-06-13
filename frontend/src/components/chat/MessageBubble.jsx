import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatTime } from '../../utils/formatters';
import ConfidencePill from './ConfidencePill';
import FeedbackButtons from './FeedbackButtons';
import { BookOpen } from 'lucide-react';

const UserMessage = ({ message }) => (
  <div className="flex justify-end gap-2 px-4 py-1.5 animate-slide-up">
    <div className="flex flex-col items-end gap-1 max-w-[75%]">
      <div className="msg-user">
        <p className="text-sm leading-relaxed">{message.content}</p>
      </div>
      <span className="text-[10px] text-gray-600 px-1">{formatTime(message.timestamp)}</span>
    </div>
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center shrink-0 text-xs font-bold text-white mt-1">
      U
    </div>
  </div>
);

const AIMessage = ({ message, onFeedback }) => (
  <div className="flex items-start gap-3 px-4 py-1.5 animate-slide-up">
    <div className="w-7 h-7 rounded-full bg-gradient-brand flex items-center justify-center shrink-0 shadow-glow-sm mt-1">
      <span className="text-[10px] font-bold text-white">AI</span>
    </div>
    <div className="flex flex-col gap-1.5 max-w-[80%]">
      <div className="msg-ai">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <p className="text-sm leading-relaxed mb-2 last:mb-0">{children}</p>,
            strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
            em: ({ children }) => <em className="text-gray-300">{children}</em>,
            h1: ({ children }) => <h1 className="text-base font-bold text-white mb-2">{children}</h1>,
            h2: ({ children }) => <h2 className="text-sm font-bold text-white mb-1.5">{children}</h2>,
            ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-2 text-sm">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-2 text-sm">{children}</ol>,
            li: ({ children }) => <li className="text-gray-200 text-sm">{children}</li>,
            code: ({ children, inline }) =>
              inline ? (
                <code className="font-mono text-brand-300 bg-brand-500/10 px-1.5 py-0.5 rounded text-xs">{children}</code>
              ) : (
                <code className="block font-mono text-sm bg-surface-900 rounded-lg p-3 my-2 text-gray-200 overflow-x-auto">{children}</code>
              ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-brand-500 pl-3 my-2 text-gray-400 italic text-sm">{children}</blockquote>
            ),
            a: ({ children, href }) => (
              <a href={href} className="text-brand-400 underline underline-offset-2 hover:text-brand-300 transition-colors">{children}</a>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-2 px-1">
        {message.confidence !== undefined && (
          <ConfidencePill score={message.confidence} />
        )}

        {message.sources && message.sources.length > 0 && (
          <div className="flex items-center gap-1 text-[10px] text-gray-600">
            <BookOpen className="w-2.5 h-2.5" />
            <span>{message.sources.join(', ')}</span>
          </div>
        )}

        <span className="text-[10px] text-gray-600 ml-auto">{formatTime(message.timestamp)}</span>
      </div>

      <FeedbackButtons
        messageId={message.id}
        feedback={message.feedback}
        onFeedback={onFeedback}
      />
    </div>
  </div>
);

const SystemMessage = ({ message }) => (
  <div className="flex justify-center px-4 py-2 animate-fade-in">
    <div className="msg-system">{message.content}</div>
  </div>
);

export default function MessageBubble({ message, onFeedback }) {
  if (message.type === 'user') return <UserMessage message={message} />;
  if (message.type === 'ai') return <AIMessage message={message} onFeedback={onFeedback} />;
  return <SystemMessage message={message} />;
}
