import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Sarkari Campus - Government University Recruitment Platform",
  description: "Sarkari Campus is India's leading platform for IIT, NIT, and University non-teaching recruitment mocks and materials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontHeading.variable} font-sans antialiased flex flex-col min-h-screen text-slate-800 selection:bg-blue-100 selection:text-blue-900`}>
        {/* ELITE TALL TOPBAR */}
        <nav className="sticky top-0 z-50 glass-nav transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4 group">
              <Image
                src="/logo.png"
                alt="Sarkari Campus Icon"
                width={80}
                height={80}
                className="h-16 w-16 object-contain group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="flex flex-col">
                <span className="font-heading font-black text-2xl md:text-3xl tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors leading-none">
                  Sarkari<span className="text-slate-400">Campus</span>
                </span>
                <span className="text-[7px] md:text-[10px] font-black font-sans text-blue-600 uppercase tracking-wider mt-1.5 w-32 md:w-auto leading-tight md:leading-normal">
                  India's Only Govt University Recruitment Prep Portal
                </span>
              </div>
            </Link>
            <div className="hidden md:flex gap-8 font-bold text-sm text-slate-500">
              <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
              <Link href="/#recruitments" className="hover:text-slate-900 transition-colors text-blue-600 flex items-center gap-1">Jobs<span className="flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span></Link>
              <Link href="/quizzes" className="hover:text-slate-900 transition-colors">Mocks</Link>
              <Link href="/syllabus" className="hover:text-slate-900 transition-colors">Syllabus</Link>
              <Link href="/notes" className="hover:text-slate-900 transition-colors">Notes</Link>
              <Link href="/previous-papers" className="hover:text-blue-600 transition-colors text-gradient-blue">Prev. Papers</Link>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/login" className="hidden sm:block px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
                Sign In
              </Link>
              <Link href="/signup" className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-black bg-slate-900 text-white rounded-xl shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:bg-slate-800 hover:-translate-y-0.5 transition-all">
                Get Access
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-1 relative">
          {children}
        </main>

        <footer className="border-t border-slate-200 bg-white/50 py-20 mt-20 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="flex justify-center items-center gap-5 mb-8">
              <Image
                src="/logo.png"
                alt="Sarkari Campus Icon"
                width={100}
                height={100}
                className="h-20 w-20 object-contain hover:scale-110 transition-transform duration-500"
              />
              <div className="flex flex-col text-left">
                <span className="font-heading font-black text-4xl tracking-tighter text-slate-900">
                  Sarkari<span className="text-slate-400">Campus</span>
                </span>
                <span className="text-[10px] md:text-[11px] font-black font-sans text-blue-600 uppercase tracking-widest mt-1 border-t border-slate-200 block pt-1.5">
                  India's Only Govt University Recruitment Prep Portal
                </span>
              </div>
            </div>
            <p className="text-sm font-semibold mb-8 text-slate-500 max-w-md mx-auto">Prepare and accelerate your path to Elite Government Universities across India.</p>
            <div className="flex justify-center gap-6 text-sm mb-12 font-bold text-slate-400">
              <Link href="/about" className="hover:text-slate-700 transition-colors">About the Platform</Link>
              <Link href="/partnerships" className="hover:text-slate-700 transition-colors">Institute Partnerships</Link>
              <Link href="/privacy" className="hover:text-slate-700 transition-colors">Privacy Policy</Link>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">&copy; 2026 Sarkari Campus Technologies.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
