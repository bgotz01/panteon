import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
        'X-Title': 'Panteon',
    },
});

const DEFAULT_SYSTEM_PROMPT = `You are a helpful assistant. Be direct, clear, and useful.`;

const DEFAULT_MODEL = 'deepseek/deepseek-v4-flash';

export async function POST(req: NextRequest) {
    try {
        const { messages, model, systemPrompt } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
        }

        const resolvedModel = model ?? DEFAULT_MODEL;
        const resolvedPrompt = (typeof systemPrompt === 'string' && systemPrompt.trim())
            ? systemPrompt.trim()
            : DEFAULT_SYSTEM_PROMPT;

        const stream = await openai.chat.completions.create({
            model: resolvedModel,
            messages: [
                { role: 'system', content: resolvedPrompt },
                ...messages,
            ],
            max_tokens: 800,
            temperature: 0.7,
            stream: true,
        });

        // Pipe the OpenAI stream as SSE to the client
        const readable = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                try {
                    for await (const chunk of stream) {
                        const delta = chunk.choices[0]?.delta?.content;
                        if (delta) {
                            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta })}\n\n`));
                        }
                    }
                    controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                } catch (err) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: String(err) })}\n\n`));
                } finally {
                    controller.close();
                }
            },
        });

        return new Response(readable, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (err) {
        console.error('[chat/route] error:', err);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
