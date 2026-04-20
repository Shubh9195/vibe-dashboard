import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Admin-only Supabase client using service role key (bypasses RLS)
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !serviceKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY env variable. Add it to .env.local and Vercel settings.");
  }
  return createClient(url, serviceKey);
}

// Generates a default syllabus structure based on post name
function generateSyllabus(postName: string, category: string) {
  const base = [
    { name: "General Knowledge & Current Affairs", weightage: "25%", topics: ["Indian Polity & Constitution", "Science & Technology", "National/International Events", "Government Schemes & Policies", "Sports & Awards"] },
    { name: "English Language & Comprehension", weightage: "25%", topics: ["Reading Comprehension", "Vocabulary & Synonyms/Antonyms", "Grammar & Error Detection", "Sentence Improvement", "Fill in the Blanks"] },
    { name: "Quantitative Aptitude & Reasoning", weightage: "25%", topics: ["Number Systems", "Percentages & Ratio", "Logical Sequences", "Data Interpretation", "Blood Relations & Puzzles"] },
    { name: "Computer Knowledge & MS Office", weightage: "25%", topics: ["MS Word, Excel, PowerPoint", "Internet & Email", "Basic Operating Systems", "Shortcuts & Productivity", "Database Basics"] }
  ];
  return base;
}

// Generates 10 mock test scaffold objects for a recruitment
function generateMockScaffolds(recruitmentId: string, recruitmentTitle: string, examType: string) {
  const mocks = [];
  for (let i = 1; i <= 10; i++) {
    mocks.push({
      recruitment_id: recruitmentId,
      title: `${recruitmentTitle} — Mock Test #${i}`,
      exam_type: examType,
      difficulty: i <= 3 ? "Easy" : i <= 7 ? "Medium" : "Hard",
      time_limit_minutes: 120,
      question_ids: [],
      is_published: i === 1, // Only publish Mock 1 immediately; others await questions
      sequence_number: i,
      is_free: i === 1,
      awaiting_questions: i > 1
    });
  }
  return mocks;
}

// Generates 5 previous paper scaffold objects for a recruitment
function generatePaperScaffolds(recruitmentId: string, recruitmentTitle: string) {
  return Array.from({ length: 5 }, (_, i) => ({
    recruitment_id: recruitmentId,
    title: `${recruitmentTitle} — Previous Paper #${i + 1}`,
    sequence_number: i + 1,
    is_free: i === 0,
    year: 2026 - i,
    questions: [],
    is_published: i === 0, // Only publish Paper 1; others await your content
    awaiting_questions: i > 0
  }));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, posts_count, role_name, closing_date, apply_link, institute_icon, category } = body;

    if (!title || !posts_count || !role_name || !closing_date || !apply_link || !category) {
      return NextResponse.json({ error: "Missing required fields: title, posts_count, role_name, closing_date, apply_link, category" }, { status: 400 });
    }

    const supabase = getAdminClient();

    // STEP 1: Insert the recruitment
    const { data: recruitment, error: recruitErr } = await supabase
      .from("recruitments")
      .insert({ title, posts_count, role_name, closing_date, apply_link, institute_icon: institute_icon || "🏛️", category, is_active: true })
      .select()
      .single();

    if (recruitErr) throw new Error(`Recruitment insert failed: ${recruitErr.message}`);

    const rid = recruitment.id;

    // STEP 2: Scaffold 10 mock tests (only #1 published immediately)
    const mocks = generateMockScaffolds(rid, title, category);
    const { error: mocksErr } = await supabase.from("mock_tests").insert(mocks);
    if (mocksErr) console.warn("mock_tests table may not exist yet:", mocksErr.message);

    // STEP 3: Generate and store the syllabus
    const syllabusSections = generateSyllabus(role_name, category);
    const { error: syllabusErr } = await supabase.from("syllabus").insert({
      recruitment_id: rid,
      sections: syllabusSections,
      pdf_url: null
    });
    if (syllabusErr) console.warn("syllabus table may not exist yet:", syllabusErr.message);

    // STEP 4: Create notes header placeholders (you fill the content later)
    const noteHeaders = [
      { recruitment_id: rid, title: `${role_name} — General Knowledge Guide`, content: "", is_published: false },
      { recruitment_id: rid, title: `${role_name} — English & Comprehension Notes`, content: "", is_published: false },
      { recruitment_id: rid, title: `${role_name} — Quantitative Aptitude Shortcuts`, content: "", is_published: false },
      { recruitment_id: rid, title: `${role_name} — Computer Knowledge Summary`, content: "", is_published: false },
    ];
    const { error: notesErr } = await supabase.from("notes_headers").insert(noteHeaders);
    if (notesErr) console.warn("notes_headers table may not exist yet:", notesErr.message);

    // STEP 5: Scaffold 5 previous year papers (only #1 published immediately)
    const papers = generatePaperScaffolds(rid, title);
    const { error: papersErr } = await supabase.from("previous_papers").insert(papers);
    if (papersErr) console.warn("previous_papers table may not exist yet:", papersErr.message);

    return NextResponse.json({
      success: true,
      message: `✅ Recruitment "${title}" has been fully scaffolded!`,
      recruitmentId: rid,
      created: {
        recruitment: 1,
        mockTests: `10 (Mock #1 published FREE, 2-10 awaiting your questions)`,
        syllabus: `1 (auto-generated from post name)`,
        notesHeaders: `4 (awaiting your content)`,
        previousPapers: `5 (Paper #1 published FREE, 2-5 awaiting your questions)`
      },
      nextSteps: [
        "Send mock test questions for Mock #2–10 and I will push them live",
        "Send previous year questions for Papers #2–5 and I will push them live",
        "Send notes content for each topic header and I will publish them"
      ]
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    usage: "POST /api/agent/new-recruitment",
    body: {
      title: "Recruitment Title",
      posts_count: 50,
      role_name: "Junior Assistant & Clerk",
      closing_date: "2026-06-30",
      apply_link: "https://official-site.gov.in",
      institute_icon: "🏛️",
      category: "Central Univ"
    }
  });
}
