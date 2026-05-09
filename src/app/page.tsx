import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <span className="text-xl font-bold text-emerald-400">SpendLens</span>
        <Link href="/audit" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-2 rounded-lg text-sm transition">
          Start Free Audit →
        </Link>
      </nav>
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 max-w-4xl mx-auto">
        <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-4">Free AI Spend Audit</span>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          You&apos;re probably overpaying<br />
          <span className="text-emerald-400">for AI tools.</span>
        </h1>
        <p className="text-white/60 text-xl max-w-2xl mb-10">
          SpendLens audits your AI tool stack in 2 minutes — Cursor, ChatGPT, Claude, Copilot, and more. See exactly where you&apos;re overspending and how much you could save.
        </p>
        <Link href="/audit" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition shadow-lg shadow-emerald-500/20">
          Audit My AI Spend — It&apos;s Free
        </Link>
        <p className="text-white/30 text-sm mt-4">No login required. Results in under 2 minutes.</p>
      </section>
      <section className="border-t border-white/10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Enter your tools", desc: "Tell us which AI tools you pay for, which plan, and how many seats." },
              { step: "2", title: "Get your audit", desc: "Our engine compares your spend against every alternative and finds savings." },
              { step: "3", title: "Save money", desc: "Follow the recommendations or book a free Credex consultation for bigger savings." },
            ].map((item) => (
              <div key={item.step} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center mb-4">{item.step}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-white/10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Tools we audit</h2>
          <p className="text-white/50 mb-10">All major AI tools with current pricing data</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Cursor", "GitHub Copilot", "Claude", "ChatGPT", "Anthropic API", "OpenAI API", "Gemini", "Windsurf"].map((tool) => (
              <span key={tool} className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-white/70">{tool}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-white/10 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Find out how much you&apos;re wasting</h2>
        <p className="text-white/50 mb-8">Takes 2 minutes. Completely free. No credit card.</p>
        <Link href="/audit" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition">
          Start My Free Audit →
        </Link>
      </section>
      <footer className="border-t border-white/10 py-8 px-6 text-center text-white/30 text-sm">
        <p>SpendLens is a free tool by <a href="https://credex.rocks" className="text-emerald-400 hover:underline">Credex</a> — the marketplace for discounted AI credits.</p>
      </footer>
    </main>
  );
}