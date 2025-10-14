import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import type { RSVPData } from '@/types/v2/template';

export async function POST(request: Request) {
  try {
    const body = await request.json() as RSVPData;
    const supabase = await createClient();

    // Validate required fields
    if (!body.invitationId || !body.name || !body.attending) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert RSVP into database
    const { data, error } = await supabase
      .from('rsvps')
      .insert({
        invitation_id: body.invitationId,
        name: body.name,
        email: body.email || null,
        phone: body.phone || null,
        attending: body.attending,
        guest_count: body.guestCount || 1,
        meal_preference: body.mealPreference || null,
        message: body.message || null,
      } as any)
      .select()
      .single();

    if (error) {
      console.error('RSVP insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save RSVP' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('RSVP API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
