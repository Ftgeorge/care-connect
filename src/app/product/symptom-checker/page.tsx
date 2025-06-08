'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import SymptomChat from '@/components/product/SymptomChat';
import QuickSuggestions from '@/components/product/QuickSuggestions';
import { analyzeSymptoms, getPreventiveRecommendations } from '@/services/ai-service';

const quickSuggestions = [
  "Headache and fever",
  "Stomach pain",
  "Cough and sore throat",
  "Back pain",
  "Fatigue and dizziness"
];

export default function SymptomChecker() {
  const router = useRouter();
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai', content: string, timestamp: Date }>>([
    { type: 'ai', content: "Hello! I'm your AI health assistant. What's bothering you today?", timestamp: new Date() }
  ]);
  const [conversationStep, setConversationStep] = useState(0);
  const [currentSymptom, setCurrentSymptom] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [collectedSymptoms, setCollectedSymptoms] = useState<string[]>([]);
  const [medicalHistory, setMedicalHistory] = useState({
    age: undefined as number | undefined,
    gender: undefined as string | undefined,
    existingConditions: [] as string[],
    medications: [] as string[],
    allergies: [] as string[],
    familyHistory: [] as string[]
  });

  const handleSendMessage = async (message: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Add user message with timestamp
      setMessages(prev => [...prev, { 
        type: 'user', 
        content: message,
        timestamp: new Date()
      }]);

      // If this is the first message, set the current symptom and start collecting symptoms
      if (conversationStep === 0) {
        setCurrentSymptom(message);
        setCollectedSymptoms([message]);
        setMessages(prev => [...prev, { 
          type: 'ai', 
          content: "How long have you been experiencing these symptoms?",
          timestamp: new Date()
        }]);
        setConversationStep(1);
      } else if (conversationStep === 1) {
        // Duration response
        setMessages(prev => [...prev, { 
          type: 'ai', 
          content: "Have you taken any medications for these symptoms?",
          timestamp: new Date()
        }]);
        setConversationStep(2);
      } else if (conversationStep === 2) {
        // Medication response
        setMessages(prev => [...prev, { 
          type: 'ai', 
          content: "Are you experiencing any other symptoms?",
          timestamp: new Date()
        }]);
        setConversationStep(3);
      } else if (conversationStep === 3) {
        // Additional symptoms
        if (message.toLowerCase() !== 'no') {
          setCollectedSymptoms(prev => [...prev, message]);
          setMessages(prev => [...prev, { 
            type: 'ai', 
            content: "Any other symptoms? (Type 'no' if none)",
            timestamp: new Date()
          }]);
        } else {
          // Start medical history collection
          setMessages(prev => [...prev, { 
            type: 'ai', 
            content: "To provide better analysis, could you share your age?",
            timestamp: new Date()
          }]);
          setConversationStep(4);
        }
      } else if (conversationStep === 4) {
        // Age
        const age = parseInt(message);
        if (!isNaN(age)) {
          setMedicalHistory(prev => ({ ...prev, age }));
          setMessages(prev => [...prev, { 
            type: 'ai', 
            content: "What is your gender?",
            timestamp: new Date()
          }]);
          setConversationStep(5);
        } else {
          setMessages(prev => [...prev, { 
            type: 'ai', 
            content: "Please enter a valid age number.",
            timestamp: new Date()
          }]);
        }
      } else if (conversationStep === 5) {
        // Gender
        setMedicalHistory(prev => ({ ...prev, gender: message }));
        setMessages(prev => [...prev, { 
          type: 'ai', 
          content: "Do you have any existing medical conditions? (Type 'none' if none)",
          timestamp: new Date()
        }]);
        setConversationStep(6);
      } else if (conversationStep === 6) {
        // Existing conditions
        if (message.toLowerCase() !== 'none') {
          setMedicalHistory(prev => ({
            ...prev,
            existingConditions: [...prev.existingConditions, message]
          }));
          setMessages(prev => [...prev, { 
            type: 'ai', 
            content: "Any other conditions? (Type 'none' if none)",
            timestamp: new Date()
          }]);
        } else {
          // Analyze symptoms with AI
          setMessages(prev => [...prev, { 
            type: 'ai', 
            content: "Analyzing your symptoms...",
            timestamp: new Date()
          }]);

          try {
            const analysis = await analyzeSymptoms(collectedSymptoms, medicalHistory);
            
            // Store analysis in localStorage for results page
            localStorage.setItem('symptomAnalysis', JSON.stringify(analysis));
            
            setMessages(prev => [...prev, { 
              type: 'ai', 
              content: "Thank you for providing this information. I'll analyze your symptoms and provide recommendations.",
              timestamp: new Date()
            }]);

            // Redirect to results page
            setTimeout(() => {
              router.push('/product/results');
            }, 1500);
          } catch (err) {
            console.error('Error analyzing symptoms:', err);
            setError('An error occurred while analyzing your symptoms. Please try again.');
          }
        }
      }
    } catch (err) {
      setError('An error occurred while processing your message. Please try again.');
      console.error('Error in handleSendMessage:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartNewCheck = () => {
    setMessages([{ 
      type: 'ai', 
      content: "Hello! I'm your AI health assistant. What's bothering you today?",
      timestamp: new Date()
    }]);
    setConversationStep(0);
    setCurrentSymptom(null);
    setError(null);
    setCollectedSymptoms([]);
    setMedicalHistory({
      age: undefined,
      gender: undefined,
      existingConditions: [],
      medications: [],
      allergies: [],
      familyHistory: []
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-[#2D3436] mb-4">
              Symptom Checker
            </h1>
            <p className="text-[#636e72]">
              Describe your symptoms and get instant AI-powered health insights
            </p>
          </div>
          <button
            onClick={handleStartNewCheck}
            className="px-4 py-2 bg-gray-100 text-[#2D3436] rounded-lg hover:bg-gray-200 transition-colors"
          >
            Start New Check
          </button>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <SymptomChat 
            messages={messages} 
            onSendMessage={handleSendMessage} 
            isLoading={isLoading}
          />
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