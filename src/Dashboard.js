import * as React from 'react';
import { Link, Outlet, useLocation, ScrollRestoration } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Mui.
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import GridOnIcon from '@mui/icons-material/GridOn';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import MLink from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// Components.
import { mainListItems } from './listItems';
import Score from './Score';

// Services
import DataService from './services/DataService';
import { BingoContext } from './services/BingoContext';

// CSS
import './styles/Dashboard.css';

export const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#8b3fb5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    h4: {
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
  },
};

const mdTheme = createTheme(themeOptions);

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary"
      align="center" {...props} sx={{ mb: 2 }}>
      {'Copyright © '}
      <MLink color="inherit" href="https://camerongreen.org/">
        camerongreen.org
      </MLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function DashboardContent() {
  const { bingos } = React.useContext(BingoContext);
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const dataService = new DataService();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              mr: 2,
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Show home grid"
            component={Link}
            to="/"
            sx={{
              ml: 2,
              mr: 1,
            }}
          >
            <GridOnIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            <Link className="link" to="/">
              Vegan Bingo!
            </Link>{' '}
          </Typography>
          <Score score={Object.keys(bingos).length}
            total={Object.keys(dataService.getSections()).length} />
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClick={toggleDrawer}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <AnimatePresence>
          <motion.div
            key={location.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        <Copyright sx={{ pt: 4 }} />
      </Box>
    </Box>
  );
}

export default function Dashboard() {
  return (
    <ThemeProvider theme={mdTheme}>
      <ScrollRestoration />
      <DashboardContent />
    </ThemeProvider>
  );
}
