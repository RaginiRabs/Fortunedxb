'use client';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  
  // Redesign zones — each has its OWN navbar/footer in its layout.jsx
  const zonePrefixes = ['/r', '/m', '/a', '/aa'];
  const isZoneRoute = zonePrefixes.some(
    (p) => pathname === p || pathname?.startsWith(`${p}/`)
  );

  // Routes without the global navbar/footer
  const isBareRoute =
    pathname?.startsWith('/admin') || pathname?.startsWith('/seller') || isZoneRoute;

  if (isBareRoute) {
    return <>{children}</>;
  }

  // Public routes - with navbar/footer
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}