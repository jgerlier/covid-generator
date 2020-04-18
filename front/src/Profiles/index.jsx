import Profile from './Profile';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Users({ profiles, onProfileAdded, onProfileSelected }) {
  const fixedProfile = {
    id: uuidv4(),
    firstName: 'Prénom',
    lastName: 'Nom',
    birthDate: '01/01/2000',
    birthCity: 'Paris',
    address: 'Address',
    zipcode: '75001',
    city: 'Paris',
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {profiles.map((profile) => (
              <Grid key={profile.id} item>
                <Profile
                  profile={profile}
                  onClick={() => onProfileSelected(profile)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onProfileAdded(fixedProfile)}
      >
        Ajouter un profil
      </Button>
    </div>
  );
}
