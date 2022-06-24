import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import GridOnIcon from '@mui/icons-material/GridOn';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

export default function InfoPage(props) {
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
          <Grid container spacing={2}
                sx={{ display: 'flex', alignItems: 'center' }}>
            <Grid item>
              {props.icon}
            </Grid>
            <Grid item>
              <h2>{props.heading}</h2>
            </Grid>
          </Grid>
          <Divider/>
          {props.children}
          <IconButton component={Link} to="/">
            <GridOnIcon/>
          </IconButton>
        </Paper>
      </Grid>
    </Container>
  );
}
