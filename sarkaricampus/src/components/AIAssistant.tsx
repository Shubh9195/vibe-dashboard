"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Loader2, BookOpen } from "lucide-react";

export default function AIAssistant() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query }),
      });
      const data = await res.json();
      setResponse(data.response || data.error);
    } catch {
      setResponse("Failed to connect to Sarkari Campus AI. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-24 px-4">
      <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-12 shadow-[0_8px_40px_rgb(0,0,0,0.06)] relative overflow-hidden group">
        {/* Decorative AI Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 group-hover:bg-purple-100 transition-colors duration-1000"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100 uppercase tracking-widest mb-4">
              <Sparkles className="w-4 h-4 text-purple-500" /> Powered by Google AI
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Your Elite Strategy AI</h2>
            <p className="text-slate-500 font-medium text-sm">Ask our Gemini-powered engine anything about Institute non-teaching recruitments, syllabus planning, or career roadmaps.</p>
          </div>

          <div className="flex-1 w-full flex flex-col gap-4">
            <form onSubmit={askAI} className="relative w-full">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., How to prepare for IIT Lab Assistant?"
                className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm font-medium shadow-inner shadow-slate-100"
              />
              <button 
                type="submit" 
                disabled={loading}
                className="absolute right-2 top-2 p-2 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
              </button>
            </form>

            <div className={`transition-all duration-500 overflow-hidden ${response ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
              {response && (
                <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl text-sm font-medium text-slate-700 leading-relaxed relative">
                  <div className="absolute top-4 left-4">
                    <BookOpen className="w-5 h-5 text-purple-400 opacity-50" />
                  </div>
                  <div className="pl-8 whitespace-pre-wrap">{response}</div>
                  <span className="block mt-4 pl-8 text-xs font-bold text-slate-400 tracking-wider">AI Studio Response</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
