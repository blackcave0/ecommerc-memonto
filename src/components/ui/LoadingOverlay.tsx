'use client';

import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function LoadingOverlay() {
  const { isLoading } = useAuth();
  const [showLoader, setShowLoader] = useState(false);
  const pathname = usePathname();

  // Only show the loader if loading takes more than 300ms
  // This prevents flashing for quick operations
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isLoading) {
      timeout = setTimeout(() => {
        setShowLoader(true);
      }, 300);
    } else {
      setShowLoader(false);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  // Don't show the loader on certain pages that handle their own loading states
  // or during logout operations
  if (pathname === '/login' || pathname === '/signup' || pathname === '/') {
    return null;
  }

  if (!showLoader) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mb-4"></div>
        <p className="text-gray-700">Loading...</p>
      </div>
    </div>
  );
}
