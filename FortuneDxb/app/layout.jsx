import MuiThemeProvider from '@/providers/ThemeProvider';
import { ThemeProvider } from '@/contexts/ThemeContext';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import './globals.css';
import 'leaflet/dist/leaflet.css';

export const metadata = {
  title: 'Fortune DXB - Luxury Off-Plan Properties in Dubai',
  description: 'Discover exclusive off-plan properties in Dubai. 500+ projects from top developers like Emaar, DAMAC, Nakheel. Expert guidance for global investors.',
  keywords: 'Dubai real estate, off-plan properties, Dubai investment, luxury apartments Dubai, villas Dubai',
  openGraph: {
    title: 'Fortune DXB - Luxury Off-Plan Properties in Dubai',
    description: 'Discover exclusive off-plan properties in Dubai from top developers.',
    url: 'https://fortunedxb.com',
    siteName: 'Fortune DXB',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <MuiThemeProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </MuiThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}