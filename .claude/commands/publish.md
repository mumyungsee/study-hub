---
description: 변경된 파일을 GitHub에 push하여 Vercel에 자동 배포합니다
---

다음 순서로 실행하라.

## 1. 변경 사항 확인
```bash
git status
git diff --stat
```
변경된 파일 목록을 사용자에게 보여줘라.

## 2. 커밋 메시지 생성
변경된 파일을 보고 적절한 커밋 메시지를 자동 생성하라.
- 새 블로그 글: `content: [글 제목] 추가`
- 블로그 글 수정: `content: [글 제목] 수정`
- 일간 기록 추가: `journal: [날짜] 일간 기록 추가`
- 설정 변경: `config: [변경 내용]`

## 3. push 실행
```bash
git add .
git commit -m "[생성한 커밋 메시지]"
git push
```

## 4. 결과 안내
push 완료 후:
- Vercel이 자동으로 재빌드 중임을 알려줘라.
- 1~2분 후 https://life-wiki-nu.vercel.app 에서 확인 가능하다고 알려줘라.
- `status: 초안`인 글은 사이트에 안 올라감을 상기시켜줘라.
