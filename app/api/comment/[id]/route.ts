import { NextResponse } from 'next/server';

import { invitationStore } from '@/lib/invitationStore';

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const result = invitationStore.addLike(params.id);

  if (!result) {
    return NextResponse.json(
      { data: null, error: ['Comment not found.'] },
      { status: 404 },
    );
  }

  return NextResponse.json(
    { data: result, error: null },
    { status: 201 },
  );
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const status = invitationStore.removeLike(params.id);

  return NextResponse.json(
    { data: { status }, error: null },
    { status: status ? 200 : 404 },
  );
}

export async function DELETE() {
  return NextResponse.json(
    { data: { status: false }, error: null },
    { status: 200 },
  );
}

export async function PUT() {
  return NextResponse.json(
    { data: { status: false }, error: null },
    { status: 200 },
  );
}
