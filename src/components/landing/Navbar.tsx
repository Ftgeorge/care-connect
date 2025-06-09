'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>("");

  const navLinkClasses = `text-sm font-semibold transition-all duration-200 text-[#2D3436] hover:text-[#232323] animated-underline`;

  const buttonClasses = `group inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-[#D98586] text-white hover:bg-[#D98586] hover:scale-105`;

  const navLinks = [
    { name: "Features", href: "features" },
    { name: "How It Works", href: "how-it-works" },
    { name: "Benefits", href: "benefits" },
    { name: "FAQ", href: "faq" },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setCurrentPage(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentPage(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="CareConnect Logo"
                  fill
                  className="object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl font-semibold text-gray-900 truncate">
                  CareConnect
                </h1>
                <p className="text-xs text-gray-500 font-medium">Your Health, Our Priority</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {
              navLinks.map((nav, index) => (
                <button key={index} onClick={() => scrollToSection(nav.href)} className={navLinkClasses}>
                  <span className="flex items-center">
                    {nav.name}
                  </span>
                </button>
              ))
            }
          </div>
          <Link href="/check-symptoms" className={buttonClasses}>
            <span>Get Started</span>
            <svg
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#2D3436] hover:bg-[#FAFAFA] transition-all duration-200"
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-white"
            >
              <div className="flex flex-col space-y-4 py-4">
                <Link
                  href="#features"
                  className={navLinkClasses}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#636e72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Features
                  </span>
                </Link>
                <Link
                  href="#how-it-works"
                  className={navLinkClasses}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#636e72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    How It Works
                  </span>
                </Link>
                <Link
                  href="#benefits"
                  className={navLinkClasses}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#636e72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Benefits
                  </span>
                </Link>
                <Link
                  href="#faq"
                  className={navLinkClasses}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#636e72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    FAQ
                  </span>
                </Link>
                <Link
                  href="/check-symptoms"
                  className={`${buttonClasses} w-full text-center`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Get Started</span>
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <style jsx global>{`
        .animated-underline {
          position: relative;
          display: inline-block;
        }

        .animated-underline::after {
          content: "";
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: #D98586;
          transition: width 0.3s ease-in-out;
        }

        .animated-underline:hover::after {
          width: 100%;
        }
      `}</style>
      </div>
    </motion.nav>
  );
} 