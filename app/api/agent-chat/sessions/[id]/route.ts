import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/agent-chat/sessions/:id/messages — append a user+assistant message pair
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { userContent, assistantContent } = await req.json();

    await prisma.agentChatMessage.createMany({
        data: [
            { chatId: id, role: 'user', content: userContent },
            { chatId: id, role: 'assistant', content: assistantContent },
        ],
    });

    // Touch updatedAt
    await prisma.agentChat.update({ where: { id }, data: {} });

    return NextResponse.json({ ok: true });
}

// DELETE /api/agent-chat/sessions/:id
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await prisma.agentChat.delete({ where: { id } });
    return NextResponse.json({ ok: true });
}
