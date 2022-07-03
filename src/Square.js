import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { AppContext } from './AppContext';

// CSS.
import './Square.css';

export default function Square(props) {
  const { hasBingo } = React.useContext(AppContext);

  return (
    <Card
      className="Square"
      sx={{
        backgroundColor: props.bgColor,
      }}
    >
      <CardActionArea component={Link} to={'page/' + props.name}>
        <CardMedia
          component="img"
          image={'images/' + props.name + (hasBingo(props.name) ? '_done' : '') + '.png'}
          alt={props.data.heading + ' Square'}
        />
        <CardContent className="description">
          {props.data.heading}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
