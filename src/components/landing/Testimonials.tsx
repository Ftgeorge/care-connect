'use client';

import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { testimonials } from '@/config/testimonials';
import { Button } from '../ui/Button';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionSubtext } from '../ui/SectionSubtext';
import { Avatar } from '../ui/Avatar';

const quoteVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.8 } },
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimationControls();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const numTestimonials = testimonials.length;
  const angleStep = 360 / numTestimonials;

  // Automatic cycling of testimonials
  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setActiveIndex((current) => (current + 1) % numTestimonials);
      }, 4000);
    };

    startInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [numTestimonials]);

  // Handle manual selection
  const handleTestimonialClick = (index: number) => {
    setActiveIndex(index);
    // Reset the interval when user manually selects
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setActiveIndex((current) => (current + 1) % numTestimonials);
      }, 4000);
    }, 6000); // Wait 6 seconds before resuming auto-rotation
  };

  // Rotate the wheel when activeIndex changes
  useEffect(() => {
    const newRotation = -activeIndex * angleStep;
    controls.start({
      rotate: newRotation,
      transition: { 
        type: 'spring', 
        stiffness: 60, 
        damping: 15,
        duration: 0.8
      },
    });
  }, [activeIndex, controls, angleStep]);

  const featuredTestimonial = testimonials[activeIndex];

  return (
    <section id="testimonials" className="relative py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 xl:px-20 2xl:px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Clean Testimonials Wheel */}
          <div className="flex flex-col items-center justify-center">
            <SectionHeader
              subtitle="Customer Stories"
              title="What Our Users Say"
              className="mb-4"
            />
            <SectionSubtext className="mb-12">
              Hear from real users about their experiences with CareConnect
            </SectionSubtext>

            {/* Clean Testimonials Wheel */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                
                {/* Subtle background circle */}
                <div className="absolute inset-0 rounded-full border border-gray-100"></div>
                
                {/* Rotating container */}
                <motion.div
                  animate={controls}
                  className="relative w-full h-full"
                  style={{ transformOrigin: 'center' }}
                >
                  {testimonials.map((testimonial: { name: string; title: string; quote: string; image: string; rating: number }, index: number) => {
                    const angle = (index * angleStep - 90) * (Math.PI / 180); // Start from top
                    const radius = 140; // Distance from center
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    const isActive = activeIndex === index;
                    
                    return (
                      <motion.div
                        key={index}
                        className="absolute cursor-pointer"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${activeIndex * angleStep}deg)`,
                        }}
                        onClick={() => handleTestimonialClick(index)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Avatar src={testimonial.image} alt={testimonial.name} size={48} borderColor={isActive ? '#D98586' : '#E0E0E0'} className={isActive ? 'ring-4 ring-[#D98586] ring-offset-4 ring-offset-white shadow-xl' : 'ring-2 ring-gray-200 hover:ring-[#D98586]/50 shadow-md'} />
                        {/* Active indicator dot */}
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#D98586] rounded-full border-2 border-white"
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Center avatar with active testimonial */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  key={`center-${activeIndex}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Avatar src={featuredTestimonial.image} alt={featuredTestimonial.name} size={80} borderColor="#fff" className="shadow-2xl" />
                </motion.div>

                {/* Navigation dots */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {testimonials.map((_: any, index: number) => (
                    <Button
                      key={index}
                      onClick={() => handleTestimonialClick(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeIndex === index 
                          ? 'bg-[#D98586] w-6' 
                          : 'bg-gray-300 hover:bg-[#D98586]/50'
                      }`}
                      variant="secondary"
                      aria-label={`Go to testimonial ${index + 1}`}
                    >
                      {/* No visible content for dot button */}
                      <span className="sr-only">Go to testimonial {index + 1}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Featured Testimonial */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={quoteVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative"
              >
                {/* Quote marks */}
                <div className="text-6xl font-serif text-[#D98586]/20 mb-4 leading-none select-none">
                  &#8220;
                </div>
                
                <blockquote className="text-xl lg:text-2xl text-[#2D3436] leading-relaxed mb-6 font-light italic pl-4">
                  {featuredTestimonial.quote}
                </blockquote>
                
                <div className="flex justify-end">
                  <div className="text-6xl font-serif text-[#D98586]/20 leading-none select-none">
                    &#8221;
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Author details */}
            <motion.div
              key={`details-${activeIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex items-center space-x-4"
            >
              <Avatar src={featuredTestimonial.image} alt={featuredTestimonial.name} size={48} borderColor="#E0E0E0" />
              <div>
                <h3 className="text-lg font-semibold text-[#2D3436]">
                  {featuredTestimonial.name}
                </h3>
                <p className="text-sm text-[#636e72]">
                  {featuredTestimonial.title}
                </p>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-sm">
                        {i < Math.floor(featuredTestimonial.rating) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {featuredTestimonial.rating}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}