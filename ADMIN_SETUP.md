# FOSSA secure admin setup

The admin console uses Supabase Auth and a server-side API. The service-role key must never be exposed to the browser or committed.

## 1. Configure Supabase

1. Create or select a Supabase project.
2. Run `supabase/migrations/202610270001_secure_admin.sql` in the Supabase SQL Editor.
3. In **Authentication → Users**, create the first trusted administrator with a strong unique password.
4. Copy that user's UUID. Replace `YOUR-AUTH-USER-UUID` in the commented bootstrap INSERT at the end of the migration and run it to assign `super_admin`.
5. Configure Auth email templates and allowed redirect URLs for the production domain and any preview domains.

## 2. Configure deployment environment variables

In Vercel → Project Settings → Environment Variables, set these for the required environments and redeploy:

- `VITE_SUPABASE_URL`: project URL (browser-visible)
- `VITE_SUPABASE_ANON_KEY`: publishable/anon key (browser-visible)
- `SUPABASE_URL`: project URL (server-side)
- `SUPABASE_SERVICE_ROLE_KEY`: service-role key (secret; server-only)

For local development, put the values in a local `.env` file. It is excluded from Git. Never use a `VITE_` prefix on the service-role key.

## 3. Roles

- `student`: no admin API access
- `editor`: can manage content sections
- `admin`: can manage content, users and audit logs
- `super_admin`: can additionally grant administrator roles and delete accounts

The first super administrator must be bootstrapped directly in the database. There is no default admin password.

## 4. Verification checklist

- Sign in with the account assigned `admin` or `super_admin`.
- Confirm a student account receives HTTP 403 from `/api/admin/content/announcements`.
- Create, edit, publish/unpublish and delete a draft; verify rows in `fossa_content_items` and `fossa_admin_audit_logs`.
- Test invitations and role changes using test accounts before production use.
- Confirm the service-role key exists only as a server-side environment variable.

## Integration note

This PR adds database-backed management and a protected API. Existing public pages still contain legacy localStorage/static content readers, so publishing records in this console does not yet automatically replace the content currently displayed by those pages. Public-page data migration and backfill should be completed before treating this admin database as the sole source of public website content.
