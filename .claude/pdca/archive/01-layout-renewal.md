# [완료] 레이아웃 리뉴얼 — auto-llm-wiki

완료일: 2026-05-13

## 작업 내용

- Header.astro, Sidebar.astro, TOC.astro 신규 생성
- Base.astro 3컬럼 레이아웃 적용
- src/config/nav.ts 신규 생성 (섹션 관리 단일 출처)
- 모바일 햄버거 메뉴 + overlay 사이드바
- 사이드바 섹션별 분리 (튜토리얼 / 블로그 / 갤러리)
- 튜토리얼 사이드바: 온보딩 / 환경 세팅 / 필수 / 심화 / 부록 그룹
- /onboarding/ 페이지 3개 placeholder 생성

## 결과

- 빌드 성공 (26페이지)
- 사이드바 토글은 flickering 문제로 제거, 항상 표시 방식으로 확정
