type Chapter = {
    number: string;
    title: string;
    subtitle: string;
    premise: string;
    questions: string[];
    insight: string;
    laws: string[];
    tags: string[];
    above?: string[];
    below?: string[];
};

const chapters: Chapter[] = [
    {
        number: 'I',
        title: 'The Pattern',
        subtitle: 'Something Strange Is Happening',
        premise: 'Buffett missed tech. Bitcoin had no founder. Creators replaced institutions. Tiny things became massive. The reader keeps asking: why are outcomes becoming so disproportionate?',
        questions: [
            'Why did the greatest investor in America miss the most profitable industry?',
            'How did an internet currency with no founder become the best-performing asset of the century?',
            'Why are tiny aligned actions producing outcomes that decades of effort could not?',
        ],
        insight: 'The modern world is no longer behaving linearly. Small aligned actions are creating disproportionately large outcomes. 1 + 1 no longer equals 2. It equals 11. Compound asymmetry.',
        laws: ['Compound Asymmetry'],
        tags: [],
    },
    {
        number: 'II',
        title: 'O1 — Opposites',
        subtitle: 'Every Dominant Cycle Creates Its Inverse',
        premise: 'Placeholder.',
        questions: [
            'Placeholder question.',
        ],
        insight: 'Placeholder insight.',
        laws: ['O1 — Law of Opposites'],
        tags: [],
        above: [
            'Placeholder above item.',
        ],
        below: [
            'Placeholder below item.',
        ],
    },
    {
        number: 'III',
        title: 'O2 — The Obvious',
        subtitle: 'See What the World Has Already Become',
        premise: 'Placeholder.',
        questions: [
            'Placeholder question.',
        ],
        insight: 'Placeholder insight.',
        laws: ['O2 — Law of the Obvious'],
        tags: [],
        above: [
            'Placeholder above item.',
        ],
        below: [
            'Placeholder below item.',
        ],
    },
    {
        number: 'IV',
        title: 'O3 — Outliers',
        subtitle: 'Where the Energy Concentrates',
        premise: 'Placeholder.',
        questions: [
            'Placeholder question.',
        ],
        insight: 'Placeholder insight.',
        laws: ['O3 — Law of Outliers'],
        tags: [],
        above: [
            'Placeholder above item.',
        ],
        below: [
            'Placeholder below item.',
        ],
    },
    {
        number: 'V',
        title: 'Navigation',
        subtitle: 'A Framework for Changing Environments',
        premise: 'Placeholder.',
        questions: [
            'Placeholder question.',
        ],
        insight: 'Placeholder insight.',
        laws: ['O1 — Law of Opposites', 'O2 — Law of the Obvious', 'O3 — Law of Outliers', 'Compound Asymmetry'],
        tags: [],
    },
];

export default function O3TheoryPage() {
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
                {/* premise banner */}
                <div className="mt-8 border border-gold-muted/20 bg-surface/80 p-7">
                    <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim">
                        The Book
                    </div>
                    <p className="mt-5 max-w-3xl font-[family-name:var(--font-cormorant)] text-xl leading-9 text-parchment-3">
                        Placeholder.
                    </p>
                </div>

                {/* chapter list */}
                <div className="mt-8 space-y-px border border-gold-muted/20">
                    {chapters.map((ch) => (
                        <div
                            key={ch.number}
                            className="group bg-surface-alt/75 px-6 py-8 hover:bg-surface-alt transition-colors"
                        >
                            <div className="flex items-baseline gap-6">
                                {/* chapter number */}
                                <span className="font-[family-name:var(--font-cinzel)] text-sm text-gold/50 tabular-nums shrink-0 w-6">
                                    {ch.number}
                                </span>

                                <div className="flex-1">
                                    {/* title row */}
                                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                                        <span className="font-[family-name:var(--font-cinzel)] text-lg tracking-[0.04em] text-parchment-2">
                                            {ch.title}
                                        </span>
                                        <span className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-stone">
                                            {ch.subtitle}
                                        </span>
                                    </div>

                                    {/* premise */}
                                    <p className="mt-4 max-w-3xl font-[family-name:var(--font-cormorant)] text-base leading-7 text-parchment-3">
                                        {ch.premise}
                                    </p>

                                    {/* questions */}
                                    <div className="mt-5">
                                        <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.45em] text-gold-dim mb-3">
                                            Questions
                                        </div>
                                        <ul className="space-y-2">
                                            {ch.questions.map((q) => (
                                                <li
                                                    key={q}
                                                    className="flex items-start gap-3 font-[family-name:var(--font-cormorant)] text-base leading-6 text-stone"
                                                >
                                                    <span className="mt-[3px] shrink-0 text-gold/40 text-xs">—</span>
                                                    {q}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* insight */}
                                    <div className="mt-5 border-l border-gold-muted/25 pl-5">
                                        <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.45em] text-gold-dim mb-2">
                                            Core Insight
                                        </div>
                                        <p className="font-[family-name:var(--font-cormorant)] text-base leading-7 text-stone">
                                            {ch.insight}
                                        </p>
                                    </div>

                                    {/* above / below */}
                                    {(ch.above || ch.below) && (
                                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                                            {ch.above && (
                                                <div className="border border-gold-muted/15 bg-void/40 p-5">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.5em] text-gold-dim">
                                                            Above
                                                        </div>
                                                        <div className="flex-1 h-px bg-gold-muted/15" />
                                                        <span className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.4em] text-muted/50">
                                                            Civilisation
                                                        </span>
                                                    </div>
                                                    <ul className="space-y-2">
                                                        {ch.above.map((item) => (
                                                            <li
                                                                key={item}
                                                                className="flex items-start gap-2 font-[family-name:var(--font-cormorant)] text-sm leading-6 text-stone"
                                                            >
                                                                <span className="mt-[2px] shrink-0 text-gold/30 text-[10px]">↑</span>
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {ch.below && (
                                                <div className="border border-gold-muted/15 bg-void/40 p-5">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.5em] text-gold-dim">
                                                            Below
                                                        </div>
                                                        <div className="flex-1 h-px bg-gold-muted/15" />
                                                        <span className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.4em] text-muted/50">
                                                            Individual
                                                        </span>
                                                    </div>
                                                    <ul className="space-y-2">
                                                        {ch.below.map((item) => (
                                                            <li
                                                                key={item}
                                                                className="flex items-start gap-2 font-[family-name:var(--font-cormorant)] text-sm leading-6 text-stone"
                                                            >
                                                                <span className="mt-[2px] shrink-0 text-gold/30 text-[10px]">↓</span>
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* laws */}
                                    {ch.laws.length > 0 && (
                                        <div className="mt-5 flex flex-wrap items-center gap-2">
                                            {ch.laws.map((law) => (
                                                <span
                                                    key={law}
                                                    className="border border-gold-muted/35 px-3 py-1 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.3em] text-gold-dim"
                                                >
                                                    {law}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* hermetic bridge */}
                <div className="mt-8 border border-gold-muted/20 bg-surface/80 p-7 text-center">
                    <p className="font-[family-name:var(--font-cinzel)] text-sm tracking-[0.25em] text-gold/60">
                        As above, so below.
                    </p>
                    <p className="mt-3 font-[family-name:var(--font-cormorant)] text-base leading-7 text-stone max-w-xl mx-auto">
                        Placeholder.
                    </p>
                </div>

                <div className="h-16" />
            </section>
        </main>
    );
}
