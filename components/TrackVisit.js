'use client';
import { useEffect } from 'react';
export default function TrackVisit({ invitationId }){
  useEffect(() => {
    fetch('/api/track-visit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invitation_id: invitationId }) }).catch(()=>{});
  }, [invitationId]);
  return null;
}
