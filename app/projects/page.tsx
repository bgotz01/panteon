import Link from 'next/link';

const projects = [
    {
        href: '/projects/o3-theory',
        label: 'O3 Theory',
        description: 'A framework for understanding compound asymmetry and the laws of opposites, the obvious, and outliers.',
    },
    {
        href: '/projects/breaking-point',
        label: 'Breaking Point',
        description: 'Placeholder.',
    },
];

export default function ProjectsPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-void text-parchment">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(157,113,59,0.18),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(55,76,88,0.18),transparent_36%)]" />
                <div className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(to_right,#e9dec4_1px,transparent_1px),linear-gradient(to_bottom,#e9dec4_1px,transparent_1px)] bg-[size:72px_72px]" />
            </div>

            <section className="relative z-10 mx-auto max-w-6xl px-6 py-8">
                <div className="mt-8 border border-gold-muted/20 bg-surface/80 p-7">
                    <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim">
                        Projects
                    </div>
                    <p className="mt-3 font-[family-name:var(--font-cormorant)] text-xl leading-9 text-parchment-3">
                        Works in progress.
                    </p>
                </div>

                <div className="mt-8 space-y-px border border-gold-muted/20">
                    {projects.map((p) => (
                        <Link
                            key={p.href}
                            href={p.href}
                            className="group flex flex-col gap-2 bg-surface-alt/75 px-6 py-8 hover:bg-surface-alt transition-colors"
                        >
                            <span className="font-[family-name:var(--font-cinzel)] text-lg tracking-[0.04em] text-parchment-2 group-hover:text-gold transition-colors">
                                {p.label}
                            </span>
                            <span className="font-[family-name:var(--font-cormorant)] text-base leading-7 text-stone">
                                {p.description}
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="h-16" />
            </section>
        </main>
    );
}
