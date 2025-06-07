'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const faqItems = [
  {
    question: "What makes CareConnect different from other health apps?",
    answer: "CareConnect utilizes advanced AI for preliminary symptom analysis and connects you directly with certified medical professionals for personalized guidance, offering a seamless and integrated healthcare experience.",
  },
  {
    question: "How accurate is the AI symptom analysis?",
    answer: "Our AI provides preliminary insights based on the information you provide. It is not a substitute for professional medical advice. Always consult with a qualified healthcare provider for diagnosis and treatment.",
  },
  {
    question: "Can I connect with a doctor 24/7?",
    answer: "Yes, our platform is designed to provide access to medical guidance anytime. You can connect with certified professionals for consultations based on their availability.",
  },
  {
    question: "Is my personal health information secure?",
    answer: "Absolutely. We prioritize your privacy and security. Your health data is encrypted and handled in compliance with strict privacy regulations.",
  },
  {
    question: "How quickly can I get a response from the AI or a doctor?",
    answer: "The AI provides immediate preliminary analysis. The response time from a certified doctor may vary depending on their availability, but we strive to connect you as quickly as possible.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index:any) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setActiveIndex(activeIndex > 0 ? activeIndex - 1 : faqItems.length - 1);
  };

  const handleNext = () => {
    setActiveIndex(activeIndex < faqItems.length - 1 ? activeIndex + 1 : 0);
  };

  return (
    <section id="faq" className="h-screen flex items-center bg-[#F8F9FA] text-[#2D3436] overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col gap-16 items-start w-full">
          {/* Left Column - Title and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-row justify-between w-full"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D3436] leading-tight">
              Frequently Asked <br /> <span className="text-[#D98586]">Questions</span>
            </h2>
            <div className='flex flex-col max-w-md'>
              <p className="text-lg text-[#636e72] leading-relaxed">
                Find answers to common questions about our services, process, and technical expertise.
              </p>

              {/* Navigation buttons */}
              <div className="flex gap-3 mt-4">
                <button 
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full bg-white border border-[#E0E0E0] flex items-center justify-center text-[#636e72] hover:border-[#D98586] hover:text-[#D98586] transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-[#D98586] flex items-center justify-center text-white hover:bg-[#D98586] transition-all duration-200 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - FAQ Cards Container */}
          <div className="w-full overflow-hidden h-120">
            <motion.div 
              className="flex gap-6 h-full"
              animate={{ x: `${-activeIndex * 25}%` }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.6
              }}
            >
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`flex-shrink-0 w-100 h-full rounded-2xl p-6 cursor-pointer transition-all duration-500 shadow-sm hover:shadow-lg ${
                    activeIndex === index
                      ? 'bg-[#D98586] text-white transform scale-105 shadow-xl'
                      : 'bg-white border border-[#E0E0E0] hover:border-[#D98586]/30 opacity-80 hover:opacity-100'
                  }`}
                  onClick={() => handleClick(index)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-3xl font-semibold leading-tight pr-4 ${
                      activeIndex === index ? 'text-white' : 'text-[#2D3436]'
                    }`}>
                      {item.question}
                    </h3>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      activeIndex === index
                        ? 'bg-white/20 text-white'
                        : 'bg-[#F8F9FA] text-[#636e72]'
                    }`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeIndex === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <motion.div
                    animate={{
                      opacity: activeIndex === index ? 1 : 0.7,
                      scale: activeIndex === index ? 1 : 0.95
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className={`leading-relaxed text-sm ${
                      activeIndex === index ? 'text-white/90' : 'text-[#636e72]'
                    }`}>
                      {item.answer}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center gap-2 w-full">
            {faqItems.map((_, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-[#D98586] w-8' : 'bg-[#E0E0E0] hover:bg-[#D98586]/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}