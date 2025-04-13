'use client';

import { useAdmin } from '@/context/AdminContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading: adminLoading } = useAdmin();
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip if still loading
    if (authLoading || adminLoading) return;

    // If user is not logged in, redirect to login
    if (!user) {
      router.push('/admin/login');
      return;
    }

    // If user is logged in but not an admin, redirect to unauthorized page
    if (user && !isAdmin) {
      router.push('/admin/unauthorized');
      return;
    }
  }, [user, isAdmin, authLoading, adminLoading, router, pathname]);

  // Show loading state while checking authentication
  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center z-50 relative">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Only render children if user is an admin
  return isAdmin ? <>{children}</> : null;
}
