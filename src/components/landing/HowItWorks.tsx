'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionSubtext } from '../ui/SectionSubtext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

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
        className="relative z-10 w-full container mx-auto px-4 xl:px-20 2xl:px-4 sm:px-6 lg:px-8 will-change-transform flex flex-col items-center justify-center"
      >
        <SectionHeader
          subtitle="Simple Process"
          title="How It"
          highlight="Works"
          className="mb-4"
          titleClassname="text-white"
        />
        <SectionSubtext className="mb-12">
          Experience seamless healthcare in three simple steps designed for your convenience
        </SectionSubtext>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card key={step.number} className="relative group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 transition-all duration-500 hover:bg-white/10 group-hover:shadow-2xl">
              <Badge className="absolute -top-2 -left-2 w-12 h-12 flex items-center justify-center text-lg shadow-lg" color="bg-gradient-to-br from-[#D98586] to-rose-300 text-white">
                {step.number}
              </Badge>
              <div className="flex flex-row sm:flex-row items-start sm:items-center gap-4 mb-4 sm:mb-6 relative">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center text-rose-300 border border-white/20 backdrop-blur-sm flex-shrink-0"
                >
                  {step.icon}
                </motion.div>
              </div>
              <h3 className="text-xl md:text-base lg:text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-rose-200 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base lg:text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                {step.description}
              </p>
              {/* Hover Gradient Border */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-rose-500/0 via-rose-500/20 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Button className="inline-flex items-center justify-center mt-12">
          <Link href="/product" className="flex items-center">
            <span>Get Started Now</span>
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
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