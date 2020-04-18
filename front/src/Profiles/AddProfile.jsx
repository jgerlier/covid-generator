import ProfileCard from '../components/ProfileCard';
import EditProfileDialog from './EditProfileDialog';
import React from 'react';

export default function AddProfile() {
  const [open, setOpen] = React.useState(false);

  return (
    <ProfileCard
      onClick={() => setOpen(true)}
      actionSlot={
        <React.Fragment>
          <div>
            Ajouter
            <br />
            un profil
          </div>
          <EditProfileDialog open={open} onClose={() => setOpen(false)} />
        </React.Fragment>
      }
    />
  );
}
