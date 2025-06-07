'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight, FaStethoscope } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          transform: 'translateZ(-1px) scale(2)',
          zIndex: -1
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your AI-Powered Health Assistant
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Get instant health insights and connect with doctors from the comfort of your home
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/product"
                className="inline-flex items-center justify-center px-8 py-3 bg-[#D98586] text-white rounded-full hover:bg-[#D98586]/90 transition-colors group"
              >
                <span>Get Started</span>
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/product/booking"
                className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                <FaStethoscope className="mr-2" />
                <span>Book a Doctor</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 