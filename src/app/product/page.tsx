'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import SymptomChat from '@/components/product/SymptomChat';
import QuickSuggestions from '@/components/product/QuickSuggestions';
import { 
  analyzeSymptoms, 
  getPreventiveRecommendations,
  getConversationResponse,
  getMoreSymptomsResponse,
  getMoreConditionsResponse,
  getAnalyzingResponse,
  getInvalidAgeResponse
} from '@/services/ai-service';

const quickSuggestions = [
  "Headache and feeling tired",
  "Stomach pain and nausea",
  "Cough and sore throat",
  "Back pain and stiffness",
  "Dizziness and fatigue"
];

// Enhanced greeting messages
const GREETING_MESSAGES = [
  "Hello! I'm here to help you understand your symptoms. What's been bothering you lately?",
  "Hi there! I'm your AI health assistant. Tell me, what symptoms have you been experiencing?",
  "Hey! I'm here to help you figure out what might be going on with your health. What's troubling you today?",
  "Hello! Ready to help you with your health concerns. What symptoms would you like to discuss?",
  "Hi! I'm your personal health assistant. What's been on your mind health-wise?"
];

export default function SymptomChecker() {
  const router = useRouter();
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai', content: string, timestamp: Date }>>([
    { 
      type: 'ai', 
      content: GREETING_MESSAGES[Math.floor(Math.random() * GREETING_MESSAGES.length)], 
      timestamp: new Date() 
    }
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

  const addAIMessage = (content: string) => {
    setMessages(prev => [...prev, { 
      type: 'ai', 
      content,
      timestamp: new Date()
    }]);
  };

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
        
        // Use enhanced conversation response
        addAIMessage(getConversationResponse(1));
        setConversationStep(1);
        
      } else if (conversationStep === 1) {
        // Duration response - add some contextual awareness
        const durationIndicators = ['day', 'week', 'month', 'hour', 'yesterday', 'today'];
        const hasDuration = durationIndicators.some(indicator => 
          message.toLowerCase().includes(indicator)
        );
        
        if (hasDuration) {
          addAIMessage(getConversationResponse(2));
        } else {
          addAIMessage("I see. " + getConversationResponse(2));
        }
        setConversationStep(2);
        
      } else if (conversationStep === 2) {
        // Medication response - acknowledge what they've taken
        const medicationIndicators = ['tylenol', 'ibuprofen', 'aspirin', 'nothing', 'no', 'none'];
        const mentionedMeds = medicationIndicators.some(med => 
          message.toLowerCase().includes(med)
        );
        
        if (mentionedMeds) {
          if (message.toLowerCase().includes('nothing') || message.toLowerCase().includes('no')) {
            addAIMessage("Okay, no medications so far. " + getConversationResponse(3));
          } else {
            addAIMessage("Got it, thanks for letting me know. " + getConversationResponse(3));
          }
        } else {
          addAIMessage(getConversationResponse(3));
        }
        setConversationStep(3);
        
      } else if (conversationStep === 3) {
        // Additional symptoms
        if (message.toLowerCase().includes('no') || message.toLowerCase().includes('nothing') || 
            message.toLowerCase().includes('none') || message.toLowerCase().includes('that\'s it')) {
          // Start medical history collection
          addAIMessage(getConversationResponse(4));
          setConversationStep(4);
        } else {
          setCollectedSymptoms(prev => [...prev, message]);
          addAIMessage(getMoreSymptomsResponse());
        }
        
      } else if (conversationStep === 4) {
        // Age - enhanced validation and response
        const age = parseInt(message);
        if (!isNaN(age) && age > 0 && age < 150) {
          setMedicalHistory(prev => ({ ...prev, age }));
          
          // Add contextual response based on age
          let ageResponse = "";
          if (age < 18) {
            ageResponse = "Thanks! Since you're under 18, please make sure to involve a parent or guardian in any health decisions. ";
          } else if (age > 65) {
            ageResponse = "Thank you for that information. ";
          } else {
            ageResponse = "Got it, thanks! ";
          }
          
          addAIMessage(ageResponse + getConversationResponse(5));
          setConversationStep(5);
        } else {
          addAIMessage(getInvalidAgeResponse());
        }
        
      } else if (conversationStep === 5) {
        // Gender - more inclusive approach
        setMedicalHistory(prev => ({ ...prev, gender: message }));
        addAIMessage("Perfect, thank you. " + getConversationResponse(6));
        setConversationStep(6);
        
      } else if (conversationStep === 6) {
        // Existing conditions
        if (message.toLowerCase().includes('none') || message.toLowerCase().includes('no') || 
            message.toLowerCase().includes('nothing')) {
          // Final analysis
          addAIMessage(getAnalyzingResponse());
          
          try {
            // Get symptom analysis
            const analysis = await analyzeSymptoms(collectedSymptoms, medicalHistory);
            
            // Get preventive recommendations if age and gender are provided
            let preventiveRecommendations: string[] = [];
            if (medicalHistory.age && medicalHistory.gender) {
              try {
                preventiveRecommendations = await getPreventiveRecommendations(
                  medicalHistory.age,
                  medicalHistory.gender,
                  medicalHistory.existingConditions
                );
              } catch (err) {
                console.error('Error getting preventive recommendations:', err);
              }
            }
            
            // Store analysis and recommendations in localStorage for results page
            localStorage.setItem('symptomAnalysis', JSON.stringify({
              ...analysis,
              preventiveRecommendations,
              date: new Date().toISOString(),
              symptoms: collectedSymptoms,
              medicalHistory
            }));
            
            addAIMessage("Perfect! I've analyzed everything you've shared with me. Let me prepare your personalized health insights...");

            // Redirect to results page
            setTimeout(() => {
              router.push('/product/results');
            }, 2000);
            
          } catch (err) {
            console.error('Error analyzing symptoms:', err);
            setError('Hmm, I ran into an issue analyzing your symptoms. Could you try again?');
          }
        } else {
          // Add condition and ask for more
          setMedicalHistory(prev => ({
            ...prev,
            existingConditions: [...prev.existingConditions, message]
          }));
          addAIMessage(getMoreConditionsResponse());
        }
      }
    } catch (err) {
      setError('Sorry, something went wrong while processing your message. Could you try that again?');
      console.error('Error in handleSendMessage:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartNewCheck = () => {
    const newGreeting = GREETING_MESSAGES[Math.floor(Math.random() * GREETING_MESSAGES.length)];
    setMessages([{
      type: 'ai',
      content: newGreeting,
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
              Chat with our AI assistant about your symptoms and get personalized health insights
            </p>
          </div>
          <button
            onClick={handleStartNewCheck}
            className="px-4 py-2 bg-gray-100 text-[#2D3436] rounded-lg hover:bg-gray-200 transition-colors"
          >
            Start Fresh
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