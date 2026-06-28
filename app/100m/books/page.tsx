import Link from 'next/link';

const categories = [
    {
        label: 'Self-Help / Psychology / Productivity',
        books: [
            { title: 'The 7 Habits of Highly Effective People', copies: '~25M+' },
            { title: 'How to Win Friends and Influence People', copies: '~30M+' },
            { title: 'The Power of Positive Thinking', copies: '~20M+' },
            { title: 'Think and Grow Rich', copies: '~100M claimed' },
            { title: 'The Subtle Art of Not Giving a F*ck', copies: '10M+' },
            { title: 'Atomic Habits', copies: '20M+' },
            { title: "Who Moved My Cheese?", copies: '25M+' },
            { title: 'Men Are from Mars, Women Are from Venus', copies: '15M+' },
            { title: 'The Secret', copies: '30M+' },
            { title: 'You Can Heal Your Life', copies: '50M+' },
            { title: 'Rich Dad Poor Dad', copies: '40M+' },
            { title: 'The Purpose Driven Life', copies: '50M+' },
        ],
    },
    {
        label: 'Spiritual / Mystical / Religious-adjacent',
        books: [
            { title: 'The Celestine Prophecy', copies: '20M+' },
            { title: 'The Road Less Traveled', copies: '10M+' },
            { title: 'The Four Agreements', copies: '15M+' },
        ],
    },
    {
        label: 'Fiction',
        books: [
            { title: 'The Alchemist', copies: '65M+' },
            { title: 'And Then There Were None', copies: '100M+' },
            { title: 'The Little Prince', copies: '200M+' },
            { title: 'A Tale of Two Cities', copies: '200M+' },
        ],
    },
];

export default function BooksPage() {
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
                        These books did not sell information. They sold a feeling of permission — to change, to matter, to stop, to begin. The product was never the pages.
                    </p>
                </div>

                {/* book grid by category */}
                <div className="mt-8 space-y-10">
                    {categories.map((cat) => (
                        <div key={cat.label}>
                            <div className="mb-4 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.5em] text-[#a4774c]">
                                {cat.label}
                            </div>
                            <div className="grid gap-px border border-[#b1844f]/20">
                                {cat.books.map((book, i) => (
                                    <div
                                        key={book.title}
                                        className="flex items-baseline justify-between bg-[#100f0d]/75 px-6 py-4 hover:bg-[#100f0d] transition-colors"
                                    >
                                        <div className="flex items-baseline gap-5">
                                            <span className="font-[family-name:var(--font-plex)] text-[9px] text-[#81745e]/60 tabular-nums">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <span className="font-[family-name:var(--font-cormorant)] text-lg text-[#d7ccb4]">
                                                {book.title}
                                            </span>
                                        </div>
                                        <span className="ml-6 shrink-0 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.35em] text-[#81745e]">
                                            {book.copies}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* bottom margin */}
                <div className="h-16" />
            </section>
        </main>
    );
}
