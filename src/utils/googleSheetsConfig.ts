export const GOOGLE_SHEETS_CONFIG = {
  SPREADSHEET_ID: '1V3xUg1LplbLN0NK3lsnW2p9WD6-2WePtPG_LOzp30_0',
  SHEET_ID: '2040998711' // Adding the specific sheet ID from your URL
};

export const fetchSheetData = async (answer: string) => {
  try {
    console.log('Fetching data for answer:', answer);
    const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID}/export?format=csv&gid=${GOOGLE_SHEETS_CONFIG.SHEET_ID}`;
    console.log('Fetching from URL:', url);

    const response = await fetch(url);

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }

    const text = await response.text();
    console.log('Received data length:', text.length);
    console.log('First 100 characters:', text.substring(0, 100));

    // Split the CSV into rows and columns
    const rows = text.split('\n').map(row => row.split(','));
    console.log('Number of rows:', rows.length);
    console.log('First row:', rows[0]);
    
    // Skip header row and find the matching row
    const targetRow = rows.slice(1).find(row => {
      const userId = row[0]?.trim();
      console.log('Checking row with ID:', userId);
      return userId === answer;
    });
    
    if (!targetRow) {
      console.log(`No row found for answer: ${answer}`);
      return null;
    }

    console.log('Found row:', targetRow);
    return targetRow;
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return null;
  }
}; 