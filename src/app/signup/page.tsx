'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual signup logic
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert(`Attempting to sign up with Email: ${email}`);
    // For dummy purposes, simulate success and redirect to login
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-[#2D3436] mb-6 text-center">Sign Up for CareConnect</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#636e72] mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D98586] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#636e72] mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D98586] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#636e72] mb-1">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D98586] focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#D98586] text-white py-2 px-4 rounded-md hover:bg-[#D98586]/90 transition-colors font-semibold"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-[#636e72] mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#D98586] hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
} 