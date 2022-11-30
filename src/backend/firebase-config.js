import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import {USER_AUTH} from '../constants/GLOBAL';
import {Alert} from 'react-native';

GoogleSignin.configure({
  webClientId:
    '780619674479-06cdvatq36f4m7nt45a7hovmbs1e47bq.apps.googleusercontent.com',
});

const googleSignIn = async (setLoading, navigation) => {
  setLoading(true);
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const user = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(user.idToken);
    navigation.replace('PlaylistStack');

    if (await isUserExist(user.user?.id)) {
      addUserToDatabase(
        user.user?.email,
        user.user?.id,
        user.user?.name,
        user.user?.photo,
      );
    }

    auth().signInWithCredential(googleCredential);
  } catch (err) {
    console.log(err.message);
  }
  setLoading(false);
};

const addUserToDatabase = async (email, id, name, photo) => {
  try {
    await firestore()
      .collection('users')
      .doc(email)
      .set({
        id,
        name,
        photo,
        favorites: [],
        songsLike: [],
        lastPlayedSong: {firstTime: true},
      });
  } catch (err) {
    console.log(err);
  }
};

const isUserExist = async id => {
  const user = await firestore().collection('users').where(id, '==', id).get();

  const tempDb = [];
  user.docs.forEach(artist => {
    tempDb.push(artist.data());
  });

  return tempDb.length > 0;
};

const logoutUser = async navigation => {
  try {
    navigation.replace('AuthenticationScreen');
    await auth().signOut();
    await GoogleSignin.signOut();
    await GoogleSignin.revokeAccess();
  } catch (error) {
    console.log(error.message);
  }
};

const getArtistByCategory = async (category, setArtist) => {
  const user = await firestore()
    .collection('artists')
    .where('category', '==', category)
    .get();

  const tempDb = [];
  user.docs.forEach(artist => {
    tempDb.push(artist.data());
  });

  setArtist(tempDb);
};

const getFavoriteArtist = async setFavoriteArtist => {
  firestore()
    .collection('users')
    .doc(auth().currentUser?.email)
    .onSnapshot(
      user => {
        const tempFavorites = [];
        user.data()?.favorites.forEach(async artistInfo => {
          tempFavorites.push(artistInfo);
        });

        setFavoriteArtist(tempFavorites);
      },
      err => {
        console.log(err.message);
      },
    );
};

const getLastPlayedSong = setSong => {
  firestore()
    .collection('users')
    .doc(auth().currentUser?.email)
    .onSnapshot(
      user => {
        setSong(user.data()?.lastPlayedSong);
      },
      err => {
        console.log(err.message);
      },
    );
};

const getNumberOfFavorites = async setNumberOfFavorites => {
  firestore()
    .collection('users')
    .doc(auth().currentUser?.email)
    .onSnapshot(
      user => {
        let numberOfFavorites = 0;
        user.data()?.favorites.forEach(() => {
          numberOfFavorites++;
        });
        setNumberOfFavorites(numberOfFavorites);
      },
      err => {
        console.log(err.message);
      },
    );
};

const addToFavorites = async artist => {
  let getIndex;
  let alreadyFavorite = false;
  const tempFavorites = [];

  const currentFavorites = await firestore()
    .collection('users')
    .doc(auth().currentUser?.email)
    .get();

  const currFave = currentFavorites.data().favorites;
  currFave.forEach((item, index) => {
    if (item.name === artist.name) {
      alreadyFavorite = true;
      getIndex = index;
    }

    tempFavorites.push(item);
  });

  if (alreadyFavorite) {
    tempFavorites.splice(getIndex, 1);
    Alert.alert('Removed from your favorites!');
  } else {
    tempFavorites.push(artist);
    Alert.alert('Added to your favorites!');
  }

  await firestore()
    .collection('users')
    .doc(auth().currentUser?.email)
    .update({
      favorites: [...tempFavorites],
    });
};

const updateLastPlayedSong = async (artist, numberOfSongs) => {
  await firestore()
    .collection('users')
    .doc(auth().currentUser?.email)
    .update({
      lastPlayedSong: {...artist, numberOfSongs, firstTime: false},
    });
};

export {
  googleSignIn,
  addUserToDatabase,
  addToFavorites,
  logoutUser,
  getArtistByCategory,
  getFavoriteArtist,
  getLastPlayedSong,
  getNumberOfFavorites,
  updateLastPlayedSong,
};
