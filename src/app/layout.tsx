import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './global.css';
import FacebookPixel from '@/components/FacebookPixel';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Neumann - Web Solutions',
  description:
    'Neumann Web Solutions - Desenvolvimento web profissional, sites responsivos e sistemas customizados',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${inter.className} theme-dark`}>
        {children}
        <FacebookPixel />
      </body>
    </html>
  );
}