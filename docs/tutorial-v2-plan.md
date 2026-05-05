# 튜토리얼 v2 추가 작업 계획

작성일: 2026-05-06  
브랜치: tutorial-v2

---

## 현재 상태 (완료)

**필수 30분 (Day 1)**
- 1장: 도구 소개
- 2장: 시작 전 준비
- 3장: Fork & Clone + Antigravity 화면 설명
- 4장: CLAUDE.md 수정 + 요청 방식 팁
- 5장: Push & 배포 + Git 백업·버전 관리 설명

**선택 1~2시간 (Day 2) — PDCA 한 바퀴**
- 6장: 레포 써보기 (탐색)
- 7장: Plan — /plan + 커밋
- 8장: Do — 수정 + 커밋
- 9장: Check — /check + 로컬 미리보기
- 10장: Act + 배포

---

## Phase 1. 10장 보강 — bkit 레벨 소개

**위치:** 10장 "다음에 해볼 수 있는 것들" `<details>` 안

**내용:**
- 이 튜토리얼은 bkit **Starter 레벨** 실습
- bkit은 프로젝트 규모에 따라 세 레벨이 있음

```
Starter    — 오픈소스 레포 수정, 간단한 개인 사이트 (지금 이 튜토리얼)
Dynamic    — API 연동, 사용자 인증, 데이터베이스가 있는 서비스
Enterprise — 마이크로서비스, 보안, CI/CD, 대규모 팀 협업
```

- 더 복잡한 것을 만들고 싶을 때 bkit 9단계 파이프라인(PM→Plan→Design→Do→Check→Act)으로 확장 가능
- 부록 A를 참고하도록 안내

---

## Phase 2. 튜토리얼 목록 페이지 — 부록 섹션 추가

**위치:** `src/pages/tutorial/index.astro`

**변경 내용:**
- 필수 / 선택 / **더 알아보기(부록)** 세 섹션으로 분리
- `track: 부록`인 파일을 별도 섹션으로 필터링

---

## Phase 3. 부록 페이지 4개

### 부록 A. bkit 심화 — 스킬과 개발 파이프라인

**파일:** `src/content/tutorial/appendix-01-bkit.md`

**다룰 내용:**
- bkit이 무엇인지 다시 정리 (간단한 프롬프트 엔지니어링 프레임워크)
- 유용한 스킬들
  - `/plan` — 요구사항 → 계획 문서
  - `/check` — 계획 대비 구현 검증
  - `/design` — 설계 문서 생성
  - `/learn` — 코드베이스 학습 (학습 기능)
- 9단계 개발 파이프라인 전체 흐름
  - PM Analysis → Plan → Design → Do → Check → Act
  - 각 단계에서 어떤 스킬이 작동하는지
- Starter / Dynamic / Enterprise 레벨별 차이
- 언제 다음 레벨로 가면 되는가

---

### 부록 B. Antigravity 심화 — 설정 파일 구조

**파일:** `src/content/tutorial/appendix-02-antigravity.md`

**다룰 내용:**
- `.claude/` 폴더 전체 구조

```
.claude/
├── CLAUDE.md           ← 프로젝트 지침 (팀과 공유)
├── CLAUDE.local.md     ← 개인 지침 (공유 안 됨, .gitignore)
├── settings.json       ← 팀 공유 설정 (권한, MCP 서버 등)
├── settings.local.json ← 개인 설정 (공유 안 됨)
├── commands/           ← 슬래시 명령어 파일들
├── agents/             ← 에이전트 정의 파일들
└── rules/              ← 경로별 조건부 규칙
```

- 에이전트 설정 방법
  - `/agents` 명령어로 대화식 생성·편집 (권장)
  - `.claude/agents/` 폴더에 마크다운 파일로 직접 작성
- `/memory` 명령어와 자동 학습 기능
  - Claude가 대화 중 발견한 패턴을 자동으로 `MEMORY.md`에 기록
  - 위치: `~/.claude/projects/<project>/memory/MEMORY.md`
  - 세션마다 첫 200줄 / 25KB만 로드

---

### 부록 C. CLAUDE.md 잘 쓰는 법

**파일:** `src/content/tutorial/appendix-03-claude-md.md`

**공식 문서 기반 핵심 내용:**

**세 가지 CLAUDE.md**

| 파일 | 위치 | 적용 범위 | Git 공유 |
|------|------|---------|--------|
| 글로벌 | `~/.claude/CLAUDE.md` | 모든 프로젝트 | 아니오 |
| 프로젝트 | `./CLAUDE.md` | 현재 프로젝트 | 예 |
| 로컬 | `./CLAUDE.local.md` | 현재 프로젝트 | 아니오 |

여러 파일이 있으면 모두 로드됨. 작업 폴더에 가까울수록 우선 적용.

**효과적으로 쓰는 법:**
- **200줄 이내** 목표. 초과하면 토큰 낭비, 지시 준수율 저하
- 추상적 표현 금지 → 구체적 지시 ("코드 잘 써줘" X, "들여쓰기는 2칸" O)
- 긴 내용은 `@파일경로`로 별도 파일 임포트
- 경로별 규칙은 `.claude/rules/` 폴더에 분리

**글로벌 vs 프로젝트 나눠 쓰는 법:**
- 글로벌: 언어 설정, 응답 스타일, 개인 선호 규칙
- 프로젝트: 해당 프로젝트 구조, 팀 컨벤션, 도메인 지식

---

### 부록 D. 프롬프트 잘 쓰는 법 — 입문 엔지니어링

**파일:** `src/content/tutorial/appendix-04-prompting.md`

**다룰 내용:**
- 잘 되는 요청의 구조 (무엇을 / 어느 파일 / 확인 기준)
- bkit 스킬을 쓰면서 배우는 프롬프트 패턴
  - 스킬에 지침을 넣는 것 자체가 프롬프트 엔지니어링
  - CLAUDE.md 작성 = 시스템 프롬프트 설계
- 실전 비교 예시 (막연한 요청 vs 구체적 요청)
- Claude가 엉뚱하게 갈 때 대처법
- 긴 작업을 단계별로 나누는 방법
- 되돌리기, /clear 사용 시점
- 자주 쓰는 패턴 모음

---

## 작업 순서

1. **Phase 1** — 10장 details 보강 (30분)
2. **Phase 2** — 목록 페이지 부록 섹션 추가 (1시간)
3. **Phase 3-A** — 부록 A: bkit 심화 (1~2시간)
4. **Phase 3-B** — 부록 B: Antigravity 심화 (1~2시간)
5. **Phase 3-C** — 부록 C: CLAUDE.md 잘 쓰는 법 (1시간)
6. **Phase 3-D** — 부록 D: 프롬프트 입문 엔지니어링 (1시간)
7. main 브랜치 merge → Vercel 배포

---

## 참고 — 공식 문서 확인 사항 (2026-05-06 기준)

- CLAUDE.md 세 종류(글로벌/프로젝트/로컬) — 공식 문서 확인됨
- .claude/agents/ 폴더, /agents 명령어 — 공식 문서 확인됨
- /memory 명령어, auto memory (MEMORY.md) — 공식 문서 확인됨
- .claude/rules/ 경로별 조건부 규칙 — 공식 문서 확인됨
- "Antigravity" 명칭은 공식 문서에 없음 (Claude Code 데스크탑 앱의 별칭)
- bkit /learn 스킬 — 확인 필요 (부록 A 작성 시 재확인)
