const SHEET_NAME = 'RSVP';

function doPost(e) {
  const data = e.parameter;
  if (data.website) return json({ ok: true });

  const name = (data.name || '').trim();
  const attendance = data.attendance;
  const attending = attendance === 'hadir';
  const adults = attending ? Number(data.adults) : 0;
  const children = attending ? Number(data.children) : 0;
  const invalidGuestCount = attending && (!Number.isInteger(adults) || !Number.isInteger(children) || adults < 1 || children < 0 || adults + children > 6);
  if (!name || !['hadir', 'berhalangan'].includes(attendance) || invalidGuestCount) {
    return json({ ok: false, error: 'Data tidak valid.' });
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  sheet.appendRow([new Date(), name, attendance, adults, children]);
  return json({ ok: true });
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
