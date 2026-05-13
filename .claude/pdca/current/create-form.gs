// Google Apps Script — 사전 설문조사 Form 자동 생성
// 사용법: Google Sheets 열기 → 확장 프로그램 → Apps Script → 붙여넣기 → 실행

function createSurveyForm() {
  var form = FormApp.create('사전 설문조사 — AI 온보딩 스터디');
  form.setDescription('스터디를 시작하기 전에 간단한 설문에 응답해 주세요. 약 3~5분 정도 걸립니다.');
  form.setCollectEmail(false); // 지피터스 이메일을 별도로 수집하므로 Google 이메일 자동 수집 끔

  // 섹션 1: 기본 정보
  form.addSectionHeaderItem()
    .setTitle('기본 정보');

  form.addTextItem()
    .setTitle('지피터스 닉네임')
    .setHelpText('지피터스에서 사용하는 닉네임을 입력해주세요.')
    .setRequired(true);

  form.addTextItem()
    .setTitle('지피터스 가입 이메일')
    .setHelpText('지피터스 가입 시 사용한 이메일을 입력해주세요.')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('참여 형태')
    .setChoiceValues(['수강', '청강'])
    .setRequired(true);

  // 섹션 2: 현재 수준
  form.addSectionHeaderItem()
    .setTitle('현재 AI 도구 경험');

  form.addMultipleChoiceItem()
    .setTitle('지금까지 사용해본 AI 도구 중 가장 고급 단계는 무엇인가요?')
    .setChoiceValues([
      '거의 안 써봤어요',
      '챗봇류 (ChatGPT, Claude, Gemini 등 웹 채팅)',
      'IDE형 AI (VS Code + AI 확장, Cursor, Windsurf, Antigravity 등)',
      '터미널 기반 AI (Claude Code, Codex 등)',
      'AI 에이전트 (OpenClaw(오픈클로), Hermes 등 자율 실행형)',
    ])
    .setRequired(true);

  // 섹션 3: 얻고 싶은 것
  form.addSectionHeaderItem()
    .setTitle('이 스터디에서 얻고 싶은 것');

  form.addCheckboxItem()
    .setTitle('이 스터디를 통해 얻고 싶은 것을 모두 선택해주세요.')
    .setChoiceValues([
      'AI 도구를 처음부터 제대로 입문하고 싶어서',
      '바이브코딩 환경 세팅 + 실제로 뭔가 만들어보기',
      'bkit으로 AI 스킬/워크플로우/하네스 써보기',
      'OpenClaw(오픈클로) 같은 자율형 AI 에이전트 다뤄보기',
      '중급/고급 스터디를 위한 선수지식 채우기',
      '기타',
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('기타 목표가 있다면 적어주세요.')
    .setRequired(false);

  // 섹션 4: 자기소개
  form.addSectionHeaderItem()
    .setTitle('자기소개');

  form.addParagraphTextItem()
    .setTitle('간단히 자기소개 해주세요.')
    .setHelpText('어떤 일을 하시나요? 이 스터디를 신청하게 된 계기도 함께 적어주세요.')
    .setRequired(true);

  // 완료 메시지
  form.setConfirmationMessage('설문 응답 감사합니다! 스터디에서 뵙겠습니다 :)');

  // 결과 출력
  Logger.log('Form 생성 완료!');
  Logger.log('편집 URL: ' + form.getEditUrl());
  Logger.log('응답 URL: ' + form.getPublishedUrl());
}
