import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import GridOnIcon from '@mui/icons-material/GridOn'
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Grid container spacing={2} sx={{display: 'flex', alignItems: 'center'}}>
            <Grid item>
              <InfoIcon fontSize="large"/>
            </Grid>
            <Grid item>
              <h2>About Vegan Bingo</h2>
            </Grid>
          </Grid>
          <p>
            Hi :)
          </p>
          <p>
            Vegan Bingo was developed for the animals. Originally it was written
            as an Android application, which you can get that for free from the
            Play Store.
          </p>
          <p>
            If you'd like to get in touch about the app or anything else, or
            just want to read my thoughts, check out my web page at:
            https://camerongreen.org
          </p>
          <p>
            You can chat more about Vegan Bingo, post your times, watch tumble
            weeds roll past, etc at: https://facebook.com/veganbingo
          </p>
          <p>
            To read the privacy terms or other FAQs about the app:
            https://camerongreen.org/a/veganbingo
            Big thanks to the original Rationalization Bingo in Vegnews which
            inspired this.
          </p>
          <p>
            This work is licensed under the Creative Commons
            Attribution-NonCommercial-ShareAlike 3.0 Unported License. To view a
            copy of this license, visit
            http://creativecommons.org/licenses/by-nc-sa/3.0/.
          </p>

          <IconButton component={Link} to="/">
            <GridOnIcon/>
          </IconButton>
        </Paper>
      </Grid>
    </Container>
  );
}
