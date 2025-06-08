import React, { useState } from 'react';
import { Calendar, Clock, ChevronDown, CheckCircle, User, MapPin, ArrowRight } from 'lucide-react';

interface Doctor {
    id: string;
    name: string;
    specialization: string;
    rating: number;
    distance: number;
    availability: {
        date: string;
        slots: string[];
    }[];
    image: string;
    location: {
        lat: number;
        lng: number;
    };
}

interface BookAppointmentSectionProps {
    selectedDoctor: Doctor;
}

const BookAppointmentSection: React.FC<BookAppointmentSectionProps> = ({ selectedDoctor }) => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedSlot, setSelectedSlot] = useState<string>('');
    const [dateDropdownOpen, setDateDropdownOpen] = useState<boolean>(false);
    const [timeDropdownOpen, setTimeDropdownOpen] = useState<boolean>(false);
    const [isBooking, setIsBooking] = useState<boolean>(false);
    const [isBooked, setIsBooked] = useState<boolean>(false);

    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const getFullDate = (dateStr: string): string => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const availableSlots = selectedDoctor.availability
        .find((date) => date.date === selectedDate)?.slots || [];

    const handleBookAppointment = async (): Promise<void> => {
        setIsBooking(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsBooking(false);
        setIsBooked(true);

        // Reset after 4 seconds
        setTimeout(() => {
            setIsBooked(false);
            setSelectedDate('');
            setSelectedSlot('');
        }, 4000);
    };

    if (isBooked) {
        return (
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 border-2 border-emerald-200">
                <div className="text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <CheckCircle size={40} className="text-emerald-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-800 mb-3">Appointment Confirmed!</h4>
                    <p className="text-gray-600 mb-6 text-lg">
                        Your appointment with {selectedDoctor.name} has been successfully booked for
                    </p>
                    <div className="bg-white rounded-xl p-6 border border-emerald-200 mb-6">
                        <div className="flex items-center justify-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Calendar size={20} className="text-emerald-600" />
                                <span className="font-semibold text-gray-800">{getFullDate(selectedDate)}</span>
                            </div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            <div className="flex items-center space-x-2">
                                <Clock size={20} className="text-emerald-600" />
                                <span className="font-semibold text-gray-800">{selectedSlot}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-emerald-100 rounded-lg p-4 text-emerald-800">
                        <p className="text-sm font-medium">📧 Confirmation details sent to your email</p>
                        <p className="text-sm mt-1">📱 You'll receive a reminder 24 hours before your appointment</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 rounded-2xl p-8 border border-blue-200/50 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h4 className="text-2xl font-bold text-gray-800 flex items-center mb-2">
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                            <Calendar className="text-white" size={20} />
                        </div>
                        Book Appointment
                    </h4>
                    <p className="text-gray-600 ml-14">Schedule your visit with {selectedDoctor.name}</p>
                </div>
                <div className="text-right text-sm text-gray-500 hidden md:block">
                    <div className="flex items-center justify-end text-xs mb-1">
                        <User size={14} className="mr-1" />
                        {selectedDoctor.name}
                    </div>
                    <div className="flex items-center justify-end text-xs">
                        <MapPin size={14} className="mr-1" />
                        {selectedDoctor.specialization}
                    </div>
                </div>
            </div>

            {/* Booking Steps */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div className={`flex items-center space-x-2 ${selectedDate ? 'text-blue-600' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${selectedDate ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                            1
                        </div>
                        <span className="font-medium">Select Date</span>
                    </div>
                    <div className={`flex-1 h-0.5 mx-4 ${selectedDate ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                    <div className={`flex items-center space-x-2 ${selectedSlot ? 'text-blue-600' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${selectedSlot ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                            2
                        </div>
                        <span className="font-medium">Select Time</span>
                    </div>
                    <div className={`flex-1 h-0.5 mx-4 ${selectedSlot ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                    <div className={`flex items-center space-x-2 ${selectedDate && selectedSlot ? 'text-blue-600' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${selectedDate && selectedSlot ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                            3
                        </div>
                        <span className="font-medium">Confirm</span>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {/* Date Selection */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Choose Your Preferred Date
                    </label>
                    <div className="relative">
                        <button
                            onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                            className={`
                w-full p-5 text-left bg-white border-2 rounded-xl shadow-sm transition-all duration-200 
                ${selectedDate ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
                hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              `}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className={`p-3 rounded-lg ${selectedDate ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        {selectedDate ? (
                                            <div>
                                                <div className="font-semibold text-gray-800">{formatDate(selectedDate)}</div>
                                                <div className="text-sm text-gray-500">{getFullDate(selectedDate)}</div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="font-medium text-gray-400">Select a date</div>
                                                <div className="text-sm text-gray-400">Choose from available dates</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <ChevronDown
                                    size={20}
                                    className={`text-gray-400 transition-transform duration-200 ${dateDropdownOpen ? 'rotate-180' : ''}`}
                                />
                            </div>
                        </button>

                        {dateDropdownOpen && (
                            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                                <div className="p-2">
                                    {selectedDoctor.availability.map((dateOption, index) => (
                                        <button
                                            key={dateOption.date}
                                            onClick={() => {
                                                setSelectedDate(dateOption.date);
                                                setDateDropdownOpen(false);
                                                setSelectedSlot('');
                                            }}
                                            className={`
                        w-full text-left px-4 py-4 rounded-lg transition-all duration-150 flex items-center justify-between
                        ${selectedDate === dateOption.date
                                                    ? 'bg-blue-500 text-white'
                                                    : 'hover:bg-gray-50 text-gray-700'
                                                }
                        ${index === 0 ? 'mt-0' : 'mt-1'}
                      `}
                                        >
                                            <div>
                                                <div className="font-medium">{formatDate(dateOption.date)}</div>
                                                <div className={`text-sm ${selectedDate === dateOption.date ? 'text-blue-100' : 'text-gray-500'}`}>
                                                    {getFullDate(dateOption.date)}
                                                </div>
                                            </div>
                                            <div className={`text-sm ${selectedDate === dateOption.date ? 'text-blue-100' : 'text-gray-500'}`}>
                                                {dateOption.slots.length} slots
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Time Selection */}
                <div className={`transition-all duration-300 ${selectedDate ? 'opacity-100' : 'opacity-50'}`}>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Choose Your Preferred Time
                    </label>

                    {selectedDate ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {availableSlots.map((slot) => (
                                <button
                                    key={slot}
                                    onClick={() => setSelectedSlot(slot)}
                                    className={`
                    p-4 text-sm font-medium rounded-xl border-2 transition-all duration-200 flex items-center justify-center space-x-2
                    ${selectedSlot === slot
                                            ? 'border-blue-500 bg-blue-500 text-white shadow-lg'
                                            : 'border-gray-200 bg-white text-gray-700 hover:border-blue-500 hover:bg-blue-50'
                                        }
                  `}
                                >
                                    <Clock size={16} />
                                    <span>{slot}</span>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <Clock size={32} className="text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-400 font-medium">Please select a date first</p>
                        </div>
                    )}
                </div>

                {/* Book Button */}
                <div className="pt-4">
                    <button
                        onClick={handleBookAppointment}
                        disabled={!selectedDate || !selectedSlot || isBooking}
                        className={`
              w-full px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3
              ${!selectedDate || !selectedSlot || isBooking
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg transform hover:scale-[1.02]'
                            }
            `}
                    >
                        {isBooking ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Booking Appointment...</span>
                            </>
                        ) : (
                            <>
                                <Calendar size={20} />
                                <span>Book Appointment</span>
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </div>

                {/* Summary */}
                {selectedDate && selectedSlot && (
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                        <h5 className="font-semibold text-gray-800 mb-2">Appointment Summary</h5>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Doctor:</span>
                                <span className="font-medium">{selectedDoctor.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Date:</span>
                                <span className="font-medium">{getFullDate(selectedDate)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Time:</span>
                                <span className="font-medium">{selectedSlot}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Specialty:</span>
                                <span className="font-medium">{selectedDoctor.specialization}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookAppointmentSection;