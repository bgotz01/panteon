import ArchiveHeader from '@/components/ArchiveHeader';

const circles = [
    {
        number: 1,
        name: 'Limbo',
        sin: 'Virtuous non-Christians, unbaptized infants',
        punishment: 'No physical torture, but eternal separation from God.',
    },
    {
        number: 2,
        name: 'Lust',
        sin: 'Those ruled by sexual desire',
        punishment: 'Blown endlessly through violent winds, symbolizing lack of self-control.',
    },
    {
        number: 3,
        name: 'Gluttony',
        sin: 'Overindulgence in food and drink',
        punishment: 'Forced to lie in freezing, filthy rain while guarded by the monstrous Cerberus.',
    },
    {
        number: 4,
        name: 'Greed',
        sin: 'Hoarders and spendthrifts',
        punishment: 'Push enormous weights against one another forever.',
    },
    {
        number: 5,
        name: 'Wrath',
        sin: 'The wrathful and the sullen',
        punishment: 'The wrathful fight on the surface of the river Styx; the sullen gurgle beneath it.',
    },
    {
        number: 6,
        name: 'Heresy',
        sin: 'Those who denied fundamental religious truths',
        punishment: 'Trapped in burning tombs.',
    },
    {
        number: 7,
        name: 'Violence',
        sin: 'Violence against others, self, or God',
        punishment: 'Divided into three rings with punishments matching each form of violence.',
    },
    {
        number: 8,
        name: 'Fraud',
        sin: 'Deceivers and manipulators',
        punishment: 'Ten separate ditches ("bolge"), each for a different kind of fraud.',
        subtitle: 'Malebolge',
    },
    {
        number: 9,
        name: 'Treachery',
        sin: 'Betrayal of those closest to you',
        punishment: 'Frozen in a lake of ice, with the worst traitors nearest Satan.',
    },
];

const circle7Rings = [
    {
        label: 'Violence against others',
        sinners: ['Murderers', 'Tyrants', 'Warmongers'],
        punishment: 'Submerged in a river of boiling blood, guarded by centaurs with arrows.',
    },
    {
        label: 'Violence against oneself',
        sinners: ['Suicides', 'Those who destroyed their own possessions'],
        punishment: 'Transformed into thorny trees; torn apart by harpies.',
    },
    {
        label: 'Violence against God, nature, and art',
        sinners: ['Blasphemers', 'Sodomites', 'Usurers'],
        punishment: 'Forced to walk or lie on burning sand under a rain of fire.',
    },
];

const circle8Bolge = [
    { sin: 'Seducers and pimps', punishment: 'Whipped by horned demons as they march.' },
    { sin: 'Flatterers', punishment: 'Submerged in human excrement.' },
    { sin: 'Simoniacs (those who sold church offices)', punishment: 'Buried headfirst in holes, feet set aflame.' },
    { sin: 'Fortune tellers and false prophets', punishment: 'Heads twisted backward, forced to walk blind.' },
    { sin: 'Corrupt politicians', punishment: 'Submerged in boiling pitch, torn by demons.' },
    { sin: 'Hypocrites', punishment: 'Forced to walk in gilded lead cloaks.' },
    { sin: 'Thieves', punishment: 'Chased and bitten by serpents; bodies fused with them.' },
    { sin: 'Fraudulent advisers', punishment: 'Encased in individual flames.' },
    { sin: 'Sowers of discord', punishment: 'Hacked apart by a sword-wielding demon; wounds re-heal to be cut again.' },
    { sin: 'Falsifiers (counterfeiters, liars, impostors)', punishment: 'Afflicted with diseases — leprosy, fever, blindness.' },
];

const circle9Zones = [
    { name: 'Caina', description: 'Betrayers of family', punishment: 'Frozen up to the neck, heads bowed.' },
    { name: 'Antenora', description: 'Betrayers of country', punishment: 'Frozen up to the neck, heads fixed forward.' },
    { name: 'Ptolomea', description: 'Betrayers of guests', punishment: 'Frozen on their backs, faces upward, tears freezing in their eyes.' },
    { name: 'Judecca', description: 'Betrayers of benefactors and masters', punishment: 'Completely encased in ice, contorted.' },
];

const satanMouths = [
    { name: 'Judas Iscariot', note: 'betrayed Jesus' },
    { name: 'Marcus Junius Brutus', note: 'betrayed Julius Caesar' },
    { name: 'Gaius Cassius Longinus', note: 'betrayed Julius Caesar' },
];

// Roman numerals for display
const toRoman = (n: number) => {
    const map: [number, string][] = [
        [9, 'IX'], [8, 'VIII'], [7, 'VII'], [6, 'VI'], [5, 'V'],
        [4, 'IV'], [3, 'III'], [2, 'II'], [1, 'I'],
    ];
    for (const [val, num] of map) if (n >= val) return num;
    return '';
};

export default function DantePage() {
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
                <ArchiveHeader
                    eyebrow="Dante Alighieri · Divine Comedy, c. 1308–1320"
                    title="Dante's Inferno"
                />

                {/* moral structure */}
                <div className="mt-6 border border-gold-muted/20 bg-surface/80 p-7">
                    <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim mb-6">
                        The 9 Circles of Hell
                    </div>
                    <p className="font-[family-name:var(--font-cormorant)] text-xl leading-9 text-parchment-2 text-center">
                        Hell progresses from failures of self-control to deliberate misuse of reason.
                    </p>
                    <div className="mt-6">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/9-circles.png"
                            alt="Diagram of Dante's nine circles of Hell"
                            className="w-full h-auto"
                        />
                    </div>
                    <p className="mt-6 font-[family-name:var(--font-cormorant)] text-xl leading-9 text-parchment-2 text-center">
                        Betrayal is the gravest sin because it destroys the trust that makes families, friendships, societies, and civilizations possible.
                    </p>
                </div>

                {/* column headers */}
                <div className="mt-10 grid grid-cols-[2.5rem_1fr_1fr] gap-x-8 px-8 py-3 border border-b-0 border-gold-muted/20 bg-surface/60">
                    <div />
                    <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] text-gold-dim">Sin</div>
                    <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] text-gold-dim">Punishment</div>
                </div>

                {/* circles */}
                <div className="space-y-px border border-gold-muted/20">
                    {circles.map((c) => (
                        <article
                            key={c.number}
                            className="bg-surface-alt/75 px-8 py-7 hover:bg-surface-alt transition-colors"
                        >
                            {/* top row: number / sin / punishment */}
                            <div className="grid grid-cols-[2.5rem_1fr_1fr] gap-x-8 items-start">
                                <div className="font-[family-name:var(--font-cinzel)] text-2xl text-gold">
                                    {toRoman(c.number)}
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-baseline gap-3">
                                        <h2 className="font-[family-name:var(--font-cinzel)] text-lg tracking-[0.04em] text-parchment-2">
                                            {c.name}
                                        </h2>
                                        {c.subtitle && (
                                            <span className="font-[family-name:var(--font-cormorant)] text-base italic text-gold/60">
                                                {c.subtitle}
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-2 font-[family-name:var(--font-cormorant)] text-lg leading-7 text-parchment-3">
                                        {c.sin}
                                    </p>
                                </div>
                                <div>
                                    <p className="font-[family-name:var(--font-cormorant)] text-base leading-6 text-stone">
                                        {c.punishment}
                                    </p>
                                </div>
                            </div>

                            {/* expandable: Circle 7 — full width below, aligned to sin/punishment columns */}
                            {c.number === 7 && (
                                <details className="mt-4 group">
                                    <summary className="grid grid-cols-[2.5rem_1fr_1fr] gap-x-8 cursor-pointer list-none select-none">
                                        <div />
                                        <div className="flex items-center gap-2 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] text-gold-dim hover:text-gold transition-colors col-span-2">
                                            <span className="inline-block transition-transform group-open:rotate-90">›</span>
                                            The Three Rings
                                        </div>
                                    </summary>
                                    <div className="mt-3 space-y-4">
                                        {circle7Rings.map((ring) => (
                                            <div key={ring.label} className="grid grid-cols-[2.5rem_1fr_1fr] gap-x-8 items-start border-t border-gold-muted/10 pt-3">
                                                <div />
                                                <div>
                                                    <div className="font-[family-name:var(--font-cormorant)] text-base italic text-parchment-2">
                                                        {ring.label}
                                                    </div>
                                                    <ul className="mt-1 space-y-0.5">
                                                        {ring.sinners.map((s) => (
                                                            <li key={s} className="font-[family-name:var(--font-cormorant)] text-base text-stone flex items-center gap-2">
                                                                <span className="text-gold-dim text-[8px]">—</span>
                                                                {s}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <p className="font-[family-name:var(--font-cormorant)] text-base leading-6 text-stone">
                                                    {ring.punishment}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </details>
                            )}

                            {/* expandable: Circle 8 */}
                            {c.number === 8 && (
                                <details className="mt-4 group">
                                    <summary className="grid grid-cols-[2.5rem_1fr_1fr] gap-x-8 cursor-pointer list-none select-none">
                                        <div />
                                        <div className="flex items-center gap-2 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] text-gold-dim hover:text-gold transition-colors col-span-2">
                                            <span className="inline-block transition-transform group-open:rotate-90">›</span>
                                            The Ten Bolge
                                        </div>
                                    </summary>
                                    <div className="mt-3">
                                        <div className="grid grid-cols-[2.5rem_1fr_1fr] gap-x-8 mb-3">
                                            <div />
                                            <p className="col-span-2 font-[family-name:var(--font-cormorant)] text-base italic text-stone">
                                                Fraud is considered worse than violence because it abuses human reason and trust.
                                            </p>
                                        </div>
                                        <div className="space-y-3">
                                            {circle8Bolge.map((ditch, i) => (
                                                <div key={ditch.sin} className="grid grid-cols-[2.5rem_1fr_1fr] gap-x-8 items-baseline border-t border-gold-muted/10 pt-3">
                                                    <div />
                                                    <div className="font-[family-name:var(--font-cormorant)] text-base text-stone flex items-center gap-3">
                                                        <span className="shrink-0 font-[family-name:var(--font-plex)] text-[9px] text-gold-dim w-4 text-center">{i + 1}.</span>
                                                        {ditch.sin}
                                                    </div>
                                                    <p className="font-[family-name:var(--font-cormorant)] text-base leading-6 text-stone">
                                                        {ditch.punishment}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </details>
                            )}

                            {/* expandable: Circle 9 */}
                            {c.number === 9 && (
                                <details className="mt-4 group">
                                    <summary className="grid grid-cols-[2.5rem_1fr_1fr] gap-x-8 cursor-pointer list-none select-none">
                                        <div />
                                        <div className="flex items-center gap-2 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] text-gold-dim hover:text-gold transition-colors col-span-2">
                                            <span className="inline-block transition-transform group-open:rotate-90">›</span>
                                            The Four Zones
                                        </div>
                                    </summary>
                                    <div className="mt-3 space-y-3">
                                        {circle9Zones.map((zone) => (
                                            <div key={zone.name} className="grid grid-cols-[2.5rem_1fr_1fr] gap-x-8 items-baseline border-t border-gold-muted/10 pt-3">
                                                <div />
                                                <div>
                                                    <span className="font-[family-name:var(--font-cinzel)] text-sm text-parchment-2">
                                                        {zone.name}
                                                    </span>
                                                    <span className="font-[family-name:var(--font-cormorant)] text-base text-stone ml-3">
                                                        — {zone.description}
                                                    </span>
                                                </div>
                                                <p className="font-[family-name:var(--font-cormorant)] text-base leading-6 text-stone">
                                                    {zone.punishment}
                                                </p>
                                            </div>
                                        ))}
                                        <div className="grid grid-cols-[2.5rem_1fr_1fr] gap-x-8 border-t border-gold-muted/15 pt-4">
                                            <div />
                                            <div className="col-span-2">
                                                <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.45em] text-gold-dim mb-3">
                                                    Satan
                                                </div>
                                                <p className="font-[family-name:var(--font-cormorant)] text-base italic text-stone mb-3">
                                                    At the very center sits Satan, trapped waist-deep in ice. His three mouths eternally chew history&rsquo;s greatest traitors:
                                                </p>
                                                <ul className="space-y-1">
                                                    {satanMouths.map((m) => (
                                                        <li key={m.name} className="flex items-baseline gap-3">
                                                            <span className="font-[family-name:var(--font-cormorant)] text-base text-parchment-3">
                                                                {m.name}
                                                            </span>
                                                            <span className="font-[family-name:var(--font-cormorant)] text-sm text-stone italic">
                                                                {m.note}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </details>
                            )}
                        </article>
                    ))}
                </div>

                {/* upper vs lower hell */}
                <div className="mt-8 grid grid-cols-2 border border-gold-muted/20">
                    <div className="bg-surface-alt/75 px-8 py-7 border-r border-gold-muted/20">
                        <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim mb-5">
                            Upper Hell
                        </div>
                        <p className="font-[family-name:var(--font-cormorant)] text-lg italic text-parchment-3 mb-6">
                            &ldquo;I couldn&rsquo;t control myself.&rdquo;
                        </p>
                        <div className="space-y-2">
                            {['Passion', 'Impulse', 'Weakness', 'Self-indulgence'].map((w) => (
                                <div key={w} className="font-[family-name:var(--font-cormorant)] text-base text-stone flex items-center gap-2">
                                    <span className="text-gold-dim text-[8px]">—</span>
                                    {w}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-surface-alt/75 px-8 py-7">
                        <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim mb-5">
                            Lower Hell
                        </div>
                        <p className="font-[family-name:var(--font-cormorant)] text-lg italic text-parchment-3 mb-6">
                            &ldquo;I knew exactly what I was doing.&rdquo;
                        </p>
                        <div className="space-y-2">
                            {['Calculation', 'Premeditation', 'Corruption', 'Exploitation'].map((w) => (
                                <div key={w} className="font-[family-name:var(--font-cormorant)] text-base text-stone flex items-center gap-2">
                                    <span className="text-gold-dim text-[8px]">—</span>
                                    {w}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* betrayal destroys civilization */}
                <div className="mt-8 border border-gold-muted/20 bg-surface/80 p-7">
                    <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim mb-6">
                        Betrayal destroys civilization
                    </div>
                    <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-parchment-3 mb-6">
                        A civilization exists because people trust one another.
                    </p>
                    <div className="space-y-2 mb-8">
                        {[
                            'Parents trust children.',
                            'Friends trust friends.',
                            'Citizens trust governments.',
                            'Businesses trust contracts.',
                            'Investors trust markets.',
                        ].map((line) => (
                            <div key={line} className="font-[family-name:var(--font-cormorant)] text-base text-stone flex items-center gap-2">
                                <span className="text-gold-dim text-[8px]">—</span>
                                {line}
                            </div>
                        ))}
                    </div>
                    <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-parchment-3 mb-5">
                        Once trust disappears, everything else begins to collapse.
                    </p>
                    <div className="border-t border-gold-muted/15 pt-6 space-y-2">
                        <p className="font-[family-name:var(--font-cormorant)] text-base italic text-stone">
                            Dante seems to argue:
                        </p>
                        <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-parchment-3">
                            Violence destroys people.
                        </p>
                        <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-parchment-3">
                            Betrayal destroys the bonds between people.
                        </p>
                    </div>
                </div>

                <div className="h-16" />
            </section>
        </main>
    );
}
