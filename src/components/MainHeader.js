import {View, Text, Image} from 'react-native';
import React from 'react';
import {DEVICE_DIMENSION} from '../constants/GLOBAL';

const MainHeader = () => {
  return (
    <View>
      <Image
        source={require('../assets/images/musika-header.png')}
        resizeMode="contain"
        style={{width: DEVICE_DIMENSION.WIDTH, height: 100}}
      />
    </View>
  );
};

export default MainHeader;
