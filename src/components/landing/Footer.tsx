'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const footerLinks = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press', href: '/press' },
  ],
  services: [
    { name: 'AI Symptom Analysis', href: '/services/ai-analysis' },
    { name: 'Doctor Consultation', href: '/services/consultation' },
    { name: 'Health Monitoring', href: '/services/monitoring' },
    { name: 'Emergency Support', href: '/services/emergency' },
  ],
  resources: [
    { name: 'Help Center', href: '/help' },
    { name: 'Health Library', href: '/library' },
    { name: 'API Documentation', href: '/docs' },
    { name: 'Community', href: '/community' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Use', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'HIPAA Compliance', href: '/hipaa' },
  ],
};

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.95-2.448-2.337 0-1.297.95-2.448 2.448-2.448 1.297 0 2.337.95 2.337 2.448-.001 1.297-.95 2.337-2.337 2.337zm7.119 0c-1.297 0-2.448-.95-2.448-2.337 0-1.297.95-2.448 2.448-2.448 1.297 0 2.337.95 2.337 2.448 0 1.297-.95 2.337-2.337 2.337z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: any) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-white text-white relative overflow-hidden">
      <div className="container mx-auto px-4 xl:px-20 2xl:px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="mb-6">
              <div className="mb-4 sm:mb-6">
                <Link href="/" className="flex items-center space-x-3 group">
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                    <Image
                      src="/logo.png"
                      alt="CareConnect Logo"
                      fill
                      className="object-contain transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                      CareConnect
                    </h1>
                    <p className="text-xs text-gray-500 font-medium">Your Health, Our Priority</p>
                  </div>
                </Link>
              </div>

              <p className="text-gray-600 text-sm sm:text-base lg:text-lg xl:text-sm 2xl:text-lg leading-relaxed mb-4 sm:mb-6">
                Revolutionizing healthcare with AI-powered assistance. Your trusted partner for health insights and medical guidance, available whenever you need it.
              </p>

              {/* Social Links */}
              <div>
                <div className="flex space-x-3 sm:space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 sm:w-10 sm:h-10 border border-[#D98586] rounded-lg flex items-center justify-center text-[#D98586] hover:text-white hover:bg-[#D98586] transition-all duration-200"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Links Sections - Responsive Grid */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8">
            {/* Company Links */}
            <motion.div variants={itemVariants} className="col-span-1">
              <h3 className="font-bold text-sm sm:text-base lg:text-lg xl:text-sm 2xl:text-lg mb-3 sm:mb-4 lg:mb-6 text-gray-900">Company</h3>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-gray-600 hover:text-[#D98586] transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services Links */}
            <motion.div variants={itemVariants} className="col-span-1">
              <h3 className="font-bold text-sm sm:text-base lg:text-lg xl:text-sm 2xl:text-lg mb-3 sm:mb-4 lg:mb-6 text-gray-900">Services</h3>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-gray-600 hover:text-[#D98586] transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources Links */}
            <motion.div variants={itemVariants} className="col-span-1">
              <h3 className="font-bold text-sm sm:text-base lg:text-lg xl:text-sm 2xl:text-lg mb-3 sm:mb-4 lg:mb-6 text-gray-900">Resources</h3>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-gray-600 hover:text-[#D98586] transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Links */}
            <motion.div variants={itemVariants} className="col-span-1">
              <h3 className="font-bold text-sm sm:text-base lg:text-lg xl:text-sm 2xl:text-lg mb-3 sm:mb-4 lg:mb-6 text-gray-900">Legal</h3>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-gray-600 hover:text-[#D98586] transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 lg:pt-12 border-t border-gray-300"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
            {[
              { number: '1M+', label: 'Users Helped' },
              { number: '24/7', label: 'Available Support' },
              { number: '50K+', label: 'Consultations' },
              { number: '99.9%', label: 'Uptime' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-xl sm:text-2xl lg:text-3xl xl:text-2xl 2xl:text-3xl font-bold text-[#D98586] mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-xs sm:text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-6 sm:pt-8 border-t border-gray-300"
        >
          {/* Medical Disclaimer */}
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-red-400 mb-2 text-sm sm:text-base">Important Medical Disclaimer</h4>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                  CareConnect is not a substitute for emergency medical care or professional medical advice.
                  If you have a serious medical condition or emergency, please contact your doctor or call emergency services immediately.
                  Our AI provides preliminary insights only and should not be used for diagnosis or treatment decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Copyright and Status */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 gap-4">
            <p className="text-gray-600 text-xs sm:text-sm">
              © {new Date().getFullYear()} CareConnect. All rights reserved. Made for better healthcare.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-600">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
                <span>System Operational</span>
              </span>
              <span className="text-gray-500">v2024.1.0</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}