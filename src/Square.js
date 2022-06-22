import * as React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import {AppContext} from './AppContext';

// CSS.
import './Square.css';

export default function Square(props) {
  const {hasBingo} = React.useContext(AppContext);

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
        <div className="Square">
          <Link to={'page/' + props.name}>
          <img src={require('../public/images/' + props.name + (hasBingo(props.name) ? '_done' : '') + '.png')}
               alt={props.data.description + ' Square'}/>
          <h2>{props.data.description}</h2>
          </Link>
        </div>
    </Paper>
  );
}
