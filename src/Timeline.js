import * as React from 'react';
import Grid from '@mui/material/Grid';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import CardActionArea from '@mui/material/CardActionArea';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import InfoPage from './InfoPage';

// Services.
import { BingoContext } from './BingoContext';
import DataService from './services/DataService';

export default function Timeline() {
  const { bingos } = React.useContext(BingoContext);
  const [data, setData] = React.useState({});
  const dataService = new DataService();
  const bingoKeys = Object.keys(bingos);

  React.useEffect(() => {
    Promise.all(bingoKeys.map(name => dataService.getSection(name))).then(loadedData => {
      let keyedData = {};

      bingoKeys.forEach(name => {
        keyedData[name] = loadedData.find(element => element.name === name);
      });

      setData(keyedData)
    });
  }, [bingos, bingoKeys]);

  return (
    <InfoPage icon={<ListAltIcon fontSize="large"/>} heading="Bingo timeline">
      {bingoKeys.length ? (
        <React.Fragment>
          <p>
            You
            started <strong>{Moment((Object.values(bingos)[0]).time).fromNow()}</strong>
          </p>
          <p>Here are your completed bingos!</p>
        </React.Fragment>
      ) : (
        <p>When you complete some bingos, you will see a list of them there.</p>
      )}
      <Grid container spacing={3}>
        {Object.entries(data).reverse().map(([name, values], index) =>
          <Grid item xs={12} className={values.colour}>
            <Card>
              <CardActionArea component={Link} to={'/page/' + name}
                              sx={{
                                display: 'flex',
                                justifyContent: 'left',
                              }}>
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
                        {values.description}
                      </Typography>
                      <Typography>
                        Completed <strong>{Moment(bingos[name].time).format('HH:mm Do MMM YYYY')}</strong>
                      </Typography>
                    </div>
                  </CardContent>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>,
        )}
      </Grid>
    </InfoPage>
  );
}
