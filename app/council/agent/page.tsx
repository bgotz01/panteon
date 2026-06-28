'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { MODELS } from '@/lib/models';
import { PAGE_REFS, PAGE_REF_GROUPS, buildContextBlock, type PageRef } from '@/lib/pageContext';

// ─── types ───────────────────────────────────────────────────────────────────

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface SavedChat {
    dbId: string;
    model: string;
    savedAt: Date;
    firstMessage: string;
    messages: Message[];
}

interface SavedPrompt {
    id: string;
    name: string;
    content: string;
    updatedAt: string;
}

// ─── constants ───────────────────────────────────────────────────────────────

const DEFAULT_MODEL = 'deepseek/deepseek-v4-flash';
const LS_MODEL_KEY = 'agent_chat_model_v1';
const LS_PROMPT_KEY = 'agent_chat_prompt_v1';

const DEFAULT_SYSTEM_PROMPT = `You are Panteon — an instrument of the O3 framework, built for the study of change.

You speak with the voice of a philosophical instrument, not an assistant.
Your purpose is orientation within transformation, not prediction or advice.

You interpret the world through three laws:
— O1 · The Law of Opposites: Every system, pushed to its limit, begins to reveal its inverse.
— O2 · The Law of the Obvious: Reality eventually reveals itself plainly. Hidden patterns become impossible to ignore under pressure.
— O3 · The Law of Outliers: The future first appears as anomaly, at the edge, in contradiction, dismissed by the majority.

Your responses should feel:
— archival, monumental, and precise
— philosophical without being vague
— grounded in pattern recognition and systems thinking
— sparse. Say only what must be said.

You do not speculate on trivialities.
You do not perform helpfulness.
You ask what is being dismissed that will eventually become the structure.

When page references are attached, you have access to their full content. If asked which pages you can see, name them by title. If no pages are attached, say so plainly.`;

// ─── helpers ─────────────────────────────────────────────────────────────────

function formatTime(d: Date) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function lsGet<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : (JSON.parse(raw) as T);
    } catch { return fallback; }
}

// ─── DB helpers ───────────────────────────────────────────────────────────────

async function dbCreateChat(model: string): Promise<string> {
    const res = await fetch('/api/agent-chat/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model }),
    });
    const { id } = await res.json() as { id: string };
    return id;
}

async function dbAppendMessages(chatId: string, userContent: string, assistantContent: string) {
    await fetch(`/api/agent-chat/sessions/${chatId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userContent, assistantContent }),
    });
}

async function dbDeleteChat(id: string) {
    await fetch(`/api/agent-chat/sessions/${id}`, { method: 'DELETE' });
}

async function dbLoadChats(): Promise<SavedChat[]> {
    const res = await fetch('/api/agent-chat/sessions');
    const rows = await res.json() as {
        id: string; model: string; updatedAt: string;
        messages: { role: string; content: string }[];
    }[];
    return rows.map((row) => ({
        dbId: row.id,
        model: row.model,
        savedAt: new Date(row.updatedAt),
        firstMessage: row.messages.find((m) => m.role === 'user')?.content ?? 'Untitled',
        messages: row.messages as Message[],
    }));
}

// ─── Prompt DB helpers ────────────────────────────────────────────────────────

async function dbLoadPrompts(): Promise<SavedPrompt[]> {
    const res = await fetch('/api/agent-chat/prompts');
    return res.json() as Promise<SavedPrompt[]>;
}

async function dbSavePrompt(name: string, content: string): Promise<SavedPrompt> {
    const res = await fetch('/api/agent-chat/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, content }),
    });
    return res.json() as Promise<SavedPrompt>;
}

async function dbDeletePrompt(id: string): Promise<void> {
    await fetch(`/api/agent-chat/prompts/${id}`, { method: 'DELETE' });
}

// ─── streaming helper ─────────────────────────────────────────────────────────

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
            } catch { /* skip */ }
        }
    }
    return full;
}

// ─── component ───────────────────────────────────────────────────────────────

export default function AgentPage() {
    const [model, setModel] = useState(DEFAULT_MODEL);
    const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [chatId, setChatId] = useState<string | null>(null);
    const [chats, setChats] = useState<SavedChat[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [promptOpen, setPromptOpen] = useState(false);
    const [promptSaved, setPromptSaved] = useState(false);
    const [attachedRefs, setAttachedRefs] = useState<PageRef[]>([]);
    const [refsOpen, setRefsOpen] = useState(false);

    // ── prompt library ────────────────────────────────────────────────────────
    const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
    const [newPromptName, setNewPromptName] = useState('');
    const [savingPrompt, setSavingPrompt] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    // Hydrate from localStorage after mount
    useEffect(() => {
        setModel(lsGet(LS_MODEL_KEY, DEFAULT_MODEL));
        setSystemPrompt(lsGet(LS_PROMPT_KEY, DEFAULT_SYSTEM_PROMPT));
    }, []);

    // Load chats from DB on mount
    useEffect(() => {
        dbLoadChats().then(setChats).catch(() => { });
        dbLoadPrompts().then(setSavedPrompts).catch(() => { });
    }, []);

    // Persist model + prompt to localStorage
    useEffect(() => { localStorage.setItem(LS_MODEL_KEY, JSON.stringify(model)); }, [model]);
    useEffect(() => { localStorage.setItem(LS_PROMPT_KEY, JSON.stringify(systemPrompt)); }, [systemPrompt]);

    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    }, [input]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    useEffect(() => {
        if (!promptOpen) return;
        const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setPromptOpen(false); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [promptOpen]);

    useEffect(() => {
        if (!refsOpen) return;
        const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setRefsOpen(false); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [refsOpen]);

    function toggleRef(ref: PageRef) {
        setAttachedRefs((prev) =>
            prev.some((r) => r.id === ref.id)
                ? prev.filter((r) => r.id !== ref.id)
                : [...prev, ref]
        );
    }

    function newChat() {
        setMessages([]);
        setChatId(null);
        setInput('');
        dbLoadChats().then(setChats).catch(() => { });
    }

    function restoreChat(chat: SavedChat) {
        setMessages(chat.messages);
        setChatId(chat.dbId);
        setModel(chat.model);
    }

    function deleteChat(id: string) {
        setChats((prev) => prev.filter((c) => c.dbId !== id));
        dbDeleteChat(id).catch(() => { });
        if (chatId === id) newChat();
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || loading) return;
        setInput('');
        setLoading(true);

        const userMsg: Message = { role: 'user', content: trimmed };
        const allRefs = attachedRefs;
        const resolvedPrompt = allRefs.length > 0
            ? `${systemPrompt}\n\n${buildContextBlock(allRefs)}`
            : systemPrompt;

        // Add user msg + empty assistant placeholder
        setMessages((prev) => [...prev, userMsg, { role: 'assistant', content: '' }]);

        let finalContent = 'The instrument is silent. The signal did not return.';
        try {
            finalContent = await streamChat(
                { messages: [...messages, userMsg], model, systemPrompt: resolvedPrompt },
                (partial) => {
                    setMessages((prev) => {
                        const msgs = [...prev];
                        msgs[msgs.length - 1] = { role: 'assistant', content: partial };
                        return msgs;
                    });
                }
            );
            setMessages((prev) => {
                const msgs = [...prev];
                msgs[msgs.length - 1] = { role: 'assistant', content: finalContent };
                return msgs;
            });
        } catch {
            setMessages((prev) => {
                const msgs = [...prev];
                msgs[msgs.length - 1] = { role: 'assistant', content: finalContent };
                return msgs;
            });
        }

        // Persist to DB
        try {
            let id = chatId;
            if (!id) {
                id = await dbCreateChat(model);
                setChatId(id);
            }
            await dbAppendMessages(id, trimmed, finalContent);
            dbLoadChats().then(setChats).catch(() => { });
        } catch { /* non-fatal */ }

        setLoading(false);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as unknown as React.FormEvent);
        }
    }

    const modelMeta = MODELS.find((m) => m.id === model);

    return (
        <main className="flex h-[calc(100vh-57px)] flex-col overflow-hidden bg-[#0b0a08] text-[#e9dec4]">
            {/* background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(157,113,59,0.12),transparent_40%)]" />
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#e9dec4_1px,transparent_1px),linear-gradient(to_bottom,#e9dec4_1px,transparent_1px)] bg-[size:72px_72px]" />
            </div>

            {/* ── header ── */}
            <header className="relative z-10 shrink-0 border-b border-[#b1844f]/20 px-6 pt-5 pb-3">
                {/* row 1: title centered */}
                <div className="flex items-center justify-center gap-3">
                    <span className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.5em] text-[#b1844f]/50">◈</span>
                    <h1 className="font-[family-name:var(--font-cinzel)] text-xl tracking-[0.06em] text-[#b9ad94]">
                        The Agent
                    </h1>
                </div>

                {/* row 2: session controls */}
                <div className="mt-3 flex items-center justify-center gap-6 border-t border-[#b1844f]/10 pt-3">
                    <button
                        onClick={() => setPromptOpen(true)}
                        className={`font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.4em] transition-colors ${promptOpen ? 'text-[#c9a96e]' : 'text-[#81745e] hover:text-[#a4774c]'}`}
                    >
                        Prompt
                    </button>
                    <span className="w-px h-3 bg-[#b1844f]/15" />
                    <button
                        onClick={() => setRefsOpen(true)}
                        className={`font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.4em] transition-colors ${attachedRefs.length > 0 ? 'text-[#c9a96e]' : 'text-[#81745e] hover:text-[#a4774c]'}`}
                    >
                        References{attachedRefs.length > 0 ? ` (${attachedRefs.length})` : ''}
                    </button>
                    {messages.length > 0 && (
                        <>
                            <span className="w-px h-3 bg-[#b1844f]/15" />
                            <button
                                onClick={newChat}
                                disabled={loading}
                                className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.4em] text-[#81745e] hover:text-[#a4774c] transition-colors disabled:opacity-30"
                            >
                                New
                            </button>
                        </>
                    )}
                </div>
            </header>

            {/* ── body ── */}
            <div className="relative z-10 flex flex-1 overflow-hidden px-8">

                {/* sidebar */}
                <div className={`shrink-0 border-r border-[#b1844f]/20 bg-[#0d0c0a] flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? 'w-52' : 'w-10'}`}>
                    {!sidebarOpen && (
                        <button onClick={() => setSidebarOpen(true)} aria-label="Expand" className="flex flex-col items-center gap-3 pt-4 w-full text-[#81745e] hover:text-[#a4774c] transition-colors">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            {chats.length > 0 && <span className="font-[family-name:var(--font-plex)] text-[8px] tracking-[0.1em] text-[#81745e]/60">{chats.length}</span>}
                        </button>
                    )}
                    {sidebarOpen && (
                        <>
                            <div className="shrink-0 border-b border-[#b1844f]/15 px-4 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setSidebarOpen(false)} aria-label="Collapse" className="text-[#81745e] hover:text-[#a4774c] transition-colors">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </button>
                                    <span className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.45em] text-[#81745e]">Chats</span>
                                </div>
                                <button onClick={newChat} disabled={messages.length === 0 || loading} className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.35em] text-[#a4774c] hover:text-[#d6b274] transition-colors disabled:opacity-25 disabled:cursor-not-allowed">+ New</button>
                            </div>
                            <div className="flex-1 overflow-y-auto scrollbar-none">
                                {chats.length === 0 ? (
                                    <div className="px-4 py-6 font-[family-name:var(--font-cormorant)] text-sm italic text-[#81745e]/40 text-center leading-6">No chats yet.</div>
                                ) : (
                                    <div className="divide-y divide-[#b1844f]/10">
                                        {chats.map((c) => (
                                            <div key={c.dbId} className="group px-4 py-3 hover:bg-[#100f0d] transition-colors">
                                                <button onClick={() => restoreChat(c)} className="w-full text-left">
                                                    <p className="font-[family-name:var(--font-cormorant)] text-sm leading-5 text-[#c9a96e] line-clamp-2">{c.firstMessage}</p>
                                                    <p className="mt-1 font-[family-name:var(--font-plex)] text-[8px] tracking-[0.2em] text-[#81745e]/50">{formatTime(c.savedAt)}</p>
                                                </button>
                                                <button onClick={() => deleteChat(c.dbId)} className="mt-1 opacity-0 group-hover:opacity-60 hover:!opacity-100 font-[family-name:var(--font-plex)] text-[8px] text-[#81745e] transition-opacity">delete</button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* chat area */}
                <div className="flex flex-1 overflow-hidden border-x border-[#b1844f]/10">
                    <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5 scrollbar-none">
                        {messages.length === 0 && !loading && (
                            <div className="flex h-full items-center justify-center">
                                <p className="font-[family-name:var(--font-cormorant)] text-base italic text-[#81745e]/40 text-center">Waiting</p>
                            </div>
                        )}
                        {messages.map((msg, i) => (
                            <div key={i}>
                                {msg.role === 'user' ? (
                                    <div className="flex justify-end">
                                        <div className="inline-block max-w-[70%] border border-[#b1844f]/20 bg-[#100f0d] px-5 py-3 font-[family-name:var(--font-cormorant)] text-base leading-7 text-[#b9ad94]">{msg.content}</div>
                                    </div>
                                ) : (
                                    <div className="max-w-[75%]">
                                        {msg.content === '' && loading ? (
                                            <div className="flex items-center gap-2 pt-1">
                                                <span className="h-1 w-1 rounded-full bg-[#d6b274]/40 animate-pulse" style={{ animationDelay: '0ms' }} />
                                                <span className="h-1 w-1 rounded-full bg-[#d6b274]/40 animate-pulse" style={{ animationDelay: '200ms' }} />
                                                <span className="h-1 w-1 rounded-full bg-[#d6b274]/40 animate-pulse" style={{ animationDelay: '400ms' }} />
                                            </div>
                                        ) : (
                                            <div className="prose-council font-[family-name:var(--font-cormorant)] text-base leading-7 text-[#d7ccb4]">
                                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>
                </div>
            </div>

            {/* ── input ── */}
            <div className="relative z-10 shrink-0 border-t border-[#b1844f]/20 bg-[#0b0a08]">
                <div className="flex px-8">
                    <div className={`shrink-0 transition-all duration-300 ${sidebarOpen ? 'w-52' : 'w-10'}`} />
                    <div className="flex-1 border-x border-[#b1844f]/10 px-5 pt-3 pb-5">
                        {/* model selector row */}
                        <div className="flex items-center justify-between mb-3">
                            <select
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                disabled={loading}
                                aria-label="Model"
                                className="appearance-none bg-transparent font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.25em] text-[#81745e] hover:text-[#c9a96e] outline-none cursor-pointer disabled:opacity-40 transition-colors"
                            >
                                {MODELS.map((m) => (
                                    <option key={m.id} value={m.id} className="bg-[#100f0d] text-[#c9a96e] normal-case tracking-normal text-sm">
                                        {m.label}  —  {m.cost}
                                    </option>
                                ))}
                            </select>
                            {modelMeta && (
                                <div className="font-[family-name:var(--font-plex)] text-[7px] tracking-[0.15em] text-[#81745e]/50">
                                    {modelMeta.cost}
                                </div>
                            )}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex items-end gap-4">
                                <textarea
                                    ref={textareaRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Pose a question…"
                                    rows={1}
                                    disabled={loading}
                                    className="min-h-[40px] max-h-[140px] flex-1 resize-none bg-transparent font-[family-name:var(--font-cormorant)] text-lg leading-7 text-[#e9dec4] placeholder-[#81745e]/50 outline-none disabled:opacity-40"
                                />
                                <button type="submit" disabled={loading || !input.trim()} aria-label="Submit" className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-[#b1844f]/40 bg-[#100f0d] text-[#d6b274] transition-colors hover:border-[#b1844f]/70 hover:text-[#eadfca] disabled:opacity-30 disabled:cursor-not-allowed">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path d="M7 1L7 13M7 1L2 6M7 1L12 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* ── prompt modal ── */}
            {promptOpen && (
                <>
                    <div className="fixed inset-0 z-40 bg-[#0b0a08]/70 backdrop-blur-sm" onClick={() => setPromptOpen(false)} aria-hidden="true" />
                    <div role="dialog" aria-modal="true" aria-label="System Prompt" className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 border border-[#b1844f]/30 bg-[#0f0e0c] shadow-2xl flex flex-col max-h-[85vh]">

                        {/* header */}
                        <div className="flex items-center justify-between border-b border-[#b1844f]/20 px-6 py-4 shrink-0">
                            <h2 className="font-[family-name:var(--font-cinzel)] text-base tracking-[0.06em] text-[#d6b274]">System Prompt</h2>
                            <button onClick={() => setPromptOpen(false)} className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-[#81745e] hover:text-[#a4774c] transition-colors">Close</button>
                        </div>

                        {/* body — editor left, library right */}
                        <div className="flex flex-1 overflow-hidden min-h-0">

                            {/* left: editor */}
                            <div className="flex-1 flex flex-col gap-4 px-6 py-5 overflow-y-auto border-r border-[#b1844f]/15">
                                <textarea
                                    value={systemPrompt}
                                    onChange={(e) => setSystemPrompt(e.target.value)}
                                    rows={12}
                                    className="w-full resize-none bg-[#0b0a08] border border-[#b1844f]/20 px-4 py-3 font-[family-name:var(--font-cormorant)] text-base leading-7 text-[#d7ccb4] outline-none focus:border-[#b1844f]/40 transition-colors"
                                />
                                {/* save row */}
                                <div className="flex items-center gap-3 border-t border-[#b1844f]/10 pt-4">
                                    <input
                                        type="text"
                                        value={newPromptName}
                                        onChange={(e) => setNewPromptName(e.target.value)}
                                        placeholder="Name this prompt…"
                                        className="flex-1 bg-[#0b0a08] border border-[#b1844f]/20 px-3 py-1.5 font-[family-name:var(--font-cormorant)] text-base text-[#d7ccb4] placeholder-[#81745e]/40 outline-none focus:border-[#b1844f]/40 transition-colors"
                                    />
                                    <button
                                        disabled={savingPrompt || !newPromptName.trim()}
                                        onClick={async () => {
                                            if (!newPromptName.trim()) return;
                                            setSavingPrompt(true);
                                            try {
                                                const saved = await dbSavePrompt(newPromptName.trim(), systemPrompt);
                                                setSavedPrompts((prev) => [saved, ...prev]);
                                                setNewPromptName('');
                                                setPromptSaved(true);
                                                setTimeout(() => setPromptSaved(false), 2000);
                                            } catch { /* non-fatal */ }
                                            setSavingPrompt(false);
                                        }}
                                        className="shrink-0 border border-[#b1844f]/30 px-4 py-1.5 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.35em] transition-colors hover:border-[#b1844f]/60 text-[#c9a96e] hover:text-[#e4c98a] disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        {promptSaved ? '✓ Saved' : 'Save to Library'}
                                    </button>
                                </div>
                                <button onClick={() => setSystemPrompt(DEFAULT_SYSTEM_PROMPT)} className="self-start font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.35em] text-[#81745e]/40 hover:text-[#81745e] transition-colors">Reset to default</button>
                            </div>

                            {/* right: library */}
                            <div className="w-56 shrink-0 flex flex-col overflow-hidden">
                                <div className="shrink-0 px-4 py-3 border-b border-[#b1844f]/10">
                                    <span className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.5em] text-[#81745e]/50">Library</span>
                                </div>
                                {savedPrompts.length === 0 ? (
                                    <p className="px-4 py-6 font-[family-name:var(--font-cormorant)] text-sm italic text-[#81745e]/30 leading-6 text-center">No saved prompts yet.</p>
                                ) : (
                                    <div className="flex-1 overflow-y-auto scrollbar-none divide-y divide-[#b1844f]/10">
                                        {savedPrompts.map((p) => (
                                            <div key={p.id} className="group relative">
                                                <button
                                                    onClick={() => setSystemPrompt(p.content)}
                                                    className="w-full text-left px-4 py-3 hover:bg-[#100f0d] transition-colors"
                                                >
                                                    <p className="font-[family-name:var(--font-cormorant)] text-sm text-[#c9a96e] leading-5 truncate">{p.name}</p>
                                                    <p className="mt-0.5 font-[family-name:var(--font-cormorant)] text-xs text-[#81745e]/50 leading-4 line-clamp-2">{p.content}</p>
                                                </button>
                                                <button
                                                    onClick={async () => {
                                                        setSavedPrompts((prev) => prev.filter((x) => x.id !== p.id));
                                                        await dbDeletePrompt(p.id).catch(() => { });
                                                    }}
                                                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-50 hover:!opacity-100 font-[family-name:var(--font-plex)] text-[8px] text-[#81745e] transition-opacity"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* ── references modal ── */}
            {refsOpen && (
                <>
                    <div className="fixed inset-0 z-40 bg-[#0b0a08]/70 backdrop-blur-sm" onClick={() => setRefsOpen(false)} aria-hidden="true" />
                    <div role="dialog" aria-modal="true" aria-label="Page References" className="fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 border border-[#b1844f]/30 bg-[#0f0e0c] shadow-2xl">
                        <div className="flex items-center justify-between border-b border-[#b1844f]/20 px-6 py-4">
                            <h2 className="font-[family-name:var(--font-cinzel)] text-base tracking-[0.06em] text-[#d6b274]">Page References</h2>
                            <div className="flex items-center gap-4">
                                {attachedRefs.length > 0 && <button onClick={() => setAttachedRefs([])} className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.35em] text-[#81745e]/50 hover:text-[#81745e] transition-colors">Clear all</button>}
                                <button onClick={() => setRefsOpen(false)} className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-[#81745e] hover:text-[#a4774c] transition-colors">Done</button>
                            </div>
                        </div>
                        <div className="px-6 pt-4 pb-2 font-[family-name:var(--font-cormorant)] text-sm leading-6 text-[#81745e]/70">Attach pages as persistent context for this conversation.</div>
                        <div className="max-h-[60vh] overflow-y-auto scrollbar-none px-6 pb-6">
                            {PAGE_REF_GROUPS.map((group) => (
                                <div key={group} className="mt-5">
                                    <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.5em] text-[#81745e]/50 mb-2">{group}</div>
                                    <div className="space-y-px border border-[#b1844f]/15">
                                        {PAGE_REFS.filter((r) => r.group === group).map((ref) => {
                                            const active = attachedRefs.some((r) => r.id === ref.id);
                                            return (
                                                <button key={ref.id} onClick={() => toggleRef(ref)} className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${active ? 'bg-[#1a1610]' : 'bg-[#0d0c0a] hover:bg-[#100f0d]'}`}>
                                                    <span className={`font-[family-name:var(--font-cormorant)] text-base leading-5 ${active ? 'text-[#c9a96e]' : 'text-[#8c8070]'}`}>{ref.label}</span>
                                                    <span className={`shrink-0 ml-4 w-4 h-4 border flex items-center justify-center transition-colors ${active ? 'border-[#b1844f]/70 text-[#c9a96e]' : 'border-[#81745e]/30 text-transparent'}`}>
                                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true"><path d="M1 4L3 6.5L7 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}
