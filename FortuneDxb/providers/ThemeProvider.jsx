// src/components/ThemeProvider.jsx
'use client';
import { createContext, useContext } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { lightTheme } from '@/lib/theme';

// Light theme only — toggle kept as a no-op for any existing consumers.
const ThemeToggleContext = createContext();
export const useThemeToggle = () => useContext(ThemeToggleContext);

export default function ThemeProvider({ children }) {
  const mode = 'light';
  const toggleTheme = () => {};

  return (
    <ThemeToggleContext.Provider value={{ mode, toggleTheme }}>
      <AppRouterCacheProvider>
        <MUIThemeProvider theme={lightTheme}>
          <CssBaseline />
          {children}
        </MUIThemeProvider>
      </AppRouterCacheProvider>
    </ThemeToggleContext.Provider>
  );
}