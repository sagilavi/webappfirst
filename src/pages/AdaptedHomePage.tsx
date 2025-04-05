import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchSheetData } from '../utils/googleSheetsConfig';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from '../styles/globalStyles';

interface SheetData {
  headers: string[];
  values: string[];
}

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
          
          <h1>בית מותאם</h1>

          {/* Container for Temporary Stairs Accessibility */}
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



            {/* Container for Temporary Stairs Accessibility */}
            {isContainerVisible('InfoCard_home-adjustments1') && (
            <div className="container">
              <h3>פתרון זמני22222222222222222</h3>
              <p>
                כחלק מהשינוי ולטובת צמצום התלות והעלאת רמת הבטיחות נמליץ על הוספה של זחליל עולה מדרגות נייד, התקנה של מעקי בטיחות ועל התקנה של תאורה חזקה בסביבת הכניסה לבית.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_home-adjustments1')}
              >
                {expandedItems['InfoCard_home-adjustments1'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_home-adjustments1'] ? 'expanded' : ''}`}>
              <div className="content-section with-image">

                <img className="inline-image" src="/support-team.jpg" alt="Support Team" />
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
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdaptedHomePage; 