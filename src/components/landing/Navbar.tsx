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

  const mobileNavLinkClasses = `flex items-center px-4 py-3 text-base font-medium text-[#2D3436] hover:text-[#232323] hover:bg-[#F8F9FA] rounded-lg transition-all duration-200`;

  const navLinks = [
    { name: "Features", href: "features", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { name: "How It Works", href: "how-it-works", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { name: "Benefits", href: "benefits", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    { name: "FAQ", href: "faq", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"
      >
        <div className="container mx-auto px-4 xl:px-20 2xl:px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="">
              <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
                <div className="relative w-8 h-8 md:w-10 md:h-10 xl:h-8 xl:w-8 2xl:h-8 2xl:w-8 flex-shrink-0">
                  <Image
                    src="/logo.png"
                    alt="CareConnect Logo"
                    fill
                    className="object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg md:text-xl xl:text-base 2xl:text-xl font-semibold text-gray-900 truncate">
                    CareConnect
                  </h1>
                  <p className="text-xs text-gray-500 font-medium hidden sm:block">Your Health, Our Priority</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {
                navLinks.map((nav, index) => (
                  <button key={index} onClick={() => scrollToSection(nav.href)} className={navLinkClasses}>
                    <span className="flex items-center text-sm 2xl:text-base">
                      {nav.name}
                    </span>
                  </button>
                ))
              }
            </div>

            {/* Desktop Get Started Button */}
            <div className="hidden md:block">
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
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#2D3436] hover:bg-[#FAFAFA] transition-all duration-200 relative z-60"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mobile menu"
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="w-6 h-6 flex flex-col justify-center items-center"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 }
                  }}
                  className="w-6 h-0.5 bg-current block absolute transform transition-all duration-300"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  className="w-6 h-0.5 bg-current block absolute transform transition-all duration-300"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 }
                  }}
                  className="w-6 h-0.5 bg-current block absolute transform transition-all duration-300"
                />
              </motion.div>
            </motion.button>
          </div>
        </div>

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
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-8 h-8">
                      <Image
                        src="/logo.png"
                        alt="CareConnect Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">CareConnect</h2>
                      <p className="text-xs text-gray-500">Your Health, Our Priority</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                    aria-label="Close menu"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Mobile Menu Navigation */}
                <div className="flex-1 px-6 py-6 space-y-2">
                  {navLinks.map((nav, index) => (
                    <motion.button
                      key={index}
                      onClick={() => scrollToSection(nav.href)}
                      className={mobileNavLinkClasses}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5 mr-3 text-[#D98586]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={nav.icon} />
                      </svg>
                      {nav.name}
                    </motion.button>
                  ))}
                </div>

                {/* Mobile Get Started Button */}
                <div className="p-6 border-t border-gray-100">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link
                      href="/check-symptoms"
                      className={`${buttonClasses} w-full justify-center`}
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
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}