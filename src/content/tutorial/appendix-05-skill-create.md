---
title: "부록 E. 나만의 스킬 만들기"
chapter: 5
order: 0
track: 부록
description: "bkit 스킬 파일 구조를 이해하고, /skill-create로 프로젝트 전용 스킬을 직접 만드는 방법을 설명합니다."
status: 공개
---

## 스킬 파일 구조

bkit의 모든 스킬은 `SKILL.md` 파일 하나로 정의됩니다. 파일은 두 부분으로 구성됩니다.

```
--- (메타데이터) ---

# 본문 (실제 지침)
```

### 메타데이터 필드

```yaml
---
name: skill-name
classification: workflow
classification-reason: "이 분류를 선택한 이유"
deprecation-risk: none
description: |
  스킬 설명 한 줄.
  Triggers: 트리거 키워드들 (한국어 + 영어)
argument-hint: "/skill-name [인수]"
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
---
```

| 필드 | 역할 |
|------|------|
| `name` | 슬래시 명령어 이름 (`/name`으로 호출됨) |
| `classification` | `workflow` 또는 `capability` |
| `description` | 스킬 설명 + 트리거 키워드 (이 키워드가 대화에 등장하면 자동 활성화) |
| `argument-hint` | 채팅창 자동완성에 표시되는 사용법 힌트 |
| `user-invocable` | `true`면 사용자가 직접 호출 가능 |
| `allowed-tools` | Claude가 이 스킬 실행 중 사용할 수 있는 도구 목록 |

<details>
<summary>workflow vs capability 차이</summary>

| 구분 | workflow | capability |
|------|----------|------------|
| 의미 | 특정 작업 흐름 자동화 | AI 능력 보완·확장 |
| 예시 | `/pdca plan`, `/deploy`, `/rollback` | `/starter`, `/claude-code-learning` |
| 폐기 위험 | 낮음 (프로세스는 AI가 대체 못 함) | 높음 (AI 성능 향상으로 불필요해질 수 있음) |

만들 스킬이 "이 순서대로 해줘"라면 `workflow`, "이렇게 생각해줘"라면 `capability`입니다. 보통 `workflow`가 더 안정적이고 예측 가능합니다.

</details>

### 본문 (지침 부분)

메타데이터 아래 마크다운으로 Claude에게 줄 지침을 씁니다.

```markdown
# 스킬 이름

## 언제 쓰나
...

## 실행 단계
1. 첫 번째 단계
2. 두 번째 단계

## 출력 형식
...
```

이 본문이 곧 Claude에게 주어지는 프롬프트입니다. 구체적으로 쓸수록 스킬이 일관되게 동작합니다.

---

## 스킬 저장 위치

스킬 파일은 세 곳에 둘 수 있습니다.

### 1. 글로벌 — 내 모든 프로젝트에서 쓰는 스킬

```
~/.claude/
└── skills/
    └── weekly-review/       ← 스킬 이름 폴더
        └── SKILL.md
```

`~`는 내 컴퓨터의 홈 폴더입니다 (Windows: `C:\Users\사용자이름`). 여기 둔 스킬은 어느 프로젝트에서든 사용할 수 있습니다.

### 2. 프로젝트 로컬 — 이 프로젝트에서만 쓰는 스킬

```
내 프로젝트/
└── .claude/
    └── skills/
        └── project/
            └── my-skill/    ← 스킬 이름 폴더
                └── SKILL.md
```

프로젝트 폴더 안 `.claude/skills/project/`에 넣으면 Git으로 팀원과 공유됩니다. `/skill-create`가 만드는 스킬이 바로 이 위치에 저장됩니다.

### 3. bkit 코어 — 건드리지 않는 영역

bkit이 설치할 때 가져오는 기본 스킬들입니다. 플러그인 캐시 안에 있고 직접 수정하지 않습니다.

---

### 우선순위

같은 이름의 스킬이 여러 곳에 있으면 **프로젝트 로컬 → 글로벌 → bkit 코어** 순서로 적용됩니다. 기본 스킬 동작이 마음에 안 들면 같은 이름으로 프로젝트 로컬 스킬을 만들어 덮어쓸 수 있습니다.

---

## /skill-create로 스킬 만들기

스킬 파일을 직접 작성하기 어려우면 `/skill-create`를 씁니다. Claude가 대화식으로 스킬을 생성해줍니다.

```txt
/skill-create
```

또는 이름을 바로 지정:

```txt
/skill-create weekly-review
```

### 진행 순서

1. **이름 확인** — 스킬 이름을 확인하거나 입력합니다
2. **목적 설명** — 스킬이 어떤 역할을 해야 하는지 설명합니다
3. **프로젝트 분석** — bkit이 현재 프로젝트 구조와 `CLAUDE.md`를 읽고 맥락을 파악합니다
4. **파일 생성** — `.claude/skills/project/{이름}/SKILL.md` 생성
5. **확인** — `/{이름}`으로 바로 테스트 가능

### 예시 — 주간 회고 스킬 만들기

```txt
/skill-create weekly-review

이 스킬은 매주 월요일 아침에 실행합니다.
지난 주 커밋 내역과 docs/ 폴더의 계획 문서를 보고
무엇을 했는지, 무엇이 남았는지 요약해줍니다.
마지막엔 이번 주 첫 번째 할 일을 하나 제안합니다.
```

---

## /btw — 아이디어를 스킬로 발전시키기

작업 중 "이거 매번 하면 불편한데 스킬로 만들면 좋겠다"는 생각이 드는 순간이 있습니다. 그 자리에서 기록합니다.

```txt
/btw 블로그 글 쓸 때마다 frontmatter 빠뜨리는데, 자동으로 채워주는 스킬 있으면 좋겠다
```

나중에 목록을 보고:

```txt
/btw list
```

마음에 드는 아이디어를 스킬로 만들 때:

```txt
/skill-create from-btw btw-001
```

bkit이 기록된 맥락을 읽고 스킬 초안을 자동으로 생성합니다.
