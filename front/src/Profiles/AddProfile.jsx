import ProfileCard from '../components/ProfileCard';
import EditProfileDialog from './EditProfileDialog';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';

export default function AddProfile() {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <ProfileCard
        onClick={() => setOpen(true)}
        actionSlot={
          <React.Fragment>
            <AddIcon />
            <div>
              Ajouter
              <br />
              un profil
            </div>
          </React.Fragment>
        }
      />
      <EditProfileDialog open={open} onClose={() => setOpen(false)} />
    </React.Fragment>
  );
}
