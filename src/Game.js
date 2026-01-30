import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

// Components.
import Square from './Square';

// Services
import { BingoContext } from './services/BingoContext';
import DataService from './services/DataService';

// CSS.
import './styles/Game.css';

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
        alert("BLACKOUT! You've completed the entire board!");
        resetCheckScore();
        return;
      }

      if (!lineComplete) {
        for (const combination of winningCombinations) {
          const isLineComplete = combination.every(index => hasBingo(sections[index]));
          if (isLineComplete) {
            alert("BINGO! You've completed a line!");
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
    </Container>
  );
}
