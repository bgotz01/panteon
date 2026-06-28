const outlierExamples = [
    {
        subject: 'Noah',
        premise: 'Noah had to build an ark to save the human race. But:',
        points: [
            'Prior to the flood there was no rain — God irrigated the earth from the ground up.',
            'Noah lived far from the ocean with no shipbuilding tradition.',
            'He had to round up animals from across the entire earth.',
            'It took 120 years to build the ark.',
        ],
    },
];

const above = [
    'Placeholder above item.',
];

const below = [
    'Placeholder below item.',
];

export default function O3Page() {
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
                        O3 · Third Law
                    </div>
                    <h1 className="mt-4 font-[family-name:var(--font-cinzel)] text-3xl tracking-[0.04em] text-parchment-2">
                        Law of Outliers
                    </h1>
                    <p className="mt-4 font-[family-name:var(--font-cormorant)] text-xl italic text-gold/60">
                        &ldquo;Power-law systems concentrate rewards into a very small number of winners.&rdquo;
                    </p>
                    <p className="mt-5 max-w-3xl font-[family-name:var(--font-cormorant)] text-lg leading-8 text-parchment-3">
                        Placeholder.
                    </p>
                </div>

                {/* summary */}
                <div className="mt-8 border border-gold-muted/20 bg-surface/80 p-7">
                    <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.5em] text-gold-dim mb-5">
                        Summary
                    </div>
                    <ul className="space-y-3">
                        {[
                            'Violates the current worldview despite it being an obvious solution.',
                            'The greatest opportunities lie furthest from the crowd.',
                            'The pattern: Heresy → System → Empire.',
                        ].map((pt) => (
                            <li key={pt} className="flex items-center gap-3 font-[family-name:var(--font-cormorant)] text-lg leading-7 text-parchment-3">
                                <span className="shrink-0 text-gold/40 text-[9px]">◆</span>
                                {pt}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* example boxes */}
                <div className="mt-8">
                    <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.5em] text-gold-dim mb-4">
                        Examples
                    </div>
                    <div className="space-y-px border border-gold-muted/20">
                        {outlierExamples.map((ex) => (
                            <div key={ex.subject} className="bg-surface-alt/75 px-8 py-7 hover:bg-surface-alt transition-colors">
                                <div className="font-[family-name:var(--font-cinzel)] text-sm tracking-[0.08em] text-parchment-2 mb-4">
                                    {ex.subject}
                                </div>
                                <p className="font-[family-name:var(--font-cormorant)] text-lg leading-7 text-parchment-2 mb-4">
                                    {ex.premise}
                                </p>
                                <ul className="space-y-2">
                                    {ex.points.map((pt) => (
                                        <li key={pt} className="flex items-center gap-3 font-[family-name:var(--font-cormorant)] text-lg leading-7 text-parchment-3">
                                            <span className="shrink-0 text-gold/40 text-[9px]">◆</span>
                                            {pt}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* above / below */}
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <div className="border border-gold-muted/15 bg-void/40 p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.5em] text-gold-dim">
                                Above
                            </div>
                            <div className="flex-1 h-px bg-gold-muted/15" />
                            <span className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.4em] text-muted/50">
                                Civilisation
                            </span>
                        </div>
                        <ul className="space-y-3">
                            {above.map((item) => (
                                <li key={item} className="flex items-start gap-2 font-[family-name:var(--font-cormorant)] text-base leading-7 text-stone">
                                    <span className="mt-[3px] shrink-0 text-gold/30 text-[10px]">↑</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="border border-gold-muted/15 bg-void/40 p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.5em] text-gold-dim">
                                Below
                            </div>
                            <div className="flex-1 h-px bg-gold-muted/15" />
                            <span className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.4em] text-muted/50">
                                Individual
                            </span>
                        </div>
                        <ul className="space-y-3">
                            {below.map((item) => (
                                <li key={item} className="flex items-start gap-2 font-[family-name:var(--font-cormorant)] text-base leading-7 text-stone">
                                    <span className="mt-[3px] shrink-0 text-gold/30 text-[10px]">↓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="h-16" />
            </section>
        </main>
    );
}
