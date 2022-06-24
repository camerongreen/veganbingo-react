import * as React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { AppContext } from './AppContext';
import InfoPage from './InfoPage';

function SimpleDialog(props) {
  const { onClose, open } = props;
  const { bingos, resetBingos } = React.useContext(AppContext);

  const handleDoIt = () => {
    resetBingos();
    onClose();
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>Your bingo count is {Object.keys(bingos).length}. Are you
        really sure you want to reset the game?</DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}>Cancel</Button>
        <Button variant="contained" autoFocus
                onClick={handleDoIt}>Do it!</Button>
      </DialogActions>
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

  const { bingos } = React.useContext(AppContext);

  return (
    <InfoPage icon={<SettingsIcon fontSize="large"/>} heading="Settings">
      <p>
        There aren't many settings for Bingo, but you can clear all your bingos
        by clicking this button.
      </p>
      <Button variant="contained" color="secondary" size="large"
              disabled={Object.keys(bingos).length === 0}
              onClick={handleClickOpen}>Remove all bingos!</Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
      />
    </InfoPage>
  );
}
