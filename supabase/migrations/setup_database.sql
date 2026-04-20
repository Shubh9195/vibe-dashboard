-- Supabase Complete Schema & Seed for SarkariCampus

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  exam_choice TEXT,
  streak INT DEFAULT 0,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Questions
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  subject TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_option_index INT NOT NULL,
  explanation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Quizzes
CREATE TABLE IF NOT EXISTS public.quizzes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  exam_type TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  time_limit_minutes INT DEFAULT 10,
  question_ids UUID[] NOT NULL,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Quiz Attempts
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE NOT NULL,
  score INT NOT NULL,
  total_questions INT NOT NULL,
  answers JSONB NOT NULL,
  time_taken_seconds INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Notes
CREATE TABLE IF NOT EXISTS public.notes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  difficulty TEXT,
  reading_time INT DEFAULT 5,
  content TEXT NOT NULL,
  key_points TEXT[] DEFAULT '{}',
  exam_types TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Current Affairs
CREATE TABLE IF NOT EXISTS public.current_affairs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  headline TEXT NOT NULL,
  summary TEXT NOT NULL,
  category TEXT NOT NULL,
  content TEXT,
  publish_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Recruitments (Live System)
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

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.current_affairs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruitments ENABLE ROW LEVEL SECURITY;

-- Security Policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own attempts" ON public.quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own attempts" ON public.quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Questions are publicly readable" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Quizzes are publicly readable" ON public.quizzes FOR SELECT USING (is_published = true);
CREATE POLICY "Notes are publicly readable" ON public.notes FOR SELECT USING (true);
CREATE POLICY "Current affairs are publicly readable" ON public.current_affairs FOR SELECT USING (true);
CREATE POLICY "Recruitments are publicly readable" ON public.recruitments FOR SELECT USING (is_active = true);

-- User trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Student'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==========================================
-- SEED DATA
-- ==========================================

-- Insert 5 realistic recruitments
INSERT INTO public.recruitments (title, posts_count, role_name, closing_date, apply_link, institute_icon, category)
VALUES
  ('NFSU Non-Teaching Staff Recruitment 2026', 51, 'Section Officer, DSO & Assistant', '2026-03-23', 'https://nfsunt.samarth.edu.in/index.php/site/login', '🔬', 'NFSU'),
  ('Rashtriya Raksha University Non-Teaching', 3, 'Registrar, Finance Officer & Assistant', '2026-04-13', 'https://rru.ac.in/recruitment/', '🏛️', 'Central Univ'),
  ('IGNOU JAT Recruitment Drive NTA 2026', 200, 'Junior Assistant cum Typist (JAT)', '2026-05-15', 'https://ignou.ac.in/career', '🎓', 'Central Univ'),
  ('DTU Group C Non-Teaching Recruitment', 150, 'Junior Office Assistant & DEO', '2026-04-30', 'http://dtu.ac.in/', '💻', 'Central Univ'),
  ('JNU Non-Teaching Staff NTA (Phase 2)', 388, 'Junior Assistant, MTS, Lab Assistant', '2026-05-30', 'https://jnu.ac.in/career', '🌐', 'Central Univ')
ON CONFLICT DO NOTHING;

-- Seed 5 realistic mock exams corresponding to these jobs into `quizzes` table
INSERT INTO public.quizzes (title, exam_type, difficulty, time_limit_minutes, question_ids, is_published)
VALUES
  ('NFSU Assistant & DSO Standard Mock 1', 'NFSU', 'Medium', 120, '{}', true),
  ('Rashtriya Raksha Univ Admin Ability Test', 'Central Univ', 'Hard', 60, '{}', true),
  ('IGNOU JAT / Typing Assistant NTA Mock', 'Central Univ', 'Medium', 120, '{}', true),
  ('DTU Delhi Group C Mega Mock Paper', 'Central Univ', 'Hard', 150, '{}', true),
  ('JNU Non-Teaching MTS / Junior Assistant Phase 2', 'Central Univ', 'Medium', 120, '{}', true)
ON CONFLICT DO NOTHING;
