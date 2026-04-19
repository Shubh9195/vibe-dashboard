"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Search, Filter } from "lucide-react";

export default function StudyNotes() {
  const [search, setSearch] = useState("");
  const notesData = [
    { id: 1, subject: "General Admin Rules", topic: "General Financial Rules (GFR) 2017", readTime: 12, tags: ["IIT", "NIT"] },
    { id: 2, subject: "Office Procedures", topic: "Central Secretariat Manual of Office Procedure", readTime: 15, tags: ["All Exams"] },
    { id: 3, subject: "Leave Rules", topic: "CCS (Leave) Rules, 1972", readTime: 10, tags: ["Central Univ"] },
    { id: 4, subject: "Computer Knowledge", topic: "MS Excel & Advanced Office Tools", readTime: 8, tags: ["IIT", "NFSU"] },
    { id: 5, subject: "English Comprehension", topic: "Official Letter Drafting & Noting", readTime: 5, tags: ["NIT", "RRU"] }
  ];

  const filtered = notesData.filter(n => n.topic.toLowerCase().includes(search.toLowerCase()) || n.subject.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-slate-900 rounded-3xl p-8 lg:p-12 text-white mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <BookOpen className="w-12 h-12 text-blue-400 mb-6" />
          <h1 className="text-3xl lg:text-5xl font-black mb-4 tracking-tight">University Staff Notes</h1>
          <p className="text-slate-400 text-lg max-w-2xl">Concise, exam-oriented notes prepared by past non-teaching selected candidates. Learn exact official procedures required for IIT/NIT tests.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search topics (e.g. Fundamental Rights)..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
          />
        </div>
        <button className="px-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
          <Filter className="w-5 h-5" /> Filters
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(note => (
          <div key={note.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-wide">{note.subject}</span>
              <span className="text-xs font-bold text-slate-400">{note.readTime} min read</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">{note.topic}</h3>
            
            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100">
              {note.tags.map(t => (
                <span key={t} className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">#{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
