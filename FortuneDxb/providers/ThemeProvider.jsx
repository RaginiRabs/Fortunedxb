// src/components/ThemeProvider.jsx
'use client';
import { createContext, useContext, useState } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { lightTheme, darkTheme } from '@/lib/theme';

// Context — toggle ke liye
const ThemeToggleContext = createContext();
export const useThemeToggle = () => useContext(ThemeToggleContext);

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  return (
    <ThemeToggleContext.Provider value={{ mode, toggleTheme }}>
      <AppRouterCacheProvider>
        <MUIThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
          <CssBaseline />
          {children}
        </MUIThemeProvider>
      </AppRouterCacheProvider>
    </ThemeToggleContext.Provider>
  );
}