import ProfileCard from '../components/ProfileCard';
import DeleteProfileDialog from './DeleteProfileDialog';
import EditProfileDialog from './EditProfileDialog';
import { Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react';

export default function Profile({ profile, onClick }) {
  const [open, setOpen] = useState({
    edit: false,
    delete: false,
  });
  const { firstName, lastName } = profile;

  return (
    <ProfileCard
      onClick={onClick}
      actionSlot={
        <Typography variant="h5">
          {firstName}
          <br />
          {lastName}
        </Typography>
      }
      subActionsSlot={
        <React.Fragment>
          <Button
            onClick={() => setOpen({ edit: true })}
            size="small"
            color="primary"
            variant="contained"
          >
            <EditIcon />
          </Button>
          <Button
            onClick={() => setOpen({ delete: true })}
            size="small"
            color="primary"
            variant="contained"
          >
            <DeleteIcon />
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
