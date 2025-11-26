import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { CssBaseline, IconButton } from '@mui/material';
import { Sun, Moon } from 'lucide-react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('dark'); // default dark

  // LocalStorage se load karo (pehle se setting ho to)
  useEffect(() => {
    const saved = localStorage.getItem('themeMode');
    if (saved) setMode(saved);
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#C39F58' }, // Gold/Brand color
      secondary: { main: '#0F1C2E' }, // Dark Blue background
      background: {
        default: mode === 'dark' ? '#0F1C2E' : '#f5f5f5', // Main body background
        paper: mode === 'dark' ? '#0A1628' : '#ffffff', // Card/Surface background
      },
      text: {
        primary: mode === 'dark' ? '#F4E5C3' : '#0F1C2E', // Light text on dark / Dark text on light
        secondary: mode === 'dark' ? 'rgba(244, 229, 195, 0.7)' : '#555555', // Subtext
      },
      divider: 'rgba(195, 159, 88, 0.3)', // Divider color
    },
    typography: {
        fontFamily: 'Montserrat, Arial, sans-serif',
        h1: { fontSize: '5rem' },
        h3: { fontSize: '2.5rem' },
        button: { textTransform: 'none' }
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    transition: 'all 0.3s ease-in-out',
                }
            }
        }
    }
  }), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Toggle Button Component (Navbar mein use karenge)
export const ThemeToggleButton = () => {
  const { mode, toggleTheme } = useTheme();
  
  return (
    <IconButton 
        onClick={toggleTheme} 
        sx={{ 
            color: 'primary.main', 
            ml: 1, 
            transition: 'all 0.3s ease',
            '&:hover': {
                bgcolor: 'rgba(195, 159, 88, 0.12)',
                transform: 'rotate(30deg)'
            }
        }}
    >
      {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </IconButton>
  );
};