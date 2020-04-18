import AddProfile from './AddProfile';
import NewProfileModal from './NewProfileModal';
import Profile from './Profile';
import { Grid } from '@material-ui/core';
import React from 'react';

export default function Users({ profiles, onProfileAdded, onProfileSelected }) {
  const [open, setOpen] = React.useState(false);

  function handleSubmit(profile) {
    setOpen(false);
    onProfileAdded(profile);
  }

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
            <Grid item>
              <AddProfile onClick={() => setOpen(true)} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <NewProfileModal
        open={open}
        onCancel={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
