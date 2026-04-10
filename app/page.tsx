import Link from "next/link";
import { ArrowRight, Zap, Shield, Smartphone, Globe, Code, Layers } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "Lightning Fast",
      description: "Built on modern architecture ensuring blazing fast load times and optimal performance.",
      icon: <Zap className="w-6 h-6 text-blue-400" />,
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade encryption and security protocols out of the box to protect your data.",
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
    },
    {
      title: "Mobile Optimized",
      description: "Responsive design that looks beautiful and functions perfectly on any device.",
      icon: <Smartphone className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Global Reach",
      description: "Deployed to the edge globally for minimal latency no matter where your users are.",
      icon: <Globe className="w-6 h-6 text-cyan-400" />,
    },
    {
      title: "Developer Friendly",
      description: "Well-documented APIs and webhooks make integration a breeze for your engineering team.",
      icon: <Code className="w-6 h-6 text-rose-400" />,
    },
    {
      title: "Seamless Integration",
      description: "Connect with the tools you already use. Hundreds of integrations available.",
      icon: <Layers className="w-6 h-6 text-amber-400" />,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-white/20">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white to-zinc-400 flex items-center justify-center">
                <div className="w-3 h-3 bg-zinc-950 rounded-sm" />
              </div>
              <span className="font-semibold text-xl tracking-tight">Vibe</span>
            </div>
            <div>
              <Link
                href="/login"
                className="text-sm font-medium text-zinc-300 hover:text-white px-4 py-2 transition-colors relative group"
              >
                Sign In
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-fuchsia-500/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300 mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
              v2.0 is now live
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
              Build the future <br className="hidden md:block" />
              with absolute clarity.
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Vibe provides the infrastructure you need to scale your ideas into reality. 
              Beautifully designed, exceptionally powerful, and incredibly easy to use.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="w-full sm:w-auto h-12 px-8 flex items-center justify-center gap-2 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="w-full sm:w-auto h-12 px-8 flex items-center justify-center rounded-full bg-white/5 text-white font-medium hover:bg-white/10 border border-white/10 transition-all">
                Read Documentation
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 relative border-t border-white/5 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Everything you need to scale</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Stop patching tools together. We provide a cohesive ecosystem designed to 
                help you build faster and maintain effortlessly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group p-8 rounded-3xl bg-zinc-900 border border-white/5 hover:border-white/10 transition-all hover:bg-zinc-800/50 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="bg-black/50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/5 relative z-10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 relative z-10">{feature.title}</h3>
                  <p className="text-zinc-400 leading-relaxed relative z-10">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Ready to transform your workflow?</h2>
            <p className="text-xl text-zinc-400 mb-10">Join thousands of developers building on Vibe today.</p>
            <Link
              href="/login"
              className="inline-flex h-12 px-8 items-center justify-center gap-2 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-all"
            >
              Start building for free
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white flex items-center justify-center opacity-80">
              <div className="w-2 h-2 bg-black rounded-sm" />
            </div>
            <span className="font-semibold tracking-tight text-white/80">Vibe Inc.</span>
          </div>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Twitter</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
