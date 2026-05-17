export const SITE_TITLE = 'AI 스터디 허브';

export const NAV_SECTIONS = [
  { label: '온보딩', href: '/onboarding/glossary/', key: 'onboarding' },
  { label: '환경 세팅', href: '/setup/antigravity/', key: 'setup' },
  { label: '튜토리얼', href: '/tutorial/', key: 'tutorial' },
  { label: '수강생 사례', href: '/gallery/', key: 'gallery' },
] as const;

export type SectionKey = (typeof NAV_SECTIONS)[number]['key'];

// 사이드바 표시 여부 — 학습 페이지 (온보딩/세팅/튜토리얼) 에서만 표시
export function hasSidebar(pathname: string): boolean {
  return (
    pathname.startsWith('/onboarding') ||
    pathname.startsWith('/setup') ||
    pathname.startsWith('/tutorial')
  );
}

// 글로벌 네비 활성 표시용 — 어떤 메뉴에 강조 줄지
export function getSectionKey(pathname: string): SectionKey | null {
  if (pathname.startsWith('/onboarding')) return 'onboarding';
  if (pathname.startsWith('/setup')) return 'setup';
  if (pathname.startsWith('/tutorial')) return 'tutorial';
  if (pathname.startsWith('/gallery')) return 'gallery';
  return null;
}
