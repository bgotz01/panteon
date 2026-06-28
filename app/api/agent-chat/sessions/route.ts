import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/agent-chat/sessions — list all chats with messages
export async function GET() {
    const chats = await prisma.agentChat.findMany({
        orderBy: { updatedAt: 'desc' },
        include: {
            messages: { orderBy: { createdAt: 'asc' } },
        },
    });
    return NextResponse.json(chats);
}

// POST /api/agent-chat/sessions — create a new chat
export async function POST(req: NextRequest) {
    const { model } = await req.json();
    const chat = await prisma.agentChat.create({
        data: { model },
    });
    return NextResponse.json({ id: chat.id });
}
