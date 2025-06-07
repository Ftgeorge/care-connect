'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    alert(`Attempting to login with Email: ${email} and Password: ${password}`);
    // For dummy purposes, simulate success and redirect
    localStorage.setItem('isAuthenticated', 'true');
    window.location.href = '/product'; // Redirect to product page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-[#2D3436] mb-6 text-center">Login to CareConnect</h1>
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
          <button
            type="submit"
            className="w-full bg-[#D98586] text-white py-2 px-4 rounded-md hover:bg-[#D98586]/90 transition-colors font-semibold"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-[#636e72] mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-[#D98586] hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
} 