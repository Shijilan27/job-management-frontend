'use client';

import { Box } from '@mantine/core';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--mantine-color-gray-0)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      <Box component="main" style={{ paddingTop: 'var(--mantine-spacing-md)', flex: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
} 