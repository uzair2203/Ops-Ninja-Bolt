/*
# Seed Jobs Data

1. Inserts sample companies into the `companies` table.
2. Inserts sample jobs into the `jobs` table.
3. Data represents realistic Cloud & DevOps job listings from top tech companies.

This is seed data for demonstration purposes. In production, companies would create
listings via an employer dashboard.
*/

-- Insert companies
INSERT INTO companies (id, name, slug, description, website, location, size, industry, open_positions, rating, tags, color, logo_url)
VALUES
  (gen_random_uuid(), 'Vercel', 'vercel', 'The platform for frontend developers. Build, scale, and secure a faster, personalized web.', 'vercel.com', 'San Francisco, CA', '201-500', 'Cloud Infrastructure', 12, 4.8, ARRAY['Next.js', 'Serverless', 'Edge'], 'from-slate-700 to-slate-900', 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&h=100&fit=crop'),
  (gen_random_uuid(), 'Stripe', 'stripe', 'Financial infrastructure platform for the internet. Payments, billing, and more for ambitious companies.', 'stripe.com', 'San Francisco, CA', '1000-5000', 'Fintech', 28, 4.9, ARRAY['Payments', 'API', 'Infrastructure'], 'from-purple-900 to-indigo-900', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=100&fit=crop'),
  (gen_random_uuid(), 'Linear', 'linear', 'The issue tracking tool you will enjoy using. Streamline software projects, sprints, and tasks.', 'linear.app', 'Remote', '51-200', 'Developer Tools', 6, 4.7, ARRAY['TypeScript', 'React', 'GraphQL'], 'from-blue-900 to-cyan-900', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop'),
  (gen_random_uuid(), 'Supabase', 'supabase', 'Open source Firebase alternative. Build in a weekend, scale to millions.', 'supabase.com', 'Singapore / Remote', '51-200', 'Database', 9, 4.6, ARRAY['PostgreSQL', 'Realtime', 'Auth'], 'from-emerald-900 to-teal-900', 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=100&h=100&fit=crop'),
  (gen_random_uuid(), 'Railway', 'railway', 'Infrastructure platform for modern development. Deploy anything, anywhere, instantly.', 'railway.app', 'Remote', '11-50', 'Cloud Platform', 4, 4.5, ARRAY['Kubernetes', 'Docker', 'Platform'], 'from-violet-900 to-purple-900', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop'),
  (gen_random_uuid(), 'Docker', 'docker', 'Empowering developers and development teams to build, share, and run applications anywhere.', 'docker.com', 'Palo Alto, CA', '501-1000', 'Containerization', 15, 4.4, ARRAY['Containers', 'DevOps', 'Open Source'], 'from-blue-800 to-blue-950', 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=100&h=100&fit=crop')
ON CONFLICT (slug) DO NOTHING;

-- Insert jobs
INSERT INTO jobs (id, title, slug, company_id, company_name, company_logo_url, location, type, remote, salary_min, salary_max, currency, tags, description, requirements, benefits, featured, posted_at)
SELECT
  gen_random_uuid(),
  'Senior DevOps Engineer',
  'senior-devops-engineer-vercel',
  c.id,
  c.name,
  c.logo_url,
  'San Francisco, CA',
  'Full-time',
  true,
  180000,
  250000,
  'USD',
  ARRAY['Kubernetes', 'Terraform', 'AWS', 'CI/CD'],
  'We are looking for a Senior DevOps Engineer to help us build and maintain the infrastructure that powers millions of deployments. You will work on our edge network, CI/CD pipelines, and internal tooling.',
  ARRAY['5+ years of experience in DevOps or SRE roles', 'Deep expertise with Kubernetes and container orchestration', 'Strong Terraform and infrastructure-as-code skills', 'Experience with AWS, GCP, or Azure at scale', 'Proficiency in Go, Rust, or TypeScript'],
  ARRAY['Competitive salary and equity', 'Unlimited PTO', 'Remote-first culture', 'Health, dental, and vision coverage', 'Annual learning stipend'],
  true,
  now() - interval '1 day'
FROM companies c WHERE c.slug = 'vercel'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO jobs (id, title, slug, company_id, company_name, company_logo_url, location, type, remote, salary_min, salary_max, currency, tags, description, requirements, benefits, featured, posted_at)
SELECT
  gen_random_uuid(),
  'Platform Engineer',
  'platform-engineer-stripe',
  c.id,
  c.name,
  c.logo_url,
  'San Francisco, CA',
  'Full-time',
  true,
  200000,
  300000,
  'USD',
  ARRAY['Platform', 'SRE', 'Go', 'Distributed Systems'],
  'Join Stripe Platform Engineering team to build the internal developer platform that thousands of engineers use daily. You will design abstractions, build tooling, and improve developer experience at scale.',
  ARRAY['4+ years building platform or infrastructure teams', 'Strong systems design and architecture skills', 'Experience with Go, Java, or similar languages', 'Deep understanding of distributed systems', 'Track record of improving developer productivity'],
  ARRAY['Top-tier compensation package', 'Comprehensive health benefits', '401(k) matching', 'Parental leave', 'Professional development budget'],
  true,
  now() - interval '2 days'
FROM companies c WHERE c.slug = 'stripe'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO jobs (id, title, slug, company_id, company_name, company_logo_url, location, type, remote, salary_min, salary_max, currency, tags, description, requirements, benefits, posted_at)
SELECT
  gen_random_uuid(),
  'Site Reliability Engineer',
  'sre-linear',
  c.id,
  c.name,
  c.logo_url,
  'Remote',
  'Full-time',
  true,
  160000,
  220000,
  'USD',
  ARRAY['SRE', 'Observability', 'PostgreSQL', 'Rust'],
  'Help us keep Linear fast and reliable as we scale. You will own our observability stack, incident response, and reliability engineering practices.',
  ARRAY['3+ years in SRE or similar role', 'Experience with observability tools (Datadog, Grafana, etc.)', 'Strong PostgreSQL knowledge', 'Programming skills in Rust, Go, or TypeScript', 'Experience with on-call rotations'],
  ARRAY['Fully remote with async culture', 'Competitive salary', 'Equity package', 'Health and wellness stipend', 'Home office setup budget'],
  now() - interval '3 days'
FROM companies c WHERE c.slug = 'linear'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO jobs (id, title, slug, company_id, company_name, company_logo_url, location, type, remote, salary_min, salary_max, currency, tags, description, requirements, benefits, posted_at)
SELECT
  gen_random_uuid(),
  'Cloud Infrastructure Engineer',
  'cloud-infrastructure-engineer-supabase',
  c.id,
  c.name,
  c.logo_url,
  'Singapore / Remote',
  'Full-time',
  true,
  140000,
  200000,
  'USD',
  ARRAY['AWS', 'PostgreSQL', 'Go', 'Infrastructure'],
  'Build the infrastructure that powers Supabase managed PostgreSQL offering. Work on multi-tenant database isolation, backup systems, and auto-scaling.',
  ARRAY['Experience with managed database services', 'Strong Go programming skills', 'AWS or GCP expertise', 'Understanding of PostgreSQL internals', 'Experience with infrastructure automation'],
  ARRAY['Remote-first with global team', 'Open source work', 'Competitive compensation', 'Flexible hours', 'Conference attendance budget'],
  now() - interval '4 days'
FROM companies c WHERE c.slug = 'supabase'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO jobs (id, title, slug, company_id, company_name, company_logo_url, location, type, remote, salary_min, salary_max, currency, tags, description, requirements, benefits, posted_at)
SELECT
  gen_random_uuid(),
  'Kubernetes Platform Lead',
  'kubernetes-platform-lead-railway',
  c.id,
  c.name,
  c.logo_url,
  'Remote',
  'Full-time',
  true,
  170000,
  240000,
  'USD',
  ARRAY['Kubernetes', 'Platform', 'Rust', 'Cloud Native'],
  'Lead Railway Kubernetes platform team. Design and build the next generation of our container orchestration layer serving thousands of developers.',
  ARRAY['Deep Kubernetes expertise (CKA/CKAD preferred)', 'Experience building platform products', 'Rust or Go programming', 'Understanding of cloud-native ecosystem', 'Leadership experience'],
  ARRAY['Early-stage equity', 'Competitive salary', 'Remote work', 'Health insurance', 'Learning and development budget'],
  now() - interval '5 days'
FROM companies c WHERE c.slug = 'railway'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO jobs (id, title, slug, company_id, company_name, company_logo_url, location, type, remote, salary_min, salary_max, currency, tags, description, requirements, benefits, posted_at)
SELECT
  gen_random_uuid(),
  'Senior SRE - Container Runtime',
  'senior-sre-container-runtime-docker',
  c.id,
  c.name,
  c.logo_url,
  'Palo Alto, CA',
  'Full-time',
  false,
  190000,
  260000,
  'USD',
  ARRAY['Docker', 'Containers', 'Linux', 'Go'],
  'Work on the core container runtime that powers millions of applications worldwide. Improve performance, security, and reliability of container execution.',
  ARRAY['Deep Linux internals knowledge', 'Experience with container runtimes', 'Strong Go programming', 'Understanding of kernel namespaces and cgroups', 'Security-focused mindset'],
  ARRAY['Industry-leading compensation', 'Comprehensive benefits', 'Open source contributions', 'Conference budget', 'Relocation assistance'],
  now() - interval '6 days'
FROM companies c WHERE c.slug = 'docker'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO jobs (id, title, slug, company_id, company_name, company_logo_url, location, type, remote, salary_min, salary_max, currency, tags, description, requirements, benefits, posted_at)
SELECT
  gen_random_uuid(),
  'AWS Solutions Architect',
  'aws-solutions-architect-vercel',
  c.id,
  c.name,
  c.logo_url,
  'Remote',
  'Contract',
  true,
  120,
  180,
  'USD',
  ARRAY['AWS', 'Architecture', 'Serverless', 'Edge'],
  'Design and implement AWS-based architectures for enterprise customers migrating to the Vercel platform.',
  ARRAY['AWS Solutions Architect Professional certification', 'Experience with serverless architectures', 'Strong communication skills', 'Enterprise customer experience'],
  ARRAY['Contract rate with flexibility', 'Remote work', 'Professional development'],
  now() - interval '7 days'
FROM companies c WHERE c.slug = 'vercel'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO jobs (id, title, slug, company_id, company_name, company_logo_url, location, type, remote, salary_min, salary_max, currency, tags, description, requirements, benefits, posted_at)
SELECT
  gen_random_uuid(),
  'Cybersecurity Engineer',
  'cybersecurity-engineer-stripe',
  c.id,
  c.name,
  c.logo_url,
  'San Francisco, CA',
  'Full-time',
  true,
  220000,
  320000,
  'USD',
  ARRAY['Security', 'Compliance', 'Threat Detection', 'SIEM'],
  'Protect Stripe infrastructure and customers from evolving security threats. Build detection systems, respond to incidents, and improve security posture.',
  ARRAY['Experience with threat detection and response', 'SIEM and SOAR platform expertise', 'Cloud security (AWS/GCP)', 'Programming in Python or Go', 'Security certifications (CISSP, GCIH, etc.)'],
  ARRAY['Top compensation in industry', 'Comprehensive security training', 'Cutting-edge tools and resources', 'Global security team collaboration'],
  now() - interval '8 days'
FROM companies c WHERE c.slug = 'stripe'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO jobs (id, title, slug, company_id, company_name, company_logo_url, location, type, remote, salary_min, salary_max, currency, tags, description, requirements, benefits, posted_at)
SELECT
  gen_random_uuid(),
  'AI Infrastructure Engineer',
  'ai-infrastructure-engineer-linear',
  c.id,
  c.name,
  c.logo_url,
  'Remote',
  'Full-time',
  true,
  200000,
  280000,
  'USD',
  ARRAY['AI/ML', 'GPU', 'PyTorch', 'Kubernetes'],
  'Build the infrastructure for training and serving AI models. Work on GPU clusters, model serving, and ML pipelines.',
  ARRAY['Experience with ML infrastructure', 'GPU cluster management (NVIDIA, AMD)', 'Kubernetes and container orchestration', 'PyTorch or TensorFlow experience', 'Distributed systems knowledge'],
  ARRAY['Work on cutting-edge AI', 'Competitive salary and equity', 'Remote-first culture', 'Research collaboration opportunities'],
  now() - interval '9 days'
FROM companies c WHERE c.slug = 'linear'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO jobs (id, title, slug, company_id, company_name, company_logo_url, location, type, remote, salary_min, salary_max, currency, tags, description, requirements, benefits, posted_at)
SELECT
  gen_random_uuid(),
  'Azure DevOps Specialist',
  'azure-devops-specialist-supabase',
  c.id,
  c.name,
  c.logo_url,
  'Remote',
  'Freelance',
  true,
  100,
  150,
  'USD',
  ARRAY['Azure', 'DevOps', 'ARM', 'PowerShell'],
  'Help enterprise customers deploy Supabase on Azure. Design ARM templates, Azure DevOps pipelines, and Azure-native integrations.',
  ARRAY['Azure Expert certification', 'ARM/Bicep template expertise', 'Azure DevOps pipeline experience', 'PowerShell and CLI proficiency'],
  ARRAY['Flexible freelance arrangement', 'Remote work', 'Hourly rate with consistent hours'],
  now() - interval '10 days'
FROM companies c WHERE c.slug = 'supabase'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO jobs (id, title, slug, company_id, company_name, company_logo_url, location, type, remote, salary_min, salary_max, currency, tags, description, requirements, benefits, posted_at)
SELECT
  gen_random_uuid(),
  'GCP Cloud Engineer',
  'gcp-cloud-engineer-railway',
  c.id,
  c.name,
  c.logo_url,
  'Remote',
  'Full-time',
  true,
  150000,
  210000,
  'USD',
  ARRAY['GCP', 'Cloud Run', 'GKE', 'Terraform'],
  'Expand Railway GCP support. Build integrations with Cloud Run, GKE, and GCP-native services.',
  ARRAY['Professional Cloud Architect certification', 'GKE and Cloud Run experience', 'Terraform and infrastructure-as-code', 'Go or Python programming'],
  ARRAY['Equity in fast-growing startup', 'Competitive salary', 'Remote-first team', 'GCP certification support'],
  now() - interval '11 days'
FROM companies c WHERE c.slug = 'railway'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO jobs (id, title, slug, company_id, company_name, company_logo_url, location, type, remote, salary_min, salary_max, currency, tags, description, requirements, benefits, posted_at)
SELECT
  gen_random_uuid(),
  'Infrastructure Security Engineer',
  'infrastructure-security-engineer-docker',
  c.id,
  c.name,
  c.logo_url,
  'Palo Alto, CA',
  'Full-time',
  false,
  180000,
  250000,
  'USD',
  ARRAY['Security', 'Infrastructure', 'Compliance', 'Docker'],
  'Secure Docker infrastructure and supply chain. Implement zero-trust architecture, secure build pipelines, and vulnerability management.',
  ARRAY['Infrastructure security expertise', 'Container security (Docker, Kubernetes)', 'Supply chain security knowledge', 'Compliance experience (SOC2, ISO27001)', 'Programming in Go or Python'],
  ARRAY['Lead security initiatives', 'Competitive package', 'Conference and training budget', 'Relocation support'],
  now() - interval '12 days'
FROM companies c WHERE c.slug = 'docker'
ON CONFLICT (slug) DO NOTHING;
