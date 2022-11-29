import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  getCurrentUser,
  googleSignIn,
  logoutUser,
} from '../backend/firebase-config';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';

// import {googleAuth} from '../backend/firebase-config';

const AuthenticationScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'skyblue',
      }}>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => googleSignIn(setLoading, navigation)}
        disabled={loading}
      />

      <TouchableOpacity onPress={() => logoutUser(navigation)}>
        <Text>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthenticationScreen;
