import Link from "next/link";
import { ArrowRight, BookOpen, BrainCircuit, Globe2, Award, Users, CheckCircle2, LayoutDashboard } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* HERO SECTION */}
      <section className="relative px-4 pt-16 lg:pt-24 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold mb-6">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            India's #1 Mock Test Platform
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
            Crack Any <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Government Exam.</span> Free.
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
            Targeted mocks, daily current affairs, and comprehensive study notes for UPSC, SSC, Banking, and State PSCs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link href="/signup" className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 hover:-translate-y-1 transition-all shadow-lg shadow-blue-600/20 text-center flex items-center justify-center gap-2">
              Start Practicing Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/quizzes" className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all text-center">
              Explore Exams
            </Link>
          </div>
        </div>
        
        {/* HERO GRAPHIC (Floating Card) */}
        <div className="flex-1 w-full max-w-md relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xl shadow-slate-200/50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Mock Test</span>
              <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md">10:00 Mins</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">SSC CGL Tier 1 Full Mock</h3>
            <p className="text-sm font-medium text-slate-500 mb-6">100 Questions • 200 Marks • Negative 0.50</p>
            <div className="space-y-3 mb-6">
              {[1,2,3].map((i) => (
                <div key={i} className="h-10 bg-slate-50 rounded-lg border border-slate-100"></div>
              ))}
            </div>
            <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm">Submit Test</button>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-blue-50/50 border-y border-blue-100 py-10 mt-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <h4 className="text-3xl font-black text-blue-600 mb-1">50K+</h4>
            <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Active Students</p>
          </div>
          <div className="text-center">
            <h4 className="text-3xl font-black text-indigo-600 mb-1">10K+</h4>
            <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Free Questions</p>
          </div>
          <div className="text-center">
            <h4 className="text-3xl font-black text-blue-600 mb-1">500+</h4>
            <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Mock Tests</p>
          </div>
          <div className="text-center">
            <h4 className="text-3xl font-black text-indigo-600 mb-1">95%</h4>
            <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Success Rate</p>
          </div>
        </div>
      </section>

      {/* EXAM CATEGORIES */}
      <section className="max-w-6xl mx-auto px-4 w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 mb-3">Popular Exams</h2>
          <p className="text-slate-500 font-medium">Select your goal and start preparing with targeted material.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "UPSC CSE", count: "120 Tests" },
            { name: "SSC CGL", count: "85 Tests" },
            { name: "IBPS PO", count: "65 Tests" },
            { name: "RRB NTPC", count: "40 Tests" },
            { name: "Delhi Police", count: "25 Tests" },
            { name: "State PSC", count: "50 Tests" },
            { name: "CUET", count: "30 Tests" },
            { name: "CLAT", count: "20 Tests" },
          ].map((exam) => (
            <div key={exam.name} className="bg-white border border-slate-200 hover:border-blue-300 p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group">
              <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors mb-1">{exam.name}</h3>
              <p className="text-xs font-semibold text-slate-400">{exam.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-slate-900 rounded-3xl max-w-6xl mx-auto px-8 py-16 w-full text-white my-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black mb-4">Why ParikshaGuru?</h2>
          <p className="text-slate-400 font-medium max-w-xl mx-auto">Everything you need to clear the cut-off, all in one place without paying heavy subscriptions.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <BrainCircuit className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Adaptive Quizzes</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">Timer-based mocks that adjust to your weak spots with detailed performance reports.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <Globe2 className="w-10 h-10 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Daily Current Affairs</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">Short, crisp daily news bites specifically curated for government exam curriculums.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <CheckCircle2 className="w-10 h-10 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Detailed Solutions</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">Step-by-step explanations and shortcut tricks for every single mock test question.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-6xl mx-auto px-4 w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 mb-3">Student Success</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { quote: "The SSC CGL mock tests are exactly at the difficulty level of the real exam. Cleared Tier 1 easily!", name: "Rahul S.", role: "SSC Aspirant" },
            { quote: "Current affairs are to the point. No fluff. Saved me hours of reading newspapers daily.", name: "Priya M.", role: "UPSC CSE Air 402" },
            { quote: "Best free resource on the internet. The analysis dashboard is better than paid platforms.", name: "Amit K.", role: "IBPS PO Ranker" }
          ].map((t, i) => (
            <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <div className="flex text-amber-400 mb-4 text-lg">★★★★★</div>
              <p className="text-slate-700 font-medium text-sm leading-relaxed mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-xs font-semibold text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
