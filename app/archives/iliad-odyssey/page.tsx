import ArchiveHeader from '@/components/ArchiveHeader';
import ComparisonTable from '@/components/ComparisonTable';

const comparison = [
    { category: 'Setting', iliad: 'Battlefield', odyssey: 'Journey home' },
    { category: 'Hero', iliad: 'Achilles', odyssey: 'Odysseus' },
    { category: 'Primary Virtue', iliad: 'Courage', odyssey: 'Wisdom' },
    { category: 'Wins Through', iliad: 'Strength', odyssey: 'Intelligence' },
    { category: 'Central Conflict', iliad: 'External war', odyssey: 'External obstacles + internal temptation' },
    { category: 'Goal', iliad: 'Honor', odyssey: 'Home' },
    { category: 'Greatest Fear', iliad: 'Dying without glory', odyssey: 'Never returning' },
    { category: 'Dominant Emotion', iliad: 'Rage', odyssey: 'Longing' },
    { category: 'Ending', iliad: 'Death and mourning', odyssey: 'Reunion and restoration' },
];

const achillesTraits = [
    'Physical perfection',
    'Fearlessness',
    'Pride',
    'Intensity',
    'Honor',
];

const odysseusTraits = [
    'Cleverness',
    'Patience',
    'Adaptability',
    'Curiosity',
    'Self-control (though imperfectly)',
];

const progression = [
    { from: 'Win the war', to: 'Live after the war' },
    { from: 'Destroy', to: 'Rebuild' },
    { from: 'Earn glory', to: 'Recover identity' },
    { from: 'The perfect warrior', to: 'The complete ruler' },
];

export default function IliadOdysseyPage() {
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
                    eyebrow="Homer · c. 8th century BC"
                    title="Iliad & Odyssey"
                    description="Two epics, one war. The Iliad asks what it means to be the greatest warrior. The Odyssey asks what it means to find your way home. Together they map the full arc: destruction and return, glory and survival, force and intelligence."
                />

                <ComparisonTable
                    label="Comparison"
                    columns={['Iliad', 'Odyssey']}
                    rows={comparison.map((r) => ({ category: r.category, values: [r.iliad, r.odyssey] }))}
                />

                {/* the two heroes */}
                <div className="mt-10">
                    <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim mb-4">
                        The two heroes
                    </div>
                    <div className="grid md:grid-cols-2 border border-gold-muted/20">
                        {/* Achilles */}
                        <div className="bg-surface-alt/75 px-8 py-8 border-r border-gold-muted/20">
                            <h2 className="font-[family-name:var(--font-cinzel)] text-2xl tracking-[0.06em] text-parchment-2">
                                Achilles
                            </h2>
                            <p className="mt-4 font-[family-name:var(--font-cormorant)] text-lg leading-8 text-parchment-3">
                                Almost superhuman. Everything revolves around how he is seen by others.
                            </p>
                            <ul className="mt-5 space-y-2">
                                {achillesTraits.map((t) => (
                                    <li key={t} className="flex items-center gap-3 font-[family-name:var(--font-cormorant)] text-base text-stone">
                                        <span className="text-gold-dim text-[8px]">—</span>
                                        {t}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 border-t border-gold-muted/15 pt-6">
                                <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim mb-3">
                                    The choice
                                </div>
                                <p className="font-[family-name:var(--font-cormorant)] text-lg italic text-stone leading-8">
                                    Live forever in obscurity, or die young with eternal glory.
                                </p>
                                <p className="mt-3 font-[family-name:var(--font-cormorant)] text-lg text-parchment-3">
                                    He chooses glory.
                                </p>
                            </div>
                        </div>

                        {/* Odysseus */}
                        <div className="bg-surface-alt/75 px-8 py-8">
                            <h2 className="font-[family-name:var(--font-cinzel)] text-2xl tracking-[0.06em] text-parchment-2">
                                Odysseus
                            </h2>
                            <p className="mt-4 font-[family-name:var(--font-cormorant)] text-lg leading-8 text-parchment-3">
                                Much more human. He constantly survives by thinking instead of overpowering.
                            </p>
                            <ul className="mt-5 space-y-2">
                                {odysseusTraits.map((t) => (
                                    <li key={t} className="flex items-center gap-3 font-[family-name:var(--font-cormorant)] text-base text-stone">
                                        <span className="text-gold-dim text-[8px]">—</span>
                                        {t}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 border-t border-gold-muted/15 pt-6">
                                <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim mb-3">
                                    The method
                                </div>
                                <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-stone">
                                    Instead of charging, he disguises himself, negotiates, lies strategically, and waits for the right moment.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* opening words */}
                <div className="mt-10">
                    <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim mb-4">
                        Rage vs Endurance
                    </div>
                    <p className="font-[family-name:var(--font-cormorant)] text-lg italic text-stone mb-6">
                        The opening words of each poem tell you almost everything.
                    </p>
                    <div className="grid md:grid-cols-2 border border-gold-muted/20">
                        <div className="bg-surface-alt/75 px-8 py-8 border-r border-gold-muted/20">
                            <div className="font-[family-name:var(--font-cinzel)] text-sm tracking-[0.06em] text-gold mb-5">
                                Iliad
                            </div>
                            <p className="font-[family-name:var(--font-cormorant)] text-xl italic text-parchment-2 leading-9">
                                &ldquo;Sing, goddess, of the rage of Achilles&hellip;&rdquo;
                            </p>
                            <p className="mt-5 font-[family-name:var(--font-cormorant)] text-base leading-7 text-stone">
                                The first word after the invocation is essentially <em>rage</em> (mēnin). Everything flows from uncontrolled anger.
                            </p>
                        </div>
                        <div className="bg-surface-alt/75 px-8 py-8">
                            <div className="font-[family-name:var(--font-cinzel)] text-sm tracking-[0.06em] text-gold mb-5">
                                Odyssey
                            </div>
                            <p className="font-[family-name:var(--font-cormorant)] text-xl italic text-parchment-2 leading-9">
                                &ldquo;&hellip;the man of many turns&hellip;&rdquo;
                            </p>
                            <p className="mt-5 font-[family-name:var(--font-cormorant)] text-base leading-7 text-stone">
                                Odysseus is constantly changing course, adapting, wandering. Instead of explosive anger, the defining quality is flexibility.
                            </p>
                        </div>
                    </div>
                </div>

                {/* glory vs home */}
                <div className="mt-10">
                    <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim mb-4">
                        Glory vs Home
                    </div>
                    <div className="grid md:grid-cols-2 border border-gold-muted/20">
                        <div className="bg-surface-alt/75 px-8 py-8 border-r border-gold-muted/20">
                            <div className="font-[family-name:var(--font-cinzel)] text-sm tracking-[0.06em] text-gold mb-5">Achilles seeks</div>
                            {['Immortal reputation', 'Honor', 'Great deeds'].map((item) => (
                                <div key={item} className="flex items-center gap-3 mb-2 font-[family-name:var(--font-cormorant)] text-lg text-parchment-3">
                                    <span className="text-gold-dim text-[8px]">—</span>
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="bg-surface-alt/75 px-8 py-8">
                            <div className="font-[family-name:var(--font-cinzel)] text-sm tracking-[0.06em] text-gold mb-5">Odysseus seeks</div>
                            {['His wife', 'His son', 'His kingdom', 'His bed', 'Peace'].map((item) => (
                                <div key={item} className="flex items-center gap-3 mb-2 font-[family-name:var(--font-cormorant)] text-lg text-parchment-3">
                                    <span className="text-gold-dim text-[8px]">—</span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border border-t-0 border-gold-muted/20 bg-surface/60 px-8 py-6">
                        <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-stone">
                            One wants history to remember him. The other wants to return to ordinary life.
                        </p>
                    </div>
                </div>

                {/* public vs private */}
                <div className="mt-10">
                    <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim mb-4">
                        Public vs Private
                    </div>
                    <p className="font-[family-name:var(--font-cormorant)] text-lg italic text-stone mb-6">
                        This may be the deepest difference.
                    </p>
                    <div className="grid md:grid-cols-2 border border-gold-muted/20">
                        <div className="bg-surface-alt/75 px-8 py-8 border-r border-gold-muted/20">
                            <div className="font-[family-name:var(--font-cinzel)] text-sm tracking-[0.06em] text-gold mb-5">Iliad</div>
                            <p className="font-[family-name:var(--font-cormorant)] text-base leading-7 text-stone mb-5">
                                Everything happens publicly. Honor exists because everyone sees it.
                            </p>
                            <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim mb-3">The audience</div>
                            {['Kings', 'Armies', 'Heroes'].map((item) => (
                                <div key={item} className="flex items-center gap-3 mb-2 font-[family-name:var(--font-cormorant)] text-base text-stone">
                                    <span className="text-gold-dim text-[8px]">—</span>
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="bg-surface-alt/75 px-8 py-8">
                            <div className="font-[family-name:var(--font-cinzel)] text-sm tracking-[0.06em] text-gold mb-5">Odyssey</div>
                            <p className="font-[family-name:var(--font-cormorant)] text-base leading-7 text-stone mb-5">
                                The decisive moments happen in private. The focus shifts from the battlefield to the household.
                            </p>
                            <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim mb-3">The encounters</div>
                            {['Husband and wife', 'Father and son', 'Guest and host', 'Stranger and family'].map((item) => (
                                <div key={item} className="flex items-center gap-3 mb-2 font-[family-name:var(--font-cormorant)] text-base text-stone">
                                    <span className="text-gold-dim text-[8px]">—</span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* force vs intelligence */}
                <div className="mt-10">
                    <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim mb-4">
                        Force vs Intelligence
                    </div>
                    <div className="grid md:grid-cols-2 border border-gold-muted/20">
                        <div className="bg-surface-alt/75 px-8 py-8 border-r border-gold-muted/20">
                            <div className="font-[family-name:var(--font-cinzel)] text-sm tracking-[0.06em] text-gold mb-5">Achilles</div>
                            <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-parchment-3">
                                Solves problems by overwhelming force.
                            </p>
                        </div>
                        <div className="bg-surface-alt/75 px-8 py-8">
                            <div className="font-[family-name:var(--font-cinzel)] text-sm tracking-[0.06em] text-gold mb-5">Odysseus</div>
                            {['Waiting', 'Planning', 'Deception', 'Disguise', 'Timing'].map((item) => (
                                <div key={item} className="flex items-center gap-3 mb-2 font-[family-name:var(--font-cormorant)] text-lg text-parchment-3">
                                    <span className="text-gold-dim text-[8px]">—</span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border border-t-0 border-gold-muted/20 bg-surface/60 px-8 py-6">
                        <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-stone">
                            The Trojan Horse captures this perfectly: Troy is conquered not by stronger fighting, but by a clever strategy.
                        </p>
                    </div>
                </div>

                {/* literary progression */}
                <div className="mt-10">
                    <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim mb-4">
                        A literary progression
                    </div>
                    <div className="border border-gold-muted/20 space-y-px">
                        {progression.map((row) => (
                            <div
                                key={row.from}
                                className="grid bg-surface-alt/75 hover:bg-surface-alt transition-colors"
                                style={{ gridTemplateColumns: '1fr auto 1fr' }}
                            >
                                <div className="px-8 py-5 font-[family-name:var(--font-cormorant)] text-lg text-stone text-right flex items-center justify-end">
                                    {row.from}
                                </div>
                                <div className="flex items-center justify-center px-6 text-gold-dim/50">
                                    →
                                </div>
                                <div className="px-8 py-5 font-[family-name:var(--font-cormorant)] text-lg text-parchment-3 flex items-center">
                                    {row.to}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-px border border-gold-muted/20 bg-surface/60 px-8 py-6">
                        <p className="font-[family-name:var(--font-cormorant)] text-lg italic text-stone">
                            Iliad → Odyssey
                        </p>
                    </div>
                </div>

                <div className="h-16" />
            </section>
        </main >
    );
}
