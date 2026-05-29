# CLAUDE.md — AI 작업 가이드

> 이 파일은 Claude(또는 다른 AI)가 이 프로젝트에서 작업할 때 먼저 읽는 가이드.

---

## 이 프로젝트가 뭔지

**AI 스터디 허브** — 챗봇만 써본 비개발자에게 AI랑 같이 일하는 법을 가르치는 수업 자료 사이트.

운영자: 아루나
배포: https://study-hub-eta-olive.vercel.app

### 핵심 메시지

**AI 메타학습이 본질이다.** 도구(VS Code, Claude Code, bkit)는 시즌 한정으로 바뀐다.
- 예: Antigravity가 한 달 만에 UI 통째로 바뀜 → 우리는 VS Code로 갈아엎음
- 그래서 도구 사용법은 잘 안 바뀌는 기초만 다루고, **AI랑 잘 협업하는 메타스킬을 메인**으로 함

### 대상 정확히

- AI 챗봇(ChatGPT, Claude.ai 등)만 써본 사람
- **비개발자 + IT 리터러시도 떨어지는 분 포함**
- 바이브코딩 직전까지 끌어주는 게 목표
- 한도끝도없이 IT 기초까지 다 다루진 않음

---

## 톤·문체 가이드

### 기본 톤

- **다정한 친구 말투** — 반말, 친근하게, 핵심은 정확하게
- "~합니다" 보다 "~해요" 위주
- 비개발자 입장에서 막막한 지점을 짚어주는 코칭 톤

### 비개발자용 글쓰기 원칙

1. **전문 용어 쓸 때는 그 자리에서 풀어쓰기** (또는 용어집·툴팁 활용)
2. **설명문 안에 또 IT 용어 끌어오지 말기** — 끝없이 설명 늘어남
   - 나쁜 예: "frontmatter는 메타데이터예요" (메타데이터도 모름)
   - 좋은 예: "frontmatter는 책 표지의 제목·저자 같은 정보를 적는 칸이에요"
3. **비유 적극 사용** — 카페·요리·게임 같은 일상 상황으로
4. **구체 예시로** — "웹 브라우저" → "크롬·사파리 같은 웹 브라우저"

### 이모지

- 사용자가 명시적으로 요청하지 않으면 **이모지 안 씀**
- ⚠️ 같은 경고 마커는 정말 필요한 곳에만

---

## 파일 구조 규칙

### 스타일 구조 — 핵심 원칙

**공용 스타일은 `src/layouts/Base.astro`에만.** 각 페이지 `<style>`에 중복 정의 금지.

| 클래스 | 위치 | 설명 |
|---|---|---|
| `.page-body h2/h3` | `Base.astro` | 섹션 구분선, 헤딩 색 |
| `.flow` | `Base.astro` | 전체 흐름 박스 |
| `blockquote.intro/warning/info/success` | `Base.astro` | 알림 박스 4종 |
| `.os-alt` | `Base.astro` | OS 분기 details |
| `.prompt-box`, `.prompt-label` | `Base.astro` | 복사용 프롬프트 박스 |
| `.prompt-compare`, `.prompt-bad`, `.prompt-good` | `Base.astro` | 비교 박스 |
| `.meta-summary` | `Base.astro` | 마무리 요약 박스 |
| `.hint`, `.muted` | `Base.astro` | 보조 텍스트 |
| `.copy-btn` | `Base.astro` | 코드블록 복사 버튼 |

페이지별 `<style>`에는 **그 페이지에만 쓰는 것만** 작성.  
새 공용 컴포넌트 필요 시 → `Base.astro`의 "공용 페이지 컴포넌트" 블록에 추가.

### 환경 세팅 (`src/pages/setup/*.astro`)

- 각 페이지는 self-contained `.astro` 파일
- 공유 클래스: Base.astro에서 전역 관리 (위 표 참고)
- 메뉴는 `src/components/Sidebar.astro`에 **하드코딩** (자동 생성 아님)
- 새 페이지 추가 시 **3곳 동시 수정**:
  1. `src/pages/setup/<이름>.astro` 신규 (기존 setup 페이지에서 `<style>` 없이 복사 — 공용 스타일은 Base.astro 상속)
  2. `Sidebar.astro`에 메뉴 한 줄
  3. 인접 페이지의 "다음 단계" 링크 갱신

### 튜토리얼 (`src/content/tutorial/*.md`)

- frontmatter 필수: `title`, `chapter`, `order`, `track`, `description`, `status`
- `track: 필수 | 심화 | 부록`
- `status: 공개` 만 사이드바에 표시됨 (`Sidebar.astro:7`에서 필터)
- 사이드바에서 숨기려면: `status: 초안`

### 용어 툴팁 시스템

- **공용 모듈**: `src/scripts/glossary-tooltip.ts`
- **CSS**: `Base.astro`의 글로벌 스타일 (`.glossary-term`)
- **사용법**: 페이지 `<script>`에 두 줄 추가
  ```ts
  import { applyGlossaryTo } from '../scripts/glossary-tooltip';
  applyGlossaryTo('.셀렉터');
  ```
- **새 용어 추가**: `glossary-tooltip.ts`의 `glossaryTerms` 배열에 `{ regex, tip }` 추가
- **용어집 페이지**: `src/pages/onboarding/glossary.astro` — 툴팁 추가 시 여기도 카드 추가

### 미션·갤러리 (현재 비활성, 자산 보존)

- `00_missions/` — 수강생 미션 제출 시스템 가이드
- `01_gallery/` — 강사용 갤러리 운영 가이드
- `src/content/gallery/`, `src/pages/gallery/` — 갤러리 콘텐츠·라우팅
- `src/content/blog/`, `src/pages/blog/` — 블로그 시스템 (추후 공지용 부활 가능)
- **현재 운영 중 아님**. 살아있는 코드는 유지 (나중에 부활할 때 활용)

---

## 도구 / 외부 자원

### bkit (Claude Code 플러그인)

- 본체: `popup-studio-ai/bkit-claude-code` (오픈소스, 우리 환경 세팅에서 설치 안내)
- 한글 가이드: `popup-studio-ai/bkit-starter` (별도)
- 둘이 다른 저장소이고 자주 헷갈리므로 주의

### 라이프 위키 (수강생 실습 레포)

- **이 사이트랑 분리된 별도 저장소**
- 튜토리얼 본문에 링크 있음
- 일간 회고·주간/월간 회고·블로그 시스템 들어있음
- 수강생이 Fork해서 본인 GitHub에 두고 작업

---

## 자주 하는 작업 패턴

### 새 환경 세팅 페이지 추가

1. 기존 `setup/*.astro` 톤·CSS 복사해서 `setup/<새이름>.astro` 생성
2. `Sidebar.astro`에 메뉴 한 줄 추가
3. 인접 페이지의 "다음 단계" 링크 갱신
4. 새 페이지에 `applyGlossaryTo('.page-body')` 두 줄 추가
5. 빌드 검증 (`npm run build`)

### 새 튜토리얼 챕터 추가

1. `src/content/tutorial/<번호>-<슬러그>.md` 생성
2. frontmatter 필수 필드 채우기 (`chapter` 번호 잘 잡기)
3. `status: 초안`으로 시작 → 검토 후 `공개`로 변경

### 새 용어 툴팁 추가

1. `src/scripts/glossary-tooltip.ts`의 `glossaryTerms`에 `{ regex, tip }` 추가
2. 같은 위치에 여러 매칭되면 긴 매칭 우선 (예: "Claude Code" > "Claude"). 정렬 로직이 처리하므로 그냥 추가만
3. `src/pages/onboarding/glossary.astro`에도 카드로 자세한 설명 추가 (둘 다 같은 원칙 — 설명에 또 IT 용어 안 쓰기)
4. 주의: 툴팁은 `pre, code, a` 태그 안에서는 안 뜸. `<code>README.md</code>`처럼 감싸면 툴팁 안 나오니 일반 텍스트로 둘 것

### 개념 시나리오 페이지 (참고: `src/pages/onboarding/concept.astro`)

가상의 초보자 주인공이 무언가를 만들어가는 대화 시나리오로 개념을 익히게 하는 유형. 다른 주제로도 또 만들 수 있음.

- **구조**: 큰 단위(주제의 진행 순서) → 그 안에서 장면을 행동 단위로 잘게 쪼갬 (한 장면 = 하나의 행동)
- **형식**: 대화 말풍선 위주, 줄글 설명은 대화 직후 한 줄만. 한 장면에 새 개념 최대 2개
- **막히는 장면 필수**: 환각·오류·롤백처럼 AI가 틀리거나 실패하는 장면을 최소 하나 (개념이 더 와닿음)
- **스타일**: `.dialogue` / `.dialogue.ai-says` (말풍선), `.git-log` (터미널), `.code-block` (코드) — concept.astro `<style>`에 정의
- **설명 분리**: 단순 용어는 툴팁, 더 자세한 건 부록 페이지로 링크
- **에필로그**: 이 페이지 자체를 예시로 첨부해 리버스 엔지니어링하는 범용 프롬프트 포함 (Few-shot+인터뷰 결합)
- 새 페이지는 `applyGlossaryTo('.page-body')` 두 줄 추가 + 빌드 검증

### 사이트 변경사항 배포

- GitHub `main`에 push → Vercel 자동 빌드·배포
- 빌드 시간 약 10초 + 배포 약 30초

---

## 짚어둘 함정·맥락

### 1. 이 사이트 vs 라이프 위키

- **혼동 주의**: 둘이 다른 레포. README에 카테고리 추가 같은 작업 ❌. 그건 라이프 위키 쪽.
- 라이프 위키는 튜토리얼이 "Fork 받아 작업"하라고 안내하는 별도 자산.

### 2. Antigravity → VS Code 전환 흔적

- 한 달 전(2026-05-25 직전)까지 Antigravity로 진행. 지금은 VS Code.
- `src/pages/setup/antigravity.astro`는 보존되어 있으나 사이드바에서 숨김 + 상단 경고 박스
- `src/pages/onboarding/study-method.astro`의 "Antigravity UI 바뀐 사연"은 **의도적으로 보존** (스터디 학습법의 이유)
- 부록 G(`appendix-02-antigravity.md`)도 status:초안으로 숨김

### 3. AskUserQuestion 같은 팝업 도구 사용 금지

- 사용자 화면이 작으면 팝업이 채팅창 가림
- 선택지는 **채팅창 안에 숫자 보기**로 제시
  ```
  1. 옵션 A — 설명
  2. 옵션 B — 설명
  ```

### 4. 작업 범위는 좁히는 쪽으로

- 사용자는 큰 일괄 처리보다 **핵심만 단계적으로** 선호
- 옵션 제안할 때 최소 범위를 추천으로
- 보류한 작업은 `docs/`에 계획서로 기록 (세션 끊겨도 이어갈 수 있게)

### 5. docs/ 폴더 용도

- **작업 계획서·아이디어 메모·학습 철학 메모만** 둠
- 완료된 계획은 해당 파일 안에서 체크박스 `[x]` 처리 + 상단 현재 상태 업데이트
- 새 `.md` 파일은 정말 필요할 때만 (현재 파일: `meta-skills-plan.md`, `improvement-ideas.md`, `learning-philosophy-notes.md`)
- 회의록이나 블로그 초안 소재 등이 많이 쌓이면 그때 `docs/archive/` 만들어 이동

### 6. 세션 끝낼 때 루틴 ("맥락 업데이트" 요청 시)

1. `docs/meta-skills-plan.md` — 완료된 Phase 체크박스 `[x]`, 현재 상태 한 줄 업데이트
2. `CLAUDE.md` — 규칙·방향 변경 있었으면 반영
3. 메모리 파일 — 비자명한 결정·사용자 피드백 있었으면 저장
4. `git commit + push`

### 7. 새 문서 함부로 만들지 않기

- `.md` 파일을 요청 전에 먼저 만들지 말 것
- 채팅에서 충분히 논의 → 승인 후 작성
- 운영 문서(계획서 등)는 `docs/`에 모음

---

## 빌드·배포 정보

```bash
npm run dev      # 로컬 개발 서버 (http://localhost:4321)
npm run build    # 빌드 검증
```

- Vercel 자동 배포: GitHub `main` push 시
- 운영 URL: https://study-hub-eta-olive.vercel.app
- 빌드 시간 짧음 (10초 내외, 37개 페이지)

---

## 사용자 정보 (운영자)

- 운영자: **아루나** 
- 컴퓨터: 2대 (1번 노트북 — 문서/기획, 2번 데스크탑 — 영상/이미지)
- 비개발자, 바이브코딩으로 개발
- 전문 컨설턴트처럼 리스크/문제점 선제 파악 원함
- 머리 아픈 복잡한 설계보다 실용적·점진적 접근 선호
