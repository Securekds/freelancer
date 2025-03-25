// theme.js
import { createTheme } from '@mui/material/styles';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

export const rtlTheme = createTheme({
  direction: 'rtl',
});

export const ltrTheme = createTheme({
  direction: 'ltr',
});

export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
