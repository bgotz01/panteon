import Link from 'next/link';
import ArchiveHeader from '@/components/ArchiveHeader';

const principles = [
    {
        number: 'I',
        name: 'Mentalism',
        axiom: 'The All is Mind.',
        description: 'The universe is fundamentally mental in nature. Reality originates from consciousness or mind.',
        example: 'Thoughts, beliefs, and perceptions shape how we experience the world.',
        examples: [],
    },
    {
        number: 'II',
        name: 'Correspondence',
        axiom: 'As above, so below; as below, so above.',
        description: 'Patterns repeat across different levels of reality. The microcosm reflects the macrocosm.',
        example: 'Human psychology may mirror broader patterns found in society or nature.',
        examples: [],
    },
    {
        number: 'III',
        name: 'Vibration',
        axiom: 'Nothing rests; everything moves.',
        description: 'Everything is in motion and vibrates at some frequency, whether physical, mental, or spiritual.',
        example: 'Matter, energy, emotions, and thoughts are all viewed as differing rates of vibration.',
        examples: [],
    },
    {
        number: 'IV',
        name: 'Polarity',
        axiom: 'Everything is dual.',
        description: 'Opposites are actually extremes of the same thing. They exist on the same continuum and can transform into one another.',
        example: '',
        examples: ['Hot ↔ Cold', 'Light ↔ Dark', 'Love ↔ Hate'],
    },
    {
        number: 'V',
        name: 'Rhythm',
        axiom: 'Everything flows, out and in.',
        description: 'Life moves in cycles and pendulum-like swings. Hermetic practice aims to understand and balance these rhythms.',
        example: '',
        examples: ['Seasons', 'Economic booms and recessions', 'Emotional highs and lows'],
    },
    {
        number: 'VI',
        name: 'Cause and Effect',
        axiom: 'Every cause has its effect; every effect has its cause.',
        description: 'Nothing happens by chance. Events arise from chains of causation.',
        example: 'Decisions, habits, and actions produce corresponding outcomes.',
        examples: [],
    },
    {
        number: 'VII',
        name: 'Gender',
        axiom: 'Gender is in everything.',
        description: 'This principle refers less to biological sex and more to complementary creative forces — masculine and feminine energies. In Hermetic thought, creation occurs through their interaction.',
        example: '',
        examples: ['Active and receptive', 'Projective and nurturing', 'Logic and intuition'],
    },
];

export default function HermeticPrinciplesPage() {
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
                {/* origin note */}
                <ArchiveHeader
                    eyebrow="Hermes Trismegistus · The Kybalion, 1908"
                    title="The Hermetic Principles"
                    description="Attributed to Hermes Trismegistus. Codified in The Kybalion (1908). Seven laws describing the structure of reality — from the nature of mind to the mechanics of creation."
                />

                {/* principles */}
                <div className="mt-8 space-y-px border border-gold-muted/20">
                    {principles.map((p) => (
                        <article key={p.number} className="bg-surface-alt/75 px-8 py-7 hover:bg-surface-alt transition-colors">
                            <div className="flex items-start gap-6">
                                {/* number */}
                                <div className="shrink-0 font-[family-name:var(--font-cinzel)] text-2xl text-gold w-8">
                                    {p.number}
                                </div>

                                <div className="flex-1">
                                    {/* name + axiom */}
                                    <div className="flex flex-wrap items-baseline gap-4">
                                        <h2 className="font-[family-name:var(--font-cinzel)] text-lg tracking-[0.04em] text-parchment-2">
                                            {p.name}
                                        </h2>
                                        <span className="font-[family-name:var(--font-cormorant)] text-lg italic text-gold/70">
                                            &ldquo;{p.axiom}&rdquo;
                                        </span>
                                    </div>

                                    {/* description */}
                                    <p className="mt-3 font-[family-name:var(--font-cormorant)] text-lg leading-7 text-parchment-3">
                                        {p.description}
                                    </p>

                                    {/* single example */}
                                    {p.example && (
                                        <p className="mt-3 font-[family-name:var(--font-cormorant)] text-base leading-6 text-stone">
                                            <span className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.4em] text-gold-dim mr-3">eg.</span>
                                            {p.example}
                                        </p>
                                    )}

                                    {/* list examples */}
                                    {p.examples.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-3">
                                            {p.examples.map((ex) => (
                                                <span
                                                    key={ex}
                                                    className="border border-gold-muted/20 px-3 py-1 font-[family-name:var(--font-cormorant)] text-base text-stone"
                                                >
                                                    {ex}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="h-16" />
            </section>
        </main>
    );
}
