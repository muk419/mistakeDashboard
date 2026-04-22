export default async function handler(req, res) {
  const SHEET_URL =
    'https://docs.google.com/spreadsheets/d/1K1FNC_wY4qnC6fl_9bnk2o6X4ds1sTmp50mpAPfj2as/gviz/tq?tqx=out:csv&gid=631594111';

  try {
    const response = await fetch(SHEET_URL);

    if (!response.ok) {
      return res.status(response.status).send('Failed to fetch sheet');
    }

    const csv = await response.text();

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).send(csv);
  } catch (error) {
    return res.status(500).send('Error fetching Google Sheet');
  }
}
