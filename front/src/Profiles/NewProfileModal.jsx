import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  TextField,
} from '@material-ui/core';
import React from 'react';

export default function NewProfileModal({ open, onSubmit, onCancel }) {
  function handleSubmit(event) {
    event.preventDefault();

    const profile = {
      firstName: event.target.firstName.value.trim(),
      lastName: event.target.lastName.value.trim(),
      birthDate: new Date(event.target.birthDate.value).toLocaleDateString({
        locales: 'fr_FR',
      }),
      birthCity: event.target.birthCity.value.trim(),
      address: event.target.address.value.trim(),
      zipcode: event.target.zipcode.value,
      city: event.target.city.value.trim(),
    };

    onSubmit(profile);
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="new-profile-dialog-title"
    >
      <DialogTitle id="new-profile-dialog-title">Nouveau profil</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Ce profil sera sauvegardée uniquement dans votre navigateur actuel.
          </DialogContentText>
          <TextField
            margin="dense"
            id="firstName"
            label="Prénom"
            required
            fullWidth
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Nom"
            required
            fullWidth
          />
          <TextField
            margin="dense"
            id="birthDate"
            label="Date de naissance"
            type="date"
            max={today}
            InputProps={{ startAdornment: ' ' }}
            required
            fullWidth
          />
          <TextField
            margin="dense"
            id="birthCity"
            label="Ville de naissance"
            required
            fullWidth
          />
          <TextField
            margin="dense"
            id="address"
            label="Addresse (numéro et nom de la rue)"
            required
            fullWidth
          />
          <TextField
            margin="dense"
            id="zipcode"
            label="Code postal"
            required
            fullWidth
            inputProps={{
              pattern: '[0-9]{5}',
            }}
          />
          <TextField
            margin="dense"
            id="city"
            label="Ville de résidence"
            required
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Annuler
          </Button>
          <Button color="primary" type="submit">
            Valider
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
