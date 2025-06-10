'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { FaArrowRight, FaStethoscope } from 'react-icons/fa';
import Image from 'next/image';

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: y }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="relative w-full h-screen">
          <Image
            src="/hero.avif"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-4xl lg:text-4xl xl:text-6xl font-bold text-white mb-6">
              Your Health Our Priority
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