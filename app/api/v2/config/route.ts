import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      data: {
        tz: 'Asia/Jakarta',
        can_reply: false,
        can_edit: false,
        can_delete: false,
        tenor_key: null,
        is_confetti_animation: true,
      },
      error: null,
    },
    { status: 200 },
  );
}
