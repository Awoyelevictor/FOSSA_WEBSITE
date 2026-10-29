-- This function is only intended to run from the auth.users INSERT trigger.
-- Prevent direct PostgREST RPC invocation by public/anonymous/authenticated clients.
revoke execute on function public.fossa_bootstrap_auth_user() from public, anon, authenticated;
