import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/agent-chat/prompts — list all saved prompts
export async function GET() {
    const prompts = await prisma.prompt.findMany({
        orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json(prompts);
}

// POST /api/agent-chat/prompts — create a new prompt
export async function POST(req: NextRequest) {
    const { name, content } = await req.json() as { name: string; content: string };
    if (!name?.trim() || !content?.trim()) {
        return NextResponse.json({ error: 'name and content are required' }, { status: 400 });
    }
    const prompt = await prisma.prompt.create({
        data: { name: name.trim(), content: content.trim() },
    });
    return NextResponse.json(prompt, { status: 201 });
}
