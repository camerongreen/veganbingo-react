import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import GridOnIcon from '@mui/icons-material/GridOn';
import Typography from '@mui/material/Typography';
import { AppContext } from './AppContext';
import Moment from 'moment';

// CSS.
import './Page.css';

export default function Page(props) {
  const { name } = useParams();
  const {
    bingos,
    hasBingo,
    addBingo,
    removeBingo,
  } = React.useContext(AppContext);
  const page = props.data[name];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={2}>
          <img
            src={require('../public/images/' + name + (hasBingo(name) ? '_done' : '') + '.png')}
            alt={page.description + ' Page'}/>
        </Grid>
        <Grid item xs={10}>
          <h2>{page.description}</h2>
        </Grid>
        <Grid item xs={12} className="rules">
          <div>Other acceptable statements for this bingo</div>
          <h3>{page.rules}</h3>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" size="large"
                  onClick={() => {
                    hasBingo(name) ? removeBingo(name) : addBingo(name)
                  }}>{hasBingo(name) ? 'Remove bingo' : 'Add bingo!'}</Button>
        </Grid>
        {hasBingo(name) ? (
          <Grid item>
            <Typography>
              Completed <strong>{Moment(bingos[name].time).format('HH:mm Do MMM YYYY')}</strong>
            </Typography>
          </Grid>
        ) : ''}
        <Grid item xs={12} className="main">
          {page.main.map((paragraph, index) =>
            <p key={index}>{paragraph}</p>,
          )}
        </Grid>
      </Grid>
      <IconButton component={Link} to="/">
        <GridOnIcon/>
      </IconButton>
    </Container>
  );
}
