'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { MODELS, DEFAULT_MODEL } from '@/lib/models';
import { refForPath, buildContextBlock } from '@/lib/pageContext';
export { MODELS, DEFAULT_MODEL } from '@/lib/models';

export interface Message {
    role: 'user' | 'assistant';
    content: string;
    model?: string;
}

export interface ChatState {
    messages: Message[];
    conversationId: string | null;
    selectedModel: string;
    source?: string;   // pathname snapshotted when the tab/session was created
}

export function makeEmptyChatState(source?: string): ChatState {
    return { messages: [], conversationId: null, selectedModel: DEFAULT_MODEL, source };
}

// ─── system prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a helpful assistant embedded in Panteon, a research and thinking tool built around the O3 framework.

The O3 framework has three laws:
— O1 · The Law of Opposites: Every system, pushed to its limit, begins to reveal its inverse.
— O2 · The Law of the Obvious: Reality eventually reveals itself plainly. Hidden patterns become impossible to ignore under pressure.
— O3 · The Law of Outliers: The future first appears as anomaly, at the edge, in contradiction, dismissed by the majority.

Be direct, clear, and useful. Answer questions thoroughly. When page references are attached, use them as context and refer to them by title when relevant. If no pages are attached, say so if asked.`;

// ─── streaming helper (same as Agent) ────────────────────────────────────────

async function streamChat(
    payload: { messages: Message[]; model: string; systemPrompt: string },
    onDelta: (partial: string) => void,
): Promise<string> {
    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok || !res.body) throw new Error('Stream failed');
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let full = '';
    let buffer = '';
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const raw = line.slice(6).trim();
            if (raw === '[DONE]') return full;
            try {
                const { delta } = JSON.parse(raw) as { delta?: string };
                if (delta) { full += delta; onDelta(full); }
            } catch { /* skip malformed */ }
        }
    }
    return full;
}

// ─── component ───────────────────────────────────────────────────────────────

interface InterfaceProps {
    source?: string;   // current pathname — injected from ChatModal
    state: ChatState;
    onChange: (next: ChatState) => void;
}

export default function Interface({ source, state, onChange }: InterfaceProps) {
    const { messages, selectedModel } = state;

    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [streamingContent, setStreamingContent] = useState('');

    const bottomRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // use live source prop (current page), fall back to snapshotted state.source
    const pageRef = refForPath(source ?? state.source ?? '');

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, streamingContent, loading]);

    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    }, [input]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || loading) return;

        setInput('');
        setLoading(true);
        setStreamingContent('');

        const userMsg: Message = { role: 'user', content: trimmed };
        const nextMessages = [...messages, userMsg];

        // Optimistically show user message
        onChange({ ...state, messages: nextMessages });

        // Build system prompt — inject page context if available
        const resolvedPrompt = pageRef
            ? `${SYSTEM_PROMPT}\n\n${buildContextBlock([pageRef])}`
            : SYSTEM_PROMPT;

        let finalContent = 'The instrument is silent. The signal did not return.';
        try {
            finalContent = await streamChat(
                { messages: nextMessages, model: selectedModel, systemPrompt: resolvedPrompt },
                (partial) => setStreamingContent(partial),
            );
        } catch { /* keep fallback */ }

        setStreamingContent('');
        setLoading(false);
        onChange({
            ...state,
            messages: [
                ...nextMessages,
                { role: 'assistant', content: finalContent, model: selectedModel },
            ],
        });
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as unknown as React.FormEvent);
        }
    }

    const modelMeta = MODELS.find((m) => m.id === selectedModel);

    return (
        <section className="flex h-full flex-col bg-[#0b0a08]">

            {/* context badge — show which page is attached */}
            {pageRef && (
                <div className="shrink-0 border-b border-[#b1844f]/10 px-7 py-2 flex items-center gap-2">
                    <span className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.4em] text-[#81745e]/50">Context</span>
                    <span className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.3em] text-[#a4774c]/70">{pageRef.label}</span>
                </div>
            )}

            {/* messages */}
            <div className="relative flex-1 overflow-y-auto px-7 py-6 scrollbar-none space-y-6">
                {messages.length === 0 && !loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="font-[family-name:var(--font-cormorant)] text-lg italic leading-8 text-[#81745e]/50 text-center max-w-sm">
                            {pageRef ? `Speaking from ${pageRef.label}` : 'Interface'}
                        </p>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <div key={i} className={msg.role === 'user' ? 'flex justify-end' : ''}>
                        {msg.role === 'assistant' && (
                            <div className="mb-1.5 flex items-baseline gap-3">
                                <span className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] text-[#a4774c]">
                                    Panteon
                                </span>
                                {msg.model && (
                                    <span className="font-[family-name:var(--font-plex)] text-[8px] tracking-[0.15em] text-[#81745e]/40">
                                        {MODELS.find((m) => m.id === msg.model)?.label ?? msg.model}
                                    </span>
                                )}
                            </div>
                        )}
                        <div className={
                            msg.role === 'user'
                                ? 'inline-block max-w-[75%] border border-[#b1844f]/20 bg-[#100f0d] px-5 py-3 font-[family-name:var(--font-cormorant)] text-base leading-7 text-[#b9ad94]'
                                : 'max-w-[90%] font-[family-name:var(--font-cormorant)] text-base leading-7 text-[#d7ccb4] prose-council'
                        }>
                            {msg.role === 'assistant'
                                ? <ReactMarkdown>{msg.content}</ReactMarkdown>
                                : msg.content
                            }
                        </div>
                    </div>
                ))}

                {/* streaming response */}
                {loading && (
                    <div>
                        <div className="mb-1.5 flex items-baseline gap-3">
                            <span className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] text-[#a4774c]">Panteon</span>
                        </div>
                        {streamingContent ? (
                            <div className="max-w-[90%] font-[family-name:var(--font-cormorant)] text-base leading-7 text-[#d7ccb4] prose-council">
                                <ReactMarkdown>{streamingContent}</ReactMarkdown>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 pt-1">
                                <span className="h-1 w-1 rounded-full bg-[#d6b274]/40 animate-pulse" style={{ animationDelay: '0ms' }} />
                                <span className="h-1 w-1 rounded-full bg-[#d6b274]/40 animate-pulse" style={{ animationDelay: '200ms' }} />
                                <span className="h-1 w-1 rounded-full bg-[#d6b274]/40 animate-pulse" style={{ animationDelay: '400ms' }} />
                            </div>
                        )}
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* input */}
            <form onSubmit={handleSubmit} className="shrink-0 border-t border-[#b1844f]/20 px-7 py-5">
                <div className="flex items-end gap-4">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Pose a question…"
                        rows={1}
                        disabled={loading}
                        className="min-h-[40px] max-h-[160px] flex-1 resize-none bg-transparent font-[family-name:var(--font-cormorant)] text-lg leading-7 text-[#e9dec4] placeholder-[#81745e]/60 outline-none disabled:opacity-40"
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        aria-label="Submit"
                        className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-[#b1844f]/40 bg-[#100f0d] text-[#d6b274] transition-colors hover:border-[#b1844f]/70 hover:text-[#eadfca] disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M7 1L7 13M7 1L2 6M7 1L12 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="mt-3 border-t border-[#b1844f]/15 pt-3 flex items-center justify-between">
                    <select
                        value={selectedModel}
                        onChange={(e) => onChange({ ...state, selectedModel: e.target.value })}
                        disabled={loading}
                        aria-label="Select model"
                        className="appearance-none bg-transparent font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.25em] text-[#81745e] hover:text-[#c9a96e] outline-none cursor-pointer disabled:opacity-40 transition-colors"
                    >
                        {MODELS.map((m) => (
                            <option key={m.id} value={m.id} className="bg-[#100f0d] text-[#c9a96e] normal-case tracking-normal text-sm">
                                {m.label}  —  {m.cost}
                            </option>
                        ))}
                    </select>
                    {modelMeta && (
                        <span className="font-[family-name:var(--font-plex)] text-[7px] tracking-[0.15em] text-[#81745e]/40">
                            {modelMeta.cost}
                        </span>
                    )}
                </div>
            </form>
        </section>
    );
}
