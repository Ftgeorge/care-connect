'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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
        <div className='w-full flex items-center justify-center'>
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="CareConnect Logo"
              fill
              className="object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-[#2D3436] mb-1 text-center">Sign Up for CareConnect</h1>
        <h2 className='text-base font-normal text-[#2D3436] mb-6 text-center'>Get access to quality healthcare from anywhere</h2>
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
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#636e72] mb-1">Phone Number</label>
            <input
              type="phone"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
        <div className="flex flex-row w-full justify-evenly items-center gap-3 py-6">
          <div className="h-0.5 w-full bg-gray-100" />
          <h1 className="text-gray-400 text-xs">OR</h1>
          <div className="h-0.5 w-full bg-gray-100" />
        </div>
        <div className='w-full flex gap-3 items-center justify-between'>
          <button
            type="submit"
            className="w-full bg-white h-10 flex gap-2 items-center justify-center border py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Image src='/google.png' width={17} height={17} alt='googleImage' />
          </button>
          <button
            type="submit"
            className="w-full bg-white h-10 flex gap-2 items-center justify-center border text-black py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >

            <Image src='/facebook.png' width={28} height={28} alt='googleImage' />
          </button>
        </div>
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