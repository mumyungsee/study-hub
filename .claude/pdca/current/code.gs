// Google Apps Script — 설문 응답을 Google Sheets에 저장
// Sheets ID: 1CT4b6ZkkO82Zc3BexcGxHJ3aDS_DV5XoFAPnFeNxZFk
//
// 사용법:
// 1. script.google.com → 기존 프로젝트에 이 코드 붙여넣기 (create-form.gs 대체)
// 2. 저장 → 배포 → 웹앱으로 배포
//    - 실행 계정: 나 (아루나 Google 계정)
//    - 액세스 권한: 모든 사용자
// 3. 배포 URL 복사 → survey.astro의 SCRIPT_URL에 붙여넣기

const SHEET_ID = '1CT4b6ZkkO82Zc3BexcGxHJ3aDS_DV5XoFAPnFeNxZFk';
const SHEET_NAME = '설문응답';

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    // 시트가 없으면 새로 만들고 헤더 추가
    if (!sheet) {
      sheet = SpreadsheetApp.openById(SHEET_ID).insertSheet(SHEET_NAME);
      sheet.appendRow([
        '제출일시',
        '지피터스 닉네임',
        '지피터스 이메일',
        '참여 형태',
        'AI 도구 경험',
        '얻고 싶은 것',
        '자기소개',
      ]);
    }

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.nickname || '',
      data.email || '',
      data.participation || '',
      data.aiLevel || '',
      data.goals || '',
      data.intro || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// CORS 대응
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
