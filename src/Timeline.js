import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GridOn from '@mui/icons-material/GridOn'
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { AppContext } from './AppContext';

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
          {Object.keys(bingos).map((name, index) => {
            <div>
            <h1>{name}</h1>
            <Card key={index}>
              <CardMedia
                component="img"
                image={'images/' + name + '.png'}
                />
              <CardContent>
                <Typography component="h2">
                  {props.data[name].description}
                </Typography>
                <Typography component="body">
                  {bingos[name].time}
                </Typography>
              </CardContent>
            </Card>
            </div>
          })}
          <IconButton component={Link} to="/">
            <GridOn/>
          </IconButton>
        </Paper>
      </Grid>
    </Container>
  );
}
