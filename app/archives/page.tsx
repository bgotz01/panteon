import Link from 'next/link';

const collections = [
    {
        slug: 'hermetic-principles',
        number: 'I',
        title: 'The Hermetic Principles',
        description: 'Seven laws attributed to Hermes Trismegistus, preserved in the Kybalion. A foundational map of how reality is structured.',
        count: '7 principles',
    },
    {
        slug: 'dante',
        number: 'II',
        title: "Dante's Inferno",
        description: 'The nine circles of Hell from the Divine Comedy — a taxonomy of human failure, descending by degree of moral corruption.',
        count: '9 circles',
    },
    {
        slug: 'iliad-odyssey',
        number: 'III',
        title: 'Iliad & Odyssey',
        description: 'Two epics, one war. Rage against endurance. Glory against home. The perfect warrior against the complete ruler.',
        count: 'Homer · c. 8th century BC',
    },
    {
        slug: 'aeneid',
        number: 'IV',
        title: 'Aeneid',
        description: "Rome's answer to Homer. Both epics in sequence — the Odyssey first, then the Iliad — with Rome as the destination.",
        count: 'Virgil · c. 29–19 BC',
    },
    {
        slug: 'books',
        number: 'V',
        title: 'Books',
        description: 'Analyses of books through the lens of power, pattern, and principle.',
        count: '1 book',
    },
];

export default function ArchivesPage() {
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
                {/* description */}
                <div className="mt-8 border border-gold-muted/20 bg-surface/80 p-7">
                    <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim">
                        Purpose
                    </div>
                    <p className="mt-5 max-w-3xl font-[family-name:var(--font-cormorant)] text-xl leading-9 text-parchment-3">
                        Principles and frameworks that already exist in the world — collected here for reference and cross-examination. Not authored. Preserved.
                    </p>
                </div>

                {/* collections */}
                <div className="mt-8 space-y-4">
                    {collections.map((col) => (
                        <Link
                            key={col.slug}
                            href={`/archives/${col.slug}`}
                            className="group flex items-start justify-between border border-gold-muted/20 bg-surface-alt/75 p-6 transition-colors hover:border-gold-muted/50 hover:bg-surface-alt"
                        >
                            <div className="flex items-start gap-6">
                                <span className="font-[family-name:var(--font-cinzel)] text-xl text-gold">
                                    {col.number}
                                </span>
                                <div>
                                    <h2 className="font-[family-name:var(--font-cinzel)] text-lg tracking-[0.04em] text-parchment-2">
                                        {col.title}
                                    </h2>
                                    <p className="mt-2 max-w-xl font-[family-name:var(--font-cormorant)] text-lg leading-7 text-stone">
                                        {col.description}
                                    </p>
                                    <div className="mt-4 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] text-gold-dim group-hover:text-gold transition-colors">
                                        Enter →
                                    </div>
                                </div>
                            </div>
                            <span className="ml-6 shrink-0 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.35em] text-muted">
                                {col.count}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
