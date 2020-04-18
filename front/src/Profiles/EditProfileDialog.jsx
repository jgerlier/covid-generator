import { saveOrUpdateProfile } from '../dbClient';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  TextField,
} from '@material-ui/core';
import React from 'react';

export default function EditProfileDialog({
  open,
  onClose: handleClose,
  initialValues = {
    id: null,
    firstName: '',
    lastName: '',
    birthDate: '',
    locales: '',
    birthCity: '',
    address: '',
    zipcode: '',
    city: '',
  },
}) {
  function handleSubmit(event) {
    event.preventDefault();

    const profile = {
      id: initialValues.id,
      firstName: event.target.firstName.value.trim(),
      lastName: event.target.lastName.value.trim(),
      birthDate: event.target.birthDate.value,
      birthCity: event.target.birthCity.value.trim(),
      address: event.target.address.value.trim(),
      zipcode: event.target.zipcode.value,
      city: event.target.city.value.trim(),
    };

    saveOrUpdateProfile(profile);
    handleClose();
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="new-profile-dialog-title"
    >
      <DialogTitle id="new-profile-dialog-title">
        {initialValues.id ? 'Modifier le profil' : 'Nouveau profil'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {!initialValues.id && (
            <DialogContentText>
              Ce profil sera sauvegardé uniquement dans votre navigateur.
            </DialogContentText>
          )}
          <TextField
            defaultValue={initialValues.firstName}
            margin="dense"
            id="firstName"
            label="Prénom"
            required
            fullWidth
          />
          <TextField
            defaultValue={initialValues.lastName}
            margin="dense"
            id="lastName"
            label="Nom"
            required
            fullWidth
          />
          <TextField
            defaultValue={initialValues.birthDate}
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
            defaultValue={initialValues.birthCity}
            margin="dense"
            id="birthCity"
            label="Ville de naissance"
            required
            fullWidth
          />
          <TextField
            defaultValue={initialValues.address}
            margin="dense"
            id="address"
            label="Addresse"
            required
            fullWidth
          />
          <TextField
            defaultValue={initialValues.zipcode}
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
            defaultValue={initialValues.city}
            margin="dense"
            id="city"
            label="Ville de résidence"
            required
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            type="button"
            variant="contained"
          >
            Annuler
          </Button>
          <Button color="primary" type="submit" variant="contained">
            Valider
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
