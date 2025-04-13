'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isEmailVerified, pendingVerification } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!isLoading && !user && pathname !== '/login' && pathname !== '/signup') {
      router.push('/login');
      return;
    }

    // If user is logged in but email is not verified, show verification popup
    if (!isLoading && user && !isEmailVerified && pendingVerification &&
      pathname !== '/login' && pathname !== '/signup') {
      // Store the email in localStorage for the verification popup
      if (user.email) {
        localStorage.setItem('pendingVerificationEmail', user.email);
      }
      router.push('/signup?verification=pending');
    }
  }, [user, isLoading, isEmailVerified, pendingVerification, router, pathname]);

  // Only show loading spinner for a short time to prevent infinite loading
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the loading spinner after 1.5 seconds
    // This prevents the spinner from showing indefinitely
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1500);

    // If loading completes before the timeout, hide the spinner immediately
    if (!isLoading) {
      setShowLoading(false);
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading && showLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mb-4"></div>
        <p className="text-gray-600">Loading your profile...</p>
      </div>
    );
  }

  return <>{children}</>;
}
