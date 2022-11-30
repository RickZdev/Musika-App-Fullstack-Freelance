import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

import {googleSignIn} from '../backend/firebase-config';
import {BACKGROUND_IMAGES, DEVICE_DIMENSION, LOGO} from '../constants/GLOBAL';

const AuthenticationScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  return (
    <ImageBackground
      source={BACKGROUND_IMAGES.BG_GRADIENT}
      resizeMode="cover"
      style={styles.mainContainer}>
      <View
        style={{
          width: DEVICE_DIMENSION.WIDTH,
          height: DEVICE_DIMENSION.HEIGHT / 3,
        }}>
        <Image
          source={LOGO.ICON}
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>

      <Image
        source={LOGO.TEXT_LOGO}
        resizeMode="cover"
        style={{width: DEVICE_DIMENSION.WIDTH / 2, height: 100}}
      />

      <GoogleSigninButton
        style={{width: 250, height: 60}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => googleSignIn(setLoading, navigation)}
        disabled={loading}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    widtH: DEVICE_DIMENSION.WIDTH,
    height: DEVICE_DIMENSION.HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthenticationScreen;
