'use client';

import { useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamically import the Sidebar with no SSR to improve initial load
const Sidebar = dynamic(() => import('@/components/product/Sidebar'), {
  ssr: false,
  loading: () => (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 animate-pulse" />
  ),
});

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // Check if user is authenticated
  useEffect(() => {
    // TODO: Implement proper authentication check
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Sidebar />
      <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="ml-64 p-8"
      >
        <Suspense fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D98586]" />
          </div>
        }>
          {children}
        </Suspense>
      </motion.main>
    </div>
  );
} 