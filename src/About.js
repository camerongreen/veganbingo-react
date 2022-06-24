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
            Vegan Bingo was inspired by (what I think is) the original Omnivore Rationalization Bingo by Vegnews. It is made to make light of the things we hear so often as vegans. It's not meant to make fun of anybody, just to make fun.
          </p>
          <p>
            If you'd like to get in touch about the app or anything else, or just want to read my thoughts, check out my web page at: <a href="https://camerongreen.org" target="_blank">camerongreen.org</a>
          </p>
          <p>
            You can chat more about Vegan Bingo, post your times, watch tumble weeds roll past (seriously there have been like 2 posts ever), etc at: <a href="https://facebook.com/veganbingo" target="_blank">facebook.com/veganbingo</a>
          </p>
          <p>
            To read the privacy terms or other FAQs about the app: <a href="https://camerongreen.org/a/veganbingo" target="_blank">Vegan Bingo on E.A.R.T.H.</a>.
          </p>
          <p>
            This work is licensed under the Creative Commons
            Attribution-NonCommercial-ShareAlike 3.0 Unported License. To view a
            copy of this license, visit <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank">Creative Commons</a>
          </p>
          <p>Ahimsa!</p>

          <IconButton component={Link} to="/">
            <GridOnIcon/>
          </IconButton>
        </Paper>
      </Grid>
    </Container>
  );
}
