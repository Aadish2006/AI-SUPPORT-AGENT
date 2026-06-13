import { useState, useCallback, useRef } from 'react';
import { INITIAL_MESSAGES, AI_RESPONSES, DEFAULT_RESPONSE } from '../data/mockMessages';
import { generateId } from '../utils/formatters';
import {
  CONFIDENCE_THRESHOLD,
  ESCALATION_KEYWORDS,
  TYPING_DELAY_MS,
  MIN_RESPONSE_DELAY_MS,
  MAX_RESPONSE_DELAY_MS,
} from '../utils/constants';

const getAIResponse = (userText) => {
  const lower = userText.toLowerCase();

  // Check for escalation keywords first
  const shouldEscalate = ESCALATION_KEYWORDS.some((kw) => lower.includes(kw));

  // Find matching scripted response
  const match = AI_RESPONSES.find((r) =>
    r.triggers.some((t) => lower.includes(t))
  );

  if (match) return match;

  if (shouldEscalate) {
    return {
      confidence: 0.35,
      escalate: true,
      content: `I understand this is an important matter. To ensure it's handled correctly, I'll need to connect you with a human specialist who can access your full account details and resolve this promptly.\n\nA support agent will join this conversation shortly.`,
      sources: ['escalation-policy.pdf'],
    };
  }

  return DEFAULT_RESPONSE;
};

export const useChat = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [isEscalated, setIsEscalated] = useState(
    INITIAL_MESSAGES.some((m) => m.escalated)
  );
  const [sessionId] = useState(() => generateId());
  const typingTimeout = useRef(null);

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: generateId(),
      type: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const response = getAIResponse(text);
    const delay = MIN_RESPONSE_DELAY_MS + Math.random() * (MAX_RESPONSE_DELAY_MS - MIN_RESPONSE_DELAY_MS);

    typingTimeout.current = setTimeout(() => {
      const aiMsg = {
        id: generateId(),
        type: 'ai',
        content: response.content,
        timestamp: new Date().toISOString(),
        confidence: response.confidence,
        sources: response.sources || [],
        feedback: null,
        escalated: !!response.escalate,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);

      if (response.escalate || response.confidence < CONFIDENCE_THRESHOLD) {
        setIsEscalated(true);

        // Add system escalation message
        setTimeout(() => {
          const escalationMsg = {
            id: generateId(),
            type: 'system',
            content: '🔴 Escalated to Human Agent — A specialist will join shortly.',
            timestamp: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, escalationMsg]);
        }, 600);
      }
    }, TYPING_DELAY_MS + delay);
  }, []);

  const setFeedback = useCallback((messageId, value) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId
          ? { ...m, feedback: m.feedback === value ? null : value }
          : m
      )
    );
  }, []);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: generateId(),
        type: 'system',
        content: 'New session started. How can I help you?',
        timestamp: new Date().toISOString(),
      },
    ]);
    setIsEscalated(false);
    setIsTyping(false);
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
  }, []);

  return {
    messages,
    isTyping,
    isEscalated,
    sessionId,
    sendMessage,
    setFeedback,
    clearChat,
  };
};
