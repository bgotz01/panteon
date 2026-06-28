import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/council/turns — save a completed turn with all agent responses
export async function POST(req: NextRequest) {
    const { sessionId, question, order, responses } = await req.json();
    // responses: { agentIndex: number; model: string; content: string }[]

    const turn = await prisma.councilTurn.create({
        data: {
            sessionId,
            question,
            order,
            responses: {
                create: responses.map((r: { agentIndex: number; model: string; content: string }) => ({
                    agentIndex: r.agentIndex,
                    model: r.model,
                    content: r.content,
                })),
            },
        },
        include: { responses: true },
    });
    return NextResponse.json(turn);
}
