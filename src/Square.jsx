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
          alt={props.data.question + ' Square'}
        />
        <CardContent className="description">
          <span className="heading-mobile">{props.data.short_question || props.data.question}</span>
          <span className="heading-desktop">{props.data.question}</span>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
