import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { fetchSheetData } from '../utils/googleSheetsConfig';

interface SheetData {
  headers: string[];
  values: string[];
}

const PageContainer = styled.div`
  min-height: calc(100vh - 80px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #D5D9BA !important;
  padding: 3rem 2rem;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #4CAF50;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 700;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const SectionTitle = styled.h3`
  color: #4CAF50;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  text-align: right;
`;

const Summary = styled.p`
  color: #333333;
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: right;
  margin-bottom: 2rem;
`;

const ExpandButton = styled.button`
  background-color: #4CAF50;
  color: #ffffff;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.2);

  &:hover {
    background-color: #388E3C;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
  }
`;

const ExpandableContent = styled.div<{ isExpanded: boolean }>`
  max-height: ${props => props.isExpanded ? '2000px' : '0'};
  overflow: hidden;
  transition: max-height 0.6s ease-in-out;
  margin-top: ${props => props.isExpanded ? '2rem' : '0'};
`;

const LinksWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const StyledLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  display: inline-block;
  font-size: 1.1rem;
  text-align: center;
  background-color: #4CAF50;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.1);
  width: 25%;
  min-width: 150px;

  &:hover {
    background-color: #388E3C;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(76, 175, 80, 0.2);
  }
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  margin: 1rem 0;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DebugContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.1);
  direction: ltr;
`;

const DebugTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f5f5f5;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const AdaptedHomePage = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  const [fetchedData, setFetchedData] = useState<SheetData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleExpand = (containerId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [containerId]: !prev[containerId]
    }));
  };

  const isContainerVisible = (containerId: string): boolean => {
    if (!fetchedData) {
      console.log(`No fetched data available for ${containerId}`);
      return false;
    }
    
    // Log all headers to debug
    console.log('Available headers:', fetchedData.headers);
    console.log('Checking visibility for:', containerId);
    
    const columnIndex = fetchedData.headers.findIndex(header => header === containerId);
    console.log('Found at index:', columnIndex);
    
    if (columnIndex === -1) {
      // Try alternative format (without underscore)
      const alternativeId = containerId.replace('_2', '2');
      const altIndex = fetchedData.headers.findIndex(header => header === alternativeId);
      console.log('Trying alternative ID:', alternativeId, 'Found at:', altIndex);
      
      if (altIndex === -1) return false;
      const value = fetchedData.values[altIndex];
      console.log('Value found:', value);
      return value !== undefined && value !== 'FALSE' && value.trim() !== '';
    }
    
    const value = fetchedData.values[columnIndex];
    console.log('Value found:', value);
    return value !== undefined && value !== 'FALSE' && value.trim() !== '';
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const searchParams = new URLSearchParams(location.search);
        const answer = searchParams.get('answer');
        if (answer) {
          const data = await fetchSheetData(answer);
          setFetchedData(data);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
      setIsLoading(false);
    };

    loadData();
  }, [location.search]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <DebugContainer>
          <h2>Debug Info - Fetched Data:</h2>
          <h3>Google Sheets Data:</h3>
          {fetchedData ? (
            <DebugTable>
              <thead>
                <tr>
                  <th>Container ID</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {fetchedData.headers.map((header, index) => (
                  <tr key={header}>
                    <td>{header}</td>
                    <td>{fetchedData.values[index] || 'undefined'}</td>
                  </tr>
                ))}
              </tbody>
            </DebugTable>
          ) : (
            <p>No data fetched</p>
          )}
          <h3>Container IDs being checked:</h3>
          <pre>
            {JSON.stringify([
              'InfoCard_home-adjustments_2',
              'InfoCard_home-adjustments22',
              'InfoCard_home-adjustments23',
              'InfoCard_home-adjustments24',
              'InfoCard_home-adjustments25',
              'InfoCard_home-adjustments26',
              'InfoCard_home-adjustments27',
              'InfoCard_home-adjustments28'
            ], null, 2)}
          </pre>
        </DebugContainer>
        
        <Title>בית מותאם</Title>

        {/* Container for Temporary Stairs Accessibility */}
        {isContainerVisible('InfoCard_home-adjustments_2') && (
          <Section>
            <SectionTitle>פתרון זמני להנגשת מדרגות גישה לבית</SectionTitle>
            <Summary>
              כחלק מהשינוי ולטובת צמצום התלות והעלאת רמת הבטיחות נמליץ על הוספה של זחליל עולה מדרגות נייד, התקנה של מעקי בטיחות ועל התקנה של תאורה חזקה בסביבת הכניסה לבית. לקבלת זחליל דרך הקופה - יש להגיש בקשה לאתר מכבי {'>'} בקשה חדשה להתחייבות {'>'} תחת בקשה מהמשרד או החזרים, אישורים והתחייבויות
            </Summary>
            <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments_2')}>
              {expandedItems['InfoCard_home-adjustments_2'] ? 'הצג פחות' : 'הצג עוד'}
            </ExpandButton>
            <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments_2']}>
              <SectionTitle>דגשים חשובים</SectionTitle>
              <Summary>
                לייעול התהליך נמליץ לקבל המלצה בפיזיוטרפיסט או רופא ובה רשום במפורש הצורך ברמפה/זחליל עולה מדרגות נייד.
              </Summary>

              <SectionTitle>אפשרויות סיוע</SectionTitle>
              <Summary>
                השאלת/השכרת רמפה ניידת והתקנת רמפה נגישה ו/או הוספת מאחזי יד
              </Summary>

              <LinksWrapper>
                <StyledLink href="https://www.maccabi4u.co.il/new/maccabi_news/general/49130/#?module=NewFormMobility" target="_blank">
                  ציוד מכבי
                </StyledLink>
                <StyledLink href="https://yad-sarah.net/" target="_blank">
                  ציוד יד שרה
                </StyledLink>
                <StyledLink href="https://www.maccabi4u.co.il/new/eligibilites/2161/" target="_blank">
                  אביזרים בהשתתפות מכבי
                </StyledLink>
                <StyledLink href="https://www.gov.il/he/service/request-to-improve-housing-conditions-for-handicapped" target="_blank">
                  בדיקת סיוע משרד השיכון
                </StyledLink>
              </LinksWrapper>

              <SectionTitle>זכויות והחזרים</SectionTitle>
              <Summary>
                פנו למטפל/אחות/פיזיותרפיסט ובקשה הפניה שתכלול אבחנה רפואית והמלצה לרכישה של הפריט. קנו את המוצר ולאחר מכן הגישו למרכז הרפואי בדואר או בעמדת אל-תור את ההפניה שקיבלת ממטפל הקופה, קבלה וחשבונית מס מקורית. ההחזר ישלח אליכם.
                מאחזים בגדלים שונים - 11 - 49 ש"ח
              </Summary>

              <SectionTitle>מידע נוסף</SectionTitle>
              <Summary>
                על אף שהרופאים צופים חזרה לתפקוד מלא, יש לשקול הערכות למצב עתידי שבו יהיה צורך ברמפה קבועה. ניתן להגיש בקשה לסיוע במימון התאמות נגישות לבית ממשרד הבינוי והשיכון. מספר רשויות מקומיות ועיריות מציעות סיוע במימון התאמות נגישות לבתים במקרים אלו, בדקו זכאות מול מחלקת הרווחה של אזור המגורים.
              </Summary>
            </ExpandableContent>
          </Section>
        )}

        {/* Container 22 */}
        {isContainerVisible('InfoCard_home-adjustments22') && (
          <Section>
            <SectionTitle>התאמת חדר השינה</SectionTitle>
            <Summary>
              התאמת חדר השינה לצרכים המיוחדים של המטופל, כולל מיטה מתכווננת ואביזרי עזר
            </Summary>
            <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments22')}>
              {expandedItems['InfoCard_home-adjustments22'] ? 'הצג פחות' : 'הצג עוד'}
            </ExpandButton>
            <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments22']}>
              <SectionTitle>המלצות להתאמת חדר השינה</SectionTitle>
              <Summary>
                מיטה מתכווננת חשמלית מאפשרת שליטה על תנוחת השינה והקימה. חשוב להתאים את גובה המיטה ולהוסיף מעקות בטיחות במידת הצורך.
              </Summary>
              <LinksWrapper>
                <StyledLink href="https://www.btl.gov.il/benefits/Disability/Pages/default.aspx" target="_blank">
                  מידע על זכויות נכים - ביטוח לאומי
                </StyledLink>
              </LinksWrapper>
              <ImageContainer>
                <StyledImage src="/images/bedroom-adjustments.jpg" alt="התאמות חדר שינה" />
              </ImageContainer>
            </ExpandableContent>
          </Section>
        )}

        {/* Container 23 */}
        {isContainerVisible('InfoCard_home-adjustments23') && (
          <Section>
            <SectionTitle>התאמת השירותים</SectionTitle>
            <Summary>
              התאמת חדר השירותים לשימוש בטוח ונוח, כולל התקנת ידיות אחיזה ומושב מוגבה
            </Summary>
            <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments23')}>
              {expandedItems['InfoCard_home-adjustments23'] ? 'הצג פחות' : 'הצג עוד'}
            </ExpandButton>
            <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments23']}>
              <SectionTitle>פתרונות להתאמת השירותים</SectionTitle>
              <Summary>
                התקנת ידיות אחיזה בנקודות אסטרטגיות, מושב אסלה מוגבה, ומאחזים מתקפלים לסיוע בקימה וישיבה
              </Summary>
              <LinksWrapper>
                <StyledLink href="https://www.gov.il/he/departments/guides/disabled_housing_improvements" target="_blank">
                  מדריך להתאמות דיור
                </StyledLink>
              </LinksWrapper>
            </ExpandableContent>
          </Section>
        )}

        {/* We'll continue with the rest of the containers... */}
        
      </ContentWrapper>
    </PageContainer>
  );
};

export default AdaptedHomePage; 