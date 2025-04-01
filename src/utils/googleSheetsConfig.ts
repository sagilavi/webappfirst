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
      `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID}/export?format=csv&gid=${GOOGLE_SHEETS_CONFIG.SHEET_ID}`
    );

    if (!response.ok) {
      console.error('Failed to fetch data from Google Sheets');
      return null;
    }

    const csvText = await response.text();
    console.log('Raw CSV:', csvText); // Debug log
    
    // Split into rows and clean up the data
    const rows = csvText.split('\n').map(row => {
      // Remove any BOM characters and quotes
      const cleanRow = row.replace(/^\uFEFF/, '').replace(/^"|"$/g, '');
      // Split on comma but handle escaped commas within quotes
      return cleanRow.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    });

    if (rows.length < 2) {
      console.error('No data found in the spreadsheet');
      return null;
    }

    // Clean up headers (remove quotes and whitespace)
    const headers = rows[0].map(header => header.trim().replace(/^"|"$/g, ''));
    
    // Find the row with the matching answer
    const targetRow = rows.find(row => row[0].trim().replace(/^"|"$/g, '') === answer);

    if (!targetRow) {
      console.error(`No row found for answer: ${answer}`);
      return null;
    }

    // Clean up values (remove quotes and whitespace)
    const values = targetRow.map(value => value.trim().replace(/^"|"$/g, ''));

    console.log('Fetched headers:', headers);
    console.log('Fetched values:', values);

    return {
      headers: headers,
      values: values
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}; 