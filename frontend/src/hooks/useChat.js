import { useState, useCallback, useRef } from 'react';
import { apiClient } from '../api/client';
import { generateId } from '../utils/formatters';

const sourceLabel = (source) => {
  if (typeof source === 'string') return source;
  return source?.title || source?.sourceName || source?.documentId || 'knowledge base';
};

const initialMessage = {
  id: 'sys-1',
  type: 'system',
  content: 'AI Support Agent is online. How can I help you today?',
  timestamp: new Date().toISOString(),
};

export const useChat = () => {
  const [messages, setMessages] = useState([initialMessage]);
  const [isTyping, setIsTyping] = useState(false);
  const [isEscalated, setIsEscalated] = useState(false);
  const [sessionId, setSessionId] = useState(() => crypto.randomUUID());
  const typingTimeout = useRef(null);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isTyping) return;

    const userMsg = {
      id: generateId(),
      type: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const result = await apiClient.sendMessage({
        sessionId,
        userId: 'demo-user',
        message: userMsg.content,
      });

      const aiMsg = {
        id: result.messageId,
        type: 'ai',
        content: result.response || result.message,
        timestamp: result.timestamp || new Date().toISOString(),
        confidence: result.confidence,
        sources: (result.sources || []).map(sourceLabel),
        feedback: null,
        escalated: result.status === 'escalated',
      };

      setMessages((prev) => [...prev, aiMsg]);

      if (result.status === 'escalated') {
        setIsEscalated(true);
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            type: 'system',
            content: 'Escalated to Human Agent - A specialist will join shortly.',
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          type: 'system',
          content: `Backend error: ${error.message}. Check that backend, PostgreSQL, ChromaDB, and Gemini API key are configured.`,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [isTyping, sessionId]);

  const setFeedback = useCallback(async (messageId, value) => {
    const rating = value === 'up' ? 'thumbs_up' : 'thumbs_down';

    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId
          ? { ...m, feedback: m.feedback === value ? null : value }
          : m
      )
    );

    try {
      await apiClient.submitFeedback({
        sessionId,
        messageId,
        rating,
      });
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          type: 'system',
          content: `Feedback was not saved: ${error.message}`,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, [sessionId]);

  const clearChat = useCallback(() => {
    setMessages([
      {
        ...initialMessage,
        id: generateId(),
        content: 'New session started. How can I help you?',
        timestamp: new Date().toISOString(),
      },
    ]);
    setSessionId(crypto.randomUUID());
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
