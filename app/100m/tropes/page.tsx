const tropes = [
    {
        number: 'I',
        name: "The Hero's Journey",
        arc: 'Departure → Ordeal → Return',
        mechanic:
            'A call to adventure pulls the protagonist from their ordinary world. Trials strip them down. A symbolic death and rebirth remakes them. They return home transformed, carrying a gift for their original world.',
        hook: 'Mirrors the universal experience of growing up: leaving home, confronting fear, becoming someone new.',
        examples: ['The Lord of the Rings', 'The Matrix', 'Avatar', 'The Alchemist', 'Star Wars'],
    },
    {
        number: 'II',
        name: 'The Underdog',
        arc: 'David vs. Goliath',
        mechanic:
            'A small protagonist faces a massively superior adversary — an empire, a monopoly, a god. Zero statistical chance of winning. Victory comes through grit, cleverness, or moral force.',
        hook: 'The belief that heart beats power. Gives permission to try. Works on everyone who has ever felt outgunned.',
        examples: ['Rocky', 'Star Wars', 'The Hunger Games', 'Gladiator', 'Miracle', 'Erin Brockovich'],
    },
    {
        number: 'III',
        name: 'The Chosen One',
        arc: 'Secret Destiny Revealed',
        mechanic:
            'An ordinary-seeming protagonist carries a hidden specialness — bloodline, prophecy, innate power — that only becomes legible under pressure. The story is the process of their accepting what they always were.',
        hook: 'The fantasy that our ordinary life conceals an extraordinary truth about ourselves. That we were born for something.',
        examples: ['Harry Potter', 'Dune', 'The Matrix', 'The Lion King', 'Percy Jackson'],
    },
    {
        number: 'IV',
        name: 'The Fall from Grace',
        arc: 'Hubris → Ruin → Reckoning',
        mechanic:
            'A powerful protagonist is destroyed by a fatal flaw — pride, ambition, fear. The fall is proportional to the height. The audience watches knowing the crash is coming.',
        hook: 'Vicarious catharsis. Our own flaws projected large, the consequence suffered safely. Also satisfies a dark egalitarian instinct: no one escapes their nature.',
        examples: ['Macbeth', 'Breaking Bad', 'The Great Gatsby', 'Scarface', 'Succession'],
    },
    {
        number: 'V',
        name: 'Redemption Arc',
        arc: 'Sinner Becomes Worthy',
        mechanic:
            'A character who has done genuine harm undergoes a sustained internal reckoning — not a single gesture, but repeated costly choices that establish new character. The audience is shown what it costs to become better.',
        hook: 'The belief that people can change. That past wrongs do not permanently define a person. The most forgiving of all tropes.',
        examples: ['A Christmas Carol', 'Les Misérables', 'The Kite Runner', "Schindler's List", 'Iron Man'],
    },
    {
        number: 'VI',
        name: 'The Trojan Horse',
        arc: 'Hidden Threat Within',
        mechanic:
            'A character or object presents as safe to gain access to a protected space. Once inside, the true nature is revealed. Dramatic irony — the audience knows, the characters do not — generates sustained dread.',
        hook: 'Fear of betrayal. The terror of the enemy you let in. The most intimate form of danger.',
        examples: ['Get Out', 'Parasite', 'Gone Girl', 'Ex Machina', 'The Talented Mr. Ripley'],
    },
    {
        number: 'VII',
        name: 'Forbidden Love',
        arc: 'Romeo & Juliet',
        mechanic:
            'Two characters are drawn across an uncrossable divide — family, class, war, time. Every step toward each other is a step toward catastrophe. The obstacle is structural, not personal.',
        hook: 'Desire intensified by prohibition. The tragic register tells us the feeling was real precisely because it was impossible.',
        examples: ['Romeo and Juliet', 'Titanic', 'Pride and Prejudice', 'Twilight', 'Atonement'],
    },
    {
        number: 'VIII',
        name: 'Fish Out of Water',
        arc: 'Stranger in a Strange Land',
        mechanic:
            "A protagonist is dropped into a world with different rules — physical, social, temporal, cultural. Their outsider perspective exposes the absurdities of both worlds. Adaptation is the plot; understanding is the prize.",
        hook: 'The experience of being new, foreign, or displaced is universal. The trope validates disorientation and promises it leads somewhere.',
        examples: ['The Little Prince', 'Alice in Wonderland', 'The Martian', 'Outlander', 'Crocodile Dundee'],
    },
    {
        number: 'IX',
        name: 'The Ticking Clock',
        arc: 'Race Against Inevitable Doom',
        mechanic:
            'A deadline — real or metaphorical — creates irreversible pressure. Every scene narrows the window. The tension is arithmetical: each moment the problem is not solved, the cost compounds.',
        hook: 'Mimics the structure of mortality itself. The most direct mechanism for sustained reader anxiety.',
        examples: ['Speed', '24', 'Gone Girl', 'Apollo 13', 'And Then There Were None'],
    },
    {
        number: 'X',
        name: 'Overcoming the Monster',
        arc: 'Existential Threat → Confrontation → Survival',
        mechanic:
            'An existential threat — a literal monster, a virus, a serial killer, an invading army — casts a shadow over a community or the world. The protagonist steps up to slay it. The stakes are binary: kill or be killed.',
        hook: 'Taps directly into evolutionary survival instinct. A mental processing tool for overwhelming threats that feel far larger than us. The oldest story humans know how to tell.',
        examples: ['Jaws', 'Alien', 'Dracula', 'Jurassic Park', 'Beowulf'],
    },
    {
        number: 'XI',
        name: 'The Riddle',
        arc: 'Chaos → Investigation → Truth Restored',
        mechanic:
            'A disruption — a murder, a disappearance, a stolen artifact, a bizarre anomaly — leaves behind chaos and a total lack of clarity. The protagonist gathers fragmented data, filters noise, and reconstructs the objective truth.',
        hook: 'Satisfies the brain\'s craving for closure and order. Reassures us that no matter how chaotic the world seems, truth exists and can be uncovered if we look closely enough.',
        examples: ['Sherlock Holmes', 'The Da Vinci Code', 'Knives Out', 'Gone Girl', 'True Crime'],
    },
    {
        number: 'XII',
        name: 'Cinderella',
        arc: 'Unjust Fall → Magical Rise → Public Vindication',
        mechanic:
            'Protagonist begins in undeserved suffering, possesses hidden worth the environment cannot suppress, receives an outside catalyst, and receives public validation — the abusers are forced to witness the elevation.',
        hook: 'Cosmic justice. The promise that inherent worth will eventually be seen — that the universe corrects imbalance.',
        examples: ['Cinderella', 'Pretty Woman', 'The Pursuit of Happyness', 'Maid in Manhattan', 'Oliver Twist'],
    },
];

export default function TropesPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-[#0b0a08] text-[#e9dec4]">
            {/* background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(157,113,59,0.18),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(55,76,88,0.18),transparent_36%)]" />
                <div className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(to_right,#e9dec4_1px,transparent_1px),linear-gradient(to_bottom,#e9dec4_1px,transparent_1px)] bg-[size:72px_72px]" />
                <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b1844f]/10" />
                <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b1844f]/15" />
            </div>

            <section className="relative z-10 mx-auto max-w-6xl px-6 py-8">
                {/* premise */}
                <div className="mt-8 border border-[#b1844f]/20 bg-[#0f0e0c]/80 p-7">
                    <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-[#a4774c]">
                        Signal
                    </div>
                    <p className="mt-5 max-w-3xl font-[family-name:var(--font-cormorant)] text-xl leading-9 text-[#d7ccb4]">
                        Every trope on this list sells the same underlying commodity: the feeling that the universe is structured — that effort, worth, or fate produces a proportional outcome. That belief is the product. The story is the delivery mechanism.
                    </p>
                </div>

                {/* tropes */}
                <div className="mt-8 space-y-px border border-[#b1844f]/20">
                    {tropes.map((trope) => (
                        <div
                            key={trope.number}
                            className="group bg-[#100f0d]/75 px-6 py-7 hover:bg-[#100f0d] transition-colors"
                        >
                            <div className="flex items-baseline gap-5">
                                <span className="font-[family-name:var(--font-cinzel)] text-sm text-[#a4774c]/60 tabular-nums shrink-0">
                                    {trope.number}
                                </span>
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                                        <span className="font-[family-name:var(--font-cinzel)] text-lg tracking-[0.04em] text-[#eadfca]">
                                            {trope.name}
                                        </span>
                                        <span className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-[#81745e]">
                                            {trope.arc}
                                        </span>
                                    </div>

                                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                                        <div>
                                            <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.45em] text-[#a4774c] mb-2">
                                                Mechanic
                                            </div>
                                            <p className="font-[family-name:var(--font-cormorant)] text-base leading-7 text-[#a79c86]">
                                                {trope.mechanic}
                                            </p>
                                        </div>
                                        <div>
                                            <div className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.45em] text-[#a4774c] mb-2">
                                                Hook
                                            </div>
                                            <p className="font-[family-name:var(--font-cormorant)] text-base leading-7 text-[#a79c86]">
                                                {trope.hook}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {trope.examples.map((ex) => (
                                            <span
                                                key={ex}
                                                className="border border-[#b1844f]/20 px-3 py-1 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.3em] text-[#81745e]"
                                            >
                                                {ex}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="h-16" />
            </section>
        </main>
    );
}
