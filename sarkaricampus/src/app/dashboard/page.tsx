"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Award, Flame, Target, Trophy, Clock, CheckCircle2 } from "lucide-react";

const chartData = [
  { day: "Mon", score: 65 },
  { day: "Tue", score: 59 },
  { day: "Wed", score: 80 },
  { day: "Thu", score: 81 },
  { day: "Fri", score: 76 },
  { day: "Sat", score: 90 },
  { day: "Sun", score: 85 },
];

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setUser(profile || { full_name: user?.user_metadata?.full_name || 'Candidate', exam_choice: 'IIT Non-Teaching', streak: 3 });
      } else {
        setUser({ full_name: 'Rahul', exam_choice: 'NIT Admin', streak: 5 }); // Fallback
      }
    }
    getUser();
  }, [supabase]);

  if (!user) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-500">Loading Dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* GREETING */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10">
          <Target className="w-64 h-64 -mt-10 -mr-10 text-white" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider mb-4">
            Target: {user.exam_choice}
          </div>
          <h1 className="text-3xl lg:text-4xl font-black mb-2 tracking-tight">Good morning, {user.full_name} 👋</h1>
          <p className="text-indigo-200 font-medium">You have 2 mock tests scheduled for today. Keep up the momentum!</p>
        </div>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><CheckCircle2 className="w-5 h-5" /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Quizzes</p>
            <h3 className="text-2xl font-black text-slate-900">42</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center"><Target className="w-5 h-5" /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg. Score</p>
            <h3 className="text-2xl font-black text-slate-900">76%</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center"><Flame className="w-5 h-5" /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Study Streak</p>
            <h3 className="text-2xl font-black text-slate-900">{user.streak} Days</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center"><Trophy className="w-5 h-5" /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Institute Rank</p>
            <h3 className="text-2xl font-black text-slate-900">#40</h3>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* CHART */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Performance Last 7 Days</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis hide />
                  <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                  <Bar dataKey="score" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Recent Mock Tests</h3>
              <Link href="/quizzes" className="text-sm font-bold text-blue-600 hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {[
                { title: "SSC CGL Tier 1 Mock", score: "145/200", date: "Today, 10:30 AM", color: "text-emerald-500", bg: "bg-emerald-50" },
                { title: "Static GK Practice Set", score: "12/20", date: "Yesterday", color: "text-amber-500", bg: "bg-amber-50" },
                { title: "Current Affairs - March", score: "40/50", date: "2 days ago", color: "text-emerald-500", bg: "bg-emerald-50" }
              ].map((act, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl ${act.bg} ${act.color}`}><Award className="w-5 h-5" /></div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{act.title}</h4>
                      <p className="text-xs font-semibold text-slate-400">{act.date}</p>
                    </div>
                  </div>
                  <div className="font-bold text-slate-900">{act.score}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">
          {/* RECOMMENDED FOR YOU */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 relative overflow-hidden">
            <h3 className="text-lg font-bold text-indigo-900 mb-4">Recommended For You</h3>
            <div className="space-y-3">
              {[
                { name: "Indian Polity Top 100", mins: 20 },
                { name: "Maths: Algebra Tricks", mins: 15 },
                { name: "English Vocab Set 4", mins: 10 }
              ].map((rec, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-indigo-100 cursor-pointer hover:-translate-y-1 transition-transform">
                  <h4 className="font-bold text-slate-800 text-sm mb-2">{rec.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-500"><Clock className="w-3 h-3"/> {rec.mins} mins</span>
                    <span className="text-xs font-bold text-indigo-600 uppercase">Start</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
