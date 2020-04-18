import ProfileCard from '../components/ProfileCard';
import DeleteProfileDialog from './DeleteProfileDialog';
import EditProfileDialog from './EditProfileDialog';
import { Button } from '@material-ui/core';
import React from 'react';

export default function Profile({ profile, onClick }) {
  const [open, setOpen] = React.useState({
    edit: false,
    delete: false,
  });
  const { firstName, lastName, birthDate } = profile;

  return (
    <ProfileCard
      onClick={onClick}
      actionSlot={
        <div>
          {firstName}
          <br />
          {lastName}
          <br />
          {birthDate}
        </div>
      }
      subActionsSlot={
        <React.Fragment>
          <Button
            onClick={() => setOpen({ edit: true })}
            size="small"
            color="primary"
          >
            Modifier
          </Button>
          <Button
            onClick={() => setOpen({ delete: true })}
            size="small"
            color="primary"
          >
            Supprimer
          </Button>
          <EditProfileDialog
            open={open.edit}
            onClose={() => setOpen({ edit: false })}
            initialValues={profile}
          />
          <DeleteProfileDialog
            open={open.delete}
            onClose={() => setOpen({ delete: false })}
            profile={profile}
          />
        </React.Fragment>
      }
    />
  );
}
