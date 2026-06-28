import ArchiveHeader from '@/components/ArchiveHeader';

export default function TheHungerGamesPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-void text-parchment">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(157,113,59,0.18),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(55,76,88,0.18),transparent_36%)]" />
                <div className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(to_right,#e9dec4_1px,transparent_1px),linear-gradient(to_bottom,#e9dec4_1px,transparent_1px)] bg-[size:72px_72px]" />
                <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-muted/10" />
                <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-muted/15" />
            </div>

            <section className="relative z-10 mx-auto max-w-6xl px-6 py-8">
                <ArchiveHeader
                    eyebrow="Suzanne Collins · Book Analysis"
                    title="The Hunger Games"
                />

                {/* core story */}
                <div className="mt-4 border border-gold-muted/20 bg-surface/80 px-8 py-7">
                    <blockquote className="border-l-2 border-gold/40 pl-6">
                        <p className="font-[family-name:var(--font-cormorant)] text-xl leading-9 text-parchment-3 italic">
                            The elite maintain power by making the masses compete with one another instead of challenging the system.
                        </p>
                    </blockquote>
                </div>

                {/* surface vs deeper meaning table */}
                <div className="mt-4 border border-gold-muted/20 bg-surface-alt/75">
                    <div className="grid grid-cols-2 border-b border-gold-muted/20">
                        <div className="px-6 py-3 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] text-gold-dim">
                            Surface
                        </div>
                        <div className="border-l border-gold-muted/20 px-6 py-3 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] text-gold-dim">
                            Deeper Meaning
                        </div>
                    </div>
                    {[
                        { surface: 'Children fight', deeper: 'The powerless compete against each other.' },
                        { surface: 'The Capitol watches', deeper: 'The powerful remain insulated.' },
                        { surface: 'One winner emerges', deeper: 'The system survives unchanged.' },
                        { surface: 'Everyone cheers', deeper: 'The audience legitimizes the system.' },
                    ].map((row) => (
                        <div key={row.surface} className="grid grid-cols-2 border-b border-gold-muted/10 last:border-b-0 hover:bg-surface-alt transition-colors">
                            <div className="px-6 py-5 font-[family-name:var(--font-cormorant)] text-lg text-parchment-3">
                                {row.surface}
                            </div>
                            <div className="border-l border-gold-muted/20 px-6 py-5 font-[family-name:var(--font-cormorant)] text-lg leading-7 text-stone">
                                {row.deeper}
                            </div>
                        </div>
                    ))}
                </div>

                {/* misdirection mechanic */}
                <div className="mt-4 border border-gold-muted/20 bg-surface/80 p-7">
                    <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-parchment-3">
                        The genius of the story is that the districts never point their anger upward. They point it sideways.
                    </p>

                    <div className="mt-7 grid gap-3 md:grid-cols-3">
                        <div className="border border-gold-muted/15 bg-void/40 p-5 opacity-40">
                            <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.5em] text-gold-dim mb-3">
                                Instead of
                            </div>
                            <p className="font-[family-name:var(--font-cormorant)] text-lg text-parchment-3">
                                Districts vs. Capitol
                            </p>
                        </div>
                        <div className="border border-gold-muted/25 bg-void/40 p-5">
                            <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.5em] text-gold-dim mb-3">
                                The system creates
                            </div>
                            <p className="font-[family-name:var(--font-cormorant)] text-lg text-parchment-3">
                                District vs. District
                            </p>
                        </div>
                        <div className="border border-gold/30 bg-void/40 p-5">
                            <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.5em] text-gold-dim mb-3">
                                And eventually
                            </div>
                            <p className="font-[family-name:var(--font-cormorant)] text-lg text-parchment-3">
                                Child vs. Child
                            </p>
                        </div>
                    </div>
                </div>

                {/* central metaphor */}
                <div className="mt-4 border border-gold-muted/20 bg-surface/80 p-7 text-center">
                    <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.5em] text-gold-dim mb-5">
                        Central Metaphor
                    </div>
                    <p className="font-[family-name:var(--font-cormorant)] text-xl leading-9 text-parchment-3 max-w-2xl mx-auto">
                        A ruling class preserves its power by turning the struggles of ordinary people into competition and entertainment.
                    </p>
                </div>

                {/* katniss */}
                <div className="mt-4 border border-gold-muted/20 bg-surface/80 p-7">
                    <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.5em] text-gold-dim mb-5">
                        Katniss
                    </div>
                    <blockquote className="border-l-2 border-gold/40 pl-6">
                        <p className="font-[family-name:var(--font-cormorant)] text-xl leading-9 text-parchment-3 italic">
                            Cooperation defeats the system that depends on competition.
                        </p>
                    </blockquote>

                    <div className="mt-8 border border-gold-muted/20">
                        <div className="grid grid-cols-2 border-b border-gold-muted/20">
                            <div className="px-6 py-3 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] text-gold-dim">
                                System
                            </div>
                            <div className="border-l border-gold-muted/20 px-6 py-3 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] text-gold-dim">
                                Outlier
                            </div>
                        </div>
                        {[
                            { system: 'Compete', outlier: 'Cooperate' },
                            { system: 'Scarcity', outlier: 'Solidarity' },
                            { system: 'Divide', outlier: 'Unite' },
                            { system: 'Fear', outlier: 'Trust' },
                            { system: 'Game', outlier: 'Refuse the game' },
                        ].map((row) => (
                            <div key={row.system} className="grid grid-cols-2 border-b border-gold-muted/10 last:border-b-0 hover:bg-surface-alt transition-colors">
                                <div className="px-6 py-5 font-[family-name:var(--font-cormorant)] text-lg text-stone">
                                    {row.system}
                                </div>
                                <div className="border-l border-gold-muted/20 px-6 py-5 font-[family-name:var(--font-cormorant)] text-lg text-parchment-3">
                                    {row.outlier}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="h-16" />
            </section>
        </main >
    );
}
