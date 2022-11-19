import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouteError } from "react-router-dom";


export default function Error() {
  const theme = useTheme();
  const error = useRouteError();
  console.error(error);

  return (
    <Container maxWidth="lg"
               disableGutters={useMediaQuery(theme.breakpoints.down('sm'))}
               sx={{ mt: 4, mb: 4 }}>
      <h1>Here be dragons!</h1>
      <p>Sorry, you've slipped off the edge of the world. You've found a part
        of <a href="/">Vegan Bingo</a> that we didn't know about.</p>
      <p>Click <a href="/">here</a> to return to the known universe.</p>
    </Container>
  );
}
