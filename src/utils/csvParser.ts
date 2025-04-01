interface CardContent {
  Title: string;
  'Short explain': string;
  Subtitle: string;
  'Seconed button': string;
  'Seconed button - Text': string;
  'Seconed button 2': string;
  'Seconed button 2 - Text': string;
  'Seconed explain': string;
  'Seconed picture': string;
  'Third subtitle': string;
  'Third button': string;
  'Third button - Text': string;
  'Third explain': string;
  'Third picture': string;
  'Four Subtitle': string;
  'Four button': string;
  'Four button - Text': string;
  'Four button 2': string;
  'Four button - Text 2': string;
  'Four explain': string;
  'Four picture': string;
  'Fifth subtitle': string;
  'Fifth button': string;
  'Fifth button - Text': string;
  'Fifth button 2': string;
  'Fifth button 2 - Text': string;
  'Fifth explain': string;
  'Fifth picture': string;
  'Six subtitle': string;
  'Six button': string;
  'Six button - Text': string;
  'Six button 2': string;
  'Six button 2- Text': string;
  'Six explain': string;
  'Six picture': string;
}

export const parseCSVToCardContent = async (csvPath: string): Promise<{ [key: string]: CardContent }> => {
  try {
    const response = await fetch(csvPath);
    const text = await response.text();
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    const cardContents: { [key: string]: CardContent } = {};
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      if (values.length < headers.length) continue;
      
      const serialNumber = values[headers.indexOf('serial number')]?.trim();
      if (!serialNumber) continue;
      
      const content: Partial<CardContent> = {};
      headers.forEach((header, index) => {
        if (values[index]) {
          content[header as keyof CardContent] = values[index].trim();
        }
      });
      
      cardContents[`InfoCard_${serialNumber}`] = content as CardContent;
    }
    
    return cardContents;
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return {};
  }
};

export type { CardContent }; 