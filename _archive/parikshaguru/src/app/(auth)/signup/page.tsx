import Link from "next/link";
import { BookOpen } from "lucide-react";
import { signup } from "../actions";

export default function Signup() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100">
        <div className="text-center mb-8">
          <BookOpen className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Create Free Account</h2>
          <p className="text-sm text-slate-500 font-medium mt-2">Start your preparation journey with ParikshaGuru.</p>
        </div>
        
        <form className="space-y-5" action={signup}>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
            <input name="fullName" type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition font-medium" placeholder="Rahul Kumar" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
            <input name="email" type="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition font-medium" placeholder="rahul@example.com" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
            <input name="password" type="password" required minLength={6} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition font-medium" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Which exam are you targeting?</label>
            <select name="examChoice" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition font-medium text-slate-700 bg-white">
              <option value="">Select your goal</option>
              <option value="UPSC">UPSC CSE</option>
              <option value="SSC">SSC (CGL, CHSL, MTS)</option>
              <option value="IBPS">Banking (IBPS, SBI)</option>
              <option value="RRB">Railway (RRB NTPC, Group D)</option>
              <option value="State PSC">State PSC</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="flex items-start gap-2 pt-2">
            <input type="checkbox" required className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300" />
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              I agree to the <Link href="#" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="#" className="text-blue-600 hover:underline">Privacy Policy</Link>.
            </p>
          </div>

          <button type="submit" className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 hover:-translate-y-0.5 transition-all shadow-md shadow-blue-600/20">
            Create Free Account
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-slate-600 border-t border-slate-100 pt-6">
          Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Sign in here</Link>
        </div>
      </div>
    </div>
  );
}
