import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import OnSplashScreen from '../screens/OnSplashScreen';
import AuthenticationScreen from '../screens/AuthenticationScreen';
import {PlaylistStack} from './AppStack';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={OnSplashScreen}>
      <Stack.Screen name="OnSplashScreen" component={OnSplashScreen} />
      <Stack.Screen
        name="PlaylistStack"
        component={PlaylistStack}
        options={{...TransitionPresets.RevealFromBottomAndroid}}
      />
      <Stack.Screen
        name="AuthenticationScreen"
        component={AuthenticationScreen}
        options={{...TransitionPresets.SlideFromRightIOS}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
