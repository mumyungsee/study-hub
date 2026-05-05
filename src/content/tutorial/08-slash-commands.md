---
title: "9장. 슬래시 명령어 자동화 세팅"
chapter: 9
order: 0
track: 선택
description: "자주 쓰는 요청을 슬래시 명령어로 만들어 매일 한 번에 실행할 수 있게 세팅합니다."
status: 공개
---

> **선택 2시간 코스**

## 이번 장에서 할 것

1. `.claude/commands/` 폴더 구조를 이해합니다.
2. 슬래시 명령어 파일 5개를 만듭니다.
3. Antigravity를 재시작해서 명령어가 활성화됐는지 확인합니다.

---

## 1단계. 명령어 파일 만들기

채팅창에 입력합니다.

```txt
.claude/commands/ 폴더에 슬래시 명령어 파일 5개를 만들어줘.
daily, weekly, monthly, blog, publish 명령어야.
각 파일 이름은 영문 소문자로 해줘.
```

Claude가 아래 파일들을 생성합니다.

```txt
.claude/commands/daily.md
.claude/commands/weekly.md
.claude/commands/monthly.md
.claude/commands/blog.md
.claude/commands/publish.md
```

<details>
<summary>.claude/commands/ 폴더가 뭔지 궁금하다면</summary>

Claude Code는 이 폴더 안의 `.md` 파일을 자동으로 슬래시 명령어로 등록합니다.

파일 이름이 명령어 이름이 됩니다. `daily.md`가 있으면 `/project:daily`로 호출됩니다.

파일 안에는 Claude에게 전달할 지침을 적습니다. "이 명령어를 실행하면 이렇게 해줘"라는 내용입니다.

**파일명은 영문이어야 합니다.** 한국어 파일명은 명령어로 인식되지 않습니다.

</details>

---

## 2단계. 각 명령어 내용 확인하기

만들어진 파일을 열어서 내용이 맞는지 확인합니다.

```txt
.claude/commands/ 폴더에 만들어진 파일 목록과 각 파일 내용을 보여줘.
```

내용이 마음에 들지 않는 부분이 있으면 수정을 요청합니다.

```txt
daily.md 내용을 이렇게 바꿔줘: [원하는 내용]
```

<details>
<summary>각 명령어가 어떤 역할인지</summary>

| 명령어 | 역할 |
|--------|------|
| `/project:daily` | 오늘 하루 회고 대화를 시작하고 `journal/`에 저장 |
| `/project:blog` | 회고 소재 후보에서 블로그 초안 작성 |
| `/project:weekly` | 최근 7일 일간 기록을 읽고 주간 회고 생성 |
| `/project:monthly` | 이번 달 주간 회고를 읽고 월간 회고 생성 |
| `/project:publish` | 변경된 파일을 커밋하고 GitHub에 Push |

</details>

---

## 3단계. Antigravity 재시작 후 확인하기

명령어 파일을 만든 뒤에는 Antigravity를 재시작해야 명령어 목록에 반영됩니다.

Antigravity를 재시작합니다.

재시작 후 채팅창에 `/`를 입력해서 명령어 목록이 뜨는지 확인합니다.

`daily`, `blog`, `publish` 등이 보이면 설정 완료입니다.

<details>
<summary>재시작 후에도 목록에 안 보인다면</summary>

```txt
.claude/commands/ 폴더에 파일이 있는지 다시 확인해줘.
파일명이 영문 소문자로 되어 있는지도 확인해줘.
```

파일은 있는데 목록에 없으면 Claude Code 버전 문제일 수 있습니다.

```txt
Claude Code 버전이 슬래시 명령어를 지원하는지 확인해줘.
```

</details>

---

## 이번 장에서 확인한 것

1. `.claude/commands/` 폴더 안의 `.md` 파일이 슬래시 명령어가 됩니다.
2. 파일명은 반드시 영문이어야 합니다.
3. 재시작 후 `/`를 눌러 목록에 뜨는지 확인합니다.

## 다음 장에서 할 것

만들어진 명령어를 실제로 매일 쓰는 방법을 정리합니다.
