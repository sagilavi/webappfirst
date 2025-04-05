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

          {/* Container for Rights Information */}
          {isContainerVisible('InfoCard_rights_1') && (
            <div className="container">
              <h3>מידע על זכויות</h3>
              <p>
                מידע על הזכויות המגיעות לך והדרכים למימושן.
              </p>
              <button 
                className="toggle-button"
                onClick={() => handleExpand('InfoCard_rights_1')}
              >
                {expandedItems['InfoCard_rights_1'] ? 'הצג פחות' : 'הצג עוד'}
              </button>
              
              <div className={`expandable-content ${expandedItems['InfoCard_rights_1'] ? 'expanded' : ''}`}>
                <div className="content-section with-image">
                  <img className="inline-image" src="/rights-info.jpg" alt="Rights Information" />
                  <div className="text-side">
                    <h3>זכויות וזכאויות</h3>
                    <div className="text-content">
                      <p>
                        מידע מפורט על הזכויות המגיעות לך ואיך לממש אותן.
                      </p>
                    </div>
                    <div className="links-container">
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        מידע נוסף
                      </a>
                    </div>
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