'use client';

import { useState } from 'react';
import { MODELS, costPct } from '@/lib/models';

type SortKey = 'cost' | 'speed' | 'latency';
type SortDir = 'asc' | 'desc';

export default function ModelsPage() {
    const [sortKey, setSortKey] = useState<SortKey>('cost');
    const [sortDir, setSortDir] = useState<SortDir>('asc');
    const [query, setQuery] = useState('');

    function toggleSort(key: SortKey) {
        if (sortKey === key) {
            setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    }

    const filtered = query.trim()
        ? [...MODELS].filter((m) =>
            m.label.toLowerCase().includes(query.toLowerCase()) ||
            m.id.toLowerCase().includes(query.toLowerCase())
        )
        : [...MODELS];

    const sorted = filtered.sort((a, b) => {
        let diff = 0;
        if (sortKey === 'cost') diff = costPct(a) - costPct(b);
        if (sortKey === 'speed') diff = a.speedNum - b.speedNum;
        if (sortKey === 'latency') diff = a.latencyMs - b.latencyMs;
        return sortDir === 'asc' ? diff : -diff;
    });

    function arrow(key: SortKey) {
        if (sortKey !== key) return <span className="text-[#81745e]/30">↕</span>;
        return <span>{sortDir === 'asc' ? '↑' : '↓'}</span>;
    }

    return (
        <main className="min-h-screen overflow-hidden bg-void text-parchment">
            {/* background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(157,113,59,0.18),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(55,76,88,0.18),transparent_36%)]" />
                <div className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(to_right,#e9dec4_1px,transparent_1px),linear-gradient(to_bottom,#e9dec4_1px,transparent_1px)] bg-[size:72px_72px]" />
                <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-muted/10" />
                <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-muted/15" />
            </div>

            <section className="relative z-10 mx-auto max-w-6xl px-6 py-8">

                {/* header */}
                <div className="mt-8 border border-gold-muted/20 bg-surface/80 p-7">
                    <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim">
                        Instrument
                    </div>
                    <h1 className="mt-4 font-[family-name:var(--font-cinzel)] text-2xl tracking-[0.04em] text-parchment-2">
                        Models
                    </h1>
                    <p className="mt-4 max-w-2xl font-[family-name:var(--font-cormorant)] text-lg leading-8 text-parchment-3">
                        Active models available through the Panteon interface, routed via OpenRouter.
                        Prices are per million tokens — input / output. Cost % is relative to the most expensive model.
                    </p>
                </div>

                {/* search */}
                <div className="mt-5 flex items-center border border-gold-muted/20 bg-surface/60 px-5 py-3 gap-3">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" className="shrink-0 text-[#81745e]/50">
                        <circle cx="4.5" cy="4.5" r="3.5" stroke="currentColor" strokeWidth="1.1" />
                        <path d="M7.5 7.5L10 10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search models…"
                        aria-label="Search models"
                        className="flex-1 bg-transparent font-[family-name:var(--font-cormorant)] text-base text-[#e9dec4] placeholder-[#81745e]/40 outline-none"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            aria-label="Clear search"
                            className="text-[#81745e]/50 hover:text-[#a4774c] transition-colors font-[family-name:var(--font-plex)] text-[10px]"
                        >
                            ×
                        </button>
                    )}
                </div>

                {/* table */}
                <div className="mt-8 border border-gold-muted/20">

                    {/* header row */}
                    <div className="grid grid-cols-[2fr_1.5fr_1.6fr_0.7fr_0.8fr_0.8fr] border-b border-gold-muted/20 bg-surface/80 px-6 py-4 gap-4">
                        <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.45em] text-gold-dim">
                            Model
                        </div>

                        {/* sortable cost % header */}
                        <button
                            onClick={() => toggleSort('cost')}
                            className="flex items-center gap-2 text-left group"
                        >
                            <span className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.45em] text-gold-dim group-hover:text-gold transition-colors">
                                Cost %
                            </span>
                            <span className="font-[family-name:var(--font-plex)] text-[9px] text-[#81745e]/50 group-hover:text-[#a4774c] transition-colors">
                                {arrow('cost')}
                            </span>
                        </button>

                        <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.45em] text-gold-dim">
                            Input / Output (per 1M)
                        </div>

                        <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.45em] text-gold-dim">
                            Context
                        </div>

                        {/* sortable speed */}
                        <button
                            onClick={() => toggleSort('speed')}
                            className="flex items-center gap-2 text-left group"
                        >
                            <span className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.45em] text-gold-dim group-hover:text-gold transition-colors">
                                Speed
                            </span>
                            <span className="font-[family-name:var(--font-plex)] text-[9px] text-[#81745e]/50 group-hover:text-[#a4774c] transition-colors">
                                {arrow('speed')}
                            </span>
                        </button>

                        {/* sortable latency */}
                        <button
                            onClick={() => toggleSort('latency')}
                            className="flex items-center gap-2 text-left group"
                        >
                            <span className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.45em] text-gold-dim group-hover:text-gold transition-colors">
                                Latency
                            </span>
                            <span className="font-[family-name:var(--font-plex)] text-[9px] text-[#81745e]/50 group-hover:text-[#a4774c] transition-colors">
                                {arrow('latency')}
                            </span>
                        </button>
                    </div>

                    {/* data rows */}
                    {sorted.length === 0 ? (
                        <div className="px-6 py-10 text-center font-[family-name:var(--font-cormorant)] text-lg italic text-[#81745e]/50">
                            No models match &ldquo;{query}&rdquo;
                        </div>
                    ) : sorted.map((model, i) => {
                        const pct = costPct(model);
                        const isFree = model.cost === 'Free';

                        return (
                            <div
                                key={model.id}
                                className={`grid grid-cols-[2fr_1.5fr_1.6fr_0.7fr_0.8fr_0.8fr] gap-4 px-6 py-5 border-b border-gold-muted/10 last:border-b-0 transition-colors ${i % 2 === 0 ? 'bg-surface-alt/75 hover:bg-surface-alt' : 'bg-surface/40 hover:bg-surface/70'
                                    }`}
                            >
                                {/* model name + slug */}
                                <div className="self-center">
                                    <p className="font-[family-name:var(--font-cormorant)] text-base text-parchment-2">
                                        {model.label}
                                    </p>
                                    <p className="mt-0.5 font-[family-name:var(--font-plex)] text-[8px] tracking-[0.15em] text-[#81745e]/50">
                                        {model.id}
                                    </p>
                                </div>

                                {/* cost percentile bar */}
                                <div className="self-center">
                                    <div className="flex items-center gap-2">
                                        <div className="relative h-[3px] flex-1 bg-[#b1844f]/12 max-w-[80px]">
                                            <div
                                                className={`absolute inset-y-0 left-0 transition-all duration-300 ${isFree ? 'bg-[#7aab6a]/70' : 'bg-[#b1844f]/50'}`}
                                                style={{ width: isFree ? '2px' : `${pct}%` }}
                                            />
                                        </div>
                                        <span className={`font-[family-name:var(--font-plex)] text-[9px] tracking-[0.2em] tabular-nums ${isFree ? 'text-[#7aab6a]' :
                                            pct >= 80 ? 'text-[#c97a5a]' :
                                                pct >= 30 ? 'text-[#a4845a]' :
                                                    'text-[#81745e]'
                                            }`}>
                                            {isFree ? 'free' : `${pct}%`}
                                        </span>
                                    </div>
                                </div>

                                {/* price */}
                                <p className={`font-[family-name:var(--font-cormorant)] text-base self-center ${isFree ? 'text-[#7aab6a]' : 'text-parchment-3'}`}>
                                    {model.cost}
                                </p>

                                {/* context */}
                                <p className="font-[family-name:var(--font-cormorant)] text-base text-stone self-center">
                                    {model.context}
                                </p>

                                {/* speed */}
                                <p className="font-[family-name:var(--font-cormorant)] text-base text-stone self-center">
                                    {model.speed}
                                </p>

                                {/* latency */}
                                <p className="font-[family-name:var(--font-cormorant)] text-base text-stone self-center">
                                    {model.latency}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* footnote */}
                <div className="mt-6 font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.4em] text-[#81745e]/40">
                    Cost % = blended (input + output) / 2, relative to most expensive model.
                    Speed and latency are approximate. Prices sourced from OpenRouter at time of configuration.
                </div>

                <div className="h-16" />
            </section>
        </main>
    );
}
