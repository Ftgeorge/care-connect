'use client';

import React, { useState } from 'react';
import { FaCalendarAlt, FaVideo, FaUser, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

interface Appointment {
  id: string;
  patientName: string;
  type: 'in-person' | 'video';
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  symptoms: string[];
  location?: string;
}

const appointments: Appointment[] = [
  {
    id: '1',
    patientName: 'John Doe',
    type: 'video',
    date: '2024-03-20',
    time: '10:00',
    status: 'scheduled',
    symptoms: ['Fever', 'Cough']
  },
  {
    id: '2',
    patientName: 'Jane Smith',
    type: 'in-person',
    date: '2024-03-20',
    time: '11:30',
    status: 'scheduled',
    symptoms: ['Headache', 'Fatigue'],
    location: 'Room 101'
  },
  {
    id: '3',
    patientName: 'Mike Johnson',
    type: 'video',
    date: '2024-03-20',
    time: '14:00',
    status: 'scheduled',
    symptoms: ['Back Pain']
  }
];

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState('2024-03-20');
  const [view, setView] = useState<'list' | 'calendar'>('list');

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.date === selectedDate
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-lg ${
              view === 'list'
                ? 'bg-[#D98586] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`px-4 py-2 rounded-lg ${
              view === 'calendar'
                ? 'bg-[#D98586] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Calendar View
          </button>
        </div>
      </div>

      {/* Date Selector */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-4">
          <FaCalendarAlt className="text-[#D98586] text-xl" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D98586] focus:border-transparent"
          />
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Appointments for {new Date(selectedDate).toLocaleDateString()}
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-[#D98586] bg-opacity-10">
                    <FaUser className="text-[#D98586] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{appointment.patientName}</h3>
                    <div className="mt-1 space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaClock className="mr-2" />
                        {appointment.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        {appointment.type === 'video' ? (
                          <FaVideo className="mr-2" />
                        ) : (
                          <FaMapMarkerAlt className="mr-2" />
                        )}
                        {appointment.type === 'video' ? 'Video Consultation' : appointment.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      appointment.status === 'scheduled'
                        ? 'bg-blue-100 text-blue-800'
                        : appointment.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {appointment.status}
                  </span>
                  <button className="text-[#D98586] hover:text-[#D98586]/80">
                    View Details
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600">Symptoms:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {appointment.symptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Appointment Button */}
      <button className="fixed bottom-8 right-8 bg-[#D98586] text-white p-4 rounded-full shadow-lg hover:bg-[#D98586]/90 transition-colors">
        <FaCalendarAlt className="text-xl" />
      </button>
    </div>
  );
} 