// components/O3Summary.tsx

const rows = [
    {
        code: 'O1',
        primary: 'Obvious',
        words: ['Signal', 'Incentives'],
        meaning:
            'What is already driving behavior beneath the surface, and eventually becomes impossible to ignore.',
    },
    {
        code: 'O2',
        primary: 'Opposites',
        words: ['Swing', 'Inversion'],
        meaning:
            'The reversal that happens when a system is pushed far enough to become its opposite.',
    },
    {
        code: 'O3',
        primary: 'Outliers',
        words: ['Story', 'Inflection'],
        meaning:
            'The anomaly that marks the turning point and later becomes the story of the new cycle.',
    },
];

export default function O3Summary() {
    return (
        <section className="border border-[#b1844f]/20 bg-[#0f0e0c]/80 p-7">
            <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-[#a4774c]">
                O3 · Semantic Map
            </div>

            <p className="mt-5 max-w-3xl font-[family-name:var(--font-cormorant)] text-xl leading-8 text-[#d7ccb4]">
                Each law describes the same force through different words:
                philosophical, observational, and structural.
            </p>

            <div className="mt-8 grid gap-4">
                {rows.map((row) => (
                    <article
                        key={row.primary}
                        className="grid gap-5 border border-[#b1844f]/15 bg-[#100f0d]/80 p-5 md:grid-cols-[90px_1fr_1.2fr]"
                    >
                        <div className="font-[family-name:var(--font-cinzel)] text-2xl text-[#d6b274]">
                            {row.code}
                        </div>

                        <div>
                            <h3 className="font-[family-name:var(--font-cinzel)] text-xl tracking-[0.04em] text-[#eadfca]">
                                {row.primary}
                            </h3>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {row.words.map((word) => (
                                    <span
                                        key={word}
                                        className="border border-[#b1844f]/20 px-3 py-1 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.35em] text-[#a4774c]"
                                    >
                                        {word}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <p className="font-[family-name:var(--font-cormorant)] text-lg leading-7 text-[#a79c86]">
                            {row.meaning}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
}