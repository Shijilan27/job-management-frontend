'use client';

import { Box, Text, Container } from '@mantine/core';

export function Footer() {
  return (
    <Box 
      component="footer" 
      style={{ 
        borderTop: '1px solid var(--mantine-color-gray-2)',
        marginTop: 'auto',
        paddingTop: 'var(--mantine-spacing-md)',
        paddingBottom: 'var(--mantine-spacing-md)',
        backgroundColor: 'white'
      }}
    >
      <Container size="xl">
        <Text ta="center" size="sm" c="dimmed">
          Developed by Shijilan
        </Text>
      </Container>
    </Box>
  );
} 