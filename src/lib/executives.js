import { getPublishedContent } from './publicContent';

export async function getPublishedExecutives() {
  const items = await getPublishedContent('site-content');
  return items
    .filter(item => /executive/i.test(String(item.category || '')))
    .map(item => {
      const category = String(item.category || '').trim();
      const title = category
        .replace(/^fossa\s+/i, '')
        .replace(/^executives?\s*[:—–-]?\s*/i, '')
        .trim();
      return {
        ...item,
        name: item.title || 'FOSSA Executive',
        position: title || 'FOSSA Executive',
        avatar: item.image || '/logo.png',
        bio: item.description || '',
        profileUrl: item.url || ''
      };
    });
}
