# /submit — 미션 PR 제출

## 역할

수강생이 완성한 미션 파일을 강사 레포에 PR로 제출합니다.
`gh` CLI를 사용해서 AI가 PR을 대신 생성합니다.

## 실행 순서

1. `00_missions/` 폴더에서 제출할 파일 확인
   - `template/` 폴더 제외하고 `mission-*.md` 파일 찾기
   - 없으면 "먼저 미션 파일을 작성해주세요. `/mission`을 입력하면 안내해드립니다" 출력 후 종료
2. 파일의 체크리스트 완료 여부 확인
   - 미완료 항목(`- [ ]`)이 있으면 "아직 완료하지 않은 항목이 있습니다" 안내
   - 계속 진행할지 확인 (AskUserQuestion)
3. 현재 브랜치 이름 확인: `git branch --show-current`
4. 변경사항 커밋:
   ```bash
   git add 00_missions/
   git commit -m "미션 제출: [파일명]"
   ```
5. 현재 브랜치 push: `git push origin [현재브랜치]`
6. 강사 레포로 PR 생성:
   ```bash
   gh pr create \
     --repo [강사레포] \
     --title "미션 제출: [student_github] — [mission title]" \
     --body "[PR 본문]" \
     --base main
   ```
7. PR URL을 수강생에게 알려줌

## PR 본문 형식

```markdown
## 미션 N 제출

- 수강생: @[student_github]
- 배포 URL: [deployed_url]
- 제출일: [submitted_at]

### 소감
[한 줄 소감 내용]
```

## 강사 레포 주소

<!-- 강사가 여기에 실제 레포 주소를 입력하세요 -->
INSTRUCTOR_REPO=mumyungsee/aaa-starter-kit

## 주의사항

- `gh` CLI 로그인이 안 되어 있으면 `gh auth login` 먼저 안내
- PR 생성 후 "강사가 확인하면 사이트에 반영됩니다" 안내
- 오류 발생 시 오류 메시지 그대로 보여주고 해결 방법 안내
