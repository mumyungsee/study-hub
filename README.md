# AI 스터디 허브

> 챗봇만 써본 비개발자가 AI랑 같이 일하는 법을 배우는 곳.

운영: **아루나**
대상: AI 챗봇만 써본 비개발자 (바이브코딩 직전까지 끌어주기)
배포: https://study-hub-eta-olive.vercel.app

---

## 이 사이트가 다루는 것

**AI 메타학습이 본질.** 도구는 시즌 한정으로 바뀌어도, AI랑 잘 협업하는 능력은 평생 간다는 전제로 만든 수업 자료.

| 섹션 | 내용 |
|---|---|
| **온보딩** | 스터디 소개, 용어 정리, 학습법, 역할 배정 |
| **환경 세팅** | VS Code · Claude Code · Node.js · bkit 설치법 |
| **튜토리얼** | "라이프 위키 만들기" 실습 가이드 (수강생이 별도 레포로 진행) |
| **수강생 사례** *(준비 중)* | 갤러리 — 추후 활성화 예정 |

---

## 라이프 위키 (별도 레포)

수강생 실습용 레포는 **이 사이트랑 분리된 별도 저장소**.

- 튜토리얼이 그 레포 Fork → Clone → 실습을 안내함
- 수강생은 본인 GitHub에 Fork해서 자기 손으로 채워나감
- 일간 회고·블로그 시스템이 들어있음
- 링크는 튜토리얼 본문 참조

> **나중에 할 일**: 수강생이 본인 라이프 위키에 푸시한 결과물을 이 사이트 갤러리에 자동 노출시키는 시스템 (두 레포 연결). 별도 작업으로 분리.

---

## 폴더 구조

```
study-hub/
├── src/
│   ├── pages/             # 라우팅
│   │   ├── onboarding/    # 온보딩 페이지들 (.astro)
│   │   ├── setup/         # 환경 세팅 페이지들 (.astro)
│   │   ├── tutorial/      # 튜토리얼 라우팅
│   │   ├── gallery/       # 갤러리 라우팅 (준비 중)
│   │   ├── blog/          # 블로그 라우팅 (보존, 추후 공지용으로 부활 가능)
│   │   └── index.astro    # 홈
│   ├── content/
│   │   ├── tutorial/      # 튜토리얼 본문 (.md)
│   │   ├── gallery/       # 수강생 사례글 (.md, 추후 등록)
│   │   └── blog/          # 블로그 글 (.md, 보존)
│   ├── components/
│   ├── layouts/
│   ├── config/
│   │   └── nav.ts         # 글로벌 네비·섹션 정의
│   └── scripts/
│       └── glossary-tooltip.ts  # 용어 툴팁 시스템 (공용)
│
├── 00_missions/           # 수강생 미션 시스템 (현재 비활성, 추후 부활)
│   ├── README.md
│   └── template/
├── 01_gallery/            # 갤러리 강사 운영 가이드 (현재 비활성)
│   └── README.md
│
├── docs/                  # 운영 문서 (계획서·메모 등)
├── public/                # 정적 파일
└── astro.config.mjs
```

---

## 로컬에서 실행

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 빌드 검증
```

---

## 배포

- GitHub `main`에 push → Vercel 자동 빌드·배포
- 운영 URL: https://study-hub-eta-olive.vercel.app

---

## 작업 가이드

이 프로젝트에서 AI(Claude 등)와 작업할 때는 [`CLAUDE.md`](./CLAUDE.md) 참고.

작업 중인 계획서·메모는 [`docs/`](./docs/) 폴더 참고:
- `meta-skills-plan.md` — AI 메타스킬 트랙 작업 계획
- `improvement-ideas.md` — 개선 아이디어
- `learning-philosophy-notes.md` — 학습 철학 메모
- `tutorial-progress.md` — 튜토리얼 진행 상태
