// src/lib/theme.js
'use client';
import { createTheme } from '@mui/material/styles';

const HEADING = 'sans-serif, serif';
const BODY = '"DM Sans", sans-serif';

// ── Social / channel brand colors ────────────────────────────────────
// Fixed external brand colors — NOT theme-driven (must stay exact).
export const BRAND_COLORS = {
  whatsapp: '#25D366',
  facebook: '#1877F2',
  linkedin: '#0A66C2',
  instagram: '#E4405F',
};

// ── Brand color tokens ───────────────────────────────────────────────
// Single source of truth. Change here → reflects everywhere.
const GOLD = { main: '#B0905E', light: '#C7AC82', dark: '#93764A', pale: '#E2D3B8', contrastText: '#1A1513' };
const NAVY = { main: '#0B1A2A', light: '#1E3A5F', dark: '#061220', contrastText: '#FFFFFF' };

// Slate grey scale (text, borders, surfaces)
const SLATE = {
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0',
  300: '#CBD5E1',
  400: '#94A3B8',
  500: '#64748B',
  600: '#475569',
  700: '#334155',
  800: '#1E293B',
  900: '#0F172A',
};

const sharedConfig = {
  typography: {
    fontFamily: BODY,
    h1: { fontFamily: HEADING, fontWeight: 800, letterSpacing: '0.02em' },
    h2: { fontFamily: HEADING, fontWeight: 700, letterSpacing: '0.02em' },
    h3: { fontFamily: HEADING, fontWeight: 700, letterSpacing: '0.02em' },
    h4: { fontFamily: HEADING, fontWeight: 600, letterSpacing: '0.02em' },
    h5: { fontFamily: HEADING, fontWeight: 600, letterSpacing: '0.02em' },
    h6: { fontFamily: HEADING, fontWeight: 600, letterSpacing: '0.02em' },
    subtitle1: { fontFamily: BODY, fontWeight: 500 },
    subtitle2: { fontFamily: BODY, fontWeight: 500 },
    body1: { fontFamily: BODY, fontWeight: 500 },
    body2: { fontFamily: BODY, fontWeight: 400 },
    caption: { fontFamily: BODY, fontWeight: 400 },
    button: { fontFamily: BODY, fontWeight: 700 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'input, textarea, select': { fontFamily: BODY },
        // Thin golden scrollbar everywhere
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${GOLD.main} transparent`,
        },
        '*::-webkit-scrollbar': { width: '6px', height: '6px' },
        '*::-webkit-scrollbar-track': { background: 'transparent' },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: GOLD.main,
          borderRadius: '8px',
        },
        '*::-webkit-scrollbar-thumb:hover': { backgroundColor: GOLD.dark },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 8,
          transition: 'transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease',
          '&:hover': { transform: 'scale(1.02)' },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #B0905E, #C7AC82)',
          color: '#1A1513',
          boxShadow: '0 4px 12px rgba(212, 175, 55, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #C7AC82, #F0D06A)',
            boxShadow: '0 8px 20px rgba(212, 175, 55, 0.45)',
            filter: 'brightness(1.02)',
          },
        },
        outlinedPrimary: {
          borderColor: '#B0905E',
          color: '#B0905E',
          borderWidth: '1.5px',
          '&:hover': {
            borderColor: '#C7AC82',
            backgroundColor: 'rgba(212, 175, 55, 0.05)',
            boxShadow: '0 2px 8px rgba(212, 175, 55, 0.2)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 700 },
        colorPrimary: {
          background: 'linear-gradient(135deg, #B0905E, #C7AC82)',
          color: '#1A1513',
          boxShadow: '0 2px 6px rgba(212, 175, 55, 0.25)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'box-shadow 0.2s ease',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(212, 175, 55, 0.12)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: { fontFamily: BODY },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #1A1513, #241F1C)',
          color: '#B0905E',
          boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(212, 175, 55, 0.2)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#B0905E',
          '&:hover': {
            backgroundColor: 'rgba(212, 175, 55, 0.08)',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          '&.Mui-selected': {
            color: '#B0905E',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#B0905E',
        },
      },
    },
  },
};

// ☀️ Light Theme
export const lightTheme = createTheme({
  ...sharedConfig,
  palette: {
    mode: 'light',
    primary: { main: GOLD.main, light: GOLD.light, dark: GOLD.dark, contrastText: GOLD.contrastText },
    secondary: { main: '#2C241F', light: '#4A3B32', dark: '#1A1513', contrastText: '#FDF8F0' },
    navy: { main: NAVY.main, light: NAVY.light, dark: NAVY.dark, contrastText: NAVY.contrastText },
    gold: { main: GOLD.main, light: GOLD.light, dark: GOLD.dark, pale: GOLD.pale, contrastText: GOLD.contrastText },
    grey: SLATE,
    background: { default: '#FDF8F0', paper: '#FFFFFF', subtle: SLATE[50], hover: '#FFFDF8' },
    text: { primary: NAVY.main, secondary: SLATE[500], disabled: SLATE[400] },
    error: { main: '#EF4444', light: '#FCA5A5', dark: '#DC2626' },
    warning: { main: '#F59E0B', light: '#FBBF24', dark: '#D97706' },
    info: { main: '#6B8E8F' },
    success: { main: '#10B981', light: '#34D399', dark: '#059669' },
    divider: SLATE[200],
  },
});

// 🌙 Dark Theme
export const darkTheme = createTheme({
  ...sharedConfig,
  palette: {
    mode: 'dark',
    primary: { main: GOLD.main, light: GOLD.light, dark: GOLD.dark, contrastText: GOLD.contrastText },
    secondary: { main: '#E8DFD0', light: '#F2EBE0', dark: '#C4B6A4', contrastText: '#1A1513' },
    navy: { main: '#10243B', light: '#1E3A5F', dark: NAVY.main, contrastText: '#FFFFFF' },
    gold: { main: GOLD.main, light: GOLD.light, dark: GOLD.dark, pale: GOLD.pale, contrastText: GOLD.contrastText },
    grey: SLATE,
    background: { default: '#12100E', paper: '#1D1916', subtle: '#241F1C', hover: '#2A2420' },
    text: { primary: '#F2EBE0', secondary: '#B8A99F', disabled: '#7A6F66' },
    error: { main: '#F87171', light: '#FCA5A5', dark: '#EF4444' },
    warning: { main: '#FBBF24', light: '#FCD34D', dark: '#F59E0B' },
    info: { main: '#7A9A9B' },
    success: { main: '#34D399', light: '#6EE7B7', dark: '#10B981' },
    divider: 'rgba(212, 175, 55, 0.15)',
  },
});