import { CheckCircle2, FileText, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const realSyllabi = [
  {
    category: "NFSU",
    icon: "🔬",
    title: "NFSU Section Officer, DSO & Assistant 2026",
    vacancy: "51 Posts",
    color: "blue",
    sections: [
      {
        name: "General Knowledge & Current Affairs",
        weightage: "25%",
        topics: ["Indian Polity & Constitution", "Science & Technology", "National/International Events", "History & Geography", "Government Schemes & Policies"]
      },
      {
        name: "General Studies & Higher Education",
        weightage: "25%",
        topics: ["Indian Higher Education System", "Central University Governance", "UGC Rules & Regulations", "National Education Policy 2020", "NAAC & NIRF Rankings"]
      },
      {
        name: "English Language & Comprehension",
        weightage: "25%",
        topics: ["Reading Comprehension", "Vocabulary & Synonyms/Antonyms", "Grammar & Error Detection", "Sentence Improvement", "Fill in the Blanks"]
      },
      {
        name: "Laws Governing Public Administration",
        weightage: "25%",
        topics: ["RTI Act 2005", "Service Rules (CCS)", "Office Procedures & File Management", "Establishment Matters", "General Financial Rules (GFR)"]
      }
    ],
    examPattern: "Written Test — 300 Marks | 3 Hours",
    officialLink: "https://nfsunt.samarth.edu.in/index.php/site/login"
  },
  {
    category: "RRU",
    icon: "🏛️",
    title: "Rashtriya Raksha University — Registrar, Finance Officer & Assistant",
    vacancy: "3 Posts",
    color: "purple",
    sections: [
      {
        name: "University Administration (Registrar)",
        weightage: "30%",
        topics: ["University Acts & Statutes", "Recruitment & Service Rules", "Academic Administration", "Legal & Compliance Framework", "Governance & Board Management"]
      },
      {
        name: "Finance & Accounts (Finance Officer)",
        weightage: "30%",
        topics: ["Central Govt Financial Rules (GFR)", "Budget & Expenditure Management", "Internal Audit Procedures", "Pension & Pay Rules", "Income Tax & GST Basics"]
      },
      {
        name: "General Aptitude (Research & Admin Assistant)",
        weightage: "20%",
        topics: ["Quantitative Aptitude", "Logical Reasoning", "English Communication", "MS Office (Word, Excel, PowerPoint)", "Basic Computer Applications"]
      },
      {
        name: "General Knowledge",
        weightage: "20%",
        topics: ["Ministry of Home Affairs", "National Security & Defence Policy", "Current Events", "National Organizations & Bodies"]
      }
    ],
    examPattern: "Shortlisting + Interview (Registrar/Finance Officer) | Competitive Exam (Assistant)",
    officialLink: "https://rru.ac.in/recruitment/"
  },
  {
    category: "IGNOU",
    icon: "🎓",
    title: "IGNOU Junior Assistant cum Typist (JAT) NTA 2026",
    vacancy: "200 Posts",
    color: "emerald",
    sections: [
      {
        name: "General English",
        weightage: "25%",
        topics: ["Reading Comprehension", "Vocabulary", "Grammar Usage", "Letter & Report Writing", "Précis Writing"]
      },
      {
        name: "Computer Knowledge & MS Office",
        weightage: "25%",
        topics: ["MS Word, Excel, PowerPoint", "Internet & Email", "Basic Operating Systems", "Database Concepts", "Shortcuts & Productivity"]
      },
      {
        name: "Quantitative Aptitude & Reasoning",
        weightage: "25%",
        topics: ["Number Systems", "Percentages & Ratio", "Data Interpretation", "Logical Sequences", "Blood Relations & Puzzles"]
      },
      {
        name: "General Knowledge",
        weightage: "25%",
        topics: ["Indian Distance Education", "IGNOU Structure & Programs", "Government Schemes", "Current Events", "Science & Technology"]
      }
    ],
    examPattern: "NTA Computer Based Test — 120 Questions | 120 Mins + Typing Test (Hindi/English) 35 WPM",
    officialLink: "https://ignou.ac.in/career"
  },
  {
    category: "DTU",
    icon: "💻",
    title: "DTU Group C — Junior Office Assistant & DEO",
    vacancy: "150 Posts",
    color: "amber",
    sections: [
      {
        name: "General Intelligence & Reasoning",
        weightage: "25%",
        topics: ["Analogies", "Coding-Decoding", "Number Series", "Non-Verbal Reasoning", "Directions & Distances"]
      },
      {
        name: "Quantitative Aptitude",
        weightage: "25%",
        topics: ["Arithmetic", "Algebra Basics", "Time & Work", "Speed & Distance", "Profit & Loss"]
      },
      {
        name: "English Language",
        weightage: "25%",
        topics: ["Reading Comprehension", "Cloze Test", "Sentence Rearrangement", "Error Spotting", "One Word Substitution"]
      },
      {
        name: "General Awareness (Delhi Focus)",
        weightage: "25%",
        topics: ["Delhi Govt Schemes", "DTU History & Stats", "Current Affairs", "National Highlights", "Science in Daily Life"]
      }
    ],
    examPattern: "Written Test — 150 Questions | 150 Marks | 2.5 Hours + Skill Test (DEO posts)",
    officialLink: "http://dtu.ac.in/"
  },
  {
    category: "JNU",
    icon: "🌐",
    title: "JNU Non-Teaching Staff NTA Phase 2 — MTS, Junior Assistant, Lab Assistant",
    vacancy: "388 Posts",
    color: "rose",
    sections: [
      {
        name: "General Intelligence & Reasoning",
        weightage: "25%",
        topics: ["Pattern Recognition", "Syllogisms", "Coding-Decoding", "Matrix Puzzles", "Clock & Calendar Problems"]
      },
      {
        name: "General Awareness",
        weightage: "25%",
        topics: ["Higher Education Policy", "JNU History & Schools", "National Awards & Honours", "Current Events", "Indian Culture & Heritage"]
      },
      {
        name: "Numerical Ability",
        weightage: "25%",
        topics: ["Basic Arithmetic", "Percentage & Average", "Simple & Compound Interest", "Data Interpretation", "Mensuration"]
      },
      {
        name: "English Language",
        weightage: "25%",
        topics: ["Comprehension Passages", "Idioms & Phrases", "Active/Passive Voice", "Direct/Indirect Speech", "Fill in the Blanks"]
      }
    ],
    examPattern: "NTA Computer Based Test — 100 Questions | 100 Marks | 90 Mins",
    officialLink: "https://jnu.ac.in/career"
  }
];

const colorMap: Record<string, { border: string; badge: string; icon: string; link: string }> = {
  blue: { border: "border-blue-200", badge: "bg-blue-50 text-blue-700 border-blue-200", icon: "bg-blue-50 text-blue-600", link: "bg-blue-600 hover:bg-blue-700 text-white" },
  purple: { border: "border-purple-200", badge: "bg-purple-50 text-purple-700 border-purple-200", icon: "bg-purple-50 text-purple-600", link: "bg-purple-600 hover:bg-purple-700 text-white" },
  emerald: { border: "border-emerald-200", badge: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: "bg-emerald-50 text-emerald-600", link: "bg-emerald-600 hover:bg-emerald-700 text-white" },
  amber: { border: "border-amber-200", badge: "bg-amber-50 text-amber-700 border-amber-200", icon: "bg-amber-50 text-amber-700", link: "bg-amber-500 hover:bg-amber-600 text-white" },
  rose: { border: "border-rose-200", badge: "bg-rose-50 text-rose-700 border-rose-200", icon: "bg-rose-50 text-rose-600", link: "bg-rose-600 hover:bg-rose-700 text-white" }
};

export default async function Syllabus() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* HEADER */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-full text-xs font-black uppercase tracking-widest mb-5 shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" /> Official Exam Syllabus
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          Stop Wasting Time.<br />
          <span className="text-blue-600">Study Only What's Asked.</span>
        </h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">
          Official syllabus breakdown for every active recruitment — sourced directly from official notifications and exam analysis.
        </p>
      </div>

      {/* SYLLABUS CARDS */}
      <div className="space-y-10">
        {realSyllabi.map((syl) => {
          const c = colorMap[syl.color];
          return (
            <div key={syl.category} className={`bg-white border-2 ${c.border} rounded-3xl overflow-hidden shadow-sm`}>
              {/* Card Header */}
              <div className="p-7 border-b border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${c.icon} rounded-2xl flex items-center justify-center text-3xl`}>{syl.icon}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-black px-2.5 py-1 rounded-lg border uppercase tracking-wider ${c.badge}`}>{syl.category}</span>
                        <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-100">{syl.vacancy}</span>
                      </div>
                      <h2 className="text-xl font-black text-slate-900 leading-tight">{syl.title}</h2>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Link href={`/quizzes?filter=${encodeURIComponent(syl.category)}`}
                      className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-700 transition">
                      Mock Tests <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                    <a href={syl.officialLink} target="_blank" rel="noopener noreferrer"
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition">
                      Official Site
                    </a>
                  </div>
                </div>
                <div className="mt-4 px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 inline-flex items-center gap-2 text-sm font-bold text-slate-700">
                  <FileText className="w-4 h-4 text-slate-500" /> {syl.examPattern}
                </div>
              </div>

              {/* Syllabus Sections Grid */}
              <div className="p-7">
                <div className="grid sm:grid-cols-2 gap-4">
                  {syl.sections.map((section, si) => (
                    <div key={si} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-black text-slate-800 text-sm leading-tight">{section.name}</h3>
                        <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg ml-2 shrink-0">{section.weightage}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {section.topics.map((topic, ti) => (
                          <li key={ti} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={undefined}
                    className={`flex-1 py-3 ${c.link} rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition print:hidden`}
                    title="Use browser's Print (Ctrl+P) and choose Save as PDF">
                    <FileText className="w-4 h-4" /> Download PDF (Use Ctrl+P → Save as PDF)
                  </button>
                  <Link href={`/quizzes?filter=${encodeURIComponent(syl.category)}`}
                    className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition">
                    Attempt Mock Tests <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
