# 배포 가이드 (오늘의 한 사이클)

이 문서대로 따라 하면 GitHub private 저장소 + Vercel 자동 배포까지 완성.
샌드박스 권한 이슈로 git/push는 너의 Windows 터미널에서 직접 실행.

---

## 1단계 — 로컬 빌드 한 번 확인 (3분)

PowerShell이나 터미널을 열고 프로젝트 폴더로 이동:

```powershell
cd "C:\Users\user\aluna\90_archive\life wiki"
npm install
npm run dev
```

브라우저에서 http://localhost:4321 열면 사이트가 보여야 함.
- 홈에 "휴지 없는 화장실에서 시작된 생각" 글 카드가 보이면 OK
- 카드 클릭하면 본문 페이지

확인 끝나면 `Ctrl+C`로 dev 서버 종료.

---

## 2단계 — git 저장소 초기화 + 첫 커밋

같은 폴더에서:

```powershell
git init -b main
git config user.name "아루나"
git config user.email "mumusee00@gmail.com"
git add .
git commit -m "init: 라이프 위키 1차 셋업"
```

`git log --oneline`로 커밋 1개 생긴 거 확인.

---

## 3단계 — GitHub에 빈 private 저장소 만들기

브라우저:

1. https://github.com/new 접속
2. **Repository name**: `life-wiki` (자유)
3. **Description**: `아루나의 라이프 위키 — 매일의 회고와 블로그` (선택)
4. **Private** 선택 ← 중요
5. README, .gitignore, LICENSE는 **체크하지 마** (이미 로컬에 있음)
6. `Create repository` 클릭

만들고 나면 화면에 `…or push an existing repository from the command line` 섹션이 보일 거야. 거기 명령어 복사. 대충 이런 모양:

```powershell
git remote add origin https://github.com/<너의계정명>/life-wiki.git
git branch -M main
git push -u origin main
```

`git push` 할 때 GitHub 로그인 창 뜨면 너의 계정으로 인증.
- Username: GitHub 사용자명
- Password: PAT(Personal Access Token) 또는 GitHub CLI 인증

PAT 처음이면: https://github.com/settings/tokens/new → repo 권한 체크 → 토큰 발급 → 비밀번호 자리에 붙여넣기.

성공하면 GitHub 저장소 새로고침했을 때 파일들이 다 올라가 있어야 함.

---

## 4단계 — Vercel 연결 + 배포

브라우저:

1. https://vercel.com 접속
2. **Sign Up** → **Continue with GitHub** (GitHub 계정으로 로그인)
3. 처음이면 Vercel에 GitHub 권한 부여
4. 대시보드에서 `Add New...` → `Project`
5. `Import Git Repository` 섹션에서 `life-wiki` 찾아서 `Import`
6. 설정 화면:
   - **Framework Preset**: Astro (자동 감지)
   - **Build Command**: `npm run build` (그대로 둠)
   - **Output Directory**: `dist` (그대로 둠)
   - **Install Command**: `npm install` (그대로 둠)
   - 환경변수는 비워둬도 됨
7. `Deploy` 클릭

1~2분 기다리면 빌드 완료.
- `Visit` 버튼 누르면 사이트 확인 가능
- 도메인은 자동으로 `life-wiki-xxxx.vercel.app` 형식으로 부여

---

## 5단계 — 사이트 확인 + 도메인 메모

배포된 URL을 열어보고:
- 홈에 "휴지 없는 화장실에서 시작된 생각" 카드가 보이는가?
- 카드 클릭하면 본문이 잘 뜨는가?
- 모바일에서도 잘 보이는가?

배포 URL을 `astro.config.mjs`의 `site` 필드에 넣으면 더 좋음 (지금은 `https://example.vercel.app` 자리표시자).

```powershell
# astro.config.mjs 열어서 site 값을 실제 URL로 바꾸고
git add astro.config.mjs
git commit -m "config: 실제 사이트 URL 적용"
git push
```

푸시하면 Vercel이 자동으로 다시 빌드함.

---

## 일상 워크플로우 (앞으로 이렇게)

### 매일 회고 끝났을 때
1. 클로드 모바일에서 회고 → 산출물 마크다운 받음
2. 컴퓨터에서 `journal/20_일간_YYYY-MM-DD.md`로 저장
3. (선택) `git add . && git commit -m "journal: YYYY-MM-DD" && git push`
   → GitHub 저장소에 백업되지만 사이트엔 안 올라감 (private 폴더라서)

### 블로그 글 발행할 때
1. `src/content/blog/{슬러그}.md` 작성 (또는 클로드가 만든 거 저장)
2. 프론트매터에서 `status: 공개` 설정
3. `git add . && git commit -m "blog: 글 제목" && git push`
4. Vercel이 1~2분 안에 자동 빌드·배포

### 글 비공개로 돌리고 싶을 때
- 프론트매터의 `status`를 `초안`으로 바꿔서 push → 사이트에서 사라짐

---

## 트러블슈팅

**`git push` 인증 오류**: Personal Access Token 발급해서 비밀번호 자리에 입력
**Vercel 빌드 실패**: 로그 확인. 대부분 의존성 문제면 `package.json` 다시 검토
**한글 파일명 안 보임**: GitHub은 한글 잘 처리함. 문제 생기면 슬러그를 영문으로 (글 제목은 한글 유지)

