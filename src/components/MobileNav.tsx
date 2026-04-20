"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu, Home, Briefcase, BookOpen, FileText, GraduationCap, History, LogIn, UserPlus } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#recruitments", label: "Jobs", icon: Briefcase, badge: true },
  { href: "/quizzes", label: "Mocks", icon: FileText },
  { href: "/syllabus", label: "Syllabus", icon: BookOpen },
  { href: "/courses", label: "Courses", icon: GraduationCap },
  { href: "/previous-papers", label: "Prev. Papers", icon: History },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Hamburger Button — visible only on mobile */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-in Drawer */}
      <div className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}>

        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex flex-col">
            <span className="font-heading font-black text-2xl tracking-tighter text-slate-900">
              Sarkari<span className="text-slate-400">Campus</span>
            </span>
            <span className="text-[8px] font-black font-sans text-blue-600 uppercase tracking-wider mt-0.5">
              India&apos;s Only Govt University Prep Portal
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-1">
            {navLinks.map(({ href, label, icon: Icon, badge }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href.split("?")[0].split("#")[0]));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${isActive ? "bg-blue-50 text-blue-700 border border-blue-200" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                  <span className="flex-1">{label}</span>
                  {badge && (
                    <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Auth Buttons */}
        <div className="px-4 py-5 border-t border-slate-100 space-y-3">
          <Link href="/login" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors">
            <LogIn className="w-4 h-4" /> Sign In
          </Link>
          <Link href="/signup" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-900 text-white font-black text-sm hover:bg-blue-600 transition-colors">
            <UserPlus className="w-4 h-4" /> Get Free Access
          </Link>
        </div>
      </div>
    </>
  );
}
