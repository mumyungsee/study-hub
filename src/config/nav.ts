export const SITE_TITLE = '나만의 라이프 위키';

export const NAV_SECTIONS = [
  { label: '튜토리얼', href: '/tutorial/', key: 'tutorial' },
  { label: '글', href: '/blog/', key: 'blog' },
  { label: '갤러리', href: '/gallery/', key: 'gallery' },
] as const;

export type SectionKey = (typeof NAV_SECTIONS)[number]['key'];

export function getSectionKey(pathname: string): SectionKey | null {
  if (pathname.startsWith('/tutorial') || pathname.startsWith('/onboarding') || pathname.startsWith('/setup')) return 'tutorial';
  if (pathname.startsWith('/blog')) return 'blog';
  if (pathname.startsWith('/gallery')) return 'gallery';
  return null;
}
