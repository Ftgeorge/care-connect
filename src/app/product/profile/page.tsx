'use client';

import BookingsSection from '@/components/profile/BookingsSection';
import React, { useState, useEffect } from 'react';
import { FaUser, FaHistory, FaCog, FaSignOutAlt, FaEdit, FaBell, FaMoon, FaSun, FaCalendar, FaStethoscope, FaChevronRight, FaEnvelope, FaBirthdayCake, FaToggleOn, FaToggleOff, FaCalendarAlt, FaClock, FaUserMd, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaSpinner, FaAward, FaHeart, FaChartLine, FaSave, FaTimes } from 'react-icons/fa';


export default function ProfileDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    dateOfBirth: '01/15/1990'
  });

  const handleLogout = () => {
    alert('Logging out...');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const recentActivity = [
    { type: 'symptom', title: 'Headache Assessment', date: '2 days ago', icon: FaStethoscope, severity: 'medium' },
    { type: 'consultation', title: 'Dr. Smith Consultation', date: '1 week ago', icon: FaUserMd, severity: 'low' },
    { type: 'symptom', title: 'Fever Check', date: '2 weeks ago', icon: FaStethoscope, severity: 'high' },
  ];

  const healthStats = [
    { label: 'Health Score', value: '85%', icon: FaHeart, color: 'from-rose-400 to-pink-500' },
    { label: 'Consultations', value: '12', icon: FaUserMd, color: 'from-blue-400 to-indigo-500' },
    { label: 'Checkups', value: '8', icon: FaStethoscope, color: 'from-emerald-400 to-green-500' },
    { label: 'Achievements', value: '5', icon: FaAward, color: 'from-amber-400 to-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-white border-3 border-[#D98586] rounded-full flex items-center justify-center mb-6 mx-auto shadow-sm">
              <FaUser className="text-2xl text-[#D98586]" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome back, John</h1>
            <p className="text-gray-600 text-lg">Your health journey continues here</p>
          </div>

          {/* Health Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {healthStats.map((stat, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-[#D98586] transition-colors duration-200">
                <div className="w-12 h-12 border-2 border-[#D98586] rounded-lg flex items-center justify-center mb-4">
                  <stat.icon className="text-[#D98586] text-lg" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Personal Details */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 border-2 border-[#D98586] rounded-lg flex items-center justify-center mr-4">
                    <FaUser className="text-[#D98586] text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Personal Profile</h2>
                    <p className="text-gray-600">Manage your information</p>
                  </div>
                </div>
                <button
                  onClick={handleEditToggle}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium border-2 transition-colors duration-200 ${
                    isEditing 
                      ? 'border-[#D98586] bg-[#D98586] text-white hover:bg-opacity-90' 
                      : 'border-gray-300 text-gray-700 hover:border-[#D98586] hover:text-[#D98586]'
                  }`}
                >
                  {isEditing ? <FaSave className="mr-2" /> : <FaEdit className="mr-2" />}
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="md:col-span-3 space-y-6">
                  
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      {isEditing ? (
                        <input 
                          type="text" 
                          value={userInfo.name}
                          onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D98586] transition-colors"
                          placeholder="Enter your full name"
                        />
                      ) : (
                        <div className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800">
                          {userInfo.name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      {isEditing ? (
                        <input 
                          type="email" 
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D98586] transition-colors"
                          placeholder="Enter your email"
                        />
                      ) : (
                        <div className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800">
                          {userInfo.email}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Date of Birth Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaBirthdayCake className="text-gray-400" />
                      </div>
                      {isEditing ? (
                        <input 
                          type="text" 
                          value={userInfo.dateOfBirth}
                          onChange={(e) => setUserInfo({...userInfo, dateOfBirth: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D98586] transition-colors"
                          placeholder="MM/DD/YYYY"
                        />
                      ) : (
                        <div className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800">
                          {userInfo.dateOfBirth}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Avatar Section */}
                <div className="md:col-span-2 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 border-4 border-[#D98586] rounded-full flex items-center justify-center bg-white">
                      <FaUser className="text-5xl text-[#D98586]" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white border border-gray-200 rounded-full px-3 py-1">
                        <span className="text-sm font-medium text-gray-600">Premium</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Panel */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 border-2 border-[#D98586] rounded-lg flex items-center justify-center mr-4">
                  <FaCog className="text-[#D98586] text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Settings</h2>
                  <p className="text-gray-600">Preferences</p>
                </div>
              </div>

              <div className="space-y-6">
                
                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center mr-3">
                      {darkMode ? <FaMoon className="text-gray-600" /> : <FaSun className="text-gray-600" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Dark Mode</p>
                      <p className="text-sm text-gray-600">Toggle theme</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleDarkMode}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 transition-colors ${
                      darkMode ? 'bg-[#D98586] border-[#D98586]' : 'bg-gray-200 border-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        darkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Notifications Toggle */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center mr-3">
                      <FaBell className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Notifications</p>
                      <p className="text-sm text-gray-600">Health alerts</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleNotifications}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 transition-colors ${
                      notifications ? 'bg-[#D98586] border-[#D98586]' : 'bg-gray-200 border-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Bookings Section */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center mr-3">
                      <FaCalendarAlt className="text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">My Bookings</h3>
                      <p className="text-sm text-gray-600">Recent appointments</p>
                    </div>
                  </div>
                  <BookingsSection />
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full mt-8 px-6 py-4 bg-white border-2 border-[#D98586] text-[#D98586] rounded-lg hover:bg-[#D98586] hover:text-white transition-all duration-200 font-medium flex items-center justify-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-3 bg-white border border-gray-200 rounded-lg p-8">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 border-2 border-[#D98586] rounded-lg flex items-center justify-center mr-4">
                  <FaHistory className="text-[#D98586] text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
                  <p className="text-gray-600">Your health timeline</p>
                </div>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:border-[#D98586] transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center mr-4">
                        <activity.icon className="text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`px-3 py-1 rounded border text-xs font-medium ${
                        activity.severity === 'high' ? 'border-red-300 bg-red-50 text-red-700' :
                        activity.severity === 'medium' ? 'border-yellow-300 bg-yellow-50 text-yellow-700' :
                        'border-green-300 bg-green-50 text-green-700'
                      }`}>
                        {activity.severity}
                      </div>
                      <FaChevronRight className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}