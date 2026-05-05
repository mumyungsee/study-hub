---
title: "부록 A. bkit 심화 — 스킬과 개발 파이프라인"
chapter: 1
order: 0
track: 부록
description: "bkit의 스킬, 9단계 개발 파이프라인, 프로젝트 레벨 구분을 정리합니다."
status: 공개
---

## bkit이란

bkit(Vibecoding Kit)은 Claude Code 위에 올려진 프롬프트 엔지니어링 프레임워크입니다.

Claude Code 자체는 AI가 파일을 읽고 쓰고 실행하는 도구입니다. bkit은 그 위에 개발 방법론(PDCA + 9단계 파이프라인)과 전문화된 스킬들을 얹어서, 규모 있는 프로젝트도 체계적으로 만들 수 있게 해줍니다.

이 튜토리얼에서 쓴 `/plan`, `/check`가 bkit 스킬입니다.

---

## 스킬 전체 목록

스킬은 Claude Code 채팅창에서 `/스킬이름`으로 실행합니다.

### PDCA 워크플로우

bkit의 핵심은 `/pdca` 명령어입니다. 뒤에 단계명을 붙여서 사용합니다.

| 명령어 | 역할 |
|--------|------|
| `/pdca plan <기능명>` | 요구사항 인터뷰 → 계획 문서 생성 |
| `/pdca design <기능명>` | 계획 문서 → 설계 문서 생성 (DB, API, 컴포넌트 구조) |
| `/pdca do <기능명>` | 구현 범위 승인 후 단계별 구현 |
| `/pdca analyze <기능명>` | 계획 대비 구현 갭 분석 보고 |
| `/pdca iterate <기능명>` | 갭 분석 결과 자동 수정 반복 |
| `/pdca report <기능명>` | 완료 보고서 생성 |
| `/pdca pm <기능명>` | PM 에이전트 팀 분석 (페르소나, PRD 등) |
| `/pdca status` | 현재 진행 상태 확인 |
| `/pdca next` | 다음 단계 안내 |

이 튜토리얼 7장의 `/plan`, 9장의 `/check`는 각각 `/pdca plan`, `/pdca analyze`의 단축 표현입니다.

<details>
<summary>스킬이 일반 대화와 다른 점</summary>

일반 대화는 Claude가 맥락 없이 응답합니다. 스킬은 다릅니다.

`/pdca plan login`을 실행하면:

```txt
/pdca plan login 입력
  ↓
bkit이 기획 모드로 전환
  ↓
요구사항 인터뷰 (무엇을 만들지 단계별로 질문)
  ↓
계획 문서 자동 생성 (docs/01-plan/ 폴더에 저장)
  ↓
체크포인트 — 진행할지 승인 요청
```

스킬은 `.claude/` 폴더 안의 파일로 정의되어 있습니다. `/bkit`을 입력하면 사용 가능한 전체 명령어 목록을 볼 수 있습니다.

</details>

### 개발 지원 스킬

| 명령어 | 역할 |
|--------|------|
| `/code-review <경로>` | 코드 품질·버그·베스트 프랙티스 검토 |
| `/zero-script-qa` | Docker 로그 기반 스크립트 없는 QA |
| `/development-pipeline` | 9단계 개발 파이프라인 전체 가이드 |
| `/rollback` | 체크포인트 생성 및 이전 상태 복원 |
| `/btw <제안>` | 작업 중 개선 아이디어 즉시 수집 |

### 프로젝트 초기화 스킬

| 명령어 | 역할 |
|--------|------|
| `/starter init <이름>` | 정적 웹 프로젝트 시작 (HTML/CSS/Next.js) |
| `/dynamic init <이름>` | 풀스택 앱 시작 (bkend.ai BaaS 연동) |
| `/enterprise init <이름>` | 엔터프라이즈 시스템 시작 (K8s/Terraform) |

### 학습·설정 스킬

| 명령어 | 역할 |
|--------|------|
| `/claude-code-learning` | Claude Code 설정 및 사용법 학습 |
| `/skill-status` | 현재 로드된 스킬 목록 확인 |
| `/bkit` | bkit 전체 명령어 도움말 보기 |

---

## PDCA 파이프라인

각 단계가 문서를 남기고, 그 문서가 다음 단계의 입력이 됩니다.

| 단계 | 산출물 | 명령어 |
|------|--------|--------|
| PM Analysis | 요구사항 문서, 페르소나 | `/pdca pm` |
| Plan | 계획 문서 | `/pdca plan` |
| Design | 설계 문서 (DB 스키마, API, 컴포넌트) | `/pdca design` |
| Do | 실제 구현 | `/pdca do` |
| Analyze(Check) | 갭 분석 보고서 | `/pdca analyze` |
| Act | 개선 기록 + 다음 사이클 준비 | (직접 기록) |

이 튜토리얼은 Plan → Do → Analyze → Act 네 단계만 다뤘습니다. 전체 파이프라인은 Dynamic 레벨부터 본격적으로 활용됩니다.

---

## 프로젝트 레벨

bkit은 프로젝트 규모에 따라 세 레벨로 구분합니다.

### Starter

- 오픈소스 레포 커스터마이징
- 간단한 정적 사이트 (지금 이 튜토리얼)
- 주로 쓰는 스킬: `/plan`, `/check`
- 파이프라인: Plan → Do → Check → Act

### Dynamic

- API 연동이 있는 서비스
- 사용자 인증 (로그인/회원가입)
- 데이터베이스 연동
- 주로 쓰는 스킬: `/plan`, `/design`, `/check`
- 파이프라인: PM → Plan → Design → Do → Check → Act

### Enterprise

- 마이크로서비스 아키텍처
- CI/CD 파이프라인
- 보안 요구사항 (OWASP, 인증/인가)
- 대규모 팀 협업
- 전체 9단계 파이프라인

---

## 언제 다음 레벨로 가나요

다음 상황이 되면 Dynamic을 고려합니다.

- "사용자가 로그인해서 자기 데이터만 보여야 한다"
- "외부 API(날씨, 지도, 결제 등)를 연결해야 한다"
- "서버에 데이터를 저장하고 여러 기기에서 접근해야 한다"

지금 만든 라이프 위키 수준에서는 Starter로 충분합니다.
