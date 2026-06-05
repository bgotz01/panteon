//components/Interface.tsx
'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function Interface() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-scroll to latest message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    // Auto-resize textarea
    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    }, [input]);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || loading) return;

        const userMessage: Message = { role: 'user', content: trimmed };
        const nextMessages = [...messages, userMessage];
        setMessages(nextMessages);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: nextMessages }),
            });

            if (!res.ok) throw new Error('Request failed');

            const data = await res.json();
            setMessages([...nextMessages, { role: 'assistant', content: data.content }]);
        } catch {
            setMessages([
                ...nextMessages,
                {
                    role: 'assistant',
                    content: 'The instrument is silent. The signal did not return.',
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as unknown as FormEvent);
        }
    }

    return (
        <section className="border border-[#b1844f]/25 bg-[#0f0e0c]/80">
            {/* header */}
            <div className="flex items-center justify-between border-b border-[#b1844f]/20 px-7 py-4">
                <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-[#a4774c]">
                    Panteon Interface
                </div>
                <div className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.2em] text-[#d6b274]/50">
                    O3
                </div>
            </div>

            {/* message history */}
            <div className="relative min-h-[280px] max-h-[420px] overflow-y-auto px-7 py-6 scrollbar-none">
                {messages.length === 0 && !loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="font-[family-name:var(--font-cormorant)] text-lg italic leading-8 text-[#81745e] text-center max-w-sm">
                            The future is already here.<br />

                        </p>
                    </div>
                )}

                <div className="space-y-6">
                    {messages.map((msg, i) => (
                        <div key={i} className={msg.role === 'user' ? 'flex justify-end' : ''}>
                            {msg.role === 'assistant' && (
                                <div className="mb-2 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] text-[#a4774c]">
                                    Panteon
                                </div>
                            )}
                            <div
                                className={
                                    msg.role === 'user'
                                        ? 'inline-block max-w-[75%] border border-[#b1844f]/20 bg-[#100f0d] px-5 py-3 font-[family-name:var(--font-cormorant)] text-base leading-7 text-[#b9ad94]'
                                        : 'max-w-[90%] font-[family-name:var(--font-cormorant)] text-lg leading-8 text-[#d7ccb4]'
                                }
                            >
                                {msg.content}
                            </div>
                            {msg.role === 'user' && (
                                <div className="mt-1 text-right font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] text-[#81745e]">
                                    Inquiry
                                </div>
                            )}
                        </div>
                    ))}

                    {loading && (
                        <div>
                            <div className="mb-2 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] text-[#a4774c]">
                                Panteon
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-1 w-1 rounded-full bg-[#d6b274]/40 animate-pulse" style={{ animationDelay: '0ms' }} />
                                <span className="h-1 w-1 rounded-full bg-[#d6b274]/40 animate-pulse" style={{ animationDelay: '200ms' }} />
                                <span className="h-1 w-1 rounded-full bg-[#d6b274]/40 animate-pulse" style={{ animationDelay: '400ms' }} />
                            </div>
                        </div>
                    )}
                </div>

                <div ref={bottomRef} />
            </div>

            {/* input */}
            <form
                onSubmit={handleSubmit}
                className="border-t border-[#b1844f]/20 px-7 py-5"
            >
                <div className="flex items-end gap-4">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="What needs clarifying?"
                        rows={1}
                        disabled={loading}
                        className="min-h-[40px] max-h-[160px] flex-1 resize-none bg-transparent font-[family-name:var(--font-cormorant)] text-lg leading-7 text-[#e9dec4] placeholder-[#81745e]/60 outline-none disabled:opacity-40"
                    />

                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        aria-label="Submit inquiry"
                        className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-[#b1844f]/40 bg-[#100f0d] text-[#d6b274] transition-colors hover:border-[#b1844f]/70 hover:text-[#eadfca] disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        {/* arrow symbol */}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M7 1L7 13M7 1L2 6M7 1L12 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="mt-3 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-[#81745e]/50">
                    Enter to transmit · Shift+Enter for new line
                </div>
            </form>
        </section>
    );
}
