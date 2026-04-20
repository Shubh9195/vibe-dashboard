-- Create the recruitments table to hold dynamic job feed data
CREATE TABLE IF NOT EXISTS public.recruitments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  posts_count INTEGER NOT NULL,
  role_name TEXT NOT NULL,
  closing_date DATE NOT NULL,
  apply_link TEXT NOT NULL,
  institute_icon TEXT NOT NULL,
  category TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.recruitments ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active recruitments
CREATE POLICY "Allow public read access to active recruitments"
  ON public.recruitments FOR SELECT
  USING (is_active = true);

-- Insert 5 realistic recruitments based on real testing frameworks
INSERT INTO public.recruitments (title, posts_count, role_name, closing_date, apply_link, institute_icon, category)
VALUES
  ('NFSU Non-Teaching Staff Recruitment 2026', 51, 'Section Officer, DSO & Assistant', '2026-03-23', 'https://nfsunt.samarth.edu.in/index.php/site/login', '🔬', 'NFSU'),
  ('Rashtriya Raksha University Non-Teaching', 3, 'Registrar, Finance Officer & Assistant', '2026-04-13', 'https://rru.ac.in/recruitment/', '🏛️', 'Central Univ'),
  ('IGNOU JAT Recruitment Drive NTA 2026', 200, 'Junior Assistant cum Typist (JAT)', '2026-05-15', 'https://ignou.ac.in/career', '🎓', 'Central Univ'),
  ('DTU Group C Non-Teaching Recruitment', 150, 'Junior Office Assistant & DEO', '2026-04-30', 'http://dtu.ac.in/', '💻', 'Central Univ'),
  ('JNU Non-Teaching Staff NTA (Phase 2)', 388, 'Junior Assistant, MTS, Lab Assistant', '2026-05-30', 'https://jnu.ac.in/career', '🌐', 'Central Univ')
ON CONFLICT DO NOTHING;

-- Seed 5 realistic mock exams corresponding to these jobs into `quizzes` table
INSERT INTO public.quizzes (title, description, questions_count, duration_minutes, institute_type, is_published)
VALUES
  ('NFSU Assistant & DSO Standard Mock 1', 'Official syllabus mock for National Forensic Sciences University covering GK, Analytics, and University Administration.', 100, 120, 'NFSU', true),
  ('Rashtriya Raksha Univ Admin Ability Test', 'Standard administration and managerial accounting mock tailored for Registrar and Finance Officer levels.', 50, 60, 'Central Univ', true),
  ('IGNOU JAT / Typing Assistant NTA Mock', 'Full NTA pattern syllabus including computer knowledge, English, and typing parameters.', 120, 120, 'Central Univ', true),
  ('DTU Delhi Group C Mega Mock Paper', 'Comprehensive test series module covering Delhi GK, numerical ability, and clerical aptitude.', 150, 150, 'Central Univ', true),
  ('JNU Non-Teaching MTS / Junior Assistant Phase 2', 'NTA Phase 2 Mock with exact question telemetry mapping JNU previous year administrative trends.', 100, 120, 'Central Univ', true)
ON CONFLICT DO NOTHING;
