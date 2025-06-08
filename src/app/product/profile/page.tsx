'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaHistory, FaCog, FaSignOutAlt, FaEdit, FaBell, FaMoon, FaSun, FaCalendar, FaStethoscope, FaChevronRight, FaEnvelope, FaBirthdayCake, FaToggleOn, FaToggleOff } from 'react-icons/fa';

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
    { type: 'symptom', title: 'Headache Assessment', date: '2 days ago', icon: FaStethoscope },
    { type: 'consultation', title: 'Dr. Smith Consultation', date: '1 week ago', icon: FaUser },
    { type: 'symptom', title: 'Fever Check', date: '2 weeks ago', icon: FaStethoscope },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#D98586] rounded-full mb-6 shadow-xl">
              <FaUser className="text-2xl text-white" />
            </div>
            <h1 className="text-4xl font-bold text-[#2D3436] mb-4">
              Welcome back, John!
            </h1>
            <p className="text-[#636e72] text-lg">
              Manage your health journey with ease
            </p>
          </motion.div>

          {/* Main Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Personal Details - Larger Card */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#D98586] rounded-xl flex items-center justify-center mr-4">
                    <FaUser className="text-white text-lg" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#2D3436]">Personal Details</h2>
                    <p className="text-[#636e72]">Your profile information</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEditToggle}
                  className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  <FaEdit className="mr-2" />
                  {isEditing ? 'Save' : 'Edit'}
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-gray-100 rounded-2xl">
                    <FaUser className="text-[#636e72] mr-3" />
                    <div>
                      <p className="text-sm text-[#636e72] font-medium">Full Name</p>
                      {isEditing ? (
                        <input 
                          type="text" 
                          value={userInfo.name}
                          onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                          className="bg-transparent border-b border-[#636e72] focus:outline-none focus:border-[#D98586] text-[#2D3436] font-semibold"
                        />
                      ) : (
                        <p className="text-[#2D3436] font-semibold">{userInfo.name}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-100 rounded-2xl">
                    <FaEnvelope className="text-[#636e72] mr-3" />
                    <div>
                      <p className="text-sm text-[#636e72] font-medium">Email Address</p>
                      {isEditing ? (
                        <input 
                          type="email" 
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                          className="bg-transparent border-b border-[#636e72] focus:outline-none focus:border-[#D98586] text-[#2D3436] font-semibold"
                        />
                      ) : (
                        <p className="text-[#2D3436] font-semibold">{userInfo.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-100 rounded-2xl">
                    <FaBirthdayCake className="text-[#636e72] mr-3" />
                    <div>
                      <p className="text-sm text-[#636e72] font-medium">Date of Birth</p>
                      {isEditing ? (
                        <input 
                          type="text" 
                          value={userInfo.dateOfBirth}
                          onChange={(e) => setUserInfo({...userInfo, dateOfBirth: e.target.value})}
                          className="bg-transparent border-b border-[#636e72] focus:outline-none focus:border-[#D98586] text-[#2D3436] font-semibold"
                        />
                      ) : (
                        <p className="text-[#2D3436] font-semibold">{userInfo.dateOfBirth}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center border-8 border-white shadow-lg">
                    <FaUser className="text-6xl text-[#636e72]" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#D98586] rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaStethoscope className="text-white text-xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2D3436] mb-2">12</h3>
                  <p className="text-[#636e72]">Health Checks</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#D98586] rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCalendar className="text-white text-xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2D3436] mb-2">3</h3>
                  <p className="text-[#636e72]">Past Consultations</p>
                </div>
              </div>
            </motion.div>

            {/* History */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#D98586] rounded-xl flex items-center justify-center mr-4">
                  <FaHistory className="text-white text-lg" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#2D3436]">Recent Activity</h2>
                  <p className="text-[#636e72]">Your health journey timeline</p>
                </div>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        activity.type === 'symptom' ? 'bg-gray-100 text-[#636e72]' : 'bg-gray-100 text-[#636e72]'
                      }`}>
                        <activity.icon />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#2D3436]">{activity.title}</h4>
                        <p className="text-sm text-[#636e72]">{activity.date}</p>
                      </div>
                    </div>
                    <FaChevronRight className="text-[#636e72]" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Settings */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#D98586] rounded-xl flex items-center justify-center mr-4">
                  <FaCog className="text-white text-lg" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#2D3436]">Settings</h2>
                  <p className="text-[#636e72]">Customize your experience</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl">
                  <div className="flex items-center">
                    {darkMode ? <FaMoon className="text-[#D98586] mr-3" /> : <FaSun className="text-[#D98586] mr-3" />}
                    <div>
                      <p className="font-semibold text-[#2D3436]">Dark Mode</p>
                      <p className="text-sm text-[#636e72]">Toggle dark theme</p>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleDarkMode}
                    className="text-2xl"
                  >
                    {darkMode ? <FaToggleOn className="text-[#D98586]" /> : <FaToggleOff className="text-[#636e72]" />}
                  </motion.button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl">
                  <div className="flex items-center">
                    <FaBell className="text-[#D98586] mr-3" />
                    <div>
                      <p className="font-semibold text-[#2D3436]">Notifications</p>
                      <p className="text-sm text-[#636e72]">Health reminders</p>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleNotifications}
                    className="text-2xl"
                  >
                    {notifications ? <FaToggleOn className="text-[#D98586]" /> : <FaToggleOff className="text-[#636e72]" />}
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="w-full mt-8 px-6 py-4 bg-[#D98586] text-white rounded-2xl hover:bg-[#D98586]/90 transition-all shadow-lg font-semibold"
                >
                  <FaSignOutAlt className="inline-block mr-2" />
                  Sign Out
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}