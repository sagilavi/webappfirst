import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchSheetData } from '../../utils/googleSheetsConfig';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from '../../styles/globalStyles';

interface SheetData {
  headers: string[];
  values: string[];
}

const RightsPage = () => {
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
          {/* Debug Container */}
          <div className="container debug-container">
            <h2>Debug Info - Fetched Data:</h2>
            <h3>Google Sheets Data:</h3>
            {fetchedData ? (
              <table>
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
              </table>
            ) : (
              <p>No data fetched</p>
            )}
          </div>
          
          <h1>זכויות</h1>

          {/* Container: Senior Citizen Card */}
          {isContainerVisible('InfoCard_Rights_91') && (
            <div className="container">
              <h3>תעודת אזרח ותיק</h3>
              <p>
                תעודת אזרח ותיק מזכה בהנחות והטבות שונות בתחומים רבים ביניהם תרבות, תחבורה, מוניציפאלי ועוד
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_Rights_91')}
              >
                {expandedItems['InfoCard_Rights_91'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_Rights_91'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פירוט הטבות</h3>
                  <p>
                    הנחות לתחבורה ציבורית, מוזיאונים, רשות הטבע והגנים, מופעי תיאטרון, בתי קולנוע ועוד<br/>
                    הנחות על תרופות, מכשור רפואי ושירותים בקופות החולים.<br/>
                    הנחות בתשלומי חשמל, מים, ארנונה (תלוי מבחן הכנסה).
                  </p>
                </div>

                <div className="content-section">
                  <h3>מימוש וקבלת התעודה</h3>
                  <p>
                    זכאות אוטומטית: התעודה נשלחת באופן אוטומטי עם ההגעה לגיל הזכאות.<br/>
                    סוג וגודל ההטבות גדל לפי מדרגות; גיל יציאה לפנסיה, 70, 80.
                  </p>
                  <div className="links-container">
                    <a href="https://form.mse.gov.il/seniorcard/(S(y3unu3e0qszssj0ugxcsdaj3))/default.aspx" target="_blank" rel="noopener noreferrer">
                      טופס מכוון למימוש
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>המלצות וסיוע נוסף</h3>
                  <p>
                    שמרו את התעודה בהישג יד והציגו אותה בהגעה ליעדים, הטבות אזרח ותיק משתנות באופן קבוע וחבל לפספס.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Senior Citizen Allowance */}
          {isContainerVisible('InfoCard_Rights_92') && (
            <div className="container">
              <h3>קצבת אזרח ותיק</h3>
              <p>
                תשלום חודשי מהמוסד לביטוח לאומי לאזרחים שהגיעו לגיל פרישה, הקיצבה אמורה להתקבל באופן אוטומטי.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_Rights_92')}
              >
                {expandedItems['InfoCard_Rights_92'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_Rights_92'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>אופן מימוש</h3>
                  <p>
                    הקצבה משולמת באופן אוטומטי למי שעומדים במבחן הכנסות והגיעו לגיל פריסה ולכל מי שעבר את גיל 70 ללא תלות במבחן הכנסה<br/>
                    אם הקצבה לא התקבלה, נדרש להגיש תביעה מקוונת בביטוח הלאומי או לפנות לסניף הקרוב למקום מגוריכם ולהגיש את הטפסים הנדרשים
                  </p>
                  <div className="links-container">
                    <a href="https://www.btl.gov.il/benefits/old_age/Conditions_of_eligibility/Pages/%D7%94%D7%9B%D7%A0%D7%A1%D7%95%D7%AA%20%D7%91%D7%92%D7%99%D7%9C%20%D7%94%D7%A4%D7%A8%D7%99%D7%A9%D7%94.aspx" target="_blank" rel="noopener noreferrer">
                      ביצוע מבחן הכנסה
                    </a>
                    <a href="https://govforms.gov.il/mw/forms/T480@btl.gov.il" target="_blank" rel="noopener noreferrer">
                      טופס און-ליין לתביעת תשלום
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>דגשים והמלצות</h3>
                  <p>
                    וודאו שהפרטים האישיים מעודכנים במוסד לביטוח לאומי כדי למנוע עיכובים בקבלת הקצבה.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Disability Parking Badge - New */}
          {isContainerVisible('InfoCard_Rights_93') && (
            <div className="container">
              <h3>תו נכה - חדש</h3>
              <p>
                הסדרי חניה מותאמים המאפשרים חניה נגישה ונוחה
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_Rights_93')}
              >
                {expandedItems['InfoCard_Rights_93'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_Rights_93'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>זכאויות והטבות לבעלי התו</h3>
                  <p>
                    חנייה במקומות המיועדים לנכים (חניות מסומנות עם שילוט מתאים).<br/>
                    פטור מתשלום בחניונים מוסדרים ובחניות כחול-לבן, במגבלות החוק המקומי.<br/>
                    אפשרות לקבל חנייה מסודרת ליד הבית (בהתאם לאישור הרשות המקומית).<br/>
                    כניסה לאזורים עם הגבלות תנועה, כגון מדרחובים או אזורים שאסורים לכלי רכב רגילים.<br/>
                    פטור/הנחה מאגרת רישוי רכב.
                  </p>
                  <div className="links-container">
                    <a href="https://auth.govforms.gov.il/mw/forms/DisabledParkingBadg%40mot.gov.il" target="_blank" rel="noopener noreferrer">
                      במידה והנחת האגרה לא התקבלה אוטומטית הגישו כאן
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>קריטריונים לזכאות</h3>
                  <p>
                    אדם עם מוגבלות פיזית, מחלה כרונית או מצב רפואי שמקשה על ניידות עצמאית (קבוע או זמנית).<br/>
                    לרוב, הזכאות ניתנת למי שיש לו לפחות 40% נכות רפואית ממשרד הבריאות או המוסד לביטוח לאומי – אך לא תמיד זהו הקריטריון היחיד, ולכן יש לבדוק את הזכאות מול משרד התחבורה.
                  </p>
                </div>

                <div className="content-section">
                  <h3>אופן מימוש תו הנכה</h3>
                  <p>
                    לקראת הגשת הבקשה באתר משרד התחבורה הכינו את המסמכים הבאים:<br/>
                    אישור רפואי מרופא מומחה.<br/>
                    צילום תעודת זהות כולל ספח.<br/>
                    רישיון נהיגה ורישיון רכב.
                  </p>
                  <div className="links-container">
                    <a href="https://www.gov.il/he/service/disability_parking_badge" target="_blank" rel="noopener noreferrer">
                      הגשת בקשה לתו
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>מימוש תו לרכבי בני משפחה נוספים לטובת היסעים</h3>
                  <p>
                    של המטופל במטפל, ואת השימוש הקבוע ברכב להסעת המטופל.<br/>
                    ציינו שאתם גרים קרוב למטופל ושהוא מסתייע בכם בכדי להגיע למקומות שונים.<br/>
                    בקשו מהרופא לכלול התייחסות ישירה לכך שהמטופל זקוק לליווי והסעה על ידי בן המשפחה.<br/>
                    *תו החניה יהיה בתוקף כאשר המטופל איתכם ברכב.
                  </p>
                </div>

                <div className="content-section">
                  <h3>הסתייעות ברשות המקומית</h3>
                  <p>
                    לטובת קבלת חניה קרובה לבית, פנו לרשות המקומית עם מסמכים המעידים על הצורך. חשוב להראות שיש מגבלת תנועה קבועה ו/או תלות בעזרי ניידות.<br/>
                    גם אם המגבלה הינה זמנית, ניתן לקבל תו זמני למשך תקופת השיקום.<br/>
                    לכל רשות סל הטבות שונה, בדקו מול הרשות המקומית לגבי פטורים נוספים ותמיכה באזורים מוגבלים.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Disability Parking Badge - Change in Medical Condition */}
          {isContainerVisible('InfoCard_Rights_94') && (
            <div className="container">
              <h3>תו נכה - שינוי במצב רפואי</h3>
              <p>
                מכיוון שחל שינוי במצב הרפואי ובצרכים, ניתן לעדכן מסמכים רפואיים דרך האתר.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_Rights_94')}
              >
                {expandedItems['InfoCard_Rights_94'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_Rights_94'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>עדכונים בתו הנכה</h3>
                  <div className="links-container">
                    <a href="https://www.gov.il/he/service/disability_parking_badge" target="_blank" rel="noopener noreferrer">
                      הגשת בקשות שינוי והתאמה במשרד התחבורה
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>הסתייעות ותמיכת רשות מקומית</h3>
                  <p>
                    בשביל חניה קרובה לבית, פנו לרשות המקומית עם מסמכים המעידים על הצורך. חשוב להראות שיש מגבלת תנועה קבועה ו/או תלות בעזרי ניידות.<br/>
                    לכל רשות סל הטבות שונה, בדקו מול הרשות המקומית לגבי פטורים נוספים ותמיכה באזורים מוגבלים.
                  </p>
                </div>

                <div className="content-section">
                  <h3>מימוש תו לרכבי בני משפחה נוספים לטובת היסעים</h3>
                  <p>
                    של המטופל במטפל, ואת השימוש הקבוע ברכב להסעת המטופל.<br/>
                    ציינו שאתם גרים קרוב למטופל ושהוא מסתייע בכם בכדי להגיע למקומות שונים.<br/>
                    בקשו מהרופא לכלול התייחסות ישירה לכך שהמטופל זקוק לליווי והסעה על ידי בן המשפחה.<br/>
                    *תו החניה יהיה בתוקף כאשר המטופל איתכם ברכב.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Property Tax Discount */}
          {isContainerVisible('InfoCard_Rights_95') && (
            <div className="container">
              <h3>הנחה בארנונה</h3>
              <p>
                במרבית העיריות והרשויות המקומיות אזרחים ותיקים זכאים בהתאם לתנאים המשתנים מרשות לרשות
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_Rights_95')}
              >
                {expandedItems['InfoCard_Rights_95'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_Rights_95'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>הגשת בקשה וזכאות</h3>
                  <p>
                    את הבקשה מגישים מול מחלקת הארנונה ברשות המקומית או העירייה בה אתם מתגוררים, כאשר חשוב לדעת כי גובה ההנחה נקבע על בסיס מצב סוציו אקונומי<br/>
                    שימו לב כי בחלק מהרשויות ניתן להגיש גם בקשה להנחה רטרואקטיבית
                  </p>
                </div>

                <div className="content-section">
                  <h3>חשוב לדעת</h3>
                  <p>
                    ישנן רשויות בהן צריך לחדש את הבקשה בכל שנה - במידה ותרצו סיוע נוסף ומעמיק שלנו בנושא נשמח לעזור.
                  </p>
                  <div className="links-container">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      לסיוע נוסף
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container: Dental Care */}
          {isContainerVisible('InfoCard_Rights_96') && (
            <div className="container">
              <h3>טיפולי שיניים</h3>
              <p>
                בריאות חלל הפה הינה חשובה מאוד בגיל השלישי אך נוטה להידחק הצידה תחת מעמסת הצרכים ובעיות. נמליץ להיות במעקב ולהקפיד על שמירה על היגיינת הפה.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_Rights_96')}
              >
                {expandedItems['InfoCard_Rights_96'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_Rights_96'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>מימוש טיפולי שיניים מסובסדים מקופת החולים</h3>
                  <p>
                    במסגרת שירותי קופת החולים ניתן לקבל גם טיפולי שיניים ניידים בבית המטופל (בהתאם לעמידה בקריטריונים).<br/>
                    פנו לקופת החולים ובקשו פירוט על הזכאות והקריטריונים להנחות<br/>
                    פנו מרפאת השיניים של קופת החולים והציגו מסמכים המעידים על מגבלת ניידות
                  </p>
                  <div className="links-container">
                    <a href="https://www.gov.il/he/service/dental-treatments-for-elderly" target="_blank" rel="noopener noreferrer">
                      למימוש ההטבה
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>עמותות בתחום</h3>
                  <p>
                    ישנם ארגונים ועמותות מסובסדות אשר מבצעים טיפולים בבית המטופל בהתאם לצורך
                  </p>
                  <div className="links-container">
                    <a href="https://oralhealth.co.il/" target="_blank" rel="noopener noreferrer">
                      דוגמא לארגון רלוונטי
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container: Disability Certificate */}
          {isContainerVisible('InfoCard_Rights_97') && (
            <div className="container">
              <h3>תעודת נכה</h3>
              <p>
                תעודת נכה מזכה בשורה ארוכה של הטבות, הנחות וסיוע הנדרשים והיכולים לסייע לאדם במצב של נכות ביניהם גם הנחה בתשלומי מיסים.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_Rights_97')}
              >
                {expandedItems['InfoCard_Rights_97'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_Rights_97'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פירוט זכויות והטבות</h3>
                  <p>
                    פטור מתור במוסדות ציבוריים ובבתי עסק מסוימים.<br/>
                    הנחה בארנונה – ברשויות מסוימות בהתאם לקריטריונים.<br/>
                    הנחות בתחבורה ציבורית – חלק מהנכים זכאים לנסיעות חינם או בהנחה בתחבורה הציבורית.<br/>
                    פטור ממס הכנסה – בהתאם לשיעור הנכות שנקבע בביטוח לאומי.<br/>
                    סיוע ממשרד השיכון – הנחות בשכר דירה וסיוע בדיור ציבורי לזכאים.
                  </p>
                </div>

                <div className="content-section">
                  <h3>המלצות נוספות</h3>
                  <p>
                    שמרו את התעודה בהישג יד – חלק מההטבות ניתנות רק בהצגת התעודה.<br/>
                    ייתכן שתעודת נכה תאפשר לכם הקלות והחזרים גם בביטוחים פרטיים – בדקו מול חברת הביטוח.<br/>
                    מדי שנה מתעדכנות זכויות חדשות לנכים – כדאי לבדוק באתרי הזכויות של ביטוח לאומי והמוסדות הרלוונטיים.
                  </p>
                  <div className="links-container">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      לסיוע מול הביטוח הפרטי
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>קריטריונים אפשריים לקבלת תעודת נכה אחרי שבר בירך (תעודה קבוע או זמנית)</h3>
                  <p>
                    אזרחים ותיקים שקיבלו נכות רפואית של 40% ומעלה בעקבות השבר יכולים להיות זכאים לתעודת נכה.<br/>
                    אם השבר גרם לאובדן כושר ניידות משמעותי, יש אפשרות לקבל קצבת שירותים מיוחדים.<br/>
                    אם נקבעו 90% נכות רפואית ומעלה, עשויות להיות הטבות נוספות כגון פטור ממס הכנסה, הנחות נוספות בתשלומי ארנונה והנחות בתחבורה ציבורית.<br/>
                    ההגשה נעשית או באמצעות אתר הביטוח הלאומי או באמצעות הליכה לסניף הקרוב, לבקשה נדרש לצרף את כלל המסמכים הרפואיים הרלוונטיים, כמו כן ייתכן ותדרשו להגיע לועדה רפואית
                  </p>
                  <div className="links-container">
                    <a href="https://b2b.btl.gov.il/BTL.ILG.Payments/TeudatNecheInfo.aspx" target="_blank" rel="noopener noreferrer">
                      הגשת בקשה לתעודת נכה
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container: Special Services Allowance */}
          {isContainerVisible('InfoCard_Rights_98') && (
            <div className="container">
              <h3>קצבת שירותים מיוחדים (שר"מ)</h3>
              <p>
                קצבת שירותים מיוחדים (שר"מ) היא קצבה חודשית הניתנת על ידי המוסד לביטוח לאומי לאנשים עם מוגבלות פיזית משמעותית.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_Rights_98')}
              >
                {expandedItems['InfoCard_Rights_98'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_Rights_98'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פירוט אודות קצבת שירותים מיוחדים</h3>
                  <p>
                    קצבת שירותים מיוחדים (שר"מ) ניתנת רק למי שהתחיל לקבל אותה לפני גיל פרישה (*ניתן להגיש מגיל 18 ועד 6 חודשים לאחר גיל הפרישה) אם אדם לא קיבל קצבת שר"מ לפני גיל הפרישה, הוא לא יוכל להגיש בקשה חדשה לאחר שהגיע לגיל הפרישה. במקום זאת, הוא יוכל לבדוק זכאות לגמלת סיעוד.<br/><br/>
                    מה מקבלים:<br/>
                    תשלום חודשי מביטוח לאומי לאזרחים ותיקים הזקוקים לעזרה קבועה בפעולות יומיומיות כגון רחצה, אכילה, הלבשה, ניידות ושליטה על הפרשות.<br/>
                    הקצבה משמשת למימון מטפל סיעודי, עזרה של בן משפחה, או הוצאות נוספות הקשורות לטיפול באזרח הוותיק.<br/>
                    הקצבה משולמת בנוסף לקצבת אזרח ותיק (בשונה מגמלת סיעוד, המחליפה את קצבת האזרח הוותיק).
                  </p>
                </div>

                <div className="content-section">
                  <h3>שימו לב</h3>
                  <p>
                    במקרים רבים קצבת שר"מ עדיפה על קצבת סיעוד. המערכות המוסדיות עלולות להעביר את המטופל מבלי לידע אתכם וחשוב שתיהיו בבקרה על הנושא ותוודאו שלא פוגעים בזכויותיו.
                  </p>
                  <div className="links-container">
                    <a href="https://www.gov.il/he/service/itc-request-for-fixed-rights-at-retirement-age" target="_blank" rel="noopener noreferrer">
                      קיבוע קצבה בעת יציאה לפנסיה
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>הסבר זכאות</h3>
                  <p>
                    אזרח ותיק שממשיך לקבל קצבת נכות כללית – כלומר, נכה שהגיע לגיל פרישה וכבר היתה לו קצבת שר"מ וממשיך לעמוד בקריטריונים של נכות רפואית ואובדן כושר תפקודי.<br/>
                    מי שזקוק לעזרה קבועה בביצוע פעולות יומיומיות – כולל קשישים המרותקים למיטה, נעזרים בכיסא גלגלים, או זקוקים לעזרה בפעולות בסיסיות.<br/>
                    מי שאינו שוהה במוסד סיעודי – הקצבה ניתנת למי שמתגורר בביתו או בדיור מוגן שאינו מוסד סיעודי בפיקוח ממשלתי.
                  </p>
                </div>

                <div className="content-section">
                  <h3>הגדלה ושימור קצבה</h3>
                  <p>
                    צירוף מסמכים רפואיים ותלושי שכר של חצי השנה האחרונה – יש לצרף דו"ח רפואי מרופא משפחה, המלצה של גריאטר או רופא מומחה, ואבחונים המעידים על מצב סיעודי או ירידה בתפקוד.<br/>
                    בדיקת זכאות בוועדה רפואית – ביטוח לאומי עשוי לשלוח אחות מוסמכת לבית המטופל כדי להעריך את יכולתו לבצע פעולות יומיומיות.<br/>
                    הקצבה מתקבלת בתשלום חודשי ישירות אל המטופל ולא באמצעות שירותים, וקיימות 4 רמות זכאות - משיעור 50% שמזכה ב 1,880 ש"ח ועד 235% שמזכה ב 8,828 ש"ח.
                  </p>
                  <div className="links-container">
                    <a href="https://forms.gov.il/globaldata/getsequence/gethtmlform.aspx?formType=T7849@btl.gov.il" target="_blank" rel="noopener noreferrer">
                      תביעה מול ביטוח לאומי
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container: Caregiver Family Rights */}
          {isContainerVisible('InfoCard_Rights_99') && (
            <div className="container">
              <h3>זכויות המשפחה המטפלת</h3>
              <p>
                התמודדות בטיפול בן משפחה הינה מורכבת ודורשת מאיתנו קשב רב, זמן והוצאות כלכליות, מתוך ההבנה הזו דאגו רשויות שונות להטבות וזכויות בעבור בני המשפחה המטפלים
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_Rights_99')}
              >
                {expandedItems['InfoCard_Rights_99'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_Rights_99'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>הטבות מס</h3>
                  <p>
                    זיכוי במס בשל מימון אשפוז סיעודי: במידה ואתם משתתפים במימון החזקת הורה במוסד סיעודי, אתם עשויים להיות זכאים לזיכוי במס הכנסה, בהתאם לקריטריונים של מבחן הכנסה.<br/><br/>
                    מסמכים נדרשים וטפסים:<br/>
                    טופס 116א: בקשה לזיכוי ממס בשל הוצאות החזקת קרוב במוסד.<br/>
                    טופס 127: אישור רפואי על מצב הקרוב.<br/>
                    קבלות ואסמכתאות: הוכחות לתשלומים ששולמו למוסד הסיעודי.<br/>
                    את הטפסים והמסמכים יש להגיד לפקיד השומר באזור מגוריכם, ניתן לעשות זאת במהלך שנת המס או בסיומה.<br/>
                    הבטחת הכנסה: מי שמטפל בהורה (בן משפחה) חולה ומפסיק לעבוד בשל כך, עשוי להיות זכאי לקצבת הבטחת הכנסה ללא צורך במבחן תעסוקה.
                  </p>
                  <div className="links-container">
                    <a href="https://www.gov.il/BlobFolder/service/itc-request-for-tax-credits-disabled-relative/he/116a23.pdf" target="_blank" rel="noopener noreferrer">
                      טופס 116א
                    </a>
                    <a href="https://www.gov.il/blobFolder/service/itc-request-for-tax-credits-disabled-relative/he/teuda-refuit.pdf" target="_blank" rel="noopener noreferrer">
                      טופס 127
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>העסקת קרוב משפחה כמטפל</h3>
                  <p>
                    מטופל שזכאי לגמלת סיעוד יכול להעסיק בן משפחה כמטפל, ולקבל את הגמלה עבור העסקתו, בתנאי שהמטפל עבר הכשרה מתאימה וההעסקה מתבצעת דרך חברת סיעוד מוכרת.<br/><br/>
                    תנאי העסקת בן משפחה כמטפל סיעודי:<br/>
                    המטופל חייב להיות זכאי לגמלת סיעוד מהמוסד לביטוח לאומי.<br/>
                    המטפל יכול להיות כל בן משפחה מגיל 18 ומעלה.<br/>
                    העסקת בן המשפחה כמטפל מתבצעת אך ורק דרך חברת סיעוד או כוח אדם העובדת עם המוסד לביטוח לאומי.<br/>
                    בבית המטופל חייב להיות טלפון או מערכת אחרת המאפשרת דיווח נוכחות של המטפל.<br/>
                    המטופל צריך להסכים לקבל טיפול מקרוב משפחתו.<br/>
                    מצאו חברת סיעוד באזור מגוריכם, הגישו בקשה להיות מכורים כמטפל של בן המשפחה תחת חברת הסיעוד. לאחר אישור, תועסקו דרכה ותדרשו לדווח על שעות העבודה באמצעות מערכת רישום נוכחות מרחוק.
                  </p>
                </div>

                <div className="content-section">
                  <h3>סיוע ותמיכה נפשית</h3>
                  <p>
                    קיימים מרכזי תמיכה, קבוצות סיוע וייעוץ לבני משפחה מטפלים, המספקים תמיכה רגשית, ומידע שימושי רב
                  </p>
                  <div className="links-container">
                    <a href="https://yad-sarah.net/community/%D7%99%D7%93-%D7%9C%D7%AA%D7%95%D7%9E%D7%9A-%D7%A1%D7%99%D7%95%D7%A2-%D7%9C%D7%9E%D7%A9%D7%A4%D7%97%D7%94/" target="_blank" rel="noopener noreferrer">
                      הסתייעות ביד לתומך
                    </a>
                    <a href="https://emda.org.il/%D7%A7%D7%91%D7%95%D7%A6%D7%95%D7%AA-%D7%AA%D7%9E%D7%99%D7%9B%D7%94/" target="_blank" rel="noopener noreferrer">
                      הסתייעות בעמדא
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>לימוד מניסיון משפחות אחרות</h3>
                  <p>
                    ישנן משפחות רבות שעברו תהליך דומה קודם לכן ורבות מהן רוצות ומוכנות לעזור ולתמוך במשפחות שמתחילות עכשיו את התהליך. במידה ותרצו מנטור מלווה שידע לשתף אתכם בתובנות שלו מהשטח ולהבין מה באמת עובר עליכם אתם מוזמנים להירשם
                  </p>
                  <div className="links-container">
                    <a href="hub.theoak.io" target="_blank" rel="noopener noreferrer">
                      לליווי ותמיכה
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container: Nursing Home Assistance */}
          {isContainerVisible('InfoCard_Rights_100') && (
            <div className="container">
              <h3>סיוע במימון בית אבות לאזרחים ותיקים עצמאיים או תשושים</h3>
              <p>
                אזרחים ותיקים עצמאיים או תשושים (המתקשים בתפקוד יומיומי אך אינם סיעודיים) אשר מצבם הכלכלי אינו מאפשר להם לממן באופן מלא שהות בבית אבות, עשויים לקבל סיוע במימון דרך משרד הרווחה.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_Rights_100')}
              >
                {expandedItems['InfoCard_Rights_100'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_Rights_100'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>מימוש והגשה</h3>
                  <p>
                    יש לפנות ללשכת הרווחה המקומית או לעובד סוציאלי בקהילה.<br/>
                    התהליך כולל הערכה תפקודית וכלכלית של המבקש ובני משפחתו.<br/>
                    לאחר האישור, ניתן לבחור בית אבות מתוך רשימת המוסדות המורשים.
                  </p>
                  <div className="links-container">
                    <a href="https://www.gov.il/he/departments/dynamiccollectors/molsa-social-departmentsd-list" target="_blank" rel="noopener noreferrer">
                      איתור לשכת הרווחה הקרובה
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>סיוע במימון אישפוז סיעודי</h3>
                  <p>
                    אזרחים ותיקים במצב סיעודי או תשושי נפש (למשל חולי אלצהיימר, בעלי דימנציה מתקדמת , ירידה קוגניטיבית משמעותית), הזכאים לטיפול רפואי והשגחה צמודהעשויים לקבל סיוע במימון האשפוז במוסד מתאים דרך משרד הבריאות.<br/><br/>
                    אופן המימוש:<br/>
                    הערכת תפקוד רפואית – נערכת על ידי צוות גריאטרי מוסמך לקביעת הזכאות לאשפוז סיעודי.<br/>
                    בדיקה כלכלית – קביעת גובה ההשתתפות של המטופל ובני משפחתו במימון האשפוז.<br/>
                    ניתן להסתייע בעובד סוציאלי בבית החולים או בקהילה בתהליך ההגשה
                  </p>
                  <div className="links-container">
                    <a href="https://www.gov.il/he/service/assistance-in-financing-nursing-hospitalization" target="_blank" rel="noopener noreferrer">
                      בקשה למימון
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>דיור מוגן ציבורי בבית גיל הזהב</h3>
                  <p>
                    אזרחים ותיקים הזכאים לדיור ציבורי ואינם בעלי דירה יכולים לגור בבתי דיור מוגן ציבוריים של משרד הבינוי והשיכון, בדירות בנות חדר וחצי או שני חדרים, תוך השתתפות מסובסדת בשכר הדירה.<br/>
                    לטובת מימוש הזכות נדרש לפנות למשרד הבינוי והשיכון או הרשות המקומית, במסגרת התהליך תתבקשו לאישורי הכנסה ותעודת אזרח ותיק של ההורה לטובת קביעת רמת הסבסוד.
                  </p>
                  <div className="links-container">
                    <a href="https://www.gov.il/apps/moch/viewlist/list/gil_zahav" target="_blank" rel="noopener noreferrer">
                      רשימת בתי גיל הזהב
                    </a>
                    <a href="https://login.gov.il/nidp/saml2/sso?id=usernamePasswordSMSOtp&sid=0&option=credential&sid=0" target="_blank" rel="noopener noreferrer">
                      טופס בקשה דיגיטלי
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>קהילה תומכת – שירותים תומכים לקשישים בביתם</h3>
                  <p>
                    אזרחים ותיקים עצמאיים או תשושים המתגוררים בביתם ומעוניינים בתמיכה נוספת יכולים להצטרף לתוכנית "קהילה תומכת" שמציעה לחצן מצוקה, ביקורי מתנדבים, סיוע רפואי, פעילויות חברתיות ועוד.<br/>
                    לבירורים יש לפנות לעירייה או לרשות המקומית כדי לבדוק את זמינות התוכנית באזור.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Queue Exemption */}
          {isContainerVisible('InfoCard_Rights_101') && (
            <div className="container">
              <h3>פטור מהמתנה בתור</h3>
              <p>
                אזרחים ותיקים בני 80 ומעלה זכאים לקבל שירות ציבורי ללא המתנה בתור.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_Rights_101')}
              >
                {expandedItems['InfoCard_Rights_101'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_Rights_101'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <p>
                    הזכות חלה במפגשים פנים אל פנים עם רשויות ציבוריות או במקומות ציבוריים. עם זאת, הפטור אינו תקף במקרים של תור שנקבע מראש, המתנה לטיפול רפואי, שירותי רוקחות או כאשר ההמתנה מתבצעת בתוך כלי רכב.
                  </p>
                </div>

                <div className="content-section">
                  <h3>אופן מימוש הזכות</h3>
                  <p>
                    בעת הגעה למקום ציבורי, יש להציג תעודה מזהה להוכחת הגיל (כגון תעודת זהות או תעודת אזרח ותיק).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Third in Slacks */}
          {isContainerVisible('InfoCard_Rights_102') && (
            <div className="container">
              <h3>שלישי בשלייקס</h3>
              <p>
                מיזם תרבות ופנאי המקנה פעילויות רבות בסבסוד לבני הגיל השלישי
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_Rights_102')}
              >
                {expandedItems['InfoCard_Rights_102'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_Rights_102'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>הסבר על הזכות</h3>
                  <p>
                    מיזם המיועד לאזרחים ותיקים, המציע הנחות והטבות במגוון תחומי תרבות, פנאי וצרכנות בכל יום שלישי. ההטבות כוללות הנחות בבתי קולנוע, תיאטראות, אתרי מורשת, מסעדות ועוד.
                  </p>
                </div>

                <div className="content-section">
                  <h3>אופן מימוש הזכות</h3>
                  <p>
                    יש להתעדכן ברשימת בתי העסק המשתתפים במיזם באתר המשרד לשוויון חברתי או בפלטפורמות המיועדות לכך. בעת ההגעה לבית העסק, הציגו את תעודת האזרח הוותיק כדי לקבל את ההנחה.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Bank Fee Discounts */}
          {isContainerVisible('InfoCard_Rights_103') && (
            <div className="container">
              <h3>הנחות בעמלות בנקאיות</h3>
              <p>
                אזרחים ותיקים זכאים להנחה בעמלות הבנקים.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_Rights_103')}
              >
                {expandedItems['InfoCard_Rights_103'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_Rights_103'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>הסבר על ההטבה</h3>
                  <p>
                    בכל חודש, עבור ארבע הפעולות הראשונות המתבצעות באמצעות פקיד בנק, ייגבה תעריף של פעולה בערוץ ישיר, שהינו נמוך משמעותית מתעריף פעולה באמצעות פקיד.
                  </p>
                </div>

                <div className="content-section">
                  <h3>אופן מימוש ההטבה</h3>
                  <p>
                    ההנחה ניתנת באופן אוטומטי בחשבון הבנק. עם זאת, מומלץ לוודא מול הבנק שההטבה מיושמת בפועל.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Ambulance - Maccabi */}
          {isContainerVisible('InfoCard_Rights_113') && (
            <div className="container">
              <h3>אמבולנס</h3>
              <p>
                מכבי מכסה את עלות הפינוי במלואה למאושפזים.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_Rights_113')}
              >
                {expandedItems['InfoCard_Rights_113'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_Rights_113'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>אופן מימוש ההחזר</h3>
                  <p>
                    כדי לממש את ההחזר, יש להגיש למכבי את חשבונית האמבולנס המקורית, וסיכום האשפוז או ביקור במיון. ההגשה מתבצעת דרך האתר, האפליקציה או סניף מכבי.<br/>
                    להגשה באתר מכבי – החזרים אישורים והתחייבויות &#8594; בקשה להחזר כספי &#8594; הסעות ונסיעות &#8594; פינויים באמבולנס &#8594; צירוף מסמכים (קבלה וחשבונית מס מקורית + מסמכים רפואיים) ושליחת הבקשה
                  </p>
                  <div className="links-container">
                    <a href="https://www.maccabi4u.co.il/31276/digital-services/administration/refund_request/#showData_134543" target="_blank" rel="noopener noreferrer">
                      בקשת החזר כספי
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>דגשים חשובים</h3>
                  <p>
                    שמרו את חשבונית האמבולנס המקורית - מכבי דורשת מקור בלבד, לא צילום.<br/>
                    אם הפינוי בוצע דרך מד"א – אפשר לבקש מהם עותק מקורי במקרה של אובדן.<br/>
                    בקשו סיכום ביקור מהמיון - גם אם לא היה אשפוז, סיכום רפואי יכול לעזור להוכיח שמדובר במקרה חירום.<br/>
                    הגישו מהר - כדאי להגיש את הבקשה תוך 90 ימים מהאירוע.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Ambulance - Clalit */}
          {isContainerVisible('InfoCard_Rights_114') && (
            <div className="container">
              <h3>אמבולנס</h3>
              <p>
                כללית מכסה את עלות הפינוי במלואה למאושפזים, ותשלם אוטומטית למד״א או לספק האמבולנס.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_Rights_114')}
              >
                {expandedItems['InfoCard_Rights_114'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_Rights_114'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>התנהלות במקרה של קבלת דרישת תשלום</h3>
                  <p>
                    ככל אין צורך להגיש בקשת החזר, אלא אם קיבלתם דרישת תשלום בטעות או שילמתם בעצמכם לפני שהובהר שמדובר במקרה מזכה.<br/><br/>
                    מסמכים נדרשים לטובת קבלת החזר במקרים אלו:<br/>
                    סיכום אשפוז או אישור מהקבלה בבית החולים.<br/>
                    דרישת התשלום שקיבלתם ממד"א (אם רלוונטי).<br/>
                    חשבונית מס קבלה מקורית אם כבר שילמתם.<br/>
                    דוח מיון ודוח אמבולנס (ניתן לבקש מבית החולים וממד״א)
                  </p>
                  <div className="links-container">
                    <a href="https://mushlam.clalit.co.il/he/Pages/privateclaimsnew.aspx" target="_blank" rel="noopener noreferrer">
                      הגשת בקשת החזר מכללית
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>דגשים חשובים</h3>
                  <p>
                    לא לשלם לפני בירור – אם היה אשפוז, כללית אמורה לשלם למד״א.<br/>
                    שמרו את החשבונית המקורית אם שילמתם – היא דרושה להחזר.<br/>
                    שמרו אצלכם עותק של כל מסמך.<br/>
                    הגישו תוך 90 ימים מהאירוע – כדי לשמור על הזכאות.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Ambulance - All HMOs */}
          {isContainerVisible('InfoCard_Rights_115') && (
            <div className="container">
              <h3>אמבולנס</h3>
              <p>
                הקופה מכסה את עלות הפינוי במלואה למאושפזים. כדי לממש את ההחזר, יש להגיש את חשבונית האמבולנס המקורית, וסיכום האשפוז או ביקור במיון באתר הקופה, האפליקציה או הסניף הקרוב לביתכם.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_Rights_115')}
              >
                {expandedItems['InfoCard_Rights_115'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_Rights_115'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>טיפים ודגשים חשובים</h3>
                  <p>
                    שמרו את חשבונית האמבולנס המקורית - מכבי דורשת מקור בלבד, לא צילום.<br/>
                    אם הפינוי בוצע דרך מד"א – אפשר לבקש מהם עותק מקורי במקרה של אובדן.<br/>
                    בקשו סיכום ביקור מהמיון - גם אם לא היה אשפוז, סיכום רפואי יכול לעזור להוכיח שמדובר במקרה חירום.<br/>
                    הגישו מהר - כדאי להגיש את הבקשה תוך 90 ימים מהאירוע.
                  </p>
                  <div className="links-container">
                    <a href="https://www.meuhedet.co.il/%D7%9E%D7%90%D7%95%D7%97%D7%93%D7%AA-%D7%90%D7%95%D7%A0%D7%9C%D7%99%D7%99%D7%9F-%D7%90%D7%AA%D7%A8-%D7%95%D7%90%D7%A4%D7%9C%D7%99%D7%A7%D7%A6%D7%99%D7%94/%D7%9E%D7%90%D7%95%D7%97%D7%93%D7%AA-%D7%90%D7%95%D7%A0%D7%9C%D7%99%D7%99%D7%9F/%D7%91%D7%A7%D7%A9%D7%94-%D7%94%D7%97%D7%96%D7%A8%D7%99%D7%9D-%D7%91%D7%90%D7%95%D7%A0%D7%9C%D7%99%D7%99%D7%9F/" target="_blank" rel="noopener noreferrer">
                      הגשת בקשת החזר ממאוחדת
                    </a>
                    <a href="https://www.leumit.co.il/heb/remotemedicalservices/onlineservices/refund/" target="_blank" rel="noopener noreferrer">
                      הגשת בקשת החזר מלאומית
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

export default RightsPage; 