import Link from 'next/link';

const books = [
    {
        slug: 'the-hunger-games',
        title: 'The Hunger Games',
        author: 'Suzanne Collins',
        story: 'The elite maintain power by making the masses compete with one another instead of challenging the system.',
    },
];

export default function BooksPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-void text-parchment">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(157,113,59,0.18),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(55,76,88,0.18),transparent_36%)]" />
                <div className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(to_right,#e9dec4_1px,transparent_1px),linear-gradient(to_bottom,#e9dec4_1px,transparent_1px)] bg-[size:72px_72px]" />
                <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-muted/10" />
                <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-muted/15" />
            </div>

            <section className="relative z-10 mx-auto max-w-6xl px-6 py-8">
                <div className="mt-8 border border-gold-muted/20 bg-surface/80 p-7">
                    <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim">
                        Books
                    </div>
                    <p className="mt-5 max-w-3xl font-[family-name:var(--font-cormorant)] text-xl leading-9 text-parchment-3">
                        Analyses of books through the lens of power, pattern, and principle.
                    </p>
                </div>

                <div className="mt-8 space-y-px border border-gold-muted/20">
                    {books.map((book) => (
                        <Link
                            key={book.slug}
                            href={`/archives/books/${book.slug}`}
                            className="group flex flex-col gap-3 bg-surface-alt/75 px-8 py-7 hover:bg-surface-alt transition-colors"
                        >
                            <div className="flex flex-wrap items-baseline gap-4">
                                <h2 className="font-[family-name:var(--font-cinzel)] text-lg tracking-[0.04em] text-parchment-2 group-hover:text-gold transition-colors">
                                    {book.title}
                                </h2>
                                <span className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-stone">
                                    {book.author}
                                </span>
                            </div>
                            <p className="font-[family-name:var(--font-cormorant)] text-lg leading-7 text-stone">
                                {book.story}
                            </p>
                            <div className="mt-1 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] text-gold-dim group-hover:text-gold transition-colors">
                                Read →
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="h-16" />
            </section>
        </main>
    );
}
