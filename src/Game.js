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
    hasBingo
  } = React.useContext(BingoContext);

  React.useEffect(() => {
    Promise.all(sections.map(name => dataService.getSection(name))).then(sectionData => setListItems(sectionData));
  }, [sections]);

  React.useEffect(() => {
    if (checkScore()) {
      // console.log('do stuff');
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
