import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Container,
  Grid,
  useMediaQuery,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

// Components.
import Square from "./Square";

// Services
import { BingoContext, winningCombinations } from "./services/BingoContext";
import DataService from "./services/DataService";

// CSS.
import "./styles/Game.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const dataService = new DataService();

export default function Game() {
  const theme = useTheme();
  let [listItems, setListItems] = React.useState([]);
  const sections = dataService.getSections();
  const {
    hasBingo,
    newlyCompletedLines,
    newlyCompletedBlackout,
    clearNewWins,
  } = React.useContext(BingoContext);
  const [flashingSquares, setFlashingSquares] = React.useState([]);

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

  React.useEffect(() => {
    Promise.all(sections.map(name => dataService.getSection(name))).then(sectionData => setListItems(sectionData));
  }, [sections]);

  React.useEffect(() => {
    let squaresToFlash = [];
    let shouldFlash = false;

    if (newlyCompletedBlackout) {
      setSnackbarMessage("BLACKOUT! You've completed the entire board!");
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      squaresToFlash = sections;
      shouldFlash = true;
    } else if (newlyCompletedLines.length > 0) {
      setSnackbarMessage("BINGO! You've completed a line!");
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      const winningSquares = newlyCompletedLines.flatMap(lineIndex =>
        winningCombinations[lineIndex].map(squareIndex => sections[squareIndex])
      );
      squaresToFlash = [...new Set(winningSquares)];
      shouldFlash = true;
    }

    if (shouldFlash) {
      setFlashingSquares(squaresToFlash);
      setTimeout(() => {
        setFlashingSquares([]);
        clearNewWins();
      }, 1500);
    }
  }, [newlyCompletedLines, newlyCompletedBlackout, clearNewWins, sections]);

  return (
    <Container
      maxWidth="lg"
      disableGutters={useMediaQuery(theme.breakpoints.down("sm"))}
      sx={{ mt: 4, mb: 4 }}
    >
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        {listItems.map((section, index) => (
          <Grid
            key={index}
            size={{ xs: 3 }}
            className={`${section.colour} ${flashingSquares.includes(section.name) ? "flash" : ""}`}
          >
            <Square data={section} hasBingo={hasBingo(section.name)} />
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
