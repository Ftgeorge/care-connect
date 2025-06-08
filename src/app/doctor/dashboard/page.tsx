'use client';

import React from 'react';
import { 
  FaUserFriends, 
  FaCalendarAlt, 
  FaVideo, 
  FaChartLine,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

const stats = [
  {
    name: 'Total Patients',
    value: '1,234',
    change: '+12%',
    trend: 'up',
    icon: FaUserFriends,
    color: 'bg-blue-500'
  },
  {
    name: 'Today\'s Appointments',
    value: '8',
    change: '-2',
    trend: 'down',
    icon: FaCalendarAlt,
    color: 'bg-[#D98586]'
  },
  {
    name: 'Video Consultations',
    value: '24',
    change: '+8%',
    trend: 'up',
    icon: FaVideo,
    color: 'bg-green-500'
  },
  {
    name: 'Patient Satisfaction',
    value: '4.8',
    change: '+0.2',
    trend: 'up',
    icon: FaChartLine,
    color: 'bg-purple-500'
  }
];

const recentActivity = [
  {
    id: 1,
    patient: 'John Doe',
    type: 'Appointment',
    time: '10:00 AM',
    status: 'Completed'
  },
  {
    id: 2,
    patient: 'Jane Smith',
    type: 'Video Consultation',
    time: '11:30 AM',
    status: 'Scheduled'
  },
  {
    id: 3,
    patient: 'Mike Johnson',
    type: 'Medical Record Update',
    time: '1:00 PM',
    status: 'Pending'
  }
];

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                <stat.icon className={`text-xl ${stat.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.trend === 'up' ? (
                <FaArrowUp className="text-green-500" />
              ) : (
                <FaArrowDown className="text-red-500" />
              )}
              <span
                className={`ml-2 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {stat.change}
              </span>
              <span className="ml-2 text-sm text-gray-600">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{activity.patient}</p>
                  <p className="text-sm text-gray-600">{activity.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{activity.time}</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activity.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : activity.status === 'Scheduled'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left">
          <h3 className="font-medium text-gray-900">Schedule New Appointment</h3>
          <p className="mt-1 text-sm text-gray-600">Book a new patient appointment</p>
        </button>
        <button className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left">
          <h3 className="font-medium text-gray-900">Start Video Consultation</h3>
          <p className="mt-1 text-sm text-gray-600">Begin a virtual consultation</p>
        </button>
        <button className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left">
          <h3 className="font-medium text-gray-900">View Patient Records</h3>
          <p className="mt-1 text-sm text-gray-600">Access medical history</p>
        </button>
        <button className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left">
          <h3 className="font-medium text-gray-900">Add Medical Notes</h3>
          <p className="mt-1 text-sm text-gray-600">Update patient information</p>
        </button>
      </div>
    </div>
  );
} 