import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH /api/agent-chat/prompts/[id] — rename or update content
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const body = await req.json() as { name?: string; content?: string };
    const data: { name?: string; content?: string } = {};
    if (body.name !== undefined) data.name = body.name.trim();
    if (body.content !== undefined) data.content = body.content.trim();
    const prompt = await prisma.prompt.update({ where: { id }, data });
    return NextResponse.json(prompt);
}

// DELETE /api/agent-chat/prompts/[id]
export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    await prisma.prompt.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
}
