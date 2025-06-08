'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaHistory, FaCalendarAlt, FaCog, FaEdit, FaSignOutAlt, FaBell, FaMoon, FaSun, FaStethoscope, FaChevronRight, FaEnvelope, FaBirthdayCake, FaToggleOn, FaToggleOff } from 'react-icons/fa';

interface Appointment {
  id: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  type: 'in-person' | 'video';
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface MedicalRecord {
  id: string;
  date: string;
  type: string;
  description: string;
  doctor: string;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // Dummy data - replace with actual data from your backend
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    dateOfBirth: '1990-01-01',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Pollen'],
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1 234 567 891',
    },
  };

  const appointments: Appointment[] = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      specialization: 'General Practitioner',
      date: '2024-03-20',
      time: '10:00',
      type: 'in-person',
      status: 'upcoming',
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialization: 'Cardiologist',
      date: '2024-03-15',
      time: '14:30',
      type: 'video',
      status: 'completed',
    },
  ];

  const medicalRecords: MedicalRecord[] = [
    {
      id: '1',
      date: '2024-02-15',
      type: 'Check-up',
      description: 'Regular health check-up',
      doctor: 'Dr. Sarah Johnson',
    },
    {
      id: '2',
      date: '2024-01-20',
      type: 'Vaccination',
      description: 'Annual flu shot',
      doctor: 'Dr. Michael Chen',
    },
  ];

  const recentActivity = [
    { type: 'symptom', title: 'Headache Assessment', date: '2 days ago', icon: FaStethoscope },
    { type: 'consultation', title: 'Dr. Smith Consultation', date: '1 week ago', icon: FaUser },
    { type: 'symptom', title: 'Fever Check', date: '2 weeks ago', icon: FaStethoscope },
  ];

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logging out...');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
            Welcome back, {user.name.split(' ')[0]}!
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
            className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg"
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
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center px-4 py-2 bg-[#D98586]/10 hover:bg-[#D98586]/20 rounded-xl transition-colors text-[#D98586]"
              >
                <FaEdit className="mr-2" />
                {isEditing ? 'Save' : 'Edit'}
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-[#D98586]/5 rounded-2xl">
                  <FaUser className="text-[#D98586] mr-3" />
                  <div>
                    <p className="text-sm text-[#636e72] font-medium">Full Name</p>
                    <input
                      type="text"
                      value={user.name}
                      disabled={!isEditing}
                      className="bg-transparent border-b border-[#D98586]/30 focus:outline-none focus:border-[#D98586] text-[#2D3436] font-semibold disabled:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center p-4 bg-[#D98586]/5 rounded-2xl">
                  <FaEnvelope className="text-[#D98586] mr-3" />
                  <div>
                    <p className="text-sm text-[#636e72] font-medium">Email Address</p>
                    <input
                      type="email"
                      value={user.email}
                      disabled={!isEditing}
                      className="bg-transparent border-b border-[#D98586]/30 focus:outline-none focus:border-[#D98586] text-[#2D3436] font-semibold disabled:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center p-4 bg-[#D98586]/5 rounded-2xl">
                  <FaBirthdayCake className="text-[#D98586] mr-3" />
                  <div>
                    <p className="text-sm text-[#636e72] font-medium">Date of Birth</p>
                    <input
                      type="date"
                      value={user.dateOfBirth}
                      disabled={!isEditing}
                      className="bg-transparent border-b border-[#D98586]/30 focus:outline-none focus:border-[#D98586] text-[#2D3436] font-semibold disabled:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-48 h-48 bg-[#D98586]/10 rounded-full flex items-center justify-center border-8 border-white shadow-lg">
                  <FaUser className="text-6xl text-[#D98586]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D98586] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaStethoscope className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-[#2D3436] mb-2">12</h3>
                <p className="text-[#636e72]">Health Checks</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D98586] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCalendarAlt className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-[#2D3436] mb-2">3</h3>
                <p className="text-[#636e72]">Past Consultations</p>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg"
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
                  className="flex items-center justify-between p-4 bg-[#D98586]/5 rounded-2xl hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-[#D98586]/10 text-[#D98586]">
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
            className="bg-white rounded-2xl p-8 shadow-lg"
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
              <div className="flex items-center justify-between p-4 bg-[#D98586]/5 rounded-2xl">
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

              <div className="flex items-center justify-between p-4 bg-[#D98586]/5 rounded-2xl">
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
  );
} 