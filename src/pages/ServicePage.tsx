import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { fetchSheetData } from '../utils/googleSheetsConfig';

interface SheetData {
  headers: string[];
  values: string[];
}

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

const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

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

const Title = styled.h2`
  font-size: 1.8rem;
  color: #4CAF50;
  margin-bottom: 1.5rem;
  text-align: right;
  font-weight: 600;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #4CAF50;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 700;
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

const SectionTitle = styled.h3`
  color: #4CAF50;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  text-align: right;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 1.5rem;
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
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RecommendationsText = styled.p`
  color: #333333;
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: right;
  margin-bottom: 1.5rem;

  > div {
    margin-bottom: 0.5rem;
    position: relative;
    padding-right: 1.2rem;

    &:before {
      content: "•";
      position: absolute;
      right: 0;
      color: #4CAF50;
    }
  }
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

const ServicePage = () => {
  const { type } = useParams();
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

  useEffect(() => {
    const loadSheetData = async () => {
      setIsLoading(true);
      const searchParams = new URLSearchParams(location.search);
      const answer = searchParams.get('answer');

      if (answer) {
        const data = await fetchSheetData(answer);
        setFetchedData(data);
      }
      setIsLoading(false);
    };

    loadSheetData();
  }, [location.search]);

  // Helper function to check if a container should be visible
  const isContainerVisible = (containerId: string): boolean => {
    if (!fetchedData) return false;
    
    // Find the column index where the header matches the container ID
    const columnIndex = fetchedData.headers.findIndex(header => header === containerId);
    if (columnIndex === -1) return false;

    // Check if the value in that column is not 'FALSE'
    return fetchedData.values[columnIndex] !== 'FALSE';
  };

  if (type === 'home-adjustments') {
    return (
      <PageContainer>
        <ContentWrapper>
          <PageTitle>התאמות לבית</PageTitle>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              {/* Debug Container */}
              <DebugContainer>
                <h3>Debug Info - Fetched Data:</h3>
                {fetchedData ? (
                  <div>
                    <p><strong>Headers:</strong></p>
                    <pre>{JSON.stringify(fetchedData.headers, null, 2)}</pre>
                    <p><strong>Values:</strong></p>
                    <pre>{JSON.stringify(fetchedData.values, null, 2)}</pre>
                  </div>
                ) : (
                  <p>No data fetched</p>
                )}
              </DebugContainer>

              <ServiceContainer>
                {/* Container 1 */}
                {isContainerVisible('InfoCard_home-adjustments1') && (
                  <Section id="InfoCard_home-adjustments1">
                    <Title>מדרגות גישה לבית - מוגבלות זמנית</Title>
                    <Summary>
                      בעיה: סכנת נפילה וקושי בכניסה וביציאה.
                      פתרון: התקנת רמפה נגישה ו/או הוספת מאחז יד. השאלה/השכרת רמפה ניידת דרך יד שרה או קופת חולים כללית (בהשתתפות עצמית) 'זחליל' יעבור לאחריות הקופה מהראשון לאפריל 2025.
                    </Summary>
                    <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments1')}>
                      {expandedItems['InfoCard_home-adjustments1'] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
                    </ExpandButton>
                    <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments1']}>
                      <SectionTitle>המלצות וזכויות</SectionTitle>
                      <RecommendationsText>
                        על פי מומחים רפואיים יש לשקול העמדת רמפה למצב עתידי שבו יהיה צורך ברמפה קבועה, ניתן להגיש בקשה למימון מהשירותים החברתיים או קופת חולים ומשרד הבינוי והשיכון.
                        מספר תוכניות מקומיות מציעות סיוע בהשגת רמפות ניידות או התאמות בשטח הביתי. בדקו זכאות מול מחלקת השיקום של אזור מגוריכם. חשוב לוודא שהרמפה עומדת בדרישות בטיחותיות וכוללת מעקה יד.
                      </RecommendationsText>
                      <LinksWrapper>
                        <StyledLink href="https://www.gov.il/he/service/request-to-improve-housing-conditions-for-handicapped" target="_blank">
                          משרד הבינוי והשיכון
                        </StyledLink>
                        <StyledLink href="https://yad-sarah.net/" target="_blank">
                          יד שרה
                        </StyledLink>
                      </LinksWrapper>
                    </ExpandableContent>
                  </Section>
                )}

                {/* Container 2 - Column 3 */}
                {isContainerVisible('InfoCard_home-adjustments2') && (
                  <Section id="InfoCard_home-adjustments2">
                    <Title>התאמות במקלחת</Title>
                    <Summary>
                      בעיה: סכנת החלקה וקושי בניידות בזמן רחצה.
                      פתרון: התקנת ידיות אחיזה, משטח מונע החלקה, וכסא רחצה מותאם.
                    </Summary>
                    <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments2')}>
                      {expandedItems['InfoCard_home-adjustments2'] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
                    </ExpandButton>
                    <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments2']}>
                      <SectionTitle>המלצות וזכויות</SectionTitle>
                      <RecommendationsText>
                        ודאו באופן תדיר את תחזוקת המקלחון והתאמתו לצרכי ובטיחות המטופל.
                        התקינו מוט מקלחת מתכוונן שמאפשר להתאים את גובה המים לישיבה.
                      </RecommendationsText>
                      <LinksWrapper>
                        <StyledLink href="https://www.gov.il/he/service/request-to-improve-housing-conditions-for-handicapped" target="_blank">
                          בקשת סיוע להתאמות נגישות
                        </StyledLink>
                        <StyledLink href="https://www.btl.gov.il/benefits/Long_Term_Care/Pages/default.aspx" target="_blank">
                          ביטוח לאומי - קצבת סיעוד
                        </StyledLink>
                      </LinksWrapper>
                    </ExpandableContent>
                  </Section>
                )}

                {/* Container 3 - Column 4 */}
                {isContainerVisible('InfoCard_home-adjustments3') && (
                  <Section id="InfoCard_home-adjustments3">
                    <Title>התאמות באמבטיה</Title>
                    <Summary>
                      בעיה: חוסר יכולת או קושי בכניסה ויציאה מהאמבטיה, סכנת החלקה ונפילה.
                      פתרון: התקנת ידיות אחיזה, משטח מונע החלקה, כסא רחצה מותאם ומעלון אמבטיה במידת הצורך.
                    </Summary>
                    <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments3')}>
                      {expandedItems['InfoCard_home-adjustments3'] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
                    </ExpandButton>
                    <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments3']}>
                      <SectionTitle>המלצות וזכויות</SectionTitle>
                      <RecommendationsText>
                        - התקנת לחצן מצוקה או מערכת התראה קולית בחדר הרחצה
                        - שימוש בכסא רחצה מסתובב לכניסה ויציאה קלה יותר
                        - התקנת מוט מקלחת מתכוונן
                        - בדיקת זכאות לסיוע במימון דרך קופת החולים או הביטוח הלאומי
                      </RecommendationsText>
                      <LinksWrapper>
                        <StyledLink href="https://www.btl.gov.il/benefits/Long_Term_Care/Pages/default.aspx" target="_blank">
                          ביטוח לאומי - קצבת סיעוד
                        </StyledLink>
                      </LinksWrapper>
                    </ExpandableContent>
                  </Section>
                )}

                {/* Container 4 - Column 5 */}
                {isContainerVisible('InfoCard_home-adjustments4') && (
                  <Section id="InfoCard_home-adjustments4">
                    <Title>התאמות בחדר השינה</Title>
                    <Summary>
                      בעיה: קושי בקימה ושכיבה, סכנת נפילה בעת מעברים, צורך בתנוחה מותאמת.
                      פתרון: מיטה מתכווננת חשמלית, מעקות בטיחות, ידיות עזר וכריות תמיכה.
                    </Summary>
                    <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments4')}>
                      {expandedItems['InfoCard_home-adjustments4'] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
                    </ExpandButton>
                    <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments4']}>
                      <SectionTitle>המלצות וזכויות</SectionTitle>
                      <RecommendationsText>
                        - התקנת לחצן מצוקה ליד המיטה
                        - שימוש בשטיחון מונע החלקה
                        - מיקום שידה נמוכה או מגש מתכוונן בהישג יד
                        - אפשרות לקבלת מיטה סיעודית ומזרן מותאם דרך קופת החולים
                      </RecommendationsText>
                      <LinksWrapper>
                        <StyledLink href="https://www.gov.il/he/service/request-to-improve-housing-conditions-for-handicapped" target="_blank">
                          בקשת סיוע להתאמות נגישות
                        </StyledLink>
                      </LinksWrapper>
                    </ExpandableContent>
                  </Section>
                )}

                {/* Container 5 - Column 6 */}
                {isContainerVisible('InfoCard_home-adjustments5') && (
                  <Section id="InfoCard_home-adjustments5">
                    <Title>התאמות להתניידות כללית בבית</Title>
                    <Summary>
                      התאמות נדרשות: מעברים ודלתות מותאמים, רמפות, הסרת מכשולים, ידיות אחיזה, ומושבים מוגבהים.
                      חשוב להתאים את גובה משטחי העבודה ולדאוג לאחסון נגיש.
                    </Summary>
                    <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments5')}>
                      {expandedItems['InfoCard_home-adjustments5'] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
                    </ExpandButton>
                    <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments5']}>
                      <SectionTitle>המלצות וזכויות</SectionTitle>
                      <RecommendationsText>
                        - וידוא רוחב מתאים של דלתות ומעברים
                        - התקנת רמפות והסרת מכשולים
                        - התאמת גובה משטחי עבודה ושולחנות
                        - מיקום פריטים יומיומיים בגובה נגיש
                        - שימוש בכריות ישיבה מותאמות
                      </RecommendationsText>
                      <LinksWrapper>
                        <StyledLink href="https://www.gov.il/he/service/request-to-improve-housing-conditions-for-handicapped" target="_blank">
                          משרד הבינוי והשיכון - התאמות נגישות
                        </StyledLink>
                        <StyledLink href="https://www.btl.gov.il/benefits/Long_Term_Care/Pages/default.aspx" target="_blank">
                          ביטוח לאומי - זכויות וסיוע
                        </StyledLink>
                      </LinksWrapper>
                    </ExpandableContent>
                  </Section>
                )}

                {/* Container 6 - Column 7 */}
                {isContainerVisible('InfoCard_home-adjustments6') && (
                  <Section id="InfoCard_home-adjustments6">
                    <Title>התאמות במטבח</Title>
                    <Summary>
                      בעיה: קושי בהגעה למדפים גבוהים, סכנת כוויות, קושי בשימוש במכשירי חשמל.
                      פתרון: התאמת גובה משטחים, התקנת מדפים נגישים, ברזים בטיחותיים.
                    </Summary>
                    <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments6')}>
                      {expandedItems['InfoCard_home-adjustments6'] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
                    </ExpandButton>
                    <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments6']}>
                      <SectionTitle>המלצות וזכויות</SectionTitle>
                      <RecommendationsText>
                        - התקנת משטחי עבודה בגובה מותאם
                        - שימוש בברזים עם חיישנים או ידיות ארוכות
                        - התקנת מדפים מונמכים ומגירות נגישות
                        - שימוש במכשירי חשמל עם בקרים גדולים ונוחים
                      </RecommendationsText>
                      <LinksWrapper>
                        <StyledLink href="https://www.btl.gov.il/benefits/Disability/Pages/default.aspx" target="_blank">
                          ביטוח לאומי - התאמות דיור
                        </StyledLink>
                      </LinksWrapper>
                    </ExpandableContent>
                  </Section>
                )}

                {/* Container 7 - Column 8 */}
                {isContainerVisible('InfoCard_home-adjustments7') && (
                  <Section id="InfoCard_home-adjustments7">
                    <Title>התאמות בסלון</Title>
                    <Summary>
                      בעיה: קושי בישיבה וקימה מהספה, צורך בנגישות לשלט ומכשירים.
                      פתרון: כורסא מתרוממת, שולחן מתכוונן, אחסון נגיש לחפצים שימושיים.
                    </Summary>
                    <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments7')}>
                      {expandedItems['InfoCard_home-adjustments7'] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
                    </ExpandButton>
                    <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments7']}>
                      <SectionTitle>המלצות וזכויות</SectionTitle>
                      <RecommendationsText>
                        - בחירת רהיטים בגובה מתאים
                        - סידור החדר באופן המאפשר מעבר נוח
                        - התקנת תאורה מספקת ונגישה
                        - שימוש בשלט אוניברסלי גדול ונוח
                      </RecommendationsText>
                      <LinksWrapper>
                        <StyledLink href="https://www.gov.il/he/departments/guides/disabled_accessibility" target="_blank">
                          מדריך נגישות לאנשים עם מוגבלות
                        </StyledLink>
                      </LinksWrapper>
                    </ExpandableContent>
                  </Section>
                )}

                {/* Container 8 - Column 9 */}
                {isContainerVisible('InfoCard_home-adjustments8') && (
                  <Section id="InfoCard_home-adjustments8">
                    <Title>התאמות תאורה</Title>
                    <Summary>
                      בעיה: קושי בהפעלת מתגי תאורה, צורך בתאורה מותאמת.
                      פתרון: מתגים מונגשים, חיישני תנועה, תאורה אוטומטית.
                    </Summary>
                    <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments8')}>
                      {expandedItems['InfoCard_home-adjustments8'] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
                    </ExpandButton>
                    <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments8']}>
                      <SectionTitle>המלצות וזכויות</SectionTitle>
                      <RecommendationsText>
                        - התקנת חיישני תנועה בחדרים מרכזיים
                        - שימוש במתגים גדולים ומוארים
                        - תאורת לילה אוטומטית
                        - מערכת שליטה מרכזית בתאורה
                      </RecommendationsText>
                      <LinksWrapper>
                        <StyledLink href="https://www.gov.il/he/service/request-to-improve-housing-conditions-for-handicapped" target="_blank">
                          סיוע בהתאמות דיור
                        </StyledLink>
                      </LinksWrapper>
                    </ExpandableContent>
                  </Section>
                )}

                {/* Container 9 - Column 10 */}
                {isContainerVisible('InfoCard_home-adjustments9') && (
                  <Section id="InfoCard_home-adjustments9">
                    <Title>מערכות בטיחות</Title>
                    <Summary>
                      התקנת מערכות התראה, לחצני מצוקה, וחיישני נפילה.
                      חשוב להתקין מערכת אזעקה רפואית ומערכת תקשורת חירום.
                    </Summary>
                    <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments9')}>
                      {expandedItems['InfoCard_home-adjustments9'] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
                    </ExpandButton>
                    <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments9']}>
                      <SectionTitle>המלצות וזכויות</SectionTitle>
                      <RecommendationsText>
                        - התקנת לחצני מצוקה בחדרים מרכזיים
                        - מערכת קשר פנים אלחוטית
                        - חיישני נפילה ותנועה
                        - מערכת אזעקה רפואית מחוברת למוקד
                      </RecommendationsText>
                      <LinksWrapper>
                        <StyledLink href="https://www.btl.gov.il/benefits/Long_Term_Care/Pages/default.aspx" target="_blank">
                          מערכות בטיחות
                        </StyledLink>
                      </LinksWrapper>
                    </ExpandableContent>
                  </Section>
                )}

                {/* Container 10 - Column 11 */}
                {isContainerVisible('InfoCard_home-adjustments10') && (
                  <Section id="InfoCard_home-adjustments10">
                    <Title>התאמות בחצר ומרפסת</Title>
                    <Summary>
                      בעיה: קושי בגישה לחצר, סכנת החלקה, צורך בישיבה נוחה.
                      פתרון: משטחים מונעי החלקה, ריהוט מותאם, תאורה מספקת.
                    </Summary>
                    <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments10')}>
                      {expandedItems['InfoCard_home-adjustments10'] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
                    </ExpandButton>
                    <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments10']}>
                      <SectionTitle>המלצות וזכויות</SectionTitle>
                      <RecommendationsText>
                        - התקנת משטחים מונעי החלקה
                        - ריהוט גן מותאם וחזק
                        - תאורה אוטומטית בשעות החשכה
                        - מעקות ומאחזי יד
                      </RecommendationsText>
                      <LinksWrapper>
                        <StyledLink href="https://www.gov.il/he/service/request-to-improve-housing-conditions-for-handicapped" target="_blank">
                          התאמות נגישות לחצר
                        </StyledLink>
                      </LinksWrapper>
                    </ExpandableContent>
                  </Section>
                )}

                {/* Container 11 - Column 12 */}
                {isContainerVisible('InfoCard_home-adjustments11') && (
                  <Section id="InfoCard_home-adjustments11">
                    <Title>התאמת דלתות ומעברים</Title>
                    <Summary>
                      בעיה: דלתות צרות, מפתנים גבוהים, קושי בפתיחה וסגירה.
                      פתרון: הרחבת פתחים, הנמכת מפתנים, התקנת ידיות מותאמות.
                    </Summary>
                    <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments11')}>
                      {expandedItems['InfoCard_home-adjustments11'] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
                    </ExpandButton>
                    <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments11']}>
                      <SectionTitle>המלצות וזכויות</SectionTitle>
                      <RecommendationsText>
                        - הרחבת פתחי דלתות ל-80 ס"מ לפחות
                        - התקנת דלתות הזזה במקום דלתות רגילות
                        - הסרת מפתנים גבוהים
                        - התקנת ידיות מנוף קלות לתפעול
                      </RecommendationsText>
                      <LinksWrapper>
                        <StyledLink href="https://www.gov.il/he/service/request-to-improve-housing-conditions-for-handicapped" target="_blank">
                          סיוע בהתאמות דיור
                        </StyledLink>
                      </LinksWrapper>
                    </ExpandableContent>
                  </Section>
                )}

                {/* Container 12 - Column 13 */}
                {isContainerVisible('InfoCard_home-adjustments12') && (
                  <Section id="InfoCard_home-adjustments12">
                    <Title>התאמות בחדר כביסה</Title>
                    <Summary>
                      בעיה: קושי בהפעלת מכונות כביסה, גישה למדפים ומייבש.
                      פתרון: מכונות בגובה נוח, מדפים נגישים, משטח עבודה מותאם.
                    </Summary>
                    <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments12')}>
                      {expandedItems['InfoCard_home-adjustments12'] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
                    </ExpandButton>
                    <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments12']}>
                      <SectionTitle>המלצות וזכויות</SectionTitle>
                      <RecommendationsText>
                        - הגבהת מכונות כביסה ומייבש
                        - התקנת מדפים בגובה נוח
                        - משטח עבודה מותאם לקיפול כביסה
                        - תאורה מספקת ואוורור
                      </RecommendationsText>
                      <LinksWrapper>
                        <StyledLink href="https://www.btl.gov.il/benefits/Disability/Pages/default.aspx" target="_blank">
                          זכויות והתאמות דיור
                        </StyledLink>
                      </LinksWrapper>
                    </ExpandableContent>
                  </Section>
                )}

                {/* Container 13 - Column 14 */}
                {isContainerVisible('InfoCard_home-adjustments13') && (
                  <Section id="InfoCard_home-adjustments13">
                    <Title>מערכות חימום וקירור</Title>
                    <Summary>
                      בעיה: קושי בהפעלת מזגנים ומערכות חימום, בקרת טמפרטורה.
                      פתרון: שלט מרכזי, תרמוסטט נגיש, מערכת חכמה.
                    </Summary>
                    <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments13')}>
                      {expandedItems['InfoCard_home-adjustments13'] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
                    </ExpandButton>
                    <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments13']}>
                      <SectionTitle>המלצות וזכויות</SectionTitle>
                      <RecommendationsText>
                        - התקנת מערכת שליטה מרכזית
                        - תרמוסטט דיגיטלי בגובה נוח
                        - שלט רחוק עם כפתורים גדולים
                        - חיישני טמפרטורה אוטומטיים
                      </RecommendationsText>
                      <LinksWrapper>
                        <StyledLink href="https://www.gov.il/he/service/request-to-improve-housing-conditions-for-handicapped" target="_blank">
                          התאמות מערכות בבית
                        </StyledLink>
                      </LinksWrapper>
                    </ExpandableContent>
                  </Section>
                )}

                {/* Container 14 - Column 15 */}
                {isContainerVisible('InfoCard_home-adjustments14') && (
                  <Section id="InfoCard_home-adjustments14">
                    <Title>התאמת חלונות</Title>
                    <Summary>
                      בעיה: קושי בפתיחה וסגירה של חלונות, גישה לווילונות ותריסים.
                      פתרון: מנגנונים חשמליים, ידיות מותאמות, שלט רחוק.
                    </Summary>
                    <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments14')}>
                      {expandedItems['InfoCard_home-adjustments14'] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
                    </ExpandButton>
                    <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments14']}>
                      <SectionTitle>המלצות וזכויות</SectionTitle>
                      <RecommendationsText>
                        - התקנת מנגנונים חשמליים לחלונות
                        - תריסים חשמליים עם שלט
                        - ידיות מותאמות לפתיחה קלה
                        - וילונות חשמליים או קלים להפעלה
                      </RecommendationsText>
                      <LinksWrapper>
                        <StyledLink href="https://www.btl.gov.il/benefits/Disability/Pages/default.aspx" target="_blank">
                          סיוע בהתאמות דיור
                        </StyledLink>
                      </LinksWrapper>
                    </ExpandableContent>
                  </Section>
                )}

                {/* Container 15 - Column 16 */}
                {isContainerVisible('InfoCard_home-adjustments15') && (
                  <Section id="InfoCard_home-adjustments15">
                    <Title>פתרונות אחסון נגישים</Title>
                    <Summary>
                      בעיה: קושי בגישה לארונות גבוהים, אחסון לא נגיש.
                      פתרון: מדפים מתכווננים, מגירות נשלפות, ארונות בגובה נוח.
                    </Summary>
                    <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments15')}>
                      {expandedItems['InfoCard_home-adjustments15'] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
                    </ExpandButton>
                    <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments15']}>
                      <SectionTitle>המלצות וזכויות</SectionTitle>
                      <RecommendationsText>
                        - התקנת מדפים מתכווננים
                        - מגירות עם מסילות קלות לפתיחה
                        - ארונות נמוכים ונגישים
                        - פתרונות אחסון מודולריים
                      </RecommendationsText>
                      <LinksWrapper>
                        <StyledLink href="https://www.gov.il/he/service/request-to-improve-housing-conditions-for-handicapped" target="_blank">
                          התאמות פנים בדירה
                        </StyledLink>
                      </LinksWrapper>
                    </ExpandableContent>
                  </Section>
                )}

                {/* Container 16 - Column 17 */}
                {isContainerVisible('InfoCard_home-adjustments16') && (
                  <Section id="InfoCard_home-adjustments16">
                    <Title>מערכות תקשורת ביתיות</Title>
                    <Summary>
                      בעיה: קושי בתקשורת בין חדרים, צורך במערכת אינטרקום נגישה.
                      פתרון: מערכת אינטרקום אלחוטית, לחצני חירום, מערכת שליטה מרכזית.
                    </Summary>
                    <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments16')}>
                      {expandedItems['InfoCard_home-adjustments16'] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
                    </ExpandButton>
                    <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments16']}>
                      <SectionTitle>המלצות וזכויות</SectionTitle>
                      <RecommendationsText>
                        - התקנת מערכת אינטרקום אלחוטית
                        - לחצני מצוקה בכל חדר
                        - מערכת שליטה קולית
                        - חיבור למוקד חירום 24/7
                      </RecommendationsText>
                      <LinksWrapper>
                        <StyledLink href="https://www.btl.gov.il/benefits/Long_Term_Care/Pages/default.aspx" target="_blank">
                          מערכות תקשורת סיעודיות
                        </StyledLink>
                      </LinksWrapper>
                    </ExpandableContent>
                  </Section>
                )}

                {/* Container 17 - Column 18 */}
                {isContainerVisible('InfoCard_home-adjustments17') && (
                  <Section id="InfoCard_home-adjustments17">
                    <Title>התאמת שירותי אורחים</Title>
                    <Summary>
                      בעיה: מרחב צר, חוסר נגישות, קושי בשימוש.
                      פתרון: הרחבת המרחב, התקנת אביזרי עזר, שיפור נגישות.
                    </Summary>
                    <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments17')}>
                      {expandedItems['InfoCard_home-adjustments17'] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
                    </ExpandButton>
                    <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments17']}>
                      <SectionTitle>המלצות וזכויות</SectionTitle>
                      <RecommendationsText>
                        - הרחבת פתח הדלת
                        - התקנת ידיות אחיזה
                        - אסלה בגובה מותאם
                        - כיור נגיש עם ברז חיישן
                      </RecommendationsText>
                      <LinksWrapper>
                        <StyledLink href="https://www.gov.il/he/service/request-to-improve-housing-conditions-for-handicapped" target="_blank">
                          התאמות נגישות בשירותים
                        </StyledLink>
                      </LinksWrapper>
                    </ExpandableContent>
                  </Section>
                )}

                {/* Container 18 - Column 19 */}
                {isContainerVisible('InfoCard_home-adjustments18') && (
                  <Section id="InfoCard_home-adjustments18">
                    <Title>התאמת מדרגות פנים</Title>
                    <Summary>
                      בעיה: קושי בעליה וירידה במדרגות פנימיות.
                      פתרון: מעלון מדרגות, מעקות כפולים, תאורה מותאמת.
                    </Summary>
                    <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments18')}>
                      {expandedItems['InfoCard_home-adjustments18'] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
                    </ExpandButton>
                    <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments18']}>
                      <SectionTitle>המלצות וזכויות</SectionTitle>
                      <RecommendationsText>
                        - התקנת מעלון מדרגות
                        - מעקות בשני צידי המדרגות
                        - סימון קצוות המדרגות
                        - תאורה אוטומטית
                      </RecommendationsText>
                      <LinksWrapper>
                        <StyledLink href="https://www.btl.gov.il/benefits/Disability/Pages/default.aspx" target="_blank">
                          סיוע במימון מעלון
                        </StyledLink>
                      </LinksWrapper>
                    </ExpandableContent>
                  </Section>
                )}

                {/* Container 19 - Column 20 */}
                {isContainerVisible('InfoCard_home-adjustments19') && (
                  <Section id="InfoCard_home-adjustments19">
                    <Title>התאמת חדר עבודה</Title>
                    <Summary>
                      בעיה: עמדת עבודה לא מותאמת, קושי בישיבה ממושכת.
                      פתרון: שולחן מתכוונן, כיסא ארגונומי, אביזרי עזר.
                    </Summary>
                    <ExpandButton onClick={() => handleExpand('InfoCard_home-adjustments19')}>
                      {expandedItems['InfoCard_home-adjustments19'] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
                    </ExpandButton>
                    <ExpandableContent isExpanded={!!expandedItems['InfoCard_home-adjustments19']}>
                      <SectionTitle>המלצות וזכויות</SectionTitle>
                      <RecommendationsText>
                        - שולחן עבודה מתכוונן חשמלי
                        - כיסא ארגונומי מותאם
                        - תאורה מתכווננת
                        - אביזרי עזר לשימוש במחשב
                      </RecommendationsText>
                      <LinksWrapper>
                        <StyledLink href="https://www.btl.gov.il/benefits/Disability/Pages/default.aspx" target="_blank">
                          ציוד מותאם לעבודה
                        </StyledLink>
                      </LinksWrapper>
                    </ExpandableContent>
                  </Section>
                )}
              </ServiceContainer>
            </>
          )}
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <Title>שירותים</Title>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ServicePage;