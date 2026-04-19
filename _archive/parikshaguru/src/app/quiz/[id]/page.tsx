"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Clock, CheckCircle2 } from "lucide-react";

const mockQuestions = [
  { id: 1, text: "Which Article of the Indian Constitution deals with the Fundamental Rights?", options: ["Article 12-35", "Article 36-51", "Article 51A", "Article 1-4"], correct: 0 },
  { id: 2, text: "The headquarters of RBI is located in which city?", options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"], correct: 1 },
  { id: 3, text: "Who was the first woman President of the Indian National Congress?", options: ["Sarojini Naidu", "Annie Besant", "Indira Gandhi", "Sonia Gandhi"], correct: 1 },
  { id: 4, text: "What is the repo rate?", options: ["Rate at which RBI borrows", "Rate at which RBI lends to banks", "Rate of inflation", "Market exchange rate"], correct: 1 }
];

export default function QuizEngine({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(150); // 2.5 minutes for mock
  
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const t = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const handleNext = () => {
    if (selected === null) return;
    
    setAnswers(prev => ({ ...prev, [currentIdx]: selected }));
    if (currentIdx < mockQuestions.length - 1) {
      setCurrentIdx(curr => curr + 1);
      setSelected(null);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // In real app, submit 'answers' object to Supabase here
    // Redirect to result page
    // Mock calculating score
    const score = mockQuestions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
    router.push(`/quiz/result/${params.id}?score=${score}&total=${mockQuestions.length}`);
  };

  const q = mockQuestions[currentIdx];
  const progressPercent = ((currentIdx + 1) / mockQuestions.length) * 100;
  
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;
  const timeColor = timeLeft <= 60 ? "text-red-600 bg-red-50 border-red-200" : timeLeft <= 120 ? "text-amber-600 bg-amber-50 border-amber-200" : "text-emerald-700 bg-emerald-50 border-emerald-200";

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-black text-slate-800">Quiz In Progress</h2>
          <p className="text-sm font-bold text-slate-500">Question {currentIdx + 1} of {mockQuestions.length}</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 border rounded-xl font-bold tracking-widest font-mono text-lg ${timeColor}`}>
          <Clock className="w-5 h-5" />
          {min.toString().padStart(2, '0')}:{sec.toString().padStart(2, '0')}
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-12">
        <div className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
      </div>

      {/* QUESTION BOX */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm mb-8 animate-in slide-in-from-right-4 fade-in duration-300">
        <h3 className="text-xl font-bold text-slate-900 mb-6 leading-relaxed bg-slate-50 px-6 py-4 rounded-xl border border-slate-100">
          <span className="text-blue-600 mr-2">Q{currentIdx + 1}.</span> {q.text}
        </h3>
        
        <div className="space-y-3">
          {q.options.map((opt, i) => {
            const isSelected = selected === i;
            return (
              <button 
                key={i} 
                onClick={() => setSelected(i)}
                className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all font-semibold flex items-center justify-between ${
                  isSelected ? "border-blue-600 bg-blue-50 text-blue-800" : "border-slate-200 hover:border-blue-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span><span className="inline-block w-6 text-slate-400 font-bold">{String.fromCharCode(65 + i)}.</span> {opt}</span>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* ACTION BLOCK */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={selected === null}
          className="px-8 py-3.5 bg-slate-900 disabled:bg-slate-300 text-white rounded-xl font-bold transition-all disabled:cursor-not-allowed hover:bg-black"
        >
          {currentIdx === mockQuestions.length - 1 ? "Submit Quiz" : "Next Question →"}
        </button>
      </div>
    </div>
  );
}
