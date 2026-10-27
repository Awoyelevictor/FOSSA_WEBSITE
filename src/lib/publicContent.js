export async function getPublishedContent(type) {
  const response = await fetch(`/api/public/content?type=${encodeURIComponent(type)}`);
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || 'Could not load published content.');
  return Array.isArray(result.items) ? result.items : [];
}
