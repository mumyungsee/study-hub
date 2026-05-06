# /submit — 사례글 인터뷰 + PR 제출

## 역할

수강생이 "미션 제출해줘" 또는 `/submit`을 입력하면,
인터뷰를 통해 다른 사람도 따라할 수 있는 **구체적인 사례글**을 작성하고 PR로 제출합니다.

---

## 실행 순서

### 1. 컨텍스트 수집 (자동, 사용자 입력 없음)

다음을 읽어서 수강생이 실제로 한 작업을 파악합니다:

```bash
git log --oneline -20          # 어떤 작업을 했는지
git diff main..HEAD --stat     # 어떤 파일을 바꿨는지
```

변경된 주요 파일도 읽어서 무엇을 만들었는지 구체적으로 파악합니다.

### 2. 인터뷰 시작

수집한 컨텍스트를 바탕으로 자연스럽게 대화합니다.
한 번에 하나씩, AskUserQuestion으로 질문합니다.

**질문 흐름 (순서대로):**

1. "GitHub 아이디가 뭐예요? (사례글에 들어갑니다)"

2. "[git log 내용 언급하며] 작업 내역을 보니 ~을 하셨네요. 전체 흐름을 간단히 얘기해주시겠어요? 어디서 시작해서 어떻게 마무리했는지요."

3. "진행하면서 막혔던 부분이 있었나요? 어떻게 해결하셨어요?" (없으면 건너뛰기)

4. "완성된 사이트 URL이 있으면 알려주세요. (없으면 건너뛰어도 됩니다)"

5. "이 과정에서 가장 인상 깊었던 것이나 배운 점이 있으면 말씀해주세요."

6. "이 사례를 보고 따라할 사람에게 미리 알려주고 싶은 게 있나요? 팁이나 주의사항 같은 것들."

### 3. 사례글 작성

인터뷰 답변 + git 컨텍스트를 종합해서 사례글을 작성합니다.

**사례글 형식:**

```markdown
---
mission: 1
title: "나만의 라이프 위키 만들기"
author: "[student_github]"
deployed_url: "[배포 URL]"
date: "[오늘 날짜]"
---

# [student_github]의 라이프 위키 만들기 사례

## 한 줄 요약
[핵심 경험을 한 문장으로]

## 나는 누구인가
[수강생이 밝힌 배경 — 개발 경험 여부, 왜 시작했는지 등. 없으면 생략]

## 어떻게 진행했나

### 1단계: [실제 한 것]
[구체적인 행동 — 어디서 클릭했고, 뭘 입력했고, 어떻게 됐는지]

### 2단계: [실제 한 것]
[...]

## 막혔던 부분과 해결 방법
[있을 때만 — 어디서 막혔고 어떻게 해결했는지. 다음 사람에게 가장 유용한 부분]

## 결과
- 배포 URL: [url]
- [git log 기반으로 실제로 완성한 것들 목록]

## 배운 것
[인터뷰에서 나온 인사이트를 수강생 말투 그대로]

## 다음에 해볼 것 / 따라하는 분께 드리는 팁
[있을 때만]
```

**작성 원칙:**
- 수강생 말투 그대로 살리기 (AI 톤 금지)
- 추상적 소감보다 구체적 장면 위주
- 막힌 부분 + 해결 방법이 핵심 — 다음 사람에게 가장 유용
- git 내역 기반으로 "실제로 한 것"을 정확하게

### 4. 검토 및 수정

작성한 사례글을 보여주고 AskUserQuestion:
"이렇게 작성했어요. 수정할 부분이 있나요?"

수정 요청 있으면 해당 부분만 고치고 다시 확인.

### 5. 저장 + PR 제출

사례글 파일만 딱 담은 클린 브랜치로 PR을 생성합니다.
이미 제출한 적 있으면 같은 브랜치를 업데이트해서 기존 PR에 자동 반영합니다.

먼저 제출 브랜치가 이미 있는지 확인합니다:
```bash
git branch --list submit/mission-01-[student_github]
```

**처음 제출 (브랜치 없음):**
```bash
ORIGINAL=$(git branch --show-current)
git fetch https://github.com/INSTRUCTOR_REPO.git main
git checkout -b submit/mission-01-[student_github] FETCH_HEAD
git checkout $ORIGINAL -- 00_missions/mission-01-[student_github].md
git add 00_missions/mission-01-[student_github].md
git commit -m "사례글 제출: mission-01-[student_github]"
git push origin submit/mission-01-[student_github]
gh pr create \
  --repo INSTRUCTOR_REPO \
  --head [student_github]:submit/mission-01-[student_github] \
  --base main \
  --title "미션 1 사례글: [student_github]" \
  --body "..."
git checkout $ORIGINAL
```
완료 안내: "PR을 생성했습니다. [PR URL] 강사가 확인하면 갤러리에 게시됩니다."

**수정 재제출 (브랜치 이미 있음):**
```bash
ORIGINAL=$(git branch --show-current)
git checkout submit/mission-01-[student_github]
git checkout $ORIGINAL -- 00_missions/mission-01-[student_github].md
git add 00_missions/mission-01-[student_github].md
git commit -m "사례글 수정: mission-01-[student_github]"
git push origin submit/mission-01-[student_github]
git checkout $ORIGINAL
```
완료 안내: "기존 PR이 업데이트됐습니다. 강사가 아직 승인 전이면 수정 내용이 반영됩니다."

---

## 강사 레포 주소

INSTRUCTOR_REPO=mumyungsee/aaa-starter-kit

## 오류 처리

- `gh` 로그인 안 됨 → "`gh auth login`을 먼저 실행해주세요" 안내
- push 실패 → 오류 메시지 그대로 보여주고 원인 설명
