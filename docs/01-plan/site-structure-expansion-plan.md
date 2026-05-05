# Plan: 라이프 위키 사이트 구조 확장

> 작성일: 2026-05-05
> 목적: 라이프 위키 사이트를 블로그 단일 목록에서 튜토리얼, 강의, AI 앱, 도구까지 확장 가능한 구조로 정리한다.
> 우선순위: 오늘은 작은 정보구조 개편만 진행하고, VS Code/Antigravity식 전체 App Shell은 별도 단계로 미룬다.

---

## 0. 현재 판단

사용자는 추후 라이프 위키 사이트에 여러 종류의 콘텐츠와 도구를 추가하고 싶어 한다.

예상 확장 범위:

1. 회고에서 발전한 블로그 글
2. 라이프 위키 튜토리얼
3. 강의 자료
4. 직접 만든 AI 앱
5. 도구, 템플릿, 작은 스토어형 페이지
6. 프로젝트별 기록과 발견

장기적으로는 VS Code 또는 Antigravity처럼 다음 구조가 어울린다.

1. 좌측 슬림 액티비티바
2. 선택한 섹션의 사이드바
3. 메인 콘텐츠 영역
4. 하단 패널 또는 로그 영역

다만 지금 바로 전체 레이아웃을 바꾸면 작업 범위가 커진다. 현재 목표는 튜토리얼 작성과 공개 흐름을 만드는 것이므로, 오늘은 확장 가능한 라우팅과 콘텐츠 구조만 먼저 잡는다.

---

## 1. 이번 단계의 목표

이번 단계에서는 사이트를 아래처럼 정리한다.

```txt
/
  홈: 라이프 위키 소개와 주요 섹션 입구

/blog/
  공개 글 목록
  현재 홈에 있는 "기록과 발견" 목록을 여기로 이동

/blog/[slug]/
  블로그 글 상세

/tutorial/
  라이프 위키 튜토리얼 목차

/tutorial/[slug]/
  튜토리얼 각 장 상세
```

상단 메뉴는 우선 다음 정도로 충분하다.

```txt
홈 · 글 · 튜토리얼
```

강의, AI 앱, 도구 메뉴는 홈에 "준비 중" 섹션으로만 암시하거나 나중에 추가한다. 지금 메뉴에 너무 많이 올리지 않는다.

---

## 2. 콘텐츠 구조

블로그와 튜토리얼은 성격이 다르므로 Astro Content Collection을 분리한다.

```txt
src/content/
  blog/
    hyuji-eopneun-hwajangsil.md
    opensource-repo-nae-geot-mandeulgi.md

  tutorial/
    00-preview.md
    01-tools.md
    02-setup.md
    ...
```

### 블로그 frontmatter

기존 구조 유지.

```yaml
---
title: 글 제목
date: 2026-05-05
projects: [라이프 위키]
themes: [오픈소스, AI도구]
status: 공개
description: 한 줄 설명
---
```

### 튜토리얼 frontmatter

튜토리얼은 정렬이 중요하므로 `chapter`와 `order`를 둔다.

```yaml
---
title: "0장. 완성물 미리보기"
chapter: 0
order: 0
description: "이 튜토리얼을 끝내면 어떤 라이프 위키가 만들어지는지 살펴봅니다."
status: 공개
---
```

필드 의미:

1. `title`: 페이지 제목
2. `chapter`: 큰 장 번호
3. `order`: 같은 장 안에서 정렬 순서
4. `description`: 목록 페이지에 보일 설명
5. `status`: `초안` 또는 `공개`

---

## 3. 구현 순서

작게 나누어 구현한다. 각 단계마다 `npm.cmd run build`로 확인한다.

### 1단계. Content Collection 확장

수정 파일:

```txt
src/content/config.ts
```

작업:

1. 기존 `blog` 컬렉션 유지
2. 새 `tutorial` 컬렉션 추가
3. `status`는 `초안`, `공개` 두 값으로 시작

주의:

1. 기존 블로그 스키마를 깨지 않는다.
2. 기존 `status: 공개`, `status: 책_챕터_후보` 동작을 유지한다.

### 2단계. 블로그 목록을 `/blog/`로 이동

새 파일:

```txt
src/pages/blog/index.astro
```

작업:

1. 현재 `src/pages/index.astro`의 공개 글 목록 로직을 복사
2. 제목을 "기록과 발견"으로 유지
3. 공개 글만 노출

기존 파일:

```txt
src/pages/blog/[slug].astro
```

작업:

1. 그대로 유지
2. 필요하면 "목록으로" 링크를 `/blog/`로 바꾼다.

### 3단계. 홈을 소개 페이지로 변경

수정 파일:

```txt
src/pages/index.astro
```

홈 역할:

1. 라이프 위키 소개
2. 주요 섹션 입구
3. 최근 글 일부 또는 최신 업데이트 2~3개

추천 섹션:

```txt
라이프 위키
  회고에서 글과 도구가 자라는 개인 작업 공간

섹션
  글
  튜토리얼
  강의 (준비 중)
  AI 앱 (준비 중)
  도구 (준비 중)
```

주의:

1. 홈을 마케팅 랜딩페이지처럼 크게 만들지 않는다.
2. 정보 입구 역할을 하게 한다.

### 4단계. 튜토리얼 목록 페이지 추가

새 파일:

```txt
src/pages/tutorial/index.astro
```

작업:

1. `tutorial` 컬렉션에서 `status: 공개`만 가져온다.
2. `chapter`, `order` 순으로 정렬한다.
3. 0장부터 목차 카드 또는 단순 목록으로 보여준다.

### 5단계. 튜토리얼 상세 페이지 추가

새 파일:

```txt
src/pages/tutorial/[slug].astro
src/layouts/TutorialPost.astro
```

작업:

1. Markdown 튜토리얼을 상세 페이지로 렌더링
2. 하단에 "튜토리얼 목록으로" 링크
3. 가능하면 다음/이전 장 링크는 나중 단계로 미룬다.

### 6단계. 상단 메뉴 정리

수정 파일:

```txt
src/layouts/Base.astro
```

상단 메뉴:

```txt
홈 · 글 · 튜토리얼
```

주의:

1. 지금은 VS Code식 좌측바를 만들지 않는다.
2. 현재 심플한 헤더를 유지한다.
3. CSS 변경은 최소화한다.

---

## 4. 튜토리얼 작성 방식

`docs/01-plan/workshop-tutorial-plan.md`의 목차를 기준으로 장별 Markdown을 작성한다.

추천 매핑:

```txt
0장. 완성물 미리보기
  src/content/tutorial/00-preview.md

1장. 도구 소개
  src/content/tutorial/01-tools.md

2장. 시작 전 준비
  src/content/tutorial/02-setup.md

3장. Antigravity 기본 사용법
  src/content/tutorial/03-antigravity-basics.md

4장. Plan
  src/content/tutorial/04-plan-with-bkit.md

5장. 오픈소스 가져오기
  src/content/tutorial/05-fork-and-clone.md
```

각 장 작성 원칙:

1. 초보자가 바로 따라 할 수 있게 쓴다.
2. 화면에서 무엇을 눌러야 하는지 단계별로 쓴다.
3. Antigravity에 요청할 문장은 그대로 복사할 수 있게 제공한다.
4. 터미널 명령어는 "직접 하고 싶다면" 참고 박스로 둔다.
5. 한 장에는 하나의 목표만 둔다.
6. 각 장 끝에는 "이번 장에서 만든 것"과 "다음 장에서 할 것"을 적는다.

---

## 5. 장기 레이아웃 계획

이번 단계 이후, 별도 작업으로 VS Code/Antigravity식 App Shell을 설계한다.

장기 구조:

```txt
AppShell
  ActivityBar
    홈
    글
    튜토리얼
    강의
    AI 앱
    도구

  Sidebar
    선택한 섹션의 목차, 카테고리, 프로젝트 트리

  Main
    콘텐츠 상세, 앱 상세, 튜토리얼 본문

  BottomPanel
    최근 업데이트, 작업 로그, 관련 프로젝트, 메모
```

이 단계는 사이트 전체 리디자인에 가깝다. 튜토리얼 공개 흐름이 먼저 안정된 뒤 진행한다.

---

## 6. 완료 기준

이번 단계가 완료되었다고 판단하는 기준:

1. `/` 홈이 소개/입구 페이지가 된다.
2. `/blog/`에서 기존 공개 글 목록을 볼 수 있다.
3. 기존 블로그 상세 URL이 깨지지 않는다.
4. `/tutorial/`에서 튜토리얼 목차를 볼 수 있다.
5. `/tutorial/00-preview/` 같은 상세 페이지가 작동한다.
6. `npm.cmd run build`가 통과한다.
7. GitHub push 후 Vercel에서 자동 배포된다.

---

## 7. 하지 않을 것

이번 단계에서는 아래 작업을 하지 않는다.

1. VS Code식 좌측 ActivityBar 구현
2. 하단 패널 구현
3. 강의/AI 앱/스토어 실제 페이지 구현
4. 복잡한 검색 기능
5. 태그 필터
6. 전체 디자인 리뉴얼

이유: 지금의 핵심 목표는 튜토리얼을 공개 가능한 구조로 올리는 것이다. 큰 UI 개편은 다음 단계로 분리한다.
