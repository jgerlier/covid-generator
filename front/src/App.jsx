import './App.scss';

import { generateDocument } from './apiClient.js';
import { db, initProfiles } from './dbClient';
import Profiles from './Profiles';
import Reasons from './Reasons';
import {
  Backdrop, CircularProgress, Grid, makeStyles,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  reasons: {
    margin: 10,
    marginBottom: 20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function App() {
  const [profiles, setProfiles] = useState([]);
  const [reason, setReason] = useState('sport');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    initProfiles(setProfiles);
    return () => db.close();
  }, []);

  async function handleSelectProfile(profile) {
    setSubmitting(true);
    await generateDocument(profile, reason);
    setSubmitting(false);
  }

  const classes = useStyles();

  return (
    <div className="App">
      <header className="App-header">Ma super App</header>
      <main>
        <Container maxWidth="lg">
          {db.hasFailed() && (
            <div>An error occured while opening the local database.</div>
          )}
          <Grid container>
            <Grid item className={classes.reasons}>
              <Reasons reason={reason} onChange={setReason} />
            </Grid>
            <Grid item>
              <Profiles
                profiles={profiles}
                db={db}
                onSelectProfile={(profile) => handleSelectProfile(profile)}
              />
            </Grid>
          </Grid>
        </Container>
        <Backdrop open={submitting} className={classes.backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </main>
    </div>
  );
}
