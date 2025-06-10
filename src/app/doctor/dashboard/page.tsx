'use client';

import React from 'react';
import { 
  FaUserFriends, 
  FaCalendarAlt, 
  FaVideo, 
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaPlus,
  FaPlay,
  FaEye,
  FaEdit
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
    status: 'Completed',
    avatar: 'JD'
  },
  {
    id: 2,
    patient: 'Jane Smith',
    type: 'Video Consultation',
    time: '11:30 AM',
    status: 'Scheduled',
    avatar: 'JS'
  },
  {
    id: 3,
    patient: 'Mike Johnson',
    type: 'Medical Record Update',
    time: '1:00 PM',
    status: 'Pending',
    avatar: 'MJ'
  }
];

const quickActions = [
  {
    title: 'Schedule New Appointment',
    description: 'Book a new patient appointment',
    icon: FaPlus,
    color: 'bg-blue-500'
  },
  {
    title: 'Start Video Consultation',
    description: 'Begin a virtual consultation',
    icon: FaPlay,
    color: 'bg-green-500'
  },
  {
    title: 'View Patient Records',
    description: 'Access medical history',
    icon: FaEye,
    color: 'bg-purple-500'
  },
  {
    title: 'Add Medical Notes',
    description: 'Update patient information',
    icon: FaEdit,
    color: 'bg-[#D98586]'
  }
];

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Good morning, Dr. Smith
            </h1>
            <p className="text-gray-600">Here's what's happening with your practice today.</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Today</p>
            <p className="text-lg font-semibold text-gray-900">June 10, 2025</p>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.name}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      {stat.name}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                      {stat.value}
                    </p>
                    
                    <div className="flex items-center">
                      <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        stat.trend === 'up' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {stat.trend === 'up' ? (
                          <FaArrowUp className="mr-1" />
                        ) : (
                          <FaArrowDown className="mr-1" />
                        )}
                        {stat.change}
                      </div>
                      <span className="ml-2 text-xs text-gray-500">vs last month</span>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-2xl ${stat.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                    <stat.icon className={`text-2xl ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
              </div>
              
              {/* Subtle gradient overlay */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${stat.color}`}></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Enhanced Recent Activity */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View All
                  </button>
                </div>
              </div>
              
              <div className="divide-y divide-gray-50">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={activity.id} 
                    className="p-6 hover:bg-gray-50/50 transition-colors duration-200"
                    style={{ animationDelay: `${(index + 4) * 100}ms` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {activity.avatar}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{activity.patient}</p>
                            <p className="text-sm text-gray-600 mt-1">{activity.type}</p>
                          </div>
                          
                          <div className="text-right flex flex-col items-end">
                            <p className="text-sm font-medium text-gray-900 mb-2">{activity.time}</p>
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                activity.status === 'Completed'
                                  ? 'bg-green-100 text-green-700 border border-green-200'
                                  : activity.status === 'Scheduled'
                                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                  : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                              }`}
                            >
                              {activity.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Quick Actions */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <button
                  key={action.title}
                  className="w-full group relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 text-left transform hover:-translate-y-0.5"
                  style={{ animationDelay: `${(index + 7) * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${action.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                      <action.icon className={`text-lg ${action.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {action.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Subtle hover effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${action.color}`}></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}