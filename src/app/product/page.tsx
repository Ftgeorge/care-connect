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

export default function ResponsiveSymptomChecker() {
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
  const [showQuickSuggestions, setShowQuickSuggestions] = useState(true);
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
      setShowQuickSuggestions(false); // Hide suggestions after first message

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

            // Store analysis and recommendations in memory instead of localStorage
            const analysisData = {
              ...analysis,
              preventiveRecommendations,
              date: new Date().toISOString(),
              symptoms: collectedSymptoms,
              medicalHistory
            };

            // You would typically pass this data through router state or context
            // For demo purposes, we'll use sessionStorage as an alternative
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('symptomAnalysis', JSON.stringify(analysisData));
            }

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
    setShowQuickSuggestions(true);
    setMedicalHistory({
      age: undefined,
      gender: undefined,
      existingConditions: [],
      medications: [],
      allergies: [],
      familyHistory: []
    });
  };

  const handleQuickSuggestionSelect = (suggestion: string) => {
    setShowQuickSuggestions(false);
    handleSendMessage(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
      {/* Mobile-optimized container with proper spacing */}
      <div className="px-4 sm:px-6 lg:px-4 py-4 sm:py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">

          {/* Header Section - Mobile responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 lg:mb-8"
          >
            {/* Mobile Header Layout */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="flex-1">
                <div className='w-full flex items-center justify-between mb-2 lg:mb-2 xl:mb-2 2xl:mb-4'>
                  <h1 className="text-xl sm:text-3xl lg:text-xl xl:text-3xl 2xl:text-4xl font-bold text-[#2D3436]">
                    Symptom Checker
                  </h1>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStartNewCheck}
                    className="block lg:hidden sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-gray-100 to-gray-50 text-[#2D3436] rounded-xl hover:from-gray-200 hover:to-gray-100 transition-all duration-200 shadow-sm hover:shadow-md text-xs sm:text-base lg:text-sm xl:text-sm 2xl:text-base font-medium border border-gray-200/50"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Start Fresh
                    </span>
                  </motion.button>
                </div>
                <p className="text-sm sm:text-sm xl:text-sm text-[#636e72] leading-relaxed">
                  Chat with our AI assistant about your symptoms and get personalized health insights
                </p>
              </div>

              {/* Mobile-friendly button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartNewCheck}
                className="hidden lg:block w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-gray-100 to-gray-50 text-[#2D3436] rounded-xl hover:from-gray-200 hover:to-gray-100 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base lg:text-sm xl:text-sm 2xl:text-base font-medium border border-gray-200/50"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Start Fresh
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Error Message - Mobile optimized */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="mb-4 lg:mb-6 p-3 sm:p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.098 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-sm sm:text-base">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Chat Container - Mobile optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 h-full backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/50 overflow-hidden"
          >
            <SymptomChat
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </motion.div>

          {/* Quick Suggestions - Mobile responsive */}
          <AnimatePresence>
            {showQuickSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ delay: 0.2 }}
                className="mt-6 lg:mt-8"
              >
                <div className="mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-[#2D3436] mb-2">
                    Quick Suggestions
                  </h2>
                  <p className="text-sm text-[#636e72] hidden sm:block">
                    Tap any suggestion below to get started quickly
                  </p>
                </div>

                <QuickSuggestions
                  suggestions={quickSuggestions}
                  onSelect={handleQuickSuggestionSelect}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Indicator - Mobile friendly */}
          {conversationStep > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 lg:mt-8 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#2D3436]">
                  Assessment Progress
                </span>
                <span className="text-xs text-[#636e72]">
                  Step {Math.min(conversationStep, 6)} of 6
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(Math.min(conversationStep, 6) / 6) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="bg-gradient-to-r from-[#D98586] to-[#E8A5A6] h-2 rounded-full"
                />
              </div>

              {/* Step Labels - Hidden on mobile to save space */}
              <div className="hidden sm:flex justify-between mt-2 text-xs text-[#636e72]">
                <span className={conversationStep >= 1 ? 'text-[#D98586] font-medium' : ''}>
                  Symptoms
                </span>
                <span className={conversationStep >= 2 ? 'text-[#D98586] font-medium' : ''}>
                  Duration
                </span>
                <span className={conversationStep >= 3 ? 'text-[#D98586] font-medium' : ''}>
                  Treatment
                </span>
                <span className={conversationStep >= 4 ? 'text-[#D98586] font-medium' : ''}>
                  Details
                </span>
                <span className={conversationStep >= 5 ? 'text-[#D98586] font-medium' : ''}>
                  Profile
                </span>
                <span className={conversationStep >= 6 ? 'text-[#D98586] font-medium' : ''}>
                  Analysis
                </span>
              </div>
            </motion.div>
          )}

          {/* Health Tips - Mobile card */}
          {conversationStep === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 lg:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {[
                {
                  icon: "🩺",
                  title: "Be Specific",
                  desc: "Describe your symptoms in detail for better insights"
                },
                {
                  icon: "📱",
                  title: "Easy to Use",
                  desc: "Chat naturally - no complex forms to fill out"
                },
                {
                  icon: "🔒",
                  title: "Private & Safe",
                  desc: "Your health data stays secure and confidential"
                }
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm p-4 lg:p-6 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="text-2xl mb-2">{tip.icon}</div>
                  <h3 className="font-semibold text-[#2D3436] mb-1 text-sm lg:text-base">
                    {tip.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-[#636e72]">
                    {tip.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}