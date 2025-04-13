'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { XCircle } from 'lucide-react';

export default function UnauthorizedPage() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <XCircle className="h-16 w-16 text-red-600" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-center text-gray-900">Access Denied</h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          You do not have permission to access the admin area.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <p className="text-center text-gray-700">
              {user ? (
                <>
                  You are logged in as <span className="font-medium">{user.email}</span>, but your account does not have admin privileges.
                </>
              ) : (
                'Please log in with an admin account to access this area.'
              )}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {user ? (
                <>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Sign Out
                  </button>
                  <Link
                    href="/"
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Return to Website
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/admin/login"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Admin Login
                  </Link>
                  <Link
                    href="/"
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Return to Website
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
