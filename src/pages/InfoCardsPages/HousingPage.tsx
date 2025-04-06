import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchSheetData } from '../../utils/googleSheetsConfig';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from '../../styles/globalStyles';

interface SheetData {
  headers: string[];
  values: string[];
}

const HousingPage = () => {
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
      return false;
    }
    
    const columnIndex = fetchedData.headers.findIndex(header => header === containerId);
    if (columnIndex === -1) {
      const alternativeId = containerId.replace('_2', '2');
      const altIndex = fetchedData.headers.findIndex(header => header === alternativeId);
      if (altIndex === -1) return false;
      const value = fetchedData.values[altIndex];
      return value !== undefined && value !== 'FALSE' && value.trim() !== '';
    }
    
    const value = fetchedData.values[columnIndex];
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
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <div className="page-container">
          <div className="content-wrapper">
            <div className="container">Loading...</div>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="page-container">
        <div className="content-wrapper">
          <h1>פתרונות דיור</h1>

          {/* Container: Assisted Living */}
          {isContainerVisible('InfoCard_Living_solutions_39') && (
            <div className="container">
              <h3>דיור מוגן</h3>
              <p>
                המעבר לדיור מוגן הוא שינוי גדול עבורו ועבור כל המשפחה. זהו צעד שמעורר לא מעט רגשות ושאלות, ננסה לצמצם את סימני השאלה באמצעות הנגשה של מידע וליווי התהליך בצורה הטובה ביותר.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_Living_solutions_39')}
              >
                {expandedItems['InfoCard_Living_solutions_39'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_Living_solutions_39'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>ניהול תהליך המעבר</h3>
                  <p>
                    התאמת הסביבה לצרכים: בדקו שהדירה מותאמת לצרכים, כולל רמפות, מאחזי יד ורהיטים נגישים - ראו העמקה בסעיף בית.<br/>
                    מעורבות בתהליך הקליטה: היו נוכחים במפגש עם הצוות במקום כדי להבטיח שהצרכים וההעדפות ברורים להם מן הצד האחד ושכלל השירותים והמתקנים מובנים למטופל מהצד השני. חשוב לתת למטופל להוביל את השיח והסיטואציה.<br/>
                    המשכיות טיפול רפואי: הבינו מה השירותים הרפואיים הניתנים במקום ואילו שירותים ימשיך לקבל בחוץ. וודאו האם האחריות הרפואית עוברת לדיור המוגן ועל המטופל להעביר את התיק הרפואי שלו אליהם או שמע המטופל ממשיך לפעול על מול הקופה וגופים פרטיים.
                  </p>
                </div>

                <div className="content-section">
                  <h3>תמיכה וליווי בתהליך המעבר</h3>
                  <p>
                    תמיכה רגשית: המעבר לדיור מוגן עלול לעורר תחושות של אובדן עצמאות. היו סבלניים ותומכים בתהליך ההתאקלמות.<br/>
                    פיתוח קשרים חברתיים: עודדו את המטופל להשתתף בפעילויות חברתיות וחוגים בדיור המוגן.<br/>
                    המשפחה: השתדלו לבקר ושימרו על קשר שוטף כדי למנוע תחושת בידוד.<br/>
                    חפצים אישיים: עזרו למטופל לבחור חפצים מוכרים ואהובים מהבית כדי ליצור תחושת ביתיות וביטחון. מצד שני, ייתכן שעקב מגבלת שטח יצטרך להפרד מחפצים רבים, תיהיו קשובים וערנים לתהליך.<br/>
                    נצלו את ההזדמנות: מעבר לדיור מוגן הוא הזדמנות להורה להתחיל חוגים חדשים, לגלות את עצמו בתחומים שלא בהכרח עסק בהם בעבר ולפרוח, עודדו אותו לנצל את ההזדמנות.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Living with Children */}
          {isContainerVisible('InfoCard_Living_solutions_40') && (
            <div className="container">
              <h3>מגורים משותפים עם הילדים</h3>
              <p>
                המעבר של יקירכם להתגורר עמכם הוא צעד משמעותי, אך גם מורכב, שיכול לחזק את הקשר המשפחתי, אך הוא גם דורש סדר, גבולות והיערכות רגשית. חשוב לוודא שתהיה שגרה מסודרת, שתאפשר לו לקבל את הטיפול הנדרש ולכם לשמור על איזון בחיי היומיום.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_Living_solutions_40')}
              >
                {expandedItems['InfoCard_Living_solutions_40'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_Living_solutions_40'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>זכויות בני משפחה</h3>
                  <p>
                    היעדרות מהעבודה - עובדים רשאים לנצל עד 6 ימי מחלה בשנה לצורך טיפול בהורה מעל גיל 65, התלוי לחלוטין בעזרת הזולת לביצוע פעולות יומיומיות.<br/>
                    עובד שהתפטר עקב מצב בריאותי לקוי של בן משפחה, עשוי להיות זכאי לפיצויי פיטורים.<br/>
                    כמו כן ניתן לממש הטבות מס שונות.
                  </p>
                  <div className="links-container">
                    <a href="https://www.gov.il/he/life-events/senior-citizen-nursing/long-tem-care-benefit" target="_blank" rel="noopener noreferrer">
                      גמלת סיעוד
                    </a>
                    <a href="https://www.gov.il/BlobFolder/service/itc159/he/Service_Pages_Income_tax_itc159.pdf" target="_blank" rel="noopener noreferrer">
                      פטור ממס במשיכת כספים מקופת גמל למי שנושא בהוצאות רפואיות גבוהות
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>ניהול תהליך המעבר</h3>
                  <p>
                    מרחב אישי: ככל שניתן, תקצו אזור/חדר פרטי כדי לשמר להם ולכם את תחושת העצמאות. רהטו את המרחב בחפצים אישיים ליצירת תחושות שייכות ביתית.<br/>
                    התאמת הסביבה לצרכים: בדקו שהבית, חדרו של ההורה, השירותים והמקלחת מותאמים לצרכים, כולל רמפות, מאחזי יד ורהיטים נגישים - ראו העמקה בסעיף בית.<br/>
                    שגרה מסודרת: נסו לבנות סדר יום ברור שיכלול זמן משותף, זמן אישי, זמן בית וזמן חוץ.<br/>
                    פעילות משותפת: הכניסה לשגרה עלולה למקד את הדינמיקה בפעולות יום יום ומנהלות ולפגוע בזמן איכות משותף. קבעו ועשו אירועים כגון ארוחת משותפת שחורגות מהשגרה היומיומית.<br/>
                    תחושת ערך: השתדלו למצוא פעולות בהם יוכל לעזור לכם ולילדכם, בין אם זה לעזור בשיעורי בית לנכדים או להשקות את העציצים, כל דבר אשר יסייע להם להרגיש חלק אינטגרלי מהעשייה של הבית.<br/>
                    איזון רגשי: הגדירו גבולות ברורים כדי למנוע עומס רגשי. גם אתם וגם ההורה צריכים זמן אישי. אל תרגישו רע לקחת זמן לעצמכם, להתמיד בתחביבים ולצאת לחופשים, הבריאות הנפשית שלכם חשובה מכל והיא מה שמאפשרת לבית להמשיך קדימה.<br/>
                    מעקב רפואי: השגרה עלולה להשכיח ולמסך קשיים, תהיו ערנים לשינוים קטנים במצב הרפואי והקפידו על נטילת תרופות והליכה לטיפולים חיצונים כגון פיזיותרפיה וריפוי בעיסוק.<br/>
                    שקיפות כלכלית: נהלו שיחה פתוחה על הוצאות. זה יקל על שני הצדדים.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Housing Solution Decision */}
          {isContainerVisible('InfoCard_Living_solutions_41') && (
            <div className="container">
              <h3>מתלבטים מהו פתרון הדיור הנכון ביותר</h3>
              <p>
                מדובר בהחלטה לא פשוטה, זהו צעד שמעורר לא מעט רגשות ושאלות, ננסה לצמצם סימני שאלות על ידי מידע, הכוונה וליווי התהליך בצורה הטובה ביותר. נשאף לפתרון שנותן מענה רפואי ושיקומי מלא, תוך שקלול הרצונות האישיים והצורך בתחושת עצמאות של ההורה.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_Living_solutions_41')}
              >
                {expandedItems['InfoCard_Living_solutions_41'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_Living_solutions_41'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>ניהול דילמת בחירת מקום מגורים חליפי</h3>
                  <p>
                    הקריטריונים שנמליץ להתייחס אליהם בקבלת ההחלטה:<br/><br/>
                    התאמה רפואית ושיקומית: האם מקום המגורים מתאים לצרכים הרפואיים של המטופל ויאפשרו לו שיקום מיטבי.<br/><br/>
                    רווחה נפשית: האם הסביבה מוכרת ככל האפשר – מהשארות באותה שכונה ועד ניוד רהיטים מוכרים.<br/><br/>
                    נגישות שירותים: האם יש גישה לשירותים ופעילויות שגרתיות (גם אם אינו יכול בשלב זה לגשת עצמאית, יש ערך רב ביצירת תחושה של בטחון ולא של 'ניתוק'), כמו סופר או ספרייה.<br/><br/>
                    רווחה חברתית: האם קיימת מעטפת חברתית מגוונת שאינה מסתמכת רק על המשפחה.<br/><br/>
                    במרבית המקרים, המטופל מעוניין לתחזק חיי חברה עצמאים ולא להרגיש לגמרי תלוי בכם.<br/>
                    יש לכם את החיים והעומס שלכם ובשביל שתוכלו לעזור כמה שיותר, נמליץ לפגוע כמה שפחות בשגרה שלכם.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Rehabilitation Center */}
          {isContainerVisible('InfoCard_Living_solutions_42') && (
            <div className="container">
              <h3>מעון שיקומי ומרכזי שיקום גריאטרים</h3>
              <p>
                מרכזים שמתמחים בטיפול באזרחים ותיקים לאחר ניתוחים, פציעות או מחלות שפגעו ביכולת התפקוד שלהם. המרכזים מציעים תוכניות שיקום רב-תחומיות.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_Living_solutions_42')}
              >
                {expandedItems['InfoCard_Living_solutions_42'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_Living_solutions_42'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>מימון וקריטריוני התאמה</h3>
                  <p>
                    מרכזי שיקום ציבוריים ממומנים בצורה מלאה/חלקית על ידי קופות החולים, בעמצאות ביטוח סיעודי פרטי או באופן פרטי.<br/><br/>
                    קריטריוני התאמה:<br/>
                    - מצבו של המטופל יציב מבחינה רפואית לאחר הניתוח, אך הוא עדיין זקוק לשיקום אינטנסיבי.<br/>
                    - הערכת רופא שיקומי או גריאטרי – אישור רפואי לכך שהמטופל יכול להפיק תועלת מהשיקום.<br/>
                    - אי-תלות מוחלטת בסיוע רפואי – המטופל לא זקוק לטיפול רפואי אינטנסיבי 24/7.<br/>
                    - דרגת ניידות מוגבלת עם מגמת שיקום חיובית.<br/>
                    - יכולת קוגניטיבית מספקת.<br/>
                    - יכולת לשמור על תפקודים בסיסיים.<br/>
                    - הפניה רשמית מבית החולים.<br/>
                    - אישור מקופת החולים.<br/>
                    - זמינות מקום במוסד השיקומי.
                  </p>
                </div>

                <div className="content-section">
                  <h3>תהליך מימוש והגשה</h3>
                  <p>
                    1. קבלת המלצה מרופא בבית החולים.<br/>
                    2. פנייה לקופת החולים.<br/>
                    3. קבלת אישור ובחירת מרכז שיקום.<br/>
                    4. תיאום קליטה במרכז השיקום.<br/>
                    5. מעבר למרכז והתחלת השיקום.
                  </p>
                </div>

                <div className="content-section">
                  <h3>המלצות למשפחה</h3>
                  <p>
                    - הראו נוכחות בימים הראשונים.<br/>
                    - סייעו ביצירת סביבה מוכרת וביתית.<br/>
                    - עקבו אחר התקדמות הטיפול.<br/>
                    - שימו לב לתזונה ואכילה מספקת.<br/>
                    - נהלו ציפיות ראליות לגבי קצב השיקום.<br/>
                    - הכינו את הבית לקראת החזרה.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default HousingPage; 