---
title: "3장. 오픈소스 가져오기 — Fork & Clone"
chapter: 3
order: 0
track: 필수
description: "오픈소스 레포를 내 GitHub 계정으로 Fork하고 내 컴퓨터로 Clone합니다."
status: 공개
---

> **필수 30분 코스** — 이 장부터 실습이 시작됩니다.

## 이번 장에서 할 것

1. `selfishclub/aaa-starter-kit` 레포를 내 GitHub 계정으로 Fork합니다.
2. Fork한 레포를 내 컴퓨터 `life-wiki` 폴더로 Clone합니다.
3. 가져온 파일 구조를 파악합니다.

---

## 1단계. 라이센스 확인하기

저장소 주소로 들어갑니다.

```txt
https://github.com/selfishclub/aaa-starter-kit
```

오른쪽 사이드바에서 라이센스 항목을 확인합니다. **MIT License**라고 표시되어 있으면 자유롭게 가져와서 수정할 수 있습니다.

<details>
<summary>라이센스 종류가 궁금하다면</summary>

오픈소스 저장소마다 라이센스가 다르고, 그에 따라 사용 범위가 달라집니다.

| 라이센스 | 상업적 이용 | 수정 | 재배포 | 조건 |
|----------|-------------|------|--------|------|
| MIT | 가능 | 가능 | 가능 | 저작권 표시 유지 |
| Apache 2.0 | 가능 | 가능 | 가능 | 저작권 + 특허 조항 |
| GPL | 가능 | 가능 | 조건 있음 | 수정 배포 시 동일 라이센스 |
| CC BY-NC | 불가 | 가능 | 가능 | 비상업적 용도만 |
| 라이센스 없음 | 불가 | 불가 | 불가 | 저작권법 기본 적용 |

**MIT가 가장 자유롭습니다.** 저작권 표시만 유지하면 수정, 재배포, 상업적 이용 모두 가능합니다.

</details>

---

## 2단계. Fork하기

1. 오른쪽 위 **`Fork`** 버튼을 누릅니다.
2. Fork할 계정을 선택합니다. 내 개인 계정을 선택합니다.
3. **`Create fork`** 버튼을 누릅니다.
4. 주소가 바뀐 것을 확인합니다.

```txt
Fork 전: github.com/selfishclub/aaa-starter-kit
Fork 후: github.com/내-아이디/aaa-starter-kit
```

<details>
<summary>Fork와 Clone이 뭔지 궁금하다면</summary>

**Fork**는 GitHub 안에서 일어나는 일입니다. 다른 사람의 저장소를 내 GitHub 계정 아래로 복사합니다.

**Clone**은 GitHub에서 내 컴퓨터로 내려받는 일입니다.

```txt
Fork → 내 GitHub 계정에 저장소 생성
Clone → 그 저장소를 내 컴퓨터로 내려받기
```

**Fork하면 원본이 바뀔 때 내 것도 바뀌나요?**

아닙니다. Fork는 자동으로 동기화되지 않습니다. 내 입맛대로 마음껏 수정해도 됩니다.

</details>

---

## 3단계. Clone하기

Antigravity 채팅창에 입력합니다.

```txt
내 GitHub에 있는 aaa-starter-kit 저장소를
지금 열린 life-wiki 폴더 안으로 clone 해줘.
```

Clone이 끝나면 왼쪽 파일 탐색기에 파일들이 채워집니다.

<details>
<summary>GitHub 로그인 오류가 났다면</summary>

```txt
GitHub CLI 로그인이 필요한지 확인하고, 필요하면 로그인 과정 안내해줘.
```

터미널에서 직접 Clone하는 방법:

```bash
git clone https://github.com/내-아이디/aaa-starter-kit.git
```

</details>

---

## 4단계. 파일 구조 파악하기

```txt
방금 clone한 폴더 구조를 보여주고,
각 폴더가 어떤 역할인지 한 줄씩 설명해줘.
```

주요 폴더와 파일입니다.

| 경로 | 역할 |
|------|------|
| `journal/` | 비공개 회고. 사이트에 올라가지 않습니다. |
| `src/content/blog/` | 공개 블로그 글. 사이트에 표시됩니다. |
| `CLAUDE.md` | AI 동행자 지침서. 내 정보를 여기 설정합니다. |
| `.claude/commands/` | 슬래시 명령어 파일 보관소. |
| `astro.config.mjs` | 사이트 기본 설정. Vercel URL을 나중에 여기 넣습니다. |

---

## 이번 장에서 확인한 것

1. MIT 라이센스 확인 → Fork → Clone 순서로 진행했습니다.
2. Fork한 내 저장소는 원본과 자동 동기화되지 않습니다.
3. 파일 구조에서 `journal/`(비공개)과 `src/content/blog/`(공개)의 차이를 확인했습니다.

## 다음 장에서 할 것

`CLAUDE.md`를 내 이름과 상황에 맞게 수정합니다.
