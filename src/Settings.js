import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import GridOnIcon from '@mui/icons-material/GridOn'
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { AppContext } from './AppContext';

function SimpleDialog(props) {
  const { onClose, open } = props;
  const {bingos, resetBingos} = React.useContext(AppContext);

  const handleDoIt = () => {
    resetBingos();
    onClose();
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Your bingo count is {Object.keys(bingos).length}. Are you sure you want to reset the game?</DialogTitle>
      <Button variant="contained" color="secondary" size="large"
              onClick={handleDoIt}>Do it!</Button>
      <Button variant="outlined" color="secondary" size="large"
              onClick={handleClose}>Cancel</Button>
    </Dialog>
  );
}

export default function Settings() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const {bingos, resetBingos} = React.useContext(AppContext);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Game */}
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Grid container spacing={2} sx={{display: 'flex', alignItems: 'center'}}>
            <Grid item>
              <SettingsIcon fontSize="large"/>
            </Grid>
            <Grid item>
              <h2>Settings</h2>
            </Grid>
          </Grid>
          <p>
            There aren't many settings for Bingo, but you can clear all your bingos by clicking this button.
          </p>
            <Button variant="contained" color="secondary" size="large" disabled={Object.keys(bingos).length === 0}
                    onClick={handleClickOpen}>Remove all bingos!</Button>
          <SimpleDialog
            open={open}
            onClose={handleClose}
          />
          <IconButton component={Link} to="/">
            <GridOnIcon/>
          </IconButton>
        </Paper>
      </Grid>
    </Container>
  );
}
