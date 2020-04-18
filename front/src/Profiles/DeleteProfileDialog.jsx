import { deleteProfile } from '../dbClient';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';
import React from 'react';

export default function DeleteProfileDialog({
  open,
  onClose: handleClose,
  profile,
}) {
  function handleSubmit() {
    deleteProfile(profile);
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="new-profile-dialog-title"
    >
      <DialogTitle id="new-profile-dialog-title">
        Suppression du profil
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Êtes vous sûr de vouloir supprimer le profil de
            {` ${profile.firstName} ${profile.lastName}`} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Annuler
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Valider
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
