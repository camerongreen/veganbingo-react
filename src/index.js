import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import App from './App';
import theme from './theme';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <HelmetProvider>
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <App/>
  </ThemeProvider>
  </HelmetProvider>,
);
