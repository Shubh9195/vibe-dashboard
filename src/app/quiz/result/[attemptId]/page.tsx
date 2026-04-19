import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

export default async function QuizResult(props: { params: Promise<{ attemptId: string }>, searchParams: Promise<{ score?: string, total?: string }> }) {
  const searchParams = await props.searchParams;
  const score = parseInt(searchParams.score || "0");
  const total = parseInt(searchParams.total || "4");
  const percent = Math.round((score / total) * 100);

  let message = "Keep practicing 💪";
  let color = "text-red-500";
  let bg = "bg-red-50";
  
  if (percent >= 80) {
    message = "Excellent! 🎉";
    color = "text-emerald-500";
    bg = "bg-emerald-50";
  } else if (percent >= 60) {
    message = "Good job! 👍";
    color = "text-amber-500";
    bg = "bg-amber-50";
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/quizzes" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Quizzes
      </Link>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 mb-8 text-center shadow-sm">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Quiz Results</h1>
        <p className="text-slate-500 font-medium mb-10">Detailed performance analysis of your mock test.</p>
        
        {/* CIRCULAR PROGRESS RING */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className={`${color}`} strokeWidth="3" strokeDasharray={`${percent}, 100`} strokeLinecap="round" stroke="currentColor" fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-slate-900">{score}<span className="text-xl text-slate-400">/{total}</span></span>
            <span className="text-sm font-bold text-slate-400">{percent}%</span>
          </div>
        </div>

        <div className={`inline-flex px-6 py-2 rounded-full font-bold ${bg} ${color}`}>
          {message}
        </div>
      </div>

      <h2 className="text-2xl font-black text-slate-900 mb-6">Answer Review</h2>
      
      {/* MOCK REVIEW */}
      <div className="space-y-6">
        <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900 mb-2">Q1. Which Article of the Indian Constitution deals with Fundamental Rights?</p>
              <p className="text-sm font-semibold text-slate-600 mb-4">Your Answer: <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded">Article 12-35</span></p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Explanation</p>
                <p className="text-sm text-slate-700 font-medium">Part III of the Indian Constitution containing Articles 12 to 35 specifically deals with Fundamental Rights, protecting civil liberties of the citizens.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-red-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
          <div className="flex items-start gap-3">
            <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900 mb-2">Q2. The headquarters of RBI is located in which city?</p>
              <p className="text-sm font-semibold text-slate-600 mb-1">Your Answer: <span className="text-red-500 bg-red-50 px-2 py-0.5 rounded line-through">New Delhi</span></p>
              <p className="text-sm font-semibold text-slate-600 mb-4">Correct Answer: <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded">Mumbai</span></p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Explanation</p>
                <p className="text-sm text-slate-700 font-medium">The Reserve Bank of India (RBI) was established on April 1, 1935, and its headquarters was permanently moved from Kolkata to Mumbai in 1937.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
