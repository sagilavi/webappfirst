import { useParams } from 'react-router-dom';
import { useState } from 'react';
import styled from '@emotion/styled';

const Section = styled.div`
  margin-bottom: 2rem;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
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
  background-color: #f8faf8;
  padding: 3rem 2rem;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #1a472a;
  margin-bottom: 1.5rem;
  text-align: right;
  font-weight: 600;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #1a472a;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 700;
`;

const Summary = styled.p`
  color: #333;
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: right;
  margin-bottom: 2rem;
`;

const ExpandButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
  margin-bottom: 1rem;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }
`;

const ExpandableContent = styled.div<{ isExpanded: boolean }>`
  max-height: ${props => props.isExpanded ? '2000px' : '0'};
  overflow: hidden;
  transition: max-height 0.6s ease-in-out;
  margin-top: ${props => props.isExpanded ? '2rem' : '0'};
`;

const SectionTitle = styled.h3`
  color: #1a472a;
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
`;

const StyledLink = styled.a`
  color: white;
  text-decoration: none;
  display: inline-block;
  font-size: 1.1rem;
  text-align: right;
  background-color: #000000;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #add8e6;
    transform: translateY(-2px);
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
  color: #333;
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: right;
  margin-bottom: 1.5rem;
`;

const ServicePage = () => {
  const { type } = useParams();
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  const handleExpand = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  console.log('Current type:', type);

  if (type === 'home-adjustments') {
    return (
      <PageContainer>
        <ContentWrapper>
          <PageTitle>התאמות לבית</PageTitle>
          <ServiceContainer>
            <Section>
              <Title>מדרגות גישה לבית - מוגבלות זמנית</Title>
              <Summary>
                בעיה: סכנת נפילה וקושי בכניסה וביציאה.
                פתרון: התקנת רמפה נגישה ו/או הוספת מאחז יד. השאלה/השכרת רמפה ניידת דרך יד שרה או קופת חולים כללית (בהשתתפות עצמית) 'זחליל' יעבור לאחריות הקופה מהראשון לאפריל 2025.
              </Summary>
              <ExpandButton onClick={() => handleExpand(0)}>
                {expandedItems[0] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
              </ExpandButton>
              <ExpandableContent id="expandedContent0" isExpanded={expandedItems[0]}>
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

            {/* Container 2 - מקלחת */}
            <Section>
              <Title>התאמות במקלחת</Title>
              <Summary>
                בעיה: סכנת החלקה וקושי בניידות בזמן רחצה.
                פתרון: התקנת ידיות אחיזה, משטח מונע החלקה, וכסא רחצה מותאם.
              </Summary>
              <ExpandButton onClick={() => handleExpand(1)}>
                {expandedItems[1] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
              </ExpandButton>
              <ExpandableContent id="expandedContent1" isExpanded={expandedItems[1]}>
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

            {/* Container 3 - אמבטיה */}
            <Section>
              <Title>התאמות באמבטיה</Title>
              <Summary>
                בעיה: חוסר יכולת או קושי בכניסה ויציאה מהאמבטיה, סכנת החלקה ונפילה.
                פתרון: התקנת ידיות אחיזה, משטח מונע החלקה, כסא רחצה מותאם ומעלון אמבטיה במידת הצורך.
              </Summary>
              <ExpandButton onClick={() => handleExpand(2)}>
                {expandedItems[2] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
              </ExpandButton>
              <ExpandableContent id="expandedContent2" isExpanded={expandedItems[2]}>
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

            {/* Container 4 - חדר שינה */}
            <Section>
              <Title>התאמות בחדר השינה</Title>
              <Summary>
                בעיה: קושי בקימה ושכיבה, סכנת נפילה בעת מעברים, צורך בתנוחה מותאמת.
                פתרון: מיטה מתכווננת חשמלית, מעקות בטיחות, ידיות עזר וכריות תמיכה.
              </Summary>
              <ExpandButton onClick={() => handleExpand(3)}>
                {expandedItems[3] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
              </ExpandButton>
              <ExpandableContent id="expandedContent3" isExpanded={expandedItems[3]}>
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

            {/* Container 5 - התניידות כללית */}
            <Section>
              <Title>התאמות להתניידות כללית בבית</Title>
              <Summary>
                התאמות נדרשות: מעברים ודלתות מותאמים, רמפות, הסרת מכשולים, ידיות אחיזה, ומושבים מוגבהים.
                חשוב להתאים את גובה משטחי העבודה ולדאוג לאחסון נגיש.
              </Summary>
              <ExpandButton onClick={() => handleExpand(4)}>
                {expandedItems[4] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
              </ExpandButton>
              <ExpandableContent id="expandedContent4" isExpanded={expandedItems[4]}>
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

            {/* Container 6 - מטבח */}
            <Section>
              <Title>התאמות במטבח</Title>
              <Summary>
                בעיה: קושי בהגעה למדפים גבוהים, סכנת כוויות, קושי בשימוש במכשירי חשמל.
                פתרון: התאמת גובה משטחים, התקנת מדפים נגישים, ברזים בטיחותיים.
              </Summary>
              <ExpandButton onClick={() => handleExpand(5)}>
                {expandedItems[5] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
              </ExpandButton>
              <ExpandableContent id="expandedContent5" isExpanded={expandedItems[5]}>
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

            {/* Container 7 - סלון */}
            <Section>
              <Title>התאמות בסלון</Title>
              <Summary>
                בעיה: קושי בישיבה וקימה מהספה, צורך בנגישות לשלט ומכשירים.
                פתרון: כורסא מתרוממת, שולחן מתכוונן, אחסון נגיש לחפצים שימושיים.
              </Summary>
              <ExpandButton onClick={() => handleExpand(6)}>
                {expandedItems[6] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
              </ExpandButton>
              <ExpandableContent id="expandedContent6" isExpanded={expandedItems[6]}>
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

            {/* Container 8 - תאורה */}
            <Section>
              <Title>התאמות תאורה</Title>
              <Summary>
                בעיה: קושי בהפעלת מתגי תאורה, צורך בתאורה מותאמת.
                פתרון: מתגים מונגשים, חיישני תנועה, תאורה אוטומטית.
              </Summary>
              <ExpandButton onClick={() => handleExpand(7)}>
                {expandedItems[7] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
              </ExpandButton>
              <ExpandableContent id="expandedContent7" isExpanded={expandedItems[7]}>
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

            {/* Container 9 - מערכות בטיחות */}
            <Section>
              <Title>מערכות בטיחות</Title>
              <Summary>
                התקנת מערכות התראה, לחצני מצוקה, וחיישני נפילה.
                חשוב להתקין מערכת אזעקה רפואית ומערכת תקשורת חירום.
              </Summary>
              <ExpandButton onClick={() => handleExpand(8)}>
                {expandedItems[8] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
              </ExpandButton>
              <ExpandableContent id="expandedContent8" isExpanded={expandedItems[8]}>
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

            {/* Container 10 - חצר ומרפסת */}
            <Section>
              <Title>התאמות בחצר ומרפסת</Title>
              <Summary>
                בעיה: קושי בגישה לחצר, סכנת החלקה, צורך בישיבה נוחה.
                פתרון: משטחים מונעי החלקה, ריהוט מותאם, תאורה מספקת.
              </Summary>
              <ExpandButton onClick={() => handleExpand(9)}>
                {expandedItems[9] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
              </ExpandButton>
              <ExpandableContent id="expandedContent9" isExpanded={expandedItems[9]}>
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

            {/* Container 11 - דלתות ומעברים */}
            <Section>
              <Title>התאמת דלתות ומעברים</Title>
              <Summary>
                בעיה: דלתות צרות, מפתנים גבוהים, קושי בפתיחה וסגירה.
                פתרון: הרחבת פתחים, הנמכת מפתנים, התקנת ידיות מותאמות.
              </Summary>
              <ExpandButton onClick={() => handleExpand(10)}>
                {expandedItems[10] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
              </ExpandButton>
              <ExpandableContent id="expandedContent10" isExpanded={expandedItems[10]}>
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

            {/* Container 12 - חדר כביסה */}
            <Section>
              <Title>התאמות בחדר כביסה</Title>
              <Summary>
                בעיה: קושי בהפעלת מכונות כביסה, גישה למדפים ומייבש.
                פתרון: מכונות בגובה נוח, מדפים נגישים, משטח עבודה מותאם.
              </Summary>
              <ExpandButton onClick={() => handleExpand(11)}>
                {expandedItems[11] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
              </ExpandButton>
              <ExpandableContent id="expandedContent11" isExpanded={expandedItems[11]}>
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

            {/* Container 13 - מערכות חימום וקירור */}
            <Section>
              <Title>מערכות חימום וקירור</Title>
              <Summary>
                בעיה: קושי בהפעלת מזגנים ומערכות חימום, בקרת טמפרטורה.
                פתרון: שלט מרכזי, תרמוסטט נגיש, מערכת חכמה.
              </Summary>
              <ExpandButton onClick={() => handleExpand(12)}>
                {expandedItems[12] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
              </ExpandButton>
              <ExpandableContent id="expandedContent12" isExpanded={expandedItems[12]}>
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

            {/* Container 14 - חלונות */}
            <Section>
              <Title>התאמת חלונות</Title>
              <Summary>
                בעיה: קושי בפתיחה וסגירה של חלונות, גישה לווילונות ותריסים.
                פתרון: מנגנונים חשמליים, ידיות מותאמות, שלט רחוק.
              </Summary>
              <ExpandButton onClick={() => handleExpand(13)}>
                {expandedItems[13] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
              </ExpandButton>
              <ExpandableContent id="expandedContent13" isExpanded={expandedItems[13]}>
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

            {/* Container 15 - אחסון */}
            <Section>
              <Title>פתרונות אחסון נגישים</Title>
              <Summary>
                בעיה: קושי בגישה לארונות גבוהים, אחסון לא נגיש.
                פתרון: מדפים מתכווננים, מגירות נשלפות, ארונות בגובה נוח.
              </Summary>
              <ExpandButton onClick={() => handleExpand(14)}>
                {expandedItems[14] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
              </ExpandButton>
              <ExpandableContent id="expandedContent14" isExpanded={expandedItems[14]}>
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

            {/* Container 16 - מערכות תקשורת */}
            <Section>
              <Title>מערכות תקשורת ביתיות</Title>
              <Summary>
                בעיה: קושי בתקשורת בין חדרים, צורך במערכת אינטרקום נגישה.
                פתרון: מערכת אינטרקום אלחוטית, לחצני חירום, מערכת שליטה מרכזית.
              </Summary>
              <ExpandButton onClick={() => handleExpand(15)}>
                {expandedItems[15] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
              </ExpandButton>
              <ExpandableContent id="expandedContent15" isExpanded={expandedItems[15]}>
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

            {/* Container 17 - שירותי אורחים */}
            <Section>
              <Title>התאמת שירותי אורחים</Title>
              <Summary>
                בעיה: מרחב צר, חוסר נגישות, קושי בשימוש.
                פתרון: הרחבת המרחב, התקנת אביזרי עזר, שיפור נגישות.
              </Summary>
              <ExpandButton onClick={() => handleExpand(16)}>
                {expandedItems[16] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
              </ExpandButton>
              <ExpandableContent id="expandedContent16" isExpanded={expandedItems[16]}>
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

            {/* Container 18 - מדרגות פנים */}
            <Section>
              <Title>התאמת מדרגות פנים</Title>
              <Summary>
                בעיה: קושי בעליה וירידה במדרגות פנימיות.
                פתרון: מעלון מדרגות, מעקות כפולים, תאורה מותאמת.
              </Summary>
              <ExpandButton onClick={() => handleExpand(17)}>
                {expandedItems[17] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
              </ExpandButton>
              <ExpandableContent id="expandedContent17" isExpanded={expandedItems[17]}>
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

            {/* Container 19 - חדר עבודה */}
            <Section>
              <Title>התאמת חדר עבודה</Title>
              <Summary>
                בעיה: עמדת עבודה לא מותאמת, קושי בישיבה ממושכת.
                פתרון: שולחן מתכוונן, כיסא ארגונומי, אביזרי עזר.
              </Summary>
              <ExpandButton onClick={() => handleExpand(18)}>
                {expandedItems[18] ? 'סגור מידע נוסף' : 'מידע נוסף ולפרוט על זכויות לחץ כאן'}
              </ExpandButton>
              <ExpandableContent id="expandedContent18" isExpanded={expandedItems[18]}>
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
          </ServiceContainer>
        </ContentWrapper>
      </PageContainer>
    );
  }

  // Return default content for other service types
  return (
    <PageContainer>
      <ContentWrapper>
        <Title>שירותים</Title>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ServicePage;