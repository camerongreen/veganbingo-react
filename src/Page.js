import * as React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// CSS.
import './Page.css';

export default function Page(props) {
  let { name } = useParams();
  const page = props.data[name];
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={2}>
          <img src={require('../public/images/' + name + '.png')}
               alt={page.description + ' Page'}/>
        </Grid>
        <Grid item xs={10}>
          <h2>{page.description}</h2>
        </Grid>
        <Grid item xs={12} className="rules">
          <div>Other acceptable statements for this bingo</div>
          <h3>{page.rules}</h3>
        </Grid>
        <Grid item xs={12}>
          <div className="main">{page.main}</div>
        </Grid>
      </Grid>
    </Container>
  );
}
