# /gallery — 수강생 사례 갤러리 등록 (강사용)

## 역할

승인된 미션 사례글을 갤러리에 게시합니다.
`00_missions/`의 파일을 `src/content/gallery/`로 이동해서 사이트에 공개합니다.

## 실행 순서

### 1. 등록 가능한 파일 목록 확인

`00_missions/` 폴더에서 제출 파일 목록 표시 (`template/` 제외):

```
등록 가능한 사례:
1. mission-01-홍길동.md (@홍길동, 미션 1)
2. mission-01-kimtest.md (@kimtest, 미션 1)
...
```

없으면 "등록할 사례가 없습니다" 안내 후 종료.

### 2. 등록할 파일 선택

AskUserQuestion: "어떤 사례를 갤러리에 등록할까요? 번호를 입력해주세요."

### 3. 파일 이동 + 메타데이터 보정

선택한 파일을 읽어서:
- `date` 필드가 없으면 오늘 날짜로 채우기
- `src/content/gallery/` 로 복사
- `00_missions/` 원본은 그대로 유지 (제출 기록 보존)

### 4. 커밋 + push

```bash
git add src/content/gallery/
git commit -m "갤러리 등록: [파일명]"
git push origin [현재브랜치]
```

Vercel이 자동 배포하면 사이트에 즉시 반영됩니다.

### 5. 완료 안내

"갤러리에 등록됐습니다. 잠시 후 /gallery 페이지에서 확인하세요."
