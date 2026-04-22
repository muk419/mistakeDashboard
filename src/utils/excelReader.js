import * as XLSX from 'xlsx';

export async function fetchMistakesData(url = '/data/mistakes.xlsx') {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch data (${response.status})`);
  }

  const contentType = response.headers.get('content-type') || '';
  let workbook;

  if (contentType.includes('text/csv') || url.includes('gviz/tq') || url === '/api/sheet') {
    const text = await response.text();

    if (text.includes('<!DOCTYPE html') || text.includes('<html')) {
      throw new Error(
        'Google Sheet is not publicly shared. Go to your sheet → Share → Change to "Anyone with the link" → Viewer'
      );
    }

    workbook = XLSX.read(text, { type: 'string' });
  } else {
    const arrayBuffer = await response.arrayBuffer();
    workbook = XLSX.read(arrayBuffer, { type: 'array' });
  }

  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

  if (jsonData.length === 0) {
    throw new Error('No data found in the spreadsheet');
  }

  return jsonData.map((row, index) => ({
    id: index + 1,
    timestamp: row['Timestamp'] || '',
    name: row['Name'] || row['Name '] || '',
    attended: row['Did you attend the daily mistake-sharing sessions regularly?'] || '',
    lessonsLearned: row['What key lessons have you learned from these sessions?'] || '',
    improvements: row['How have these sessions helped you improve your work?'] || '',
    rating: row['On a scale of 1–5, how useful are these sessions?'] || row['On a scale of 1-5, how useful are these sessions?'] || '',
    suggestions: row['What improvements would you suggest for these sessions?'] || '',
    comfortable: row['Do you feel comfortable sharing mistakes in these sessions?'] || '',
  }));
}
