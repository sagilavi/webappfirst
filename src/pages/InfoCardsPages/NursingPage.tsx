import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchSheetData } from '../../utils/googleSheetsConfig';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from '../../styles/globalStyles';

interface SheetData {
  headers: string[];
  values: string[];
}

const NursingPage = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  const [fetchedData, setFetchedData] = useState<SheetData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ... same helper functions as WelfarePage ...

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
          
          <h1>סיעוד</h1>

          {/* Container for Level 1 Full Allowance */}
          {isContainerVisible('InfoCard_siud_21') && (
            <div className="container">
              <h3>קצבת סיעוד דרגה 1 - זכאות מלאה</h3>
              <p>
                על פי הניתוח שלנו, אתה עשוי להיות זכאי לקצבת סיעוד ברמה 1 עם זכאות מלאה, אך ההחלטה הסופית תיקבע על ידי הביטוח הלאומי בהתאם לבדיקת עצמאות רשמית ובדיקת הכנסות.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_siud_21')}
              >
                {expandedItems['InfoCard_siud_21'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_siud_21'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פירוט שירותים בזכאות</h3>
                  <p>
                    אפשרות ראשונה – 5.5 שעות שבועיות של טיפול אישי בבית<br/>
                    אפשרות שנייה – שירותי סיעוד ללא טיפול בבית<br/>
                    אפשרות שלישית – קצבה כספית של 1,572 ש"ח לחודש<br/>
                    אפשרות רביעית – שילוב בין קצבה כספית לטיפול אישי בבית ושירותים נוספים
                  </p>
                </div>

                <div className="content-section">
                  <h3>מימוש והגשה</h3>
                  <p>
                    ניתן להגיש את הטופס באופן מקוון או בסניפי הביטוח הלאומי או באמצעות עו"סית בית החולים.<br/>
                    חשוב לצרף מסמכים רפואיים עדכניים המפרטים את מצב המטופל.
                  </p>
                  <div className="links-container">
                    <a href="https://www.btl.gov.il/טפסים%20ואישורים/forms/Long_Term_Care_forms/Pages/2600%20-%20%20תביעה%20לגימלת%20סיעוד.aspx" target="_blank" rel="noopener noreferrer">
                      הגשת תביעה
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>המלצות למבחן תלות ADL</h3>
                  <p>
                    - להדגיש את המצב הגרוע ביותר<br/>
                    - לתאם את הבדיקה לשעות הקושי<br/>
                    - להכין תיעוד של קשיים ונפילות<br/>
                    - לא לעזור למטופל במהלך הבדיקה
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container for Level 1 Partial Allowance */}
          {isContainerVisible('InfoCard_siud_22') && (
            <div className="container">
              <h3>קצבת סיעוד דרגה 1 - זכאות חלקית</h3>
              <p>
                על פי הניתוח שלנו, אתה עשוי להיות זכאי לקצבת סיעוד ברמה 1 עם זכאות חלקית, אך ההחלטה הסופית תיקבע על ידי הביטוח הלאומי בהתאם לבדיקת עצמאות רשמית ובדיקת הכנסות.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_siud_22')}
              >
                {expandedItems['InfoCard_siud_22'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_siud_22'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פירוט שירותים בזכאות</h3>
                  <p>
                    אפשרות ראשונה – 2.75 שעות שבועיות של טיפול אישי בבית<br/>
                    אפשרות שנייה – שירותי סיעוד ללא טיפול בבית<br/>
                    אפשרות שלישית – קצבה כספית של 786 ש"ח לחודש<br/>
                    אפשרות רביעית – שילוב בין קצבה כספית לטיפול אישי בבית ושירותים נוספים
                  </p>
                </div>

                <div className="content-section">
                  <h3>מימוש והגשה</h3>
                  <p>
                    ניתן להגיש את הטופס באופן מקוון או בסניפי הביטוח הלאומי.<br/>
                    חשוב לצרף מסמכים רפואיים עדכניים.
                  </p>
                  <div className="links-container">
                    <a href="https://www.btl.gov.il/טפסים%20ואישורים/forms/Long_Term_Care_forms/Pages/2600%20-%20%20תביעה%20לגימלת%20סיעוד.aspx" target="_blank" rel="noopener noreferrer">
                      הגשת תביעה
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container for Level 2 Full Allowance */}
          {isContainerVisible('InfoCard_siud_23') && (
            <div className="container">
              <h3>קצבת סיעוד דרגה 2 - זכאות מלאה</h3>
              <p>
                על פי הניתוח שלנו, אתה עשוי להיות זכאי לקצבת סיעוד ברמה 2 עם זכאות מלאה, אך ההחלטה הסופית תיקבע על ידי הביטוח הלאומי.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_siud_23')}
              >
                {expandedItems['InfoCard_siud_23'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_siud_23'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פירוט שירותים בזכאות</h3>
                  <p>
                    אפשרות ראשונה – 10 שעות שבועיות של טיפול אישי בבית<br/>
                    אפשרות שנייה – שירותי סיעוד ללא טיפול בבית<br/>
                    אפשרות שלישית – שילוב בין קצבה כספית לטיפול אישי בבית<br/>
                    ניתן להמיר עד 4 שעות טיפול לקצבה בכסף (229 ש"ח לשעה)
                  </p>
                </div>

                <div className="content-section">
                  <h3>בחירת סל שירותים</h3>
                  <p>
                    השתמשו במחשבון לבחירת סל שירותים בסיעוד
                  </p>
                  <div className="links-container">
                    <a href="https://www.btl.gov.il/Simulators/SiudCalculators/Pages/siudprogram.aspx" target="_blank" rel="noopener noreferrer">
                      מחשבון סל שירותים
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container for Level 2 Partial Allowance */}
          {isContainerVisible('InfoCard_siud_24') && (
            <div className="container">
              <h3>קצבת סיעוד דרגה 2 - זכאות חלקית</h3>
              <p>
                על פי הניתוח שלנו, אתה עשוי להיות זכאי לקצבת סיעוד ברמה 2 עם זכאות חלקית, אך ההחלטה הסופית תיקבע על ידי הביטוח הלאומי.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_siud_24')}
              >
                {expandedItems['InfoCard_siud_24'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_siud_24'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פירוט שירותים בזכאות</h3>
                  <p>
                    אפשרות ראשונה – 5 שעות שבועיות של טיפול אישי בבית<br/>
                    אפשרות שנייה – שירותי סיעוד ללא טיפול בבית<br/>
                    אפשרות שלישית – שילוב בין קצבה כספית לטיפול אישי בבית<br/>
                    ניתן להמיר שעת טיפול לקצבה בכסף (229 ש"ח לשעה)
                  </p>
                </div>

                <div className="content-section">
                  <h3>מימוש והגשה</h3>
                  <p>
                    ניתן להגיש את הטופס באופן מקוון או בסניפי הביטוח הלאומי.<br/>
                    חשוב לצרף מסמכים רפואיים עדכניים.
                  </p>
                  <div className="links-container">
                    <a href="https://www.btl.gov.il/טפסים%20ואישורים/forms/Long_Term_Care_forms/Pages/2600%20-%20%20תביעה%20לגימלת%20סיעוד.aspx" target="_blank" rel="noopener noreferrer">
                      הגשת תביעה
                    </a>
                  </div>
                </div>

                <div className="content-section">
                  <h3>בחירת סל שירותים</h3>
                  <p>
                    השתמשו במחשבון לבחירת סל שירותים בסיעוד
                  </p>
                  <div className="links-container">
                    <a href="https://www.btl.gov.il/Simulators/SiudCalculators/Pages/siudprogram.aspx" target="_blank" rel="noopener noreferrer">
                      מחשבון סל שירותים
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container for Level 3 Full Allowance */}
          {isContainerVisible('InfoCard_siud_25') && (
            <div className="container">
              <h3>קצבת סיעוד דרגה 3 - זכאות מלאה</h3>
              <p>
                על פי הניתוח שלנו, אתה עשוי להיות זכאי לקצבת סיעוד ברמה 3 עם זכאות מלאה, אך ההחלטה הסופית תיקבע על ידי הביטוח הלאומי.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_siud_25')}
              >
                {expandedItems['InfoCard_siud_25'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_siud_25'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פירוט שירותים בזכאות</h3>
                  <p>
                    אפשרות ראשונה – 17 שעות שבועיות של טיפול אישי בבית<br/>
                    אפשרות שנייה – שילוב של שירותי סיעוד בשילוב עם טיפול אישי בבית<br/>
                    אפשרות שלישית – שילוב של קצבה כספית עם טיפול אישי בבית<br/>
                    ניתן להמיר בכסף עד 4 שעות טיפול, או 6 שעות באישור עו"ס (229 ש"ח לשעה)<br/>
                    אפשרות רביעית – מטפל זר ל 14 שעות שבועיות
                  </p>
                </div>

                <div className="content-section">
                  <h3>מימוש והגשה</h3>
                  <p>
                    יש להגיש בקשה בביטוח הלאומי ולעבור הערכת תלות.<br/>
                    נדרשים מסמכים רפואיים עדכניים.
                  </p>
                  <div className="links-container">
                    <a href="https://www.btl.gov.il/טפסים%20ואישורים/forms/Long_Term_Care_forms/Pages/2600%20-%20%20תביעה%20לגימלת%20סיעוד.aspx" target="_blank" rel="noopener noreferrer">
                      הגשת תביעה
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container for Level 3 Partial Allowance */}
          {isContainerVisible('InfoCard_siud_26') && (
            <div className="container">
              <h3>קצבת סיעוד דרגה 3 - זכאות חלקית</h3>
              <p>
                על פי הניתוח שלנו, אתה עשוי להיות זכאי לקצבת סיעוד ברמה 3 עם זכאות חלקית, אך ההחלטה הסופית תיקבע על ידי הביטוח הלאומי.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_siud_26')}
              >
                {expandedItems['InfoCard_siud_26'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_siud_26'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פירוט שירותים בזכאות</h3>
                  <p>
                    אפשרות ראשונה – 8.5 שעות שבועיות של טיפול אישי בבית<br/>
                    אפשרות שנייה – שילוב של שירותי סיעוד בשילוב עם טיפול אישי בבית<br/>
                    אפשרות שלישית – שילוב של קצבה כספית עם טיפול אישי בבית<br/>
                    ניתן להמיר בכסף עד 2 שעות טיפול, או 3 שעות באישור עו"ס (229 ש"ח לשעה)<br/>
                    אפשרות רביעית – מטפל זר ל 7 שעות שבועיות
                  </p>
                </div>

                <div className="content-section">
                  <h3>בחירת סל שירותים</h3>
                  <p>
                    השתמשו במחשבון לבחירת סל שירותים בסיעוד
                  </p>
                  <div className="links-container">
                    <a href="https://www.btl.gov.il/Simulators/SiudCalculators/Pages/siudprogram.aspx" target="_blank" rel="noopener noreferrer">
                      מחשבון סל שירותים
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container for Level 4 Full Allowance */}
          {isContainerVisible('InfoCard_siud_27') && (
            <div className="container">
              <h3>קצבת סיעוד דרגה 4 - זכאות מלאה</h3>
              <p>
                על פי הניתוח שלנו, אתה עשוי להיות זכאי לקצבת סיעוד ברמה 4 עם זכאות מלאה, אך ההחלטה הסופית תיקבע על ידי הביטוח הלאומי.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_siud_27')}
              >
                {expandedItems['InfoCard_siud_27'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_siud_27'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פירוט שירותים בזכאות</h3>
                  <p>
                    אפשרות ראשונה – 21 שעות שבועיות של טיפול אישי בבית<br/>
                    אפשרות שנייה – שילוב של שירותי סיעוד בשילוב עם טיפול אישי בבית<br/>
                    אפשרות שלישית – שילוב של קצבה כספית עם טיפול אישי בבית<br/>
                    ניתן להמיר בכסף עד 4 שעות טיפול, או 7 שעות באישור עו"ס (229 ש"ח לשעה)<br/>
                    אפשרות רביעית – מטפל זר ל 18 שעות שבועיות
                  </p>
                </div>

                <div className="content-section">
                  <h3>המלצות למבחן תלות ADL</h3>
                  <p>
                    - להדגיש את המצב הגרוע ביותר<br/>
                    - לתאם את הבדיקה לשעות הקושי<br/>
                    - להכין תיעוד של קשיים ונפילות<br/>
                    - להביא התייחסות של פסיכוגריאטר
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container for Level 4 Partial Allowance */}
          {isContainerVisible('InfoCard_siud_28') && (
            <div className="container">
              <h3>קצבת סיעוד דרגה 4 - זכאות חלקית</h3>
              <p>
                על פי הניתוח שלנו, אתה עשוי להיות זכאי לקצבת סיעוד ברמה 4 עם זכאות חלקית, אך ההחלטה הסופית תיקבע על ידי הביטוח הלאומי.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_siud_28')}
              >
                {expandedItems['InfoCard_siud_28'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_siud_28'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פירוט שירותים בזכאות</h3>
                  <p>
                    אפשרות ראשונה – 10.5 שעות שבועיות של טיפול אישי בבית<br/>
                    אפשרות שנייה – שילוב של שירותי סיעוד בשילוב עם טיפול אישי בבית<br/>
                    אפשרות שלישית – שילוב של קצבה כספית עם טיפול אישי בבית<br/>
                    ניתן להמיר בכסף עד 2 שעות טיפול, או 3.5 שעות באישור עו"ס (229 ש"ח לשעה)<br/>
                    אפשרות רביעית – מטפל זר ל 9 שעות שבועיות
                  </p>
                </div>

                <div className="content-section">
                  <h3>בחירת סל שירותים</h3>
                  <p>
                    השתמשו במחשבון לבחירת סל שירותים בסיעוד
                  </p>
                  <div className="links-container">
                    <a href="https://www.btl.gov.il/Simulators/SiudCalculators/Pages/siudprogram.aspx" target="_blank" rel="noopener noreferrer">
                      מחשבון סל שירותים
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container for Level 5 Full Allowance */}
          {isContainerVisible('InfoCard_siud_29') && (
            <div className="container">
              <h3>קצבת סיעוד דרגה 5 - זכאות מלאה</h3>
              <p>
                על פי הניתוח שלנו, אתה עשוי להיות זכאי לקצבת סיעוד ברמה 5 עם זכאות מלאה, אך ההחלטה הסופית תיקבע על ידי הביטוח הלאומי.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_siud_29')}
              >
                {expandedItems['InfoCard_siud_29'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_siud_29'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פירוט שירותים בזכאות</h3>
                  <p>
                    אפשרות ראשונה – 26 שעות שבועיות של טיפול אישי בבית<br/>
                    אפשרות שנייה – שילוב של שירותי סיעוד בשילוב עם טיפול אישי בבית<br/>
                    אפשרות שלישית – שילוב של קצבה כספית עם טיפול אישי בבית<br/>
                    ניתן להמיר בכסף עד 4 שעות טיפול, או 9 שעות באישור עו"ס (229 ש"ח לשעה)<br/>
                    אפשרות רביעית – מטפל זר ל 22 שעות שבועיות
                  </p>
                </div>

                <div className="content-section">
                  <h3>מימוש והגשה</h3>
                  <p>
                    יש להגיש בקשה בביטוח הלאומי ולעבור הערכת תלות.<br/>
                    נדרשים מסמכים רפואיים עדכניים.
                  </p>
                  <div className="links-container">
                    <a href="https://www.btl.gov.il/טפסים%20ואישורים/forms/Long_Term_Care_forms/Pages/2600%20-%20%20תביעה%20לגימלת%20סיעוד.aspx" target="_blank" rel="noopener noreferrer">
                      הגשת תביעה
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container for Level 5 Partial Allowance */}
          {isContainerVisible('InfoCard_siud_30') && (
            <div className="container">
              <h3>קצבת סיעוד דרגה 5 - זכאות חלקית</h3>
              <p>
                על פי הניתוח שלנו, אתה עשוי להיות זכאי לקצבת סיעוד ברמה 5 עם זכאות חלקית, אך ההחלטה הסופית תיקבע על ידי הביטוח הלאומי.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_siud_30')}
              >
                {expandedItems['InfoCard_siud_30'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_siud_30'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פירוט שירותים בזכאות</h3>
                  <p>
                    אפשרות ראשונה – 13 שעות שבועיות של טיפול אישי בבית<br/>
                    אפשרות שנייה – שילוב של שירותי סיעוד בשילוב עם טיפול אישי בבית<br/>
                    אפשרות שלישית – שילוב של קצבה כספית עם טיפול אישי בבית<br/>
                    ניתן להמיר בכסף עד 2 שעות טיפול, או 4.5 שעות באישור עו"ס (229 ש"ח לשעה)<br/>
                    אפשרות רביעית – מטפל זר ל 11 שעות שבועיות
                  </p>
                </div>

                <div className="content-section">
                  <h3>בחירת סל שירותים</h3>
                  <p>
                    השתמשו במחשבון לבחירת סל שירותים בסיעוד
                  </p>
                  <div className="links-container">
                    <a href="https://www.btl.gov.il/Simulators/SiudCalculators/Pages/siudprogram.aspx" target="_blank" rel="noopener noreferrer">
                      מחשבון סל שירותים
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container for Level 6 Full Allowance */}
          {isContainerVisible('InfoCard_siud_31') && (
            <div className="container">
              <h3>קצבת סיעוד דרגה 6 - זכאות מלאה</h3>
              <p>
                על פי הניתוח שלנו, אתה עשוי להיות זכאי לקצבת סיעוד ברמה 6 עם זכאות מלאה, אך ההחלטה הסופית תיקבע על ידי הביטוח הלאומי.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_siud_31')}
              >
                {expandedItems['InfoCard_siud_31'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_siud_31'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פירוט שירותים בזכאות</h3>
                  <p>
                    אפשרות ראשונה – 30 שעות שבועיות של טיפול אישי בבית<br/>
                    אפשרות שנייה – שילוב של שירותי סיעוד בשילוב עם טיפול אישי בבית<br/>
                    אפשרות שלישית – שילוב של קצבה כספית עם טיפול אישי בבית<br/>
                    ניתן להמיר בכסף עד 4 שעות טיפול, או 10 שעות באישור עו"ס (229 ש"ח לשעה)<br/>
                    אפשרות רביעית – מטפל זר ל 26 שעות שבועיות
                  </p>
                </div>

                <div className="content-section">
                  <h3>המלצות למבחן תלות ADL</h3>
                  <p>
                    - להדגיש את המצב הגרוע ביותר<br/>
                    - לתאם את הבדיקה לשעות הקושי<br/>
                    - להכין תיעוד של קשיים ונפילות<br/>
                    - להביא התייחסות של פסיכוגריאטר
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container for Level 6 Partial Allowance */}
          {isContainerVisible('InfoCard_siud_32') && (
            <div className="container">
              <h3>קצבת סיעוד דרגה 6 - זכאות חלקית</h3>
              <p>
                על פי הניתוח שלנו, אתה עשוי להיות זכאי לקצבת סיעוד ברמה 6 עם זכאות חלקית, אך ההחלטה הסופית תיקבע על ידי הביטוח הלאומי.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_siud_32')}
              >
                {expandedItems['InfoCard_siud_32'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_siud_32'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פירוט שירותים בזכאות</h3>
                  <p>
                    אפשרות ראשונה – 15 שעות שבועיות של טיפול אישי בבית<br/>
                    אפשרות שנייה – שילוב של שירותי סיעוד בשילוב עם טיפול אישי בבית<br/>
                    אפשרות שלישית – שילוב של קצבה כספית עם טיפול אישי בבית<br/>
                    ניתן להמיר בכסף עד 2 שעות טיפול, או 5 שעות באישור עו"ס (229 ש"ח לשעה)<br/>
                    אפשרות רביעית – מטפל זר ל 13 שעות שבועיות
                  </p>
                </div>

                <div className="content-section">
                  <h3>בחירת סל שירותים</h3>
                  <p>
                    השתמשו במחשבון לבחירת סל שירותים בסיעוד
                  </p>
                  <div className="links-container">
                    <a href="https://www.btl.gov.il/Simulators/SiudCalculators/Pages/siudprogram.aspx" target="_blank" rel="noopener noreferrer">
                      מחשבון סל שירותים
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container for Allowance Increase to Level 5 */}
          {isContainerVisible('InfoCard_siud_33') && (
            <div className="container">
              <h3>העלאת קצבת סיעוד לדרגה 5</h3>
              <p>
                על פי הניתוח שלנו, נראה כי תוכל להגיש בקשה להעלאת קצבה ולהיות זכאי לקצבת סיעוד בדרגה 5 זכאות מלאה.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_siud_33')}
              >
                {expandedItems['InfoCard_siud_33'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_siud_33'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פירוט שירותים בזכאות החדשה</h3>
                  <p>
                    אפשרות ראשונה – 26 שעות שבועיות של טיפול אישי בבית<br/>
                    אפשרות שנייה – שילוב של שירותי סיעוד בשילוב עם טיפול אישי בבית<br/>
                    אפשרות שלישית – שילוב של קצבה כספית עם טיפול אישי בבית<br/>
                    ניתן להמיר בכסף עד 4 שעות טיפול, או 9 שעות באישור עו"ס (229 ש"ח לשעה)<br/>
                    אפשרות רביעית – מטפל זר ל 22 שעות שבועיות
                  </p>
                </div>

                <div className="content-section">
                  <h3>הגשת בקשה להעלאת קצבה</h3>
                  <p>
                    מכיוון שחלה החמרה במצב הרפואי, נמליץ לשלוח את האישורים הרפואיים העדכניים לביטוח לאומי.
                  </p>
                  <div className="links-container">
                    <a href="https://www.btl.gov.il/טפסים%20ואישורים/forms/Long_Term_Care_forms/Pages/2600%20-%20%20תביעה%20לגימלת%20סיעוד.aspx" target="_blank" rel="noopener noreferrer">
                      טופס בקשה
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container for Allowance Increase to Level 6 */}
          {isContainerVisible('InfoCard_siud_35') && (
            <div className="container">
              <h3>העלאת קצבת סיעוד לדרגה 6</h3>
              <p>
                על פי הניתוח שלנו, נראה כי תוכל להגיש בקשה להעלאת קצבה ולהיות זכאי לקצבת סיעוד בדרגה 6 זכאות מלאה.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_siud_35')}
              >
                {expandedItems['InfoCard_siud_35'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_siud_35'] ? 'expanded' : ''}`}>
                <div className="content-section">
                  <h3>פירוט שירותים בזכאות החדשה</h3>
                  <p>
                    אפשרות ראשונה – 30 שעות שבועיות של טיפול אישי בבית<br/>
                    אפשרות שנייה – שילוב של שירותי סיעוד בשילוב עם טיפול אישי בבית<br/>
                    אפשרות שלישית – שילוב של קצבה כספית עם טיפול אישי בבית<br/>
                    ניתן להמיר בכסף עד 4 שעות טיפול, או 10 שעות באישור עו"ס (229 ש"ח לשעה)<br/>
                    אפשרות רביעית – מטפל זר ל 26 שעות שבועיות
                  </p>
                </div>

                <div className="content-section">
                  <h3>הגשת בקשה להעלאת קצבה</h3>
                  <p>
                    מכיוון שחלה החמרה במצב הרפואי, נמליץ לשלוח את האישורים הרפואיים העדכניים לביטוח לאומי.
                  </p>
                  <div className="links-container">
                    <a href="https://www.btl.gov.il/טפסים%20ואישורים/forms/Long_Term_Care_forms/Pages/2600%20-%20%20תביעה%20לגימלת%20סיעוד.aspx" target="_blank" rel="noopener noreferrer">
                      טופס בקשה
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

export default NursingPage; 