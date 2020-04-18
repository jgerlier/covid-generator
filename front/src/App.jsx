import './App.scss';
import 'dexie-observable';

import { generateDocument } from './apiClient.js';
import Profiles from './Profiles';
import Container from '@material-ui/core/Container';
import Dexie from 'dexie';
import React, { useEffect, useState } from 'react';

const db = new Dexie('CovidGenerator');

function initProfiles(setProfiles) {
  function setProfilesFromDb() {
    db.transaction('r', db.profiles, async () => {
      setProfiles(await db.profiles.toArray());
    }).catch((e) => {
      // log any errors
      console.error(e);
    });
  }

  db.version(1).stores({ profiles: 'id' });

  // initial state fetched from DB
  setProfilesFromDb();

  // update state on any profile change in the DB
  db.on('changes', (changes) => {
    if (changes.find(({ table }) => table === 'profiles')) {
      setProfilesFromDb();
    }
  });
}

function onProfileAdded(profile) {
  db.transaction('rw', db.profiles, async () => {
    await db.profiles.add(profile);
  }).catch((e) => {
    // log any errors
    console.error(e);
  });
}

function handleProfileSelected(profile) {
  generateDocument(profile, 'sport');
}

export default function App() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    initProfiles(setProfiles);
    return () => db.close();
  }, []);

  return (
    <div className="App">
      <header className="App-header">Ma super App</header>
      <main>
        <Container>
          {db.hasFailed() && (
            <div>An error occured while opening the local database.</div>
          )}
          <Profiles
            profiles={profiles}
            onProfileAdded={onProfileAdded}
            onProfileSelected={(profile) => handleProfileSelected(profile)}
          />
        </Container>
      </main>
    </div>
  );
}
