// ─── Page context registry ────────────────────────────────────────────────────
// Each entry exposes the meaningful text content of an app page or note so the
// Council can inject it into the system prompt as a persistent reference.

export interface PageRef {
    id: string;       // short key used internally
    label: string;    // display name shown in the UI
    group: string;    // grouping label
    path?: string;    // app route this page lives at (e.g. '/laws/o1')
    content: string;  // the text to inject
}

export const PAGE_REFS: PageRef[] = [
    // ── Laws ──────────────────────────────────────────────────────────────────
    {
        id: 'laws/o1',
        label: 'O1 · Law of Opposites',
        group: 'Laws',
        path: '/laws/o1',
        content: `O1 — LAW OF OPPOSITES
Axiom: "Every new cycle inverts the dominant characteristic of the previous one."

What this law IS:
— A law of evolution, not oscillation.
— A structural pattern — each new cycle inverts the dominant characteristic of the previous one.
— A forward movement. The prior cycle defines the axis. The next cycle moves to the other end.

What this law IS NOT:
— A pendulum. The next cycle does not swing back to something that existed before.
— A reversion. The opposite does not need to have existed previously — it is often genuinely new.
— A prediction of the full shape of what comes next — only the axis it moves along.

EXAMPLES — Pop Culture:
Hip-Hop → Eminem: Axis from "Black voice" to "White outsider". Hip-hop was born as a Black art form rooted in authenticity. Eminem arrived as a white kid from Detroit who out-rapped nearly everyone — and the genre that celebrated Black authenticity crowned him its greatest.
Golf → Tiger Woods: Axis from "white exclusivity" to "mixed-race outsider". Golf was built around exclusion. Tiger Woods became the most dominant golfer in history and the most recognisable athlete on earth — a Black man who didn't just enter the sport but redefined it.

EXAMPLES — Industry:
Blockbuster → Netflix: Axis from "scheduled" to "on-demand". Subscription, no late fees, infinite catalog, viewer sets the schedule.
Hotels → Airbnb: Axis from "standardization" to "uniqueness". Unique homes, individual hosts, existing inventory.
Hollywood → YouTube: Axis from "gatekeepers" to "creators". Anyone with a camera could publish to a global audience.
Taxi Industry → Uber: Axis from "restricted supply" to "open supply". Any driver, mobile platform, elastic supply.

EXAMPLES — Religion:
Paganism → Judaism: Axis from "many gods" to "one god".
Judaism → Christianity: Axis from "one people" to "all people".
Christianity → Islam: Axis from "God becomes man" to "man submits to God".

EXAMPLES — Empires:
Portuguese → Spanish: Axis from "trade routes" to "territory".
Spanish → British: Axis from "extraction" to "industry".
British → American: Axis from "territorial control" to "systemic influence".`,
    },
    {
        id: 'laws/o2',
        label: 'O2 · Law of the Obvious',
        group: 'Laws',
        path: '/laws/o2',
        content: `O2 — LAW OF THE OBVIOUS
Axiom: "The obvious is not the solution. It is the tension."

The "obvious" is the visible tension — not the answer.
In 2008 the obvious problem was money printing, institutional distrust, and the failure of the financial system. Bitcoin was not obvious yet. It was technical, obscure.
The better question was: if the old money system is broken, where is the opposite behavior emerging?
Young people were moving online — social life, identity, gaming, communities, coordination.
So the deeper obvious was: if young people are living on the internet, money will eventually become internet-native.

O1 = identify the obvious tension + the obvious behavioral migration.

Major waves create the conditions for their own opposite.
A dominant era eventually produces: excess, fatigue, imitation, distortion, diminishing emotional returns.
The opposite usually looks: unattractive, low-status, unserious, emotionally wrong — during the prior cycle. That's why it's asymmetric early.

Cultural inversions:
— Crypto mania (decentralized, anti-institutional, chaotic) → AI cycle (centralized, institutional, infrastructure-driven)
— 1980s Pop Icons (glamour, performance, excess, polish) → 1990s Grunge (authenticity, rawness, imperfection)
— Maximalism → Minimalism
— Noise → Silence
— Hustle culture → Calmness

The opposite feels "obvious" only once the emotional transition begins — and then everyone says "of course."`,
    },
    {
        id: 'laws/o3',
        label: 'O3 · Law of Outliers',
        group: 'Laws',
        path: '/laws/o3',
        content: `O3 — LAW OF OUTLIERS
Axiom: "Power-law systems concentrate rewards into a very small number of winners."

Power-law systems concentrate rewards into a very small number of winners.
Most people recognize the trend. Very few identify the outlier that captures the majority of the value.

Examples: crypto → Bitcoin / AI → Nvidia / social media → Facebook/Google / ecommerce → Amazon

The outlier idea must satisfy three conditions simultaneously:
1. It feels absurd — it violates the current worldview. People laugh. "God becoming man?" "Money without a government?" "Cars driving themselves?" The consensus rejects it.
2. It solves a tension everyone feels — the idea is not random, it emerges because reality is creating pressure.
3. Once seen, it becomes obvious — every great O3 idea has a "how did we not see this?" quality.

The pattern: Heresy → System → Empire
— Heresy: a belief that challenges the accepted order. People reject, mock, fear it.
— System: the heresy becomes organized, gains a vehicle.
— Empire: the system becomes dominant. The former heresy becomes the establishment.

Structure of O3:
O3A — The Narrow Path: The more a new idea departs from consensus, the greater its potential impact. Going from 0 to 1.
O3B — New Medium: The idea creates a new channel through which value can flow (Church, blockchain, smartphones, AI infrastructure).
O3C — The Power Law: Once a new territory opens, one or two winners capture most of the value.

Vision → Vehicle → Victory
Myth → Medium → Monopoly
Mission → Medium → Monopoly

The sequence: O1 (Pressure/Saturation) → O2 (Obvious tension) → O3 (Breakthrough/Outlier)
Tomorrow's common sense looks insane today.`,
    },

    // ── Archives ──────────────────────────────────────────────────────────────
    {
        id: 'archives/books/the-hunger-games',
        label: 'The Hunger Games',
        group: 'Archives',
        path: '/archives/books/the-hunger-games',
        content: `THE HUNGER GAMES — Suzanne Collins (Book Analysis)
The elite maintain power by making the masses compete with one another instead of challenging the system.

SURFACE vs DEEPER MEANING:
Children fight → The powerless compete against each other.
The Capitol watches → The powerful remain insulated.
One winner emerges → The system survives unchanged.
Everyone cheers → The audience legitimizes the system.

THE MISDIRECTION MECHANIC:
The genius of the story is that the districts never point their anger upward. They point it sideways.
Instead of Districts vs. Capitol, the system creates District vs. District, and eventually Child vs. Child.

CENTRAL METAPHOR: A ruling class preserves its power by turning the struggles of ordinary people into competition and entertainment.

KATNISS — The Outlier:
Cooperation defeats the system that depends on competition.
System → Outlier:
Compete → Cooperate
Scarcity → Solidarity
Divide → Unite
Fear → Trust
Game → Refuse the game`,
    },
    {
        id: 'archives/hermetic-principles',
        label: 'Hermetic Principles',
        group: 'Archives',
        path: '/archives/hermetic-principles',
        content: `HERMETIC PRINCIPLES (from The Kybalion, attributed to Hermes Trismegistus)
Seven laws describing the structure of reality.

I. MENTALISM — "The All is Mind."
The universe is fundamentally mental in nature. Reality originates from consciousness. Thoughts, beliefs, and perceptions shape how we experience the world.

II. CORRESPONDENCE — "As above, so below; as below, so above."
Patterns repeat across different levels of reality. The microcosm reflects the macrocosm. Human psychology may mirror broader patterns found in society or nature.

III. VIBRATION — "Nothing rests; everything moves."
Everything is in motion and vibrates at some frequency — physical, mental, or spiritual. Matter, energy, emotions, and thoughts are all differing rates of vibration.

IV. POLARITY — "Everything is dual."
Opposites are actually extremes of the same thing — they exist on the same continuum and can transform into one another. Hot ↔ Cold / Light ↔ Dark / Love ↔ Hate.

V. RHYTHM — "Everything flows, out and in."
Life moves in cycles and pendulum-like swings. Seasons / Economic booms and recessions / Emotional highs and lows.

VI. CAUSE AND EFFECT — "Every cause has its effect; every effect has its cause."
Nothing happens by chance. Decisions, habits, and actions produce corresponding outcomes.

VII. GENDER — "Gender is in everything."
Complementary creative forces — masculine and feminine energies. Active and receptive / Projective and nurturing / Logic and intuition.`,
    },

    // ── 100M ──────────────────────────────────────────────────────────────────
    {
        id: '100m/premise',
        label: '100M · Premise',
        group: '100M',
        path: '/100m',
        content: `100M — PREMISE
A $100M idea does not require invention. It requires reading what millions of people already paid to feel — then building the infrastructure around that feeling.

Three sections:
I. Books — Titles that crossed 10M copies. What did they sell that wasn't on the cover?
II. Tropes — The ten narrative engines behind every story that crossed 100M. The setting changes. The engine doesn't.
III. Products — (coming)`,
    },
    {
        id: '100m/tropes',
        label: '100M · Narrative Tropes',
        group: '100M',
        path: '/100m/tropes',
        content: `100M — NARRATIVE TROPES
The emotional engines behind the best-selling stories ever told. Change the setting, characters, era — the engine stays the same.

1. CINDERELLA (Unjust Fall → Magical Rise → Public Vindication)
Protagonist begins in undeserved suffering with hidden worth. Outside catalyst breaks status quo. Climax delivers public validation — abusers forced to witness elevation.
Psychological hook: cosmic justice. Promise that inherent worth will eventually be seen.
Examples: Harry Potter / Pretty Woman / The Pursuit of Happyness

2. THE UNDERDOG (David vs. Goliath)
Small group faces massively superior adversary. Wins through grit, cleverness, or moral force.
Psychological hook: heart beats power.
Examples: Star Wars / The Hunger Games / Rocky

3. THE HERO'S JOURNEY (Departure → Ordeal → Return)
Call to adventure, refusal, crossing the threshold, trials, symbolic death and rebirth, return transformed with a gift.
Psychological hook: mirrors the universal human experience of growing up.
Examples: Lord of the Rings / The Matrix / The Alchemist

4. THE TROJAN HORSE (Hidden Threat Within)
Character/object presents as safe to gain access to a protected space, then reveals destructive nature.
Psychological hook: fear of betrayal. The enemy you let in.
Examples: Get Out / Parasite / Gone Girl

5. FORBIDDEN LOVE (Romeo & Juliet)
Two characters drawn across an uncrossable divide. Every step toward each other is a step toward catastrophe.
Psychological hook: desire intensified by prohibition.
Examples: Titanic / Pride and Prejudice / Twilight

6. THE CHOSEN ONE (Secret Destiny Revealed)
Ordinary-seeming protagonist carries hidden specialness. Story is the process of accepting what they always were.
Psychological hook: the fantasy that ordinary life conceals extraordinary truth.
Examples: Harry Potter / Dune / The Matrix

7. THE FALL FROM GRACE (Hubris → Ruin → Reckoning)
Powerful protagonist destroyed by a fatal flaw — pride, ambition, lust, fear.
Psychological hook: vicarious catharsis. We see our own flaws projected large.
Examples: Macbeth / Breaking Bad / Succession

8. REDEMPTION ARC (Sinner Becomes Worthy)
Character who has done genuine harm undergoes sustained internal reckoning.
Psychological hook: belief that people can change.
Examples: A Christmas Carol / Les Misérables / Schindler's List

9. THE FISH OUT OF WATER (Stranger in a Strange Land)
Protagonist dropped into a world with different rules. Outsider perspective exposes absurdities of both worlds.
Psychological hook: validates disorientation and promises it leads somewhere.
Examples: Alice in Wonderland / The Martian

10. THE TICKING CLOCK (Race Against Inevitable Doom)
A deadline creates irreversible pressure. Each moment something is not solved, the cost grows.
Psychological hook: mimics the structure of mortality itself.
Examples: Apollo 13 / Gone Girl / And Then There Were None

THE PATTERN BENEATH ALL PATTERNS:
Every trope sells the same underlying commodity — the feeling that the universe is structured. That effort, worth, or fate produces a proportional outcome. That belief is the product. The story is the delivery mechanism.`,
    },

    // ── Archives ─────────────────────────────────────────────────────────────
    {
        id: 'archives/iliad-odyssey',
        label: 'Iliad & Odyssey',
        group: 'Archives',
        path: '/archives/iliad-odyssey',
        content: `ILIAD & ODYSSEY — Homer, c. 8th century BC
Two epics, one war. The Iliad asks what it means to be the greatest warrior. The Odyssey asks what it means to find your way home.

COMPARISON:
Setting: Iliad = Battlefield / Odyssey = Journey home
Hero: Iliad = Achilles / Odyssey = Odysseus
Primary Virtue: Iliad = Courage / Odyssey = Wisdom
Wins Through: Iliad = Strength / Odyssey = Intelligence
Central Conflict: Iliad = External war / Odyssey = External obstacles + internal temptation
Goal: Iliad = Honor / Odyssey = Home
Greatest Fear: Iliad = Dying without glory / Odyssey = Never returning
Dominant Emotion: Iliad = Rage / Odyssey = Longing
Ending: Iliad = Death and mourning / Odyssey = Reunion and restoration

ACHILLES: Physical perfection, fearlessness, pride, intensity, honor. His choice: live forever in obscurity, or die young with eternal glory. He chooses glory.
ODYSSEUS: Cleverness, patience, adaptability, curiosity, self-control. Survives by thinking instead of overpowering — disguise, negotiation, strategic deception, waiting for the right moment.

OPENING WORDS:
Iliad: "Sing, goddess, of the rage of Achilles…" — first word is essentially rage (mēnin). Everything flows from uncontrolled anger.
Odyssey: "…the man of many turns…" — Odysseus constantly changes course, adapting, wandering. Flexibility instead of explosive anger.

GLORY vs HOME:
Achilles seeks: immortal reputation, honor, great deeds.
Odysseus seeks: his wife, his son, his kingdom, his bed, peace.
One wants history to remember him. The other wants to return to ordinary life.

PUBLIC vs PRIVATE:
Iliad: everything happens publicly. Honor exists because everyone sees it. Audience = kings, armies, heroes.
Odyssey: decisive moments happen in private. Focus shifts from battlefield to household. Encounters = husband and wife, father and son, guest and host, stranger and family.

FORCE vs INTELLIGENCE:
Achilles: solves problems by overwhelming force.
Odysseus: waiting, planning, deception, disguise, timing. The Trojan Horse captures this — Troy conquered not by stronger fighting but by clever strategy.

LITERARY PROGRESSION (Iliad → Odyssey):
Win the war → Live after the war
Destroy → Rebuild
Earn glory → Recover identity
The perfect warrior → The complete ruler`,
    },
    {
        id: 'archives/aeneid',
        label: 'Aeneid',
        group: 'Archives',
        path: '/archives/aeneid',
        content: `AENEID — Virgil, c. 29–19 BC
Virgil wrote the Aeneid as Rome's answer to Homer. It is not a single epic — it is both epics at once, in sequence. The first half mirrors the Odyssey. The second half mirrors the Iliad.

STRUCTURAL MIRROR:
Odyssey (Journey) → Aeneid Books 1–6 (Journey): Aeneas wanders the Mediterranean after the fall of Troy, driven by fate toward a land he has never seen.
Iliad (War) → Aeneid Books 7–12 (War): Aeneas arrives in Italy and fights a brutal war against the Latin tribes to claim the land promised by the gods.

WHO IS AENEAS: A Trojan prince — noble through his father. Fights alongside Hector. Respected as a capable warrior. Survives the war. Homer hints he is destined to continue the Trojan line.

WHY AENEAS: Virgil could have written about the man who won the war. Instead he wrote about the man who survived losing it. Aeneas has lost his city, home, friends, wife, and kingdom — yet continues because he believes he has a mission to fulfill.

THE SYMBOLIC IMAGE: The most famous image of Aeneas is not him killing an enemy — it is him escaping the burning city. He carries his father Anchises on his shoulders and leads his son Ascanius by the hand. Roman ideals: honor the past, protect the future, bear responsibility.

PRIMARY CONCERN:
Iliad = the individual hero
Odyssey = the family
Aeneid = the civilization

THEMATIC COMPARISON:
Hero seeks: Iliad = Glory / Odyssey = Home / Aeneid = Destiny
Hero represents: Iliad = Warrior / Odyssey = Survivor / Aeneid = Founder
Highest virtue: Iliad = Honor / Odyssey = Wisdom / Aeneid = Duty
Goal: Iliad = Win the war / Odyssey = Return home / Aeneid = Build a future
Ends with: Iliad = Funeral / Odyssey = Reunion / Aeneid = Beginning of Rome

AENEAS AS SYNTHESIS: Like Odysseus — he wanders, survives storms, visits strange lands, descends into the underworld. Like Achilles — he becomes a great warrior, fights a final duel, the second half centers on war. But his purpose is neither glory nor home. It is history.

THE CENTRAL QUESTIONS:
Achilles: "How should I be remembered?"
Odysseus: "How do I get my life back?"
Aeneas: "What must I sacrifice so that a nation can exist?"

WHY VIRGIL DID THIS: Writing during the reign of Augustus. Wanted to answer: where did Rome come from? His answer: Rome was born from the ashes of Troy. This gave Rome prestigious ancestry — descending from the heroes of Troy, civilization older than Greece, empire part of destiny from the beginning.

THE BRILLIANT TWIST: The Greeks wrote stories celebrating the victory over Troy. Virgil writes from the perspective of the defeated. The Aeneid transforms a defeat into a beginning. For the Greeks, Troy is the end of a great war. For the Romans, Troy is the beginning of their civilization. One of the most elegant literary inversions in history.`,
    },
    {
        id: 'archives/dante',
        label: "Dante's Inferno",
        group: 'Archives',
        path: '/archives/dante',
        content: `DANTE'S INFERNO — Dante Alighieri, Divine Comedy, c. 1308–1320

Hell progresses from failures of self-control to deliberate misuse of reason. Betrayal is the gravest sin because it destroys the trust that makes families, friendships, societies, and civilizations possible.

THE 9 CIRCLES:
I. Limbo — Virtuous non-Christians, unbaptized infants. No physical torture, but eternal separation from God.
II. Lust — Blown endlessly through violent winds, symbolizing lack of self-control.
III. Gluttony — Forced to lie in freezing, filthy rain while guarded by Cerberus.
IV. Greed — Push enormous weights against one another forever.
V. Wrath — The wrathful fight on the surface of the river Styx; the sullen gurgle beneath it.
VI. Heresy — Trapped in burning tombs.
VII. Violence (three rings): against others (boiling blood river), against self/suicide (transformed into thorny trees), against God/nature/art (burning sand under rain of fire).
VIII. Fraud (Malebolge — ten ditches): seducers, flatterers, simoniacs, false prophets, corrupt politicians, hypocrites, thieves, fraudulent advisers, sowers of discord, falsifiers.
IX. Treachery — Frozen in a lake of ice. Four zones: Caina (betrayers of family), Antenora (betrayers of country), Ptolomea (betrayers of guests), Judecca (betrayers of benefactors). At the center: Satan, chewing Judas, Brutus, and Cassius eternally.

UPPER HELL vs LOWER HELL:
Upper Hell: "I couldn't control myself." — Passion, impulse, weakness, self-indulgence.
Lower Hell: "I knew exactly what I was doing." — Calculation, premeditation, corruption, exploitation.

WHY BETRAYAL IS THE WORST SIN:
A civilization exists because people trust one another — parents and children, friends, citizens and governments, businesses and contracts, investors and markets. Once trust disappears, everything else begins to collapse.
Violence destroys people. Betrayal destroys the bonds between people.`,
    },

    // ── Notes ─────────────────────────────────────────────────────────────────
    {
        id: 'notes/compound-asymmetry',
        label: 'Compound Asymmetry',
        group: 'Notes',
        content: `COMPOUND ASYMMETRY
"Compound asymmetry" compresses: leverage, nonlinearity, compounding, positioning, power laws, concentrated outcomes.

The deeper idea: Small aligned inputs can create disproportionately large downstream outcomes. The opposite of linearity.

Linear World: 1 + 1 = 2. More effort → proportionally more reward.
Asymmetric World: 1 + 1 = 11. Correct positioning multiplies outcomes.

That's: investing / virality / software / media / networks / outliers / timing / compounding.`,
    },
    {
        id: 'notes/outliers',
        label: 'Notes · Outliers',
        group: 'Notes',
        content: `NOTES — OUTLIERS
Power-law systems concentrate rewards into a very small number of winners.

Most people recognize the trend. Very few identify the outlier that captures the majority of the value.
Examples: crypto → Bitcoin / AI → Nvidia / social → Facebook/Google / ecommerce → Amazon/Shopify

You do not necessarily need to build the empire yourself. A single early alignment with the right outlier can create disproportionate returns (Bitcoin, Tesla, Nvidia early).

Identifying the outlier requires understanding: the obvious tension (O1) → the inversion emerging from it (O2) → where value is most likely to concentrate.

The outlier is usually: niche early / misunderstood / difficult to access / behaviorally aligned with the future.

Most people miss outliers because they seek social validation before conviction. By the time consensus fully accepts the outlier, much of the asymmetry is already gone.

The narrow path leads to riches. The safest path often carries the least upside. The old system does not recognize what will replace it.`,
    },

    // ── Chapters ──────────────────────────────────────────────────────────────
    {
        id: 'chapters/structure',
        label: 'Book Structure',
        group: 'Chapters',
        content: `BOOK STRUCTURE — "As Above, So Below"

PART I — ABOVE (Observable external reality)
The laws explained through Music, Media, Markets (The 3 Ms).
Highly observational and externally focused. Shared reality — recognizable cultural shifts — internet-native civilization.

PART II — STORIES (The bridge)
Stories are symbolic compressions of recurring human patterns.
Religion / mythology / famous books / archetypes / hero narratives / transformation stories.
How humans repeatedly encode the same patterns emotionally and symbolically.
The focus is not theology. The focus is: how stories preserve recurring human conditions.

PART III — BELOW (Human-scale manifestations)
Not prescriptive self-help. Helping the reader recognize asymmetry, saturation, inversion, positioning, narrow paths inside their own lives.
Personal stories / travel / YouTube/social media experiences / rejection / identity shifts.

Overall movement: Observe the world → Observe how humanity symbolically interprets the world → Observe yourself inside the world.

Tone: observational, exploratory, adaptive, non-dogmatic, culturally grounded. Every abstraction anchored to recognizable reality.
The reader should consistently feel: "I witnessed this myself. I just never connected the pattern."`,
    },
    {
        id: 'chapters/purpose',
        label: 'Book Purpose',
        group: 'Chapters',
        content: `BOOK PURPOSE

O1 — The Obvious: See reality clearly.
— Where is behavior migrating?
— What tensions are visible?
— What systems feel saturated?
— What is obviously changing?

O2 — Opposites: Recognize inversion.
— What exhausted system is creating demand for its opposite?
— What path looks irrational now because the current cycle dominates perception?
— What is emotionally underowned?

O3 — Outliers: Identify concentration.
— Which people/platforms/ideas absorb disproportionate value?
— What narrow path compounds wider outcomes?
— Where is energy concentrating?

What this is NOT:
— Not beliefs or faith. Rooted in observation, pattern recognition, visible cultural shifts.
— Not ideology. Not asking readers to adopt an identity or join a tribe.
— Not hustle culture. Positioning, asymmetry, timing, signal selection, leverage matter more than output.
— Not "I did it, so can you." Starts with shared reality, collective events — not personal triumph.
— Not a secret formula. A lens for recognizing asymmetry earlier.

The book sells: navigation — not certainty.
Not "Here is the guaranteed formula." But: "Here is how to perceive changing environments correctly."`,
    },
    {
        id: 'chapters/chapter01',
        label: 'Chapter 01 · Notes',
        group: 'Chapters',
        content: `CHAPTER 01 — NOTES

Opening questions that violate linear expectation:
— Warren Buffett: Why did the greatest investor in America miss the most profitable industry?
— Bitcoin: How did an internet currency with no founder become the best-performing asset of the century?
— YouTube: How are creators outperforming media corporations from their bedrooms?

These trigger: the feeling that old assumptions stopped working.

The framework emerged from repeatedly observing the same patterns across: culture, technology, wealth, media, behavior, institutions, personal life. Not invented — observed.

"I do not have beliefs, only observations."

This is not doctrine. It is an observational framework. The laws emerged from repeatedly watching the same patterns. If you find meaningful exceptions, they are genuinely wanted.

Key tone: detached / observant / systems-oriented / curious / culturally aware.
"I'm not telling you what to believe. I'm trying to understand what the world is becoming."

Modern readers are exhausted by: certainty performance / fake expertise / motivational preaching / ideological tribalism.
But deeply attracted to: pattern recognition / honest observation / frameworks that explain lived reality / people thinking in public.`,
    },
];

// Group them for the UI
export const PAGE_REF_GROUPS = Array.from(
    new Set(PAGE_REFS.map((r) => r.group))
);

/** Find a ref whose path matches the given pathname (exact or prefix). */
export function refForPath(pathname: string): PageRef | undefined {
    return PAGE_REFS.find((r) => r.path && (r.path === pathname || pathname.startsWith(r.path + '/')));
}

export function buildContextBlock(refs: PageRef[]): string {
    if (refs.length === 0) return '';
    const pageList = refs.map((r) => `"${r.label}"`).join(', ');
    return [
        '─── REFERENCED PAGES ───────────────────────────────────────────────────────',
        `The following ${refs.length === 1 ? 'page has' : 'pages have'} been attached as context for this conversation: ${pageList}.`,
        'If asked which pages you can see or what context you have, name them explicitly.',
        '',
        ...refs.map((r) => `### ${r.label}\n\n${r.content}`),
        '─── END OF REFERENCED PAGES ────────────────────────────────────────────────',
    ].join('\n');
}
