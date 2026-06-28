'use client';

import { useState } from 'react';

const comparison = [
    {
        concept: 'How it reads',
        rnn: 'One word at a time',
        transformer: 'All words simultaneously',
        detail: 'RNNs process tokens sequentially — each step depends on the last. Transformers process the entire sequence in parallel; there is no chain.',
    },
    {
        concept: 'What it does with the past',
        rnn: 'Carries it forward',
        transformer: 'Keeps it and queries it',
        detail: 'RNNs compress history into a running state that gets overwritten at every step. Transformers store every previous token in full and retrieve from them on demand.',
    },
    {
        concept: 'What happens over distance',
        rnn: 'Signal decays',
        transformer: 'Signal stays constant',
        detail: 'In an RNN, a word from 200 steps back has far less influence than one from 5 steps back — the signal degrades with distance. In a Transformer, position has no effect on accessibility.',
    },
    {
        concept: 'How it decides what matters',
        rnn: 'Decided while reading',
        transformer: 'Decided at prediction time',
        detail: 'RNNs must decide what to retain as they go, before knowing what will be needed later. Transformers compute relevance at the moment a prediction is made — with full context available.',
    },
    {
        concept: 'Where the bottleneck is',
        rnn: 'One fixed-size state vector',
        transformer: 'No bottleneck',
        detail: 'Everything an RNN knows about history must fit in a single fixed-size vector. As sequences grow, this compression becomes destructive. Transformers have no such constraint — the context window holds everything intact.',
    },
];

const outcomes = [
    { feature: 'Compute cost', rnn: 'Low', transformer: 'High' },
    { feature: 'Parallel processing', rnn: '❌', transformer: '✅' },
    { feature: 'Long context', rnn: 'Poor', transformer: 'Excellent' },
    { feature: 'Training speed', rnn: 'Slow', transformer: 'Fast' },
    { feature: 'Scaling to billions of parameters', rnn: 'Difficult', transformer: 'Easy' },
    { feature: 'Foundation of ChatGPT', rnn: '❌', transformer: '✅' },
];

const knowledge = [
    { arch: 'RNN', access: 'Sequential memory', future: false },
    { arch: 'Transformer', access: 'Consensus memory', future: false },
    { arch: 'Future architecture?', access: 'Divergence discovery', future: true },
];

export default function AIInversionPage() {
    const [open, setOpen] = useState<number | null>(null);

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
                        O1 · Law of Opposites — Case Study
                    </div>
                    <h1 className="mt-4 font-[family-name:var(--font-cinzel)] text-3xl tracking-[0.04em] text-parchment-2">
                        The Architecture Inversion
                    </h1>
                    <p className="mt-4 font-[family-name:var(--font-cormorant)] text-xl italic text-gold/60">
                        &ldquo;Every system contains the seed of its own inversion.&rdquo;
                    </p>
                    <p className="mt-5 max-w-3xl font-[family-name:var(--font-cormorant)] text-lg leading-8 text-parchment-3">
                        For decades, AI researchers assumed intelligence in language required memory — that a machine must
                        read sequentially and carry the past forward. In 2017, a single paper abolished that assumption.
                        The successor architecture did not improve the old model. It inverted it.
                    </p>
                </div>

                {/* memory vs attention — expandable */}
                <div className="mt-8 border border-gold-muted/20">
                    <div className="grid grid-cols-[1fr_1fr_1fr_auto] bg-surface/80 px-6 py-5 border-b border-gold-muted/15 gap-4">
                        <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.4em] text-gold-dim">Concept</div>
                        <div>
                            <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.4em] text-gold-dim mb-1">RNN / LSTM</div>
                            <p className="font-[family-name:var(--font-cormorant)] text-sm italic text-stone">Intelligence = Memory</p>
                        </div>
                        <div>
                            <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.4em] text-gold-dim mb-1">Transformer</div>
                            <p className="font-[family-name:var(--font-cormorant)] text-sm italic text-parchment-3">Intelligence = Attention</p>
                        </div>
                        <div className="w-4" />
                    </div>
                    {comparison.map((row, i) => {
                        const isOpen = open === i;
                        return (
                            <div key={i} className="border-b border-gold-muted/10 last:border-b-0">
                                <button
                                    onClick={() => setOpen(isOpen ? null : i)}
                                    className="w-full grid grid-cols-[1fr_1fr_1fr_auto] gap-4 px-6 py-5 text-left bg-surface-alt/75 hover:bg-surface-alt transition-colors"
                                >
                                    <p className="font-[family-name:var(--font-cormorant)] text-base text-parchment-2">{row.concept}</p>
                                    <p className="font-[family-name:var(--font-cormorant)] text-base text-stone">{row.rnn}</p>
                                    <p className="font-[family-name:var(--font-cormorant)] text-base text-parchment-3">{row.transformer}</p>
                                    <span
                                        className="font-[family-name:var(--font-plex)] text-[10px] text-gold/40 self-center transition-transform duration-200"
                                        style={{ display: 'inline-block', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                                    >
                                        ›
                                    </span>
                                </button>
                                {isOpen && (
                                    <div className="px-6 py-5 bg-void/60 border-t border-gold-muted/10">
                                        <p className="font-[family-name:var(--font-cormorant)] text-base leading-7 text-stone max-w-2xl">
                                            {row.detail}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* outcomes — why transformers won + tradeoff merged */}
                <div className="mt-8 border border-gold-muted/20">
                    <div className="bg-surface/80 px-8 py-5 border-b border-gold-muted/15">
                        <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.5em] text-gold-dim">
                            Why Transformers Won
                        </div>
                        <p className="mt-2 font-[family-name:var(--font-cormorant)] text-sm text-stone">
                            The trade: more compute for more capability.
                        </p>
                    </div>
                    <div className="grid grid-cols-3 bg-surface/60 px-8 py-3 border-b border-gold-muted/10">
                        <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.35em] text-gold-dim">Feature</div>
                        <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.35em] text-gold-dim">RNN</div>
                        <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.35em] text-gold-dim">Transformer</div>
                    </div>
                    {outcomes.map((row) => (
                        <div
                            key={row.feature}
                            className="grid grid-cols-3 px-8 py-4 border-b border-gold-muted/10 last:border-b-0 bg-surface-alt/75 hover:bg-surface-alt transition-colors"
                        >
                            <p className="font-[family-name:var(--font-cormorant)] text-base text-parchment-2">{row.feature}</p>
                            <p className="font-[family-name:var(--font-cormorant)] text-base text-stone">{row.rnn}</p>
                            <p className="font-[family-name:var(--font-cormorant)] text-base text-parchment-3">{row.transformer}</p>
                        </div>
                    ))}
                </div>

                {/* knowledge access */}
                <div className="mt-8 border border-gold-muted/20">
                    <div className="bg-surface/80 px-8 py-5 border-b border-gold-muted/15">
                        <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.5em] text-gold-dim">
                            Knowledge Access
                        </div>
                    </div>
                    <div className="grid grid-cols-2 bg-surface/60 px-8 py-3 border-b border-gold-muted/10">
                        <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.35em] text-gold-dim">Architecture</div>
                        <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.35em] text-gold-dim">Knowledge Access</div>
                    </div>
                    {knowledge.map((row, i) => (
                        <div
                            key={i}
                            className={`grid grid-cols-2 px-8 py-4 border-b border-gold-muted/10 last:border-b-0 transition-colors ${row.future ? 'bg-void/60 hover:bg-void/80' : 'bg-surface-alt/75 hover:bg-surface-alt'}`}
                        >
                            <p className={`font-[family-name:var(--font-cormorant)] text-base ${row.future ? 'text-gold/50 italic' : 'text-parchment-2'}`}>
                                {row.arch}
                            </p>
                            <p className={`font-[family-name:var(--font-cormorant)] text-base ${row.future ? 'text-gold/60 italic' : 'text-parchment-3'}`}>
                                {row.access}
                            </p>
                        </div>
                    ))}
                </div>

                {/* closing note */}
                <div className="mt-8 border border-gold-muted/20 bg-surface/80 p-7">
                    <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.5em] text-gold-dim mb-4">
                        The Inversion
                    </div>
                    <p className="font-[family-name:var(--font-cormorant)] text-xl leading-9 text-parchment-3 max-w-3xl">
                        RNNs asked: <span className="text-parchment italic">&ldquo;What do I remember?&rdquo;</span><br />
                        Transformers asked: <span className="text-gold italic">&ldquo;What should I look at?&rdquo;</span>
                    </p>
                    <p className="mt-5 max-w-3xl font-[family-name:var(--font-cormorant)] text-lg leading-8 text-stone">
                        The dominant system accumulates pressure at its point of greatest strength until that strength
                        becomes the failure mode. The successor is almost always the structural opposite — and almost
                        always dismissed until it isn&apos;t.
                    </p>
                </div>

                <div className="h-16" />
            </section>
        </main>
    );
}
