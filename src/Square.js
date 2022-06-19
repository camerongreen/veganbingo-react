import * as React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';

// CSS.
import './Square.css';

export default function Square(props) {
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: props.bgColor,
      }}
    >
      <Link to={'page/' + props.name}>
        <div className="Square">
          <img src={require('../public/images/' + props.name + '.png')}
               alt={props.data.description + ' Square'}/>
          <h2>{props.data.description}</h2>
        </div>
      </Link>
    </Paper>
  );
}
