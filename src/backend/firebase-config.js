import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';

// authentication
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

    const isUserAlreadyExist = await checkUserIfExists(user.user?.email);
    if (!isUserAlreadyExist) {
      addUserToDatabase(
        user.user?.email,
        user.user?.id,
        user.user?.name,
        user.user?.photo,
      );
    }

    auth().signInWithCredential(googleCredential);
    navigation.replace('PlaylistStack');
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
        email,
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

const checkUserIfExists = async email => {
  const user = await firestore()
    .collection('users')
    .where('email', '==', email)
    .get();

  let numberOfUser = 0;

  user.docs.forEach(() => {
    numberOfUser++;
  });

  return numberOfUser > 0;
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

// read
const getArtistByCategory = async (category, setArtist) => {
  try {
    const user = await firestore()
      .collection('artists')
      .where('category', '==', category)
      .get();

    const tempDb = [];
    user.docs.forEach(artist => {
      tempDb.push(artist.data());
    });

    setArtist(tempDb);
  } catch (err) {
    console.log(err.message);
  }
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

const getNumberOfLikes = async setNumberOfLikes => {
  firestore()
    .collection('users')
    .doc(auth().currentUser?.email)
    .onSnapshot(
      user => {
        let numberOfLikes = 0;
        user.data()?.songsLike.forEach(() => {
          numberOfLikes++;
        });
        setNumberOfLikes(numberOfLikes);
      },
      err => {
        console.log(err.message);
      },
    );
};

const checkFavorites = (artistName, setIsFavorite) => {
  firestore()
    .collection('users')
    .doc(auth().currentUser?.email)
    .onSnapshot(
      user => {
        const tempArtist = [];
        user.data()?.favorites.forEach(async artistInfo => {
          tempArtist.push(artistInfo.name);
        });
        if (tempArtist.includes(artistName)) {
          setIsFavorite(true);
        }
      },
      err => {
        console.log(err.message);
      },
    );
};

const checkLikes = (songTitle, setIsLike) => {
  firestore()
    .collection('users')
    .doc(auth().currentUser?.email)
    .onSnapshot(
      user => {
        const tempSong = [];
        user.data()?.songsLike?.forEach(async song => {
          tempSong.push(song.title);
        });
        if (tempSong?.includes(songTitle)) {
          setIsLike(true);
        } else {
          setIsLike(false);
        }
      },
      err => {
        console.log(err.message);
      },
    );
};

// write
const addToFavorites = async artist => {
  let getIndex;
  let alreadyFavorite = false;
  const tempFavorites = [];

  // get existing favorites
  const currentFavorites = await firestore()
    .collection('users')
    .doc(auth().currentUser?.email)
    .get();

  const currFave = currentFavorites.data()?.favorites;
  currFave.forEach((item, index) => {
    if (item.name === artist.name) {
      alreadyFavorite = true;
      getIndex = index;
    }

    // put all favorites to temp container
    tempFavorites.push(item);
  });

  // if existing remove, if not then add to db
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
    })
    .catch(err => console.log(err.message));
};

const addToLikes = async song => {
  let getIndex;
  let alreadyLike = false;
  const tempLikes = [];

  // get existing likes
  const currentLikes = await firestore()
    .collection('users')
    .doc(auth().currentUser?.email)
    .get();

  const currLikes = currentLikes.data()?.songsLike;
  currLikes.forEach((item, index) => {
    if (item.title === song.title) {
      alreadyLike = true;
      getIndex = index;
    }

    // put all like song to temp container
    tempLikes.push(item);
  });

  // if existing remove, if not then add to db
  if (alreadyLike) {
    tempLikes.splice(getIndex, 1);
    Alert.alert('Removed from your like songs!');
  } else {
    tempLikes.push(song);
    Alert.alert('Added to your like songs!');
  }

  firestore()
    .collection('users')
    .doc(auth().currentUser?.email)
    .update({
      songsLike: [...tempLikes],
    })
    .catch(err => console.log(err.message));
};

// update
const updateLastPlayedSong = (artist, numberOfSongs) => {
  firestore()
    .collection('users')
    .doc(auth().currentUser?.email)
    .update({
      lastPlayedSong: {...artist, numberOfSongs, firstTime: false},
    })
    .catch(err => console.log(err.message));
};

export {
  googleSignIn,
  addUserToDatabase,
  logoutUser,
  getArtistByCategory,
  getLastPlayedSong,
  getFavoriteArtist,
  getNumberOfFavorites,
  getNumberOfLikes,
  checkFavorites,
  checkLikes,
  addToFavorites,
  addToLikes,
  updateLastPlayedSong,
};
