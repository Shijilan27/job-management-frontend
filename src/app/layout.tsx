import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@/components/providers/NotificationsProvider';
import { theme } from '@/theme';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Management System",
  description: "Track and manage your job applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <NotificationsProvider />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
