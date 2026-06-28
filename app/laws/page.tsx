import Link from 'next/link';

const laws = [
    {
        slug: 'o1',
        number: 'O1',
        title: 'Law of Opposites',
        axiom: 'Once a cycle reaches its climax, the opposite happens next.',
        description: 'Saturation does not just slow a trend — it produces the emotional and cultural conditions for its own inversion.',
    },
    {
        slug: 'o2',
        number: 'O2',
        title: 'Law of the Obvious',
        axiom: 'The next trend is usually very obvious.',
        description: 'The future belongs to the youth.',
    },
    {
        slug: 'o3',
        number: 'O3',
        title: 'Law of Outliers',
        axiom: 'Power-law systems concentrate rewards into a very small number of winners.',
        description: 'Every major cycle produces a dominant vehicle that captures the majority of value.',
    },
];

export default function LawsPage() {
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
                <div className="mt-8 border border-gold-muted/20 bg-surface/80 p-7">
                    <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim">
                        Framework
                    </div>
                    <p className="mt-5 max-w-3xl font-[family-name:var(--font-cormorant)] text-xl leading-9 text-parchment-3">
                        Three laws. Not invented — observed. They emerged from repeatedly watching the same patterns across culture, technology, wealth, and behavior.
                    </p>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {laws.map((law) => (
                        <Link
                            key={law.slug}
                            href={`/laws/${law.slug}`}
                            className="group flex flex-col border border-gold-muted/20 bg-surface-alt/75 p-6 transition-colors hover:border-gold-muted/50 hover:bg-surface-alt"
                        >
                            <span className="font-[family-name:var(--font-cinzel)] text-xl text-gold">
                                {law.number}
                            </span>
                            <h2 className="mt-3 font-[family-name:var(--font-cinzel)] text-lg tracking-[0.04em] text-parchment-2">
                                {law.title}
                            </h2>
                            <p className="mt-2 font-[family-name:var(--font-cormorant)] text-lg italic text-gold/60">
                                &ldquo;{law.axiom}&rdquo;
                            </p>
                            <p className="mt-2 font-[family-name:var(--font-cormorant)] text-base leading-7 text-stone flex-1">
                                {law.description}
                            </p>
                            <div className="mt-4 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] text-gold-dim group-hover:text-gold transition-colors">
                                Enter →
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="h-16" />
            </section>
        </main>
    );
}
