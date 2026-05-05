# 아루나의 라이프 위키 (life-wiki)

매일의 회고에서 길어 올린 글들을 모은 개인 PKM + 블로그 저장소.

## 구조

```
life-wiki/
├── CLAUDE.md                 ← v5 지침 (회고·블로그 작성 규칙)
├── 01_비전과연간목표.md       ← 비전과 연간 목표 (분기에 한 번 갱신)
├── 10_프로젝트_*.md           ← 프로젝트별 가설 문서 (5~7개)
│
├── journal/                   ← 비공개. 사이트에 안 올라감
│   ├── 20_일간_YYYY-MM-DD.md  (최근 7일만 유지, 그 이상은 archive로)
│   ├── 30_주간_YYYY-Wnn.md
│   └── 40_월간_YYYY-MM.md
│
├── archive/                   ← 비공개. 8일차 이상 일간 기록 보관
│
├── src/                       ← Astro 사이트 코드
│   ├── content/blog/          ← 공개 블로그 글. 50_블로그_*.md를 여기에 작성
│   ├── pages/                 ← 페이지 라우팅
│   ├── layouts/               ← 페이지 레이아웃
│   └── content/config.ts      ← 블로그 프론트매터 스키마
│
├── public/                    ← 정적 파일 (favicon 등)
├── package.json
├── astro.config.mjs
└── tsconfig.json
```

## 공개 / 비공개 구분

| 위치 | 깃 추적 | 사이트 노출 |
|---|---|---|
| `journal/`, `archive/` | ✅ (private 레포) | ❌ |
| `01_*.md`, `10_프로젝트_*.md` | ✅ (private 레포) | ❌ |
| `src/content/blog/*.md` (status: 공개) | ✅ | ✅ |
| `src/content/blog/*.md` (status: 초안) | ✅ | ❌ (사이트 빌드에서 제외됨) |

→ **GitHub 저장소는 private으로** 둠. 사이트(Vercel)는 빌드 결과물만 공개됨.

## 블로그 글 작성

`src/content/blog/{slug}.md` 형식으로 저장. 필수 프론트매터:

```yaml
---
title: 글 제목
date: 2026-05-04
projects: [자립]
themes: [환경실천, 미니멀리즘]
status: 초안          # 초안 | 공개 | 책_챕터_후보
description: 한 줄 설명 (선택)
---
```

`status: 초안`은 사이트에 노출 안 됨. `공개` 또는 `책_챕터_후보`로 바꾸면 사이트에 자동 빌드.

## 로컬에서 실행

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ 에 정적 사이트 생성
npm run preview  # 빌드 결과 미리보기
```

## 배포

- GitHub: 이 저장소는 **private**으로 둠 (일간 회고 보호)
- Vercel: GitHub 연결 후 자동 빌드·배포. private 저장소도 무료 plan에서 동작.
- main 브랜치에 push하면 자동으로 사이트 갱신.

## v5 지침

회고와 블로그 글 작성 규칙은 `CLAUDE.md` 참조.
