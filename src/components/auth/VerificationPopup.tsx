'use client';

import React, { useState, useEffect } from 'react';
import { X, Mail, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface VerificationPopupProps {
  email: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function VerificationPopup({ email, isOpen, onClose }: VerificationPopupProps): React.ReactNode {
  const [isVerified, setIsVerified] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [checkCount, setCheckCount] = useState(0);
  const router = useRouter();

  // Debug props
  useEffect(() => {
    console.log('VerificationPopup props:', { email, isOpen });

    // Force the popup to be visible in the DOM
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [email, isOpen]);

  // Check verification status periodically
  useEffect(() => {
    if (!isOpen || isVerified) return;

    const checkVerification = async () => {
      if (isChecking || checkCount > 30) return; // Limit to 30 checks (5 minutes)

      setIsChecking(true);

      try {
        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error checking session:', error);
          return;
        }

        // If we have a session, check if email is verified
        if (session && session.user.email_confirmed_at) {
          console.log('Email verified:', session.user.email);
          setIsVerified(true);

          // Clear the pending verification email from localStorage
          localStorage.removeItem('pendingVerificationEmail');

          // Redirect to home page after a short delay
          setTimeout(() => {
            // Force a page reload to update the auth state
            window.location.href = '/';
          }, 2000);
        } else {
          console.log('Email not yet verified');
        }
      } catch (error) {
        console.error('Error checking verification status:', error);
      } finally {
        setIsChecking(false);
        setCheckCount(prev => prev + 1);
      }
    };

    // Check immediately on first render
    checkVerification();

    // Then check every 10 seconds
    const interval = setInterval(checkVerification, 10000);

    return () => clearInterval(interval);
  }, [isOpen, isVerified, isChecking, checkCount, router, onClose]);

  // Handle manual verification check
  const handleCheckVerification = async () => {
    if (isChecking) return;

    setIsChecking(true);

    try {
      // Force refresh the session
      const { error: refreshError } = await supabase.auth.refreshSession();
      if (refreshError) {
        console.error('Error refreshing session:', refreshError);
      }

      // Get current session
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error checking session:', error);
        return;
      }

      // If we have a session and email is confirmed, the user is verified
      if (session && session.user.email_confirmed_at) {
        console.log('Email verified on manual check:', session.user.email);
        setIsVerified(true);

        // Clear the pending verification email from localStorage
        localStorage.removeItem('pendingVerificationEmail');

        // Update auth state to reflect verified status
        try {
          // Force a page reload to update the auth state
          window.location.href = '/';
        } catch (navError) {
          console.error('Navigation error:', navError);
          // Fallback to router if window is not available
          router.push('/');
        }
      } else {
        alert('Your email is not verified yet. Please check your inbox and click the verification link.');
      }
    } catch (error) {
      console.error('Error checking verification status:', error);
    } finally {
      setIsChecking(false);
    }
  };

  // Handle resend verification email
  const handleResendEmail = async () => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });

      if (error) {
        console.error('Error resending verification email:', error);
        alert('Failed to resend verification email. Please try again.');
      } else {
        alert('Verification email has been resent. Please check your inbox.');
      }
    } catch (error) {
      console.error('Error resending verification email:', error);
    }
  };

  // If not open, don't render anything
  if (!isOpen) {
    return null;
  }

  console.log('Rendering VerificationPopup, isOpen:', isOpen);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          {isVerified ? (
            <>
              {/* Verified state */}
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-medium mb-2">Email Verified!</h2>
              <p className="text-gray-600 mb-6">
                Your account has been successfully verified. Redirecting you to the home page...
              </p>
            </>
          ) : (
            <>
              {/* Unverified state */}
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                <Mail className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-2xl font-medium mb-2">Verify Your Email</h2>
              <p className="text-gray-600 mb-6">
                We've sent a verification email to <strong>{email}</strong>.
                Please check your inbox and click the verification link to activate your account.
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleCheckVerification}
                  disabled={isChecking}
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-70"
                >
                  {isChecking ? 'Checking...' : 'I\'ve Verified My Email'}
                </button>

                <button
                  onClick={handleResendEmail}
                  className="w-full bg-white text-black border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Resend Verification Email
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                You can close this popup and verify later. Your verification link will remain valid.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
