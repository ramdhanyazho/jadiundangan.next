import { NextResponse } from 'next/server';

import { invitationStore } from '@/lib/invitationStore';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams;
  const per = Number.parseInt(search.get('per') ?? '10', 10);
  const next = Number.parseInt(search.get('next') ?? '0', 10);

  const safePer = Number.isFinite(per) && per > 0 ? Math.min(per, 50) : 10;
  const safeNext = Number.isFinite(next) && next >= 0 ? next : 0;

  const data = invitationStore.list(safeNext, safePer);

  return NextResponse.json(
    {
      data,
      error: null,
    },
    { status: 200 },
  );
}
