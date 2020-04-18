import './App.scss';

import { generateDocument } from './apiClient.js';
import { db, initProfiles } from './dbClient';
import Profiles from './Profiles';
import Container from '@material-ui/core/Container';
import React, { useEffect, useState } from 'react';

function handleSelectProfile(profile) {
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
            db={db}
            onSelectProfile={(profile) => handleSelectProfile(profile)}
          />
        </Container>
      </main>
    </div>
  );
}
