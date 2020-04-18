import 'dexie-observable';

import Dexie from 'dexie';
import { v4 as uuid } from 'uuid';

export const db = new Dexie('CovidGenerator');

export function initProfiles(updateProfilesCallback) {
  function setProfilesFromDb() {
    db.transaction('r', db.profiles, async () => {
      updateProfilesCallback(await db.profiles.toArray());
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

export async function saveOrUpdateProfile(profile) {
  if (profile.id) {
    db.transaction('rw', db.profiles, async () => {
      const updated = await db.profiles.update(profile.id, profile);
      if (!updated) {
        console.warn('No document found with id', profile.id);
      }
    }).catch((e) => {
      console.error(e);
    });
  } else {
    db.transaction('rw', db.profiles, async () => {
      await db.profiles.add({
        id: uuid(),
        ...profile,
      });
    }).catch((e) => {
      console.error(e);
    });
  }
}

export async function deleteProfile(profile) {
  db.transaction('rw', db.profiles, async () => {
    const updated = await db.profiles
      .where(':id')
      .equals(profile.id)
      .delete()
      .then(function (deleteCount) {
        if (deleteCount === 0) {
          console.warn(
            'No document found with id, unable to delete',
            profile.id
          );
        }
      });
    if (!updated) {
      console.warn('No document found with id, unable to update', profile.id);
    }
  }).catch((e) => {
    console.error(e);
  });
}
