# 인수인계 문서 — Cowork → Antigravity

> 작성일: 2026-05-05
> 작성자: 아루나 + Claude (Cowork mode)
> 대상: Antigravity 에이전트 (또는 다음 세션의 Claude)
> 목적: 라이프 위키 프로젝트의 GitHub 저장소 발행과 Vercel 배포를 Antigravity에서 이어서 진행

---

## 0. 1분 요약

- 사용자(아루나)는 매일 회고를 마크다운으로 기록하고, 그 일부를 블로그 글로 발전시키는 **개인 PKM + 블로그 시스템**을 구축 중.
- Cowork 세션에서 **Astro 4 기반 정적 사이트 + 비공개 회고 분리 구조**를 완성하고 로컬 빌드까지 검증 완료.
- 다음 할 일: **GitHub private 저장소 생성 → push → Vercel 배포**. 이 셋이 남았음.
- Cowork 샌드박스는 마운트 폴더에서 git 작업이 막혀서(상세는 §6) 네이티브 도구가 있는 Antigravity로 이관.

---

## 1. 프로젝트 컨텍스트 (왜 이걸 만드는가)

### 사용자의 큰 그림
1. **현재**: 클로드 모바일에서 매일 회고 → 마크다운 산출물 받음
2. **단계 1 (오늘 목표)**: 그 마크다운들을 라이프 위키 폴더에 정리 + GitHub에 백업 + 공개할 글은 자동으로 사이트 발행
3. **단계 2 (이번 달)**: 슬래시 명령어 자동화 (`/일간`, `/주간`, `/월간`, `/블로그초안`, `/publish`)
4. **단계 3 (나중)**: 에이전트 챗봇(Hermes 류)을 붙여서 회고·SNS 초안을 자동 생성

### 핵심 원칙
- **비공개 원본 / 공개 가공본 분리**: 일간/주간/월간 회고는 절대 외부 노출 안 됨. 블로그 글만 사이트에 발행.
- **1인 운영**: 팀 시나리오 아님. aaa-starter-kit(selfishclub) 패턴은 참고했지만 폴더 구조와 슬래시 명령어는 너의 v5 지침에 맞게 새로 짬.
- **가역성**: 1-repo로 시작했지만 나중에 2-repo로 분리 가능하게 설계. vault 폴더(`journal/`, `archive/`)와 site 코드(`src/`)가 명확히 분리돼 있음.

### v5 지침 요약 (CLAUDE.md에 전체 있음)
- Claude는 회고 동행자 톤. 코칭은 호출제.
- 일간 산출물 형식: 메타데이터(YAML, 하이픈) + 본문(번호 리스트). 추측 금지.
- 블로그 글: 장면으로 열기, 호흡 충분히, AI 티 지우기, 1000자 내외.
- "오늘 하루도 수고했어요" 같은 마무리 멘트 금지.

---

## 2. 현재 상태 — 폴더 구조

위치: `C:\Users\user\aluna\90_archive\life wiki\`

```
life wiki/
├── CLAUDE.md                              ← v5 지침 (회고·블로그 작성 규칙)
├── README.md                              ← 폴더 구조·운영 설명
├── DEPLOY.md                              ← 사용자용 배포 가이드 (Cowork에서 작성)
├── HANDOVER.md                            ← 이 문서
├── .gitignore                             ← node_modules, dist, .astro 제외
│
├── package.json                           ← astro@^4.16.18 only
├── astro.config.mjs                       ← site URL은 자리표시자 (배포 후 갱신 필요)
├── tsconfig.json                          ← astro/tsconfigs/strict
│
├── journal/                               ← 비공개. 사이트에 안 올라감
│   └── 20_일간_2026-05-04.md             ← 어제 일간 회고
├── archive/                               ← 빈 폴더 (8일차+ 보관용)
│
├── src/
│   ├── content/
│   │   ├── config.ts                      ← 블로그 콘텐츠 컬렉션 스키마
│   │   └── blog/
│   │       └── hyuji-eopneun-hwajangsil.md ← 첫 블로그 글 (status: 공개)
│   ├── layouts/
│   │   ├── Base.astro                     ← 공통 레이아웃 (헤더, 푸터, CSS)
│   │   └── BlogPost.astro                 ← 글 페이지 레이아웃
│   └── pages/
│       ├── index.astro                    ← 홈 (블로그 글 목록)
│       └── blog/[slug].astro              ← 동적 글 라우팅
│
└── public/favicon.svg                     ← 갈색 사각형에 "아"
```

총 17개 파일, 49KB. node_modules는 아직 없음 (사용자가 npm install 한 번 해야 함).

---

## 3. 콘텐츠 스키마 — 블로그 프론트매터

`src/content/config.ts`에 정의됨:

```typescript
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    projects: z.array(z.string()).optional(),
    themes: z.array(z.string()).optional(),
    status: z.enum(['초안', '공개', '책_챕터_후보']).default('초안'),
    description: z.string().optional(),
  }),
});
```

**중요한 동작**:
- `index.astro`와 `[slug].astro` 둘 다 `status === '공개' || '책_챕터_후보'`인 글만 빌드.
- `status: '초안'`인 글은 사이트에 안 올라감(파일은 git 저장소에 있어도).
- 이게 이 프로젝트의 핵심 **공개·비공개 게이트**. 사용자가 글 비공개로 돌리고 싶을 땐 프론트매터의 `status`만 바꾸면 됨.

---

## 4. 검증된 사실 (Cowork 세션에서 확인)

- ✅ `npm install` 작동 (Linux 샌드박스에서 검증, 362 패키지)
- ✅ `npm run build` 성공: 2 페이지, 4.6초
  - `dist/index.html` (홈)
  - `dist/blog/hyuji-eopneun-hwajangsil/index.html` (블로그 글)
  - `dist/favicon.svg`
- ✅ **비공개 누출 없음**: `journal/`의 일간 회고가 `dist/`에 노출되지 않음 (검사 키워드: "백팔배", "20_일간_" 등 모두 미노출)
- ✅ 한글 타이포그래피 정상, 날짜 한글 포맷("2026년 5월 4일"), 태그 표시 정상
- ✅ 모바일 대응 (`max-width: 720px`, `word-break: keep-all`, viewport meta)

미검증:
- ❌ Windows 환경에서 `npm install`/`npm run dev`는 사용자가 한 번 돌려야 함
- ❌ 실제 GitHub push, Vercel 배포는 아직 안 함

---

## 5. 다음 할 일 (Antigravity에서 진행)

### 5.1 GitHub private 저장소 생성 + push

GitHub MCP가 있으면:

```
1. create_repository 도구로 private 레포 생성:
   - name: life-wiki (또는 사용자가 원하는 이름)
   - description: "아루나의 라이프 위키 — 매일의 회고와 블로그"
   - private: true
   - auto_init: false  ← 중요. README/.gitignore 만들지 말 것 (이미 로컬에 있음)

2. 로컬에서 git 작업:
   cd "C:\Users\user\aluna\90_archive\life wiki"
   git init -b main
   git config user.name "아루나"
   git config user.email "mumusee00@gmail.com"
   git add .
   git commit -m "init: 라이프 위키 1차 셋업 (Astro 블로그 + 비공개 회고 폴더)"
   git remote add origin https://github.com/<사용자계정>/life-wiki.git
   git push -u origin main

3. push 인증은 사용자가 GitHub 로그인 또는 PAT 사용 (사용자가 직접 처리)
```

GitHub MCP 도구 이름은 환경마다 다르니 실제 등록된 도구 확인 후 사용.

### 5.2 Vercel 배포

Vercel은 GitHub 저장소를 자동 import해서 빌드·배포. CLI나 MCP 없어도 웹에서 5분이면 끝남:

```
1. https://vercel.com → Sign Up with GitHub
2. Add New... → Project → life-wiki Import
3. Framework: Astro (자동 감지) → Deploy
4. xxxx.vercel.app URL 받음
```

Vercel CLI(`npx vercel`)를 쓸 수도 있지만, 첫 배포는 웹 UI가 가장 단순.

### 5.3 사이트 URL 적용 (배포 끝난 후)

`astro.config.mjs`의 `site` 필드를 실제 Vercel URL로 교체하고 commit + push.

```javascript
// 현재
site: 'https://example.vercel.app',
// 교체
site: 'https://life-wiki-xxxx.vercel.app',  // Vercel이 알려준 실제 URL
```

푸시하면 Vercel이 자동 재빌드.

---

## 6. Cowork 세션에서 알게 된 환경 이슈 (Antigravity에선 해당 없음)

### 6.1 마운트 폴더 NUL byte 이슈
Cowork의 FUSE 마운트로 호스트 폴더(`C:\Users\user\aluna\...`)에 파일 쓸 때, 일부 도구(특히 `Edit`)가 트레일링 NUL 바이트(`\0`)를 추가하는 현상이 있었음. 모든 파일을 `tr -d '\000'`로 정리해서 현재 깨끗함. **이 이슈는 Cowork 샌드박스 한정**이라 Antigravity에선 발생 안 할 것.

### 6.2 git 작업 차단
Cowork 샌드박스에서 호스트 폴더에 `git init`을 시도하면 `.git/config`가 NUL 바이트로만 채워져서 git이 깨짐. 그래서 `git init`을 사용자의 Windows 터미널에서 직접 하라고 DEPLOY.md에 안내함. **Antigravity가 GitHub MCP나 네이티브 git 통합으로 직접 push할 수 있다면 이 우회는 불필요**.

### 6.3 sitemap 통합 호환성
`@astrojs/sitemap@3.2.1`이 Astro 4.16에서 빌드 끝물에 `Cannot read properties of undefined (reading 'reduce')` 크래시. 일단 sitemap을 빼고 진행. 나중에 sitemap 다시 넣을 거면 버전 호환 확인 필요. SEO 영향은 작음.

---

## 7. 향후 로드맵 (사용자가 지금 머릿속에 그리고 있는 것)

### 단계 2 — 슬래시 명령어 자동화 (이번 달)
참고: aaa-starter-kit (selfishclub/aaa-starter-kit, 김다솔 설계)의 `.claude/commands/` 패턴.

검토할 명령어:
- `/일간` — 오늘 회고 대화 흐름 시작 + 산출물 작성 → `journal/20_일간_*.md`
- `/주간` — 최근 7일 일간 종합 → `journal/30_주간_*.md`
- `/월간` — 한 달 주간 종합 → `journal/40_월간_*.md`
- `/블로그초안` — 일간의 소재 후보에서 블로그 글 발전 → `src/content/blog/*.md`
- `/publish` — git add/commit/push 자동화 (선택)

각 명령어는 v5 지침의 산출물 형식을 그대로 따라야 함 (CLAUDE.md 참조).

### 단계 3 — 2-repo 분리 검토 (선택)
지금은 1-repo. 나중에 vault만 따로 백업·공유하고 싶거나 GitHub Pages 무료 발행이 필요해지면 분리.
- vault repo: `journal/`, `archive/`, `CLAUDE.md`, 등 (private)
- site repo: `src/`, `public/`, `astro.config.mjs`, 빌드된 dist (public 가능)
- `/publish` 명령어가 vault → site의 공개 폴더만 sync.

### 단계 4 — 에이전트 챗봇 (나중)
Open Hermes 같은 로컬 에이전트가 회고 대화를 진행하고 산출물 마크다운을 자동 저장하는 흐름. 이건 한참 뒤.

---

## 8. 강의 사례로 쓸 때 짚을 만한 포인트

사용자가 곧 Antigravity 강의를 할 예정이라 이 작업이 사례가 될 수 있음. 강의용으로 깔끔하게 정리하면:

### "AI 도구로 30분 만에 자기만의 라이프 위키 + 블로그 사이트 만들기"

1. **요구사항 정의 (5분)**
   - 매일 회고 → 일부는 비공개, 일부는 블로그로 발행
   - 한 저장소 안에서 공개/비공개 분리
   - GitHub + Vercel 자동 배포

2. **AI와 함께 아키텍처 결정 (5분)**
   - 1-repo vs 2-repo 트레이드오프
   - Vercel vs GitHub Pages vs Cloudflare Pages 차이
   - Astro를 정적 사이트 생성기로 선택한 이유

3. **AI가 코드 작성 (10분)**
   - Astro 프로젝트 스캐폴드
   - 콘텐츠 컬렉션 스키마 (한국어 프론트매터)
   - 공개/비공개 게이트 (`status` 필드 필터링)
   - 한글 타이포그래피

4. **GitHub MCP로 저장소 생성 + push (5분)**
   - Antigravity의 강점이 여기서 나옴 — Cowork에선 막혔던 부분이 한 번에 됨

5. **Vercel 배포 + 도메인 확인 (5분)**
   - 사이트 작동 확인
   - 모바일 미리보기

### 강의에서 강조할 만한 인사이트
- 도구마다 잘하는 영역이 다름 — Cowork(파일 작성·로컬 빌드 검증)와 Antigravity(GitHub 직접 통합)를 조합한 워크플로우
- AI한테 "이거 만들어줘"보다 "내 시나리오에 적합한지 판단해줘"가 더 큰 차이를 만듦 (이번에 aaa-starter-kit 평가 단계가 그 예)
- 1-repo로 충분한 시점과 2-repo로 가야 하는 시점 — 가역성 있는 선택

---

## 9. 참고 자료

- aaa-starter-kit (참고만 함, 코드는 안 가져옴): https://github.com/selfishclub/aaa-starter-kit
- Astro 공식: https://docs.astro.build
- Astro 콘텐츠 컬렉션: https://docs.astro.build/en/guides/content-collections/
- Vercel + Astro 가이드: https://vercel.com/docs/frameworks/astro

---

## 10. 사용자 정보 (Antigravity 에이전트가 알아두면 좋은 것)

- 이름: 아루나
- 이메일: mumusee00@gmail.com
- 톤: 캐주얼한 동행자 톤. 친구가 카페에서 얘기하는 느낌. "오늘 하루도 수고했어요" 류 마무리 멘트 금지.
- 작업 스타일: 큰 그림과 디테일을 같이 봄. 트레이드오프 설명 좋아함. 결정은 빨리, 실행은 가볍게.
- 현재 컨텍스트: 건강이 들쭉날쭉한 상황에서 자립을 설계 중. 환경 실천·미니멀리즘·강의 만들기·블로그·인스타툰을 한 줄로 꿰는 작업.

---

## 11. 즉시 시작 체크리스트 (Antigravity에서)

1. [ ] 이 폴더 열기: `C:\Users\user\aluna\90_archive\life wiki\`
2. [ ] `CLAUDE.md`와 `HANDOVER.md`(이 문서) 읽기
3. [ ] 사용자에게 "GitHub 저장소 이름 어떻게 할까? `life-wiki`로 해도 돼?" 확인
4. [ ] GitHub MCP로 private 저장소 생성
5. [ ] `git init` + 첫 커밋 + remote add + push
6. [ ] Vercel 웹에서 import + deploy (또는 Vercel CLI/MCP)
7. [ ] 배포 URL을 `astro.config.mjs`의 `site`에 적용 + push
8. [ ] 사용자에게 URL 공유, 모바일 확인 요청
9. [ ] (선택) 강의 사례용 스크린샷·노트 따로 모으기

끝.
