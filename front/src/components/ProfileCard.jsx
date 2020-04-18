import {
  Card, CardActionArea, CardActions, makeStyles,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '10rem',
  },
  action: {
    padding: 15,
    flexGrow: 1,
  },
  subActions: {
    justifyContent: 'space-between',
  },
});

export default function ProfileCard({ onClick, actionSlot, subActionsSlot }) {
  const classes = useStyles();
  return (
    <Card className={classes.root} color="primary">
      <CardActionArea className={classes.action} onClick={onClick}>
        {actionSlot}
      </CardActionArea>
      {subActionsSlot && (
        <CardActions className={classes.subActions}>
          {subActionsSlot}
        </CardActions>
      )}
    </Card>
  );
}
