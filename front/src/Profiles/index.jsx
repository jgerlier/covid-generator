import AddProfile from './AddProfile';
import Profile from './Profile';
import { Grid } from '@material-ui/core';
import React from 'react';

export default function Users({ profiles, onSelectProfile }) {
  return (
    <div>
      <Grid container spacing={2}>
        {profiles.map((profile) => (
          <ProfileGrid>
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
  <Grid {...props} item xs={6} sm={4} md={3} lg={2}>
    {children}
  </Grid>
);
