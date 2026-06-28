import Link from 'next/link';

export default function HundredMillionPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-[#0b0a08] text-[#e9dec4]">
            {/* background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(157,113,59,0.18),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(55,76,88,0.18),transparent_36%)]" />
                <div className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(to_right,#e9dec4_1px,transparent_1px),linear-gradient(to_bottom,#e9dec4_1px,transparent_1px)] bg-[size:72px_72px]" />
                <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b1844f]/10" />
                <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b1844f]/15" />
            </div>

            <section className="relative z-10 mx-auto min-h-screen max-w-6xl px-6 py-8">
                {/* premise */}
                <div className="mt-10 border border-[#b1844f]/20 bg-[#0f0e0c]/80 p-7">
                    <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-[#a4774c]">
                        Premise
                    </div>
                    <p className="mt-5 max-w-3xl font-[family-name:var(--font-cormorant)] text-2xl leading-9 text-[#d7ccb4]">
                        A $100M idea does not require invention. It requires reading what millions of people already paid to feel — then building the infrastructure around that feeling.
                    </p>
                </div>

                {/* nav tiles */}
                <section className="mt-8 grid gap-4 md:grid-cols-3">
                    <Link
                        href="/100m/books"
                        className="group border border-[#b1844f]/30 bg-[#100f0d]/75 p-6 transition-colors hover:border-[#b1844f]/60 hover:bg-[#100f0d]"
                    >
                        <div className="font-[family-name:var(--font-cinzel)] text-2xl text-[#d6b274]">I</div>
                        <h2 className="mt-5 font-[family-name:var(--font-cinzel)] text-lg leading-7 tracking-[0.04em] text-[#eadfca]">
                            Books
                        </h2>
                        <p className="mt-4 font-[family-name:var(--font-cormorant)] text-lg leading-7 text-[#a79c86]">
                            Titles that crossed 10M copies. What did they sell that wasn&apos;t on the cover?
                        </p>
                        <div className="mt-6 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] text-[#a4774c] group-hover:text-[#d6b274] transition-colors">
                            Enter →
                        </div>
                    </Link>

                    <Link
                        href="/100m/tropes"
                        className="group border border-[#b1844f]/30 bg-[#100f0d]/75 p-6 transition-colors hover:border-[#b1844f]/60 hover:bg-[#100f0d]"
                    >
                        <div className="font-[family-name:var(--font-cinzel)] text-2xl text-[#d6b274]">II</div>
                        <h2 className="mt-5 font-[family-name:var(--font-cinzel)] text-lg leading-7 tracking-[0.04em] text-[#eadfca]">
                            Tropes
                        </h2>
                        <p className="mt-4 font-[family-name:var(--font-cormorant)] text-lg leading-7 text-[#a79c86]">
                            The ten narrative engines behind every story that crossed 100M. The setting changes. The engine doesn&apos;t.
                        </p>
                        <div className="mt-6 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.45em] text-[#a4774c] group-hover:text-[#d6b274] transition-colors">
                            Enter →
                        </div>
                    </Link>

                    <div className="border border-[#b1844f]/15 bg-[#100f0d]/40 p-6 opacity-40">
                        <div className="font-[family-name:var(--font-cinzel)] text-2xl text-[#d6b274]">III</div>
                        <h2 className="mt-5 font-[family-name:var(--font-cinzel)] text-lg leading-7 tracking-[0.04em] text-[#eadfca]">
                            Products
                        </h2>
                        <p className="mt-4 font-[family-name:var(--font-cormorant)] text-lg leading-7 text-[#a79c86]">
                            Coming.
                        </p>
                    </div>
                </section>
            </section>
        </main>
    );
}
