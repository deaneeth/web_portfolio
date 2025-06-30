import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dineth - AI/ML Explorer & Creative Technologist',
  description: 'Portfolio of Dineth - Builder of Futures, Poet with a Keyboard, AI/ML enthusiast and Computer Science undergraduate at University of Plymouth, Sri Lanka.',
  keywords: ['Dineth', 'AI', 'Machine Learning', 'Computer Science', 'Portfolio', 'Sri Lanka', 'Plymouth'],
  authors: [{ name: 'Dineth' }],
  openGraph: {
    title: 'Dineth - AI/ML Explorer & Creative Technologist',
    description: 'Builder of Futures. Poet with a Keyboard. AI/ML Explorer.',
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
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}