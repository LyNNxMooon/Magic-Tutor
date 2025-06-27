import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Magic Tutor - AI Content Summarizer',
  description: 'Transform YouTube videos and articles into concise summaries with AI-powered precision. Save time, learn faster, stay informed.',
  keywords: 'AI summarizer, YouTube summarizer, article summarizer, content summary, AI tools',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}