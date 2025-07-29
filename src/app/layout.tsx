'use client'

import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider/ReduxProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <ReduxProvider >
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
