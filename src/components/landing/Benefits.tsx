'use client';

import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';

const benefits = [
  {
    number: '01',
    title: 'Comprehensive Symptom Analysis',
    description: 'Our AI provides a detailed analysis of your symptoms, offering insights into potential conditions and helping you understand your health better.',
  },
  {
    number: '02',
    title: '24/7 Accessibility',
    description: 'Access medical information and preliminary guidance whenever you need it, day or night, from the comfort of your home.',
  },
  {
    number: '03',
    title: 'Personalized Guidance',
    description: 'Receive recommendations and insights tailored to your specific health profile and symptoms.',
  },
  {
    number: '04',
    title: 'Connect with Experts',
    description: 'Easily connect with certified healthcare professionals for in-depth consultations and treatment plans.',
  },
  {
    number: '05',
    title: 'Secure and Private',
    description: 'Your health information is handled with the utmost care, ensuring complete privacy and security.',
  },
  {
    number: '06',
    title: 'Time and Cost Efficient',
    description: 'Save time and reduce unnecessary healthcare costs with quick access to information and preliminary assessments.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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

export default function Benefits() {
  return (
    <section id="benefits" className="py-24 bg-white text-[#2D3436] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-[#D98586]/10 text-[#D98586] text-sm font-medium mb-4">
                Unlock Health Benefits
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-[#2D3436] mb-8">
                Why Use CareConnect?
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-16"
            >
              {benefits.map((benefit) => (
                <motion.div key={benefit.number} variants={itemVariants} className="flex items-start gap-4">
                  <div className='rounded-xl bg-[#D98586]/10'>
                    <div className="text-[#2D3436] font-bold text-xl p-4">{benefit.number}</div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-semibold text-[#D98586] mb-2">{benefit.title}</h3>
                    <p className="text-xl text-[#636e72] leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Visual Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, type: 'spring', damping: 20, stiffness: 100 }}
            className="relative h-full flex justify-center items-center"
          >
            <div className="sticky top-1/2 -translate-y-1/2 w-full max-w-2xl aspect-square rounded-3xl overflow-hidden">
              <Player
                autoplay
                loop
                src="/anim.json"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 