'use client';

import { useState, useEffect } from 'react';
import { Heart, Shield, Clock, Users, Lock, TrendingUp, Sparkles, Brain, Zap } from 'lucide-react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const benefits = [
  {
    number: '01',
    title: 'AI-Powered Symptom Analysis',
    description: 'Advanced machine learning algorithms analyze your symptoms with medical-grade precision, providing comprehensive insights into potential conditions.',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    delay: 0.1
  },
  {
    number: '02',
    title: '24/7 Instant Access',
    description: 'Round-the-clock availability ensures immediate health guidance whenever you need it, breaking traditional healthcare barriers.',
    icon: Clock,
    color: 'from-blue-500 to-cyan-500',
    delay: 0.2
  },
  {
    number: '03',
    title: 'Personalized Health Intelligence',
    description: 'Tailored recommendations powered by your unique health profile, lifestyle, and medical history for truly personalized care.',
    icon: Sparkles,
    color: 'from-green-500 to-emerald-500',
    delay: 0.3
  },
  {
    number: '04',
    title: 'Expert Network Integration',
    description: 'Seamlessly connect with certified healthcare professionals through our intelligent matching system for specialized care.',
    icon: Users,
    color: 'from-orange-500 to-red-500',
    delay: 0.4
  },
  {
    number: '05',
    title: 'Enterprise-Grade Security',
    description: 'Military-level encryption and HIPAA-compliant infrastructure ensure your health data remains completely private and secure.',
    icon: Shield,
    color: 'from-indigo-500 to-purple-500',
    delay: 0.5
  },
  {
    number: '06',
    title: 'Smart Cost Optimization',
    description: 'Intelligent healthcare routing reduces unnecessary visits and costs while maintaining optimal care quality through predictive analytics.',
    icon: TrendingUp,
    color: 'from-teal-500 to-green-500',
    delay: 0.6
  },
];

const floatingElements = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 40 + 20,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 20 + 20,
  delay: Math.random() * 10
}));

export default function Benefits() {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="benefits" className="relative min-h-screen bg-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(188, 77, 43, 0.3) 0%, transparent 50%)`
          }}
        />

        {/* Floating Elements */}
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute rounded-full bg-gradient-to-r from-[#D98586]/20 to-rose-100 blur-sm animate-pulse"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              animationDuration: `${element.duration}s`,
              animationDelay: `${element.delay}s`
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(rgba(181, 74, 36, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(202, 90, 25, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 xl:px-20 2xl:px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 text-rose-300 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium">Revolutionary Healthcare Technology</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-4xl 2xl:text-6xl font-bold bg-gradient-to-r from-rose-100 via-rose-300 to-rose-500 bg-clip-text text-transparent mb-6 xl:mb-3 2xl:mb-6">
            Why Choose
            <br />
            <span className="bg-gradient-to-r from-[#D98586] to-rose-400 bg-clip-text text-transparent">
              CareConnect?
            </span>
          </h2>

          <p className="text-xl xl:text-base 2xl:text-xl text-gray-500 max-w-2xl mx-auto lg:px-8 leading-relaxed">
            Experience the future of healthcare with our cutting-edge AI technology that transforms how you access and receive medical care.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.number}
                className="group relative"
                style={{
                  animationDelay: `${benefit.delay}s`
                }}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                {/* Card */}
                <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-[#D98586]/10 hover:border-[#D98586] transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/20">

                  {/* Number Badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D98586] to-rose-300 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {benefit.number}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${benefit.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-black mb-4 transition-all duration-300">
                    {benefit.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-800 transition-colors duration-300">
                    {benefit.description}
                  </p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Sparkle Effect */}
                  {isHovered === index && (
                    <div className="absolute top-4 right-4">
                      <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <Link
            href="/product"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#D98586] text-white rounded-full hover:bg-[#D98586]/90 transition-colors group"
          >
            <span>Experience CareConnect Today</span>
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>
      </div>
    </section>
  );
}