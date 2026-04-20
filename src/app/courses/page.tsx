import Link from "next/link";
import { BookOpen, Clock, ChevronRight, Lock, PlayCircle, Star, Users, CheckCircle2 } from "lucide-react";

const courses = [
  {
    id: "nfsu-complete",
    title: "NFSU Section Officer & DSO Complete Course",
    institute: "NFSU",
    icon: "🔬",
    color: "blue",
    duration: "40 Hours",
    modules: 8,
    students: "1.2k",
    rating: 4.8,
    isFree: false,
    highlights: ["Full GK & Higher Education syllabus", "Office Administration & RTI Deep Dive", "10 Full Mock Tests included", "Exam strategy from serving officials"],
    tag: "Bestseller"
  },
  {
    id: "rru-complete",
    title: "RRU Registrar & Finance Officer Prep",
    institute: "RRU",
    icon: "🏛️",
    color: "purple",
    duration: "25 Hours",
    modules: 5,
    students: "340",
    rating: 4.7,
    isFree: false,
    highlights: ["University Governance & Compliance", "GFR & Accounts in depth", "Interview preparation module", "Official notification analysis"],
    tag: "New"
  },
  {
    id: "jnu-nta-complete",
    title: "JNU Non-Teaching NTA Phase 2 Crash Course",
    institute: "JNU",
    icon: "🌐",
    color: "rose",
    duration: "30 Hours",
    modules: 6,
    students: "2.1k",
    rating: 4.9,
    isFree: false,
    highlights: ["NTA CBT interface walkthrough", "Speed & accuracy drills", "Previous year question analysis", "5 Full Mock Tests included"],
    tag: "Top Rated"
  },
  {
    id: "ignou-jat",
    title: "IGNOU JAT Free Starter Course",
    institute: "IGNOU",
    icon: "🎓",
    color: "emerald",
    duration: "8 Hours",
    modules: 3,
    students: "5.4k",
    rating: 4.6,
    isFree: true,
    highlights: ["English & Typing Test intro", "Computer Basics for beginners", "Sample MCQs with explanations"],
    tag: "Free"
  },
  {
    id: "dtu-group-c",
    title: "DTU Group C Complete Prep Bundle",
    institute: "DTU",
    icon: "💻",
    color: "amber",
    duration: "35 Hours",
    modules: 7,
    students: "890",
    rating: 4.7,
    isFree: false,
    highlights: ["Delhi GK & Local Affairs", "Quantitative Aptitude bootcamp", "DEO Skill Test preparation", "10 Full Mock Tests included"],
    tag: "New"
  },
  {
    id: "general-foundation",
    title: "University Staff Recruitment Foundation",
    institute: "All Institutes",
    icon: "⭐",
    color: "slate",
    duration: "15 Hours",
    modules: 4,
    students: "8.9k",
    rating: 4.5,
    isFree: true,
    highlights: ["GK for university recruitments", "English basics", "Reasoning shortcuts", "Perfect for all beginner aspirants"],
    tag: "Free"
  }
];

const colorMap: Record<string, { border: string; badge: string; tag: string; btn: string }> = {
  blue: { border: "border-blue-100 hover:border-blue-300", badge: "bg-blue-50 text-blue-700", tag: "bg-blue-600 text-white", btn: "bg-blue-600 hover:bg-blue-700 text-white" },
  purple: { border: "border-purple-100 hover:border-purple-300", badge: "bg-purple-50 text-purple-700", tag: "bg-purple-600 text-white", btn: "bg-purple-600 hover:bg-purple-700 text-white" },
  rose: { border: "border-rose-100 hover:border-rose-300", badge: "bg-rose-50 text-rose-700", tag: "bg-rose-600 text-white", btn: "bg-rose-600 hover:bg-rose-700 text-white" },
  emerald: { border: "border-emerald-200 hover:border-emerald-400", badge: "bg-emerald-50 text-emerald-700", tag: "bg-emerald-500 text-white", btn: "bg-emerald-500 hover:bg-emerald-600 text-white" },
  amber: { border: "border-amber-100 hover:border-amber-300", badge: "bg-amber-50 text-amber-700", tag: "bg-amber-500 text-white", btn: "bg-amber-500 hover:bg-amber-600 text-white" },
  slate: { border: "border-slate-200 hover:border-slate-400", badge: "bg-slate-100 text-slate-700", tag: "bg-slate-700 text-white", btn: "bg-slate-800 hover:bg-slate-900 text-white" },
};

export default function CoursesPage() {
  const freeCourses = courses.filter(c => c.isFree);
  const premiumCourses = courses.filter(c => !c.isFree);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">

      {/* HEADER */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-full text-xs font-black uppercase tracking-widest mb-5 shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" /> Structured Learning
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          Curated <span className="text-blue-600">Courses</span> for<br className="hidden md:block" /> University Staff Recruitments
        </h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">
          Expert-crafted preparation courses designed specifically for IIT, NIT, Central University and forensic institute recruitments. Created by candidates who already cracked these exams.
        </p>
      </div>

      {/* FREE COURSES */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-black text-slate-900">🆓 Free Starter Courses</h2>
          <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">No Login Required</span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {freeCourses.map(course => {
            const c = colorMap[course.color];
            return (
              <div key={course.id} className={`bg-white border-2 ${c.border} rounded-3xl p-7 shadow-sm hover:shadow-lg transition-all group`}>
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{course.icon}</div>
                    <div>
                      <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${c.badge}`}>{course.institute}</span>
                    </div>
                  </div>
                  <span className="text-xs font-black bg-emerald-500 text-white px-3 py-1 rounded-full">{course.tag}</span>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-3 leading-tight">{course.title}</h3>

                <div className="flex items-center gap-5 text-sm font-semibold text-slate-500 mb-5">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{course.duration}</span>
                  <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />{course.modules} Modules</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{course.students} enrolled</span>
                </div>

                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                  ))}
                  <span className="text-sm font-bold text-slate-600 ml-1">{course.rating}</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {course.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{h}
                    </li>
                  ))}
                </ul>

                <Link href={`/courses/${course.id}`} className={`w-full py-3 ${c.btn} rounded-xl font-bold text-center flex items-center justify-center gap-2 transition text-sm shadow-sm`}>
                  <PlayCircle className="w-4 h-4" /> Start Free Course
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* PREMIUM COURSES */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-black text-slate-900">⭐ Premium Course Bundle</h2>
          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Sign Up to Enroll</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumCourses.map(course => {
            const c = colorMap[course.color];
            return (
              <div key={course.id} className={`bg-white border ${c.border} rounded-3xl p-7 shadow-sm hover:shadow-lg transition-all group relative overflow-hidden`}>
                <div className="absolute top-0 right-0 px-3 py-1 text-xs font-black rounded-bl-xl" style={{ background: course.color === 'blue' ? '#2563eb' : course.color === 'purple' ? '#7c3aed' : course.color === 'rose' ? '#e11d48' : course.color === 'amber' ? '#f59e0b' : '#1e293b', color: 'white' }}>
                  {course.tag}
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="text-4xl">{course.icon}</div>
                  <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${c.badge}`}>{course.institute}</span>
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-3 leading-tight pr-12">{course.title}</h3>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{course.modules} Modules</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{course.students}</span>
                </div>

                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(course.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                  ))}
                  <span className="text-xs font-bold text-slate-600 ml-1">{course.rating}</span>
                </div>

                <ul className="space-y-1.5 mb-6">
                  {course.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />{h}
                    </li>
                  ))}
                </ul>

                <Link href="/signup" className="w-full py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-bold text-center flex items-center justify-center gap-2 transition text-sm">
                  <Lock className="w-4 h-4" /> Sign Up to Enroll
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA BOTTOM */}
      <div className="mt-16 bg-slate-900 rounded-3xl p-10 text-center">
        <h2 className="text-3xl font-black text-white mb-3">Ready to Start Preparing?</h2>
        <p className="text-slate-400 font-medium mb-8 max-w-xl mx-auto">Join thousands of aspirants already preparing on SarkariCampus. Free courses available immediately — no credit card required.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup" className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl text-sm transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
            Create Free Account <ChevronRight className="w-4 h-4" />
          </Link>
          <Link href="/quizzes" className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2">
            Browse Free Mocks
          </Link>
        </div>
      </div>
    </div>
  );
}
