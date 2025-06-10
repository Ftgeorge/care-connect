'use client';

import React, { useState } from 'react';
import { FaCalendarAlt, FaVideo, FaUser, FaClock, FaMapMarkerAlt, FaTimes, FaDownload, FaPrint } from 'react-icons/fa';

interface Appointment {
  id: string;
  patientName: string;
  type: 'in-person' | 'video';
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  symptoms: string[];
  location?: string;
  patientAge?: number;
  patientId?: string;
  diagnosis?: string;
  treatment?: string;
  notes?: string;
  vitals?: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    weight: string;
  };
}

const appointments: Appointment[] = [
  {
    id: '1',
    patientName: 'John Doe',
    type: 'video',
    date: '2024-03-20',
    time: '10:00',
    status: 'scheduled',
    symptoms: ['Fever', 'Cough'],
    patientAge: 45,
    patientId: 'P001',
    diagnosis: 'Upper Respiratory Infection',
    treatment: 'Rest, fluids, and over-the-counter medications',
    notes: 'Patient reports symptoms started 3 days ago. No known allergies.',
    vitals: {
      bloodPressure: '120/80',
      heartRate: '78 bpm',
      temperature: '100.2°F',
      weight: '180 lbs'
    }
  },
  {
    id: '2',
    patientName: 'Jane Smith',
    type: 'in-person',
    date: '2024-03-20',
    time: '11:30',
    status: 'scheduled',
    symptoms: ['Headache', 'Fatigue'],
    location: 'Room 101',
    patientAge: 32,
    patientId: 'P002',
    diagnosis: 'Tension Headache',
    treatment: 'Stress management, adequate sleep, pain relievers as needed',
    notes: 'Patient works long hours. Recommends stress reduction techniques.',
    vitals: {
      bloodPressure: '115/75',
      heartRate: '72 bpm',
      temperature: '98.6°F',
      weight: '140 lbs'
    }
  },
  {
    id: '3',
    patientName: 'Mike Johnson',
    type: 'video',
    date: '2024-03-20',
    time: '14:00',
    status: 'scheduled',
    symptoms: ['Back Pain'],
    patientAge: 28,
    patientId: 'P003',
    diagnosis: 'Lower Back Strain',
    treatment: 'Physical therapy, anti-inflammatory medication',
    notes: 'Pain started after lifting heavy objects. No radiating pain.',
    vitals: {
      bloodPressure: '118/76',
      heartRate: '68 bpm',
      temperature: '98.4°F',
      weight: '175 lbs'
    }
  }
];

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState('2024-03-20');
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.date === selectedDate
  );

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  const handleDownload = () => {
    // Simulate PDF download
    alert('PDF report downloaded!');
  };

  const handlePrint = () => {
    window.print();
  };

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
                  <button 
                    onClick={() => handleViewDetails(appointment)}
                    className="text-[#D98586] hover:text-[#D98586]/80 font-medium"
                  >
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

      {/* Modal */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Patient Report</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-2 bg-[#D98586] text-white px-4 py-2 rounded-lg hover:bg-[#D98586]/90 transition-colors"
                >
                  <FaDownload className="text-sm" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <FaPrint className="text-sm" />
                  <span>Print</span>
                </button>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>

            {/* Modal Content - PDF-like Report */}
            <div className="p-8 bg-white">
              {/* Header */}
              <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Report</h1>
                <p className="text-gray-600">Patient Consultation Summary</p>
                <p className="text-sm text-gray-500 mt-2">Generated on {new Date().toLocaleDateString()}</p>
              </div>

              {/* Patient Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Name:</span>
                      <span className="text-gray-900">{selectedAppointment.patientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Patient ID:</span>
                      <span className="text-gray-900">{selectedAppointment.patientId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Age:</span>
                      <span className="text-gray-900">{selectedAppointment.patientAge} years</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Date:</span>
                      <span className="text-gray-900">{new Date(selectedAppointment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Time:</span>
                      <span className="text-gray-900">{selectedAppointment.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Type:</span>
                      <span className="text-gray-900 capitalize">{selectedAppointment.type}</span>
                    </div>
                    {selectedAppointment.location && (
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Location:</span>
                        <span className="text-gray-900">{selectedAppointment.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Vital Signs */}
              {selectedAppointment.vitals && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Vital Signs</h3>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Blood Pressure</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedAppointment.vitals.bloodPressure}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Heart Rate</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedAppointment.vitals.heartRate}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Temperature</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedAppointment.vitals.temperature}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Weight</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedAppointment.vitals.weight}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Symptoms */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Reported Symptoms</h3>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <div className="flex flex-wrap gap-3">
                    {selectedAppointment.symptoms.map((symptom, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded-full font-medium"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Diagnosis & Treatment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Diagnosis</h3>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <p className="text-gray-900">{selectedAppointment.diagnosis}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Treatment Plan</h3>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <p className="text-gray-900">{selectedAppointment.treatment}</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinical Notes</h3>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#D98586]">
                  <p className="text-gray-900 leading-relaxed">{selectedAppointment.notes}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t-2 border-gray-200 pt-6 text-center text-sm text-gray-500">
                <p>This report is confidential and intended for medical professionals only.</p>
                <p className="mt-2">Generated by HealthCare Management System</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}