import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnSplashScreen from '../screens/OnSplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthenticationScreen from '../screens/AuthenticationScreen';
import {PlaylistStack} from './AppStack';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={OnSplashScreen}>
      <Stack.Screen
        name="OnSplashScreen"
        component={OnSplashScreen}
        options={{presentation: 'card'}}
      />
      <Stack.Screen
        name="PlaylistStack"
        component={PlaylistStack}
        options={{presentation: 'card'}}
      />
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="AuthenticationScreen"
        component={AuthenticationScreen}
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
