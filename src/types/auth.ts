import { User } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
  address?: string;
  phone_number?: string;
  pincode?: string;
}

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  isEmailVerified: boolean;
  pendingVerification: boolean;
}

export interface AuthContextType extends AuthState {
  signUp: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<boolean>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{
    success: boolean;
    error?: string;
  }>;
  resetPassword: (email: string) => Promise<void>;
}
