import './App.scss';

import { generateDocument } from './apiClient.js';
import { db, initProfiles } from './dbClient';
import { Footer } from './Footer';
import Profiles from './Profiles';
import Reasons from './Reasons';
import {
  Backdrop, CircularProgress, Grid, Link, makeStyles,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  reasons: {
    paddingBottom: 20,
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
  const [error, setError] = useState(null);

  useEffect(() => {
    if (db.hasFailed()) {
      setError("Impossible d'ouvrir la base de données locale.");
    } else {
      initProfiles(setProfiles);
    }
    return () => db.close();
  }, []);

  async function handleSelectProfile(profile) {
    setSubmitting(true);
    try {
      await generateDocument(profile, reason);
    } catch (ex) {
      console.error(ex);
      setError('Une erreur est survenue pendant la génération');
    }
    setSubmitting(false);
  }

  const classes = useStyles();

  return (
    <div className="App">
      <header className="App-header">
        <span>
          Générateur d'attestation de déplacement dérogatoire - Covid-19
        </span>
        {error && (
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="error"
            onClose={() => setError(null)}
          >
            {error}
          </MuiAlert>
        )}
      </header>
      <main>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item className={classes.reasons} xs={12} md={4}>
              <Reasons reason={reason} onChange={setReason} />
            </Grid>
            <Grid item xs={12} md={8}>
              {profiles.length > 0 ? (
                <p>Cliquez sur un profil pour télécharger son attestation :</p>
              ) : (
                <p>Créez un nouveau profil pour générer son attestation :</p>
              )}
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
      <Footer />
    </div>
  );
}
