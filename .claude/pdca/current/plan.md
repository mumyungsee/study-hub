# study-hub 작업 플랜

> 다음 세션에서 이 문서 하나만 읽으면 컨텍스트 복원 가능.
> 이전 plan(사전 설문조사 설계)은 완료되어 이 문서로 대체됨.

---

## 이전 세션 완료 사항 (2026-05-14)

### 신규 구현
- `src/pages/setup/antigravity.astro` — Antigravity 설치 가이드 (Windows 메인 + Mac 펼치기 박스)
- `src/pages/setup/claude-code.astro` — Claude Code 설치 가이드 (Terminal CLI + 보너스 VS Code 확장)
- 두 페이지 모두 우측 TOC 패널 + 코드 복사 버튼 활성화
- 학습 패턴: **모범답안 + 메타학습 박스** (안전망 + 학습 가치)

### 사이트 정체성 전환
- 사이트 제목: "나만의 라이프 위키" → **"AI 스터디 허브"**
  (다음 스터디에도 재활용 가능한 범용 제목)
- 홈 화면 Hero 새로 작성 (22기 스터디용 — 다음 스터디 시 Hero만 교체)
- 카드 4개 구성: 온보딩 / 환경 세팅 / 튜토리얼 / 수강생 사례
- 사이드바 "준비 중" 풀기 (Antigravity, Claude Code 둘 다)

### 자료 수집
- 안티그래비티 설치 PDF (Mac/Windows 각각) — `docs/안티그래비티 설치자료/`
  - 저작권 이슈로 git 제외 (`.gitignore`에 추가됨)
  - 로컬에서만 참고. `pdftotext`로 텍스트 추출본도 같이 보관

---

## 핵심 결정 사항 (의사결정 기록)

### 학습 방식
- **메타학습 패턴 2가지**:
  - 안티그래비티(자료 적음): **본질 일반화** — "VS Code 기반 IDE에서 OO 어떻게 해?"
  - Claude Code(자료 풍부): **공식 문서 링크 동봉** — "공식 문서: code.claude.com/... 참고해서 알려줘"
- 진짜 가르치는 건: 단순 설치법이 아니라 **"AI에게 물어보면서 학습하는 메타 스킬"**
- 항상 **모범답안(스텝바이스텝)을 함께 제공** — 메타학습 시도 후 막히면 폴백

### 라이브 시연 방침
- 시연 OS: **Windows** (Mac은 펼치기 박스로 보조)
- 수강생 사전 상태: Gmail/Chrome 갖춘 상태로 들어옴 (사전 설문조사에서 안내 예정)
- 라이브 흐름: 설치 → UI 간단투어(5군데) → 한글화 시연(메타학습) → Claude Code 설치
- **라이브 미포함 (심화/필요 시)**: Chrome 연동, Node.js 설치, 안티그래비티 100% 활용법

### 참고 자료 우선순위
1. **Google Codelabs** (공식, 크롤링 가능, 신뢰도 ★★★★★)
   - Antigravity: `codelabs.developers.google.com/getting-started-google-antigravity`
   - 단, 일부 명칭 차이 — PDF의 "Strict Mode" → Codelabs의 "Secure Mode"
2. **Claude Code 공식 문서** (잘 정리, 크롤링 가능): `code.claude.com/docs/en/overview`
3. **PDF 자료** (강사가 다른 분에게 받음): 친절한 한국어 설명 + 시각적 자료
4. **wikidocs 한글 자료** (비공식): `wikidocs.net/312514` — 심화 학습용 보조

### 검증 안 되는 항목
- `antigravity.google/docs/home` — JS 렌더링이라 크롤링 불가
- 안티그래비티 AI는 신생 도구 자체에 약함 (Chrome 연동 없이는 외부 URL 못 읽을 가능성)

---

## 다음 작업 (우선순위별)

### 우선순위 높음

1. **라이브 흐름 세부 시뮬레이션** — 인터뷰 미완
   - 라이브 총 시간 분량 결정 (몇 분짜리?)
   - STEP별 소요 시간 추정 (다운로드 N분, 설치 N분 등)
   - 페이지가 큐카드로서 잘 작동하는지 점검 (실제로 따라가보기)

2. **사전 설문조사 안내문 업데이트**
   - 현재 `survey.astro`는 Google Form만 임베드
   - 수강생이 라이브 전 미리 준비할 것 안내 추가 필요:
     - Gmail 계정 (개인 @gmail.com)
     - Chrome 브라우저
     - RAM 8GB 이상 권장
     - Windows 사용자명이 한글이면 주의

3. **안티그래비티 AI URL 읽기 능력 실측 테스트**
   - 강사가 직접 안티그래비티에서 테스트:
     - 방식 A: 그냥 묻기
     - 방식 B: URL 함께 묻기
     - 방식 C: 텍스트 첨부 후 묻기
   - 결과에 따라 메타학습 박스의 프롬프트 조정 가능

### 우선순위 중간

4. **온보딩 `intro.astro` 콘텐츠 작성**
   - 현재 placeholder ("준비 중")
   - 채울 내용: 스터디 정체성·일정·기대치 안내
   - 22기 정보 + 메타학습 가치 강조

5. **참고 자료/심화 페이지** (보너스)
   - wikidocs 한글 가이드, Codelabs, Medium 글 등 외부 링크 모음
   - 위치: 사이드바 "심화" 또는 "부록"
   - 비공식 자료 주의 표시

### 우선순위 낮음

6. **슬라이드 이미지 추출** (필요 시)
   - PDF에서 시각적 자료가 필요해지면 `pdftoppm`으로 페이지별 PNG 변환 가능

7. **본문에 남은 "라이프 위키" 검토**
   - `content/tutorial/00-preview.md:10`
   - `pages/setup/claude-code.astro:156`
   - 두 곳 다 "수강생이 만들 결과물" 의미라 의도적으로 남겨둠. 필요 시 다른 결과물 이름으로 교체 검토.

---

## 페이지 구조 / 디자인 패턴 메모

### 표준 페이지 패턴
```astro
<Base title="페이지명 — AI 스터디 허브" showTOC={true}>
  <article class="page-body">
    <h1>페이지 제목</h1>
    <blockquote class="intro">...</blockquote>
    <h2>STEP 1. ...</h2>
    ...
  </article>
</Base>
```
- `showTOC={true}`로 우측 목차 자동 생성
- `<article class="page-body">`로 본문 영역 표시 (TOC가 인식)
- 각 `<h2>` 위에 `border-top` 자동 적용 (섹션 구분선)

### 박스 시스템 (재사용 가능)
- `blockquote.intro` — 페이지 도입부 (베이지)
- `blockquote.warning` — 주의사항 (옐로우)
- `blockquote.info` — 정보 안내 (블루)
- `blockquote.success` — 완료 알림 (그린)
- `.prompt-box` — 복사용 프롬프트
- `.prompt-compare` — 좋은/나쁜 프롬프트 좌우 비교
- `.os-alt` (`<details>`) — OS별 분기 (접을 수 있는 박스)

### 코드 블록
- 모든 `<pre>`에 자동으로 호버 시 "복사" 버튼 부착 (페이지 하단 script)

---

## 외부 참고 링크

- Antigravity Codelabs: https://codelabs.developers.google.com/getting-started-google-antigravity
- Claude Code 공식 문서: https://code.claude.com/docs/en/overview
- wikidocs 한글 안티그래비티 가이드: https://wikidocs.net/312514 (비공식)
- 다운로드: https://antigravity.google/download (JS 렌더링 — 크롤링 불가)

## 로컬 자료 위치

- 안티그래비티 PDF 원본: `docs/안티그래비티 설치자료/안티그래비티_macOS_설치가이드.pdf`, `..._Windows_설치가이드.pdf`
- 추출 텍스트: `docs/안티그래비티 설치자료/extracted/mac.txt`, `windows.txt`
