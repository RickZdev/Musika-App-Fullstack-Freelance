import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';

import AuthenticationScreen from './AuthenticationScreen';
import {PlaylistStack} from '../navigations/AppStack';
import auth from '@react-native-firebase/auth';

const OnSplashScreen = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    SplashScreen.hide();
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
    });

    return subscriber;
  }, []);

  return user ? <PlaylistStack /> : <AuthenticationScreen />;
};

export default OnSplashScreen;
