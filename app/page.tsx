import Link from "next/link";
import { ArrowRight, Zap, Shield, Smartphone, Globe, Code, Layers } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "Lightning Fast",
      description: "Built on modern architecture ensuring blazing fast load times and optimal performance.",
      icon: <Zap className="w-5 h-5" />,
      color: "text-blue-400",
      glow: "group-hover:shadow-blue-500/20",
      border: "group-hover:border-blue-500/30",
      bg: "group-hover:bg-blue-500/5",
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade encryption and security protocols out of the box to protect your data.",
      icon: <Shield className="w-5 h-5" />,
      color: "text-emerald-400",
      glow: "group-hover:shadow-emerald-500/20",
      border: "group-hover:border-emerald-500/30",
      bg: "group-hover:bg-emerald-500/5",
    },
    {
      title: "Mobile Optimized",
      description: "Responsive design that looks beautiful and functions perfectly on any device.",
      icon: <Smartphone className="w-5 h-5" />,
      color: "text-purple-400",
      glow: "group-hover:shadow-purple-500/20",
      border: "group-hover:border-purple-500/30",
      bg: "group-hover:bg-purple-500/5",
    },
    {
      title: "Global Reach",
      description: "Deployed to the edge globally for minimal latency no matter where your users are.",
      icon: <Globe className="w-5 h-5" />,
      color: "text-cyan-400",
      glow: "group-hover:shadow-cyan-500/20",
      border: "group-hover:border-cyan-500/30",
      bg: "group-hover:bg-cyan-500/5",
    },
    {
      title: "Developer Friendly",
      description: "Well-documented APIs and webhooks make integration a breeze for your engineering team.",
      icon: <Code className="w-5 h-5" />,
      color: "text-rose-400",
      glow: "group-hover:shadow-rose-500/20",
      border: "group-hover:border-rose-500/30",
      bg: "group-hover:bg-rose-500/5",
    },
    {
      title: "Seamless Integration",
      description: "Connect with the tools you already use. Hundreds of integrations available.",
      icon: <Layers className="w-5 h-5" />,
      color: "text-amber-400",
      glow: "group-hover:shadow-amber-500/20",
      border: "group-hover:border-amber-500/30",
      bg: "group-hover:bg-amber-500/5",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-white/20 overflow-x-hidden">

      {/* ── Animated gradient orbs (pure CSS, no JS) ── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[20%] left-[10%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-indigo-600/20 blur-[140px] animate-pulse" style={{ animationDuration: "6s" }} />
        <div className="absolute top-[30%] -right-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-fuchsia-600/15 blur-[120px] animate-pulse" style={{ animationDuration: "8s", animationDelay: "2s" }} />
        <div className="absolute bottom-0 left-[20%] w-[60vw] h-[40vw] max-w-[800px] max-h-[500px] rounded-full bg-violet-700/10 blur-[160px] animate-pulse" style={{ animationDuration: "10s", animationDelay: "4s" }} />
      </div>

      {/* ── Navigation ── */}
      <nav className="border-b border-white/[0.06] bg-[#080808]/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-[0_0_16px_rgba(255,255,255,0.3)]">
                <div className="w-2.5 h-2.5 bg-black rounded-sm" />
              </div>
              <span className="font-semibold text-lg tracking-tight">Vibe</span>
            </div>
            {/* Nav links */}
            <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
              {["Features", "Pricing", "Docs", "Blog"].map((item) => (
                <a key={item} href="#" className="hover:text-white transition-colors duration-200">{item}</a>
              ))}
            </div>
            {/* CTA */}
            <Link
              href="/login"
              className="text-sm font-medium text-white/80 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200"
            >
              Sign In →
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* ── Hero ── */}
        <section className="pt-36 pb-28 px-4">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/[0.08] text-xs text-zinc-300 mb-10 backdrop-blur-sm shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              v2.0 is now live — What's new
              <ArrowRight className="w-3 h-3 opacity-60" />
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[1.03] mb-8">
              <span className="bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent">
                Build the future
              </span>
              <br />
              <span className="bg-gradient-to-br from-indigo-300 via-white/80 to-fuchsia-300 bg-clip-text text-transparent">
                with absolute clarity.
              </span>
            </h1>

            {/* Sub */}
            <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Vibe provides the infrastructure you need to scale your ideas into reality.
              Beautifully designed, exceptionally powerful, and incredibly easy to use.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {/* Primary — glowing */}
              <Link
                href="/login"
                id="hero-cta-primary"
                className="group relative w-full sm:w-auto h-12 px-8 flex items-center justify-center gap-2 rounded-full bg-white text-black text-sm font-semibold transition-all duration-300 hover:scale-[1.03] shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_60px_rgba(255,255,255,0.55),0_0_120px_rgba(180,160,255,0.3)]"
              >
                <span className="relative z-10">Get Started Free</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform duration-200" />
                {/* subtle shimmer overlay */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              </Link>

              {/* Secondary */}
              <button className="w-full sm:w-auto h-12 px-8 flex items-center justify-center rounded-full bg-white/[0.04] text-white/80 text-sm font-medium hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 transition-all duration-200 hover:text-white">
                Read Documentation
              </button>
            </div>

            {/* Social proof strip */}
            <p className="mt-10 text-xs text-zinc-600 tracking-wide uppercase">
              Trusted by teams at{" "}
              {["Stripe", "Vercel", "Linear", "Notion", "OpenAI"].map((co, i) => (
                <span key={co}>
                  <span className="text-zinc-400 font-medium">{co}</span>
                  {i < 4 && <span className="mx-2 opacity-30">·</span>}
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ── Features ── */}
        <section className="py-28 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-20">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">Platform</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-5 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                Everything you need to scale
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
                Stop patching tools together. We provide a cohesive ecosystem designed to
                help you build faster and maintain effortlessly.
              </p>
            </div>

            {/* Cards grid — glassmorphism */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative p-7 rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm transition-all duration-300 overflow-hidden cursor-default
                    hover:shadow-2xl ${feature.glow} hover:shadow-[0_8px_40px_0_rgba(0,0,0,0.6)] ${feature.border} ${feature.bg}`}
                >
                  {/* Glass inner shine */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                  {/* Icon badge */}
                  <div className={`relative z-10 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-black/60 border border-white/[0.07] mb-5 ${feature.color} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                    {feature.icon}
                  </div>

                  <h3 className="relative z-10 text-base font-semibold text-white mb-2 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="relative z-10 text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA banner ── */}
        <section className="py-28 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] via-indigo-900/20 to-fuchsia-900/10 backdrop-blur-xl p-12 text-center overflow-hidden shadow-2xl">
              {/* Inner gradient orb */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[60%] h-[60%] bg-indigo-500/10 blur-[80px] rounded-full" />
              </div>

              <h2 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-5 bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                Ready to transform<br />your workflow?
              </h2>
              <p className="relative z-10 text-zinc-400 mb-10 text-lg">
                Join thousands of developers building on Vibe today.
              </p>
              <Link
                href="/login"
                id="bottom-cta-primary"
                className="relative z-10 inline-flex h-12 px-10 items-center justify-center gap-2 rounded-full bg-white text-black text-sm font-semibold transition-all duration-300 hover:scale-[1.04] shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_70px_rgba(255,255,255,0.5),0_0_140px_rgba(180,160,255,0.25)]"
              >
                Start building for free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] py-12 bg-[#080808]/80 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-white/90 flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-sm" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-white/70">Vibe Inc.</span>
          </div>
          <div className="flex gap-6 text-sm text-zinc-600">
            {["Privacy", "Terms", "Twitter", "GitHub"].map((item) => (
              <a key={item} href="#" className="hover:text-zinc-300 transition-colors duration-200">{item}</a>
            ))}
          </div>
          <p className="text-xs text-zinc-700">© 2026 Vibe Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
