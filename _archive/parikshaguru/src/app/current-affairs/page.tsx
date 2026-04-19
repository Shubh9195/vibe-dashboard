"use client";

import { Globe } from "lucide-react";

export default function CurrentAffairs() {
  const affairs = [
    { id: 1, date: "11 Apr 2026", category: "National", title: "New AI Initiative Launched by Government", summary: "The central government has launched a new $1 Billion AI mission to boost local computing infrastructure." },
    { id: 2, date: "10 Apr 2026", category: "Economy", title: "RBI Holds Repo Rate Steady at 6.5%", summary: "The Monetary Policy Committee voted 5-1 to maintain the status quo on key interest rates." },
    { id: 3, date: "09 Apr 2026", category: "International", title: "India signs free trade pact with EFTA", summary: "A historic trade agreement focusing on European Free Trade Association nations aiming to bring $100B investment." },
    { id: 4, date: "08 Apr 2026", category: "Sports", title: "India wins Thomas Cup 2026", summary: "Indian men's badminton team scripted history by defeating Indonesia 3-0 in the finals." },
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
