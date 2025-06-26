'use client';

import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionSubtext } from '../ui/SectionSubtext';

const features = [
  {
    title: "AI-Powered Diagnosis",
    description: "Get instant preliminary analysis of your symptoms using advanced artificial intelligence.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
  {
    title: "24/7 Medical Support",
    description: "Access healthcare guidance anytime, anywhere with our round-the-clock support system.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Expert Consultation",
    description: "Connect with certified healthcare professionals for personalized medical advice.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14v6m0 0l-3-3m3 3l3-3" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

export default function Features() {
  return (
    <section id="features" className="h-full md:h-screen flex items-center bg-white relative overflow-hidden py-20 md:py-0">
      <div className="container mx-auto px-4 xl:px-20 2xl:px-4 relative">
        <SectionHeader
          subtitle="Key Features"
          title="Why Choose CareConnect?"
          className="mb-4"
        />
        <SectionSubtext className="mb-12">
          Experience healthcare reimagined with our innovative features
        </SectionSubtext>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 transition-all duration-500 hover:bg-white/10 group-hover:shadow-2xl">
              <div className="flex flex-row sm:flex-row items-start sm:items-center gap-4 mb-4 sm:mb-6 relative">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg relative z-10 flex-shrink-0"
                  style={{ backgroundColor: '#D98586' }}
                >
                  {feature.icon}
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center text-rose-300 border border-white/20 backdrop-blur-sm flex-shrink-0"
                >
                  {feature.icon}
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-base">{feature.description}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 