'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  {
    name: 'Symptom Checker',
    path: '/product',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    name: 'Results',
    path: '/product/results',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    name: 'Book Doctor',
    path: '/product/booking',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h6m-6 0l-.5 8.5A2 2 0 0013.5 21h-3A2 2 0 018.5 19L8 7z" />
      </svg>
    ),
  },
  {
    name: 'Profile',
    path: '/product/profile',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

export default function ResponsiveSidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  if (!mounted) return null;

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('isAuthenticated');
      window.location.href = '/login';
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/60">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="CareConnect Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                CareConnect
              </h1>
            </div>
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg text-gray-600 hover:text-[#D98586] hover:bg-gray-50 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white/95 backdrop-blur-sm border-r border-gray-200/60"
          >
            {/* Mobile Logo Section */}
            <div className="px-6 py-6 border-b border-gray-100/80">
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

            {/* Mobile Navigation */}
            <nav className="px-4 py-6 space-y-1 flex-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-[#D98586] bg-[#D98586]/8 shadow-sm'
                        : 'text-gray-700 hover:text-[#D98586] hover:bg-gray-50/80'
                    }`}
                  >
                    <div className="w-5 h-5 flex-shrink-0 mr-3">
                      <span className={`block transition-colors duration-200 ${
                        isActive ? 'text-[#D98586]' : 'text-gray-500 group-hover:text-[#D98586]'
                      }`}>
                        {item.icon}
                      </span>
                    </div>
                    <span className="truncate">{item.name}</span>
                    
                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="ml-auto w-1.5 h-1.5 bg-[#D98586] rounded-full flex-shrink-0"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Logout Button */}
            <div className="p-4 border-t border-gray-100/80 bg-white/90 backdrop-blur-sm">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-3 py-3 text-sm font-medium text-gray-600 hover:text-[#D98586] hover:bg-gray-50/80 rounded-lg transition-all duration-200 group"
              >
                <div className="w-5 h-5 flex-shrink-0 mr-3">
                  <svg className="w-5 h-5 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="hidden lg:block md:w-64 xl:w-72 h-screen bg-white/80 backdrop-blur-sm border-r border-gray-200/60 fixed left-0 top-0 z-40"
      >
        {/* Desktop Logo Section */}
        <div className="px-6 py-8 border-b border-gray-100/80">
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
        <nav className="px-4 py-6 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-[#D98586] bg-[#D98586]/8 shadow-sm'
                    : 'text-gray-700 hover:text-[#D98586] hover:bg-gray-50/80'
                }`}
              >
                <div className="w-5 h-5 flex-shrink-0 mr-3">
                  <span className={`block transition-colors duration-200 ${
                    isActive ? 'text-[#D98586]' : 'text-gray-500 group-hover:text-[#D98586]'
                  }`}>
                    {item.icon}
                  </span>
                </div>
                <span className="truncate">{item.name}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="desktopActiveIndicator"
                    className="ml-auto w-1.5 h-1.5 bg-[#D98586] rounded-full flex-shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100/80 bg-white/90 backdrop-blur-sm">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-[#D98586] hover:bg-gray-50/80 rounded-lg transition-all duration-200 group"
          >
            <div className="w-5 h-5 flex-shrink-0 mr-3">
              <svg className="w-5 h-5 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <span>Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Bottom Navigation for Mobile (Alternative) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-t border-gray-200/60 safe-area-pb">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.slice(0, 4).map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-[#D98586]'
                    : 'text-gray-600 hover:text-[#D98586]'
                }`}
              >
                <div className={`w-5 h-5 mb-1 transition-colors duration-200 ${
                  isActive ? 'text-[#D98586]' : 'text-gray-500'
                }`}>
                  {item.icon}
                </div>
                <span className="text-xs font-medium truncate max-w-[60px]">
                  {item.name.split(' ')[0]}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavActiveIndicator"
                    className="w-1 h-1 bg-[#D98586] rounded-full mt-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}