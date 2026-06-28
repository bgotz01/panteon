'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { MODELS } from '@/lib/models';
import { PAGE_REFS, PAGE_REF_GROUPS, buildContextBlock, refForPath, type PageRef } from '@/lib/pageContext';

// ─── types ───────────────────────────────────────────────────────────────────

interface AgentMessage {
    role: 'user' | 'assistant';
    content: string;
}

interface AgentState {
    model: string;
    systemPrompt: string;
    messages: AgentMessage[];
    loading: boolean;
    error: boolean;
}

interface SavedSession {
    dbId: string;
    savedAt: Date;
    firstQuestion: string;
    agents: AgentState[];
    mode: 'parallel' | 'cascade' | 'solo';
    turnCount: number;
    // cascade-specific: the full turn thread for restoring
    cascadeTurns: CascadeTurn[];
}

// Cascade: a single chronological thread of turns
interface CascadeTurn {
    question: string;
    responses: { agentIdx: number; content: string }[];
}

// ─── constants ───────────────────────────────────────────────────────────────

const AGENT_LABELS = ['I', 'II', 'III'] as const;

const DEFAULT_MODELS = [
    'deepseek/deepseek-v4-flash',
    'z-ai/glm-5.2',
    'google/gemini-3.1-flash-lite',
] as const;

const LS_MODELS_KEY = 'council_agent_models_v2';
const LS_PROMPTS_KEY = 'council_agent_prompts_v2';
const LS_SYNC_KEY = 'council_sync_prompts_v2';

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

function ls<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : (JSON.parse(raw) as T);
    } catch { return fallback; }
}

function loadStoredModels(): string[] {
    const v = ls<string[]>(LS_MODELS_KEY, [...DEFAULT_MODELS]);
    return Array.isArray(v) && v.length === 3 ? v : [...DEFAULT_MODELS];
}

function loadStoredPrompts(): string[] {
    const def = [DEFAULT_SYSTEM_PROMPT, DEFAULT_SYSTEM_PROMPT, DEFAULT_SYSTEM_PROMPT];
    const v = ls<string[]>(LS_PROMPTS_KEY, def);
    return Array.isArray(v) && v.length === 3 ? v : def;
}

function makeAgent(model: string, systemPrompt: string): AgentState {
    return { model, systemPrompt, messages: [], loading: false, error: false };
}

function freshAgents(models: string[], prompts: string[]): AgentState[] {
    return [0, 1, 2].map((i) => makeAgent(models[i], prompts[i]));
}

function formatTime(d: Date) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ─── DB helpers ───────────────────────────────────────────────────────────────

async function dbCreateSession(mode: string, agentModels: string[]): Promise<string> {
    const res = await fetch('/api/council/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, agentModels }),
    });
    const { id } = await res.json() as { id: string };
    return id;
}

async function dbSaveTurn(
    sessionId: string,
    order: number,
    question: string,
    responses: { agentIndex: number; model: string; content: string }[],
) {
    await fetch('/api/council/turns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, question, order, responses }),
    });
}

async function dbDeleteSession(id: string) {
    await fetch(`/api/council/sessions/${id}`, { method: 'DELETE' });
}

async function dbLoadSessions(): Promise<SavedSession[]> {
    const res = await fetch('/api/council/sessions');
    const rows = await res.json() as {
        id: string;
        mode: string;
        agentModels: string[];
        createdAt: string;
        updatedAt: string;
        turns: {
            id: string;
            question: string;
            order: number;
            responses: { agentIndex: number; model: string; content: string }[];
        }[];
    }[];

    return rows.map((row) => {
        const firstQuestion = row.turns[0]?.question ?? 'Untitled';
        const agentModels = row.agentModels;
        const agents: AgentState[] = agentModels.map((model) => ({
            model,
            systemPrompt: DEFAULT_SYSTEM_PROMPT,
            messages: [],
            loading: false,
            error: false,
        }));

        // Rebuild cascade turns
        const cascadeTurns: CascadeTurn[] = row.turns.map((turn) => ({
            question: turn.question,
            responses: turn.responses.map((r) => ({ agentIdx: r.agentIndex, content: r.content })),
        }));

        // For parallel/solo: replay turns into per-agent message histories
        if (row.mode !== 'cascade') {
            row.turns.forEach((turn) => {
                agents.forEach((agent, i) => {
                    agent.messages.push({ role: 'user', content: turn.question });
                    const resp = turn.responses.find((r) => r.agentIndex === i);
                    if (resp) agent.messages.push({ role: 'assistant', content: resp.content });
                });
            });
        }

        return {
            dbId: row.id,
            savedAt: new Date(row.updatedAt),
            firstQuestion,
            agents,
            mode: row.mode as 'parallel' | 'cascade' | 'solo',
            turnCount: row.turns.length,
            cascadeTurns,
        };
    });
}

// ─── streaming helper ─────────────────────────────────────────────────────────

async function streamChat(
    payload: { messages: AgentMessage[]; model: string; systemPrompt: string },
    onDelta: (delta: string) => void,
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

export default function CouncilPage() {
    const pathname = usePathname();
    // Auto-inject context for the page the user navigated from (if any)
    const autoRef = refForPath(pathname);
    const [syncPrompts, setSyncPrompts] = useState(true);
    const [promptModalOpen, setPromptModalOpen] = useState(false);
    // which tab is active inside the prompt modal
    const [promptTab, setPromptTab] = useState(0);
    const [promptSaved, setPromptSaved] = useState(false);
    const [input, setInput] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [sessions, setSessions] = useState<SavedSession[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [attachedRefs, setAttachedRefs] = useState<PageRef[]>([]);
    const [refsOpen, setRefsOpen] = useState(false);
    // mode toggle — only parallel and cascade now; solo lives at /council/agent
    const [mode, setMode] = useState<'parallel' | 'cascade'>('parallel');

    // ── shared agent config (model + prompt) ─────────────────────────────────
    // Config is shared across modes — changing a model in parallel also changes it in cascade.

    interface AgentConfig { model: string; systemPrompt: string; }
    const [agentConfigs, setAgentConfigs] = useState<AgentConfig[]>(() =>
        DEFAULT_MODELS.map((m) => ({ model: m, systemPrompt: DEFAULT_SYSTEM_PROMPT }))
    );

    // ── per-mode message histories ────────────────────────────────────────────

    interface MsgState { messages: AgentMessage[]; loading: boolean; error: boolean; }
    const emptyMsgState = (): MsgState => ({ messages: [], loading: false, error: false });

    const [parallelMsgs, setParallelMsgs] = useState<MsgState[]>(() => [0, 1, 2].map(emptyMsgState));
    const [parallelSessionId, setParallelSessionId] = useState<string | null>(null);
    const parallelTurnOrder = useRef(0);

    const [cascadeMsgs, setCascadeMsgs] = useState<MsgState[]>(() => [0, 1, 2].map(emptyMsgState));
    const [cascadeTurns, setCascadeTurns] = useState<CascadeTurn[]>([]);
    const [cascadeLoading, setCascadeLoading] = useState<number | null>(null);
    const [cascadeSessionId, setCascadeSessionId] = useState<string | null>(null);
    const cascadeTurnOrder = useRef(0);
    const cascadeBottomRef = useRef<HTMLDivElement | null>(null);

    // Derived: full AgentState for the current mode (config + messages merged)
    const modeMessages = mode === 'parallel' ? parallelMsgs : cascadeMsgs;
    const setModeMessages = mode === 'parallel' ? setParallelMsgs : setCascadeMsgs;
    const agents: AgentState[] = agentConfigs.map((cfg, i) => ({
        ...cfg,
        messages: modeMessages[i].messages,
        loading: modeMessages[i].loading,
        error: modeMessages[i].error,
    }));
    const activeSessionId = mode === 'parallel' ? parallelSessionId : cascadeSessionId;
    const setActiveSessionId = mode === 'parallel' ? setParallelSessionId : setCascadeSessionId;
    const turnOrderRef = mode === 'parallel' ? parallelTurnOrder : cascadeTurnOrder;

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const bottomRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

    // Hydrate from localStorage after mount (avoids SSR mismatch)
    useEffect(() => {
        const models = loadStoredModels();
        const prompts = loadStoredPrompts();
        setAgentConfigs(models.map((m, i) => ({ model: m, systemPrompt: prompts[i] })));
        setSyncPrompts(ls(LS_SYNC_KEY, true));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Load sessions from DB on mount
    useEffect(() => {
        dbLoadSessions().then(setSessions).catch(() => {/* non-fatal */ });
    }, []);

    useEffect(() => {
        localStorage.setItem(LS_MODELS_KEY, JSON.stringify(agentConfigs.map((a) => a.model)));
        localStorage.setItem(LS_PROMPTS_KEY, JSON.stringify(agentConfigs.map((a) => a.systemPrompt)));
    }, [agentConfigs]);

    useEffect(() => {
        localStorage.setItem(LS_SYNC_KEY, String(syncPrompts));
    }, [syncPrompts]);

    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    }, [input]);

    useEffect(() => {
        bottomRefs.current.forEach((ref) => ref?.scrollIntoView({ behavior: 'smooth' }));
    }, [parallelMsgs, cascadeMsgs]);

    useEffect(() => {
        cascadeBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [cascadeTurns, cascadeLoading]);

    // close modal on Escape
    useEffect(() => {
        if (!promptModalOpen) return;
        const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setPromptModalOpen(false); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [promptModalOpen]);

    useEffect(() => {
        if (!refsOpen) return;
        const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setRefsOpen(false); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [refsOpen]);

    function setAgentModel(idx: number, model: string) {
        setAgentConfigs((prev) => prev.map((a, i) => i === idx ? { ...a, model } : a));
    }

    function setAgentPrompt(idx: number, prompt: string) {
        if (syncPrompts) {
            setAgentConfigs((prev) => prev.map((a) => ({ ...a, systemPrompt: prompt })));
        } else {
            setAgentConfigs((prev) => prev.map((a, i) => i === idx ? { ...a, systemPrompt: prompt } : a));
        }
    }

    function handleSyncToggle(next: boolean) {
        setSyncPrompts(next);
        if (next) {
            const base = agentConfigs[promptTab].systemPrompt;
            setAgentConfigs((prev) => prev.map((a) => ({ ...a, systemPrompt: base })));
        }
    }

    function toggleRef(ref: PageRef) {
        setAttachedRefs((prev) =>
            prev.some((r) => r.id === ref.id)
                ? prev.filter((r) => r.id !== ref.id)
                : [...prev, ref]
        );
    }

    function saveAndNew() {
        if (mode === 'cascade') {
            setCascadeMsgs([0, 1, 2].map(emptyMsgState));
            setCascadeTurns([]);
            setCascadeSessionId(null);
            cascadeTurnOrder.current = 0;
        } else {
            setParallelMsgs([0, 1, 2].map(emptyMsgState));
            setParallelSessionId(null);
            parallelTurnOrder.current = 0;
        }
        setInput('');
        dbLoadSessions().then(setSessions).catch(() => { });
    }

    function restoreSession(session: SavedSession) {
        setMode(session.mode as 'parallel' | 'cascade');
        // Restore configs from the session
        setAgentConfigs(session.agents.map((a) => ({ model: a.model, systemPrompt: a.systemPrompt })));
        if (session.mode === 'cascade') {
            setCascadeMsgs(session.agents.map((a) => ({ messages: a.messages, loading: false, error: false })));
            setCascadeTurns(session.cascadeTurns);
            setCascadeSessionId(session.dbId);
            cascadeTurnOrder.current = session.turnCount;
        } else {
            setParallelMsgs(session.agents.map((a) => ({ messages: a.messages, loading: false, error: false })));
            setParallelSessionId(session.dbId);
            parallelTurnOrder.current = session.turnCount;
        }
        setInput('');
    }

    function deleteSession(dbId: string) {
        setSessions((prev) => prev.filter((s) => s.dbId !== dbId));
        dbDeleteSession(dbId).catch(() => { });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || submitting) return;
        if (mode === 'cascade') {
            await handleCascadeSubmit(trimmed);
        } else {
            await handleParallelSubmit(trimmed);
        }
    }

    // Get or create a DB session for the current conversation
    async function ensureSession(): Promise<string> {
        if (activeSessionId) return activeSessionId;
        const id = await dbCreateSession(mode, agents.map((a) => a.model));
        setActiveSessionId(id);
        return id;
    }

    async function handleParallelSubmit(trimmed: string) {
        setInput('');
        setSubmitting(true);

        const userMsg: AgentMessage = { role: 'user', content: trimmed };
        const snapshot = agents;

        // Add user message + empty assistant placeholder for each agent
        setModeMessages((prev) => prev.map((m) => ({
            ...m,
            messages: [...m.messages, userMsg, { role: 'assistant' as const, content: '' }],
            loading: true,
            error: false,
        })));

        const allRefs = autoRef && !attachedRefs.some((r) => r.id === autoRef.id)
            ? [autoRef, ...attachedRefs]
            : attachedRefs;

        // Stream all three in parallel, each updating its own last message
        const results = await Promise.allSettled(
            snapshot.map((agent, i) => {
                const payload = {
                    messages: [...agent.messages, userMsg],
                    model: agent.model,
                    systemPrompt: allRefs.length > 0
                        ? `${agent.systemPrompt}\n\n${buildContextBlock(allRefs)}`
                        : agent.systemPrompt,
                };
                return streamChat(payload, (partial) => {
                    setModeMessages((prev) => prev.map((m, j) => {
                        if (j !== i) return m;
                        const msgs = [...m.messages];
                        msgs[msgs.length - 1] = { role: 'assistant', content: partial };
                        return { ...m, messages: msgs };
                    }));
                }).then((full) => {
                    setModeMessages((prev) => prev.map((m, j) => {
                        if (j !== i) return m;
                        const msgs = [...m.messages];
                        msgs[msgs.length - 1] = { role: 'assistant', content: full };
                        return { ...m, messages: msgs, loading: false, error: false };
                    }));
                    return { agentIndex: i, model: agent.model, content: full };
                }).catch(() => {
                    const fallback = 'The instrument is silent. The signal did not return.';
                    setModeMessages((prev) => prev.map((m, j) => {
                        if (j !== i) return m;
                        const msgs = [...m.messages];
                        msgs[msgs.length - 1] = { role: 'assistant', content: fallback };
                        return { ...m, messages: msgs, loading: false, error: true };
                    }));
                    return { agentIndex: i, model: agent.model, content: fallback };
                });
            })
        );

        // Persist turn to DB
        try {
            const sessionId = await ensureSession();
            const order = turnOrderRef.current++;
            const responses = results
                .filter((r): r is PromiseFulfilledResult<{ agentIndex: number; model: string; content: string }> => r.status === 'fulfilled')
                .map((r) => r.value);
            await dbSaveTurn(sessionId, order, trimmed, responses);
        } catch { /* non-fatal */ }

        setSubmitting(false);
    }

    async function handleCascadeSubmit(trimmed: string) {
        setInput('');
        setSubmitting(true);

        const systemPromptBase = (agent: AgentState, agentIdx: number) => {
            const allRefs = autoRef && !attachedRefs.some((r) => r.id === autoRef.id)
                ? [autoRef, ...attachedRefs]
                : attachedRefs;
            const identity = `You are Agent ${AGENT_LABELS[agentIdx]} in this council. Respond only as yourself — in first person, from your own perspective only.

IMPORTANT: The user may address multiple agents in a single message (e.g. "Agent II good job, Agent III revise your example"). Only respond to what is directed at you or to the general question. If the user praises, critiques, or instructs another agent by name, do not acknowledge it, do not thank on their behalf, do not revise their answer, and do not speak as them. Each agent will respond for themselves in their own turn.`;
            const base = `${agent.systemPrompt}\n\n${identity}`;
            return allRefs.length > 0
                ? `${base}\n\n${buildContextBlock(allRefs)}`
                : base;
        };

        const turnIdx = cascadeTurns.length;
        setCascadeTurns((prev) => [...prev, { question: trimmed, responses: [] }]);

        const responses: { agentIdx: number; content: string }[] = [];

        for (let i = 0; i < agents.length; i++) {
            setCascadeLoading(i);

            const messages: AgentMessage[] = [];

            // Prior turns: all agents' responses visible, but labelled clearly
            if (cascadeTurns.length > 0) {
                const priorLines: string[] = [];
                cascadeTurns.forEach((t) => {
                    priorLines.push(`User: ${t.question}`);
                    t.responses.forEach((r) => {
                        const label = r.agentIdx === i ? `You (Agent ${AGENT_LABELS[r.agentIdx]})` : `Agent ${AGENT_LABELS[r.agentIdx]}`;
                        priorLines.push(`${label}: ${r.content}`);
                    });
                });
                messages.push({ role: 'assistant', content: `[Prior conversation]\n${priorLines.join('\n')}` });
            }

            // Current question
            messages.push({ role: 'user', content: trimmed });

            // Agents that have already responded this turn
            if (responses.length > 0) {
                const precedingText = responses
                    .map((r) => {
                        const label = r.agentIdx === i ? `You (Agent ${AGENT_LABELS[r.agentIdx]})` : `Agent ${AGENT_LABELS[r.agentIdx]}`;
                        return `${label} said:\n${r.content}`;
                    })
                    .join('\n\n');
                messages.push({
                    role: 'user',
                    content: `The following agents have already responded. You may build upon, challenge, or extend their perspectives — but respond only as yourself (Agent ${AGENT_LABELS[i]}). Do not speak on behalf of other agents or respond to critiques directed at them.\n\n${precedingText}\n\nNow give your own response.`,
                });
            }

            // Add streaming placeholder
            setCascadeTurns((prev) => prev.map((t, idx) =>
                idx === turnIdx
                    ? { ...t, responses: [...responses, { agentIdx: i, content: '' }] }
                    : t
            ));

            let content = 'The instrument is silent. The signal did not return.';
            try {
                content = await streamChat(
                    { messages, model: agents[i].model, systemPrompt: systemPromptBase(agents[i], i) },
                    (partial) => {
                        setCascadeTurns((prev) => prev.map((t, idx) => {
                            if (idx !== turnIdx) return t;
                            const rs = [...responses, { agentIdx: i, content: partial }];
                            return { ...t, responses: rs };
                        }));
                    }
                );
            } catch { /* keep fallback */ }

            responses.push({ agentIdx: i, content });
            setCascadeTurns((prev) => prev.map((t, idx) =>
                idx === turnIdx ? { ...t, responses: [...responses] } : t
            ));
        }

        setCascadeLoading(null);

        // Persist completed turn to DB
        try {
            const sessionId = await ensureSession();
            const order = turnOrderRef.current++;
            await dbSaveTurn(sessionId, order, trimmed,
                responses.map((r) => ({ agentIndex: r.agentIdx, model: agents[r.agentIdx].model, content: r.content }))
            );
        } catch { /* non-fatal */ }

        setSubmitting(false);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as unknown as React.FormEvent);
        }
    }

    const anyLoading = mode === 'parallel'
        ? agents.some((a) => a.loading)
        : cascadeLoading !== null;

    const hasMessages = mode === 'parallel'
        ? agents.some((a) => a.messages.length > 0)
        : cascadeTurns.length > 0;

    return (
        <main className="flex h-[calc(100vh-57px)] flex-col overflow-hidden bg-[#0b0a08] text-[#e9dec4]">

            {/* background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(157,113,59,0.12),transparent_40%)]" />
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#e9dec4_1px,transparent_1px),linear-gradient(to_bottom,#e9dec4_1px,transparent_1px)] bg-[size:72px_72px]" />
            </div>

            {/* ── header ─────────────────────────────────────────────────── */}
            <header className="relative z-10 shrink-0 border-b border-[#b1844f]/20 px-6 pt-5 pb-3">
                {/* row 1: title centered, mode toggle right */}
                <div className="relative flex items-center justify-center">
                    <div className="flex items-center gap-3">
                        <span className="font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.5em] text-[#b1844f]/50">◈</span>
                        <h1 className="font-[family-name:var(--font-cinzel)] text-xl tracking-[0.06em] text-[#b9ad94]">
                            The Council
                        </h1>
                    </div>
                    <div className="absolute right-0 flex items-center border border-[#b1844f]/20 overflow-hidden">
                        <button
                            onClick={() => setMode('parallel')}
                            className={`px-3 py-1.5 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.35em] transition-colors ${mode === 'parallel' ? 'bg-[#1a1610] text-[#c9a96e]' : 'text-[#81745e] hover:text-[#a4774c]'}`}
                        >
                            Parallel
                        </button>
                        <div className="w-px h-3 bg-[#b1844f]/20" />
                        <button
                            onClick={() => setMode('cascade')}
                            className={`px-3 py-1.5 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.35em] transition-colors ${mode === 'cascade' ? 'bg-[#1a1610] text-[#c9a96e]' : 'text-[#81745e] hover:text-[#a4774c]'}`}
                        >
                            Cascade
                        </button>
                    </div>
                </div>

                {/* row 2: session controls */}
                <div className="mt-3 flex items-center justify-center gap-6 border-t border-[#b1844f]/10 pt-3">
                    <button
                        onClick={() => setPromptModalOpen(true)}
                        className={`font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.4em] transition-colors ${promptModalOpen ? 'text-[#c9a96e]' : 'text-[#81745e] hover:text-[#a4774c]'}`}
                    >
                        Prompts
                    </button>
                    <span className="w-px h-3 bg-[#b1844f]/15" />
                    <button
                        onClick={() => setRefsOpen(true)}
                        className={`font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.4em] transition-colors ${attachedRefs.length > 0 || autoRef ? 'text-[#c9a96e]' : 'text-[#81745e] hover:text-[#a4774c]'}`}
                    >
                        References{attachedRefs.length > 0 ? ` (${attachedRefs.length})` : autoRef ? ' (auto)' : ''}
                    </button>
                    {hasMessages && (
                        <>
                            <span className="w-px h-3 bg-[#b1844f]/15" />
                            <button
                                onClick={saveAndNew}
                                disabled={anyLoading}
                                className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.4em] text-[#81745e] hover:text-[#a4774c] transition-colors disabled:opacity-30"
                            >
                                Save &amp; New
                            </button>
                        </>
                    )}
                </div>
            </header>

            {/* ── body ───────────────────────────────────────────────────── */}
            <div className="relative z-10 flex flex-1 overflow-hidden px-8">

                {/* left sidebar — sessions */}
                <div className={`shrink-0 border-r border-[#b1844f]/20 bg-[#0d0c0a] flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? 'w-52' : 'w-10'}`}>

                    {/* collapsed rail */}
                    {!sidebarOpen && (
                        <button
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Expand sessions sidebar"
                            className="flex flex-col items-center gap-3 pt-4 w-full text-[#81745e] hover:text-[#a4774c] transition-colors"
                        >
                            {/* chevron pointing right (expand) */}
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {sessions.length > 0 && (
                                <span className="font-[family-name:var(--font-plex)] text-[8px] tracking-[0.1em] text-[#81745e]/60">
                                    {sessions.length}
                                </span>
                            )}
                        </button>
                    )}

                    {/* expanded content */}
                    {sidebarOpen && (
                        <>
                            <div className="shrink-0 border-b border-[#b1844f]/15 px-4 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {/* chevron pointing left (collapse) */}
                                    <button
                                        onClick={() => setSidebarOpen(false)}
                                        aria-label="Collapse sessions sidebar"
                                        className="text-[#81745e] hover:text-[#a4774c] transition-colors"
                                    >
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <span className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.45em] text-[#81745e]">
                                        Sessions
                                    </span>
                                </div>
                                <button
                                    onClick={saveAndNew}
                                    disabled={!hasMessages || anyLoading}
                                    className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.35em] text-[#a4774c] hover:text-[#d6b274] transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                                >
                                    + Save
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto scrollbar-none">
                                {sessions.length === 0 ? (
                                    <div className="px-4 py-6 font-[family-name:var(--font-cormorant)] text-sm italic text-[#81745e]/40 text-center leading-6">
                                        No saved sessions yet.
                                    </div>
                                ) : (
                                    <div className="divide-y divide-[#b1844f]/10">
                                        {sessions.map((s) => (
                                            <div key={s.dbId} className="group px-4 py-3 hover:bg-[#100f0d] transition-colors">
                                                <button onClick={() => restoreSession(s)} className="w-full text-left">
                                                    <p className="font-[family-name:var(--font-cormorant)] text-sm leading-5 text-[#c9a96e] line-clamp-2">
                                                        {s.firstQuestion}
                                                    </p>
                                                    <p className="mt-1 font-[family-name:var(--font-plex)] text-[8px] tracking-[0.2em] text-[#81745e]/50">
                                                        {formatTime(s.savedAt)}
                                                    </p>
                                                </button>
                                                <button
                                                    onClick={() => deleteSession(s.dbId)}
                                                    className="mt-1 opacity-0 group-hover:opacity-60 hover:!opacity-100 font-[family-name:var(--font-plex)] text-[8px] text-[#81745e] transition-opacity"
                                                >
                                                    delete
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* columns — parallel mode */}
                {mode === 'parallel' && (
                    <div className="flex flex-1 overflow-hidden divide-x divide-[#b1844f]/10 border-x border-[#b1844f]/10">
                        {agents.map((agent, i) => {
                            const modelMeta = MODELS.find((m) => m.id === agent.model);
                            return (
                                <div key={i} className="flex flex-1 flex-col overflow-hidden min-w-0">

                                    {/* column header */}
                                    <div className="shrink-0 border-b border-[#b1844f]/15 bg-[#0d0c0a] px-4 py-3 flex items-center gap-2">
                                        <span className="font-[family-name:var(--font-cinzel)] text-[10px] tracking-[0.25em] text-[#81745e] shrink-0">
                                            {AGENT_LABELS[i]}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <select
                                                value={agent.model}
                                                onChange={(e) => setAgentModel(i, e.target.value)}
                                                disabled={anyLoading}
                                                aria-label={`Agent ${AGENT_LABELS[i]} model`}
                                                className="w-full appearance-none bg-transparent font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.25em] text-[#c9a96e] hover:text-[#e4c98a] outline-none cursor-pointer disabled:opacity-40 transition-colors truncate"
                                            >
                                                {MODELS.map((m) => (
                                                    <option key={m.id} value={m.id} className="bg-[#100f0d] text-[#c9a96e] normal-case tracking-normal text-sm">
                                                        {m.label}  —  {m.cost}
                                                    </option>
                                                ))}
                                            </select>
                                            {modelMeta && (
                                                <div className="font-[family-name:var(--font-plex)] text-[7px] tracking-[0.15em] text-[#a4845a]">
                                                    {modelMeta.cost}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* messages */}
                                    <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 scrollbar-none">
                                        {agent.messages.length === 0 && !agent.loading && (
                                            <div className="flex h-full items-center justify-center">
                                                <p className="font-[family-name:var(--font-cormorant)] text-base italic text-[#81745e]/40 text-center">
                                                    Waiting
                                                </p>
                                            </div>
                                        )}

                                        {agent.messages.map((msg, j) => (
                                            <div key={j}>
                                                {msg.role === 'user' ? (
                                                    <div className="flex justify-end">
                                                        <div className="inline-block max-w-[85%] border border-[#b1844f]/20 bg-[#100f0d] px-4 py-2.5 font-[family-name:var(--font-cormorant)] text-base leading-7 text-[#b9ad94]">
                                                            {msg.content}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <div className="mb-1.5 font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.45em] text-[#a4774c]">
                                                            {AGENT_LABELS[i]}
                                                        </div>
                                                        <div className="prose-council font-[family-name:var(--font-cormorant)] text-base leading-7 text-[#d7ccb4]">
                                                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        {agent.loading && agent.messages[agent.messages.length - 1]?.content === '' && (
                                            <div>
                                                <div className="mb-1.5 font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.45em] text-[#a4774c]">
                                                    {AGENT_LABELS[i]}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="h-1 w-1 rounded-full bg-[#d6b274]/40 animate-pulse" style={{ animationDelay: '0ms' }} />
                                                    <span className="h-1 w-1 rounded-full bg-[#d6b274]/40 animate-pulse" style={{ animationDelay: '200ms' }} />
                                                    <span className="h-1 w-1 rounded-full bg-[#d6b274]/40 animate-pulse" style={{ animationDelay: '400ms' }} />
                                                </div>
                                            </div>
                                        )}

                                        <div ref={(el) => { bottomRefs.current[i] = el; }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* thread — cascade mode */}
                {mode === 'cascade' && (
                    <div className="flex flex-1 overflow-hidden border-x border-[#b1844f]/10">
                        {/* conversation thread */}
                        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-10 scrollbar-none">
                            {cascadeTurns.length === 0 && cascadeLoading === null && (
                                <div className="flex h-full items-center justify-center">
                                    <p className="font-[family-name:var(--font-cormorant)] text-base italic text-[#81745e]/40 text-center">
                                        Pose a question. Each voice will respond in turn.
                                    </p>
                                </div>
                            )}

                            {cascadeTurns.map((turn, ti) => (
                                <div key={ti} className="space-y-6">
                                    {/* question */}
                                    <div className="flex justify-end">
                                        <div className="inline-block max-w-[70%] border border-[#b1844f]/20 bg-[#100f0d] px-5 py-3 font-[family-name:var(--font-cormorant)] text-base leading-7 text-[#b9ad94]">
                                            {turn.question}
                                        </div>
                                    </div>
                                    {/* responses in order */}
                                    {turn.responses.map((r, ri) => (
                                        <div key={ri} className="flex gap-5">
                                            <div className="shrink-0 pt-1 font-[family-name:var(--font-cinzel)] text-[10px] tracking-[0.3em] text-[#a4774c] w-6 text-right">
                                                {AGENT_LABELS[r.agentIdx]}
                                            </div>
                                            <div className={`flex-1 font-[family-name:var(--font-cormorant)] text-base leading-7 text-[#d7ccb4] ${ri < turn.responses.length - 1 ? 'pb-6 border-b border-[#b1844f]/10' : ''}`}>
                                                <ReactMarkdown>{r.content}</ReactMarkdown>
                                            </div>
                                        </div>
                                    ))}
                                    {/* loading indicator for current turn */}
                                    {ti === cascadeTurns.length - 1 && cascadeLoading !== null && (
                                        <div className="flex gap-5">
                                            <div className="shrink-0 pt-1 font-[family-name:var(--font-cinzel)] text-[10px] tracking-[0.3em] text-[#a4774c] w-6 text-right">
                                                {AGENT_LABELS[cascadeLoading]}
                                            </div>
                                            <div className="flex items-center gap-1.5 pt-2">
                                                <span className="h-1 w-1 rounded-full bg-[#d6b274]/40 animate-pulse" style={{ animationDelay: '0ms' }} />
                                                <span className="h-1 w-1 rounded-full bg-[#d6b274]/40 animate-pulse" style={{ animationDelay: '200ms' }} />
                                                <span className="h-1 w-1 rounded-full bg-[#d6b274]/40 animate-pulse" style={{ animationDelay: '400ms' }} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div ref={cascadeBottomRef} />
                        </div>

                        {/* agent model strip — right side */}
                        <div className="shrink-0 w-40 border-l border-[#b1844f]/10 bg-[#0d0c0a] flex flex-col">
                            <div className="shrink-0 border-b border-[#b1844f]/15 px-4 py-3">
                                <span className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.45em] text-[#81745e]">Agents</span>
                            </div>
                            <div className="flex-1 divide-y divide-[#b1844f]/10 overflow-auto scrollbar-none">
                                {agents.map((agent, i) => {
                                    const modelMeta = MODELS.find((m) => m.id === agent.model);
                                    return (
                                        <div key={i} className="px-4 py-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-[family-name:var(--font-cinzel)] text-[10px] tracking-[0.25em] text-[#81745e]">{AGENT_LABELS[i]}</span>
                                                {cascadeLoading === i && (
                                                    <span className="flex gap-0.5">
                                                        <span className="h-1 w-1 rounded-full bg-[#d6b274]/50 animate-pulse" style={{ animationDelay: '0ms' }} />
                                                        <span className="h-1 w-1 rounded-full bg-[#d6b274]/50 animate-pulse" style={{ animationDelay: '150ms' }} />
                                                        <span className="h-1 w-1 rounded-full bg-[#d6b274]/50 animate-pulse" style={{ animationDelay: '300ms' }} />
                                                    </span>
                                                )}
                                            </div>
                                            <select
                                                value={agent.model}
                                                onChange={(e) => setAgentModel(i, e.target.value)}
                                                disabled={anyLoading}
                                                aria-label={`Agent ${AGENT_LABELS[i]} model`}
                                                className="w-full appearance-none bg-transparent font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.15em] text-[#c9a96e] hover:text-[#e4c98a] outline-none cursor-pointer disabled:opacity-40 transition-colors truncate"
                                            >
                                                {MODELS.map((m) => (
                                                    <option key={m.id} value={m.id} className="bg-[#100f0d] text-[#c9a96e] normal-case tracking-normal text-sm">
                                                        {m.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {modelMeta && (
                                                <div className="font-[family-name:var(--font-plex)] text-[7px] tracking-[0.1em] text-[#a4845a] mt-0.5">{modelMeta.cost}</div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ── shared input ───────────────────────────────────────────── */}
            <div className="relative z-10 shrink-0 border-t border-[#b1844f]/20 bg-[#0b0a08]">
                <div className="flex px-8">
                    {/* spacer matches sidebar width */}
                    <div className={`shrink-0 transition-all duration-300 ${sidebarOpen ? 'w-52' : 'w-10'}`} />
                    {/* form aligned with chat columns */}
                    <form onSubmit={handleSubmit} className="flex-1 py-5 border-x border-[#b1844f]/10 px-5">
                        <div className="flex items-end gap-4">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Pose a question to the council…"
                                rows={1}
                                disabled={anyLoading}
                                className="min-h-[40px] max-h-[140px] flex-1 resize-none bg-transparent font-[family-name:var(--font-cormorant)] text-lg leading-7 text-[#e9dec4] placeholder-[#81745e]/50 outline-none disabled:opacity-40"
                            />
                            <button
                                type="submit"
                                disabled={anyLoading || !input.trim()}
                                aria-label="Submit to council"
                                className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-[#b1844f]/40 bg-[#100f0d] text-[#d6b274] transition-colors hover:border-[#b1844f]/70 hover:text-[#eadfca] disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M7 1L7 13M7 1L2 6M7 1L12 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* ── references modal ──────────────────────────────────────── */}
            {refsOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-[#0b0a08]/70 backdrop-blur-sm"
                        onClick={() => setRefsOpen(false)}
                        aria-hidden="true"
                    />
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Page References"
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 border border-[#b1844f]/30 bg-[#0f0e0c] shadow-2xl"
                    >
                        {/* header */}
                        <div className="flex items-center justify-between border-b border-[#b1844f]/20 px-6 py-4">
                            <div>
                                <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.5em] text-[#81745e]">
                                    Council
                                </div>
                                <h2 className="mt-0.5 font-[family-name:var(--font-cinzel)] text-base tracking-[0.06em] text-[#d6b274]">
                                    Page References
                                </h2>
                            </div>
                            <div className="flex items-center gap-4">
                                {attachedRefs.length > 0 && (
                                    <button
                                        onClick={() => setAttachedRefs([])}
                                        className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.35em] text-[#81745e]/50 hover:text-[#81745e] transition-colors"
                                    >
                                        Clear all
                                    </button>
                                )}
                                <button
                                    onClick={() => setRefsOpen(false)}
                                    className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-[#81745e] hover:text-[#a4774c] transition-colors"
                                >
                                    Done
                                </button>
                            </div>
                        </div>

                        {/* description */}
                        <div className="px-6 pt-4 pb-2 font-[family-name:var(--font-cormorant)] text-sm leading-6 text-[#81745e]/70">
                            Attach pages as persistent context — every message in this session will include the selected content.
                        </div>

                        {/* auto-injected page notice */}
                        {autoRef && (
                            <div className="mx-6 mb-2 flex items-center gap-3 border border-[#b1844f]/20 bg-[#1a1610] px-4 py-2.5">
                                <span className="font-[family-name:var(--font-plex)] text-[7px] uppercase tracking-[0.4em] text-[#a4774c]">Auto</span>
                                <span className="font-[family-name:var(--font-cormorant)] text-sm text-[#c9a96e]">{autoRef.label}</span>
                                <span className="ml-auto font-[family-name:var(--font-plex)] text-[7px] tracking-[0.2em] text-[#81745e]/50">current page</span>
                            </div>
                        )}

                        {/* grouped list */}
                        <div className="max-h-[60vh] overflow-y-auto scrollbar-none px-6 pb-6">
                            {PAGE_REF_GROUPS.map((group) => (
                                <div key={group} className="mt-5">
                                    <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.5em] text-[#81745e]/50 mb-2">
                                        {group}
                                    </div>
                                    <div className="space-y-px border border-[#b1844f]/15">
                                        {PAGE_REFS.filter((r) => r.group === group).map((ref) => {
                                            const active = attachedRefs.some((r) => r.id === ref.id);
                                            return (
                                                <button
                                                    key={ref.id}
                                                    onClick={() => toggleRef(ref)}
                                                    className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${active ? 'bg-[#1a1610]' : 'bg-[#0d0c0a] hover:bg-[#100f0d]'}`}
                                                >
                                                    <span className={`font-[family-name:var(--font-cormorant)] text-base leading-5 ${active ? 'text-[#c9a96e]' : 'text-[#8c8070]'}`}>
                                                        {ref.label}
                                                    </span>
                                                    <span className={`shrink-0 ml-4 w-4 h-4 border flex items-center justify-center transition-colors ${active ? 'border-[#b1844f]/70 text-[#c9a96e]' : 'border-[#81745e]/30 text-transparent'}`}>
                                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                                                            <path d="M1 4L3 6.5L7 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
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

            {/* ── prompt modal ───────────────────────────────────────────── */}
            {promptModalOpen && (
                <>
                    {/* backdrop */}
                    <div
                        className="fixed inset-0 z-40 bg-[#0b0a08]/70 backdrop-blur-sm"
                        onClick={() => setPromptModalOpen(false)}
                        aria-hidden="true"
                    />

                    {/* panel — centred, not full-screen */}
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="System Prompts"
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 border border-[#b1844f]/30 bg-[#0f0e0c] shadow-2xl"
                    >
                        {/* modal header */}
                        <div className="flex items-center justify-between border-b border-[#b1844f]/20 px-6 py-4">
                            <div>
                                <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.5em] text-[#81745e]">
                                    Council
                                </div>
                                <h2 className="mt-0.5 font-[family-name:var(--font-cinzel)] text-base tracking-[0.06em] text-[#d6b274]">
                                    System Prompts
                                </h2>
                            </div>

                            {/* sync toggle */}
                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                    <span className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.35em] text-[#81745e]">
                                        Same for all
                                    </span>
                                    <div
                                        role="switch"
                                        aria-checked={syncPrompts}
                                        onClick={() => handleSyncToggle(!syncPrompts)}
                                        className={`relative h-4 w-7 rounded-full transition-colors cursor-pointer ${syncPrompts ? 'bg-[#b1844f]/70' : 'bg-[#81745e]/20'}`}
                                    >
                                        <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-[#e9dec4] transition-transform duration-150 ${syncPrompts ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
                                    </div>
                                </label>
                                <button
                                    onClick={() => setPromptModalOpen(false)}
                                    className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-[#81745e] hover:text-[#a4774c] transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>

                        {/* tabs */}
                        <div className="flex border-b border-[#b1844f]/15">
                            {AGENT_LABELS.map((label, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPromptTab(i)}
                                    className={`px-6 py-2.5 font-[family-name:var(--font-cinzel)] text-[11px] tracking-[0.2em] transition-colors ${promptTab === i
                                        ? 'border-b border-[#b1844f]/60 text-[#c9a96e]'
                                        : 'text-[#81745e]/50 hover:text-[#81745e]'
                                        }`}
                                >
                                    {label}
                                    {!syncPrompts && agents[i].systemPrompt !== agents[0].systemPrompt && i > 0 && (
                                        <span className="ml-1.5 text-[7px] text-[#a4774c]">•</span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* editor */}
                        <div className="px-6 py-5">
                            <textarea
                                key={promptTab}
                                value={agents[promptTab].systemPrompt}
                                onChange={(e) => setAgentPrompt(promptTab, e.target.value)}
                                rows={12}
                                className="w-full resize-none bg-[#0b0a08] border border-[#b1844f]/20 px-4 py-3 font-[family-name:var(--font-cormorant)] text-base leading-7 text-[#d7ccb4] placeholder-[#81745e]/40 outline-none focus:border-[#b1844f]/40 transition-colors"
                                placeholder="Enter system prompt…"
                            />
                            <div className="mt-2 flex items-center justify-between">
                                <button
                                    onClick={() => setAgentPrompt(promptTab, DEFAULT_SYSTEM_PROMPT)}
                                    className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.35em] text-[#81745e]/40 hover:text-[#81745e] transition-colors"
                                >
                                    Reset to default
                                </button>
                                <div className="flex items-center gap-4">
                                    <span className="font-[family-name:var(--font-plex)] text-[8px] tracking-[0.2em] text-[#81745e]/30">
                                        {syncPrompts ? 'Applied to all agents' : `Agent ${AGENT_LABELS[promptTab]} only`}
                                    </span>
                                    <button
                                        onClick={() => {
                                            // prompts are already live in state + localStorage via useEffect
                                            // this button just gives explicit confirmation
                                            setPromptSaved(true);
                                            setTimeout(() => setPromptSaved(false), 2000);
                                        }}
                                        className="border border-[#b1844f]/30 px-4 py-1.5 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.35em] transition-colors hover:border-[#b1844f]/60 text-[#c9a96e] hover:text-[#e4c98a]"
                                    >
                                        {promptSaved ? '✓ Saved' : 'Save'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}
