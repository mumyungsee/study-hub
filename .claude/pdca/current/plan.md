# 온보딩 설문조사 설계 플랜 — study-hub

## Context

"챗봇만 써본 당신을 위한 본격 AI 온보딩 스터디" (4주, 매주 수요일 9PM~11PM) 운영을 위해
수강생 사전 설문조사가 필요함. 강사가 수강생 수준/목표를 파악하고 맞춤 운영할 수 있게.

현재 `/onboarding/survey/` 페이지는 placeholder 상태.
Google Form을 만들어 iframe으로 임베드하는 방식으로 구현 예정.

---

## 설문 항목 설계

### 섹션 1: 기본 정보
| 항목 | 형식 | 내용 |
|------|------|------|
| 지피터스 닉네임 | 단답형 | "지피터스에서 사용하는 닉네임을 입력해주세요" |
| 지피터스 가입 이메일 | 단답형 | "지피터스 가입 시 사용한 이메일을 입력해주세요" |
| 참여 형태 | 단일 선택 | 수강 / 청강 |

### 섹션 2: 현재 수준 파악

**AI 도구 경험** (단일 선택 — 가장 고급 단계로 선택)
- 거의 안 써봤어요
- 챗봇류 (ChatGPT, Claude, Gemini 등 웹 채팅)
- IDE형 AI (VS Code + AI 확장, Cursor, Windsurf, Antigravity 등)
- 터미널 기반 AI (Claude Code, codex 등)
- AI 에이전트 (OpenClaw(오픈클로), Hermes 등 자율 실행형)

### 섹션 3: 이 스터디에서 얻고 싶은 것 (복수 선택)
- AI 도구를 처음부터 제대로 입문하고 싶어서
- 바이브코딩 환경 세팅 + 실제로 뭔가 만들어보기
- bkit으로 AI 스킬/워크플로우/하네스 써보기
- OpenClaw(오픈클로) 같은 자율형 AI 에이전트 다뤄보기
- 중급/고급 스터디를 위한 선수지식 채우기
- 기타 (자유 서술)

### 섹션 4: 자기소개 (자유 서술)
- "간단히 자기소개 해주세요. 어떤 일을 하시나요? 이 스터디를 신청하게 된 계기도 함께요." (장문)

---

## Google Form 만드는 법 (강사 가이드)

1. Google Forms에서 새 폼 생성
2. 설정 → "이메일 주소 수집" 체크, "로그인 필요" 체크
3. 위 항목 순서대로 질문 추가
4. 완성 후 보내기 → `<>` 탭 → iframe 코드 복사
5. 높이는 `800px` 권장

---

## 구현: survey.astro 업데이트

**파일:** `src/pages/onboarding/survey.astro`

Google Form iframe 코드 받으면 placeholder를 아래로 교체:

```html
<div class="form-wrap">
  <iframe
    src="[Google Form 임베드 URL]"
    width="100%"
    height="800"
    frameborder="0"
    marginheight="0"
    marginwidth="0"
  >
    로딩 중...
  </iframe>
</div>
```

---

## 현재 사이드바 구조 (구현 완료)

```
온보딩
  ├ 스터디 소개 [준비 중]
  ├ 이 스터디 사용법 [준비 중]
  └ 사전 설문조사
환경 세팅
  ├ Antigravity 설치 [준비 중]
  └ Claude Code 설치 [준비 중]
라이프 위키 만들기 (필수)
심화
부록
```

---

## 다음 단계

1. 강사가 Google Form 만들고 iframe 코드 공유 → survey.astro에 적용
2. 온보딩 > 스터디 소개 페이지 콘텐츠 작성
3. 온보딩 > 이 스터디 사용법 페이지 콘텐츠 작성
4. study-hub 레포로 이 사이트 분리 + Vercel 배포
