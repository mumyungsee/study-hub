# /submit — 미션 PR 제출

## 역할

수강생이 "미션 제출해줘" 또는 `/submit`을 입력하면 AI가 모든 걸 처리합니다.
파일 생성부터 PR 제출까지 자동으로 진행합니다.

## 실행 순서

### 1. 기존 미션 파일 확인

`00_missions/` 폴더에서 `mission-*.md` 파일 탐색 (`template/` 제외).

**파일 있으면**: 내용 확인 후 3단계로 이동
**파일 없으면**: 2단계 진행

### 2. 미션 파일 자동 생성 (파일 없을 때)

AskUserQuestion으로 순서대로 질문:

1. "GitHub 아이디가 뭐예요?" → `student_github` 값
2. "배포된 사이트 주소가 있으면 알려주세요 (없으면 '없음')" → `deployed_url` 값
3. "미션 완료 체크리스트를 같이 확인해볼까요?" → 항목별로 완료 여부 확인
4. "한 줄 소감을 남겨주세요" → `소감` 값
5. "막혔다가 해결한 부분이 있으면 적어주세요 (없으면 건너뛰어도 돼요)" → 선택

수집한 정보로 `00_missions/template/mission-01.md`를 복사해서
`00_missions/mission-01-[student_github].md` 생성 후 내용 채우기

### 3. 내용 최종 확인

파일 내용을 보여주고 AskUserQuestion: "이대로 제출할까요?"
- 수정 필요하면 해당 부분 바로 수정
- 확인되면 4단계 진행

### 4. 커밋 + PR 생성

```bash
git add 00_missions/
git commit -m "미션 제출: mission-01-[student_github]"
git push origin [현재브랜치]
```

```bash
gh pr create \
  --repo INSTRUCTOR_REPO \
  --title "미션 1 제출: [student_github]" \
  --body "[PR 본문]" \
  --base main
```

### 5. 완료 안내

PR URL을 알려주고: "강사가 확인하면 승인됩니다. 그 전까지는 PR 페이지에서 진행 상황을 볼 수 있어요."

---

## 강사 레포 주소

INSTRUCTOR_REPO=mumyungsee/aaa-starter-kit

## PR 본문 형식

```markdown
## 미션 1 제출

- 수강생: @[student_github]
- 배포 URL: [deployed_url]
- 제출일: [오늘 날짜]

### 완료 항목
[체크리스트 내용]

### 소감
[한 줄 소감]
```

## 오류 처리

- `gh` 로그인 안 됨 → "먼저 `gh auth login`을 실행해주세요" 안내 후 종료
- push 실패 → 오류 메시지 그대로 보여주고 원인 설명
