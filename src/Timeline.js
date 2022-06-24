import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GridOn from '@mui/icons-material/GridOn'
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { AppContext } from './AppContext';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function Timeline(props) {
  const { bingos } = React.useContext(AppContext);

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
          <h2>Timeline</h2>
          {Object.entries(bingos).map(([name, bingo], index) =>
            <Card key={index} sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{width: '120px'}}
                image={'images/' + name + '.png'}
              />
              <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                  <Typography component="h2">
                    {props.data[name].description}
                  </Typography>
                  <Typography component="body">
                    {bingo.time.toString()}
                  </Typography>
                </CardContent>
              </Box>
            </Card>,
          )}
          <IconButton component={Link} to="/">
            <GridOn/>
          </IconButton>
        </Paper>
      </Grid>
    </Container>
  );
}
