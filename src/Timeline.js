import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GridOn from '@mui/icons-material/GridOn'
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { AppContext } from './AppContext';
import Moment from 'moment';
import CardActionArea from '@mui/material/CardActionArea';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function Timeline(props) {
  const { bingos } = React.useContext(AppContext);

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
              <ListAltIcon fontSize="large"/>
            </Grid>
            <Grid item>
              <h2>Bingo timeline</h2>
            </Grid>
          </Grid>
          <p>
          Here are your completed bingos!
          </p>
          <Grid container spacing={3}>
            {Object.entries(bingos).reverse().map(([name, bingo], index) =>
              <Grid item xs={12} key={index}
                    className={props.data[name].colour}>
                <Card>
                  <CardActionArea component={Link} to={'/page/' + name}
                                  sx={{ display: 'flex', justifyContent: 'left' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: '120px', height: '120px', m: '1rem' }}
                      image={'/images/' + name + '.png'}
                    />
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      m: '1rem 0',
                    }}>
                      <CardContent sx={{
                        display: 'flex',
                        flex: '1 0 auto',
                        alignItems: 'center',
                      }}>
                        <div>
                          <Typography component="h2" variant="h4">
                            {props.data[name].description}
                          </Typography>
                          <Typography>
                            Completed <strong>{Moment(bingo.time).format('HH:mm Do MMM YYYY')}</strong>
                          </Typography>
                        </div>
                      </CardContent>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>,
            )}
          </Grid>
          <IconButton component={Link} to="/">
            <GridOn/>
          </IconButton>
        </Paper>
      </Grid>
    </Container>
  );
}
