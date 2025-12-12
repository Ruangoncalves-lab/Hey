import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Initial State from LocalStorage or Defaults
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('traffic-master-theme');
    return savedTheme ? JSON.parse(savedTheme) : {
      colors: {
        primary: '#113C3C',
        secondary: '#FDFBF7',
        accent: '#E8F5E9',
        text: '#1F2937',
        card: '#FFFFFF',
        buttonBg: '#FFFFFF',
        buttonText: '#113C3C'
      },
      font: 'Outfit',
      borderRadius: '2rem', // '0px', '0.5rem', '1rem', '2rem'
      layout: {
        showMetrics: true,
        showCharts: true,
        showRecentActivity: true,
        compactMode: false
      }
    };
  });

  // Apply Styles to Root
  useEffect(() => {
    const root = document.documentElement;

    // Colors
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-bg-main', theme.colors.secondary);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-text-primary', theme.colors.text);
    root.style.setProperty('--color-bg-card', theme.colors.card);

    // Button Colors
    root.style.setProperty('--color-button-bg', theme.colors.buttonBg);
    root.style.setProperty('--color-button-text', theme.colors.buttonText);

    // Font
    root.style.setProperty('--font-sans', `"${theme.font}", sans-serif`);

    // Border Radius (Custom Logic for 'smooth' class)
    // We might need to update the actual CSS class definition or use a variable
    root.style.setProperty('--radius-card', theme.borderRadius);

    // Save to LocalStorage
    localStorage.setItem('traffic-master-theme', JSON.stringify(theme));
  }, [theme]);

  const updateColor = (key, value) => {
    setTheme(prev => ({
      ...prev,
      colors: { ...prev.colors, [key]: value }
    }));
  };

  const updateFont = (fontName) => {
    setTheme(prev => ({ ...prev, font: fontName }));
  };

  const updateRadius = (radius) => {
    setTheme(prev => ({ ...prev, borderRadius: radius }));
  };

  const toggleLayout = (key) => {
    setTheme(prev => ({
      ...prev,
      layout: { ...prev.layout, [key]: !prev.layout[key] }
    }));
  };

  const resetTheme = () => {
    setTheme({
      colors: {
        primary: '#113C3C',
        secondary: '#FDFBF7',
        accent: '#E8F5E9',
        text: '#1F2937',
        card: '#FFFFFF',
        buttonBg: '#FFFFFF',
        buttonText: '#113C3C'
      },
      font: 'Outfit',
      borderRadius: '2rem',
      layout: {
        showMetrics: true,
        showCharts: true,
        showRecentActivity: true,
        compactMode: false
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, updateColor, updateFont, updateRadius, toggleLayout, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
