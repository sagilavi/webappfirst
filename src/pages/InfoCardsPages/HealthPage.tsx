import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchSheetData } from '../../utils/googleSheetsConfig';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from '../../styles/globalStyles';

interface SheetData {
  headers: string[];
  values: string[];
}

const HealthPage = () => {
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
          <h1>בריאות</h1>
          
          {/* Container: Same HMO */}
          {isContainerVisible('InfoCard_health_44') && (
            <div className="container">
              <h3>נמצאים באותה קופת החולים</h3>
              <p>
                מצוין שאתם וההורה רשומים לאותה קופת חולים! זה מאפשר לכם לקבל הרשאות גישה לחשבון שלו ולנהל את התהליכים בצורה יעילה יותר.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_health_44')}
              >
                {expandedItems['InfoCard_health_44'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_health_44'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>מימוש</h3>
                  <p>
                    אנחנו ממליצים לפנות לקופה ולבקש אישור לצפייה ושימוש במשתמש של ההורה – כך תוכלו לעזור לו בתיאום תורים, בדיקות ומעקב רפואי בצורה פשוטה ונוחה.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Different HMO */}
          {isContainerVisible('InfoCard_health_45') && (
            <div className="container">
              <h3>נמצאים בקופות חולים שונות</h3>
              <p>
                מאחר שאתם לא רשומים לאותה קופת חולים, הדרך היעילה ביותר לנהל את ענייניו הרפואיים של ההורה היא להוריד את האפליקציה של הקופה שלו, להכיר את המערכת ולדאוג שיהיו לכם שם המשתמש והסיסמה שלו.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_health_45')}
              >
                {expandedItems['InfoCard_health_45'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_health_45'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <p>
                    כך תוכלו לעזור לו בתיאום תורים, מעקב אחר בדיקות וטיפולים, ולוודא שהוא מקבל את כל מה שהוא צריך ללא עיכובים.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Medication Follow-up */}
          {isContainerVisible('InfoCard_health_46') && (
            <div className="container">
              <h3>טיפולי המשך תרופתיים</h3>
              <p>
                התייעצו עם רוקח לגבי אינטראקציות אפשריות בין התרופות החדשות לתרופות שההורה כבר נוטל.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_health_46')}
              >
                {expandedItems['InfoCard_health_46'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_health_46'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>מעקב שוטף</h3>
                  <p>
                    קבעו לוח זמנים לנטילה ומעקב רפואי לוודא את יעילות התרופות. כמו כן כולנו ערניים למקרים של שכחת תרופות אבל חשוב לשים לב גם למקרים של לקיחת מינון כפול.
                  </p>
                  <div className="links-container">
                    <a href="https://he.hadassah.org.il/patient-information/hadassaheshel/" target="_blank" rel="noopener noreferrer">
                      מוקד להתייעצות תרופתית של הדסה
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>תופעות לוואי</h3>
                  <p>
                    היו ערניים לתופעות כמו עצירות, עייפות או בעיות עיכול. שימו לב להשפעה על מצב הרוח של ההורה.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Physiotherapy Follow-up (Clalit) */}
          {isContainerVisible('InfoCard_health_47') && (
            <div className="container">
              <h3>טיפול המשך פיזיותרפיה - כללית</h3>
              <p>
                טיפול פיזיותרפי נועד לשמר את טווח התנועה, למנוע את הידרדרות השרירים וסיבוכים כמו פצעי לחץ או התקשות המפרקים וכמובן לעזור למפרק להחלים.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_health_47')}
              >
                {expandedItems['InfoCard_health_47'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_health_47'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>התנהלות ותחילת תהליך טיפול</h3>
                  <p>
                    נמליץ כי תצטרפו לפגישה הראשונה עם הפיזיותרפיסט.
                    הכינו מסמכים רפואיים רלוונטים.
                    וודאו שההורה מבין את תהליך השיקום.
                    וודאו שיש תוכנית שיקום עם יעדים מוגדרים.
                  </p>
                </div>

                <div className="content-section">
                  <h3>תשלומים על טיפולים</h3>
                  <p>
                    עבור טיפולים בקופת החולים כללית, יש לפנות לרופא המשפחה או לרופא מומחה לקבלת הפניה.
                    נמליץ לוודא שבמכתב השחרור מצוין הצורך בפיזיותרפיה.
                    לאחר קבלת ההפניה, ניתן לקבוע תור במכוני הפיזיותרפיה.
                  </p>
                </div>

                <div className="content-section">
                  <h3>אביזרי שיקום ותרגול</h3>
                  <p>
                    בהתאם להמלצת רופא והגדרת קופת החולים כללית, ישנם אביזרי ניוד ותרגול שתוכלו לקבל מהקופה בהשאלה/השתתפות עצמאית.
                  </p>
                  <div className="links-container">
                    <a href="https://cbm.org.il/medi-products/?pc=walker%2Celectric-hospital-bed%2Ca-crane-for-the-mobility-of-the-disabled%2Cseating-system%2Cback-amidon" target="_blank" rel="noopener noreferrer">
                      אביזרים מכללית
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container: Physiotherapy Follow-up (Maccabi) */}
          {isContainerVisible('InfoCard_health_48') && (
            <div className="container">
              <h3>טיפול המשך פיזיותרפיה - מכבי</h3>
              <p>
                טיפול פיזיותרפי נועד לשמר את טווח התנועה, למנוע את הידרדרות השרירים וסיבוכים כמו פצעי לחץ או התקשות המפרקים וכמובן לעזור למפרק להחלים.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_health_48')}
              >
                {expandedItems['InfoCard_health_48'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_health_48'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>התנהלות ותחילת תהליך טיפול</h3>
                  <p>
                    נמליץ כי תצטרפו לפגישה הראשונה עם הפיזיותרפיסט.
                    הכינו מסמכים רפואיים רלוונטים.
                    וודאו שההורה מבין את תהליך השיקום.
                    וודאו שיש תוכנית שיקום עם יעדים מוגדרים.
                  </p>
                </div>

                <div className="content-section">
                  <h3>תשלומים על טיפולים</h3>
                  <p>
                    עבור טיפולים בקופת החולים מכבי, יש לפנות לרופא המשפחה או לרופא מומחה לקבלת הפניה.
                    נמליץ לוודא שבמכתב השחרור מצוין הצורך בפיזיותרפיה.
                    לאחר קבלת ההפניה, ניתן לקבוע תור במכוני הפיזיותרפיה.
                  </p>
                </div>

                <div className="content-section">
                  <h3>אביזרים בהשתתפות עצמית</h3>
                  <p>
                    פנו למטפל/אחות/פיזיותרפיסט ובקשו הפניה שתכלול אבחנה רפואית והמלצה לרכישה של הפריט.
                  </p>
                  <div className="links-container">
                    <a href="https://www.maccabi4u.co.il/new/eligibilites/2161/" target="_blank" rel="noopener noreferrer">
                      אביזרי עזר מכבי
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container: Physiotherapy Follow-up (Other) */}
          {isContainerVisible('InfoCard_health_49') && (
            <div className="container">
              <h3>טיפול המשך פיזיותרפיה</h3>
              <p>
                טיפול פיזיותרפי נועד לשמר את טווח התנועה, למנוע את הידרדרות השרירים וסיבוכים כמו פצעי לחץ או התקשות המפרקים וכמובן לעזור למפרק להחלים.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_health_49')}
              >
                {expandedItems['InfoCard_health_49'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_health_49'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>התנהלות ותחילת תהליך טיפול</h3>
                  <p>
                    נמליץ כי תצטרפו לפגישה הראשונה עם הפיזיותרפיסט.
                    הכינו מסמכים רפואיים רלוונטים.
                    וודאו שההורה מבין את תהליך השיקום.
                    וודאו שיש תוכנית שיקום עם יעדים מוגדרים.
                  </p>
                </div>

                <div className="content-section">
                  <h3>תשלומים על טיפולים</h3>
                  <p>
                    עבור טיפולים בקופת החולים, יש לפנות לרופא המשפחה או לרופא מומחה לקבלת הפניה.
                    נמליץ לוודא שבמכתב השחרור מצוין הצורך בפיזיותרפיה.
                    לאחר קבלת ההפניה, ניתן לקבוע תור במכוני הפיזיותרפיה.
                  </p>
                </div>

                <div className="content-section">
                  <h3>אביזרי שיקום ותרגול</h3>
                  <p>
                    בהתאם להמלצת רופא והגדרת קופת החולים, ישנם אביזרי ניוד ותרגול שתוכלו לקבל מהקופה בהשאלה/השתתפות עצמאית.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Loss of Appetite */}
          {isContainerVisible('InfoCard_health_50') && (
            <div className="container">
              <h3>ירידה בתאבון</h3>
              <p>
                ירידה בתאבון היא תופעה נפוצה לאחר ניתוח. חשוב לשמור על תזונה מאוזנת ומספקת כדי לתמוך בתהליך ההחלמה.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_health_50')}
              >
                {expandedItems['InfoCard_health_50'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_health_50'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>המלצות לשיפור התיאבון</h3>
                  <p>
                    - הקפידו על ארוחות קטנות ותכופות
                    - שלבו מזונות עשירים בחלבון
                    - הקפידו על שתייה מרובה
                    - צרו אווירה נעימה בזמן הארוחות
                    - התייעצו עם תזונאי/ת במידת הצורך
                  </p>
                </div>

                <div className="content-section">
                  <h3>תוספי תזונה</h3>
                  <p>
                    במידה ויש צורך בתוספי תזונה, התייעצו עם הרופא המטפל או תזונאי/ת.
                    ניתן לשקול שימוש במשקאות העשרה תזונתיים.
                  </p>
                </div>

                <div className="content-section">
                  <h3>מעקב ותיעוד</h3>
                  <p>
                    מומלץ לתעד את הרגלי האכילה והשתייה.
                    במקרה של ירידה משמעותית במשקל, יש לפנות לרופא המטפל.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Impatience and Irritability */}
          {isContainerVisible('InfoCard_health_51') && (
            <div className="container">
              <h3>אובדן סבלנות ועצבנות</h3>
              <p>
                תחושות של חוסר סבלנות ועצבנות הן טבעיות בתקופת ההחלמה. חשוב להכיר בהן ולמצוא דרכים להתמודד איתן.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_health_51')}
              >
                {expandedItems['InfoCard_health_51'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_health_51'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>טכניקות להרגעה</h3>
                  <p>
                    - תרגילי נשימה פשוטים
                    - האזנה למוזיקה מרגיעה
                    - שיחה עם בני משפחה או חברים
                    - פעילות פנאי מהנה במסגרת המגבלות
                  </p>
                </div>

                <div className="content-section">
                  <h3>תמיכה מקצועית</h3>
                  <p>
                    אם תחושות העצבנות מתגברות או מפריעות לתפקוד היומיומי, מומלץ לפנות לעובד/ת סוציאלי/ת או פסיכולוג/ית.
                  </p>
                </div>

                <div className="content-section">
                  <h3>תקשורת עם המטפל העיקרי</h3>
                  <p>
                    חשוב לשתף את המטפל העיקרי בתחושות אלו ולמצוא יחד דרכים להקל על ההתמודדות.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Breathing Difficulties */}
          {isContainerVisible('InfoCard_health_52') && (
            <div className="container">
              <h3>קשיי נשימה - כללית</h3>
              <p>
                קשיי נשימה עלולים להשפיע על איכות החיים ועל תהליך ההחלמה. חשוב לזהות אותם ולטפל בהם בהקדם.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_health_52')}
              >
                {expandedItems['InfoCard_health_52'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_health_52'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>מעקב רפואי</h3>
                  <p>
                    במקרה של קשיי נשימה, יש לפנות לרופא המטפל לקבלת הערכה וטיפול מתאים.
                    חשוב לעקוב אחר הנחיות הרופא ולקחת תרופות בהתאם להוראות.
                  </p>
                </div>

                <div className="content-section">
                  <h3>ציוד רפואי</h3>
                  <p>
                    במידת הצורך, ניתן לקבל ציוד רפואי כגון מכשיר חמצן או מכשיר אינהלציה דרך קופת החולים.
                  </p>
                  <div className="links-container">
                    <a href="https://www.clalit.co.il/he/info/services/Pages/medical_equipment.aspx" target="_blank" rel="noopener noreferrer">
                      ציוד רפואי בכללית
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>תרגילי נשימה</h3>
                  <p>
                    מומלץ לבצע תרגילי נשימה פשוטים בהנחיית פיזיותרפיסט/ית.
                    שמירה על תנוחה נכונה יכולה לסייע בהקלה על קשיי הנשימה.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Breathing Difficulties - Maccabi */}
          {isContainerVisible('InfoCard_health_53') && (
            <div className="container">
              <h3>קשיי נשימה - מכבי</h3>
              <p>
                קשיי נשימה עלולים להשפיע על איכות החיים ועל תהליך ההחלמה. חשוב לזהות אותם ולטפל בהם בהקדם.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_health_53')}
              >
                {expandedItems['InfoCard_health_53'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_health_53'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>מעקב רפואי</h3>
                  <p>
                    במקרה של קשיי נשימה, יש לפנות לרופא המטפל לקבלת הערכה וטיפול מתאים.
                    חשוב לעקוב אחר הנחיות הרופא ולקחת תרופות בהתאם להוראות.
                  </p>
                </div>

                <div className="content-section">
                  <h3>ציוד רפואי</h3>
                  <p>
                    במידת הצורך, ניתן לקבל ציוד רפואי כגון מכשיר חמצן או מכשיר אינהלציה דרך קופת החולים.
                  </p>
                  <div className="links-container">
                    <a href="https://www.maccabi4u.co.il/38-he/Maccabi.aspx" target="_blank" rel="noopener noreferrer">
                      ציוד רפואי במכבי
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>תרגילי נשימה</h3>
                  <p>
                    מומלץ לבצע תרגילי נשימה פשוטים בהנחיית פיזיותרפיסט/ית.
                    שמירה על תנוחה נכונה יכולה לסייע בהקלה על קשיי הנשימה.
                    ניתן לקבל הדרכה מפיזיותרפיסט במכבי לתרגילים מותאמים אישית.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Fever and Infection Symptoms */}
          {isContainerVisible('InfoCard_health_54') && (
            <div className="container">
              <h3>חום, אודם, נפיחות או הפרשות באזור הניתוח</h3>
              <p>
                במידה ויש חום, אודם, נפיחות או הפרשות באזור הניתוח, זה יכול להצביע על זיהום מקומי או סיסטמי שדורש טיפול אנטיביוטי. נמליץ לפנות לרופא המנתח והמשפחה בהקדם.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_health_54')}
              >
                {expandedItems['InfoCard_health_54'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_health_54'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פעולות מיידיות</h3>
                  <p>
                    במידה ויש לכם את פרטי הקשר של הרופא המנתח, נמליץ לשלוח לו תמונות על מנת לקבל חוות דעת ראשונית בהקדם.
                  </p>
                </div>

                <div className="content-section">
                  <h3>מעקב רפואי</h3>
                  <p>
                    חשוב לתעד את התסמינים ומתי הם החלו.
                    במקרה של חום גבוה או החמרה בתסמינים, פנו מיד לחדר מיון.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Sleep Issues */}
          {isContainerVisible('InfoCard_health_55') && (
            <div className="container">
              <h3>קשיי שינה</h3>
              <p>
                הפציעה, תהליך השיקום והשפעותיהם על שינוי אורחות החיים עלולים להשפיע על השינה ובו בעת שינה לא איכותית עשויה לעכב את תהליך התחדשות העצם והשיקום ואף להוביל לנפילות חוזרות.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_health_55')}
              >
                {expandedItems['InfoCard_health_55'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_health_55'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>הצעות טיפול והתנהלות</h3>
                  <p>
                    - בירור מול הרופא ובדיקת התרופות הקיימות להפחתת אלו הגורמות הפרעות שינה
                    - בדיקת אפשרות למשככי כאבים לפני השינה למניעת יקיצות בשל כאב
                    - התאמת הטיפול הפיזיותרפי ותרגילים לשיפור זרימת הדם ושחרור שרירים
                    - פנייה לייעוץ גריאטרי או נוירולוגי לטיפול בבעיות שינה מתמשכות
                    - טיפול בחרדה ודיכאון באמצעות שיחות עם מטפל רגשי או עובדת סוציאלית
                  </p>
                </div>

                <div className="content-section">
                  <h3>שיפור סביבת והרגלי השינה</h3>
                  <p>
                    - יצירת שגרת שינה קבועה עם שעת שינה ויקיצה אחידה
                    - הפחתת נמנומים במהלך היום
                    - הימנעות מחשיפה למסכים כשעה לפני השינה
                    - חשיפה לאור יום בבוקר לאיפוס השעון הביולוגי
                    - שימוש בכריות תומכות לשיפור הנוחות
                    - שימוש באמצעי הרפיה כמו מוזיקה מרגיעה או תרגולי נשימה
                    - יצירת סביבה שקטה וחשוכה עם תאורה חלשה בלילה
                  </p>
                </div>

                <div className="content-section">
                  <h3>קצבת סיעוד</h3>
                  <p>
                    בעיות שינה יכולות להעלות את דרגת קצבת הסיעוד אם ניתן להוכיח שמשפיעות על מצב התפקוד היומיומי.
                    הקפידו על תיעוד של ההשפעות כגון סחרחורות, בלבול, עייפות כרונית ועליה בכמות הנפילות.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Confusion or Memory Issues */}
          {isContainerVisible('InfoCard_health_56') && (
            <div className="container">
              <h3>בלבול או שכחה</h3>
              <p>
                פעמים רבות לאור שחיקת הרזרבות וקשיי ההסתגלות למצבים חדשים יובילו אירועים מכוננים כמו שבר ירך ליצירת בלבול ותסמיני שכחה. בחלק מן הפעמים ייתכן ומדובר בהחרפה של דמנציה ו/או מחלות קוגניטיביות אחרות, אולם במקרים אחרים מדובר במצב זמני אותו ניתן לפתור במהרה.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_health_56')}
              >
                {expandedItems['InfoCard_health_56'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_health_56'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>בירור רפואי ודגשים לבחינה</h3>
                  <p>
                    בצעו מעקב אחר תסמינים ועדכנו את הרופא המנתח והמשפחה. בקשו מרופא המשפחה הפניות לבדיקות הבאות:
                    - בדיקות דם: ספירת דם, אלקטרוליטים, B12, תפקודי כליות וכבד
                    - בדיקות שתן: לשלילת דלקת בדרכי השתן
                    - מעקב נוירולוגי / פסיכוגריאטרי: הערכה קוגניטיבית לזיהוי דמנציה או דליריום
                  </p>
                </div>

                <div className="content-section">
                  <h3>ניהול תרופתי</h3>
                  <p>
                    - התייעצו עם רופא או רוקח בנוגע להרכב התרופות הנלקח
                    - ציינו את כלל התרופות הנלקחות גם אם אינן מקושרות ישירות לשבר הירך
                    - בדקו אפשרות להתאמת זמני נטילת התרופות לשעות ערנות
                  </p>
                </div>

                <div className="content-section">
                  <h3>קצבת סיעוד</h3>
                  <p>
                    בעיות זיכרון ובלבול יכולות להעלות את דרגת קצבת הסיעוד. חשוב להדגיש כי במידה ונדרשת השגחה על המטופל הדבר מעלה משמעותית את הדירוג במבחן הזכאות.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Medical Instructions Compliance */}
          {isContainerVisible('InfoCard_health_57') && (
            <div className="container">
              <h3>יישום הנחיות רפואיות ומעקב נטילת תרופות</h3>
              <p>
                פעמים רבות אחד האתגרים הגדולים ביותר בתהליך השיקום הינו רתימת המטופל, ובמקרים אחרים גם אם המטופל רתום מאד לתהליך השיקום לצערנו לאור קשיי התנהלות ורצון לעצמאות בתהליך השיקום מתפספסת נטילת תרופות או נשכחים חלק מתרגילי השיקום.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_health_57')}
              >
                {expandedItems['InfoCard_health_57'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_health_57'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>תווך המידע</h3>
                  <p>
                    - ודאו שהמטופל מבין את מטרת ההנחיות ולא רק את הצורך בהן
                    - בקשו מהרופא/מטפל לתווך את המידע בצורה ברורה ופשוטה
                    - רשמו סיכום ברור של ההנחיות ודגשים חשובים ומקמו אותו במקומות נגישים
                    - בקשו מהרופא לבדוק אפשרות להתאמת/פישוט הטיפול בהתאם למקור הקושי
                  </p>
                </div>

                <div className="content-section">
                  <h3>בניית שגרה והתנהלות</h3>
                  <p>
                    - התאימו את ההנחיות הרפואיות לשגרת החיים של המטופל
                    - שלבו תרגילי פיזיותרפיה בפעילות נעימה כמו הליכה קצרה בחוץ
                    - עודדו את המטופל בכך שתחושת השיפור תגיע עם הזמן
                    - חזקו כל עמידה בהנחיות, גם חלקית, כדי לבנות הצלחה הדרגתית
                  </p>
                </div>

                <div className="content-section">
                  <h3>הבנת שורש הבעיה</h3>
                  <p>
                    חשוב להבין מדוע ההורה מתקשה או מסרב למלא אחר ההנחיות הרפואיות:
                    - התנגדות רגשית או פסיכולוגית – תחושת אובדן שליטה או פחד מתלות
                    - חוסר הבנה - ריבוי הוראות עשוי להיות מבלבל ומכביד
                    - חוסר נוחות או כאב – שימוש בעזרים או ביצוע תרגילים עשוי להיות לא נעים
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Power of Attorney and Guardianship */}
          {isContainerVisible('InfoCard_health_58') && (
            <div className="container">
              <h3>ייפוי כוח מתמשך, אפוטרופוס וזכויות</h3>
              <p>
                אם המטופל עדיין כשיר לקבל החלטות, ניתן לערוך ייפוי כוח מתמשך המאפשר למנות מיופה כוח שיקבל החלטות רפואיות בעתיד, במקרה שלא יוכל לעשות זאת בעצמו.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_health_58')}
              >
                {expandedItems['InfoCard_health_58'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_health_58'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>אפוטרופוס</h3>
                  <p>
                    במקרים שבהם המטופל אינו מסוגל לקבל החלטות רפואיות ומסרב לטיפולים הנחוצים, ניתן לפנות לבית המשפט לענייני משפחה בבקשה למנות אפוטרופוס לענייני גוף.
                    ההליך כולל הגשת בקשה מפורטת, תצהיר, חוות דעת רפואיות ולעיתים דוח סוציאלי.
                  </p>
                </div>

                <div className="content-section">
                  <h3>הנחיות רפואיות מקדימות</h3>
                  <p>
                    אם המטופל עדיין כשיר לקבל החלטות, הוא יכול לערוך מסמך הנחיות רפואיות מקדימות, שבו יפרט מראש את רצונותיו לגבי טיפולים רפואיים עתידיים.
                  </p>
                  <div className="links-container">
                    <a href="https://www.gov.il/he/service/dying-patient-request" target="_blank" rel="noopener noreferrer">
                      טופס מימוש הנחיות רפואיות מקדימות
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>תהליך הפעלת ההנחיות</h3>
                  <p>
                    - מאשרים את המסמך מול רופא או אחות מוסמכת
                    - מפקידים את המסמך בקופת החולים לשילוב בתיק הרפואי
                    - המסמך יהיה זמין לצוותים הרפואיים בעת הצורך
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Weight Loss */}
          {isContainerVisible('InfoCard_health_59') && (
            <div className="container">
              <h3>ירידה חריגה במשקל</h3>
              <p>
                ירידה משמעותית במשקל יכולה לגרום לאובדן מסת שריר ואנרגיה, דבר שמעלה את הסיכון לנפילות חוזרות, ומקשה על השיקום הפיזי.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_health_59')}
              >
                {expandedItems['InfoCard_health_59'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_health_59'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>המלצות התנהלות ונושאים לבירור רפואי</h3>
                  <p>
                    - שתפו את הגורם המנתח ואת רופא המשפחה בשינוי בהקדם
                    - בקשו בדיקות דם לזיהוי מחסורים תזונתיים (כמו B12, D או ברזל)
                    - וודאו שלא מדובר בבעיית פה ולסת שמקשה על האכילה
                    - פנו לדיאטן קליני להתאמת תפריט עשיר בחלבון, סידן וברזל
                    - בקשו מהפיזיותרפיסט להתאים פעילות גופנית לשימור מסת שריר
                    - נהלו מעקב שבועי אחר משקל המטופל
                  </p>
                </div>

                <div className="content-section">
                  <h3>הבנת שורש הבעיה</h3>
                  <p>
                    - חוסר תיאבון בעקבות הניתוח – כאבים, הרדמה, סטרס ושינויי אורח חיים
                    - כאב בעת אכילה או ישיבה ממושכת
                    - דיכאון או חרדה המשפיעים על התיאבון
                    - קושי בלעיסה או בבליעה
                    - שינויים בתפקוד מערכת העיכול
                    - השפעות תרופתיות על התיאבון
                  </p>
                </div>

                <div className="content-section">
                  <h3>קצבת סיעוד</h3>
                  <p>
                    ירידה חריגה במשקל יכולה להעלות את דרגת קצבת הסיעוד אם ניתן להוכיח השפעה על התפקוד היומיומי.
                    הקפידו על תיעוד ההשפעות כגון חולשה, סחרחורות ועליה בכמות הנפילות.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Dental Pain */}
          {isContainerVisible('InfoCard_health_61') && (
            <div className="container">
              <h3>כאב שיניים</h3>
              <p>
                ראשית פנו לרופא שיניים, לא מחכים שהכאב יחמיר! פעמים רבות בריאות דנטלית נדחקת הצידה לאור הקשיים והאתגרים הרפואיים והתפקודיים האחרים אולם היא בעלת השפעה רבה על המצב הבריאותי הכולל ועל איכות החיים.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_health_61')}
              >
                {expandedItems['InfoCard_health_61'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_health_61'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>מימוש זכויות ותיאום טיפולים</h3>
                  <p>
                    - ניתן לקבוע תור ביתי במחיר מסובסד עם ארגונים שונים
                    - טיפולי שיניים לאזרחים ותיקים הינם בחינם/בהשתתפות עצמית נמוכה דרך קופת החולים
                    - פנו לרופא המשפחה לבחינת אפשרות לזיהום
                    - בהתייעצות עם רופא, בדקו אפשרות לשטיפות מי מלח להפחתת דלקת
                  </p>
                  <div className="links-container">
                    <a href="https://hadardent.com/" target="_blank" rel="noopener noreferrer">
                      הדר
                    </a>
                    <a href="https://yad-sarah.net/posts/mobile-dental-clinic/" target="_blank" rel="noopener noreferrer">
                      יד שרה
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>מעקב והיגיינה</h3>
                  <p>
                    - הקפידו על היגיינת הפה
                    - קבעו תורים תקופתיים בתדירות גבוהה
                    - תעדו את אופי הכאב ומתי הוא מופיע
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Occupational Therapy - Clalit */}
          {isContainerVisible('InfoCard_health_116') && (
            <div className="container">
              <h3>טיפולי המשך ריפוי בעיסוק - כללית</h3>
              <p>
                טיפול ריפוי בעיסוק הינו חלק בלתי נפרד מתהליך השיקום ומהווה משלים חשוב ומשמעותי לתהליך השיקום הפיזיותרפי. חשוב לא לזנוח טיפול זה כי הוא מרכיב משמעותי מאד בהצלחת תהליך השיקום.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_health_116')}
              >
                {expandedItems['InfoCard_health_116'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_health_116'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>דגשים לטיפול</h3>
                  <p>
                    - במפגש הראשון, הביאו מסמכים רפואיים רלוונטיים
                    - וודאו שהמטופל מבין את תהליך השיקום
                    - קבלו הנחיות להמשך עבודה עצמאית
                    - טיפול בבית ניתן באישור מיוחד דרך היחידה לטיפולי בית
                  </p>
                </div>

                <div className="content-section">
                  <h3>דגשים נוספים ומיצוי זכויות</h3>
                  <p>
                    מרפאים בעיסוק מוסמכים להמליץ על אביזרי עזר כגון:
                    - כיסא רחצה
                    - מתקני אחיזה
                    - כריות מותאמות
                    את האביזרים ניתן לקבל מהקופה בהשאלה או ברכישה מסובסדת.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Occupational Therapy - Maccabi */}
          {isContainerVisible('InfoCard_health_117') && (
            <div className="container">
              <h3>טיפולי המשך ריפוי בעיסוק - מכבי</h3>
              <p>
                טיפול ריפוי בעיסוק הינו חלק בלתי נפרד מתהליך השיקום ומהווה משלים חשוב ומשמעותי לתהליך השיקום הפיזיותרפי. חשוב לא לזנוח טיפול זה כי הוא מרכיב משמעותי מאד בהצלחת תהליך השיקום.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_health_117')}
              >
                {expandedItems['InfoCard_health_117'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_health_117'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>דגשים לטיפול</h3>
                  <p>
                    - במפגש הראשון, הביאו מסמכים רפואיים רלוונטיים
                    - וודאו שהמטופל מבין את תהליך השיקום
                    - קבלו הנחיות להמשך עבודה עצמאית
                    - טיפול בבית ניתן באישור מיוחד דרך היחידה לטיפולי בית
                  </p>
                </div>

                <div className="content-section">
                  <h3>דגשים נוספים ומיצוי זכויות</h3>
                  <p>
                    מרפאים בעיסוק מוסמכים להמליץ על אביזרי עזר כגון:
                    - כיסא רחצה
                    - מתקני אחיזה
                    - כריות מותאמות
                    את האביזרים ניתן לקבל מהקופה בהשאלה או ברכישה מסובסדת.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Occupational Therapy - Other */}
          {isContainerVisible('InfoCard_health_118') && (
            <div className="container">
              <h3>טיפולי המשך ריפוי בעיסוק</h3>
              <p>
                טיפול ריפוי בעיסוק הינו חלק בלתי נפרד מתהליך השיקום ומהווה משלים חשוב ומשמעותי לתהליך השיקום הפיזיותרפי. חשוב לא לזנוח טיפול זה כי הוא מרכיב משמעותי מאד בהצלחת תהליך השיקום.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_health_118')}
              >
                {expandedItems['InfoCard_health_118'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_health_118'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>דגשים לטיפול</h3>
                  <p>
                    - במפגש הראשון, הביאו מסמכים רפואיים רלוונטיים
                    - וודאו שהמטופל מבין את תהליך השיקום
                    - קבלו הנחיות להמשך עבודה עצמאית
                    - טיפול בבית ניתן באישור מיוחד דרך היחידה לטיפולי בית
                  </p>
                </div>

                <div className="content-section">
                  <h3>דגשים נוספים ומיצוי זכויות</h3>
                  <p>
                    מרפאים בעיסוק מוסמכים להמליץ על אביזרי עזר כגון:
                    - כיסא רחצה
                    - מתקני אחיזה
                    - כריות מותאמות
                    את האביזרים ניתן לקבל מהקופה בהשאלה או ברכישה מסובסדת.
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

export default HealthPage;