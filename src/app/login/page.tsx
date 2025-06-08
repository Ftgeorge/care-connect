'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'user' | 'doctor'>('user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    alert(`Attempting to login as ${userType} with Email: ${email} and Password: ${password}`);
    // For dummy purposes, simulate success and redirect
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userType', userType);
    window.location.href = userType === 'doctor' ? '/doctor/dashboard' : '/product';
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

        <h1 className="text-2xl font-bold text-[#2D3436] mb-1 text-center">Login to CareConnect</h1>
        <h2 className='text-base font-normal text-[#2D3436] mb-6 text-center'>Your health, your time, your Care Connect</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Login as</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setUserType('user')}
                className={`flex-1 py-2 px-4 rounded-lg border ${userType === 'user'
                  ? 'border-[#D98586]/80 text-[#D98586]'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Patient
              </button>
              <button
                type="button"
                onClick={() => setUserType('doctor')}
                className={`flex-1 py-2 px-4 rounded-lg border ${userType === 'doctor'
                  ? 'border-[#D98586]/80 text-[#D98586]'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Doctor
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D98586] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D98586] focus:border-transparent"
              required
            />
          </div>
          <div className='w-full flex items-center justify-end'>
            <h1 className='text-[#D98586] text-sm font-semibold'>Forgot Password?</h1>
          </div>
          <button
            type="submit"
            className="w-full bg-[#D98586] text-white h-10 px-4 rounded-lg hover:bg-[#D98586] transition-colors duration-200"
          >
            Login
          </button>
          <div className="flex flex-row w-full justify-evenly items-center gap-3">
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

        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/signup" className="text-[#D98586] hover:text--[#D98586]">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
} 