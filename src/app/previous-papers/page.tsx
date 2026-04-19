"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, PlayCircle, History, Search, ChevronRight, Clock, FileText, Users, BarChart3, Filter, BookmarkPlus } from "lucide-react";

const examCategories = [
  { id: "iit", name: "IIT Non-Teaching", papers: 45, icon: "🏛️" },
  { id: "nit", name: "NIT Staff", papers: 38, icon: "🎓" },
  { id: "nfsu", name: "NFSU Recruitment", papers: 12, icon: "🔬" },
  { id: "rru", name: "RRU Vacancies", papers: 8, icon: "⚖️" },
  { id: "cu", name: "Central Universities", papers: 55, icon: "📚" },
  { id: "iim", name: "IIM Support Staff", papers: 15, icon: "📊" },
];

const papersData: Record<string, any[]> = {
  iit: [
    { id: "iit-2025-1", year: 2025, title: "IIT Bombay - Junior Assistant", shift: "Shift 1", questions: 100, duration: 120, attempted: 4200, avgScore: 62, languages: ["English", "Hindi"], hasAttempted: false },
    { id: "iit-2025-2", year: 2025, title: "IIT Delhi - Technical Superintendent", shift: "Shift 1", questions: 100, duration: 120, attempted: 3800, avgScore: 58, languages: ["English", "Hindi"], hasAttempted: true },
    { id: "iit-2024-1", year: 2024, title: "IIT Madras - Senior Assistant", shift: "Shift 1", questions: 100, duration: 120, attempted: 6100, avgScore: 64, languages: ["English"], hasAttempted: false },
    { id: "iit-2024-2", year: 2024, title: "IIT Kanpur - Lab Assistant", shift: "Shift 2", questions: 80, duration: 90, attempted: 2900, avgScore: 55, languages: ["English", "Hindi"], hasAttempted: false },
    { id: "iit-2023-1", year: 2023, title: "IIT Kharagpur - Junior Technician", shift: "Shift 1", questions: 100, duration: 120, attempted: 8500, avgScore: 60, languages: ["English"], hasAttempted: true },
  ],
  nit: [
    { id: "nit-2025-1", year: 2025, title: "NIT Trichy - Office Attendant", shift: "Shift 1", questions: 80, duration: 90, attempted: 3400, avgScore: 68, languages: ["English", "Hindi"], hasAttempted: false },
    { id: "nit-2024-1", year: 2024, title: "NIT Warangal - Admin Assistant", shift: "Shift 1", questions: 100, duration: 120, attempted: 5100, avgScore: 61, languages: ["English"], hasAttempted: false },
    { id: "nit-2023-1", year: 2023, title: "NIT Surathkal - Data Entry Operator", shift: "Shift 1", questions: 80, duration: 60, attempted: 4200, avgScore: 72, languages: ["English", "Hindi"], hasAttempted: true },
  ],
  nfsu: [
    { id: "nfsu-2024-1", year: 2024, title: "NFSU Gandhinagar - Lab Assistant", shift: "Shift 1", questions: 100, duration: 120, attempted: 1200, avgScore: 57, languages: ["English", "Hindi", "Gujarati"], hasAttempted: false },
    { id: "nfsu-2023-1", year: 2023, title: "NFSU - Computer Operator", shift: "Shift 1", questions: 80, duration: 90, attempted: 900, avgScore: 63, languages: ["English"], hasAttempted: false },
  ],
  rru: [
    { id: "rru-2024-1", year: 2024, title: "RRU Ahmedabad - Clerk", shift: "Shift 1", questions: 100, duration: 120, attempted: 700, avgScore: 65, languages: ["English", "Hindi", "Gujarati"], hasAttempted: false },
  ],
  cu: [
    { id: "cu-2025-1", year: 2025, title: "JNU Delhi - Non-Teaching Staff", shift: "Shift 1", questions: 100, duration: 120, attempted: 5100, avgScore: 59, languages: ["English", "Hindi"], hasAttempted: false },
    { id: "cu-2024-1", year: 2024, title: "BHU Varanasi - Office Staff", shift: "Shift 1", questions: 100, duration: 120, attempted: 7200, avgScore: 62, languages: ["English", "Hindi"], hasAttempted: true },
    { id: "cu-2024-2", year: 2024, title: "DU Delhi - Assistant Registrar", shift: "Shift 1", questions: 80, duration: 90, attempted: 4500, avgScore: 54, languages: ["English"], hasAttempted: false },
  ],
  iim: [
    { id: "iim-2024-1", year: 2024, title: "IIM Ahmedabad - Executive Assistant", shift: "Shift 1", questions: 80, duration: 90, attempted: 2100, avgScore: 66, languages: ["English"], hasAttempted: false },
  ],
};

export default function PreviousPapers() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState<number | null>(null);

  const currentPapers = selectedCategory ? (papersData[selectedCategory] || []) : [];
  const filteredPapers = currentPapers
    .filter(p => !yearFilter || p.year === yearFilter)
    .filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()));

  const uniqueYears = selectedCategory
    ? [...new Set((papersData[selectedCategory] || []).map(p => p.year))].sort((a, b) => b - a)
    : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* PAGE HEADER */}
      <div className="flex items-start gap-5 mb-10">
        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 shrink-0">
          <History className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-1">Previous Year Question Papers</h1>
          <p className="text-slate-500 font-medium">Attempt real memory-based papers from IIT, NIT, and University recruitments in a simulated CBT environment, or download free PDFs.</p>
        </div>
      </div>

      {/* CATEGORY GRID */}
      {!selectedCategory && (
        <>
          <h2 className="text-xl font-bold text-slate-800 mb-5">Select Exam Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {examCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="bg-white border border-slate-200 hover:border-blue-300 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-left group"
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors mb-1">{cat.name}</h3>
                <p className="text-sm font-semibold text-slate-400">{cat.papers} Papers Available</p>
              </button>
            ))}
          </div>

          {/* HIGHLIGHTS STRIP */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white mt-6">
            <h3 className="text-xl font-bold mb-6">Why Practice with PYPs?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-3 items-start">
                <BarChart3 className="w-8 h-8 text-blue-400 shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">All-India Rank</h4>
                  <p className="text-sm text-slate-400 font-medium">Compare your performance against thousands of aspirants instantly.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Clock className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Real CBT Simulation</h4>
                  <p className="text-sm text-slate-400 font-medium">Experience the exact timer pressure and navigation of the real exam interface.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <FileText className="w-8 h-8 text-amber-400 shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Detailed Solutions</h4>
                  <p className="text-sm text-slate-400 font-medium">Step-by-step explanations with shortcuts for every single question.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* PAPER LISTING VIEW */}
      {selectedCategory && (
        <>
          {/* BREADCRUMB */}
          <button
            onClick={() => { setSelectedCategory(null); setSearch(""); setYearFilter(null); }}
            className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:underline mb-6"
          >
            ← All Exam Categories
          </button>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{examCategories.find(c => c.id === selectedCategory)?.icon}</span>
            <h2 className="text-2xl font-black text-slate-900">{examCategories.find(c => c.id === selectedCategory)?.name}</h2>
          </div>
          <p className="text-sm font-medium text-slate-500 mb-6">{filteredPapers.length} papers found</p>

          {/* SEARCH + FILTERS */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search papers (e.g., IIT Bombay Lab)..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none font-medium text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setYearFilter(null)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${!yearFilter ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}
              >
                All Years
              </button>
              {uniqueYears.map(y => (
                <button
                  key={y}
                  onClick={() => setYearFilter(y)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${yearFilter === y ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* PAPER CARDS */}
          <div className="space-y-4">
            {filteredPapers.map(paper => (
              <div key={paper.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* LEFT: Paper Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">{paper.year}</span>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{paper.shift}</span>
                      {paper.hasAttempted && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">✓ Attempted</span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{paper.title}</h3>

                    {/* META ROW */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-semibold text-slate-500">
                      <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {paper.questions} Qs</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {paper.duration} Mins</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {(paper.attempted / 1000).toFixed(1)}k Attempts</span>
                      <span className="flex items-center gap-1"><BarChart3 className="w-3.5 h-3.5" /> Avg. Score: {paper.avgScore}%</span>
                    </div>

                    {/* Languages */}
                    <div className="flex gap-1.5 mt-3">
                      {paper.languages.map((lang: string) => (
                        <span key={lang} className="text-[10px] font-bold text-slate-400 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-wider">{lang}</span>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT: Action Buttons */}
                  <div className="flex items-center gap-3 shrink-0">
                    <button className="p-2.5 border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 transition" title="Bookmark">
                      <BookmarkPlus className="w-5 h-5" />
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition text-sm">
                      <Download className="w-4 h-4" /> PDF
                    </button>
                    <Link href={`/quiz/${paper.id}`} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-sm shadow-blue-600/20 text-sm">
                      <PlayCircle className="w-4 h-4" /> Attempt Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {filteredPapers.length === 0 && (
              <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
                <Search className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                <p className="font-bold text-slate-500">No papers found for your search criteria.</p>
                <p className="text-sm text-slate-400 font-medium mt-1">Try adjusting the year filter or search term.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
