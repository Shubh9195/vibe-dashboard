import { Book, FileText, CheckCircle2 } from "lucide-react";

export default function Syllabus() {
  const syllabi = [
    {
      institute: "IIT Non-Teaching Phase 1",
      topics: [
        { title: "General Intelligence & Reasoning", duration: "50 Questions" },
        { title: "General Awareness (Focus on Higher Ed)", duration: "50 Questions" },
        { title: "Quantitative Aptitude", duration: "50 Questions" },
        { title: "English Language & Comprehension", duration: "50 Questions" }
      ]
    },
    {
      institute: "NIT Administrative Staff Framework",
      topics: [
        { title: "Office Procedures & Rules", duration: "25 Questions" },
        { title: "General Financial Rules (GFR)", duration: "25 Questions" },
        { title: "Quantitative & Logical Reasoning", duration: "30 Questions" },
        { title: "Drafting & Noting skills", duration: "20 Questions" }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Official Recruitment Syllabus</h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto">Stop studying irrelevant topics. Here is the exact breakdown for Central University and Premier Institute recuritments.</p>
      </div>

      <div className="space-y-8">
        {syllabi.map((syl, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-blue-900 border-b border-slate-100 pb-4 mb-6">{syl.institute}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {syl.topics.map((t, j) => (
                <div key={j} className="flex gap-3 items-start p-4 bg-slate-50 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm mb-1">{t.title}</h3>
                    <p className="text-xs font-bold text-slate-500">{t.duration}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-8 px-6 py-2.5 bg-blue-50 text-blue-600 font-bold rounded-lg w-full flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors">
              <FileText className="w-4 h-4" /> Download Full PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
