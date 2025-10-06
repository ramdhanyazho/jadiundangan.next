import 'server-only';

import { getServerClient } from '@/lib/supabaseServer';
import type { EventRow, GiftRow, GuestRow, InvitationRow, MediaRow, StoryRow } from '@/types/db';

export type InvitationView = {
  invitation: InvitationRow;
  events: EventRow[];
  media: MediaRow[];
  stories: StoryRow[];
  gift: GiftRow | null;
  guests: GuestRow[];
};

export async function getInvitationView(slug: string): Promise<InvitationView | null> {
  const client = getServerClient();

  const { data: invitation, error } = await client.from('invitations').select('*').eq('slug', slug).maybeSingle();

  if (error) {
    console.error('Failed to load invitation', error);
    return null;
  }

  if (!invitation) {
    return null;
  }

  const [{ data: events }, { data: media }, { data: stories }, { data: gifts }, { data: guests }] = await Promise.all([
    client.from('events').select('*').eq('invitation_id', invitation.id).order('date', { ascending: true }),
    client
      .from('media')
      .select('*')
      .eq('invitation_id', invitation.id)
      .order('sort_index', { ascending: true }),
    client
      .from('stories')
      .select('*')
      .eq('invitation_id', invitation.id)
      .order('sort_index', { ascending: true }),
    client.from('gifts').select('*').eq('invitation_id', invitation.id).limit(1),
    client
      .from('guests')
      .select('*')
      .eq('invitation_id', invitation.id)
      .order('created_at', { ascending: false })
      .limit(20),
  ]);

  return {
    invitation,
    events: events ?? [],
    media: media ?? [],
    stories: stories ?? [],
    gift: gifts?.[0] ?? null,
    guests: guests ?? [],
  };
}
