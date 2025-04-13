'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AuthContextType, AuthState, UserProfile } from '@/types/auth';

const initialState: AuthState = {
  user: null,
  profile: null,
  isLoading: true,
  error: null,
  isEmailVerified: false,
  pendingVerification: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    // Import and run database migrations
    import('@/lib/db-migrations').then(({ runMigrations }) => {
      // Run migrations to ensure database structure is correct
      runMigrations().catch(err => {
        console.error('Error running database migrations:', err);
      });
    });

    const fetchUser = async () => {
      try {
        // Check active session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (!session) {
          // Set isLoading to false immediately if there's no session
          setState({ ...initialState, isLoading: false });
          return;
        }

        // Get user
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (user) {
          // Get profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Error fetching profile:', profileError);
          }

          // Check if email is verified
          const isEmailVerified = user.email_confirmed_at !== null;

          setState({
            user,
            profile: profile as UserProfile || null,
            isLoading: false,
            error: null,
            isEmailVerified,
            pendingVerification: !isEmailVerified,
          });
        }
      } catch (error) {
        console.error('Auth error:', error);
        setState({
          ...initialState,
          isLoading: false,
          error: 'Failed to load user data',
        });
      }
    };

    fetchUser();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session && session.user) {
          // Get profile on auth change
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          // Check if email is verified
          const isEmailVerified = session.user.email_confirmed_at !== null;

          setState({
            user: session.user,
            profile: profile as UserProfile || null,
            isLoading: false,
            error: null,
            isEmailVerified,
            pendingVerification: !isEmailVerified,
          });
        } else {
          setState({
            user: null,
            profile: null,
            isLoading: false,
            error: null,
            isEmailVerified: false,
            pendingVerification: false,
          });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string): Promise<boolean> => {
    try {
      setState({ ...state, isLoading: true, error: null });

      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        console.error('Supabase signup error:', error);
        setState({
          ...state,
          isLoading: false,
          error: error.message || 'Failed to sign up',
        });
        return false;
      }

      // Check if we have a user
      if (!data.user) {
        console.error('No user returned from signup');
        setState({
          ...state,
          isLoading: false,
          error: 'Failed to create account. Please try again.',
        });
        return false;
      }

      // Create profile record
      try {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              email: email,
              full_name: fullName,
              created_at: new Date().toISOString(),
            },
          ]);

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Even if profile creation fails, we still have a user account
          // so we'll consider this a partial success
        }
      } catch (profileError) {
        console.error('Profile creation exception:', profileError);
        // Continue even if profile creation fails
      }

      // Check if email confirmation is required
      if (data.session === null && data.user.confirmation_sent_at) {
        // Email confirmation is required
        setState({
          ...state,
          user: data.user,
          isLoading: false,
          error: 'Please check your email to confirm your account before logging in.',
          isEmailVerified: false,
          pendingVerification: true,
        });
        return true; // Return success to show verification popup
      }

      // Check if email is verified
      const isEmailVerified = data.user.email_confirmed_at !== null;

      // Update state with the new user
      setState({
        ...state,
        user: data.user,
        isLoading: false,
        error: null,
        isEmailVerified,
        pendingVerification: !isEmailVerified,
      });

      return true; // Return success
    } catch (error: any) {
      console.error('Sign up error:', error);
      setState({
        ...state,
        isLoading: false,
        error: error.message || 'Failed to sign up',
      });
      return false; // Return failure
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setState({ ...state, isLoading: true, error: null });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if we have a session and user
      if (data && data.session && data.user) {
        // Check if email is verified
        const isEmailVerified = data.user.email_confirmed_at !== null;

        if (!isEmailVerified) {
          // If email is not verified, show error
          setState({
            ...state,
            user: data.user,
            isLoading: false,
            error: 'Please verify your email before logging in.',
            isEmailVerified: false,
            pendingVerification: true,
          });

          // Store email for verification popup
          if (typeof window !== 'undefined' && data.user.email) {
            localStorage.setItem('pendingVerificationEmail', data.user.email);
          }

          return true; // Return success but with pending verification
        }

        // Email is verified, proceed with login
        setState({
          ...state,
          user: data.user,
          isLoading: false,
          error: null,
          isEmailVerified: true,
          pendingVerification: false,
        });
        return true; // Return success
      } else {
        throw new Error('No session or user returned');
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      setState({
        ...state,
        isLoading: false,
        error: error.message || 'Failed to sign in',
      });
      return false; // Return failure
    }
  };

  const signOut = async (): Promise<boolean> => {
    try {
      // First clear the user data to ensure UI updates immediately
      setState({
        user: null,
        profile: null,
        isLoading: false,
        error: null,
        isEmailVerified: false,
        pendingVerification: false,
      });

      // Then perform the actual signout
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Sign out API error:', error);
        // Even if there's an error, we've already cleared the user state
        // so the UI will show logged out
      }

      return true; // Always return success since we've cleared the user state
    } catch (error: any) {
      console.error('Sign out error:', error);
      // Even if there's an exception, we want to ensure the user appears logged out
      setState({
        user: null,
        profile: null,
        isLoading: false,
        error: null,
        isEmailVerified: false,
        pendingVerification: false,
      });
      return true; // Return success anyway to ensure redirection
    }
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> => {
    try {
      setState({ ...state, isLoading: true, error: null });

      if (!state.user) {
        throw new Error('User not authenticated');
      }

      // Prepare the profile data
      const profileData = {
        id: state.user.id,
        email: state.user.email!,
        full_name: data.full_name || null,
        address: data.address || null,
        phone_number: data.phone_number || null,
        pincode: data.pincode || null,
        updated_at: new Date().toISOString()
      };

      // First try to fetch existing profile
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select()
        .eq('id', state.user.id)
        .single();

      let result;
      if (existingProfile) {
        // Update existing profile
        result = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', state.user.id)
          .select()
          .single();
      } else {
        // Insert new profile
        result = await supabase
          .from('profiles')
          .insert([profileData])
          .select()
          .single();
      }

      if (result.error) {
        throw result.error;
      }

      // Update local state with the new profile data
      setState({
        ...state,
        profile: result.data as UserProfile,
        isLoading: false,
        error: null
      });

      return { success: true };
    } catch (error: any) {
      console.error('Update profile error:', error);
      setState({
        ...state,
        isLoading: false,
        error: error.message || 'Failed to update profile'
      });
      return {
        success: false,
        error: error.message || 'Failed to update profile'
      };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setState({ ...state, isLoading: true, error: null });

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setState({
        ...state,
        isLoading: false,
      });
    } catch (error: any) {
      console.error('Reset password error:', error);
      setState({
        ...state,
        isLoading: false,
        error: error.message || 'Failed to reset password',
      });
    }
  };

  const value = {
    ...state,
    signUp,
    signIn,
    signOut,
    updateProfile,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
