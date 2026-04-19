import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { BookOpen } from "lucide-react";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "ParikshaGuru - Crack Any Government Exam. Free.",
  description: "ParikshaGuru is India's leading platform for government exam mocks, study notes, and current affairs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.variable} font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        {/* TOPBAR */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-xl tracking-tight text-slate-900">ParikshaGuru</span>
            </Link>
            <div className="hidden md:flex gap-6 font-semibold text-sm text-slate-600">
              <Link href="/" className="hover:text-blue-600 transition">Exams</Link>
              <Link href="/quizzes" className="hover:text-blue-600 transition">Quizzes</Link>
              <Link href="/notes" className="hover:text-blue-600 transition">Notes</Link>
              <Link href="/current-affairs" className="hover:text-blue-600 transition">Current Affairs</Link>
            </div>
            <div className="flex gap-3">
              <Link href="/login" className="px-4 py-2 text-sm font-bold text-slate-700 hover:text-blue-600 transition">
                Login
              </Link>
              <Link href="/signup" className="px-4 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all">
                Start Free
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-1">
          {children}
        </main>

        <footer className="bg-slate-900 text-slate-400 py-12 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <span className="font-black text-xl text-white">ParikshaGuru</span>
            </div>
            <p className="text-sm font-medium mb-4">Empowering students to achieve their government job dreams.</p>
            <div className="flex justify-center gap-4 text-sm mb-8">
              <Link href="#" className="hover:text-white transition">About</Link>
              <Link href="#" className="hover:text-white transition">Privacy</Link>
              <Link href="#" className="hover:text-white transition">Terms</Link>
            </div>
            <p className="text-xs">&copy; 2026 ParikshaGuru. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
