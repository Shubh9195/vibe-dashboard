"use client";

import { Globe } from "lucide-react";

export default function CurrentAffairs() {
  const affairs = [
    { id: 1, date: "11 Apr 2026", category: "UGC", title: "UGC Issues New Guidelines for Non-Teaching Staff", summary: "The University Grants Commission has revised the promotion criteria for Group C personnel." },
    { id: 2, date: "10 Apr 2026", category: "MoE", title: "Ministry of Education Announces 5000 New Vacancies", summary: "A major recruitment drive for Central Universities has been green-lit for the upcoming quarter." },
    { id: 3, date: "09 Apr 2026", category: "IIT Council", title: "Standardized Testing for IIT Staff Recruitments", summary: "The IIT Council has proposed a centralized exam (NTA-administered) for all non-teaching positions." },
    { id: 4, date: "08 Apr 2026", category: "Finance", title: "7th CPC Allowances Updated for Technical Staff", summary: "Technical Superintendents in NITs will receive updated DA mapping according to latest Dept. of Expenditure memo." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
          <Globe className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-1">Daily Current Affairs</h1>
          <p className="text-slate-500 font-medium">Bite-sized updates for your competitive exams.</p>
        </div>
      </div>

      <div className="relative border-l-2 border-slate-200 ml-4 space-y-10 pb-10">
        {affairs.map((item, i) => (
          <div key={item.id} className="relative pl-8 animate-in slide-in-from-bottom-4 fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-white border-4 border-blue-500 rounded-full"></div>
            
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 font-mono tracking-wider">{item.date}</span>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">{item.category}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{item.title}</h3>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">{item.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
