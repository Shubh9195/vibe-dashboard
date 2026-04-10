"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import type { Profile, UserGeneration } from "@/lib/database.types";
import { LogOut, Sparkles, Clock, User as UserIcon, Zap } from "lucide-react";

interface DashboardClientProps {
  user: User;
  profile: Profile | null;
  generations: UserGeneration[];
}

export default function DashboardClient({
  user,
  profile,
  generations,
}: DashboardClientProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const displayName =
    profile?.full_name || user.email?.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white to-zinc-400 flex items-center justify-center">
                <div className="w-3 h-3 bg-zinc-950 rounded-sm" />
              </div>
              <span className="font-semibold text-xl tracking-tight">Vibe</span>
              <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/20">
                Dashboard
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                  {initials}
                </div>
                <span className="text-sm text-zinc-300 hidden sm:block">
                  {user.email}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:block">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Banner */}
        <div className="mb-10 p-8 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
          <p className="text-sm text-indigo-300 mb-1 font-medium">
            Welcome back 👋
          </p>
          <h1 className="text-3xl font-bold tracking-tight">
            Hello, {displayName}!
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Here's an overview of your Vibe activity.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            {
              label: "Total Generations",
              value: generations.length,
              icon: <Sparkles className="w-5 h-5 text-purple-400" />,
              color: "from-purple-500/10",
            },
            {
              label: "Account Status",
              value: "Active",
              icon: <Zap className="w-5 h-5 text-emerald-400" />,
              color: "from-emerald-500/10",
            },
            {
              label: "Member Since",
              value: new Date(user.created_at).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              }),
              icon: <UserIcon className="w-5 h-5 text-blue-400" />,
              color: "from-blue-500/10",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl bg-gradient-to-br ${stat.color} to-transparent border border-white/5 hover:border-white/10 transition-all`}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-zinc-400">{stat.label}</p>
                <div className="p-2 bg-black/30 rounded-lg">{stat.icon}</div>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Generations Table */}
        <div className="rounded-3xl border border-white/10 bg-zinc-900 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <div>
              <h2 className="text-lg font-semibold">Recent Generations</h2>
              <p className="text-sm text-zinc-500 mt-0.5">
                Your last {generations.length} AI outputs
              </p>
            </div>
            <Sparkles className="w-5 h-5 text-zinc-600" />
          </div>

          {generations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-zinc-600" />
              </div>
              <h3 className="text-lg font-medium text-zinc-300 mb-1">
                No generations yet
              </h3>
              <p className="text-sm text-zinc-500 max-w-xs">
                Your AI-generated content will appear here. Start by creating
                something!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {generations.map((gen) => (
                <div
                  key={gen.id}
                  className="p-6 hover:bg-white/[0.02] transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-200 truncate group-hover:text-white transition-colors">
                        {gen.prompt}
                      </p>
                      {gen.result && (
                        <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                          {gen.result}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-600 whitespace-nowrap shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formatDate(gen.created_at)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
