import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  addArtist,
  addUserToDatabase,
  getNumberOfFavorites,
  getUser,
  logoutUser,
} from '../backend/firebase-config';
import auth from '@react-native-firebase/auth';
import {BACKGROUND_IMAGES, COLORS, DEVICE_DIMENSION} from '../constants/GLOBAL';
import MainHeader from '../components/MainHeader';

const ProfileTab = ({navigation}) => {
  const avatar = auth().currentUser?.photoURL;
  const displayName = auth().currentUser?.displayName;
  const email = auth().currentUser?.email;
  const [numberOfFavorites, setNumberOfFavorites] = useState(0);

  useEffect(() => {
    getNumberOfFavorites(setNumberOfFavorites);
  }, []);

  return (
    <ImageBackground
      source={BACKGROUND_IMAGES.BG_BANDERITAS}
      resizeMode="cover"
      style={styles.mainContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.mainContent}>
          {/* avatar */}
          <View style={styles.imageContainer}>
            <Image
              source={{uri: avatar}}
              resizeMode="contain"
              style={{width: '100%', height: '100%'}}
            />
          </View>

          <View style={{marginTop: 55, flex: 1}}>
            {/* name */}
            <Text style={styles.displayNameText}>
              {displayName?.toUpperCase()}
            </Text>

            <Text style={styles.emailText}>{email}</Text>

            {/* main text */}
            <View style={styles.mainTextContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.headerText}>FAVORITES</Text>
                <Text style={styles.subText}>{numberOfFavorites}</Text>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.headerText}>SONGS YOU LIKE</Text>
                <Text style={styles.subText}>12</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.headerText}>FOLLOWERS</Text>
                <Text style={styles.subText}>12</Text>
              </View>
            </View>

            {/* logout button */}
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => logoutUser(navigation)}>
                <Image
                  source={BACKGROUND_IMAGES.BG_GRADIENT}
                  resizeMode="cover"
                  style={{width: '100%', height: '100%', position: 'absolute'}}
                />

                <Text style={styles.headerText}>LOG OUT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    widtH: DEVICE_DIMENSION.WIDTH,
    height: DEVICE_DIMENSION.HEIGHT,
  },
  mainContent: {
    backgroundColor: COLORS.YELLOW,
    width: DEVICE_DIMENSION.WIDTH / 2 + 150,
    height: DEVICE_DIMENSION.HEIGHT / 3,
    borderRadius: 20,
    elevation: 10,
  },
  imageContainer: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE,
    elevation: 7,
    alignSelf: 'center',
    top: -100 / 2,
  },
  displayNameText: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 17,
  },
  emailText: {
    color: 'light-gray',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 10,
  },
  mainTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  subText: {
    color: COLORS.BLACK,
    fontWeight: '700',
    fontSize: 15,
  },
  logoutButton: {
    marginHorizontal: 20,
    marginVertical: 20,
    height: 50,
    width: '50%',
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: COLORS.RED,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

{
  /* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{auth().currentUser?.uid}</Text>
      <Text>{auth().currentUser?.displayName}</Text>
      <Text>{auth().currentUser?.email}</Text>
      <Text>{auth().currentUser?.photoURL}</Text>

      <TouchableOpacity onPress={() => getUser()}>
        <Text>GET</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => addArtist()}>
        <Text>ADD</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => logoutUser(navigation)}>
        <Text>LOG OUT</Text>
      </TouchableOpacity>
    </View> */
}
export default ProfileTab;
