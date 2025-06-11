'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  type: 'user' | 'ai';
  content: string;
}

interface SymptomChatProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function SymptomChat({ messages, onSendMessage, isLoading }: SymptomChatProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-[60vh] min-h-[400px] max-h-[800px]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] text-sm sm:text-base rounded-2xl px-3 py-2 sm:px-4 sm:py-2 ${message.type === 'user'
                    ? 'bg-[#D98586] text-white'
                    : 'bg-gray-100 text-[#2D3436]'
                  }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="text-sm text-gray-400 bg-gray-100 px-3 py-2 sm:px-4 sm:py-2 rounded-2xl max-w-[85%] sm:max-w-[80%]">
                Thinking...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="border-t p-3 sm:p-4 flex-shrink-0">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms..."
            className="flex-1 p-2 sm:p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D98586] focus:border-transparent text-[#333333] text-sm sm:text-base"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-3 py-2 sm:px-4 sm:py-3 bg-[#D98586] text-white rounded-lg hover:bg-[#D98586]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}