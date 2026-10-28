insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'fossa-academic-files',
  'fossa-academic-files',
  true,
  20971520,
  array[
    'application/pdf',
    'image/jpeg', 'image/png', 'image/webp', 'image/gif',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
