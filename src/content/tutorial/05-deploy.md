---
title: "5장. Push & 배포 — 내 사이트 만들기"
chapter: 5
order: 0
track: 필수
description: "GitHub에 Push하고 Vercel로 배포해서 내 사이트 URL을 받습니다."
status: 공개
---

> **필수 코스 — 마지막 단계**

## 이번 장에서 할 것

1. 저장소를 Private으로 바꿉니다.
2. 지금까지 작업을 커밋하고 GitHub에 Push합니다.
3. Vercel에 연결해서 배포합니다.
4. 내 사이트 URL을 받습니다.

---

## 1단계. 저장소 Private으로 바꾸기

브라우저에서 내 저장소 페이지로 들어갑니다.

```txt
github.com/내-아이디/aaa-starter-kit
```

1. **`Settings`** 탭을 누릅니다.
2. 맨 아래 `Danger Zone`에서 **`Change repository visibility`** 를 누릅니다.
3. **`Make private`** 을 선택하고 확인합니다.

<details>
<summary>왜 Private으로 바꿔야 하나요?</summary>

라이프 위키에는 공개 블로그 글과 비공개 회고가 함께 있습니다. `journal/` 폴더는 사이트에 표시되지 않도록 설계되어 있지만, 저장소 자체가 Public이면 누구나 파일을 직접 볼 수 있습니다.

Private 저장소도 Vercel과 연결해서 배포할 수 있습니다. 무료 플랜에서도 가능합니다.

</details>

---

## 2단계. 커밋하고 Push하기

채팅창에 입력합니다.

```txt
지금까지 변경된 파일을 확인하고,
문제가 없으면 적절한 커밋 메시지로 커밋한 다음 GitHub에 push해줘.
```

Push가 끝나면 GitHub 저장소 페이지를 새로 고침해서 파일이 올라갔는지 확인합니다.

<details>
<summary>커밋이 뭔지 궁금하다면</summary>

커밋은 지금 이 순간의 파일 상태를 저장하는 것입니다. "지금 이 상태를 기록해둔다"는 의미입니다.

커밋을 하면 나중에 이 시점으로 되돌아올 수 있고, 무엇을 언제 바꿨는지 기록이 남습니다.

터미널에서 직접 하는 방법:

```bash
git add .
git commit -m "CLAUDE.md 수정"
git push
```

</details>

<details>
<summary>Push = 백업 + 버전 관리</summary>

Push를 하면 두 가지가 동시에 일어납니다.

**백업:** 내 컴퓨터에만 있던 파일이 GitHub에도 저장됩니다. 컴퓨터가 망가지거나 파일을 실수로 지워도 GitHub에서 복구할 수 있습니다.

**버전 관리:** 커밋할 때마다 그 시점의 상태가 기록됩니다. GitHub 저장소에서 `Commits` 탭을 보면 언제 무엇을 바꿨는지 전체 이력이 남아 있습니다.

```txt
github.com/내-아이디/aaa-starter-kit/commits
```

특정 시점으로 되돌리고 싶을 때는 Claude에게 이렇게 말합니다.

```txt
git log 보여줘. 어떤 커밋들이 있는지 확인하고 싶어.
```

```txt
[커밋 메시지] 시점으로 되돌려줘.
```

</details>

<details>
<summary>Push 오류가 났다면</summary>

```txt
GitHub Push 중 오류가 났어. 오류 메시지 확인하고 해결해줘.
```

처음 Push할 때 GitHub CLI 로그인이 필요할 수 있습니다.

```txt
GitHub CLI 로그인 상태 확인하고, 안 되어 있으면 로그인해줘.
```

</details>

---

## 3단계. Vercel 배포하기

브라우저에서 `https://vercel.com`으로 들어갑니다.

1. **`Add New...`** → **`Project`** 를 누릅니다.
2. **`Import Git Repository`** 에서 내 `aaa-starter-kit` 저장소를 찾습니다.
3. **`Import`** 를 누릅니다.
4. 설정은 기본값 그대로 두고 **`Deploy`** 를 누릅니다.
5. 배포가 완료되면 URL이 나타납니다.

```txt
https://aaa-starter-kit-내이름.vercel.app
```

<details>
<summary>저장소가 목록에 안 보인다면</summary>

Vercel이 내 GitHub 계정에 접근하도록 권한을 부여하지 않았을 수 있습니다.

`Add New... → Project` 화면에서 `Adjust GitHub App Permissions` 또는 `Configure GitHub App`을 찾아서 내 저장소에 접근 권한을 추가합니다.

</details>

---

## 4단계. URL을 코드에 적용하기

배포 후 받은 URL을 사이트 설정에 넣어야 합니다.

```txt
Vercel에서 받은 URL이 [내 URL]이야.
이걸 astro.config.mjs에 적용하고 push해줘.
```

Push하면 Vercel이 자동으로 사이트를 다시 빌드합니다.

---

## 완료

브라우저에서 내 URL로 들어가서 사이트가 열리는지 확인합니다.

사이트가 열리면 **필수 코스가 끝났습니다.**

이어서 심화 코스로 넘어갑니다.

---

## 다음 장에서 할 것 (심화 코스)

레포를 직접 써봅니다. 일간 회고를 쓰고 블로그 초안을 만들면서 어떤 부분을 바꾸고 싶은지 발견합니다.
