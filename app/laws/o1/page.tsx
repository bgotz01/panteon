'use client';

import { useState } from 'react';
import { is, isNot, allExamples, greeceRomeInversions, GREECE_ROME, type Example, type GreeceRomeGroup } from './data';

export default function O1Page() {
    const exampleCategories = Array.from(new Set(allExamples.map((e) => e.category)));
    const allTabs = [...exampleCategories, GREECE_ROME];
    const [active, setActive] = useState(exampleCategories[0]);

    const filtered = allExamples.filter((e) => e.category === active);
    const isGreeceRome = active === GREECE_ROME;

    // expandable groups for Greece → Rome
    const [expanded, setExpanded] = useState<Set<number>>(new Set());
    const toggleGroup = (i: number) =>
        setExpanded((prev) => {
            const next = new Set(prev);
            next.has(i) ? next.delete(i) : next.add(i);
            return next;
        });

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
                        O1 · First Law
                    </div>
                    <h1 className="mt-4 font-[family-name:var(--font-cinzel)] text-3xl tracking-[0.04em] text-parchment-2">
                        Law of Opposites
                    </h1>
                    <p className="mt-4 font-[family-name:var(--font-cormorant)] text-xl italic text-gold/60">
                        &ldquo;Every new cycle inverts the dominant characteristic of the previous one.&rdquo;
                    </p>
                </div>

                {/* is / is not */}
                <div className="mt-8 border border-gold-muted/15 bg-void/40">
                    <div className="grid md:grid-cols-2 border-b border-gold-muted/15">
                        <div className="px-6 py-3 font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.5em] text-gold-dim border-r border-gold-muted/15">
                            This law is
                        </div>
                        <div className="px-6 py-3 font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.5em] text-gold-dim">
                            This law is not
                        </div>
                    </div>
                    {is.map((item, i) => (
                        <div key={i} className="grid md:grid-cols-2 border-b border-gold-muted/10 last:border-b-0">
                            <div className="px-6 py-4 flex items-baseline gap-2 border-r border-gold-muted/10">
                                <span className="shrink-0 text-gold/50 text-[10px]">+</span>
                                <p className="font-[family-name:var(--font-cormorant)] text-base leading-7 text-parchment-3">{item}</p>
                            </div>
                            <div className="px-6 py-4 flex items-baseline gap-2">
                                <span className="shrink-0 text-muted/50 text-[10px]">−</span>
                                <p className="font-[family-name:var(--font-cormorant)] text-base leading-7 text-stone">{isNot[i]}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* examples */}
                <div className="mt-8">
                    <p className="font-[family-name:var(--font-cormorant)] text-lg italic text-stone mb-6">
                        The law is best demonstrated through examples.
                    </p>

                    {/* tabs */}
                    <div className="flex items-center gap-1 border-b border-gold-muted/20 mb-px">
                        {allTabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActive(tab)}
                                className={`px-4 py-3 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] transition-colors border-b-2 -mb-px ${active === tab
                                    ? 'border-gold text-gold'
                                    : 'border-transparent text-muted hover:text-stone'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                        {!isGreeceRome && (
                            <span className="ml-auto font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.35em] text-muted/50">
                                {filtered.length} {filtered.length === 1 ? 'example' : 'examples'}
                            </span>
                        )}
                    </div>

                    {/* Greece → Rome */}
                    {isGreeceRome && (
                        <div className="space-y-0 border border-gold-muted/20 border-t-0">
                            {greeceRomeInversions.map((section: GreeceRomeGroup, si: number) => {
                                const open = expanded.has(si);
                                return (
                                    <div key={si} className={si !== 0 ? 'border-t border-gold-muted/20' : ''}>
                                        {/* collapsed header row — same structure as example cards */}
                                        <button
                                            onClick={() => toggleGroup(si)}
                                            className="w-full bg-surface-alt/75 hover:bg-surface-alt transition-colors px-6 py-8"
                                        >
                                            <div className="grid gap-px" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
                                                <div className="bg-void/30 p-5 text-center">
                                                    <div className="font-[family-name:var(--font-cinzel)] text-2xl tracking-[0.06em] text-stone underline underline-offset-4">
                                                        {section.greekLabel}
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-center px-4 bg-void/30">
                                                    <span className="text-muted/50 text-lg transition-transform duration-200 inline-block" style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                                                        →
                                                    </span>
                                                </div>
                                                <div className="bg-void/30 p-5 text-center">
                                                    <div className="font-[family-name:var(--font-cinzel)] text-2xl tracking-[0.06em] text-stone underline underline-offset-4">
                                                        {section.romanLabel}
                                                    </div>
                                                </div>
                                            </div>
                                        </button>

                                        {/* expanded sub-rows */}
                                        {open && (
                                            <div className="border-t border-gold-muted/15">
                                                {section.rows.map((row, ri) => (
                                                    <div
                                                        key={ri}
                                                        className={`grid gap-px bg-void/20 ${ri !== 0 ? 'border-t border-gold-muted/10' : ''}`}
                                                        style={{ gridTemplateColumns: '1fr auto 1fr' }}
                                                    >
                                                        <div className="bg-void/30 px-5 py-4 text-center">
                                                            <span className="font-[family-name:var(--font-cormorant)] text-lg text-stone">
                                                                {row.greek}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center justify-center px-4 bg-void/30">
                                                            <span className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.3em] text-muted whitespace-nowrap">
                                                                {row.axis}
                                                            </span>
                                                        </div>
                                                        <div className="bg-void/30 px-5 py-4 text-center">
                                                            <span className="font-[family-name:var(--font-cormorant)] text-lg text-stone">
                                                                {row.roman}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* standard examples */}
                    {!isGreeceRome && (
                        <div className="space-y-0 border border-gold-muted/20 border-t-0">
                            {filtered.map((ex: Example, idx: number) => (
                                <div
                                    key={ex.name}
                                    className={`group bg-surface-alt/75 px-6 py-8 hover:bg-surface-alt transition-colors ${idx !== 0 ? 'border-t border-gold-muted/20' : ''}`}
                                >
                                    {!ex.beforeTitle && !ex.afterTitle && (
                                        <div className="flex items-baseline justify-center gap-4 mb-5">
                                            <span className="font-[family-name:var(--font-cinzel)] text-2xl tracking-[0.06em] text-stone underline underline-offset-4">
                                                {ex.name}
                                            </span>
                                        </div>
                                    )}
                                    <div className="grid gap-px" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
                                        <div className="bg-void/30 p-5 text-center">
                                            {ex.beforeTitle && (
                                                <div className="font-[family-name:var(--font-cinzel)] text-2xl tracking-[0.06em] text-stone mb-4 underline underline-offset-4">
                                                    {ex.beforeTitle}
                                                </div>
                                            )}
                                            <ul className="space-y-1 mb-4">
                                                {ex.beforeTags.map((tag) => (
                                                    <li key={tag} className="font-[family-name:var(--font-cormorant)] text-base text-stone">{tag}</li>
                                                ))}
                                            </ul>
                                            <p className="font-[family-name:var(--font-cormorant)] text-sm leading-6 text-stone/50 text-left">
                                                {ex.beforeDetail}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-center px-4 bg-void/30">
                                            <img src="/images/flip-3.png" alt="" className="w-16 opacity-70" />
                                        </div>
                                        <div className="bg-void/30 p-5 text-center">
                                            {ex.afterTitle && (
                                                <div className="font-[family-name:var(--font-cinzel)] text-2xl tracking-[0.06em] text-stone mb-4 underline underline-offset-4">
                                                    {ex.afterTitle}
                                                </div>
                                            )}
                                            <ul className="space-y-1 mb-4">
                                                {ex.afterTags.map((tag) => (
                                                    <li key={tag} className="font-[family-name:var(--font-cormorant)] text-base text-stone">{tag}</li>
                                                ))}
                                            </ul>
                                            <p className="font-[family-name:var(--font-cormorant)] text-sm leading-6 text-stone/50 text-left">
                                                {ex.afterDetail}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="h-16" />
            </section>
        </main>
    );
}
