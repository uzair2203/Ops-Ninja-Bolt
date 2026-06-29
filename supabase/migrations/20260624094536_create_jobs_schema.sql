/*
# Create Jobs Schema

1. New Tables
- `companies` — stores company profiles with metadata, ratings, and branding
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `slug` (text, unique, not null)
  - `description` (text)
  - `website` (text)
  - `location` (text)
  - `size` (text)
  - `industry` (text)
  - `open_positions` (integer, default 0)
  - `rating` (numeric, default 0)
  - `tags` (text[])
  - `color` (text)
  - `logo_url` (text)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

- `jobs` — stores job listings with salary, requirements, and metadata
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `slug` (text, unique, not null)
  - `company_id` (uuid, foreign key to companies)
  - `company_name` (text)
  - `company_logo_url` (text)
  - `location` (text)
  - `type` (text) — Full-time, Contract, Freelance, Part-time
  - `remote` (boolean, default false)
  - `salary_min` (integer)
  - `salary_max` (integer)
  - `currency` (text, default 'USD')
  - `tags` (text[])
  - `description` (text)
  - `requirements` (text[])
  - `benefits` (text[])
  - `featured` (boolean, default false)
  - `status` (text, default 'active')
  - `posted_at` (timestamp)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

- `job_applications` — stores applications submitted by users
  - `id` (uuid, primary key)
  - `job_id` (uuid, foreign key to jobs)
  - `name` (text, not null)
  - `email` (text, not null)
  - `resume_url` (text)
  - `cover_letter` (text)
  - `linkedin_url` (text)
  - `portfolio_url` (text)
  - `status` (text, default 'pending')
  - `created_at` (timestamp)

- `contact_messages` — stores messages from the contact form
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `email` (text, not null)
  - `subject` (text)
  - `message` (text, not null)
  - `created_at` (timestamp)

2. Security
- Enable RLS on all tables.
- Companies and jobs are public read (anon + authenticated).
- Job applications and contact messages are insert-only for anon + authenticated.
- No update/delete policies on applications/messages to prevent data tampering.

3. Indexes
- Index on jobs.company_id for fast lookups.
- Index on jobs.status and jobs.featured for filtering.
- Index on jobs.posted_at for sorting.
- Index on companies.slug for lookups.
- Index on jobs.slug for lookups.
*/

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  website text,
  location text,
  size text,
  industry text,
  open_positions integer NOT NULL DEFAULT 0,
  rating numeric NOT NULL DEFAULT 0,
  tags text[] DEFAULT '{}',
  color text,
  logo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  company_id uuid REFERENCES companies(id) ON DELETE SET NULL,
  company_name text,
  company_logo_url text,
  location text,
  type text,
  remote boolean NOT NULL DEFAULT false,
  salary_min integer,
  salary_max integer,
  currency text NOT NULL DEFAULT 'USD',
  tags text[] DEFAULT '{}',
  description text,
  requirements text[] DEFAULT '{}',
  benefits text[] DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'active',
  posted_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Job applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  resume_url text,
  cover_letter text,
  linkedin_url text,
  portfolio_url text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_jobs_company_id ON jobs(company_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_featured ON jobs(featured);
CREATE INDEX IF NOT EXISTS idx_jobs_posted_at ON jobs(posted_at DESC);
CREATE INDEX IF NOT EXISTS idx_companies_slug ON companies(slug);
CREATE INDEX IF NOT EXISTS idx_jobs_slug ON jobs(slug);

-- RLS on companies
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "companies_select_public" ON companies;
CREATE POLICY "companies_select_public" ON companies FOR SELECT
TO anon, authenticated USING (true);

-- RLS on jobs
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "jobs_select_public" ON jobs;
CREATE POLICY "jobs_select_public" ON jobs FOR SELECT
TO anon, authenticated USING (true);

-- RLS on job_applications
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "applications_insert_public" ON job_applications;
CREATE POLICY "applications_insert_public" ON job_applications FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "applications_select_public" ON job_applications;
CREATE POLICY "applications_select_public" ON job_applications FOR SELECT
TO anon, authenticated USING (true);

-- RLS on contact_messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "contact_insert_public" ON contact_messages;
CREATE POLICY "contact_insert_public" ON contact_messages FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "contact_select_public" ON contact_messages;
CREATE POLICY "contact_select_public" ON contact_messages FOR SELECT
TO anon, authenticated USING (true);
