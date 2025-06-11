'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const faqItems = [
  {
    question: "What makes CareConnect different from other health apps?",
    answer: "CareConnect utilizes advanced AI for preliminary symptom analysis and connects you directly with certified medical professionals for personalized guidance, offering a seamless and integrated healthcare experience.",
    icon: "🏥"
  },
  {
    question: "How accurate is the AI symptom analysis?",
    answer: "Our AI provides preliminary insights based on the information you provide. It is not a substitute for professional medical advice. Always consult with a qualified healthcare provider for diagnosis and treatment.",
    icon: "🤖"
  },
  {
    question: "Can I connect with a doctor 24/7?",
    answer: "Yes, our platform is designed to provide access to medical guidance anytime. You can connect with certified professionals for consultations based on their availability.",
    icon: "⏰"
  },
  {
    question: "Is my personal health information secure?",
    answer: "Absolutely. We prioritize your privacy and security. Your health data is encrypted and handled in compliance with strict privacy regulations.",
    icon: "🔒"
  },
  {
    question: "How quickly can I get a response from the AI or a doctor?",
    answer: "The AI provides immediate preliminary analysis. The response time from a certified doctor may vary depending on their availability, but we strive to connect you as quickly as possible.",
    icon: "⚡"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  }
};

const cardVariants = {
  inactive: {
    scale: 0.95,
    opacity: 0.7,
    y: 20,
    filter: "blur(1px)"
  },
  active: {
    scale: 1,
    opacity: 1,
    y: 0,
    filter: "blur(0px)"
  }
};

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-advance FAQ items
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % faqItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    setAutoPlay(false);
    // Resume autoplay after 8 seconds
    setTimeout(() => setAutoPlay(true), 8000);
  };

  const handlePrev = () => {
    setActiveIndex(activeIndex > 0 ? activeIndex - 1 : faqItems.length - 1);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 8000);
  };

  const handleNext = () => {
    setActiveIndex(activeIndex < faqItems.length - 1 ? activeIndex + 1 : 0);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 8000);
  };

  return (
    <section id="faq" className="min-h-screen flex items-center bg-gradient-to-br from-[#F8F9FA] via-white to-[#F8F9FA] text-[#2D3436] py-20">
      <div className="container mx-auto px-4 xl:px-20 2xl:px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          
          {/* Left Column - Header & Controls */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 rounded-full bg-[#D98586]/10 text-[#D98586] text-sm font-medium mb-4 xl:mb-2 2xl:mb-4">
                  Support Center
                </span>
                <h2 className="text-4xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-6xl font-bold text-[#2D3436] leading-tight">
                  Frequently Asked{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D98586] to-[#B07A7B]">
                    Questions
                  </span>
                </h2>
              </motion.div>

              <motion.p 
                variants={itemVariants}
                className="text-base 2xl:text-lg text-[#636e72] leading-relaxed max-w-md"
              >
                Find answers to common questions about our services, process, and technical expertise. Get the information you need to make informed decisions.
              </motion.p>
            </div>

            {/* Enhanced Navigation */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-4"
            >
              <div className="flex gap-3">
                <motion.button 
                  onClick={handlePrev}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-white border-2 border-[#E0E0E0] flex items-center justify-center text-[#636e72] hover:border-[#D98586] hover:text-[#D98586] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                
                <motion.button 
                  onClick={handleNext}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-[#D98586] to-[#B07A7B] flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>

              {/* Progress indicator */}
              <div className="flex items-center space-x-2 text-sm text-[#636e72]">
                <span>{activeIndex + 1}</span>
                <div className="w-12 h-1 bg-[#E0E0E0] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#D98586] to-[#B07A7B] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeIndex + 1) / faqItems.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span>{faqItems.length}</span>
              </div>
            </motion.div>

            {/* Auto-play indicator */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-2 text-sm text-[#636e72]"
            >
              <div className={`w-2 h-2 rounded-full ${autoPlay ? 'bg-green-500' : 'bg-gray-400'} transition-colors duration-300`} />
              <span>{autoPlay ? 'Auto-advancing' : 'Manual control'}</span>
            </motion.div>
          </motion.div>

          {/* Right Column - FAQ Cards */}
          <motion.div 
            variants={itemVariants}
            className="relative h-96 lg:h-[500px]"
          >
            <AnimatePresence mode="wait">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="inactive"
                  animate={activeIndex === index ? "active" : "inactive"}
                  exit="inactive"
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 20,
                    duration: 0.6 
                  }}
                  className={`absolute inset-0 rounded-3xl p-8 cursor-pointer transition-all duration-500 ${
                    activeIndex === index
                      ? 'bg-gradient-to-br from-[#D98586] to-[#B07A7B] text-white shadow-2xl z-10'
                      : 'bg-white border border-[#E0E0E0] hover:border-[#D98586]/30 hover:shadow-lg z-0'
                  }`}
                  onClick={() => handleClick(index)}
                  whileHover={activeIndex !== index ? { y: -5, scale: 1.02 } : {}}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    zIndex: activeIndex === index ? 10 : faqItems.length - Math.abs(activeIndex - index)
                  }}
                >
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      {/* Icon */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-6 ${
                          activeIndex === index
                            ? 'bg-white/20 backdrop-blur-sm'
                            : 'bg-[#F8F9FA]'
                        }`}
                      >
                        {item.icon}
                      </motion.div>

                      {/* Question */}
                      <motion.h3 
                        className={`text-2xl lg:text-2xl xl:text-2xl font-bold leading-tight mb-4 ${
                          activeIndex === index ? 'text-white' : 'text-[#2D3436]'
                        }`}
                        layoutId={`question-${index}`}
                      >
                        {item.question}
                      </motion.h3>

                      {/* Answer */}
                      <AnimatePresence>
                        {activeIndex === index && (
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="text-white/90 leading-relaxed text-base lg:text-lg"
                          >
                            {item.answer}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Expand indicator */}
                    <motion.div
                      className={`self-end w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        activeIndex === index
                          ? 'bg-white/20 text-white'
                          : 'bg-[#F8F9FA] text-[#636e72] hover:bg-[#D98586]/10 hover:text-[#D98586]'
                      }`}
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Bottom Navigation Dots */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center gap-3 mt-16"
        >
          {faqItems.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleClick(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? 'bg-gradient-to-r from-[#D98586] to-[#B07A7B] w-8 shadow-lg' 
                  : 'bg-[#E0E0E0] hover:bg-[#D98586]/50 w-2'
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}