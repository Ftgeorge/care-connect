'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const steps = [
  {
    number: "01",
    title: "Describe Your Symptoms",
    description: "Simply tell us what you're experiencing through our intuitive chat interface.",
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Our advanced AI analyzes your symptoms and provides preliminary insights.",
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Connect with Doctor",
    description: "Get connected with a certified doctor for personalized medical guidance.",
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14v6m0 0l-3-3m3 3l3-3" />
      </svg>
    ),
  },
];

const stepVariants = {
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
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative min-h-screen flex items-center overflow-hidden py-12 sm:py-16 md:py-24"
    >
      {/* Parallax Background Layer */}
      <motion.div
        style={{ y: y }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="relative w-full h-full min-h-screen">
          <Image
            src="/hiw.jpg"
            alt="Hero Background"
            fill
            className="object-cover object-center"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black/60 sm:bg-black/50" />
        </div>
      </motion.div>

      {/* Content Layer */}
      <motion.div
        className="relative z-10 w-full container mx-auto px-4 xl:px-20 2xl:px-4 sm:px-6 lg:px-8 will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-4 py-2 sm:px-6 sm:py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs sm:text-sm font-medium mb-4 sm:mb-6 backdrop-blur-sm"
          >
            Simple Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-4xl 2xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2"
          >
            How It <span style={{ color: '#D98586' }}>Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl xl:text-base 2xl:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Experience seamless healthcare in three simple steps designed for your convenience
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 transition-all duration-500 hover:bg-white/10 group-hover:shadow-2xl">
                {/* Step Number Background Glow */}
                <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-12 h-12 sm:w-16 sm:h-16 bg-rose-500/20 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 sm:mb-6 relative">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg relative z-10 flex-shrink-0"
                    style={{ backgroundColor: '#D98586' }}
                  >
                    {step.number}
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center text-rose-300 border border-white/20 backdrop-blur-sm flex-shrink-0"
                  >
                    {step.icon}
                  </motion.div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-rose-200 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {step.description}
                </p>

                {/* Hover Gradient Border */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-rose-500/0 via-rose-500/20 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>

              {/* Connecting line with animation - Hidden on mobile, visible on desktop */}
              {index < steps.length - 1 && (
                <>
                  {/* Horizontal line for desktop */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index + 1) * 0.3, duration: 0.8 }}
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 origin-left"
                    style={{ backgroundColor: '#D98586' }}
                  >
                    <motion.div
                      animate={{ x: [0, 8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute right-0 top-1/2 w-2 h-2 rounded-full transform -translate-y-1/2"
                      style={{ backgroundColor: '#D98586' }}
                    />
                  </motion.div>

                  {/* Vertical line for mobile/tablet */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index + 1) * 0.3, duration: 0.8 }}
                    className="block lg:hidden absolute left-1/2 -bottom-3 w-0.5 h-6 origin-top transform -translate-x-1/2"
                    style={{ backgroundColor: '#D98586' }}
                  >
                    <motion.div
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute bottom-0 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2"
                      style={{ backgroundColor: '#D98586' }}
                    />
                  </motion.div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12 sm:mt-16"
        >
          <Link
            href="/product"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#D98586] text-white rounded-full hover:bg-[#D98586]/90 transition-colors group"
          >
            <span>Get Started Now</span>
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Animated Background Particles - Reduced on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(window?.innerWidth > 768 ? 20 : 10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-rose-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
            }}
          />
        ))}
      </div>
    </section>
  );
}