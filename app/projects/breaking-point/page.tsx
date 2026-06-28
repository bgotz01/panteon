'use client';

import { useState } from 'react';

// ── Strategies tab data ──────────────────────────────────────────────────────

const strategies = [
    { strategy: 'Demographic engineering', purpose: 'Alter the population\'s composition.' },
    { strategy: 'Political patronage', purpose: 'Create a population whose loyalty is tied to the regime.' },
    { strategy: 'Social atomization', purpose: 'Reduce social cohesion and collective resistance.' },
    { strategy: 'Fiscal expansion', purpose: 'Justify a larger state apparatus and bureaucracy.' },
    { strategy: 'Managed instability', purpose: 'Keep society preoccupied with internal tensions rather than challenging the ruling class.' },
    { strategy: 'Elite insulation', purpose: 'Shift political conflict horizontally (between groups) instead of vertically (between rulers and citizens).' },
];

const hierarchy = ['Citizens', 'Government', 'Political Elite', 'Secret Society'];
const normalFlow = ['People', 'Elect Leaders', 'Leaders Govern'];
const invertedFlow = ['People', 'Elect Leaders', 'Leaders Believe They Govern', 'Secret Society Sets Long-Term Direction'];

const motivations = [
    {
        number: '1', title: 'Power preservation',
        lines: [
            { label: 'The society believes:', body: null },
            { label: null, body: 'A united population can overthrow us.' },
        ],
    },
    {
        number: '2', title: 'Cultural dissolution',
        lines: [
            { label: 'The objective is not economics.', body: null },
            { label: 'It is weakening shared identity.', body: null },
        ],
    },
    {
        number: '3', title: 'Permanent crisis',
        lines: [
            { label: 'The society has learned one lesson:', body: null },
            { label: null, body: 'People surrender power more readily during emergencies.' },
            { label: 'Therefore they never want complete peace.', body: null },
            { label: 'Not total chaos.', body: null },
            { label: 'Just continuous instability.', body: null },
            { label: null, body: 'Enough that extraordinary measures always seem justified.' },
        ],
    },
    {
        number: '4', title: 'Dependency',
        lines: [{ label: 'Instead of citizens becoming self-sufficient:', body: null }],
        chain: ['State', 'Resources', 'Dependence', 'Compliance'],
    },
];

// ── The Society tab data ─────────────────────────────────────────────────────

const beliefs = [
    'The Society believes it deserves to be the dominant race.',
    'The Society\'s ideology claims that history is a biological struggle.',
    'The Society justifies every action through that lens.',
];

const creed = 'History belongs to the blood that survives. Morality is a tool of the weak. Every civilization will eventually be inherited by those willing to manipulate rather than create.';

const paradoxStrengths = ['Finance', 'Espionage', 'Propaganda', 'Infiltration', 'Manipulation'];
const paradoxWeaknesses = ['Innovation', 'Craftsmanship', 'Institution-building'];

const doctrine = [
    'Never build from nothing.',
    'Capture functioning institutions.',
    'Replace loyal elites with compromised ones.',
    'Make the productive population politically powerless.',
    'Ensure every social conflict is horizontal rather than vertical.',
    'Expand into the next empire.',
];

const normalPhilosophy = ['Creation', 'Prosperity', 'Greatness'];
const societyPhilosophy = ['Survival', 'Control', 'Inheritance'];

const historyCycle = [
    'Builders create empire',
    'Empire becomes wealthy',
    'Builders become comfortable',
    'Controllers infiltrate',
    'Controllers inherit',
    'Empire declines',
    'Controllers move on',
];

const selfNames = ['The Gardeners', 'The Custodians', 'The Inheritors', 'The Shepherds', 'The Continuity'];

const builderTraits = ['Creates', 'Produces', 'Trusts', 'Sacrifices', 'Raises a balanced family', 'Plants trees he will never sit beneath.'];
const societyTraits = ['Acquires', 'Redirects', 'Manipulates', 'Preserves itself', 'Multiplies its bloodline without balance', 'Waits beneath the tree until the planter dies.'];

// ── Shared components ────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="px-6 py-3 border-b border-gold-muted/20">
            <span className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim">{children}</span>
        </div>
    );
}

function Block({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={`mt-8 border border-gold-muted/20 bg-void/40 ${className}`}>{children}</div>;
}

function VerticalChain({ items, dim = false, highlight = false }: { items: string[]; dim?: boolean; highlight?: boolean }) {
    return (
        <div className="flex flex-col items-center gap-0 my-4">
            {items.map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                    <div className={`font-[family-name:var(--font-cormorant)] text-xl leading-8 text-center
                        ${dim ? 'text-stone' : highlight && i === items.length - 1 ? 'text-gold/80 italic' : 'text-stone'}`}>
                        {item}
                    </div>
                    {i < items.length - 1 && <div className="text-stone/50 text-sm leading-5">↓</div>}
                </div>
            ))}
        </div>
    );
}

// ── Strategies tab ───────────────────────────────────────────────────────────

function StrategiesTab() {
    return (
        <>
            {/* strategies table */}
            <Block>
                <div className="grid grid-cols-[1fr_2fr] border-b border-gold-muted/20">
                    <div className="px-6 py-3 font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim border-r border-gold-muted/15">Strategy</div>
                    <div className="px-6 py-3 font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim">Purpose</div>
                </div>
                {strategies.map((row, i) => (
                    <div key={i} className="grid grid-cols-[1fr_2fr] border-b border-gold-muted/10 last:border-b-0 hover:bg-surface-alt/40 transition-colors">
                        <div className="px-6 py-5 border-r border-gold-muted/10 flex items-start">
                            <p className="font-[family-name:var(--font-cinzel)] text-base tracking-[0.04em] text-parchment-2 leading-7">{row.strategy}</p>
                        </div>
                        <div className="px-6 py-5 flex items-start">
                            <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone">{row.purpose}</p>
                        </div>
                    </div>
                ))}
            </Block>

            {/* hierarchy */}
            <Block>
                <SectionLabel>The Hierarchy</SectionLabel>
                <div className="px-6 py-8 flex flex-col items-center">
                    {hierarchy.map((tier, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className={`font-[family-name:var(--font-cinzel)] text-base tracking-[0.06em] px-8 py-3 border border-gold-muted/20 bg-surface-alt/60 ${i === hierarchy.length - 1 ? 'text-gold/70 border-gold-muted/40' : 'text-parchment-2'}`}>
                                {tier}
                            </div>
                            {i < hierarchy.length - 1 && <div className="text-stone/50 text-base leading-7">↓</div>}
                        </div>
                    ))}
                </div>
            </Block>

            {/* core inversion */}
            <Block>
                <SectionLabel>The Core Inversion</SectionLabel>
                <div className="grid md:grid-cols-2 divide-x divide-gold-muted/15">
                    <div className="px-8 py-8">
                        <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.4em] text-stone/60 mb-6">Normally, we think</div>
                        <VerticalChain items={normalFlow} dim />
                    </div>
                    <div className="px-8 py-8">
                        <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.4em] text-gold-dim mb-6">Your fictional world</div>
                        <VerticalChain items={invertedFlow} highlight />
                    </div>
                </div>
            </Block>

            {/* motivations */}
            <Block>
                <SectionLabel>Why Would the Secret Society Want This?</SectionLabel>
                {motivations.map((m, i) => (
                    <div key={i} className={`px-8 py-8 ${i !== motivations.length - 1 ? 'border-b border-gold-muted/15' : ''}`}>
                        <div className="flex items-baseline gap-4 mb-5">
                            <span className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.4em] text-muted">{m.number}</span>
                            <span className="font-[family-name:var(--font-cinzel)] text-lg tracking-[0.06em] text-parchment-2">{m.title}</span>
                        </div>
                        <div className="space-y-2 pl-8">
                            {m.lines.map((line, j) => (
                                <p key={j} className={`font-[family-name:var(--font-cormorant)] leading-8 ${line.body ? 'text-xl text-stone italic pl-4 border-l border-gold-muted/20' : 'text-lg text-stone'}`}>
                                    {line.body ?? line.label}
                                </p>
                            ))}
                        </div>
                        {m.chain && <div className="mt-6 pl-8"><VerticalChain items={m.chain} /></div>}
                    </div>
                ))}
            </Block>
        </>
    );
}

// ── The Society tab ──────────────────────────────────────────────────────────

function SocietyTab() {
    return (
        <>
            {/* beliefs */}
            <Block>
                <SectionLabel>Beliefs</SectionLabel>
                <div className="px-8 py-8 space-y-4">
                    {beliefs.map((b, i) => (
                        <div key={i} className="flex items-baseline gap-4">
                            <span className="shrink-0 font-[family-name:var(--font-plex)] text-[9px] text-muted">—</span>
                            <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone">{b}</p>
                        </div>
                    ))}
                </div>
            </Block>

            {/* creed */}
            <Block>
                <SectionLabel>The Society&apos;s Creed</SectionLabel>
                <div className="px-8 py-10">
                    <blockquote className="font-[family-name:var(--font-cormorant)] text-2xl leading-10 italic text-parchment-2 border-l-2 border-gold-muted/40 pl-8">
                        &ldquo;{creed}&rdquo;
                    </blockquote>
                </div>
            </Block>

            {/* paradox */}
            <Block>
                <SectionLabel>The Society&apos;s Paradox</SectionLabel>
                <div className="grid md:grid-cols-2 divide-x divide-gold-muted/15">
                    <div className="px-8 py-8">
                        <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.4em] text-gold-dim mb-6">Excellent at</div>
                        <div className="space-y-2">
                            {paradoxStrengths.map((s, i) => (
                                <div key={i} className="flex items-baseline gap-3">
                                    <span className="text-gold/50 text-sm">+</span>
                                    <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone">{s}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="px-8 py-8">
                        <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.4em] text-muted mb-6">Poor at</div>
                        <div className="space-y-2">
                            {paradoxWeaknesses.map((w, i) => (
                                <div key={i} className="flex items-baseline gap-3">
                                    <span className="text-muted text-sm">−</span>
                                    <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone">{w}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="px-8 pb-8 pt-0 border-t border-gold-muted/10">
                    <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone/70 italic pt-6">
                        So instead of building civilizations, they capture existing ones.
                    </p>
                </div>
            </Block>

            {/* strategic doctrine */}
            <Block>
                <SectionLabel>Strategic Doctrine</SectionLabel>
                <div className="px-8 py-8 space-y-3">
                    {doctrine.map((d, i) => (
                        <div key={i} className="flex items-baseline gap-4">
                            <span className="shrink-0 font-[family-name:var(--font-plex)] text-[9px] text-muted/40 w-4">{i + 1}</span>
                            <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone">{d}</p>
                        </div>
                    ))}
                </div>
                <div className="px-8 pb-8 border-t border-gold-muted/10">
                    <blockquote className="font-[family-name:var(--font-cormorant)] text-xl leading-9 italic text-parchment-2/70 pt-6">
                        &ldquo;History does not belong to the builders. It belongs to the survivors.&rdquo;
                    </blockquote>
                </div>
            </Block>

            {/* philosophy */}
            <Block>
                <SectionLabel>The Society&apos;s Philosophy</SectionLabel>
                <div className="px-8 py-6">
                    <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone/70 mb-6">
                        The Society rejects the traditional heroic view of civilization.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 divide-x divide-gold-muted/15 border-t border-gold-muted/15">
                    <div className="px-8 py-8">
                        <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.4em] text-muted/60 mb-2">Most people believe</div>
                        <VerticalChain items={normalPhilosophy} dim />
                    </div>
                    <div className="px-8 py-8">
                        <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.4em] text-gold-dim mb-2">The Society believes</div>
                        <VerticalChain items={societyPhilosophy} />
                    </div>
                </div>
                <div className="px-8 pb-8 border-t border-gold-muted/10">
                    <blockquote className="font-[family-name:var(--font-cormorant)] text-xl leading-9 italic text-parchment-2/70 pt-6">
                        &ldquo;Every empire that ever built magnificent cities is gone. We remain. Therefore we were always superior.&rdquo;
                    </blockquote>
                    <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-muted/60 italic mt-4">
                        This is a classic case of survivorship being treated as proof of superiority.
                    </p>
                </div>
            </Block>

            {/* the great inversion */}
            <Block>
                <SectionLabel>The Great Inversion</SectionLabel>
                <div className="px-8 py-6">
                    <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone/70">
                        The Society separates civilization into two castes.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 divide-x divide-gold-muted/15 border-t border-gold-muted/15">
                    <div className="px-8 py-8">
                        <div className="font-[family-name:var(--font-cinzel)] text-base tracking-[0.06em] text-parchment-2 mb-6">Builders</div>
                        <div className="space-y-2">
                            {['Invent', 'Create', 'Explore', 'Fight', 'Build cities', 'Raise balanced families', 'Trust one another'].map((t, i) => (
                                <p key={i} className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone">{t}</p>
                            ))}
                        </div>
                    </div>
                    <div className="px-8 py-8">
                        <div className="font-[family-name:var(--font-cinzel)] text-base tracking-[0.06em] text-gold/70 mb-6">Controllers</div>
                        <div className="space-y-2">
                            {['Observe', 'Manipulate', 'Capture', 'Redirect', 'Multiply the bloodline', 'Outlive'].map((t, i) => (
                                <p key={i} className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone/80">{t}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </Block>

            {/* history cycle */}
            <Block>
                <SectionLabel>Their View of History</SectionLabel>
                <div className="px-8 py-6">
                    <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone/70">
                        Every civilization follows the same cycle.
                    </p>
                </div>
                <div className="border-t border-gold-muted/15 py-6">
                    <VerticalChain items={historyCycle} />
                </div>
            </Block>

            {/* parasite doctrine */}
            <Block>
                <SectionLabel>The Parasite Doctrine</SectionLabel>
                <div className="px-8 py-8 space-y-6">
                    <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone/70">
                        The Society would probably reject being called parasites. Instead, they&apos;d say:
                    </p>
                    <blockquote className="font-[family-name:var(--font-cormorant)] text-2xl leading-10 italic text-parchment-2 border-l-2 border-gold-muted/40 pl-8">
                        &ldquo;A parasite dies with its host. We have survived thousands of hosts.&rdquo;
                    </blockquote>
                    <div>
                        <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone/70 mb-6">
                            So they might call themselves:
                        </p>
                        <div className="space-y-1 pl-4">
                            {selfNames.map((name, i) => (
                                <p key={i} className="font-[family-name:var(--font-cinzel)] text-base tracking-[0.06em] text-parchment-2/80 leading-8">{name}</p>
                            ))}
                        </div>
                    </div>
                    <div className="border-t border-gold-muted/10 pt-6 space-y-2">
                        <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-muted/60 italic">Each is propaganda.</p>
                        <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone/70">Their enemies call them parasites. They call themselves civilization&apos;s caretakers.</p>
                    </div>
                </div>
            </Block>

            {/* greatest resentment */}
            <Block>
                <SectionLabel>Their Greatest Resentment</SectionLabel>
                <div className="px-8 py-8 space-y-4">
                    <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone/70">
                        Their frustration isn&apos;t necessarily that the builders are stronger. It&apos;s that builders receive admiration.
                    </p>
                    <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone/70">The Society believes:</p>
                    <div className="space-y-2 pl-4 border-l border-gold-muted/20">
                        <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone italic">Builders are naive.</p>
                        <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone italic">They spend centuries creating what can be taken in a generation.</p>
                    </div>
                    <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone/70">
                        So admiration itself becomes something they resent.
                    </p>
                </div>
            </Block>

            {/* hidden weakness */}
            <Block>
                <SectionLabel>The Hidden Weakness</SectionLabel>
                <div className="px-8 py-8 space-y-6">
                    <div>
                        <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-muted/60 mb-2">The Society says:</p>
                        <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone italic pl-4 border-l border-gold-muted/20">
                            &ldquo;We have survived every civilization.&rdquo;
                        </p>
                    </div>
                    <div>
                        <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-muted/60 mb-2">The protagonists eventually realize:</p>
                        <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-parchment-2 italic pl-4 border-l border-gold-muted/40">
                            &ldquo;You&apos;ve survived because someone else always built the next civilization.&rdquo;
                        </p>
                    </div>
                    <div className="border-t border-gold-muted/10 pt-6">
                        <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone/70">The Society mistakes:</p>
                        <div className="flex items-center gap-6 mt-4 pl-4">
                            <p className="font-[family-name:var(--font-cinzel)] text-base tracking-[0.04em] text-parchment-2">Persistence</p>
                            <p className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.3em] text-muted/50">for</p>
                            <p className="font-[family-name:var(--font-cinzel)] text-base tracking-[0.04em] text-parchment-2">Creation</p>
                        </div>
                        <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone/70 mt-4">
                            They believe endurance proves superiority.
                        </p>
                    </div>
                </div>
            </Block>

            {/* symbolic contrast */}
            <Block>
                <SectionLabel>A Symbolic Contrast</SectionLabel>
                <div className="grid md:grid-cols-2 divide-x divide-gold-muted/15">
                    <div className="px-8 py-8">
                        <div className="font-[family-name:var(--font-cinzel)] text-base tracking-[0.06em] text-parchment-2 mb-6">The Builder</div>
                        <div className="space-y-2">
                            {builderTraits.map((t, i) => (
                                <p key={i} className={`font-[family-name:var(--font-cormorant)] leading-8 text-stone ${i === builderTraits.length - 1 ? 'text-lg italic text-stone/60 mt-4' : 'text-xl'}`}>{t}</p>
                            ))}
                        </div>
                    </div>
                    <div className="px-8 py-8">
                        <div className="font-[family-name:var(--font-cinzel)] text-base tracking-[0.06em] text-gold/70 mb-6">The Society</div>
                        <div className="space-y-2">
                            {societyTraits.map((t, i) => (
                                <p key={i} className={`font-[family-name:var(--font-cormorant)] leading-8 text-stone/80 ${i === societyTraits.length - 1 ? 'text-lg italic text-stone/50 mt-4' : 'text-xl'}`}>{t}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </Block>
        </>
    );
}

// ── Policies tab data ────────────────────────────────────────────────────────

const heroAgency = {
    name: 'Harmony & Enrichment Realignment Office',
    acronym: 'HERO',
    slogan: 'A better future needs a hero today. We can handle this!',
};

const policies = [
    {
        number: '1',
        type: 'The Official Law',
        name: 'The Global Harmony Accord',
        description: 'The grand, international treaty or foundational ideology.',
        spin: 'The government announces that borders are a relic of the past and that this accord ushers in a golden age of peace.',
        reality: 'It gives the state the legal loophole to bypass domestic citizenship laws and systematically bring in compliant populations.',
    },
    {
        number: '2',
        type: 'The Internal Program',
        name: 'The Cultural Enrichment Initiative (CEI)',
        description: 'The bureaucratic machine that actually executes the plan day-to-day.',
        spin: 'Government offices feature bright, smiling posters promoting "The CEI: Building Tomorrow\'s Community Today." Citizens who question it are labeled "anti-enrichment" or "regressive."',
        reality: 'It manages the logistics of settling foreign nationals into specific voting districts or cities to dilute the political power of the thoughtful citizens.',
    },
    {
        number: '3',
        type: 'The Legislative Action',
        name: 'The Demographic Realignment Act',
        description: 'The specific piece of legislation passed by a corrupt parliament or council.',
        spin: 'Framed as a standard administrative redistricting bill to fix economic gaps.',
        reality: 'It strips the native, critical thinkers of their voting leverage and outlaws political opposition under the guise of "preventing social friction."',
    },
    {
        number: '4',
        type: 'The Propaganda Slogan',
        name: '"The Fountain of Youth"',
        description: 'The emotional, catchy phrase the state media uses to sell the policy to the public.',
        spin: 'State broadcasters say: "Our old way of thinking was tired and stagnant. These new arrivals are our country\'s Fountain of Youth!"',
        reality: 'A subtle, psychological insult directed at the original citizens. The state is telling them that their critical, thoughtful, and analytical minds are old, useless, and need to be replaced by younger, more malleable minds.',
    },
];

// ── Policies tab ─────────────────────────────────────────────────────────────

function PoliciesTab() {
    return (
        <>
            {/* HERO agency */}
            <Block>
                <SectionLabel>The Agency</SectionLabel>
                <div className="px-8 py-8">
                    <div className="flex items-baseline gap-4 mb-3">
                        <span className="font-[family-name:var(--font-cinzel)] text-3xl tracking-[0.08em] text-gold/80">{heroAgency.acronym}</span>
                        <span className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone">{heroAgency.name}</span>
                    </div>
                    <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 italic text-parchment-2 border-l-2 border-gold-muted/40 pl-6 mt-4">
                        &ldquo;{heroAgency.slogan}&rdquo;
                    </p>
                </div>
            </Block>

            {/* policy cards */}
            {policies.map((p) => (
                <Block key={p.number}>
                    <div className="px-8 py-6 border-b border-gold-muted/15 flex items-baseline gap-4">
                        <span className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.4em] text-muted">{p.number}</span>
                        <div>
                            <span className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim mr-3">{p.type}</span>
                            <span className="font-[family-name:var(--font-cinzel)] text-lg tracking-[0.04em] text-parchment-2">{p.name}</span>
                        </div>
                    </div>
                    <div className="px-8 py-5 border-b border-gold-muted/10">
                        <p className="font-[family-name:var(--font-cormorant)] text-lg leading-8 text-stone">{p.description}</p>
                    </div>
                    <div className="grid md:grid-cols-2 divide-x divide-gold-muted/15">
                        <div className="px-8 py-6">
                            <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-muted mb-3">The Spin</div>
                            <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-stone italic">{p.spin}</p>
                        </div>
                        <div className="px-8 py-6">
                            <div className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim mb-3">The Reality</div>
                            <p className="font-[family-name:var(--font-cormorant)] text-xl leading-8 text-parchment-3">{p.reality}</p>
                        </div>
                    </div>
                </Block>
            ))}
        </>
    );
}

// ── Page ─────────────────────────────────────────────────────────────────────

const TABS = ['Strategies', 'The Society', 'Policies'] as const;
type Tab = typeof TABS[number];

export default function BreakingPointPage() {
    const [active, setActive] = useState<Tab>('Strategies');

    return (
        <main className="min-h-screen overflow-hidden bg-void text-parchment">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(157,113,59,0.18),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(55,76,88,0.18),transparent_36%)]" />
                <div className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(to_right,#e9dec4_1px,transparent_1px),linear-gradient(to_bottom,#e9dec4_1px,transparent_1px)] bg-[size:72px_72px]" />
            </div>

            <section className="relative z-10 mx-auto max-w-6xl px-6 py-8">

                {/* header */}
                <div className="mt-8 border border-gold-muted/20 bg-surface/80 p-7">
                    <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim">
                        Project
                    </div>
                    <h1 className="mt-4 font-[family-name:var(--font-cinzel)] text-2xl tracking-[0.06em] text-parchment-2">
                        Breaking Point
                    </h1>
                </div>

                {/* tabs */}
                <div className="flex items-center gap-1 border-b border-gold-muted/20 mt-8">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActive(tab)}
                            className={`px-4 py-3 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] transition-colors border-b-2 -mb-px ${active === tab
                                ? 'border-gold text-gold'
                                : 'border-transparent text-muted hover:text-stone'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {active === 'Strategies' && <StrategiesTab />}
                {active === 'The Society' && <SocietyTab />}
                {active === 'Policies' && <PoliciesTab />}

                <div className="h-16" />
            </section>
        </main>
    );
}
