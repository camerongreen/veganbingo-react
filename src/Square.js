import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { BingoContext } from './BingoContext';

// CSS.
import './styles/Square.css';

export default function Square(props) {
  const { hasBingo } = React.useContext(BingoContext);

  return (
    <Card
      className="Square"
      sx={{
        backgroundColor: props.data.colour,
      }}
    >
      <CardActionArea component={Link} to={'page/' + props.data.name}>
        <CardMedia
          component="img"
          image={'images/' + props.data.name + (hasBingo(props.data.name) ? '_done' : '') + '.png'}
          alt={props.data.heading + ' Square'}
        />
        <CardContent className="description">
          {props.data.heading}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
