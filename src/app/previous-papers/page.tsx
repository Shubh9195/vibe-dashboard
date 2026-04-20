import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Download, PlayCircle, History, Clock, FileText, Lock, ChevronRight } from "lucide-react";

export default async function PreviousPapers() {
  const supabase = await createClient();

  // Fetch all published previous papers from DB, along with their parent recruitment data
  const { data: rawPapers } = await supabase
    .from("previous_papers")
    .select(`
      *,
      recruitments (
        title,
        institute_icon,
        category
      )
    `)
    .eq("is_published", true)
    .order("year", { ascending: false })
    .order("sequence_number", { ascending: true });

  // Group papers by category
  const groupedPapers = (rawPapers || []).reduce((acc: any, paper: any) => {
    const category = paper.recruitments?.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(paper);
    return acc;
  }, {});

  const categories = Object.keys(groupedPapers);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* PAGE HEADER */}
      <div className="flex items-start gap-5 mb-14">
        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 shrink-0">
          <History className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Previous Year Question Papers</h1>
          <p className="text-slate-500 font-medium max-w-2xl text-lg">
            Attempt real memory-based papers for ongoing recruitments in a simulated CBT environment, or download free PDFs. <strong className="text-emerald-600">First paper is always FREE.</strong>
          </p>
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="py-20 text-center text-slate-500 font-medium bg-slate-50 rounded-3xl border border-slate-200">
          No previous year papers published yet. Add a recruitment via the agent to scaffold them!
        </div>
      ) : (
        <div className="space-y-16">
          {categories.map((catName) => {
            const papers = groupedPapers[catName];
            return (
              <div key={catName}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{papers[0]?.recruitments?.institute_icon || "📚"}</span>
                  <h2 className="text-2xl font-black text-slate-900">{catName} Papers</h2>
                  <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">{papers.length} Available</span>
                </div>

                {/* Papers Grid */}
                <div className="grid lg:grid-cols-2 gap-5">
                  {papers.map((paper: any) => (
                    <div key={paper.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden flex flex-col">
                      
                      {/* FREE/PREMIUM Badge */}
                      {paper.is_free ? (
                        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl tracking-widest">FREE ACCESS</div>
                      ) : (
                        <div className="absolute top-0 right-0 bg-slate-800 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl tracking-widest flex items-center gap-1">
                          <Lock className="w-3 h-3" /> PREMIUM
                        </div>
                      )}

                      <div className="flex items-center gap-2 mb-3 mt-1">
                        <span className="text-xs font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">{paper.year}</span>
                        {paper.awaiting_questions && (
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md uppercase tracking-wider">Awaiting Content</span>
                        )}
                      </div>

                      <h3 className="text-lg font-black text-slate-900 mb-2 leading-snug">{paper.title}</h3>
                      <p className="text-xs font-bold text-slate-400 mb-5">{paper.recruitments?.title}</p>

                      <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span className="text-xs font-bold text-slate-700">{paper.questions?.length || 0} Questions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="text-xs font-bold text-slate-700">120 Minutes</span>
                        </div>
                      </div>

                      <div className="mt-auto flex items-center gap-3">
                        <button className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition text-sm flex items-center justify-center gap-2">
                          <Download className="w-4 h-4" /> PDF
                        </button>

                        {paper.is_free ? (
                          <Link href={paper.awaiting_questions ? "#" : `/quiz/${paper.id}?type=paper`} className={`flex-[2] px-4 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition ${paper.awaiting_questions ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm shadow-emerald-500/20'}`}>
                            <PlayCircle className="w-4 h-4" /> Attempt PYP
                          </Link>
                        ) : (
                          <Link href="/signup" className="flex-[2] px-4 py-2.5 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl transition text-sm flex items-center justify-center gap-2">
                            <Lock className="w-4 h-4" /> Unlock Paper
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
