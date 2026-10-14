const SHEET_NAME = 'RSVP';

function doPost(e) {
  const data = e.parameter;
  if (data.website) return json({ ok: true });

  const name = (data.name || '').trim();
  const attendance = data.attendance;
  const guests = attendance === 'hadir' ? Number(data.guests) : 0;
  if (!name || !['hadir', 'berhalangan'].includes(attendance) || guests < 0 || guests > 6) {
    return json({ ok: false, error: 'Data tidak valid.' });
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  sheet.appendRow([new Date(), name, attendance, guests]);
  return json({ ok: true });
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
