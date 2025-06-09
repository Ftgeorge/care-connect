'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BookingsSection from '@/components/profile/BookingsSection';
import { FaUser, FaHistory, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'bookings', label: 'Bookings', icon: FaHistory },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-200">
            <div className="px-6 py-4">
              <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            </div>
          </div>

          {/* Content */}
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-200">
              <nav className="p-4 space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="text-lg" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                  <FaSignOutAlt className="text-lg" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
                  {/* Add profile content here */}
                </div>
              )}

              {activeTab === 'bookings' && <BookingsSection />}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Settings</h2>
                  {/* Add settings content here */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 