import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GridOn from '@mui/icons-material/GridOn'
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

export default function Timeline() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Game */}
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ListAltIcon fontSize="large"/>
          <p>
          </p>

          <IconButton component={Link} to="/">
            <GridOn/>
          </IconButton>
        </Paper>
      </Grid>
    </Container>
  );
}
