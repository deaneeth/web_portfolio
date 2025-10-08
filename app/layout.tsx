import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Deaneeth - AI/ML Explorer & Creative Technologist',
  description: 'Portfolio of Deaneeth - Builder of Futures, AI/ML Explorer, and Computer Science undergraduate at University of Plymouth, Sri Lanka.',
  keywords: ['Deaneeth', 'AI', 'Machine Learning', 'Computer Science', 'Portfolio', 'Sri Lanka', 'Plymouth'],
  authors: [{ name: 'Deaneeth' }],
  openGraph: {
    title: 'Deaneeth - AI/ML Explorer & Creative Technologist',
    description: 'Builder of Futures. AI/ML Explorer.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <DashboardLayout>
            {children}
          </DashboardLayout>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}