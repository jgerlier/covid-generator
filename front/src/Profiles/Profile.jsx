import { CardActionArea } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import React from 'react';

export default function Profile({
  profile: {
    firstName,
    lastName,
    birthDate,
    birthCity,
    address,
    zipcode,
    city,
  },
  onClick,
}) {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        {firstName}
        <br />
        {lastName}
        <br />
        {birthDate}
        <br />
        {birthCity}
        <br />
        {address}
        <br />
        {zipcode}
        <br />
        {city}
        <br />
      </CardActionArea>
    </Card>
  );
}
