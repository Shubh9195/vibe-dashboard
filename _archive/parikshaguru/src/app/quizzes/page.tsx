import Link from "next/link";
import { Clock, CheckCircle2, ChevronRight, FileQuestion } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function QuizzesPage({ searchParams }: { searchParams: { filter?: string } }) {
  const supabase = await createClient();
  const filter = searchParams.filter || "All";
  
  // Ideally fetch from 'quizzes' table
  const { data: quizzes, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("is_published", true);

  // Fallback if DB is empty
  const displayQuizzes = quizzes?.length ? quizzes : [
    { id: "mock-1", title: "SSC CGL Tier 1 Full Mock 2026", exam_type: "SSC", difficulty: "Medium", time_limit_minutes: 60, is_published: true, question_ids: Array(100).fill('') },
    { id: "mock-2", title: "UPSC CSE Prelims GS Paper 1", exam_type: "UPSC", difficulty: "Hard", time_limit_minutes: 120, is_published: true, question_ids: Array(100).fill('') },
    { id: "mock-3", title: "IBPS PO Prelims Test 1", exam_type: "IBPS", difficulty: "Medium", time_limit_minutes: 45, is_published: true, question_ids: Array(100).fill('') },
  ];

  const filtered = filter === "All" ? displayQuizzes : displayQuizzes.filter(q => q.exam_type === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Available Quizzes</h1>
          <p className="text-slate-500 font-medium">Select a mock test below to begin your preparation under timed conditions.</p>
        </div>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {["All", "UPSC", "SSC", "IBPS", "Railway", "State PSC"].map(tab => (
          <Link key={tab} href={`/quizzes?filter=${tab}`} className={`whitespace-nowrap px-4 py-2 rounded-lg font-bold text-sm transition-all ${filter === tab ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}>
            {tab}
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((qz: any) => (
          <div key={qz.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md uppercase tracking-wide">{qz.exam_type}</span>
              <span className={`px-2.5 py-1 text-xs font-bold rounded-md uppercase tracking-wide ${qz.difficulty === 'Hard' ? 'bg-red-50 text-red-600' : qz.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>{qz.difficulty}</span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2">{qz.title}</h3>
            
            <div className="flex flex-col gap-2 mt-auto mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                <FileQuestion className="w-4 h-4 text-slate-400" />
                {qz.question_ids?.length || 15} Questions
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                <Clock className="w-4 h-4 text-slate-400" />
                {qz.time_limit_minutes} Mins
              </div>
            </div>

            <Link href={`/quiz/${qz.id}`} className="w-full py-3 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl font-bold text-center transition-colors flex items-center justify-center gap-1">
              Start Quiz <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 font-medium">
            No quizzes found for {filter}.
          </div>
        )}
      </div>
    </div>
  );
}
