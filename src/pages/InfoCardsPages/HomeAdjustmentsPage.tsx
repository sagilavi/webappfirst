import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchSheetData } from '../../utils/googleSheetsConfig';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from '../../styles/globalStyles';

interface SheetData {
  headers: string[];
  values: string[];
}

const HomeAdjustmentsPage = () => {
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

    // For IDs like InfoCard_home-adjustments_104 and InfoCard_home-adjustments_105
    if (containerId.includes('_104') || containerId.includes('_105')) {
      // Try finding without the underscore
      const alternativeId = containerId.replace('_', '');
      const altIndex = fetchedData.headers.findIndex(header => header === alternativeId);
      if (altIndex !== -1) {
        const value = fetchedData.values[altIndex];
        return value !== undefined && value !== 'FALSE' && value.trim() !== '';
      }
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
          <h1>התאמות לבית</h1>

          {/* Container 1: Temporary Stairs Solution */}
          {isContainerVisible('InfoCard_home-adjustments_2') && (
            <div className="container">
              <h3>פתרון זמני להנגשת מדרגות גישה לבית</h3>
              <p>
                כחלק מהשינוי ולטובת צמצום התלות והעלאת רמת הבטיחות נמליץ על הוספה של זחליל עולה מדרגות נייד, התקנה של מעקי בטיחות ועל התקנה של תאורה חזקה בסביבת הכניסה לבית.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_2')}
              >
                {expandedItems['InfoCard_home-adjustments_2'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_2'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>מימוש והגשה</h3>
                  <p>
                    לייעול התהליך נמליץ לקבל המלצה בפיזיוטרפיסט או רופא ובה רשום במפורש הצורך ברמפה/זחליל עולה מדרגות נייד.
                  </p>
                  <div className="links-container">
                    <a href="https://www.maccabi4u.co.il/new/maccabi_news/general/49130/#?module=NewFormMobility" target="_blank" rel="noopener noreferrer">
                      ציוד מכבי
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>הסתייעות ביד שרה לקבלת ציוד</h3>
                  <p>
                    השאלת/השכרת רמפה ניידת והתקנת רמפה נגישה ו/או הוספת מאחזי יד
                  </p>
                  <div className="links-container">
                    <a href="https://yad-sarah.net/" target="_blank" rel="noopener noreferrer">
                      ציוד יד שרה
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>אביזרים בהשתתפות עצמית</h3>
                  <p>
                    פנו למטפל/אחות/פיזיותרפיסט ובקשה הפניה שתכלול אבחנה רפואית והמלצה לרכישה של הפריט. קנו את המוצר ולאחר מכן הגישו למרכז הרפואי בדואר או בעמדת אל-תור את ההפניה שקיבלת ממטפל הקופה, קבלה וחשבונית מס מקורית. ההחזר ישלח אליכם.
                  </p>
                  <div className="links-container">
                    <a href="https://www.maccabi4u.co.il/new/eligibilites/2161/" target="_blank" rel="noopener noreferrer">
                      אביזרים בהשתתפות מכבי
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container 2: Permanent Home Access Solutions */}
          {isContainerVisible('InfoCard_home-adjustments_3') && (
            <div className="container">
              <h3>פתרונות קבועים להנגשת הכניסה לבית</h3>
              <p>
                כחלק מהשינוי ולטובת צמצום התלות והעלאת רמת הבטיחות נמליץ על הוספה של זחליל עולה מדרגות נייד, התקנה של מעקי בטיחות ועל התקנה של תאורה חזקה בסביבת הכניסה לבית.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_3')}
              >
                {expandedItems['InfoCard_home-adjustments_3'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_3'] ? 'expanded' : ''}`}>
                <div className="content-section with-image">
                  <img className="inline-image" src="/ImagesForInfoCards/Logo1.jpg" alt="Support Team" />
                  <div className="text-side">
                    <div className="text-content">
                      <h3>מימוש והגשה</h3>
                      <p>
                        לייעול התהליך נמליץ לקבל המלצה בפיזיוטרפיסט או רופא ובה רשום במפורש הצורך ברמפה/זחליל עולה מדרגות נייד.
                      </p>
                    </div>
                    <div className="links-container">
                      <a href="https://www.maccabi4u.co.il/new/maccabi_news/general/49130/#?module=NewFormMobility" target="_blank" rel="noopener noreferrer">
                        ציוד מכבי
                      </a>
                    </div>
                  </div>
                </div>

                <div className="content-section">
                  <h3>הסתייעות ביד שרה לקבלת ציוד</h3>
                  <p>
                    השאלת/השכרת רמפה ניידת והתקנת רמפה נגישה ו/או הוספת מאחזי יד
                  </p>
                  <div className="links-container">
                    <a href="https://yad-sarah.net/" target="_blank" rel="noopener noreferrer">
                      ציוד יד שרה
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>אביזרים בהשתתפות עצמית</h3>
                  <p>
                    פנו למטפל/אחות/פיזיותרפיסט ובקשה הפניה שתכלול אבחנה רפואית והמלצה לרכישה של הפריט. קנו את המוצר ולאחר מכן הגישו למרכז הרפואי בדואר או בעמדת אל-תור את ההפניה שקיבלת ממטפל הקופה, קבלה וחשבונית מס מקורית. ההחזר ישלח אליכם.
                    מאחזים בגדלים שונים - 11 - 49 ש"ח
                  </p>
                  <div className="links-container">
                    <a href="https://www.maccabi4u.co.il/new/eligibilites/2161/" target="_blank" rel="noopener noreferrer">
                      אביזרים בהשתתפות מכבי
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container 3: Indoor Stairs Solutions */}
          {isContainerVisible('InfoCard_home-adjustments_4') && (
            <div className="container">
              <h3>פתרונות להתנהלות עם מדרגות בתוך הבית</h3>
              <p>
                כחלק מהשינוי ולטובת הבטיחות במרחב הביתי נמליץ על התקנת מעקות או מאחזי יד בשני צידי המדרגות והתקנת מעלון מדרגות או שימוש בזחליל עולה מדרגות נייד, המאפשרים מעבר בין קומות ללא מאמץ וסכנה בטיחותית.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_4')}
              >
                {expandedItems['InfoCard_home-adjustments_4'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_4'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>מימוש והגשה</h3>
                  <p>
                    לייעול וזירוז התהליך נמליץ לקבל המלצה מפיזיותרפיסט או רופא ובה רשום במפורש הצורך ברמפה/זחליל עולה מדרגות נייד.
                  </p>
                  <div className="links-container">
                    <a href="https://www.maccabi4u.co.il/new/maccabi_news/general/49130/#?module=NewFormMobility" target="_blank" rel="noopener noreferrer">
                      ציוד מכבי
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>דגשים להתאמת המרחב והסתייעות בקופה בתהליך</h3>
                  <p>
                    התקינו תאורה חזקה, סמנו את המדרגות באמצעות סרט דביק בעל צבע ברור, במידה ולא נעשה שימוש בזחליל או מעלון התקינו מדבקות נגד החלקה על המדרגות.
                  </p>
                  <div className="links-container">
                    <a href="https://www.maccabi4u.co.il/new/eligibilites/2161/" target="_blank" rel="noopener noreferrer">
                      אביזרים בהשתתפות מכבי
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>רשויות תומכות נוספות</h3>
                  <p>
                    ניתן להגיש בקשה לסיוע במימון התאמות נגישות לבית ממשרד הבינוי והשיכון. מספר רשויות מקומיות ועיריות מציעות סיוע במימון התאמות נגישות לבתים במקרים אלו.
                  </p>
                  <div className="links-container">
                    <a href="https://www.gov.il/he/service/request-to-improve-housing-conditions-for-handicapped" target="_blank" rel="noopener noreferrer">
                      בדיקת סיוע משרד השיכון
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container 4: Carpets and Floors Safety */}
          {isContainerVisible('InfoCard_home-adjustments_5') && (
            <div className="container">
              <h3>בטיחות שטיחים ומרצפות</h3>
              <p>
                מומלץ להימנע משטיחים בבית במצב הרפואי הנוכחי, לאחר הזזת השטיחים חשוב להתאים את התאורה כך שלא יווצרו החזרי אור מסוונרים מהריצפה העלולים לגרום לסחרחורות ואובדן שיווי משקל.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_5')}
              >
                {expandedItems['InfoCard_home-adjustments_5'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_5'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>מימוש והגשה</h3>
                  <p>
                    ניתן לקבל ממכבי מימון חלקי לאביזרי העזר השונים. פנו למטפל/אחות/פיזיותרפיסט ובקשה הפניה שתכלול אבחנה רפואית והמלצה לרכישה של הפריט.
                  </p>
                  <div className="links-container">
                    <a href="https://www.maccabi4u.co.il/new/eligibilites/2161/" target="_blank" rel="noopener noreferrer">
                      אביזרי עזר מכבי
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>התאמת התאורה</h3>
                  <p>
                    החליפו נורות אור לבן לתאורה צהובה-כתומה
                  </p>
                </div>

                <div className="content-section">
                  <h3>שימו לב</h3>
                  <p>
                    במידה ותחליטו כן להשאיר שטיחים בבית, נמליץ מאוד לא למקם שטיחים במסלולים מרכזיים כמו בין המיטה לשירותים.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container 5: Shower Room Adaptations */}
          {isContainerVisible('InfoCard_home-adjustments_6') && (
            <div className="container">
              <h3>התאמת המקלחון וחדר הרחצה</h3>
              <p>
                על מנת למנוע החלקה או נפילה במקלחת נמליץ על רחצה בישיבה ועל שימוש באביזרים מייצבים ומונעי החלקה בזמן הרחצה ובעת הכניסה והיציאה מהמקלחון או חדר הרחצה.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_6')}
              >
                {expandedItems['InfoCard_home-adjustments_6'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_6'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>דגשים ואביזרים להתאמה</h3>
                  <p>
                    התקנת ידיות אחיזה יציבות בתוך המקלחון, הנחת משטח מונע החלקה, התקנת כסא רחצה מתקפל, והתאמת גובה ברזים ומקלחון.
                  </p>
                </div>

                <div className="content-section">
                  <h3>אביזרים בהשתתפות עצמית</h3>
                  <p>
                    מאחזים בגדלים שונים - 11 - 49 ש"ח
                    ספוגי רחצה מותאמים - 14 - 30 ש"ח
                  </p>
                  <div className="links-container">
                    <a href="https://www.maccabi4u.co.il/new/eligibilites/2161/" target="_blank" rel="noopener noreferrer">
                      אביזרים בהשתתפות מכבי
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>דינמיקה והתנהלות</h3>
                  <p>
                    זו עלולה להיות סיטואציה לא נעימה אך נמליץ בפעמים הראשונות, הקפידו על מלווה בזמן המקלחת. להמשך הדרך נמליץ על התקנה של לחצן מצוקה בחדר הרחצה.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container 6: Bathroom Adaptations */}
          {isContainerVisible('InfoCard_home-adjustments_7') && (
            <div className="container">
              <h3>התאמת האמבטיה וחדר הרחצה</h3>
              <p>
                על מנת למנוע החלקה או נפילה באמבטיה נמליץ על רחצה בישיבה ועל שימוש באביזרים מייצבים ומונעי החלקה בזמן הרחצה ובעת הכניסה והיציאה מהאמבטיה וחדר הרחצה.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_7')}
              >
                {expandedItems['InfoCard_home-adjustments_7'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_7'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>דגשים ואביזרים להתאמה</h3>
                  <p>
                    התקנת מעלון אמבטיה, מנוף הרמה ייעודי, ידיות אחיזה, משטח מונע החלקה, וכסא רחצה מותאם.
                  </p>
                </div>

                <div className="content-section">
                  <h3>אביזרים בהשתתפות עצמית</h3>
                  <p>
                    מאחזים בגדלים שונים - 11 - 49 ש"ח
                    ספוגי רחצה מותאמים - 14 - 30 ש"ח
                    ספסל העברה לאמבטיה - 211 ש"ח
                    קרש עם מושב לאמבטיה - 76 ש"ח
                  </p>
                  <div className="links-container">
                    <a href="https://www.maccabi4u.co.il/new/eligibilites/2161/" target="_blank" rel="noopener noreferrer">
                      אביזרים בהשתתפות מכבי
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container 7: Wheelchair */}
          {isContainerVisible('InfoCard_home-adjustments_8') && (
            <div className="container">
              <h3>כסא גלגלים</h3>
              <p>
                המעבר לכיסא גלגלים דורש התאמות רבות בבית ובגישה אליו, כמו כן קיימים סוגים שונים של כיסאות גלגלים ונדרש לראות כי בוחרים את הסוג המתאים ביותר לאדם ולביתו.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_8')}
              >
                {expandedItems['InfoCard_home-adjustments_8'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_8'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>דגשים להתאמת המרחב</h3>
                  <p>
                    מעברים ודלתות, רמפות והסרת מכשולים, ידיות אחיזה, מושב אסלה מוגבה, נגישות לרהיטים, ואחסון נגיש.
                  </p>
                </div>

                <div className="content-section">
                  <h3>פעילות ושיקום</h3>
                  <p>
                    כריות ישיבה מיוחדות, שינויי תנוחה, ופיזיותרפיה מותאמת.
                  </p>
                </div>

                <div className="content-section">
                  <h3>התנהלות חברתית ופעילות</h3>
                  <p>
                    שמירה על שגרה, פעילות מותאמת, והדרכת המשפחה בתפעול כיסא הגלגלים.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container 8: Emergency Button */}
          {isContainerVisible('InfoCard_home-adjustments_9') && (
            <div className="container">
              <h3>לחצן מצוקה</h3>
              <p>
                נמליץ על שימוש בלחצני מצוקה, קיימת חשיבות לנגישות וזמינות של לחצני המצוקה במרחבים שונים בבית בדגש על חדר השינה, חדר הרחצה והשירותים.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_9')}
              >
                {expandedItems['InfoCard_home-adjustments_9'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_9'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>דגשים לשימוש</h3>
                  <p>
                    לחצן מצוקה נייח: לוודא שמותקן במקום נגיש
                    לחצן מצוקה נייד: לוודא שהוא עמיד במים
                    ישנם לחצני מצוקה בעלי תקשורת דו כיוונית
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container 9: Bed Adaptations */}
          {isContainerVisible('InfoCard_home-adjustments_10') && (
            <div className="container">
              <h3>התאמת המיטה</h3>
              <p>
                מיטה נוחה ומותאמת הינה חיונית הן לתהליך ההחלמה ולבטיחות, מכיוון שנפילות חוזרות מרובות קורות בעת התעוררות וקימה מהמיטה בשעות הלילה.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_10')}
              >
                {expandedItems['InfoCard_home-adjustments_10'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_10'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>בחירת המיטה והתאמת הסביבה</h3>
                  <p>
                    מיטה מתכווננת חשמלית, מעקה בטיחות, ידיות עזר, כריות תמיכה אורטופדיות, ושטיחון מונע החלקה.
                  </p>
                </div>

                <div className="content-section">
                  <h3>אביזרים בהשתתפות עצמית</h3>
                  <p>
                    משטח למניעת החלקה - 27 ש"ח
                    מעקה בטיחות למיטה - 298 ש"ח
                    קוביות הגבהה למיטה מעץ - 157 ש"ח
                  </p>
                  <div className="links-container">
                    <a href="https://www.maccabi4u.co.il/new/eligibilites/2161/" target="_blank" rel="noopener noreferrer">
                      אביזרים בהשתתפות מכבי
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container: Temporary Stairs Access Solutions (Clalit) */}
          {isContainerVisible('InfoCard_home-adjustments_11') && (
            <div className="container">
              <h3>פתרונות זמניים להנגשת מדרגות גישה לבית</h3>
              <p>
                כחלק מהשינוי ולטובת צמצום התלות והעלאת רמת הבטיחות נמליץ על התקנת רמפה נגישה ו/או הוספת מאחזי יד, כמו כן חשוב להתקין תאורה חזקה במרחב הכניסה לבית.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_11')}
              >
                {expandedItems['InfoCard_home-adjustments_11'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_11'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>מימוש והגשה</h3>
                  <div className="links-container">
                    <a href="https://cbm.org.il/medi-products/?pc" target="_blank" rel="noopener noreferrer">
                      ציוד כללית
                    </a>
                    <a href="https://yad-sarah.net/" target="_blank" rel="noopener noreferrer">
                      ציוד יד שרה
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>מוצרים בהשתתפות אישית</h3>
                  <p>
                    פנו למטפל/אחות/פיזיותרפיסט ובקשו הפניה שתכלול אבחנה רפואית, המלצה והפניה לרכישה של הפריט. העבירו את ההפניה למזכירות המרפאה. לאחר קבלת האישור, כללית הנדסה יצרו איתכם קשר לטובת תיאום מול ספק מאושר לטובת הזמנה של המכשיר.
                  </p>
                  <div className="links-container">
                    <a href="https://cbm.org.il/medi-products/?pc=" target="_blank" rel="noopener noreferrer">
                      ציוד בהשתתפות כללית
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>רשויות תומכות נוספות</h3>
                  <p>
                    על אף שהרופאים צופים חזרה לתפקוד מלא, יש לשקול הערכות למצב עתידי שבו יהיה צורך ברמפה קבועה. ניתן להגיש בקשה לסיוע במימון התאמות נגישות לבית ממשרד הבינוי והשיכון.
                  </p>
                  <div className="links-container">
                    <a href="https://www.gov.il/he/service/request-to-improve-housing-conditions-for-handicapped" target="_blank" rel="noopener noreferrer">
                      בדיקת סיוע משרד השיכון
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container: Living Room Adaptations */}
          {isContainerVisible('InfoCard_home-adjustments_20') && (
            <div className="container">
              <h3>התאמת הסלון</h3>
              <p>
                הסלון הוא מרחב מרכזי בבית שדורש התאמות לצרכים החדשים. ההתאמות כוללות ארגון מחדש של הריהוט, התקנת עזרים תומכים, והתאמת התאורה.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_20')}
              >
                {expandedItems['InfoCard_home-adjustments_20'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_20'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>התאמות ובטיחות</h3>
                  <p>
                    סידור הריהוט ליצירת מעברים רחבים ונגישים.
                    התאמת גובה הספה והכורסאות לקימה וישיבה נוחה.
                    הסרת שטיחים או קיבועם למניעת החלקה.
                    התקנת ידיות אחיזה במקומות אסטרטגיים.
                    התאמת התאורה למניעת סנוור וצללים.
                  </p>
                </div>

                <div className="content-section">
                  <h3>אביזרי עזר מומלצים</h3>
                  <p>
                    כריות תמיכה מותאמות לישיבה ממושכת.
                    שולחן צד נייד להנחת חפצים בהישג יד.
                    מגביה כורסא או ספה לקימה קלה יותר.
                  </p>
                  <div className="links-container">
                    <a href="https://www.btl.gov.il/benefits/Disability/Pages/default.aspx" target="_blank" rel="noopener noreferrer">
                      מידע על זכויות וסיוע
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>דגשים נוספים</h3>
                  <p>
                    שמירה על מעברים פנויים ממכשולים.
                    הנגשת שלט הטלוויזיה ומכשירי חשמל.
                    התקנת תאורה עם חיישני תנועה.
                    ארגון אזורי אחסון נגישים.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Bedroom Adaptations */}
          {isContainerVisible('InfoCard_home-adjustments_21') && (
            <div className="container">
              <h3>התאמת חדר השינה</h3>
              <p>
                חדר השינה צריך להיות מותאם לנוחות מקסימלית ובטיחות מרבית, במיוחד בשעות הלילה ובזמני מנוחה.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_21')}
              >
                {expandedItems['InfoCard_home-adjustments_21'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_21'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>התאמות ובטיחות</h3>
                  <p>
                    סידור החדר למעבר נוח למיטה ולארון.
                    התקנת תאורת לילה אוטומטית.
                    הנגשת מתגי חשמל ותאורה.
                    התקנת מאחזי יד ליד המיטה.
                    שימוש בשידה יציבה בגובה מתאים.
                  </p>
                </div>

                <div className="content-section">
                  <h3>אביזרי עזר מומלצים</h3>
                  <p>
                    מוט תמיכה למיטה לעזרה בהתרוממות.
                    מגביהי מיטה להקלה בכניסה ויציאה.
                    שטיחון מונע החלקה ליד המיטה.
                    לחצן מצוקה נגיש מהמיטה.
                  </p>
                  <div className="links-container">
                    <a href="https://www.health.gov.il/Subjects/Geriatrics/Pages/default.aspx" target="_blank" rel="noopener noreferrer">
                      מידע נוסף על התאמות ביתיות
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container: Storage Solutions */}
          {isContainerVisible('InfoCard_home-adjustments_22') && (
            <div className="container">
              <h3>פתרונות אחסון מותאמים</h3>
              <p>
                התאמת פתרונות האחסון בבית חיונית לשמירה על עצמאות ונגישות לחפצים יומיומיים.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_22')}
              >
                {expandedItems['InfoCard_home-adjustments_22'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_22'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פתרונות מומלצים</h3>
                  <p>
                    ארגון מחדש של ארונות בגובה נגיש.
                    התקנת מדפים מתכווננים ונשלפים.
                    שימוש בסלסלות וקופסאות מסומנות.
                    התקנת ווים ומתלים בגובה נוח.
                  </p>
                </div>

                <div className="content-section">
                  <h3>דגשים להתאמה</h3>
                  <p>
                    סימון ברור של תכולת המגירות והארונות.
                    שמירה על מעברים פנויים לגישה.
                    התקנת תאורה מספקת באזורי אחסון.
                    ארגון לפי תדירות השימוש.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Lighting Solutions */}
          {isContainerVisible('InfoCard_home-adjustments_23') && (
            <div className="container">
              <h3>פתרונות תאורה מותאמים</h3>
              <p>
                תאורה נכונה חיונית לבטיחות ולתפקוד יומיומי, במיוחד בשעות החשכה ובמעברים בין חדרים.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_23')}
              >
                {expandedItems['InfoCard_home-adjustments_23'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_23'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פתרונות מומלצים</h3>
                  <p>
                    התקנת תאורה אוטומטית עם חיישני תנועה.
                    תאורת לילה בשירותים ובמסדרונות.
                    תאורה ממוקדת באזורי פעילות.
                    מתגים מוארים וקלים להפעלה.
                  </p>
                </div>

                <div className="content-section">
                  <h3>דגשים להתאמה</h3>
                  <p>
                    הימנעות מסנוור וצללים.
                    תאורה אחידה במעברים.
                    נגישות קלה למתגים.
                    תאורת חירום לשעת הצורך.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Toilet Adaptations */}
          {isContainerVisible('InfoCard_home-adjustments_24') && (
            <div className="container">
              <h3>התאמת השירותים</h3>
              <p>
                על מנת למנוע נפילות ולהקל על השימוש בשירותים נמליץ על התקנת אביזרי עזר ומאחזים, כמו כן חשוב להתאים את גובה האסלה ולהתקין תאורה חזקה.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_24')}
              >
                {expandedItems['InfoCard_home-adjustments_24'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_24'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>התאמות ובטיחות</h3>
                  <p>
                    התקנת מאחזי יד קבועים משני צידי האסלה.
                    הגבהת האסלה באמצעות מושב מוגבה או הגבהה לאסלה.
                    התקנת ידית אחיזה מתרוממת לעזרה בקימה וישיבה.
                    הוספת תאורה חזקה ונגישה.
                    התקנת לחצן מצוקה בגובה נגיש.
                  </p>
                </div>

                <div className="content-section">
                  <h3>אביזרים בהשתתפות עצמית</h3>
                  <p>
                    הגבהה לאסלה (5סמ-15סמ) - 43 ש"ח - 103 ש"ח
                    הגבהה לאסלה עם שיפוע - 130 ש"ח
                    מעקה עזר לאסלה - 103 ש"ח
                  </p>
                </div>

                <div className="content-section">
                  <h3>רשויות תומכות נוספות</h3>
                  <p>
                    ניתן להגיש בקשה לסיוע במימון התאמות נגישות לבית ממשרד הבינוי והשיכון.
                    מספר רשויות מקומיות ועיריות מציעות סיוע במימון התאמות נגישות לבתים במקרים אלו.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Kitchen Adaptations */}
          {isContainerVisible('InfoCard_home-adjustments_25') && (
            <div className="container">
              <h3>התאמת המטבח</h3>
              <p>
                המטבח הוא אחד החדרים המרכזיים בבית ונדרשת התאמה שלו לצרכים החדשים, ההתאמות כוללות שינויים בגובה משטחי העבודה, התקנת מאחזים ושיפור הנגישות לארונות ומכשירי חשמל.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_25')}
              >
                {expandedItems['InfoCard_home-adjustments_25'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_25'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>התאמות ובטיחות</h3>
                  <p>
                    התאמת גובה משטחי העבודה לעבודה בישיבה.
                    הנגשת ארונות ומגירות לגישה נוחה.
                    התקנת ידיות אחיזה במקומות אסטרטגיים.
                    שימוש בכיסא גבוה מתכוונן לעבודה במטבח.
                    ארגון מחדש של המטבח כך שכלים בשימוש יומיומי יהיו נגישים.
                  </p>
                </div>

                <div className="content-section">
                  <h3>דגשים להתאמה</h3>
                  <p>
                    פינוי מעברים רחבים למעבר כיסא גלגלים או הליכון.
                    הזזת מכשירי חשמל נפוצים לגובה נוח.
                    התקנת תאורה חזקה במשטחי העבודה.
                    שימוש במגשים נשלפים וסלסלות מסתובבות להקלת הגישה.
                  </p>
                </div>

                <div className="content-section">
                  <h3>אביזרי עזר מומלצים</h3>
                  <p>
                    מדפים מתכווננים ונשלפים.
                    ידיות מותאמות לארונות ומגירות.
                    משטחי עבודה מתכווננים.
                    כלי מטבח מותאמים לשימוש עצמאי.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Dining Area Adaptations */}
          {isContainerVisible('InfoCard_home-adjustments_26') && (
            <div className="container">
              <h3>התאמת פינת האוכל</h3>
              <p>
                פינת האוכל צריכה להיות מותאמת לישיבה נוחה ובטוחה, עם גישה קלה לשולחן ומרחב תמרון מספיק.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_26')}
              >
                {expandedItems['InfoCard_home-adjustments_26'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_26'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>התאמות מומלצות</h3>
                  <p>
                    התאמת גובה השולחן לכיסא גלגלים או כיסא מוגבה.
                    שימוש בכיסאות יציבים עם משענות יד.
                    יצירת מרחב תמרון מספיק סביב השולחן.
                    התקנת תאורה מתאימה מעל השולחן.
                  </p>
                </div>

                <div className="content-section">
                  <h3>אביזרי עזר</h3>
                  <p>
                    כריות ישיבה מותאמות.
                    מגביהי כיסא לישיבה נוחה.
                    כלי אוכל מותאמים לשימוש עצמאי.
                    משטחים מונעי החלקה לצלחות וכוסות.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Balcony and Outdoor Space */}
          {isContainerVisible('InfoCard_home-adjustments_27') && (
            <div className="container">
              <h3>התאמת מרפסת ומרחב חיצוני</h3>
              <p>
                המרפסת והמרחב החיצוני צריכים להיות נגישים ובטוחים לשימוש, עם התאמות מתאימות למניעת החלקה ונפילה.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_27')}
              >
                {expandedItems['InfoCard_home-adjustments_27'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_27'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>התאמות בטיחות</h3>
                  <p>
                    התקנת משטחים מונעי החלקה.
                    התקנת מעקות ומאחזי יד יציבים.
                    הסרת מכשולים ויצירת מעברים רחבים.
                    התקנת תאורה מספקת לשעות החשכה.
                  </p>
                </div>

                <div className="content-section">
                  <h3>נגישות</h3>
                  <p>
                    התאמת גובה מעקות לבטיחות מרבית.
                    יצירת שיפועים מתונים במעברים.
                    התקנת אמצעי הצללה נגישים.
                    סידור ריהוט גן בצורה נגישה ובטוחה.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Home Office Adaptations */}
          {isContainerVisible('InfoCard_home-adjustments_28') && (
            <div className="container">
              <h3>התאמת פינת עבודה ביתית</h3>
              <p>
                פינת העבודה הביתית צריכה להיות מותאמת לישיבה ממושכת ונוחה, עם כל האביזרים הנדרשים בהישג יד.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_28')}
              >
                {expandedItems['InfoCard_home-adjustments_28'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_28'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>התאמות ארגונומיות</h3>
                  <p>
                    כיסא ארגונומי מתכוונן.
                    שולחן עבודה בגובה מתאים.
                    מדף למסך בגובה העיניים.
                    משטח תמיכה לידיים בזמן הקלדה.
                  </p>
                </div>

                <div className="content-section">
                  <h3>אביזרי עזר</h3>
                  <p>
                    תאורה מתכווננת למניעת סנוור.
                    מקלדת ועכבר ארגונומיים.
                    מעמד לטלפון ומסמכים.
                    אחסון נגיש לציוד משרדי.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Smart Home Solutions */}
          {isContainerVisible('InfoCard_home-adjustments_29') && (
            <div className="container">
              <h3>פתרונות בית חכם</h3>
              <p>
                טכנולוגיות בית חכם יכולות לסייע בהגברת העצמאות והבטיחות בבית.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_29')}
              >
                {expandedItems['InfoCard_home-adjustments_29'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_29'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פתרונות מומלצים</h3>
                  <p>
                    בקרת תאורה אוטומטית.
                    שליטה קולית במכשירי חשמל.
                    מערכת אבטחה וניטור.
                    בקרת טמפרטורה חכמה.
                  </p>
                </div>

                <div className="content-section">
                  <h3>יתרונות</h3>
                  <p>
                    שליטה מרחוק במכשירי הבית.
                    חיסכון באנרגיה.
                    הגברת הבטיחות והנוחות.
                    התראות במקרי חירום.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container: Ventilation and Air Quality */}
          {isContainerVisible('InfoCard_home-adjustments_30') && (
            <div className="container">
              <h3>אוורור ואיכות אוויר</h3>
              <p>
                שמירה על איכות אוויר טובה ואוורור מתאים חשובה לבריאות ולנוחות בבית.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments_30')}
              >
                {expandedItems['InfoCard_home-adjustments_30'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments_30'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פתרונות אוורור</h3>
                  <p>
                    התקנת מאווררי תקרה נשלטים מרחוק.
                    מערכת מיזוג אוויר מותאמת.
                    חלונות חשמליים עם שלט.
                    מסנני אוויר בחדרים מרכזיים.
                  </p>
                </div>

                <div className="content-section">
                  <h3>המלצות נוספות</h3>
                  <p>
                    תחזוקה שוטפת של מערכות האוורור.
                    ניקוי תקופתי של מסנני אוויר.
                    בקרת לחות בחדרים.
                    אוורור טבעי בשעות מתאימות.
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

export default HomeAdjustmentsPage; 