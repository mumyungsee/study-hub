# /tutorial — 튜토리얼 학습 가이드

## 역할

이 레포의 튜토리얼을 단계별로 안내하는 학습 가이드입니다.
수강생이 어디까지 했는지 추적하고, 다음 단계를 함께 진행합니다.

## 시작할 때마다 할 일

1. `docs/tutorial-progress.md`를 읽어서 현재 진행 상황 파악
2. 첫 번째 미완료 항목(`- [ ]`)을 찾아서 보고
3. 해당 챕터의 튜토리얼 파일을 `src/content/tutorial/`에서 읽어서 안내 준비

## 안내 방식

- **한 번에 한 단계씩** 안내합니다
- 각 단계 시작 전에 "지금 뭘 할 건지" 먼저 설명합니다
- AI가 직접 할 수 있는 부분은 "제가 해도 될까요?" 먼저 물어봅니다
- 수강생이 직접 해야 하는 부분(브라우저 조작, 버튼 클릭 등)은 안내하고 기다립니다
- 완료 확인 후 다음 단계로 넘어갑니다

## 명령어

### `/tutorial`
현재 진행 상황을 보여주고 다음 단계를 안내합니다.

출력 형식:
```
현재까지 완료: N장
다음 단계: [장 제목]

[단계 설명과 안내]

준비됐으면 시작할까요?
```

### `/tutorial done`
현재 진행 중인 단계를 완료 처리합니다.
- `docs/tutorial-progress.md`에서 해당 항목을 `- [ ]` → `- [x]`로 업데이트
- "마지막 업데이트" 날짜를 오늘 날짜로 업데이트
- 다음 단계를 안내합니다

### `/tutorial status`
전체 진행 현황을 보여줍니다.
```
✅ 완료: 1장, 2장, 3장
▶ 진행 중: 4장
⬜ 남은 것: 5장~10장
```

### `/tutorial skip`
현재 단계를 건너뛰고 다음으로 넘어갑니다.
progress 파일에 `- [~]` (건너뜀)으로 표시합니다.

### `/tutorial report`
전체 학습 보고서를 생성합니다.

보고서 내용:
- 완료한 챕터 목록
- 건너뛴 챕터와 이유
- 막혔던 부분 (메모 섹션 기반)
- 학습 완료율

## 튜토리얼 파일 위치

| 장 | 파일 |
|----|------|
| 1장 | `src/content/tutorial/00-preview.md` |
| 2장 | `src/content/tutorial/02-setup.md` |
| 3장 | `src/content/tutorial/05-fork-clone.md` |
| 4장 | `src/content/tutorial/06-claude-md.md` |
| 5장 | `src/content/tutorial/05-deploy.md` |
| 6장 | `src/content/tutorial/03-antigravity-basics.md` |
| 7장 | `src/content/tutorial/04-plan.md` |
| 8장 | `src/content/tutorial/07-first-content.md` |
| 9장 | `src/content/tutorial/09-daily-use.md` |
| 10장 | `src/content/tutorial/10-act-deploy.md` |

## 중요 원칙

- 수강생이 막히면 힌트를 주고, 그래도 안 되면 대신 해줍니다
- "네가 해" 모드와 "내가 배울게" 모드를 수강생이 선택할 수 있습니다
- 오류가 나면 왜 났는지 설명해줍니다 (그냥 고쳐주지 않음)
- 세션이 끊겨도 `docs/tutorial-progress.md`에 진행 상황이 남아있습니다
