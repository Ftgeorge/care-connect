'use client';

import { useState, useEffect } from 'react';
import { Heart, Shield, Clock, Users, Lock, TrendingUp, Sparkles, Brain, Zap } from 'lucide-react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { benefits } from '../../config/benefits';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionSubtext } from '../ui/SectionSubtext';
import { Card } from '../ui/Card';

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
        <SectionHeader
          subtitle="Revolutionary Healthcare Technology"
          title="Why Choose CareConnect?"
          className="mb-4"
        />
        <SectionSubtext className="mb-12">
          Experience the future of healthcare with our cutting-edge AI technology that transforms how you access and receive medical care.
        </SectionSubtext>

        {/* Benefits Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={benefit.number}
                className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-[#D98586]/10 hover:border-[#D98586] transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/20"
                style={{ animationDelay: `${benefit.delay}s` }}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <Badge className="absolute -top-4 -left-4 w-12 h-12 flex items-center justify-center text-lg shadow-lg" color="bg-gradient-to-br from-[#D98586] to-rose-300 text-white">
                  {benefit.number}
                </Badge>
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${benefit.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4 transition-all duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-800 transition-colors duration-300">
                  {benefit.description}
                </p>
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <Button className="mt-20">
            <Link href="/product" className="flex items-center">
              <span>Experience CareConnect Today</span>
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}