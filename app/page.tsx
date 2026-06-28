import O3Summary from '@/components/O3Summary';

export default function HomePage() {
  const laws = [
    {
      number: 'I',
      title: 'The Law of Opposites',
      text: 'Each cycle, the opposite happens of the previous.',

    },
    {
      number: 'II',
      title: 'The Law of the Obvious',
      text: 'The right answer is usually the most obvious one.',
    },
    {
      number: 'III',
      title: 'The Law of Outliers',
      text: 'Todays anomaly defines the futures consensus',
    },
  ];

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
        {/* laws */}
        <section className="grid gap-4 border-t border-[#b1844f]/25 pt-6 mt-8 md:grid-cols-3">
          {laws.map((law) => (
            <article
              key={law.title}
              className="border border-[#b1844f]/20 bg-[#100f0d]/75 p-6"
            >
              <div className="font-[family-name:var(--font-cinzel)] text-2xl text-[#d6b274]">
                {law.number}
              </div>

              <h2 className="mt-5 font-[family-name:var(--font-cinzel)] text-lg leading-7 tracking-[0.04em] text-[#eadfca]">
                {law.title}
              </h2>

              <p className="mt-4 font-[family-name:var(--font-cormorant)] text-lg leading-7 text-[#a79c86]">
                {law.text}
              </p>
            </article>
          ))}
        </section>


      </section>
    </main>
  );
}
