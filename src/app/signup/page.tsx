'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/home/Header';
import VerificationPopup from '@/components/auth/VerificationPopup';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const { signUp, error, user, isLoading, isEmailVerified } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for verification parameter and pending verification email
  useEffect(() => {
    const verification = searchParams.get('verification');
    const pendingEmail = typeof window !== 'undefined' ? localStorage.getItem('pendingVerificationEmail') : null;

    if (verification === 'pending' && pendingEmail) {
      setRegisteredEmail(pendingEmail);
      setShowVerificationPopup(true);
    }
  }, [searchParams]);

  // Redirect if user is already logged in and verified
  useEffect(() => {
    if (user && !isLoading && isEmailVerified) {
      router.push('/');
    }
  }, [user, isLoading, isEmailVerified, router]);

  // Debug verification popup
  useEffect(() => {
    console.log('Verification popup state:', { showVerificationPopup, registeredEmail });
  }, [showVerificationPopup, registeredEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await signUp(email, password, fullName);

      if (success) {
        console.log('Signup successful');

        // Store the email for the verification popup
        setRegisteredEmail(email);

        // Always show success message and verification popup for Supabase signup
        setSuccessMessage('Account created! Please check your email to confirm your account.');

        // Show verification popup
        setShowVerificationPopup(true);
        setIsSubmitting(false);

        // Log for debugging
        console.log('Showing verification popup for email:', email);
        console.log('Error message:', error);
      } else {
        // If signup failed but no error was thrown, show a generic error
        setFormError('Failed to create account. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-3 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-3 sm:py-4 md:py-6 lg:py-8">
      <Header />

      <div className="max-w-md mx-auto mt-8 sm:mt-12 md:mt-16 lg:mt-20">
        <h1 className="text-3xl font-medium mb-8 text-center">Create an Account</h1>

        {(error || formError) && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
            <p className="font-medium">Error:</p>
            <p>{formError || error}</p>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 text-green-600 p-4 rounded-md mb-6">
            <p className="font-medium">Success:</p>
            <p>{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-70"
            >
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-black font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Verification Popup */}
      {registeredEmail && (
        <VerificationPopup
          email={registeredEmail}
          isOpen={showVerificationPopup}
          onClose={() => setShowVerificationPopup(false)}
        />
      )}
    </div>
  );
}
