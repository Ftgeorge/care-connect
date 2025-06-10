'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaUserMd,
  FaCalendarAlt,
  FaVideo,
  FaChartLine,
  FaNotesMedical,
  FaBell,
  FaSignOutAlt,
  FaUserFriends,
  FaFileMedical,
  FaBars,
  FaTimes,
  FaCog,
  FaSearch,
  FaUser,
  FaHome
} from 'react-icons/fa';

const navigation = [
  { name: 'Overview', href: '/doctor/dashboard', icon: FaChartLine, badge: null },
  { name: 'Appointments', href: '/doctor/appointments', icon: FaCalendarAlt, badge: 1 },
  { name: 'Patients', href: '/doctor/patients', icon: FaUserFriends, badge: null },
  { name: 'Medical Records', href: '/doctor/records', icon: FaFileMedical, badge: 0 },
  { name: 'Video Consultations', href: '/doctor/video', icon: FaVideo, badge: 1 },
  { name: 'Reports', href: '/doctor/reports', icon: FaNotesMedical, badge: null },
];

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(1);
  const [userInfo, setUserInfo] = useState({
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    avatar: null
  });
  const pathname = usePathname();

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (sidebarOpen && window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [sidebarOpen]);

  const handleLogout = () => {
    // In a real app, you would handle logout differently without localStorage
    // For now, we'll just redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  const toggleSidebar = (e:any) => {
    e.stopPropagation();
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = (e:any) => {
    e.stopPropagation();
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="px-6 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative w-12 h-12 flex-shrink-0 bg-gradient-to-br from-[#D98586] to-[#c67273] rounded-xl p-2">
                  <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
                    <FaUserMd className="text-[#D98586] text-lg" />
                  </div>
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl font-bold text-gray-900 truncate">
                    CareConnect
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">Doctor Portal</p>
                </div>
              </Link>
              <button
                className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={closeSidebar}
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
          </div>

          {/* Doctor Profile Section */}
          <div className="px-6 py-4 bg-gradient-to-r from-[#D98586]/10 to-[#c67273]/10 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D98586] to-[#c67273] rounded-full flex items-center justify-center">
                <FaUser className="text-white text-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {userInfo.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {userInfo.specialization}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D98586] to-[#c67273] text-white shadow-lg transform scale-[1.02]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon 
                      className={`mr-3 text-lg transition-all duration-200 ${
                        isActive ? 'text-white' : 'text-[#D98586] group-hover:text-[#c67273]'
                      }`} 
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== null && (
                    <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full min-w-[20px] h-5 ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : item.badge > 0 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-gray-200 text-gray-500'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-100 space-y-2">
            <Link
              href="/doctor/settings"
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <FaCog className="mr-3 text-[#D98586]" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
            >
              <FaSignOutAlt className="mr-3 text-red-500" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:pl-0">
        {/* Top header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={toggleSidebar}
              >
                <FaBars className="text-lg" />
              </button>
              
              {/* Breadcrumb */}
              <nav className="hidden sm:flex items-center space-x-2 text-sm">
                <FaHome className="text-gray-400" />
                <span className="text-gray-400">/</span>
                <span className="text-gray-600 font-medium">
                  {navigation.find(item => item.href === pathname)?.name || 'Dashboard'}
                </span>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D98586]/20 focus:border-[#D98586] transition-colors"
                  />
                </div>
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <FaBell className="text-lg" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Profile dropdown trigger */}
              <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-[#D98586] to-[#c67273] rounded-full flex items-center justify-center">
                  <FaUser className="text-white text-sm" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  Dr. Johnson
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}