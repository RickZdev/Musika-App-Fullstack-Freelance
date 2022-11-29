import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {PlaylistStack} from '../navigations/AppStack';
import AuthenticationScreen from './AuthenticationScreen';

const OnSplashScreen = ({navigation}) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <AuthenticationScreen />;
};

export default OnSplashScreen;
