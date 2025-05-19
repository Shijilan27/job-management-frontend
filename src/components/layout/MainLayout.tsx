'use client';

import { useState } from 'react';
import { AppShell } from '@mantine/core';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CreateJobModal } from '@/components/jobs/CreateJobModal';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);

  return (
    <AppShell
      header={{ height: 120 }}
      padding="md"
      styles={{
        main: {
          background: '#FFFFFF',
        },
      }}
    >
      <AppShell.Header>
        <Navbar onCreateJob={() => setIsCreateJobOpen(true)} />
      </AppShell.Header>

      <AppShell.Main>
        {children}
      </AppShell.Main>

      <Footer />

      <CreateJobModal
        opened={isCreateJobOpen}
        onClose={() => setIsCreateJobOpen(false)}
      />
    </AppShell>
  );
} 