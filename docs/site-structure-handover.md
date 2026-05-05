# 인수인계: 라이프 위키 사이트 구조 확장

> 작성일: 2026-05-05
> 대상: 다음 세션의 Codex / Claude / Antigravity 에이전트
> 목적: 라이프 위키 튜토리얼 공개를 위해 사이트 구조를 안전하게 개편하는 작업을 이어받는다.

---

## 0. 한 줄 요약

사용자는 라이프 위키 사이트를 단순 블로그 목록에서 `홈 / 글 / 튜토리얼` 구조로 먼저 정리하고, 장기적으로는 VS Code 또는 Antigravity 같은 확장형 레이아웃으로 키우고 싶어 한다.

이번 작업에서는 전체 리디자인을 하지 말고, 튜토리얼을 공개할 수 있는 콘텐츠 구조와 라우팅을 먼저 만든다.

---

## 1. 현재 저장소 상태

작업 위치:

```txt
C:\Users\user\aluna\90_archive\life wiki
```

사이트:

```txt
https://life-wiki-nu.vercel.app
```

원격 저장소:

```txt
https://github.com/mumyungsee/life-wiki.git
```

현재 주요 구조:

```txt
src/
  content/
    config.ts
    blog/
      hyuji-eopneun-hwajangsil.md
      opensource-repo-nae-geot-mandeulgi.md

  layouts/
    Base.astro
    BlogPost.astro

  pages/
    index.astro
    blog/
      [slug].astro
```

현재 사이트 동작:

1. `/`가 공개 블로그 글 목록 역할을 한다.
2. `/blog/[slug]/`가 블로그 상세 페이지다.
3. 상단 메뉴는 현재 `홈`만 있다.
4. 블로그 글은 `src/content/blog/`에 있다.
5. `status: 공개` 또는 `status: 책_챕터_후보`인 글만 노출된다.

---

## 2. 최근 완료된 작업

2026-05-05에 아래 작업이 완료되었다.

1. 오늘 일간 회고 작성
   - `journal/20_일간_2026-05-05.md`

2. 새 블로그 글 작성 및 공개
   - `src/content/blog/opensource-repo-nae-geot-mandeulgi.md`
   - 제목: `처음부터 만들지 않아도 내 것이 된다`
   - `status: 공개`

3. 글 가독성을 위해 소제목 추가
   - 커밋: `f777a4b content: 오픈소스 레포 글 소제목 추가`

4. `npm.cmd install` 실행
   - `package-lock.json` 생성됨
   - `src/env.d.ts` 생성됨

5. 빌드 확인
   - `npm.cmd run build` 통과
   - 생성 라우트:
     - `/blog/hyuji-eopneun-hwajangsil/`
     - `/blog/opensource-repo-nae-geot-mandeulgi/`
     - `/`

---

## 3. 사용자의 의사결정

사용자는 추후 사이트를 다음처럼 확장하고 싶어 한다.

1. 블로그
2. 라이프 위키 튜토리얼
3. 강의
4. 직접 만든 AI 앱
5. 도구 또는 스토어형 페이지

사용자가 선호하는 장기 레이아웃:

1. VS Code
2. Antigravity
3. 좌측 슬림바
4. 양쪽 패널
5. 하단 패널
6. 확장 프로그램 또는 스토어 같은 섹션

하지만 이번 세션에서 결정한 현실적인 방향:

1. 지금 당장 전체 App Shell을 만들지 않는다.
2. 오늘은 `홈 / 글 / 튜토리얼` 정보구조만 만든다.
3. VS Code식 레이아웃은 나중에 별도 리디자인 작업으로 분리한다.

이유:

1. 현재 목표는 튜토리얼을 장별로 작성하고 공개하는 것이다.
2. 전체 레이아웃 개편은 작업량이 크다.
3. 글 읽기 중심 사이트에서 UI 껍데기가 먼저 커지면 콘텐츠 작성 흐름이 느려질 수 있다.
4. 작은 단위로 개편하면 빌드와 배포 안정성을 유지하기 쉽다.

---

## 4. 다음 세션에서 바로 할 일

우선 아래 순서로 작업한다.

### 1단계. `tutorial` 컬렉션 추가

파일:

```txt
src/content/config.ts
```

해야 할 일:

1. 기존 `blog` 컬렉션 유지
2. 새 `tutorial` 컬렉션 추가
3. frontmatter 필드:
   - `title: string`
   - `chapter: number`
   - `order: number`
   - `description?: string`
   - `status: 초안 | 공개`

### 2단계. `/blog/` 목록 페이지 만들기

새 파일:

```txt
src/pages/blog/index.astro
```

기준:

1. 현재 `src/pages/index.astro`의 공개 글 목록 로직을 옮긴다.
2. 제목은 `기록과 발견`으로 유지한다.
3. 공개 글만 노출한다.

### 3단계. 홈을 소개 페이지로 바꾸기

파일:

```txt
src/pages/index.astro
```

홈에는 아래 입구를 둔다.

1. 글
2. 튜토리얼
3. 강의, AI 앱, 도구는 나중 확장 영역으로만 표시하거나 생략

### 4단계. `/tutorial/` 목록 페이지 만들기

새 파일:

```txt
src/pages/tutorial/index.astro
```

동작:

1. `tutorial` 컬렉션에서 `status: 공개`만 가져온다.
2. `chapter`, `order` 순으로 정렬한다.
3. 장별 목록을 보여준다.

### 5단계. `/tutorial/[slug]/` 상세 페이지 만들기

새 파일:

```txt
src/pages/tutorial/[slug].astro
src/layouts/TutorialPost.astro
```

동작:

1. 튜토리얼 Markdown을 렌더링한다.
2. 하단에 `/tutorial/`로 돌아가는 링크를 둔다.
3. 다음/이전 장 링크는 이번 단계에서 생략해도 된다.

### 6단계. 상단 메뉴 정리

파일:

```txt
src/layouts/Base.astro
```

메뉴:

```txt
홈 · 글 · 튜토리얼
```

---

## 5. 첫 튜토리얼 파일 작성

최소 하나의 공개 튜토리얼 파일을 만든다.

추천 파일:

```txt
src/content/tutorial/00-preview.md
```

frontmatter:

```yaml
---
title: "0장. 완성물 미리보기"
chapter: 0
order: 0
description: "이 튜토리얼을 끝내면 어떤 라이프 위키가 만들어지는지 살펴봅니다."
status: 공개
---
```

본문은 아직 길게 쓰지 않아도 된다. 라우팅과 공개 구조 검증용으로 1차 초안만 있어도 된다.

---

## 6. 참고해야 할 Plan 문서

상세 구현 계획:

```txt
docs/01-plan/site-structure-expansion-plan.md
```

튜토리얼 목차 원본:

```txt
docs/01-plan/workshop-tutorial-plan.md
```

`workshop-tutorial-plan.md`의 목차를 기준으로 `src/content/tutorial/`에 장별 문서를 작성한다.

---

## 7. 빌드와 배포 방법

로컬 빌드:

```bash
npm.cmd run build
```

PowerShell에서 `npm`이 실행 정책 때문에 막힐 수 있으므로 Windows에서는 `npm.cmd`를 사용한다.

배포:

```bash
git add .
git commit -m "site: 홈 글 튜토리얼 구조 추가"
git push origin main
```

Vercel이 GitHub push를 감지해 자동 배포한다.

사이트 확인:

```txt
https://life-wiki-nu.vercel.app
```

---

## 8. 주의사항

1. `journal/`과 `archive/`는 비공개 원본 기록이다. 사이트 라우팅에 포함하지 않는다.
2. `src/content/blog/`와 `src/content/tutorial/`만 공개 콘텐츠로 취급한다.
3. `status: 초안`인 콘텐츠는 사이트에 노출하지 않는다.
4. 큰 UI 리디자인을 이번 작업에 섞지 않는다.
5. CSS는 기존 `Base.astro`의 전역 스타일을 최대한 유지한다.
6. 각 단계마다 빌드 후 커밋한다.
7. 인코딩 문제 때문에 터미널 출력의 한글이 깨져 보여도 파일 자체는 UTF-8로 작성되어 있다.

---

## 9. 다음 단계 이후의 장기 작업

튜토리얼 공개 구조가 안정되면 별도 Plan으로 아래를 설계한다.

1. VS Code/Antigravity식 App Shell
2. 좌측 ActivityBar
3. 섹션별 Sidebar
4. 하단 Panel
5. 강의 페이지
6. AI 앱 갤러리
7. 도구/템플릿 스토어

이 작업은 `site app shell redesign` 같은 별도 Plan으로 분리하는 것이 좋다.
