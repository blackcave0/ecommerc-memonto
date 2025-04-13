'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/home/Header';
import { UserProfile } from '@/types/auth';
import OrderHistory from '@/components/profile/OrderHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, ShoppingBag, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const { user, profile, updateProfile, error, isLoading } = useAuth();
  const [pageLoading, setPageLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    full_name: '',
    email: '',
    address: '',
    phone_number: '',
    pincode: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [debugMode, setDebugMode] = useState(false);

  // Handle profile data loading
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        email: profile.email || '',
        address: profile.address || '',
        phone_number: profile.phone_number || '',
        pincode: profile.pincode || '',
      });
      // Profile data is loaded, set page as loaded
      setPageLoading(false);
    } else if (!isLoading) {
      // If auth is not loading but we don't have a profile, still mark page as loaded
      setPageLoading(false);
    }
  }, [profile, isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      if (!user?.id || !user?.email) {
        throw new Error('User not authenticated or missing email');
      }

      const profileData = {
        id: user.id,
        email: user.email,
        full_name: formData.full_name?.trim(),
        address: formData.address?.trim(),
        phone_number: formData.phone_number?.trim(),
        pincode: formData.pincode?.trim(),
      };

      console.log('Updating profile with data:', profileData);

      const result = await updateProfile(profileData);

      if (result.success) {
        setSuccessMessage('Profile updated successfully');
        // Reset any existing error state
        if (error) {
          console.log('Cleared previous error');
        }
      } else {
        const errorMsg = result.error || 'Failed to update profile';
        console.error('Profile update failed:', errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err) {
      console.error('Update profile error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setSuccessMessage('');
      alert(errorMessage); // Show error to user
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show a loading indicator if the page is still loading
  if (pageLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mb-4"></div>
        <p className="text-gray-600">Loading your profile data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-3 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-3 sm:py-4 md:py-6 lg:py-8">
      <Header />

      <div className="max-w-4xl mx-auto mt-8 sm:mt-12 md:mt-16 lg:mt-20">
        <h1 className="text-3xl font-medium mb-8">My Account</h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 text-green-600 p-4 rounded-md mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{successMessage}</span>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <div className="flex-1">
            <Tabs defaultValue="profile" className="w-full">
              <div className="flex justify-between items-center">
                <TabsList className="mb-6">
                  <TabsTrigger value="profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Orders
                  </TabsTrigger>
                </TabsList>

                {/* Debug mode toggle (hidden in production) */}
                {process.env.NODE_ENV !== 'production' && (
                  <button
                    onClick={() => setDebugMode(!debugMode)}
                    className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded border border-gray-300"
                  >
                    {debugMode ? 'Hide Debug' : 'Debug'}
                  </button>
                )}
              </div>

              <TabsContent value="profile" className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                          <User className="w-5 h-5" />
                          Personal Information
                        </h3>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            readOnly
                            className={cn(
                              "w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                            )}
                          />
                          <p className="mt-1 text-sm text-gray-500">Your email cannot be changed</p>
                        </div>

                        <div>
                          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            id="full_name"
                            name="full_name"
                            type="text"
                            value={formData.full_name}
                            onChange={handleChange}
                            className={cn(
                              "w-full px-4 py-2 border border-gray-300 rounded-md",
                              "focus:outline-none focus:ring-2 focus:ring-gray-400"
                            )}
                          />
                        </div>

                        <div>
                          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            Phone Number
                          </label>
                          <input
                            id="phone_number"
                            name="phone_number"
                            type="tel"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className={cn(
                              "w-full px-4 py-2 border border-gray-300 rounded-md",
                              "focus:outline-none focus:ring-2 focus:ring-gray-400"
                            )}
                            placeholder="e.g. +1 (555) 123-4567"
                          />
                        </div>
                      </div>

                      {/* Address Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          Address Information
                        </h3>

                        <div>
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                          </label>
                          <input
                            id="address"
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            className={cn(
                              "w-full px-4 py-2 border border-gray-300 rounded-md",
                              "focus:outline-none focus:ring-2 focus:ring-gray-400"
                            )}
                            placeholder="Street address"
                          />
                        </div>

                        <div>
                          <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                            Pincode / ZIP Code
                          </label>
                          <input
                            id="pincode"
                            name="pincode"
                            type="text"
                            value={formData.pincode}
                            onChange={handleChange}
                            className={cn(
                              "w-full px-4 py-2 border border-gray-300 rounded-md",
                              "focus:outline-none focus:ring-2 focus:ring-gray-400"
                            )}
                            placeholder="e.g. 10001"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                          "bg-black text-white py-2 px-6 rounded-md",
                          "hover:bg-gray-800 transition-colors disabled:opacity-70"
                        )}
                      >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>

                    {/* Debug information panel */}
                    {debugMode && (
                      <div className="mt-8 p-4 border border-gray-300 rounded-md bg-gray-50">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Debug Information</h3>
                        <div className="space-y-2 text-xs font-mono">
                          <div>
                            <p className="font-semibold">User ID:</p>
                            <p className="break-all">{user?.id || 'Not logged in'}</p>
                          </div>
                          <div>
                            <p className="font-semibold">User Email:</p>
                            <p>{user?.email || 'Not available'}</p>
                          </div>
                          <div>
                            <p className="font-semibold">Email Verified:</p>
                            <p>{user?.email_confirmed_at ? 'Yes' : 'No'}</p>
                          </div>
                          <div>
                            <p className="font-semibold">Profile Data:</p>
                            <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-40">
                              {JSON.stringify(profile, null, 2)}
                            </pre>
                          </div>
                          <div>
                            <p className="font-semibold">Form Data:</p>
                            <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-40">
                              {JSON.stringify(formData, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="orders">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Order History
                  </h2>
                  {user ? (
                    <OrderHistory userId={user.id} />
                  ) : (
                    <p className="text-gray-500">Please log in to view your orders.</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
