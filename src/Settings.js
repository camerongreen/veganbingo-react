import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import GridOnIcon from '@mui/icons-material/GridOn'
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import HelpCenterIcon from "@mui/icons-material/HelpCenter";

export default function Settings() {
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
          <Grid container spacing={2} sx={{display: 'flex', alignItems: 'center'}}>
            <Grid item>
              <SettingsIcon fontSize="large"/>
            </Grid>
            <Grid item>
              <h2>Settings</h2>
            </Grid>
          </Grid>
          <p>
          </p>

          <IconButton component={Link} to="/">
            <GridOnIcon/>
          </IconButton>
        </Paper>
      </Grid>
    </Container>
  );
}
