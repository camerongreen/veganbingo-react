import * as React from 'react';
import { Link } from 'react-router-dom';
import { Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';

// CSS.
import './styles/Score.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Score(props) {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    document.addEventListener('bingo:add', (evt) => {
      evt.stopImmediatePropagation();
      setOpen(true);
    });
  });

  return (
    <div className="Score">
      <Link to="/timeline/">
        Bingos: {props.score}/{props.total}
      </Link>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Bingo! Updating your score
        </Alert>
      </Snackbar>
    </div>
  );
}
