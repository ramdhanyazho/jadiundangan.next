import { NextResponse } from 'next/server';

import { invitationStore } from '@/lib/invitationStore';

export async function POST(request: Request) {
  let payload: {
    name?: string;
    presence?: boolean;
    comment?: string | null;
  };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { data: null, error: ['Invalid JSON payload.'] },
      { status: 400 },
    );
  }

  const name = payload.name?.trim();
  const comment = payload.comment?.trim() ?? null;
  const presence = payload.presence ?? false;

  if (!name) {
    return NextResponse.json(
      { data: null, error: ['Name is required.'] },
      { status: 400 },
    );
  }

  if (!comment) {
    return NextResponse.json(
      { data: null, error: ['Comment is required.'] },
      { status: 400 },
    );
  }

  const data = invitationStore.create({ name, presence, comment });

  return NextResponse.json(
    {
      data,
      error: null,
    },
    { status: 201 },
  );
}
