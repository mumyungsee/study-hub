# 나만의 라이프 위키 + 블로그 만들기

> AI 도구로 30분 만에 매일 회고 시스템과 블로그 사이트를 동시에 구축하는 방법

---

## 이게 뭔가요?

매일 회고를 마크다운으로 기록하고, 그 중 공개하고 싶은 글만 자동으로 사이트에 발행하는 시스템입니다.

**핵심 원리**: 비공개 회고(`journal/`)와 공개 블로그(`src/content/blog/`)가 같은 저장소에 공존하지만, 사이트에는 `status: 공개`인 글만 올라갑니다.

```
내 컴퓨터 (저장소)          →    사이트 (vercel)
├── journal/                     올라가지 않음 ✗
│   └── 일간_2026-05-04.md
└── src/content/blog/            올라감 ✓ (status: 공개만)
    └── 내-자립이-흔들렸던-이유.md
```

---

## 준비물

- [Claude Code](https://claude.ai/code) 계정 (AI 코딩 도구)
- [GitHub](https://github.com) 계정 (코드 저장소)
- [Vercel](https://vercel.com) 계정 (무료 사이트 호스팅, GitHub 계정으로 가입)
- Node.js 18+ (설치 안 돼있으면 [nodejs.org](https://nodejs.org) 에서 LTS 버전 받기)

---

## 1단계: 저장소 복제

```bash
git clone https://github.com/mumyungsee/life-wiki.git
cd life-wiki
npm install
```

`npm install` 이 끝나면 로컬에서 사이트 미리 볼 수 있습니다:

```bash
npm run dev
```

브라우저에서 `http://localhost:4321` 접속하면 사이트가 뜹니다.

---

## 2단계: 내 정보로 수정

### 사이트 이름 바꾸기

`src/layouts/Base.astro` 파일에서 사이트 이름과 설명을 찾아 수정합니다:

```html
<!-- 이 부분을 찾아서 -->
<title>아루나의 라이프 위키</title>
<meta name="description" content="...">

<!-- 내 이름으로 바꾸기 -->
<title>내 이름의 라이프 위키</title>
```

`src/pages/index.astro`의 헤더 부분도 동일하게 수정합니다.

### `CLAUDE.md` 수정

`CLAUDE.md` 파일은 AI 동행자(Claude)가 회고 대화를 어떻게 진행할지 정의하는 지침서입니다.

최소한 이 부분은 내 것으로 바꿔주세요:
- `10_프로젝트_*.md` 형식의 프로젝트 파일들 (지금은 "자립", "강의런칭" 등이 예시로 있음)
- 비전과 목표 (지금 내 상황에 맞게)

---

## 3단계: GitHub 저장소 만들기

### gh CLI 사용하는 경우 (터미널에서)

```bash
# GitHub에 로그인
gh auth login

# private 저장소 생성 + push
git remote set-url origin https://github.com/내-계정명/life-wiki.git
gh repo create life-wiki --private --description "나의 라이프 위키"
git push -u origin main
```

### 웹에서 하는 경우

1. [github.com/new](https://github.com/new) 접속
2. Repository name: `life-wiki`
3. **Private** 선택 → **Create repository**
4. 터미널에서:

```bash
git remote set-url origin https://github.com/내-계정명/life-wiki.git
git push -u origin main
```

---

## 4단계: Vercel 배포

1. [vercel.com](https://vercel.com) → **Continue with GitHub**
2. **Add New... → Project**
3. `life-wiki` 검색 → **Import**
4. Framework: **Astro** (자동 감지됨)
5. **Deploy** 클릭

2~3분 후 `xxxx.vercel.app` 주소로 사이트가 뜹니다.

### 사이트 URL을 설정 파일에 적용

배포된 URL을 받았으면 `astro.config.mjs`에 적용합니다:

```javascript
export default defineConfig({
  site: 'https://내-주소.vercel.app',  // 여기에 실제 URL
  ...
});
```

저장하고 push하면 Vercel이 자동 재빌드합니다.

---

## 5단계: 매일 사용하기

이 저장소를 Claude Code로 열면 슬래시 명령어를 쓸 수 있습니다.

### `/project:일간` — 오늘 회고 시작

```
/project:일간
```

Claude가 동행자 톤으로 오늘 하루 대화를 이끌어줍니다.
대화가 끝나면 `journal/20_일간_YYYY-MM-DD.md` 파일로 자동 저장됩니다.

### `/project:주간` — 주간 회고

```
/project:주간
```

최근 7일 일간 기록을 읽고 주간 회고를 생성합니다.
`journal/30_주간_YYYY-Wnn.md`로 저장됩니다.

### `/project:월간` — 월간 회고

```
/project:월간
```

한 달치 주간 회고를 종합합니다.
`journal/40_월간_YYYY-MM.md`로 저장됩니다.

### `/project:블로그초안` — 블로그 글 만들기

```
/project:블로그초안
```

인자 없이 실행하면 최근 일간 기록의 소재 후보 목록을 보여줍니다.
소재를 골라 블로그 초안을 작성합니다. `status: 초안`으로 저장되므로 사이트에 바로 올라가지 않습니다.

공개하고 싶을 때는 파일의 `status: 초안`을 `status: 공개`로 바꾸면 됩니다.

### `/project:publish` — 사이트 발행

```
/project:publish
```

변경된 파일을 GitHub에 올립니다. Vercel이 자동으로 사이트를 업데이트합니다.

---

## 공개/비공개 작동 방식

블로그 글 파일의 `status` 값 하나로 공개 여부가 결정됩니다:

```yaml
---
title: 내 글 제목
status: 초안       # 사이트에 안 올라감
---

---
title: 내 글 제목
status: 공개       # 사이트에 올라감
---
```

`journal/` 폴더의 회고 파일은 `status`와 관계없이 절대 사이트에 올라가지 않습니다.

---

## 폴더 구조

```
life-wiki/
├── CLAUDE.md                  ← AI 동행자 지침 (내 것으로 수정)
├── journal/                   ← 비공개 회고 (사이트 미노출)
│   ├── 20_일간_YYYY-MM-DD.md
│   ├── 30_주간_YYYY-Wnn.md
│   └── 40_월간_YYYY-MM.md
├── archive/                   ← 8일차+ 일간 기록 보관
└── src/
    └── content/
        └── blog/              ← 공개 블로그 글
            └── 글-제목.md
```

---

## 자주 묻는 것들

**Q. 회고가 GitHub에 올라가면 다른 사람이 볼 수 있지 않나요?**  
저장소가 **private**이라 본인만 볼 수 있습니다. 사이트(Vercel)에는 `status: 공개` 글만 올라갑니다.

**Q. 나중에 도메인을 연결하고 싶어요.**  
Vercel 대시보드 → Settings → Domains에서 연결할 수 있습니다.

**Q. 글을 비공개로 되돌리고 싶어요.**  
`status: 공개` → `status: 초안`으로 바꾸고 `/project:publish` 하면 다음 빌드부터 사이트에서 사라집니다.
