import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';

// CSS.
import './styles/Square.css';

export default function Square(props) {
  return (
    <Card
      className="Square"
    >
      <CardActionArea component={Link} to={'page/' + props.data.name}>
        <CardMedia
          component="img"
          image={'/images/' + props.data.name + (props.hasBingo ? '_done' : '') + '.png'}
          alt={props.data.heading + ' Square'}
        />
        <CardContent className="description">
          <span className="heading-mobile">{props.data.short_heading || props.data.heading}</span>
          <span className="heading-desktop">{props.data.heading}</span>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
