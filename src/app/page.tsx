import Link from "next/link";
import { ArrowRight, BookOpen, BrainCircuit, Globe2, Award, Users, CheckCircle2, LayoutDashboard, Target, Zap, ShieldCheck } from "lucide-react";

import AIAssistant from "@/components/AIAssistant";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: recruitments } = await supabase.from("recruitments").select("*").eq("is_active", true).order("created_at", { ascending: false });

  const displayRecruitments = recruitments?.length ? recruitments : [
    { id: '1', title: 'NFSU Non-Teaching Staff Recruitment 2026', posts_count: 51, role_name: 'Section Officer, DSO & Assistant', closing_date: '2026-03-23', apply_link: 'https://nfsunt.samarth.edu.in/index.php/site/login', institute_icon: '🔬', category: 'NFSU' },
    { id: '2', title: 'Rashtriya Raksha University Non-Teaching', posts_count: 3, role_name: 'Registrar, Finance Officer & Assistant', closing_date: '2026-04-13', apply_link: 'https://rru.ac.in/recruitment/', institute_icon: '🏛️', category: 'Central Univ' },
    { id: '3', title: 'IGNOU JAT Recruitment Drive NTA 2026', posts_count: 200, role_name: 'Junior Assistant cum Typist (JAT)', closing_date: '2026-05-15', apply_link: 'https://ignou.ac.in/career', institute_icon: '🎓', category: 'Central Univ' },
    { id: '4', title: 'DTU Group C Non-Teaching', posts_count: 150, role_name: 'Junior Office Assistant & DEO', closing_date: '2026-04-30', apply_link: 'http://www.dtu.ac.in/', institute_icon: '💻', category: 'Central Univ' },
    { id: '5', title: 'JNU Non-Teaching Staff NTA (Phase 2)', posts_count: 388, role_name: 'Junior Assistant, MTS, Lab Assistant', closing_date: '2026-05-30', apply_link: 'https://jnu.ac.in/career', institute_icon: '🌐', category: 'Central Univ' }
  ];

  return (
    <div className="flex flex-col gap-24 pb-24 overflow-hidden relative">
      {/* Animated Light Background */}
      <div className="hero-glow-bg backdrop-blur-3xl"></div>

      {/* HERO SECTION */}
      <section className="relative px-6 pt-24 lg:pt-32 max-w-7xl mx-auto w-full flex flex-col items-center text-center z-10">
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold transition">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            India's #1 Platform for University Staff Jobs
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold transition">
            <CheckCircle2 className="w-4 h-4" />
            Curated by Serving Govt Officials
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
          Want a Government Job at <br className="hidden lg:block"/>
          <span className="text-blue-600">Universities like IITs, NITs & NFSU?</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl font-medium leading-relaxed">
          We are India's <strong>only</strong> dedicated platform for non-teaching staff recruitments at elite Central and State Government Universities. Prepare flawlessly with our exact mock tests and previous papers.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full md:w-auto">
          <Link href="/signup" className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md text-center flex items-center justify-center gap-2">
            Start Free Mock Test <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/previous-papers" className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-800 hover:text-blue-600 border border-slate-300 rounded-xl font-bold shadow-sm hover:shadow transition-all text-center">
            View Previous Papers
          </Link>
        </div>
      </section>

      {/* TAIYARI-STYLE FUNCTIONAL HERO CARD */}
      <section className="max-w-4xl mx-auto px-6 w-full relative z-10 -mt-6">
        <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-200">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex-1 w-full">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md uppercase tracking-wider">🔥 Trending Test</span>
                <span className="text-xs font-bold text-slate-500">1.2k Attempted Today</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">IIT Delhi Admin Assistant - Mock Test 1</h3>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-sm font-semibold text-slate-600 mb-5">
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-slate-400" /> 100 Qs</span>
                <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 120 mins</span>
                <span className="flex items-center gap-1.5"><Globe2 className="w-4 h-4 text-slate-400" /> English, Hindi</span>
              </div>
              <Link href="/quizzes" className="w-full sm:w-max px-6 py-2.5 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-slate-800 transition inline-flex justify-center">
                Attempt Now
              </Link>
            </div>
            {/* Visual Graphic */}
            <div className="hidden md:flex w-32 h-32 rounded-xl bg-blue-50 items-center justify-center shrink-0 border border-blue-100">
              <div className="text-center">
                <div className="text-3xl mb-1">🏦</div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Free Test</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP (Light mode elegance) */}
      <section className="bg-white/40 backdrop-blur-md py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by candidates securing positions at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            {["IIT Delhi", "NIT Warangal", "IIM Ahmedabad", "NFSU", "JNU", "Delhi University"].map((inst) => (
              <span key={inst} className="text-xl font-black tracking-tighter text-slate-800 grayscale hover:grayscale-0 transition duration-300">{inst}</span>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST ONGOING RECRUITMENTS */}
      <section id="recruitments" className="max-w-5xl mx-auto px-6 w-full relative z-10 pt-16 pb-8 scroll-mt-36">
        <div className="bg-white border text-left border-blue-100 rounded-3xl p-6 lg:p-10 shadow-xl shadow-blue-900/5 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-black uppercase tracking-widest mb-4 border border-red-100 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                Live Updates
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-heading">Latest Ongoing Recruitments.</h2>
            </div>
          </div>

          <div className="space-y-4 relative z-10">
            {displayRecruitments.map((job) => (
              <div key={job.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 group bg-slate-50/50 hover:shadow-md">
                <div className="flex items-center gap-5 mb-5 md:mb-0">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm text-2xl group-hover:scale-110 transition-transform">{job.institute_icon}</div>
                  <div>
                    <h4 className="font-black font-heading text-slate-900 text-xl group-hover:text-blue-700 transition-colors">{job.title}</h4>
                    <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-500 mt-2">
                      <span className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100"><Zap className="w-3.5 h-3.5" /> {job.posts_count} Posts</span>
                      <span className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">{job.role_name}</span>
                      <span className="text-red-500 flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Ends {new Date(job.closing_date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Link href={`/quizzes?filter=${encodeURIComponent(job.category)}`} className="flex-1 md:flex-none text-center px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-all shadow-sm">
                    Attempt Mock
                  </Link>
                  <a href={job.apply_link} target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none text-center px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-md">
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ULTRA-CLEAN CATEGORIES BENTO GRID */}
      <section className="max-w-7xl mx-auto px-6 w-full relative z-10 pt-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter">Targeted <span className="text-gradient-purple">Institutes.</span></h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg text-balance">Select your elite objective below and access highly calibrated mock frameworks immediately.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Primary Bento */}
          <Link href="/quizzes?filter=IIT" className="bg-white border border-slate-200 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 group relative overflow-hidden transition-all duration-300 md:col-span-2">
            <div className="absolute right-0 bottom-0 opacity-5 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700">
              <Award className="w-72 h-72 -mb-16 -mr-16 text-slate-900" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-green-50 text-green-600 font-bold text-xs uppercase tracking-widest rounded-lg mb-6 border border-green-100">Most Popular</span>
                <h3 className="font-black text-slate-900 text-3xl mb-4 tracking-tight">IIT Non-Teaching Staff</h3>
                <p className="font-medium text-slate-500 max-w-md text-base leading-relaxed">Comprehensive coverage of Technical Superintendent, Junior Assistant, and Lab personnel syllabi mapped across phase 1 & 2 exams.</p>
              </div>
              <div className="mt-12 flex items-center gap-2 text-sm font-bold text-blue-600">
                Explore Mocks <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href="/quizzes?filter=NIT" className="bg-white border border-slate-200 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition duration-300 flex flex-col justify-between group">
             <div>
               <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6"><LayoutDashboard className="w-6 h-6" /></div>
               <h3 className="font-black text-slate-900 text-xl mb-3 tracking-tight">NIT Admin</h3>
               <p className="text-sm font-medium text-slate-500 leading-relaxed">Administration & clerical frameworks.</p>
             </div>
             <div className="mt-8 text-blue-600 flex items-center justify-end"><ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" /></div>
          </Link>

          <Link href="/quizzes?filter=Central Univ" className="bg-white border border-slate-200 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition duration-300 flex flex-col justify-between group">
             <div>
               <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6"><Globe2 className="w-6 h-6" /></div>
               <h3 className="font-black text-slate-900 text-xl mb-3 tracking-tight">Central Univ</h3>
               <p className="text-sm font-medium text-slate-500 leading-relaxed">NTA administered CUET-NT logic.</p>
             </div>
             <div className="mt-8 text-purple-600 flex items-center justify-end"><ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" /></div>
          </Link>
          
          <Link href="/quizzes?filter=NFSU" className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:-translate-y-1 transition duration-300 flex flex-col justify-between group md:col-span-2">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div>
                 <div className="w-12 h-12 bg-slate-800 text-white rounded-xl flex items-center justify-center mb-6"><Target className="w-6 h-6" /></div>
                 <h3 className="font-black text-white text-2xl mb-3 tracking-tight">NFSU Specialized Vacancies</h3>
                 <p className="text-sm font-medium text-slate-400 max-w-sm leading-relaxed">Unique forensic science drive modules covering lab assistants and tech ops.</p>
               </div>
               <div className="hidden md:flex w-14 h-14 bg-white text-slate-900 rounded-full items-center justify-center group-hover:scale-110 transition-transform"><ArrowRight className="w-6 h-6" /></div>
            </div>
          </Link>
        </div>
      </section>

      {/* AI ASSISTANT MODULE */}
      <AIAssistant />

      <section className="bg-slate-50 border-y border-slate-200 w-full relative z-10 py-24 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-300 text-slate-700 text-xs font-black uppercase tracking-widest mb-6 shadow-sm">
              <Users className="w-4 h-4 text-blue-600" /> By The Experts, For The Aspirants
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter text-slate-900">The Unfair <span className="text-gradient-purple">Advantage.</span></h2>
            <p className="text-slate-600 font-medium max-w-3xl mx-auto text-lg leading-relaxed text-balance">
              Unlike generic platforms, Sarkari Campus has been brought to life by industry experts who have personally cracked these elite exams. Every single mock test and PDF material has been strictly prepared by experts currently serving in elite Central and State Government establishments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shadow-sm">
                <BrainCircuit className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 tracking-tight">Granular Syllabus Mapping</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs">We bypass generic SSC material and surgically extract question patterns straight from official institute notifications.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 shadow-sm">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 tracking-tight">Verified Past Intelligence</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs">Direct, unrestricted access to solved previous memory-based question papers strictly from elite technical institutes.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-3xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 shadow-sm">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 tracking-tight">Precision CBT Telemetry</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs">Our execution interface exactly mirrors NTA and TCS Ion systems, training your nervous system for the real pressure.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
