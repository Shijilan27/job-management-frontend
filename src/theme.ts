import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'var(--font-geist-sans)',
  fontFamilyMonospace: 'var(--font-geist-mono)',
  headings: {
    fontFamily: 'var(--font-geist-sans)',
  },
  components: {
    AppShell: {
      styles: {
        root: { minHeight: '100vh' },
      },
    },
  },
}); 