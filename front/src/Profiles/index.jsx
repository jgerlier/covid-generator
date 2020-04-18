import AddProfile from './AddProfile';
import Profile from './Profile';
import { Grid } from '@material-ui/core';
import React from 'react';

export default function Users({ profiles, onSelectProfile }) {
  return (
    <div>
      <Grid container spacing={2} justify="center">
        {profiles.map((profile) => (
          <ProfileGrid key={profile.id}>
            <Profile
              profile={profile}
              onClick={() => onSelectProfile(profile)}
            />
          </ProfileGrid>
        ))}
        <ProfileGrid>
          <AddProfile />
        </ProfileGrid>
      </Grid>
    </div>
  );
}

const ProfileGrid = ({ children, props }) => (
  <Grid {...props} item xs={8} sm={6} md={4} lg={3}>
    {children}
  </Grid>
);
