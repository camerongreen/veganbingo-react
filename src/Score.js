import * as React from 'react';
import { Link } from 'react-router-dom';

// CSS.
import './styles/Score.css';

export default function Score(props) {
  return (
    <div className="Score">
      <Link to="/timeline/">
        Bingos: {props.score}/{props.total}
      </Link>
    </div>
  );
}
