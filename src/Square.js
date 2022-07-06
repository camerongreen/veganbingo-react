import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { BingoContext } from './BingoContext';

// Services.
import DataService from './services/DataService';

// CSS.
import './styles/Square.css';

export default function Square(props) {
  const { hasBingo } = React.useContext(BingoContext);
  const dataService = new DataService();
  const data = dataService.getSection(props.name);

  return (
    <Card
      className="Square"
      sx={{
        backgroundColor: data.colour,
      }}
    >
      <CardActionArea component={Link} to={'page/' + props.name}>
        <CardMedia
          component="img"
          image={'images/' + props.name + (hasBingo(props.name) ? '_done' : '') + '.png'}
          alt={data.heading + ' Square'}
        />
        <CardContent className="description">
          {data.heading}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
