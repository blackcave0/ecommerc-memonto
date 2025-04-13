import { supabase } from "./supabase";
import { UserProfile } from "@/types/auth";

export async function updateUserProfile(data: Partial<UserProfile>) {
  try {
    if (!data.id || !data.email) {
      throw new Error("User ID and email are required");
    }

    // Prepare profile data
    const profileData = {
      id: data.id,
      email: data.email,
      full_name: data.full_name || null,
      address: data.address || null,
      phone_number: data.phone_number || null,
      pincode: data.pincode || null,
      updated_at: new Date().toISOString(),
    };

    // Try to update first
    const { error: updateError } = await supabase
      .from("profiles")
      .upsert(profileData, {
        onConflict: "id",
      });

    if (updateError) {
      console.error("Profile update error:", updateError);
      throw updateError;
    }

    return { success: true };
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update profile",
    };
  }
}
