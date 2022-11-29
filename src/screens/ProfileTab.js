import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {getCurrentUser, logoutUser} from '../backend/firebase-config';
import {useNavigation} from '@react-navigation/native';
import {USER_AUTH} from '../constants/GLOBAL';

const ProfileTab = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{USER_AUTH.ID}</Text>
      <Text>{USER_AUTH.NAME}</Text>
      <Text>{USER_AUTH.EMAIL}</Text>
      <Text>{USER_AUTH.PHOTO}</Text>
      <TouchableOpacity onPress={() => logoutUser(navigation)}>
        <Text>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileTab;
