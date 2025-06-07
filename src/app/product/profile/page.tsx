'use client';

import { motion } from 'framer-motion';
import { FaUser, FaHistory, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function ProfileDashboard() {
  const handleLogout = () => {
    // TODO: Implement logout logic
    alert('Logging out...');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#2D3436] mb-4">
            Your Profile & Dashboard
          </h1>
          <p className="text-[#636e72]">
            Manage your information, view history, and adjust settings.
          </p>
        </motion.div>

        {/* Profile Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center text-[#2D3436] mb-4">
              <FaUser className="text-xl mr-3" />
              <h2 className="text-xl font-semibold">Personal Details</h2>
            </div>
            <p className="text-[#636e72] mb-4">Update your personal information.</p>
            {/* TODO: Add form fields for personal details */}
            <div className="bg-gray-100 rounded-lg p-4 text-[#636e72]">
              <p>Name: John Doe</p>
              <p>Email: john.doe@example.com</p>
              <p>Date of Birth: MM/DD/YYYY</p>
            </div>
          </motion.div>

          {/* History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center text-[#2D3436] mb-4">
              <FaHistory className="text-xl mr-3" />
              <h2 className="text-xl font-semibold">History</h2>
            </div>
            <p className="text-[#636e72] mb-4">View your past symptom checks and consultations.</p>
            {/* TODO: Add lists for symptom check history and consultation history */}
            <div className="bg-gray-100 rounded-lg p-4 text-[#636e72]">
              <p className="font-medium mb-2">Recent Activity:</p>
              <ul className="list-disc list-inside">
                <li>Symptom Check (Date)</li>
                <li>Doctor Consultation (Date)</li>
                <li>Symptom Check (Date)</li>
              </ul>
            </div>
          </motion.div>

          {/* Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg col-span-full"
          >
            <div className="flex items-center text-[#2D3436] mb-4">
              <FaCog className="text-xl mr-3" />
              <h2 className="text-xl font-semibold">Settings</h2>
            </div>
            <p className="text-[#636e72] mb-4">Adjust your app preferences.</p>
            {/* TODO: Add settings options (e.g., dark mode toggle, notifications) */}
            <div className="bg-gray-100 rounded-lg p-4 text-[#636e72]">
              <p>Dark Mode: <span className="font-medium">Off</span></p>
              <p>Notifications: <span className="font-medium">Enabled</span></p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-6 px-6 py-3 bg-[#FF6B6B] text-white rounded-lg hover:bg-[#FF6B6B]/90 transition-colors"
            >
              <FaSignOutAlt className="inline-block mr-2" />
              Logout
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
} 