-- Fix: contact_messages INSERT policy — was WITH CHECK (true), unrestricted for anon + authenticated
-- Replace with a meaningful check that requires the mandatory fields to be non-empty.
DROP POLICY IF EXISTS "contact_insert_public" ON public.contact_messages;

CREATE POLICY "contact_insert_public" ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name  IS NOT NULL AND char_length(trim(name))  > 0 AND
    email IS NOT NULL AND char_length(trim(email)) > 0 AND
    email LIKE '%@%'                                    AND
    message IS NOT NULL AND char_length(trim(message)) > 0
  );

-- Fix: job_applications INSERT policy — was WITH CHECK (true), unrestricted for anon + authenticated
-- job_applications must only be submitted by authenticated users, and required fields must be present.
DROP POLICY IF EXISTS "applications_insert_public" ON public.job_applications;

CREATE POLICY "applications_insert_own" ON public.job_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (
    job_id IS NOT NULL AND
    name   IS NOT NULL AND char_length(trim(name))  > 0 AND
    email  IS NOT NULL AND char_length(trim(email)) > 0 AND
    email  LIKE '%@%'
  );
