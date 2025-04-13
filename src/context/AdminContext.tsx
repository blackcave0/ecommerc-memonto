'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { isUserAdmin } from '@/services/adminService';

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AdminContextType = {
  isAdmin: false,
  isLoading: true,
  error: null,
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AdminContextType>(initialState);
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (authLoading) return;

      if (!user) {
        setState({
          isAdmin: false,
          isLoading: false,
          error: null,
        });
        return;
      }

      try {
        const admin = await isUserAdmin(user.id);
        setState({
          isAdmin: admin,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error checking admin status:', error);
        setState({
          isAdmin: false,
          isLoading: false,
          error: 'Failed to verify admin status',
        });
      }
    };

    checkAdminStatus();
  }, [user, authLoading]);

  return (
    <AdminContext.Provider value={state}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
