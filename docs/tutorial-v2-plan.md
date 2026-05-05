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

## Phase 1. 10장 보강 — bkit 파이프라인 소개

**위치:** 10장 "다음에 해볼 수 있는 것들" `<details>` 안

**내용:**
- 이 튜토리얼은 bkit의 **Starter 레벨**에 해당
- bkit에는 Starter → Dynamic → Enterprise 세 단계가 있음
- 각 레벨이 어떤 규모의 프로젝트를 다루는지 한 줄씩 설명
- 더 복잡한 것을 만들고 싶을 때 bkit 9단계 파이프라인을 따라가면 된다는 안내

**예시 설명:**
```
Starter   — 오픈소스 레포 수정, 간단한 개인 사이트 (지금 이 튜토리얼)
Dynamic   — API 연동, 사용자 인증, 데이터베이스가 있는 서비스
Enterprise — 마이크로서비스, 보안, CI/CD, 대규모 팀 협업
```

---

## Phase 2. 튜토리얼 목록 페이지 — 부록 섹션 추가

**위치:** `src/pages/tutorial/index.astro`

**변경 내용:**
- 현재: 필수 / 선택 두 섹션
- 변경 후: 필수 / 선택 / 더 알아보기(부록) 세 섹션
- `track: 부록`인 파일을 별도 섹션으로 필터링해서 표시

---

## Phase 3. 부록 페이지 작성

순서대로 작성. 각 페이지는 `track: 부록`으로 설정.

### 부록 A. bkit 9단계 개발 파이프라인

**파일:** `src/content/tutorial/appendix-01-pipeline.md`

**내용:**
- PM 분석 → Plan → Design → Do → Check → Act 전체 흐름
- 각 단계에서 어떤 스킬이 작동하는지
- Starter / Dynamic / Enterprise 레벨별 파이프라인 차이
- "언제 다음 레벨로 가면 되는가" 기준

---

### 부록 B. CLAUDE.md 잘 쓰는 법

**파일:** `src/content/tutorial/appendix-02-claude-md.md`

**내용:**
- CLAUDE.md의 구조와 역할
- 잘 쓰면 달라지는 것 (Claude가 맥락을 기억하는 원리)
- 실전 예시: 프로젝트 설명 / 규칙 / 언어 설정
- 자주 하는 실수와 고치는 방법

---

### 부록 C. 프롬프트 잘 쓰는 법

**파일:** `src/content/tutorial/appendix-03-prompting.md`

**내용:**
- 잘 전달되는 요청의 구조 (무엇을 / 어느 파일 / 확인 기준)
- 너무 막연한 요청 vs 구체적인 요청 비교 예시
- Claude가 멈추거나 엉뚱한 걸 할 때 대처법
- 되돌리기, 맥락 리셋, /clear 사용 시점

---

### 부록 D. Claude Code 자주 쓰는 패턴

**파일:** `src/content/tutorial/appendix-04-patterns.md`

**내용:**
- 파일 구조 파악 요청 패턴
- 수정 → 확인 → 되돌리기 패턴
- 에러 났을 때 넘기는 방법
- 긴 작업을 단계별로 나누는 방법
- 여러 파일을 한 번에 수정 요청하는 방법

---

## 작업 순서

1. **Phase 1** — 10장 details 추가 (30분)
2. **Phase 2** — 튜토리얼 목록 페이지 부록 섹션 (1시간)
3. **Phase 3-A** — 부록 A: bkit 파이프라인 (1~2시간)
4. **Phase 3-B** — 부록 B: CLAUDE.md (1시간)
5. **Phase 3-C** — 부록 C: 프롬프트 (1시간)
6. **Phase 3-D** — 부록 D: 패턴 모음 (1시간)
7. main 브랜치 merge → Vercel 배포

---

## 보류 / 미결정

- 부록 페이지 URL 구조: `/tutorial/appendix-01/` vs `/appendix/01/`
- 부록 분량: 각 1000~1500자 목표
- 부록 B~D 우선순위: 사용자 피드백 보고 결정
