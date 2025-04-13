import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, adminCode } = await request.json();
    
    // Validate admin code - this is a simple implementation
    // In a real app, you would use a more secure approach
    if (adminCode !== process.env.NEXT_PUBLIC_ADMIN_CODE && adminCode !== 'ADMIN123') {
      return NextResponse.json({ 
        error: 'Invalid admin code' 
      }, { status: 403 });
    }
    
    const supabase = createRouteHandlerClient({ cookies });
    
    // Find the user by email
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();
    
    if (userError) {
      return NextResponse.json({ 
        error: 'User not found' 
      }, { status: 404 });
    }
    
    // Update the user to be an admin
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ is_admin: true })
      .eq('id', userData.id);
    
    if (updateError) {
      return NextResponse.json({ 
        error: 'Failed to update user' 
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      data: { success: true } 
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
