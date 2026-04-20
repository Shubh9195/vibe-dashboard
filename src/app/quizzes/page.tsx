import Link from "next/link";
import { Lock, Clock, FileQuestion, CheckCircle2, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function QuizzesPage(props: { searchParams: Promise<{ filter?: string }> }) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  const filter = searchParams.filter || "All";

  // Fetch active recruitments
  const { data: recruitments } = await supabase
    .from("recruitments")
    .select("id, title, institute_icon, category")
    .eq("is_active", true);

  // Fetch all published quizzes from DB
  const { data: quizzes } = await supabase
    .from("quizzes")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: true });

  // Fallback mock data per institute (before DB has real data)
  const fallbackMocks = [
    { id: "nfsu-mock-1", title: "NFSU Section Officer Mock #1", exam_type: "NFSU", difficulty: "Medium", time_limit_minutes: 120, sequence_number: 1, is_free: true, question_count: 100 },
    { id: "nfsu-mock-2", title: "NFSU DSO Comprehensive Mock #2", exam_type: "NFSU", difficulty: "Hard", time_limit_minutes: 120, sequence_number: 2, is_free: false, question_count: 100 },
    { id: "nfsu-mock-3", title: "NFSU Assistant Pattern Mock #3", exam_type: "NFSU", difficulty: "Medium", time_limit_minutes: 90, sequence_number: 3, is_free: false, question_count: 100 },
    { id: "rru-mock-1", title: "RRU Registrar/Finance Officer Mock #1", exam_type: "Central Univ", difficulty: "Hard", time_limit_minutes: 60, sequence_number: 1, is_free: true, question_count: 50 },
    { id: "rru-mock-2", title: "RRU Research & Admin Assistant Mock #2", exam_type: "Central Univ", difficulty: "Medium", time_limit_minutes: 60, sequence_number: 2, is_free: false, question_count: 50 },
    { id: "ignou-mock-1", title: "IGNOU JAT (Junior Assistant Typist) Mock #1", exam_type: "Central Univ", difficulty: "Easy", time_limit_minutes: 120, sequence_number: 1, is_free: true, question_count: 120 },
    { id: "ignou-mock-2", title: "IGNOU JAT Mock #2 — English & Typing Focus", exam_type: "Central Univ", difficulty: "Medium", time_limit_minutes: 120, sequence_number: 2, is_free: false, question_count: 120 },
    { id: "dtu-mock-1", title: "DTU Group C Junior Office Assistant Mock #1", exam_type: "Central Univ", difficulty: "Medium", time_limit_minutes: 150, sequence_number: 1, is_free: true, question_count: 150 },
    { id: "dtu-mock-2", title: "DTU DEO Comprehensive Mock #2", exam_type: "Central Univ", difficulty: "Hard", time_limit_minutes: 150, sequence_number: 2, is_free: false, question_count: 150 },
    { id: "jnu-mock-1", title: "JNU Non-Teaching MTS Mock #1", exam_type: "Central Univ", difficulty: "Medium", time_limit_minutes: 120, sequence_number: 1, is_free: true, question_count: 100 },
  ];

  const displayMocks = quizzes?.length ? quizzes.map((q: any, i: number) => ({
    ...q, sequence_number: i + 1, is_free: i === 0, question_count: q.question_ids?.length || 100
  })) : fallbackMocks;

  const filtered = filter === "All" ? displayMocks : displayMocks.filter((q: any) => q.exam_type === filter);
  const freeMocks = filtered.filter((q: any) => q.is_free);
  const lockedMocks = filtered.filter((q: any) => !q.is_free);

  const categories = ["All", "NFSU", "Central Univ", "IIT", "NIT"];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* HEADER */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-black uppercase tracking-widest mb-4 border border-blue-100">
          <CheckCircle2 className="w-3.5 h-3.5" /> Live Recruitment Mocks
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Institute Mock Tests</h1>
        <p className="text-slate-500 font-medium max-w-2xl">
          Browse all mock tests for active recruitments. <span className="text-emerald-600 font-bold">Mock #1 is always FREE</span> — no login needed. Sign up to unlock all 10 mocks per recruitment and save your scores.
        </p>
      </div>

      {/* FILTER TABS */}
      <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(tab => (
          <Link key={tab} href={`/quizzes?filter=${tab}`}
            className={`whitespace-nowrap px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${filter === tab ? "bg-slate-900 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}>
            {tab}
          </Link>
        ))}
      </div>

      {/* FREE MOCKS SECTION */}
      {freeMocks.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-lg font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">🆓 Free Mocks — Start Without Login</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {freeMocks.map((qz: any) => (
              <div key={qz.id} className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-black px-3 py-1 rounded-bl-xl">FREE</div>
                <div className="flex justify-between items-start mb-4 pr-12">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md uppercase tracking-widest">{qz.exam_type}</span>
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-md uppercase tracking-wide ${qz.difficulty === 'Hard' ? 'bg-red-50 text-red-600' : qz.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>{qz.difficulty}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 leading-snug">{qz.title}</h3>
                <div className="flex gap-4 mt-auto mb-5 text-sm text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5"><FileQuestion className="w-4 h-4 text-slate-400" /> {qz.question_count} Qs</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> {qz.time_limit_minutes} Mins</span>
                </div>
                <Link href={`/quiz/${qz.id}`} className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-center transition-colors flex items-center justify-center gap-1 text-sm shadow-sm shadow-emerald-500/20">
                  Start Free Mock <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LOCKED MOCKS SECTION */}
      {lockedMocks.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-lg font-black text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg flex items-center gap-2"><Lock className="w-4 h-4" /> Premium Mocks — Login to Unlock</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {lockedMocks.map((qz: any) => (
              <div key={qz.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col relative overflow-hidden opacity-90 hover:opacity-100 transition-all group hover:-translate-y-0.5 hover:shadow-md">
                <div className="absolute top-0 right-0 bg-slate-800 text-white text-xs font-black px-3 py-1 rounded-bl-xl flex items-center gap-1">
                  <Lock className="w-3 h-3" /> PREMIUM
                </div>
                <div className="flex justify-between items-start mb-4 pr-16">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md uppercase tracking-widest">{qz.exam_type}</span>
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-md uppercase tracking-wide ${qz.difficulty === 'Hard' ? 'bg-red-50 text-red-600' : qz.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>{qz.difficulty}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 leading-snug">{qz.title}</h3>
                <div className="flex gap-4 mt-auto mb-5 text-sm text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5"><FileQuestion className="w-4 h-4 text-slate-400" /> {qz.question_count} Qs</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> {qz.time_limit_minutes} Mins</span>
                </div>
                <Link href="/signup" className="w-full py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-bold text-center transition-colors flex items-center justify-center gap-1.5 text-sm">
                  <Lock className="w-4 h-4" /> Sign Up to Unlock
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="py-20 text-center text-slate-400 font-medium">No mock tests found for <strong className="text-slate-600">{filter}</strong>. Check back soon!</div>
      )}
    </div>
  );
}
