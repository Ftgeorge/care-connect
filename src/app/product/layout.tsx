'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductNavbar from '@/components/product/ProductNavbar';

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
      <ProductNavbar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
} 