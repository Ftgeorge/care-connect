'use client';

import React, { useState, useEffect } from 'react';
import {
  FaUser, FaHistory, FaCog, FaSignOutAlt, FaEdit, FaBell, FaMoon, FaSun,
  FaCalendar, FaStethoscope, FaChevronRight, FaEnvelope, FaBirthdayCake,
  FaToggleOn, FaToggleOff, FaCalendarAlt, FaClock, FaUserMd, FaMapMarkerAlt,
  FaCheckCircle, FaTimesCircle, FaSpinner, FaAward, FaHeart
} from 'react-icons/fa';

interface Booking {
  id: string;
  doctorId: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

function BookingsSection() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      const sampleBookings: Booking[] = [
        {
          id: '1',
          doctorId: 'doc1',
          doctorName: 'Dr. Sarah Johnson',
          specialization: 'Cardiologist',
          date: '2025-06-15',
          time: '10:00 AM',
          status: 'confirmed',
          createdAt: '2025-06-01'
        },
        {
          id: '2',
          doctorId: 'doc2',
          doctorName: 'Dr. Michael Chen',
          specialization: 'Dermatologist',
          date: '2025-06-20',
          time: '2:30 PM',
          status: 'pending',
          createdAt: '2025-06-05'
        }
      ];
      setBookings(sampleBookings);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  const getStatusIcon = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle className="text-emerald-500" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaSpinner className="text-amber-500 animate-spin" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center p-8">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCalendarAlt className="text-indigo-400 text-2xl" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Bookings Yet</h3>
        <p className="text-gray-600">Your appointment history will appear here</p>
      </div>
    );
  }

  return (
     <div className="space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors duration-200"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-600 font-medium text-sm">
                {booking.doctorName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="font-medium text-gray-800 text-sm">{booking.doctorName}</h4>
                <p className="text-xs text-gray-500">{booking.specialization}</p>
              </div>
            </div>
            <div className={`px-2 py-1 rounded border text-xs font-medium flex items-center space-x-1 ${getStatusColor(booking.status)}`}>
              {getStatusIcon(booking.status)}
              <span>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center space-x-2 text-gray-600">
              <FaCalendarAlt className="text-gray-400" />
              <span>{new Date(booking.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <FaClock className="text-gray-400" />
              <span>{booking.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingsSection;
