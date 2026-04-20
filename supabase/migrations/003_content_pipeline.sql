-- SarkariCampus: Content Pipeline Tables
-- Run this in your Supabase SQL Editor AFTER running setup_database.sql

-- 1. mock_tests: 10 per recruitment, sequence ordered, first is always free
CREATE TABLE IF NOT EXISTS public.mock_tests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  recruitment_id UUID REFERENCES public.recruitments(id) ON DELETE CASCADE,
  sequence_number INT NOT NULL DEFAULT 1,
  is_free BOOLEAN DEFAULT false,
  awaiting_questions BOOLEAN DEFAULT true,
  title TEXT NOT NULL,
  exam_type TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'Medium',
  time_limit_minutes INT DEFAULT 120,
  questions JSONB DEFAULT '[]',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. syllabus: one per recruitment, structured JSON sections
CREATE TABLE IF NOT EXISTS public.syllabus (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  recruitment_id UUID REFERENCES public.recruitments(id) ON DELETE CASCADE UNIQUE,
  sections JSONB NOT NULL DEFAULT '[]',
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. notes_headers: placeholder headers per recruitment (you fill in content)
CREATE TABLE IF NOT EXISTS public.notes_headers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  recruitment_id UUID REFERENCES public.recruitments(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT DEFAULT '',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. previous_papers: 5 per recruitment, first is free (you provide MCQs)
CREATE TABLE IF NOT EXISTS public.previous_papers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  recruitment_id UUID REFERENCES public.recruitments(id) ON DELETE CASCADE,
  sequence_number INT NOT NULL DEFAULT 1,
  is_free BOOLEAN DEFAULT false,
  awaiting_questions BOOLEAN DEFAULT true,
  year INT,
  title TEXT NOT NULL,
  questions JSONB DEFAULT '[]',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on all new tables
ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.syllabus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes_headers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.previous_papers ENABLE ROW LEVEL SECURITY;

-- Public read access to free/published content
CREATE POLICY "Free mock tests are public" ON public.mock_tests FOR SELECT USING (is_published = true AND is_free = true);
CREATE POLICY "Premium mocks for logged in users" ON public.mock_tests FOR SELECT USING (is_published = true AND auth.uid() IS NOT NULL);
CREATE POLICY "Syllabus is public" ON public.syllabus FOR SELECT USING (true);
CREATE POLICY "Published notes are public" ON public.notes_headers FOR SELECT USING (is_published = true);
CREATE POLICY "Free papers are public" ON public.previous_papers FOR SELECT USING (is_published = true AND is_free = true);
CREATE POLICY "Premium papers for logged in users" ON public.previous_papers FOR SELECT USING (is_published = true AND auth.uid() IS NOT NULL);
