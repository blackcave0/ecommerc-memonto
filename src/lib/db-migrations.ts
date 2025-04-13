import { supabase } from "./supabase";

export async function runMigrations() {
  try {
    // Create the profiles table if it doesn't exist
    const { error: tableError } = await supabase
      .from("profiles")
      .select("id")
      .limit(1);

    // If table doesn't exist, create it
    if (tableError?.message?.includes('relation "profiles" does not exist')) {
      // Execute table creation directly in Supabase dashboard SQL editor
      console.log("Profiles table needs to be created");
    }

    // Check if admin column exists
    const { error: adminColumnError } = await supabase
      .from("profiles")
      .select("is_admin")
      .limit(1);

    // If admin column doesn't exist, run admin migrations
    if (
      adminColumnError?.message?.includes('column "is_admin" does not exist')
    ) {
      console.log("Running admin migrations...");
      await runAdminMigrations();
    }

    return { success: true };
  } catch (error) {
    console.error("Migration error:", error);
    return { success: false, error };
  }
}

async function runAdminMigrations() {
  try {
    // In a browser environment, we can't read files directly
    // So we'll use a simplified approach for admin migrations
    const { error } = await supabase.rpc("execute_sql", {
      sql_query: `
        -- Add is_admin column to profiles table if it doesn't exist
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1
                FROM information_schema.columns
                WHERE table_name = 'profiles'
                AND column_name = 'is_admin'
            ) THEN
                ALTER TABLE public.profiles ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;
            END IF;
        END $$;

        -- Create admin-specific RLS policies
        CREATE POLICY IF NOT EXISTS "Admins can view all profiles"
          ON profiles FOR SELECT
          USING ( auth.uid() IN (SELECT id FROM profiles WHERE is_admin = TRUE) );

        CREATE POLICY IF NOT EXISTS "Admins can update all profiles"
          ON profiles FOR UPDATE
          USING ( auth.uid() IN (SELECT id FROM profiles WHERE is_admin = TRUE) );
      `,
    });

    if (error) {
      throw error;
    }

    console.log("Admin migrations completed successfully");
    return { success: true };
  } catch (error) {
    console.error("Admin migration error:", error);
    return { success: false, error };
  }
}
