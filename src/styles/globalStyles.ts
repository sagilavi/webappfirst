import { createGlobalStyle } from 'styled-components';

// Debugging mode configuration
export const DebuggingMode = true;

// Theme configuration with detailed typography settings
export const theme = {
  // Color palette
  colors: {
    // Primary brand colors
    primary: '#4CAF50',
    primaryDark: '#388E3C',
    primaryLight: 'rgba(76, 175, 80, 0.1)',
    primaryShadow: 'rgba(76, 175, 80, 0.2)',
    primaryShadowDark: 'rgba(76, 175, 80, 0.3)',
    primaryShadowDarkButton: '#000000',
    ForestCharcoal: '#414336',
    ForestCharcoalLight: '#9CA786',
    LuminousCream: '#FBFFDF',
    LavenderPurple: '#E6E6FA',
    SageMist: '#D5D9BA',

    // Background and text colors
    pageBackground: '#D5D9BA',
    background: '#9CA786',
    white: '#ffffff',
    text: '#333333',
    
    // Table specific colors
    tableHeaderBg: '#f5f5f5',
    tableStripedBg: '#f9f9f9',
    tableBorder: '#ddd',
  },

  // Typography settings
  typography: {
    // Font families
    fonts: {
      title: 'Frank Ruhl Libre, serif',     // For main titles (h1)
      subtitle: 'Frank Ruhl Libre, serif',   // For subtitles (h2-h6)
      body: 'DM Sans, sans-serif',          // For regular text
      button: 'DM Sans, sans-serif',        // For buttons and interactive elements
    },
    
    // Font sizes
    sizes: {
      title: '4.5rem',
      subtitle: '1.3rem',
      body: '1.1rem',
      button: '1.1rem',
      small: '0.9rem',
    },
    
    // Font weights
    weights: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    
    // Line heights
    lineHeights: {
      title: 1.2,
      subtitle: 1.4,
      body: 1.6,
    },
  },

  // Spacing system
  spacing: {
    small: '1rem',
    medium: '2rem',
    large: '3rem',
  },

  // Border radius
  borderRadius: {
    small: '6px',
    medium: '12px',
    large: '18px',
  },

  // Shadow system
  shadows: {
    small: '0 2px 4px',
    medium: '0 4px 8px',
    large: '0 4px 12px',
  },

  // Container settings
  containers: {
    maxWidth: '1200px',
    padding: {
      small: '1rem',
      medium: '2rem',
      large: '3rem',
    },
    borderRadius: {
      small: '8px',
      medium: '12px',
      large: '16px',
    },
  },
} as const;

// Global styles
export const GlobalStyles = createGlobalStyle`
  /* Import fonts */
  @import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@400;500;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

  /* Reset styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Base styles */
  body {
    font-family: ${theme.typography.fonts.body};
    background-color: ${theme.colors.pageBackground} ;
    color: ${theme.colors.text};
    line-height: ${theme.typography.lineHeights.body};
    font-size: ${theme.typography.sizes.body};
  }

  /* Title styles */
  h1 {
    font-family: ${theme.typography.fonts.title};
    font-size: ${theme.typography.sizes.title};
    font-weight: ${theme.typography.weights.bold};
    color: ${theme.colors.ForestCharcoal};
    margin-bottom: ${theme.spacing.medium};
    text-align: center;
    line-height: ${theme.typography.lineHeights.title};
  }

  /* Subtitle styles */
  h2, h3, h4, h5, h6 {
    font-family: ${theme.typography.fonts.subtitle};
    font-size: ${theme.typography.sizes.subtitle};
    font-weight: ${theme.typography.weights.medium};
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.small};
    text-align: right;
    line-height: ${theme.typography.lineHeights.subtitle};
  }

  /* Paragraph styles */
  p {
    font-family: ${theme.typography.fonts.body};
    font-size: ${theme.typography.sizes.body};
    line-height: ${theme.typography.lineHeights.body};
    color: ${theme.colors.text};
    margin-bottom: ${theme.spacing.medium};
    text-align: right;
  }

  /* Link styles */
  a {
    font-family: ${theme.typography.fonts.button};
    font-size: ${theme.typography.sizes.button};
    color: ${theme.colors.white};
    text-decoration: none;
    display: inline-block;
    text-align: center;
    background-color: ${theme.colors.primary};
    padding: 0.8rem 1.5rem;
    border-radius: ${theme.borderRadius.small};
    transition: all 0.3s ease;
    box-shadow: ${theme.shadows.small} ${theme.colors.primaryShadow};
    width: 25%;
    min-width: 150px;

    &:hover {
      background-color: ${theme.colors.primaryDark};
      color: #414336; /* ✅ Text becomes #414336 */
      border: 1px solid #414336; /* ✅ Border becomes #414336 */
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.medium} ${theme.colors.primaryShadowDark};
    }
  }

  /* Button styles */
  button {
    font-family: ${theme.typography.fonts.button};
    font-size: ${theme.typography.sizes.button};
    background-color: ${theme.colors.primary};
    color: ${theme.colors.primaryShadowDarkButton};
    border: none;
    padding: 1rem 2rem;
    border-radius: ${theme.borderRadius.large};
    cursor: pointer;
    transition: all 0.3s ease;
    display: block;
    margin: 0 auto;
    box-shadow: ${theme.shadows.small} ${theme.colors.primaryShadow};

    &:hover {
      background-color: ${theme.colors.primaryDark};
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.medium} ${theme.colors.primaryShadowDark};
    }
  }

  /* Layout classes */
  .page-container {
    min-height: calc(100vh - 80px);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${theme.colors.pageBackground} !important;
    padding: ${theme.spacing.large} ${theme.spacing.medium};
  }

  .content-wrapper {
    width: 100%;
    max-width: 1200px;
    padding: ${theme.spacing.medium};
  }

  /* Section styles */
  .section {
    margin-bottom: ${theme.spacing.medium};
    background: ${theme.colors.white};
    border-radius: ${theme.borderRadius.medium};
    padding: ${theme.spacing.medium};
    box-shadow: ${theme.shadows.large} ${theme.colors.primaryShadow};
    border: 1px solid ${theme.colors.primaryLight};
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  /* Enhanced container styles */
  .container {
    width: 100%;
    max-width: ${theme.containers.maxWidth};
    margin: 0 auto;
    padding: ${theme.containers.padding.medium};
    background-color: ${theme.colors.LuminousCream};
    border-radius: ${theme.containers.borderRadius.medium};
    box-shadow: ${theme.shadows.medium} ${theme.colors.primaryShadow};
    border: 1px solid ${theme.colors.primaryLight};
    margin-bottom: ${theme.spacing.medium};
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.large} ${theme.colors.primaryShadowDark};
    }

    h2, h3 {
      width: 100%;
      text-align: right;
      margin-bottom: ${theme.spacing.small};
    }

    p {
      width: 100%;
      text-align: right;
      margin-bottom: ${theme.spacing.medium};
    }
  }

  /* Enhanced expandable content styles */
  .expandable-content {
    width: 100%;
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    opacity: 0;
    transform: translateY(-10px);

    &.expanded {
      max-height: 2000px;
      opacity: 1;
      transform: translateY(0);
      margin-top: ${theme.spacing.medium};
    }

    /* Inner content styling */
    .content-section {
      padding: ${theme.spacing.medium};
      border-top: 3px solid ${theme.colors.ForestCharcoal};
      border-radius: 0;
      margin-top: ${theme.spacing.medium};
      
      h3 {
        color: ${theme.colors.primary};
        margin-bottom: ${theme.spacing.small};
      }
      
      p {
        margin-bottom: ${theme.spacing.medium};
      }

      &.with-image {
        display: flex;
        flex-direction: row-reverse; /* Image on left, text on right */
        align-items: center;
        gap: 1.5rem;
        position: relative;

        .inline-image {
          width: 420px;
          height: 300px; /* Fixed height for better alignment */
          border-radius: 8px;
          object-fit: contain;
        }

        .text-side {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 300px; /* Match image height */
          justify-content: space-between;
          align-items: center; /* Center align content */
          padding: 0 1rem;

          h3 {
            text-align: center;
            margin-top: 0; /* Align with top of image */
          }

          .text-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex: 1;

            p {
              text-align: center;
              margin: 0; /* Remove default margins for better centering */
            }
          }

          .links-container {
            margin-bottom: 0; /* Align with bottom of image */
            width: auto;
          }
        }
      }
    }
  }

  /* Enhanced button styles */
  .toggle-button {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    padding: ${theme.spacing.small} ${theme.spacing.medium};
    border: none;
    border-radius: ${theme.borderRadius.medium};
    cursor: pointer;
    font-family: ${theme.typography.fonts.button};
    font-size: ${theme.typography.sizes.button};
    font-weight: ${theme.typography.weights.medium};
    transition: all 0.3s ease;
    display: block;
    margin: ${theme.spacing.small} auto;
    min-width: 150px;

    &:hover {
      background-color: ${theme.colors.primaryDark};
      color: #414336; /* ✅ Text becomes #414336 */
      border: 1px solid #414336; /* ✅ Border becomes #414336 */
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.medium} ${theme.colors.primaryShadowDark};
    }

    &:active {
      transform: translateY(0);
    }
  }

  /* Links container styles */
  .links-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing.small};
    width: 100%;
    padding: ${theme.spacing.small} 0;

    a {
      width: auto;
      min-width: 200px;
      max-width: 300px;
    }
  }

  /* Image container styles */
  .image-container {
    width: 200px;
    height: 150px;
    border-radius: ${theme.borderRadius.small};
    overflow: hidden;
    margin: ${theme.spacing.small} 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  /* Debug container styles */
  .debug-container {
    display: ${DebuggingMode ? 'block' : 'none'};
    background: ${theme.colors.white};
    border-radius: ${theme.borderRadius.medium};
    padding: ${theme.spacing.medium};
    margin-bottom: ${theme.spacing.medium};
    box-shadow: ${theme.shadows.large} ${theme.colors.primaryShadow};
    border: 1px solid ${theme.colors.primaryLight};
    direction: ltr;
  }

  /* Table styles */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    font-family: ${theme.typography.fonts.body};
    
    th, td {
      border: 1px solid ${theme.colors.tableBorder};
      padding: 8px;
      text-align: left;
    }
    
    th {
      background-color: ${theme.colors.tableHeaderBg};
      font-weight: ${theme.typography.weights.medium};
    }
    
    tr:nth-child(even) {
      background-color: ${theme.colors.tableStripedBg};
    }
  }
`; 