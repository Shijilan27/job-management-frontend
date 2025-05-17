'use client';

import { Group, Button, Text, Box } from '@mantine/core';
import Link from 'next/link';
import { IconBriefcase } from '@tabler/icons-react';

export function Navbar() {
  return (
    <Box
      component="nav"
      py="md"
      px="xl"
      style={{
        borderBottom: '1px solid var(--mantine-color-gray-2)',
        backgroundColor: 'white',
      }}
    >
      <Group justify="space-between" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Group>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <IconBriefcase size={32} style={{ color: 'var(--mantine-color-violet-6)' }} />
            <Text fw={700} size="xl" c="dark.9">JobBoard</Text>
          </Link>
          <Group gap="xl" ml="xl">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Text fw={500} c="gray.7" style={{ 
                '&:hover': { color: 'var(--mantine-color-dark-9)' }
              }}>
                Home
              </Text>
            </Link>
            <Link href="/jobs" style={{ textDecoration: 'none' }}>
              <Text fw={500} c="gray.7" style={{ 
                '&:hover': { color: 'var(--mantine-color-dark-9)' }
              }}>
                Find Jobs
              </Text>
            </Link>
            <Link href="/talents" style={{ textDecoration: 'none' }}>
              <Text fw={500} c="gray.7" style={{ 
                '&:hover': { color: 'var(--mantine-color-dark-9)' }
              }}>
                Find Talents
              </Text>
            </Link>
            <Link href="/about" style={{ textDecoration: 'none' }}>
              <Text fw={500} c="gray.7" style={{ 
                '&:hover': { color: 'var(--mantine-color-dark-9)' }
              }}>
                About us
              </Text>
            </Link>
            <Link href="/testimonials" style={{ textDecoration: 'none' }}>
              <Text fw={500} c="gray.7" style={{ 
                '&:hover': { color: 'var(--mantine-color-dark-9)' }
              }}>
                Testimonials
              </Text>
            </Link>
          </Group>
        </Group>
        
        <Link href="/jobs/create" style={{ textDecoration: 'none' }}>
          <Button
            variant="filled"
            color="violet"
            radius="md"
            style={{
              transition: 'transform 150ms ease',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            Create Jobs
          </Button>
        </Link>
      </Group>
    </Box>
  );
} 