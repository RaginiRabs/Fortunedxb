'use client';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  
  // Routes without navbar/footer
  const isBareRoute =
    pathname?.startsWith('/admin') || pathname?.startsWith('/seller');

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