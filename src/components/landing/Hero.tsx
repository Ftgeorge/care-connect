'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { FaArrowRight, FaStethoscope } from 'react-icons/fa';
import Image from 'next/image';
import { Button } from '../ui/Button';

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
            <h1 className="text-4xl md:text-4xl lg:text-3xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-6">
              Your Health Our Priority
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Get instant health insights and connect with doctors from the comfort of your home
            </p>
            <div className="flex flex-row gap-4 justify-center items-center">
              <Button className="group">
                <Link href="/product" className="flex items-center">
                  <span className='text-sm whitespace-nowrap'>Get Started</span>
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="secondary">
                <Link href="/product/booking" className="flex items-center">
                  <FaStethoscope className="mr-2" />
                  <span className='whitespace-nowrap text-sm'>Book a Doctor</span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 