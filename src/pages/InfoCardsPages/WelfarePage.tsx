import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchSheetData } from '../../utils/googleSheetsConfig';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from '../../styles/globalStyles';

interface SheetData {
  headers: string[];
  values: string[];
}

const WelfarePage = () => {
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
    
    // First try exact match
    const columnIndex = fetchedData.headers.findIndex(header => header === containerId);
    if (columnIndex !== -1) {
      const value = fetchedData.values[columnIndex];
      return value !== undefined && value !== 'FALSE' && value.trim() !== '';
    }

    // For IDs with _2 suffix
    const alternativeId = containerId.replace('_2', '2');
    const altIndex = fetchedData.headers.findIndex(header => header === alternativeId);
    if (altIndex !== -1) {
      const value = fetchedData.values[altIndex];
      return value !== undefined && value !== 'FALSE' && value.trim() !== '';
    }

    return false;
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
          <h1>רווחה ואיכות חיים</h1>

          {/* Container: Mental Health Support */}
          {isContainerVisible('InfoCard_wellbeing_65') && (
            <div className="container">
              <h3>התמודדות עם קשיים מנטליים בשיקום לאחר שבירת הירך</h3>
              <p>
                בדידות בגיל המבוגר אינה רק תחושה אישית, אלא גם גורם סיכון בריאותי המשפיע על לחץ, מצב הרוח, תפקוד קוגניטבי ופיזי. התערבות נכונה יכולה להפחית את הבדידות ולשפר את הבריאות ואיכות החיים.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_wellbeing_65')}
              >
                {expandedItems['InfoCard_wellbeing_65'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_wellbeing_65'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>התנהלות משפחתית</h3>
                  <p>
                    מעורבות משפחתית – יצירת תמיכה רחבה ושגרת קשרים.
                    תיאום בין בני המשפחה – צרו מערכת גמישה אך מחייבת.
                    עידוד הנכדים לקחת חלק – שאפו לכך שהנכדים יהיו פעילים ככל שניתן.
                    ליווי לבדיקות רפואיות כהזדמנות חברתית.
                  </p>
                </div>

                <div className="content-section">
                  <h3>התנהלות חברתית</h3>
                  <p>
                    קשרים חברתיים – השתתפות פעילה במסגרות מותאמות.
                    שימור והעמקת קשרים קיימים.
                    קבוצות חברתיות או קורסים ייעודיים.
                    מועדוני יום לקשישים.
                  </p>
                  <div className="links-container">
                    <a href="https://www.btl.gov.il/Simulators/SiudCalculators/Pages/IturNotneySherutim.aspx" target="_blank" rel="noopener noreferrer">
                      איתור מרכז יום קרוב
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>העשרה ולמידה</h3>
                  <p>
                    קורסי העשרה ולמידה מקוונים או פיזיים.
                    המרכז לשיווין חברתי מסבסד את הקתדראות העממיות.
                  </p>
                  <div className="links-container">
                    <a href="https://www.gov.il/he/pages/university_shivyon" target="_blank" rel="noopener noreferrer">
                      איתור קתדראות
                    </a>
                    <a href="https://www.gov.il/he/pages/molsa-senior-citizens-clubs-and-warm-homes-social-clubs?chapterIndex=3" target="_blank" rel="noopener noreferrer">
                      איתור מועדון חברתי
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>הסתייעות בטכנולוגיה</h3>
                  <p>
                    שימוש בטכנולוגיה ככלי להפחתת בדידות.
                    שימוש בתוכנה לשליטה מרחוק.
                    לימוד שיחות וידאו וזום.
                  </p>
                  <div className="links-container">
                    <a href="https://www.teamviewer.com/en-mea/download/windows/" target="_blank" rel="noopener noreferrer">
                      הורדת TEAMVIEWER
                    </a>
                    <a href="https://anydesk.com/en/downloads/windows" target="_blank" rel="noopener noreferrer">
                      הורדת ANYDESK
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container: Sleep Issues */}
          {isContainerVisible('InfoCard_wellbeing_66') && (
            <div className="container">
              <h3>התמודדות עם הפרעות שינה</h3>
              <p>
                שינה איכותית היא מרכיב קריטי בניהול אורך חיים בריא. שינה איכותית מפחיתה מתח, משפרת מצב רוח, תומכת בזיכרון ובריכוז ומסייעת במניעת כאב ועייפות במהלך היום.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_wellbeing_66')}
              >
                {expandedItems['InfoCard_wellbeing_66'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_wellbeing_66'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>התאמת סביבת השינה</h3>
                  <p>
                    מיטה מותאמת ונוחה.
                    טמפרטורה נוחה (18-22 מעלות).
                    תאורה מתאימה ועמומה.
                    שקט מרבי.
                    שעות שינה קבועות.
                    פעילות גופנית מותאמת.
                    הגבלת זמני שנ"צ.
                    חשיפה לשמש בשעות הבוקר.
                  </p>
                </div>

                <div className="content-section">
                  <h3>התנהלות והרגלים מקדמי שינה</h3>
                  <p>
                    תרגולי הרפיה.
                    עידוד קריאה לפני השינה.
                    הימנעות מחשיפה לאור כחול.
                    העדפת פעילויות מרגיעות.
                  </p>
                </div>

                <div className="content-section">
                  <h3>תזונה תומכת שינה</h3>
                  <p>
                    ארוחת ערב קלה.
                    הימנעות מקפאין ואלכוהול.
                    שתיית תה צמחים מרגיעים.
                  </p>
                  <div className="links-container">
                    <a href="https://www.clalit.co.il/he/lifestyle/nutrition/Pages/dont_eat_before_you_sleep.aspx" target="_blank" rel="noopener noreferrer">
                      מה לא לאכול לפני השינה
                    </a>
                    <a href="https://www.ynet.co.il/article/4686877" target="_blank" rel="noopener noreferrer">
                      המדריך הטבעי להתמודדות עם נדודי שינה
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container: Mental Health Support During Recovery */}
          {isContainerVisible('InfoCard_wellbeing_67') && (
            <div className="container">
              <h3>התמודדות עם קשיים מנטליים בשיקום</h3>
              <p>
                שיקום לאחר שבר בירך הוא לא רק אתגר פיזי אלא גם חוויה מנטלית מאתגרת עבור המטופל ובני משפחתו.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_wellbeing_67')}
              >
                {expandedItems['InfoCard_wellbeing_67'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_wellbeing_67'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>יצירת תחושת הצלחה ובניית ביטחון עצמי</h3>
                  <p>
                    עידוד חגיגת הישגים קטנים.
                    דגש על התקדמות במקום מגבלות.
                    הצבת מטרות קטנות ומשמעותיות.
                    הכרה במאמצים.
                  </p>
                </div>

                <div className="content-section">
                  <h3>הפחתת פחד ותלות</h3>
                  <p>
                    התמודדות עם פחד מנפילה חוזרת.
                    חיזוק תחושת השליטה.
                    התאמת העזרה למידת הצורך.
                  </p>
                </div>

                <div className="content-section">
                  <h3>תקשורת ותמיכה מקצועית</h3>
                  <p>
                    יצירת דיאלוג פתוח.
                    ערנות לסימני דיכאון.
                    פנייה לעזרה מקצועית בעת הצורך.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Caregiver Wellbeing */}
          {isContainerVisible('InfoCard_wellbeing_68') && (
            <div className="container">
              <h3>רווחת המטפל - שמרו על עצמכם</h3>
              <p>
                הטיפול בבן משפחה בתהליך שיקום הוא משימה אינטנסיבית, רגשית ופיזית.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_wellbeing_68')}
              >
                {expandedItems['InfoCard_wellbeing_68'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_wellbeing_68'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>הכרה בקושי והתמודדות</h3>
                  <p>
                    הבנת האתגר והמחיר האישי.
                    התמודדות עם שינויי תפקידים.
                    הימנעות מרגשות אשמה.
                    השקעה בעצמי.
                    הצטרפות לקבוצות תמיכה.
                  </p>
                </div>

                <div className="content-section">
                  <h3>חלוקת תפקידים ותיאום</h3>
                  <p>
                    מעורבות כל בני המשפחה.
                    הגדרת תפקידים ברורה.
                    יומן משימות משותף.
                    הגדרת זמני זמינות.
                  </p>
                </div>

                <div className="content-section">
                  <h3>תמיכה רגשית וחוסן אישי</h3>
                  <p>
                    שיחה פתוחה במשפחה.
                    פנייה לתמיכת חברים.
                    הצטרפות לקבוצות תמיכה.
                    לקיחת זמן אישי.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Bone Health Nutrition */}
          {isContainerVisible('InfoCard_wellbeing_69') && (
            <div className="container">
              <h3>תזונה תומכת בריאות העצם</h3>
              <p>
                תזונה מאוזנת היא מרכיב מרכזי בחיזוק העצמות ובהפחתת הסיכון לשברים.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_wellbeing_69')}
              >
                {expandedItems['InfoCard_wellbeing_69'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_wellbeing_69'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>התאמת התזונה למצב הבריאותי</h3>
                  <p>
                    איזון בין מזונות עשירים בסידן ושומן.
                    מעקב אחר רמות ויטמינים ומינרלים.
                    התייעצות עם תזונאי.
                  </p>
                  <div className="links-container">
                    <a href="https://rambam-medicine.org.il/osteoporosis-slow-down-stop-decrease-in-bone-density/" target="_blank" rel="noopener noreferrer">
                      הרחבה על תזונה מונעת התדללות עצם
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>רכיבי תזונה חשובים</h3>
                  <p>
                    סידן - מוצרי חלב, ירקות ירוקים, דגים.
                    ויטמין D - חשיפה לשמש, דגים שומניים.
                    חלבון - עוף, דגים, קטניות.
                    מגנזיום ואשלגן - אבוקדו, בננות, אגוזים.
                  </p>
                  <div className="links-container">
                    <a href="https://www.camoni.co.il/%D7%9E%D7%94-%D7%9C%D7%90%D7%9B%D7%95%D7%9C-%D7%9B%D7%93%D7%99-%D7%9C%D7%A9%D7%9E%D7%95%D7%A8-%D7%A2%D7%9C-%D7%94%D7%A2%D7%A6%D7%9E%D7%95%D7%AA-" target="_blank" rel="noopener noreferrer">
                      תזונה תומכת עצם
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default WelfarePage; 