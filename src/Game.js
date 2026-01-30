import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


// Components.
import Square from './Square';

// Services
import { BingoContext } from './services/BingoContext';
import DataService from './services/DataService';

// CSS.
import './styles/Game.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Game() {
  const theme = useTheme();
  let [listItems, setListItems] = React.useState([]);
  const dataService = new DataService();
  const sections = dataService.getSections();
  const {
    checkScore,
    hasBingo,
    bingos,
    resetCheckScore,
  } = React.useContext(BingoContext);
  const [lineComplete, setLineComplete] = React.useState(false);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const winningCombinations = [
    // Rows
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    // Columns
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    // Diagonals
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];

  React.useEffect(() => {
    Promise.all(sections.map(name => dataService.getSection(name))).then(sectionData => setListItems(sectionData));
  }, [sections]);

  React.useEffect(() => {
    if (checkScore()) {
      const completedCount = Object.keys(bingos).length;
      if (completedCount === 16) {
        setSnackbarMessage("BLACKOUT! You've completed the entire board!");
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        resetCheckScore();
        return;
      }

      if (!lineComplete) {
        for (const combination of winningCombinations) {
          const isLineComplete = combination.every(index => hasBingo(sections[index]));
          if (isLineComplete) {
            setSnackbarMessage("BINGO! You've completed a line!");
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setLineComplete(true);
            break;
          }
        }
      }
      resetCheckScore();
    }
  });

  return (
    <Container maxWidth="lg"
               disableGutters={useMediaQuery(theme.breakpoints.down('sm'))}
               sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        {listItems.map((section, index) => (
          <Grid key={index} size={{xs:3}} className={section.colour}>
            <Square data={section} hasBingo={hasBingo(section.name)}/>
          </Grid>
        ))}
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
