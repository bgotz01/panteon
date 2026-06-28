import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/conversations — create a new conversation, returns { id }
export async function POST(req: NextRequest) {
    const body = await req.json().catch(() => ({}));
    const conversation = await prisma.conversation.create({
        data: { source: body.source ?? null },
    });
    return NextResponse.json({ id: conversation.id });
}
