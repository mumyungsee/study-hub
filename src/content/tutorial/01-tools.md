---
title: "1장. 우리가 쓸 도구 5가지"
chapter: 1
order: 0
track: 필수
description: "Antigravity, Claude Code, bkit, GitHub, Vercel이 각각 어떤 역할을 하는지 한 줄로 정리합니다."
status: 초안
---

이 튜토리얼에서는 도구를 다섯 가지 사용합니다. 지금 이름을 모두 외울 필요는 없습니다. 어느 순간에 어떤 도구가 등장하는지만 알면 됩니다.

## 한눈에 보기

| 도구 | 역할 | 언제 쓰나 |
|------|------|---------|
| **Antigravity** | AI와 함께 작업하는 공간 | 파일 수정, 명령 실행할 때 |
| **Claude Code** | 파일을 읽고 만들고 수정하는 AI | 채팅창에 요청할 때 |
| **bkit** | 계획-실행-확인 흐름을 잡아주는 도구 | `/plan`, `/check` 같은 명령을 쓸 때 |
| **GitHub** | 오픈소스 레포를 가져오고 내 작업을 저장하는 곳 | Fork, Push, Clone할 때 |
| **Vercel** | GitHub에 올라간 코드를 웹사이트로 배포하는 서비스 | Push하면 자동으로 동작 |

## 전체 흐름

```
GitHub에서 오픈소스 레포 가져오기 (Fork + Clone)
  ↓
Antigravity에서 Claude Code에게 수정 요청
  ↓
bkit으로 계획하고 점검
  ↓
GitHub에 Push
  ↓
Vercel이 웹사이트로 자동 배포
```

도구 이름이 낯설어도 괜찮습니다. 다음 장부터 하나씩 실제로 써보면서 익힙니다.

## 다음 장에서 할 것

GitHub와 Vercel 계정을 만들고 Antigravity에서 작업 폴더를 여는 준비를 합니다.
