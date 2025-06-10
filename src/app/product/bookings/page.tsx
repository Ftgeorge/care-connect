'use client';

import BookingsSection from '@/components/profile/BookingsSection';

export default function ProductBookingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-200">
            <div className="px-6 py-4">
              <h1 className="text-2xl font-bold text-gray-800">My Bookings</h1>
              <p className="text-gray-600 mt-1">View and manage your appointments</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <BookingsSection />
          </div>
        </div>
      </div>
    </div>
  );
} 