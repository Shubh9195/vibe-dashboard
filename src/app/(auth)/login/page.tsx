import Link from "next/link";
import { BookOpen } from "lucide-react";
import { login, signInWithGoogle } from "../actions";

export default function Login() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl">
        <div className="text-center mb-8">
          <BookOpen className="mx-auto h-12 w-12 text-blue-500 mb-4" />
          <h2 className="text-3xl font-black text-white tracking-tight">Welcome back to Sarkari Campus 🎯</h2>
          <p className="text-sm text-slate-400 font-medium mt-2">Log in to resume your preparation.</p>
        </div>

        <form className="space-y-5" action={login}>
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-1">Email Address</label>
            <input name="email" type="email" required className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:ring-2 focus:ring-blue-600 outline-none transition font-medium" placeholder="rahul@example.com" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-bold text-slate-300">Password</label>
              <Link href="/forgot-password" className="text-xs font-bold text-blue-400 hover:underline">Forgot password?</Link>
            </div>
            <input name="password" type="password" required className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:ring-2 focus:ring-blue-600 outline-none transition font-medium" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:scale-105 transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
            Sign in
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700" />
            </div>
            <div className="relative flex justify-center text-sm font-bold">
              <span className="px-2 text-slate-500 bg-slate-800 rounded">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <form action={signInWithGoogle}>
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-slate-700 rounded-xl shadow-sm bg-slate-800 text-sm font-bold text-white hover:bg-slate-700 transition">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
                Google
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center text-sm font-medium text-slate-400 border-t border-slate-700 pt-6">
          Don't have an account? <Link href="/signup" className="text-blue-400 font-bold hover:underline">Create for free</Link>
        </div>
      </div>
    </div>
  );
}
