-- Level Advisor assignments and read-only academic records.
create table if not exists public.fossa_academic_students (
  user_id uuid primary key references auth.users(id) on delete cascade,
  student_number text unique,
  department text not null,
  level integer not null check (level in (100,200,300,400,500,600)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.fossa_academic_courses (
  id uuid primary key default gen_random_uuid(),
  course_code text not null,
  title text not null,
  credit_units integer not null default 3 check (credit_units between 1 and 10),
  department text not null,
  level integer not null check (level in (100,200,300,400,500,600)),
  created_at timestamptz not null default now(),
  unique(course_code, department)
);
create table if not exists public.fossa_course_registrations (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.fossa_academic_students(user_id) on delete cascade,
  course_id uuid not null references public.fossa_academic_courses(id) on delete restrict,
  academic_session text not null,
  semester text not null check (semester in ('First','Second','Summer')),
  status text not null default 'registered' check (status in ('registered','withdrawn','completed')),
  created_at timestamptz not null default now(),
  unique(student_id, course_id, academic_session, semester)
);
create table if not exists public.fossa_course_results (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.fossa_academic_students(user_id) on delete cascade,
  course_id uuid not null references public.fossa_academic_courses(id) on delete restrict,
  academic_session text not null,
  semester text not null check (semester in ('First','Second','Summer')),
  score numeric(5,2) check (score between 0 and 100),
  grade text,
  grade_point numeric(3,2) check (grade_point between 0 and 5),
  result_status text not null default 'pending' check (result_status in ('pending','passed','failed','carryover')),
  created_at timestamptz not null default now(),
  unique(student_id, course_id, academic_session, semester)
);
create table if not exists public.fossa_level_advisors (
  id uuid primary key default gen_random_uuid(),
  lecturer_id uuid not null references auth.users(id) on delete cascade,
  department text not null,
  level integer not null check (level in (100,200,300,400,500,600)),
  assigned_by uuid not null references auth.users(id),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists fossa_one_active_advisor_per_cohort
  on public.fossa_level_advisors (lower(department), level) where active = true;
create index if not exists fossa_students_cohort_idx on public.fossa_academic_students (lower(department), level);
create index if not exists fossa_registrations_student_idx on public.fossa_course_registrations (student_id, academic_session, semester);
create index if not exists fossa_results_student_idx on public.fossa_course_results (student_id, academic_session, semester);
create index if not exists fossa_advisors_lecturer_idx on public.fossa_level_advisors (lecturer_id, active);
alter table public.fossa_academic_students enable row level security;
alter table public.fossa_academic_courses enable row level security;
alter table public.fossa_course_registrations enable row level security;
alter table public.fossa_course_results enable row level security;
alter table public.fossa_level_advisors enable row level security;
revoke all on public.fossa_academic_students, public.fossa_academic_courses, public.fossa_course_registrations, public.fossa_course_results, public.fossa_level_advisors from anon, authenticated;
grant all on public.fossa_academic_students, public.fossa_academic_courses, public.fossa_course_registrations, public.fossa_course_results, public.fossa_level_advisors to service_role;
drop trigger if exists fossa_academic_students_updated_at on public.fossa_academic_students;
create trigger fossa_academic_students_updated_at before update on public.fossa_academic_students for each row execute function public.fossa_set_updated_at();
drop trigger if exists fossa_level_advisors_updated_at on public.fossa_level_advisors;
create trigger fossa_level_advisors_updated_at before update on public.fossa_level_advisors for each row execute function public.fossa_set_updated_at();
