// ─── data ────────────────────────────────────────────────────────────────────

const primaryConcern = [
    { epic: 'Iliad', concern: 'The individual hero' },
    { epic: 'Odyssey', concern: 'The family' },
    { epic: 'Aeneid', concern: 'The civilization' },
];

const thematic = [
    { theme: 'Hero seeks', iliad: 'Glory', odyssey: 'Home', aeneid: 'Destiny' },
    { theme: 'Hero represents', iliad: 'Warrior', odyssey: 'Survivor', aeneid: 'Founder' },
    { theme: 'Highest virtue', iliad: 'Honor', odyssey: 'Wisdom', aeneid: 'Duty' },
    { theme: 'Goal', iliad: 'Win the war', odyssey: 'Return home', aeneid: 'Build a future' },
    { theme: 'Ends with', iliad: 'Funeral', odyssey: 'Reunion', aeneid: 'Beginning of Rome' },
];

const likeOdysseus = [
    'He wanders.',
    'He survives storms.',
    'He visits strange lands.',
    'He descends into the underworld.',
];

const likeAchilles = [
    'He becomes a great warrior.',
    'He fights a final duel.',
    'The second half centers on war.',
];

const aeneasInIliad = [
    'A Trojan prince — noble through his father, a member of the royal line.',
    'Fights alongside Hector.',
    'Respected as a capable warrior.',
    'Survives the war.',
    'Homer hints he is destined to continue the Trojan line.',
];

const aeneasLosses = [
    'His city.',
    'His home.',
    'His friends.',
    'His wife.',
    'His kingdom.',
];

const symbolicImage = [
    'His father, Anchises, on his shoulders.',
    'His son, Ascanius, by the hand.',
];

const romanIdeals = [
    'Honor the past.',
    'Protect the future.',
    'Bear responsibility.',
];

const questions = [
    { hero: 'Achilles', question: 'How should I be remembered?' },
    { hero: 'Odysseus', question: 'How do I get my life back?' },
    { hero: 'Aeneas', question: 'What must I sacrifice so that a nation can exist?' },
];

const structure = [
    {
        homer: 'Odyssey',
        homerId: 'Journey',
        virgil: 'Aeneid Books 1–6',
        virgilId: 'Journey',
        description: 'Aeneas wanders the Mediterranean after the fall of Troy, driven by fate toward a land he has never seen.',
    },
    {
        homer: 'Iliad',
        homerId: 'War',
        virgil: 'Aeneid Books 7–12',
        virgilId: 'War',
        description: 'Aeneas arrives in Italy and fights a brutal war against the Latin tribes to claim the land promised by the gods.',
    },
];

// ─── primitives ──────────────────────────────────────────────────────────────

/** Section wrapper with a small caps label above its children */
function Section({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="mt-10 pt-10 border-t border-gold-muted/15">
            <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim mb-4">
                {label}
            </div>
            {children}
        </div>
    );
}

/** A muted banner paragraph — used as intro or conclusion text for a section */
function Banner({ children, dim = false }: { children: React.ReactNode; dim?: boolean }) {
    return (
        <div className="border border-gold-muted/20 bg-surface/60 px-8 py-6">
            <p className={`font-[family-name:var(--font-cormorant)] text-lg leading-8 ${dim ? 'italic text-stone' : 'text-parchment-3'}`}>
                {children}
            </p>
        </div>
    );
}

/** A dashed bullet list */
function BulletList({ items, size = 'base' }: { items: string[]; size?: 'base' | 'lg' }) {
    return (
        <ul className="space-y-2">
            {items.map((item) => (
                <li key={item} className={`flex items-start gap-3 font-[family-name:var(--font-cormorant)] text-${size} text-stone`}>
                    <span className="text-gold-dim text-[8px] mt-2 shrink-0">—</span>
                    {item}
                </li>
            ))}
        </ul>
    );
}

/** A labelled panel — one bordered box with a small caps title and content */
function Panel({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
    return (
        <div className={`bg-surface-alt/75 px-8 py-7 ${className}`}>
            <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim mb-5">
                {label}
            </div>
            {children}
        </div>
    );
}

/** Two panels side by side inside a shared border */
function TwoColumn({ left, right }: {
    left: { label: string; children: React.ReactNode };
    right: { label: string; children: React.ReactNode };
}) {
    return (
        <div className="grid md:grid-cols-2 border border-gold-muted/20">
            <Panel label={left.label} className="border-r border-gold-muted/20">{left.children}</Panel>
            <Panel label={right.label}>{right.children}</Panel>
        </div>
    );
}

// ─── page ────────────────────────────────────────────────────────────────────

import React from 'react';
import ArchiveHeader from '@/components/ArchiveHeader';
import ComparisonTable from '@/components/ComparisonTable';

export default function AeneidPage() {
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
                    eyebrow="Virgil · c. 29–19 BC"
                    title="Aeneid"
                    description="Virgil wrote the Aeneid as Rome's answer to Homer. It is not a single epic — it is both epics at once, in sequence. The first half mirrors the Odyssey. The second half mirrors the Iliad. The structure is a deliberate act of cultural ambition: Greece retold, with Rome as its destination."
                />

                {/* structural mirror */}
                <Section label="The structural mirror">
                    <div
                        className="border border-b-0 border-gold-muted/20 bg-surface/60 px-6 py-3 grid text-center"
                        style={{ gridTemplateColumns: '1fr auto 1fr' }}
                    >
                        <div className="font-[family-name:var(--font-cinzel)] text-sm tracking-[0.06em] text-parchment-2">Homer</div>
                        <div className="px-8" />
                        <div className="font-[family-name:var(--font-cinzel)] text-sm tracking-[0.06em] text-parchment-2">Virgil</div>
                    </div>
                    <div className="border border-gold-muted/20 space-y-px">
                        {structure.map((row) => (
                            <div key={row.virgil} className="bg-surface-alt/75 hover:bg-surface-alt transition-colors">
                                <div className="grid px-6 py-6 items-center text-center" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
                                    <div>
                                        <div className="font-[family-name:var(--font-cinzel)] text-xl tracking-[0.06em] text-parchment-2">{row.homer}</div>
                                        <div className="mt-1 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim">{row.homerId}</div>
                                    </div>
                                    <div className="flex items-center justify-center px-8 text-gold-dim/40 text-lg">→</div>
                                    <div>
                                        <div className="font-[family-name:var(--font-cinzel)] text-xl tracking-[0.06em] text-parchment-2">{row.virgil}</div>
                                        <div className="mt-1 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim">{row.virgilId}</div>
                                    </div>
                                </div>
                                <div className="px-6 pb-6 border-t border-gold-muted/10 pt-4">
                                    <p className="font-[family-name:var(--font-cormorant)] text-base leading-7 text-stone">{row.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* who is aeneas */}
                <Section label="Who is Aeneas">
                    <div className="space-y-6">
                        <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-stone">
                            Before the Aeneid, Aeneas was already a character in Greek mythology.
                            Virgil takes a thread Homer left dangling and builds an entire epic around it.
                        </p>
                        <div>
                            <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim mb-3">
                                In the Iliad
                            </div>
                            <BulletList items={aeneasInIliad} />
                        </div>
                    </div>
                </Section>

                {/* why aeneas */}
                <Section label="Why Aeneas">
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim mb-3">
                                    Virgil could have written about
                                </div>
                                <p className="font-[family-name:var(--font-cormorant)] text-xl italic text-stone">
                                    The man who won the war.
                                </p>
                            </div>
                            <div>
                                <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim mb-3">
                                    Instead he wrote about
                                </div>
                                <p className="font-[family-name:var(--font-cormorant)] text-xl italic text-parchment-3">
                                    The man who survived losing it.
                                </p>
                            </div>
                        </div>
                        <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-stone">
                            The Aeneid begins after Troy has already fallen. Aeneas has lost everything.
                            Yet he continues because he believes he has a mission to fulfill.
                        </p>
                        <div>
                            <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim mb-3">
                                What he has lost
                            </div>
                            <BulletList items={aeneasLosses} />
                        </div>
                    </div>
                </Section>

                {/* the symbolic image */}
                <Section label="The symbolic image">
                    <div className="space-y-6">
                        <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-stone">
                            The single most famous image of Aeneas is not him killing an enemy.
                            It is him escaping the burning city.
                        </p>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim mb-3">
                                    He carries
                                </div>
                                <BulletList items={symbolicImage} size="lg" />
                            </div>
                            <div>
                                <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim mb-3">
                                    Roman ideals it captured
                                </div>
                                <BulletList items={romanIdeals} size="lg" />
                            </div>
                        </div>
                    </div>
                </Section>

                {/* primary concern */}
                <Section label="Primary concern">
                    <div className="flex flex-col items-center gap-5">
                        {primaryConcern.map((row) => (
                            <div key={row.epic} className="flex items-baseline gap-6 w-72">
                                <span className="font-[family-name:var(--font-cinzel)] text-xl tracking-[0.06em] text-parchment-2 w-24 shrink-0">
                                    {row.epic}
                                </span>
                                <span className="font-[family-name:var(--font-cormorant)] text-xl italic text-stone">
                                    {row.concern}
                                </span>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* thematic comparison */}
                <Section label="Thematic comparison">
                    <ComparisonTable
                        columns={['Iliad', 'Odyssey', 'Aeneid']}
                        rows={thematic.map((r) => ({ category: r.theme, values: [r.iliad, r.odyssey, r.aeneid] }))}
                    />
                </Section>

                {/* aeneas as synthesis */}
                <Section label="Aeneas as synthesis">
                    <div className="space-y-6">
                        <p className="font-[family-name:var(--font-cormorant)] text-lg italic text-stone">
                            Aeneas almost combines Achilles and Odysseus.
                        </p>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim mb-3">
                                    Like Odysseus
                                </div>
                                <BulletList items={likeOdysseus} />
                            </div>
                            <div>
                                <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim mb-3">
                                    Like Achilles
                                </div>
                                <BulletList items={likeAchilles} />
                            </div>
                        </div>
                        <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-parchment-3">
                            But his purpose is neither glory nor home. It is history.
                        </p>
                    </div>
                </Section>

                {/* the scale expands */}
                <Section label="The scale keeps expanding">
                    <div className="border border-gold-muted/20 space-y-px">
                        {questions.map((row, i) => (
                            <div key={row.hero} className="bg-surface-alt/75 hover:bg-surface-alt transition-colors px-8 py-7">
                                <div className="flex items-baseline gap-4 mb-3">
                                    <span className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim w-4 shrink-0">
                                        {i + 1}
                                    </span>
                                    <span className="font-[family-name:var(--font-cinzel)] text-lg tracking-[0.04em] text-parchment-2">
                                        {row.hero}
                                    </span>
                                </div>
                                <div className="pl-8">
                                    <p className="font-[family-name:var(--font-cormorant)] text-xl italic text-gold/70 leading-8">
                                        &ldquo;{row.question}&rdquo;
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* why did virgil do this */}
                <Section label="Why did Virgil do this">
                    <div className="space-y-6">
                        <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-stone">
                            Virgil was writing during the reign of Augustus. Rome already ruled much of the Mediterranean.
                            Virgil wanted to answer a grand question: where did Rome come from?
                        </p>
                        <div>
                            <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim mb-3">
                                His answer
                            </div>
                            <p className="font-[family-name:var(--font-cormorant)] text-xl italic text-parchment-3">
                                Rome was born from the ashes of Troy.
                            </p>
                        </div>
                        <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-stone">
                            This gave Rome an incredibly prestigious ancestry. The Romans could say:
                        </p>
                        <ul className="space-y-2">
                            {[
                                'We descend from the heroes of Troy.',
                                'Our civilization has roots older than Greece.',
                                'Our empire was part of destiny from the beginning.',
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3 font-[family-name:var(--font-cormorant)] text-base text-stone">
                                    <span className="text-gold-dim text-[8px] mt-2 shrink-0">—</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Section>

                {/* the inversion */}
                <Section label="The brilliant twist">
                    <div className="space-y-6">
                        <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-stone">
                            The Greeks wrote stories celebrating the victory over Troy.
                            Virgil writes from the perspective of the defeated.
                            The Aeneid transforms a defeat into a beginning.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="text-center">
                                <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim mb-4">
                                    Greek perspective
                                </div>
                                <div className="space-y-2">
                                    <p className="font-[family-name:var(--font-cormorant)] text-lg text-stone">Victory</p>
                                    <p className="font-[family-name:var(--font-cormorant)] text-base text-gold-dim/50">↓</p>
                                    <p className="font-[family-name:var(--font-cormorant)] text-lg italic text-stone">End of Troy</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim mb-4">
                                    Roman perspective
                                </div>
                                <div className="space-y-2">
                                    <p className="font-[family-name:var(--font-cormorant)] text-lg text-stone">Fall of Troy</p>
                                    <p className="font-[family-name:var(--font-cormorant)] text-base text-gold-dim/50">↓</p>
                                    <p className="font-[family-name:var(--font-cormorant)] text-lg italic text-parchment-3">Beginning of Rome</p>
                                </div>
                            </div>
                        </div>

                        <p className="font-[family-name:var(--font-cormorant)] text-lg italic text-gold/60">
                            This is one of the most elegant literary inversions in history.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <p className="font-[family-name:var(--font-cormorant)] text-base leading-7 text-stone">
                                For the Greeks, Troy is the end of a great war.
                            </p>
                            <p className="font-[family-name:var(--font-cormorant)] text-base leading-7 text-parchment-3">
                                For the Romans, Troy is the beginning of their civilization.
                            </p>
                        </div>
                    </div>
                </Section>

                <div className="h-16" />
            </section>
        </main>
    );
}
