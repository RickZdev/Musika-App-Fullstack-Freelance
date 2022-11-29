import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';

GoogleSignin.configure({
  webClientId:
    '780619674479-06cdvatq36f4m7nt45a7hovmbs1e47bq.apps.googleusercontent.com',
});

export const googleSignIn = async (setLoading, navigation) => {
  setLoading(true);
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    const user = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(user.idToken);
    navigation.replace('PlaylistStack');

    addUserAccount();

    return auth().signInWithCredential(googleCredential);
  } catch (err) {
    console.log(err.message);
  }
  setLoading(false);
};

// const addUserToDatabase = async (user) => {
//   const { email, displayName, photoURL, uid } = user;
//   console.log('ADD USER TO DATABASE!', email, displayName, photoURL, uid);
//   const userRef = query(doc(db, 'users', uid))
//   try {
//     await setDoc(userRef, {
//       fullName: displayName,
//       email,
//       photoURL,
//       inQueue: false,
//       createdAt: serverTimestamp()
//     })
//   } catch (error) {
//     console.log(error.message, "error creating user!")
//   }
// }

export const logoutUser = async navigation => {
  try {
    await auth().signOut();
    navigation.replace('AuthenticationScreen');
  } catch (error) {
    console.log(error.message);
  }
};

// import {initializeApp} from 'firebase/app';
// import {
//   addDoc,
//   initializeFirestore,
//   collection,
//   doc,
//   getFirestore,
//   onSnapshot,
//   query,
//   serverTimestamp,
//   setDoc,
//   updateDoc,
//   where,
//   arrayRemove,
//   arrayUnion,
//   FirestoreSettings,
// } from 'firebase/firestore';
// import {
//   getAuth,
//   GoogleAuthProvider,
//   updateProfile,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   sendPasswordResetEmail,
//   signInWithPopup,
//   signInWithRedirect,
// } from 'firebase/auth';
// import {Alert, ToastAndroid} from 'react-native';

// const firebaseConfig = {
//   apiKey: 'AIzaSyBL0jjXhd8qwYSz_6Ynh_GwG3_ElIwBm8I',
//   authDomain: 'musika-62c22.firebaseapp.com',
//   projectId: 'musika-62c22',
//   storageBucket: 'musika-62c22.appspot.com',
//   messagingSenderId: '662907959744',
//   appId: '1:662907959744:web:b86cc547bbae81ae6f3025',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = initializeFirestore(app, {
//   experimentalForceLongPolling: true,
// });
// const provider = new GoogleAuthProvider();

// const googleAuth = () => {
//   signInWithRedirect(auth, provider);
//   // signInWithPopup(auth, provider)
//   //   .then(result => {
//   //     // This gives you a Google Access Token. You can use it to access the Google API.
//   //     const credential = GoogleAuthProvider.credentialFromResult(result);
//   //     const token = credential.accessToken;
//   //     // The signed-in user info.
//   //     const user = result.user;

//   //     console.log(token);
//   //     console.log(user);
//   //     // ...
//   //   })
//   //   .catch(error => {
//   //     // Handle Errors here.
//   //     const errorCode = error.code;
//   //     const errorMessage = error.message;
//   //     // The email of the user's account used.
//   //     const email = error.customData.email;
//   //     // The AuthCredential type that was used.
//   //     const credential = GoogleAuthProvider.credentialFromError(error);
//   //     // ...
//   //   });
// };

// export {googleAuth};

// // authentication
// const addAuthenticatedUser = async values => {
//   try {
//     const {firstName, lastName, email, password} = values;
//     const {user} = await createUserWithEmailAndPassword(auth, email, password);
//     await updateProfile(user, {
//       displayName: firstName + ' ' + lastName,
//       photoURL:
//         'https://firebasestorage.googleapis.com/v0/b/shopping-app-be469.appspot.com/o/images%2Favatar%2Favatar.jpg?alt=media&token=32022140-2a82-4c45-8a4b-9fe6f500eba4',
//     });

//     addUserToDatabase(user);
//     ToastAndroid.showWithGravityAndOffset(
//       `Account Created Successfully!`,
//       ToastAndroid.SHORT,
//       ToastAndroid.BOTTOM,
//       0,
//       300,
//     );
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const addUserToDatabase = async user => {
//   const {email, displayName, photoURL, uid} = user;
//   console.log('ADD USER TO DATABASE!', email, displayName, photoURL, uid);
//   const userRef = query(doc(db, 'users', uid));
//   try {
//     await setDoc(userRef, {
//       fullName: displayName,
//       email,
//       photoURL,
//       inQueue: false,
//       createdAt: serverTimestamp(),
//     });
//   } catch (error) {
//     console.log(error.message, 'error creating user!');
//   }
// };

// const loginUser = async (email, password) => {
//   try {
//     const {user} = await signInWithEmailAndPassword(auth, email, password);
//     ToastAndroid.showWithGravityAndOffset(
//       `${user.displayName} Logged in successfully!`,
//       ToastAndroid.SHORT,
//       ToastAndroid.BOTTOM,
//       0,
//       300,
//     );

//     return !null;
//   } catch (error) {
//     if (error.message == 'Firebase: Error (auth/user-not-found).') {
//       Alert.alert('', 'Email Address Not Found. Please try again!', [
//         {text: 'Try again', onPress: () => {}},
//       ]);
//     } else {
//       Alert.alert('', 'Wrong Password. Please try again!', [
//         {text: 'Try again', onPress: () => {}},
//       ]);
//     }
//   }
// };

// const getQueue = setQueue => {
//   const q = query(collection(db, 'queue'));
//   const unsubscribe = onSnapshot(q, snapshot => {
//     let tempDb = [];
//     snapshot.docs.forEach(doc => {
//       console.log(doc);
//       tempDb.push({...doc.data(), id: doc.id});
//     });
//     console.log(tempDb);
//     // setQueue(tempDb);
//   });

//   // return unsubscribe;
// };

// export {auth, loginUser, addAuthenticatedUser, addUserToDatabase, getQueue};
