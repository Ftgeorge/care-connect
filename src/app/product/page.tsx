'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import SymptomChat from '@/components/product/SymptomChat';
import QuickSuggestions from '@/components/product/QuickSuggestions';

const quickSuggestions = [
  "Headache and fever",
  "Stomach pain",
  "Cough and sore throat",
  "Back pain",
  "Fatigue and dizziness"
];

const aiResponses = {
  "Headache and fever": [
    "I understand you're experiencing a headache and fever. How long have you had these symptoms?",
    "Have you taken any medication for the fever?",
    "Are you experiencing any other symptoms like fatigue or body aches?",
    "Based on your symptoms, I'll analyze the possible conditions and provide recommendations."
  ],
  "Stomach pain": [
    "I understand you're experiencing stomach pain. Where exactly is the pain located?",
    "How would you describe the pain - sharp, dull, or cramping?",
    "Have you noticed any changes in your bowel movements?",
    "Based on your symptoms, I'll analyze the possible conditions and provide recommendations."
  ],
  "Cough and sore throat": [
    "I understand you have a cough and sore throat. How long have you had these symptoms?",
    "Is the cough dry or productive?",
    "Do you have any difficulty swallowing?",
    "Based on your symptoms, I'll analyze the possible conditions and provide recommendations."
  ],
  "Back pain": [
    "I understand you're experiencing back pain. Which part of your back is affected?",
    "Did this start suddenly or gradually?",
    "Have you had any recent injuries or changes in activity?",
    "Based on your symptoms, I'll analyze the possible conditions and provide recommendations."
  ],
  "Fatigue and dizziness": [
    "I understand you're feeling fatigued and dizzy. How long have you had these symptoms?",
    "Have you noticed any triggers for the dizziness?",
    "Are you getting enough sleep?",
    "Based on your symptoms, I'll analyze the possible conditions and provide recommendations."
  ]
};

export default function SymptomChecker() {
  const router = useRouter();
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai', content: string }>>([
    { type: 'ai', content: "Hello! I'm your AI health assistant. What's bothering you today?" }
  ]);
  const [conversationStep, setConversationStep] = useState(0);
  const [currentSymptom, setCurrentSymptom] = useState<string | null>(null);

  const handleSendMessage = (message: string) => {
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: message }]);
    
    // If this is the first message, set the current symptom
    if (conversationStep === 0) {
      setCurrentSymptom(message);
    }

    // Simulate AI response
    setTimeout(() => {
      if (currentSymptom && aiResponses[currentSymptom as keyof typeof aiResponses]) {
        const responses = aiResponses[currentSymptom as keyof typeof aiResponses];
        if (conversationStep < responses.length - 1) {
          setMessages(prev => [...prev, { type: 'ai', content: responses[conversationStep + 1] }]);
          setConversationStep(prev => prev + 1);
        } else {
          // Last response - redirect to results
          setMessages(prev => [...prev, { 
            type: 'ai', 
            content: "Thank you for providing this information. I'll analyze your symptoms and provide recommendations." 
          }]);
          setTimeout(() => {
            router.push('/product/results');
          }, 1500);
        }
      } else {
        setMessages(prev => [...prev, { 
          type: 'ai', 
          content: "Could you please provide more details about your symptoms?" 
        }]);
      }
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#2D3436] mb-4">
            Symptom Checker
          </h1>
          <p className="text-[#636e72]">
            Describe your symptoms and get instant AI-powered health insights
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <SymptomChat messages={messages} onSendMessage={handleSendMessage} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <h2 className="text-lg font-semibold text-[#2D3436] mb-4">
            Quick Suggestions
          </h2>
          <QuickSuggestions 
            suggestions={quickSuggestions} 
            onSelect={handleSendMessage} 
          />
        </motion.div>
      </div>
    </div>
  );
} 