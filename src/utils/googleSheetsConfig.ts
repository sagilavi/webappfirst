export const GOOGLE_SHEETS_CONFIG = {
  SPREADSHEET_ID: '1xpm2FKHnuKGv6_icQ0O8iHNg_T3zI08TUFE1r8wImq0',
  SHEET_ID: '2040998711'
};

interface SheetData {
  headers: string[];
  values: string[];
}

export const fetchSheetData = async (answer: string): Promise<SheetData | null> => {
  try {
    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID}/gviz/tq?tqx=out:csv&gid=${GOOGLE_SHEETS_CONFIG.SHEET_ID}`
    );

    if (!response.ok) {
      console.error('Failed to fetch data from Google Sheets');
      return null;
    }

    const csvText = await response.text();
    const rows = csvText.split('\n').map(row => 
      row.replace(/^"|"$/g, '') // Remove leading/trailing quotes
         .split('","') // Split on "," pattern
    );
    
    if (rows.length < 2) {
      console.error('No data found in the spreadsheet');
      return null;
    }

    const headers = rows[0];
    const targetRow = rows.find(row => row[0] === answer);

    if (!targetRow) {
      console.error(`No row found for answer: ${answer}`);
      return null;
    }

    return {
      headers: headers,
      values: targetRow
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}; 