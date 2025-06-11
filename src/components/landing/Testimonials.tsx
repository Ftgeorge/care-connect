'use client';

import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    name: 'Edward Alexander',
    title: 'Satisfied User',
    quote: 'Overall pleasurable experience. Pay a little first and Pay a little during the development of the app as milestones are achieved, which made me feel very confident and comfortable. Seamless and Easy process.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.9,
  },
  {
    name: 'Diana Johnston',
    title: 'Happy Customer',
    quote: 'This app is a game-changer! It\'s so easy to get quick insights into my symptoms and connect with a doctor when needed. Highly recommend!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.9,
  },
  {
    name: 'Lauren Contreras',
    title: 'Great Experience',
    quote: 'I was skeptical at first, but CareConnect exceeded my expectations. The AI analysis was helpful, and the doctor consultation was thorough and reassuring.',
    image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.9,
  },
  {
    name: 'Michael Brown',
    title: 'Very Helpful',
    quote: 'CareConnect made understanding my symptoms so much easier. The interface is user-friendly, and the access to doctors is a major plus.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 5.0,
  },
  {
    name: 'Sophia Lee',
    title: 'Efficient and Secure',
    quote: 'I appreciate the privacy and security of my data on CareConnect. It\'s a trustworthy platform for managing my health inquiries.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.7,
  },
  {
    name: 'James Wilson',
    title: 'Quick and Easy',
    quote: 'Getting a preliminary analysis was fast, and connecting with a doctor was seamless. Highly recommend for anyone needing quick health guidance.',
    image: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.8,
  },
];

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
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Clean Testimonials Wheel */}
          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 text-center"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-[#D98586]/10 text-[#D98586] text-sm font-medium mb-4">
                Customer Stories
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-4xl 2xl:text-6xl font-display font-bold text-[#2D3436]">
                What Our Users Say
              </h2>
            </motion.div>

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
                  {testimonials.map((testimonial, index) => {
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
                        <div className={`
                          relative size-12 2xl:size-16 rounded-full overflow-hidden
                          ${isActive 
                            ? 'ring-4 ring-[#D98586] ring-offset-4 ring-offset-white shadow-xl' 
                            : 'ring-2 ring-gray-200 hover:ring-[#D98586]/50 shadow-md'
                          }
                          transition-all duration-300
                        `}>
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                          
                          {/* Active indicator dot */}
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#D98586] rounded-full border-2 border-white"
                            />
                          )}
                        </div>
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
                  <div className="size-16 2xl:size-20 rounded-full overflow-hidden ring-4 ring-white shadow-2xl">
                    <Image
                      src={featuredTestimonial.image}
                      alt={featuredTestimonial.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </motion.div>

                {/* Navigation dots */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleTestimonialClick(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeIndex === index 
                          ? 'bg-[#D98586] w-6' 
                          : 'bg-gray-300 hover:bg-[#D98586]/50'
                      }`}
                    />
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
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-200">
                <Image
                  src={featuredTestimonial.image}
                  alt={featuredTestimonial.name}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
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