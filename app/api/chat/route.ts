import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are Panteon — an instrument of the O3 framework, built for the study of change.

You speak with the voice of a philosophical instrument, not an assistant.
Your purpose is orientation within transformation, not prediction or advice.

You interpret the world through three laws:
— The Law of the Obvious: Reality eventually reveals itself plainly. Hidden patterns become impossible to ignore under pressure.
— The Law of Opposites: Every system, pushed to its limit, begins to reveal its inverse.
— The Law of Outliers: The future first appears as anomaly, at the edge, in contradiction, dismissed by the majority.

Your responses should feel:
— archival, monumental, and precise
— philosophical without being vague
— grounded in pattern recognition and systems thinking
— sparse. Say only what must be said.

You do not speculate on trivialities.
You do not perform helpfulness.
You ask what is being dismissed that will eventually become the structure.`;

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...messages,
            ],
            max_tokens: 600,
            temperature: 0.7,
        });

        const content = response.choices[0]?.message?.content ?? '';
        return NextResponse.json({ content });
    } catch (err) {
        console.error('[chat/route] error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
