# v2 Living Tutorial — 개발 계획

> v1.0(main)을 그대로 보존하고, v2 브랜치에서 진행합니다.
> v2는 머지 없이 독립된 버전으로 유지할 수 있습니다.

---

## 핵심 개념

수강생이 강사 레포를 Fork해서 작업한 뒤, AI한테 "PR 제출해줘"라고 말하면 AI가 PR을 대신 생성해 강사 레포로 보냅니다. 강사가 승인하면 갤러리·미션 결과물이 사이트에 반영됩니다.

```
수강생: Fork → 미션 작업 → "PR 제출해줘" (AI 처리)
강사:   PR 확인 → 승인 → 사이트 자동 반영
```

---

## 추가할 폴더 구조

```
00_missions/          ← 수강생 제출 미션
  template/           ← 미션 양식 (수강생이 복사해서 씀)
  README.md           ← 제출 방법 안내

01_gallery/           ← 완성된 결과물 전시
  template/
  README.md

02_skill_insight/     ← Q&A 축적 (강사가 쌓는 노하우)
  README.md
```

---

## 추가할 명령어

| 명령어 | 역할 |
|--------|------|
| `/mission` | 수강생이 현재 미션을 확인하고 시작 |
| `/submit` | 작업물을 PR로 강사 레포에 제출 (AI가 처리) |
| `/gallery` | 갤러리 등록용 PR 생성 |
| `/analyze` | 제출물 AI 분석 (강사용) |

---

## 개발 순서

### 1단계: 미션 구조 만들기
- [ ] `00_missions/` 폴더 + 양식 파일
- [ ] `00_missions/README.md` (수강생용 제출 안내)
- [ ] `.claude/commands/mission.md` (미션 안내 명령어)
- [ ] `.claude/commands/submit.md` (PR 제출 명령어)

### 2단계: 갤러리 구조 만들기
- [ ] `01_gallery/` 폴더 + 양식 파일
- [ ] 갤러리 Astro 페이지 (사이트에서 볼 수 있게)
- [ ] `.claude/commands/gallery.md`

### 3단계: Q&A 축적
- [ ] `02_skill_insight/` 폴더 구조
- [ ] 강사가 Q&A를 쌓는 방법 문서화

### 4단계: AI 분석 명령어
- [x] `.claude/commands/analyze.md` (제출물 분석 + 갤러리 등록 추천 + 피드백 초안)

---

## 결정사항 로그

| 날짜 | 결정 | 이유 |
|------|------|------|
| 2026-05-06 | Vercel 배포: v2 브랜치는 프리뷰 URL로 개발 진행 | v1(main) 배포에 영향 없이 독립 개발 가능 |
| 2026-05-06 | v2 완성 후 Vercel에 별도 프로젝트로 분리 배포 | v1·v2를 각자 독립된 URL로 운영 |
| 2026-05-06 | PDCA 문서 구조 없이 이 파일 하나로 관리 | v2 규모가 작아 bkit PDCA 오버헤드 불필요 |
| 2026-05-06 | **[강의 오픈 전 결정 필요]** v2를 기본 브랜치로 전환 | **왜 필요한가**: 수강생이 레포를 Fork할 때 GitHub은 자동으로 default branch(현재 main)를 기준으로 복사함. 즉 수강생 Fork에는 v2에서 만든 00_missions/, /submit, /mission, /gallery 명령어가 하나도 없음. 결국 미션 제출 기능 자체를 못 씀. **해결 옵션**: (1) v2 브랜치를 GitHub에서 default branch로 변경 → 이후 Fork하는 수강생은 v2 기준으로 받음 (2) Vercel에 v2 전용 프로젝트 따로 만들고 v2를 그 프로젝트의 main으로 운영 |

---

## 진행 기록

### 1단계: 미션 구조
- [x] `00_missions/template/mission-01.md` 양식 파일
- [x] `00_missions/README.md` (수강생용 제출 안내)
- [x] `.claude/commands/mission.md`
- [x] `.claude/commands/submit.md`

### 2단계: 갤러리 구조
- [x] `01_gallery/README.md` (강사용 운영 안내)
- [x] `src/content/gallery/` (콘텐츠 컬렉션 — 공개 사례)
- [x] `src/content/config.ts` — gallery 컬렉션 추가
- [x] `src/pages/gallery/index.astro` (갤러리 페이지)
- [x] `.claude/commands/gallery.md` (강사용 등록 명령어)

### 3단계: Q&A 축적
- [ ] `02_skill_insight/` 폴더 + README.md
  → **보류**: 수강생 운영 후 반복 질문이 쌓이면 그때 추가

### 4단계: AI 분석 명령어
- [ ] `.claude/commands/analyze.md`

---

## 참고: aaa-starter-kit 원본 구조
원본 레포(mumyungsee/aaa-starter-kit)에 이미 위 구조의 레퍼런스 구현이 있습니다.
필요할 때 참조해서 가져옵니다.

---

마지막 업데이트: 2026-05-06
