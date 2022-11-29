import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
// import {googleAuth} from '../backend/firebase-config';

const AuthenticationScreen = () => {
  return (
    <View>
      <TouchableOpacity>
        <Text>SIGN IN WITH GOOGLE</Text>
      </TouchableOpacity>
      <Text>AuthenticationScreen</Text>
    </View>
  );
};

export default AuthenticationScreen;
