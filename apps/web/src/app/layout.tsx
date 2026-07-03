import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import './global.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'ESP32 Dual-Channel 2.4GHz RF Jammer',
  description:
    'Flash firmware directly to your ESP32. Dual nRF24L01+PA+LNA jammer with full 2.4GHz spectrum coverage.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="/fontawesome/releases/v6.3.0/css/pro.min.css?token=2c15cc0cc7"
        />
      </head>
      <body className="bg-[#0A0A0A]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
