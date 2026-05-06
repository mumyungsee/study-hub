---
title: "부록 B. Antigravity 심화 — Rules, Skills, Agent Manager"
chapter: 102
order: 0
track: 부록
description: "Global Rules 설정, Agent Skills 구조, Agent Manager 활용법 등 Antigravity의 덜 알려진 기능들을 정리합니다."
status: 공개
---

## Antigravity가 다른 이유

Antigravity는 VS Code 기반이라 익숙한 에디터 환경 그대로입니다. 하지만 일반 VS Code + AI 플러그인 조합과 다른 점이 있습니다.

- **AI가 터미널을 직접 씁니다.** "npm 설치하고 서버 켜줘"라고 하면 AI가 직접 터미널에 명령어를 실행합니다. 따로 복사해서 붙여넣지 않아도 됩니다.
- **Rules로 AI 행동을 제어합니다.** "한국어로만 답해", "파일 삭제 전에 꼭 물어봐" 같은 규칙을 한 번 설정하면 이후 모든 대화에 자동 적용됩니다.
- **Marketplace에서 확장 기능을 추가합니다.** 설치 없이 에디터 기능을 확장할 수 있습니다.

---

## Customizations 패널

Antigravity 설정의 중심입니다. 열기: 채팅창 오른쪽 상단 **`...`** → **Customizations**

세 개의 탭이 있습니다.

| 탭 | 역할 |
|----|------|
| **Rules** | AI가 지켜야 할 규칙 설정 |
| **Skills** | 현재 프로젝트에 설치된 스킬 확인·관리 |
| **Marketplace** | VS Code 확장 프로그램 검색·설치 |

---

## Rules — AI 행동 강령 설정하기

Rules는 AI에게 "항상 이렇게 행동해"라고 미리 알려두는 지침 파일입니다.

### Global Rules vs Workspace Rules

| | Global Rules | Workspace Rules |
|--|-------------|-----------------|
| 적용 범위 | 내 컴퓨터의 모든 프로젝트 | 현재 열려 있는 프로젝트만 |
| 저장 위치 | `~/.gemini/GEMINI.md` | 프로젝트 폴더 내 별도 파일 |
| 용도 | 언어, 말투, 안전 규칙 등 항상 필요한 것 | 이 프로젝트만의 규칙 |

### 설정 방법

**Global Rules 수정:**

1. 채팅창 `...` → Customizations → **Rules 탭**
2. 목록에서 `# Global Antigravity Rules` 항목 클릭
3. `~/.gemini/GEMINI.md` 파일이 에디터에서 열림
4. 규칙 작성 → `Ctrl+S` 저장

**Workspace Rules 추가:**

1. 같은 Rules 탭에서 **`+ Workspace`** 버튼 클릭
2. 프로젝트 폴더 안에 규칙 파일이 생성됨
3. 이 프로젝트에서만 적용할 규칙 작성

### 활용 예시

```markdown
# 내 Global Rules 예시

1. 모든 대화는 한국어로 합니다.
2. 파일을 삭제하거나 덮어쓰기 전에는 먼저 물어봅니다.
3. 코드 설명은 비개발자도 이해할 수 있게 쉬운 말로 합니다.
```

한 번 설정하면 매번 "한국어로 답해줘"라고 말하지 않아도 됩니다.

---

## Agent Skills — AI의 전문 기술 추가하기

스킬(Skill)은 AI에게 특정 작업 방식을 가르치는 파일 묶음입니다.

### 구조

```
프로젝트 폴더/
└── .agent/
    └── skills/
        └── 스킬이름/
            └── SKILL.md   ← 스킬 정의 파일
```

`SKILL.md`에는 "이 스킬은 무엇을 하고, 어떻게 행동해야 하는지"를 적습니다. AI가 사용자 요청을 보고 관련 스킬이 있으면 자동으로 로드합니다.

### 이 튜토리얼의 스킬과의 관계

이 튜토리얼에서 쓰는 `/pdca plan`, `/pdca analyze` 같은 명령어는 **bkit**이 제공하는 Claude Code 스킬입니다. `.claude/commands/` 폴더에 저장됩니다. Antigravity의 `.agent/skills/`와 별도 체계이지만, 같은 아이디어입니다 — "AI에게 특정 역할을 맡기는 파일".

### 스킬 추가하는 법

직접 파일을 만들 필요 없습니다. AI에게 말하면 됩니다.

```txt
.agent/skills/ 폴더에 "일간 리뷰" 스킬을 만들어줘.
이 스킬은 오늘 수정한 파일들을 요약해서 보고하는 역할을 해.
```

AI가 `SKILL.md` 파일을 생성해줍니다.

---

## Agent Manager — 큰 작업은 여기서

`Ctrl+E`를 누르면 코드 에디터가 사라지고 **Agent Manager 뷰**로 전환됩니다.

### 일반 채팅창(Ctrl+L)과 차이

| | 채팅창 (Ctrl+L) | Agent Manager (Ctrl+E) |
|--|----------------|------------------------|
| 화면 | 오른쪽 패널 | 전체화면 |
| 용도 | 짧은 질문, 빠른 수정 | 복잡하고 긴 작업 |
| 태스크 관리 | 단일 대화 | 여러 태스크 동시 관리 |

### 언제 쓰나요

- 여러 파일을 한꺼번에 만들거나 수정할 때
- "이 폴더 전체를 분석해서 리포트 만들어줘" 같은 긴 작업
- 코드 에디터가 방해될 때

**`Ctrl+E`** → 작업 지시 → 에디터로 돌아오려면 다시 **`Ctrl+E`** 또는 **`Ctrl+L`**

---

## 에이전트 승인 — Approve 버튼

Antigravity 에이전트는 중요한 작업을 실행하기 전에 **먼저 계획을 보여주고 승인을 요청합니다.** 이게 에이전트가 마음대로 파일을 바꾸지 못하게 막는 안전장치입니다.

### 흐름

```
에이전트에게 요청
  ↓
Artifacts 패널 — "이렇게 하려고 합니다" 계획 표시
  ↓
Approve 버튼 클릭 (승인)
  ↓
에이전트가 실제 작업 실행
```

**Approve 전에는 아무것도 바뀌지 않습니다.** 계획이 마음에 들지 않으면 승인하지 말고 다시 요청하면 됩니다.

### 실제로 보이는 것

- 파일 생성/수정 요청 → **"이 파일을 이렇게 수정할게요" + Approve/Cancel**
- 터미널 명령 실행 → **"이 명령어를 실행할게요" + Approve/Cancel**

처음에 이 창이 뜨면 당황하지 마세요. 읽어보고 맞으면 Approve, 아니면 Cancel하고 다시 말하면 됩니다.

### Approve를 매번 눌러야 하나요

기본은 매번 확인입니다. 익숙해지면 Rules에 "짧은 수정은 자동으로 실행해도 좋다"라고 써넣을 수 있습니다. 하지만 처음엔 일단 확인하는 게 안전합니다.

---

## 인라인 명령 (Ctrl+I)

에디터에서 특정 부분만 수정하고 싶을 때 씁니다.

1. 에디터에서 수정할 부분을 드래그로 선택
2. `Ctrl+I`
3. 작은 입력창에 요청 입력

```txt
이 문단 더 짧게 줄여줘.
```

채팅창까지 가지 않고 파일 안에서 바로 처리합니다.

---

## 핵심 단축키 요약

| 단축키 | 기능 |
|--------|------|
| `Ctrl+L` | 채팅창 열기/닫기 |
| `Ctrl+E` | Agent Manager 뷰 전환 |
| `Ctrl+I` | 선택 영역 인라인 명령 |
| `Ctrl+Shift+P` | 명령 팔레트 (기능 검색) |
| `Ctrl+B` | 파일 탐색기 접기/펴기 |
| `` Ctrl+` `` | 터미널 열기/닫기 |

---

## 공식 문서

막히거나 더 깊이 알고 싶을 때 참고합니다.

| 문서 | 링크 |
|------|------|
| Antigravity 공식 문서 홈 | [antigravity.google/docs](https://antigravity.google/docs) |
| Rules & Workflows 설정 가이드 | [antigravity.google/docs/rules-workflows](https://antigravity.google/docs/rules-workflows) |
| 처음 시작하기 (Getting Started) | [antigravity.google/docs/getting-started](https://antigravity.google/docs/getting-started) |
| 단축키 전체 목록 | [antigravity.google/docs/shortcuts](https://antigravity.google/docs/shortcuts) |
