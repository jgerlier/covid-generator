import { Card, CardActionArea } from '@material-ui/core';
import React from 'react';

export default function AddProfile({ onClick }) {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        Ajouter un profil
        <br />
      </CardActionArea>
    </Card>
  );
}
