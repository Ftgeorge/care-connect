'use client';

import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    name: 'Edward Alexander',
    title: 'Satisfied User',
    quote: 'Overall pleasurable experience. Pay a little first and Pay a little during the development of the app as milestones are achieved, which made me feel very confident and comfortable. Seamless and Easy process.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder image
    rating: 4.9,
  },
  {
    name: 'Diana Johnston',
    title: 'Happy Customer',
    quote: 'This app is a game-changer! It\'s so easy to get quick insights into my symptoms and connect with a doctor when needed. Highly recommend!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder image
    rating: 4.9,
  },
  {
    name: 'Lauren Contreras',
    title: 'Great Experience',
    quote: 'I was skeptical at first, but CareConnect exceeded my expectations. The AI analysis was helpful, and the doctor consultation was thorough and reassuring.',
    image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder image
    rating: 4.9,
  },
  {
    name: 'Michael Brown',
    title: 'Very Helpful',
    quote: 'CareConnect made understanding my symptoms so much easier. The interface is user-friendly, and the access to doctors is a major plus.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder image
    rating: 5.0,
  },
  {
    name: 'Sophia Lee',
    title: 'Efficient and Secure',
    quote: 'I appreciate the privacy and security of my data on CareConnect. It\'s a trustworthy platform for managing my health inquiries.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder image
    rating: 4.7,
  },
  {
    name: 'James Wilson',
    title: 'Quick and Easy',
    quote: 'Getting a preliminary analysis was fast, and connecting with a doctor was seamless. Highly recommend for anyone needing quick health guidance.',
    image: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder image
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
  const controls = useAnimation();
  const wheelRef = useRef<HTMLDivElement>(null);

  const numTestimonials = testimonials.length;
  const angleStep = 360 / numTestimonials;

  // Automatic cycling of testimonials and rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % numTestimonials);
    }, 5000); // Change testimonial every 5 seconds
    return () => clearInterval(interval);
  }, [numTestimonials]);

  // Rotate the wheel when activeIndex changes
  useEffect(() => {
    const newRotation = -activeIndex * angleStep;
    controls.start({
      rotate: newRotation,
      transition: { type: 'spring', stiffness: 50, damping: 10 },
    });
  }, [activeIndex, controls, angleStep]);


  const featuredTestimonial = testimonials[activeIndex];

  return (
    <section id="testimonials" className="relative py-24 bg-white overflow-hidden">
      {/* Background Decorative Elements - Can be adjusted or removed */}
      {/* <div className="absolute top-0 left-0 w-96 h-96 bg-[#00B894]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" /> */}
      {/* <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#3A86FF]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" /> */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Customer Reviews Wheel */}
          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 text-center md:text-left"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-[#D98586]/10 text-[#D98586] text-sm font-medium mb-4">
                Customer Stories
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-[#2D3436]">
                What Our Users Say
              </h2>
            </motion.div>

            {/* Testimonials Wheel Container */}
            <div className="relative w-72 h-72 lg:w-96 lg:h-96 flex items-center justify-center">
              {/* Circular Line */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full border border-[#D98586]/20" />
              </div>

              <motion.div
                ref={wheelRef}
                animate={controls}
                style={{ originX: '50%', originY: '50%' }}
                className="relative w-full h-full"
              >
                {testimonials.map((testimonial, index) => {
                  const angle = index * angleStep;
                  const radius = 150; // Adjust radius as needed
                  const x = radius * Math.cos(angle * Math.PI / 180);
                  const y = radius * Math.sin(angle * Math.PI / 180);

                  return (
                    <motion.div
                      key={index}
                      style={{
                        position: 'absolute',
                        x: x + 'px',
                        y: y + 'px',
                        left: '50%',
                        top: '50%',
                        marginLeft: '-28px',
                        marginTop: '-28px',
                        zIndex: activeIndex === index ? 10 : 1,
                        scale: activeIndex === index ? 1.2 : 1,
                        opacity: Math.abs(activeIndex - index) <= numTestimonials / 2 || Math.abs(activeIndex - index) >= numTestimonials - numTestimonials / 2 ? 1 : 0.5,
                        rotate: -angle, // Counter-rotate to keep images upright
                      }}
                      className={`w-14 h-14 rounded-full overflow-hidden border-2 cursor-pointer ${
                        activeIndex === index ? 'border-[#D98586]' : 'border-transparent'
                      }`}
                      onClick={() => setActiveIndex(index)}
                    >
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        className="object-cover"
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
              {/* Central indicator */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 rounded-full border-2 border-[#D98586] opacity-50" />
              </div>
            </div>
          </div>

          {/* Right Column - Featured Testimonial (Updates Automatically) */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex} // Key changes to trigger exit/enter animation
                variants={quoteVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="text-6xl text-[#CED4DA] mb-6 select-none">&#8220;</div> {/* Left quote */}
                <p className="text-2xl italic text-[#2D3436] leading-relaxed mb-6">
                  {featuredTestimonial.quote}
                </p>
                <div className="text-6xl text-[#CED4DA] self-end select-none">&#8221;</div> {/* Right quote */}
              </motion.div>
            </AnimatePresence>

            {/* Optional: Add featured author details here if needed */}
            {/* For this wheel design, displaying details on the right might be cleaner */}
            <motion.div
              key={`details-${activeIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4"
            >
              <h3 className="text-lg font-semibold text-[#2D3436]">{featuredTestimonial.name}</h3>
              <p className="text-sm text-[#636e72]">{featuredTestimonial.title}</p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
} 