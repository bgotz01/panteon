import Link from 'next/link';

const inversions = [
    {
        group: 'Ideas → Systems',
        description: 'Greece generated the foundational questions of Western thought. Rome took those questions and replaced them with answers — codified, enforced, and scaled.',
        rows: [
            { axis: 'Intellectual output', greek: 'Philosophy', roman: 'Law' },
            { axis: 'Primary drive', greek: 'Discovery', roman: 'Administration' },
            { axis: 'Currency of prestige', greek: 'Knowledge', roman: 'Institutions' },
            { axis: 'Celebrated figure', greek: 'Thinkers', roman: 'Builders' },
            { axis: 'Legacy aspiration', greek: 'Culture', roman: 'Civilisation' },
        ],
    },
    {
        group: 'Idealism → Pragmatism',
        description: 'Greek thought reached toward the ideal form. Roman thought asked what works, what scales, what holds an empire together across centuries.',
        rows: [
            { axis: 'Architectural goal', greek: 'Beauty', roman: 'Utility' },
            { axis: 'Method of inquiry', greek: 'Theory', roman: 'Practice' },
            { axis: 'Mode of reasoning', greek: 'Abstract', roman: 'Concrete' },
            { axis: 'Standard of achievement', greek: 'Excellence', roman: 'Effectiveness' },
            { axis: 'Ultimate measure', greek: 'Truth', roman: 'Results' },
        ],
    },
    {
        group: 'Individual → Institution',
        description: 'The Greek world glorified the singular exceptional man. Rome subordinated the individual entirely to the collective machine.',
        rows: [
            { axis: 'Military unit of identity', greek: 'Hero', roman: 'Legion' },
            { axis: 'Political unit', greek: 'City-State', roman: 'Empire' },
            { axis: 'Subject of civic life', greek: 'Citizen', roman: 'Citizenry' },
            { axis: 'Highest personal aspiration', greek: 'Personal Glory', roman: 'Collective Duty' },
            { axis: 'Organising dynamic', greek: 'Competition', roman: 'Unity' },
        ],
    },
    {
        group: 'Freedom → Order',
        description: 'Athenian democracy celebrated the freedom to argue, dissent, and persuade. Rome replaced persuasion with hierarchy — debate became command.',
        rows: [
            { axis: 'Political mechanism', greek: 'Debate', roman: 'Command' },
            { axis: 'Governing structure', greek: 'Democracy', roman: 'Hierarchy' },
            { axis: 'Method of governance', greek: 'Persuasion', roman: 'Authority' },
            { axis: 'Civic value', greek: 'Independence', roman: 'Discipline' },
            { axis: 'Organising principle', greek: 'Autonomy', roman: 'Standardisation' },
        ],
    },
];

export default function GreeceRomePage() {
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
                {/* breadcrumb */}
                <div className="mt-8 flex items-center gap-2 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-muted">
                    <Link href="/laws/o1" className="hover:text-stone transition-colors">O1 · Law of Opposites</Link>
                    <span className="text-muted/40">→</span>
                    <span className="text-gold-dim">Greece → Rome</span>
                </div>

                {/* header */}
                <div className="mt-6 border border-gold-muted/20 bg-surface/80 p-7">
                    <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim">
                        O1 · Case Study · Civilisations
                    </div>
                    <h1 className="mt-4 font-[family-name:var(--font-cinzel)] text-3xl tracking-[0.04em] text-parchment-2">
                        Greece → Rome
                    </h1>
                    <p className="mt-4 font-[family-name:var(--font-cormorant)] text-xl italic text-gold/60">
                        The most documented civilisational inversion in history.
                    </p>
                    <p className="mt-3 font-[family-name:var(--font-cormorant)] text-base leading-7 text-stone/70 max-w-2xl">
                        Rome did not merely succeed Greece — it systematically inverted its dominant characteristic on every axis that mattered. Greece gave the world ideas. Rome gave the world systems to contain them.
                    </p>
                </div>

                {/* inversion groups */}
                <div className="mt-8 space-y-8">
                    {inversions.map((section, si) => (
                        <div key={si} className="border border-gold-muted/20 bg-void/40">
                            {/* group header */}
                            <div className="border-b border-gold-muted/15 px-6 py-5">
                                <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.5em] text-gold/50 mb-2">
                                    Main Inversion
                                </div>
                                <h2 className="font-[family-name:var(--font-cinzel)] text-lg tracking-[0.06em] text-parchment-2 mb-3">
                                    {section.group}
                                </h2>
                                <p className="font-[family-name:var(--font-cormorant)] text-base leading-6 text-stone/60 max-w-2xl">
                                    {section.description}
                                </p>
                            </div>

                            {/* column headers */}
                            <div className="grid border-b border-gold-muted/15" style={{ gridTemplateColumns: '1.2fr 1fr 1fr' }}>
                                <div className="px-6 py-3 font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.5em] text-gold-dim border-r border-gold-muted/10">
                                    Axis
                                </div>
                                <div className="px-6 py-3 font-[family-name:var(--font-cinzel)] text-sm tracking-[0.08em] text-stone/70 border-r border-gold-muted/10">
                                    Greece
                                </div>
                                <div className="px-6 py-3 font-[family-name:var(--font-cinzel)] text-sm tracking-[0.08em] text-parchment-2">
                                    Rome
                                </div>
                            </div>

                            {/* data rows */}
                            {section.rows.map((row, ri) => (
                                <div
                                    key={ri}
                                    className="grid border-b border-gold-muted/10 last:border-b-0 hover:bg-surface/30 transition-colors"
                                    style={{ gridTemplateColumns: '1.2fr 1fr 1fr' }}
                                >
                                    <div className="px-6 py-4 border-r border-gold-muted/10">
                                        <span className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.35em] text-muted/60">
                                            {row.axis}
                                        </span>
                                    </div>
                                    <div className="px-6 py-4 border-r border-gold-muted/10 flex items-center">
                                        <span className="font-[family-name:var(--font-cormorant)] text-lg text-stone/70">
                                            {row.greek}
                                        </span>
                                    </div>
                                    <div className="px-6 py-4 flex items-center">
                                        <span className="font-[family-name:var(--font-cormorant)] text-lg text-parchment-3">
                                            {row.roman}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* back link */}
                <div className="mt-10 mb-16">
                    <Link
                        href="/laws/o1"
                        className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-muted hover:text-stone transition-colors"
                    >
                        ← Back to O1
                    </Link>
                </div>
            </section>
        </main>
    );
}
