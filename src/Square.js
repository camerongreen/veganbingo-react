import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
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
      <CardActionArea href={'page/' + props.name}>
        <CardMedia
          component="img"
          image={'images/' + props.name + (hasBingo(props.name) ? '_done' : '') + '.png'}
          alt={props.data.description + ' Square'}
        />
        <CardContent className="description">
          {props.data.description}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
