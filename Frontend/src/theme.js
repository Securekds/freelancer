// theme.js
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

// Function to create theme based on direction
export const createCustomTheme = (direction) => 
  createTheme({
    direction,
    palette: {
      mode: 'light', // or 'dark'
    },
  });

export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
