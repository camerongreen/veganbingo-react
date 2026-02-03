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
import { BingoContext } from "./services/BingoContext";
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
  const { hasBingo } = React.useContext(BingoContext);
  const [flashingSquares, setFlashingSquares] = React.useState([]);
  const [flashClass, setFlashClass] = React.useState('');

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
    // Check for completed squares on mount
    const storage_name = "veganbingo.net";
    const completedData = localStorage.getItem(`${storage_name}_completed_squares`);
    
    if (completedData) {
      try {
        const squares = JSON.parse(completedData);
        const isBlackout = squares.length === sections.length;
        
        if (squares && squares.length > 0) {
          // Set the appropriate flash class
          setFlashClass(isBlackout ? 'flash-blackout' : 'flash-line');
          setFlashingSquares(squares);
          
          // Show notification
          if (isBlackout) {
            setSnackbarMessage("BLACKOUT! You've completed the entire board!");
          } else {
            setSnackbarMessage("BINGO! You've completed a line!");
          }
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          
          // Clear after animation completes (3 flashes * 0.5s = 1.5s, 5 flashes * 0.5s = 2.5s)
          const animationDuration = isBlackout ? 2500 : 1500;
          setTimeout(() => {
            setFlashingSquares([]);
            setFlashClass('');
            localStorage.removeItem(`${storage_name}_completed_squares`);
          }, animationDuration);
        }
      } catch (e) {
        console.error('Error parsing completed squares:', e);
        localStorage.removeItem(`${storage_name}_completed_squares`);
      }
    }
  }, []); // Only run on mount

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
            className={`${section.colour} ${flashingSquares.includes(section.name) ? flashClass : ""}`}
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
