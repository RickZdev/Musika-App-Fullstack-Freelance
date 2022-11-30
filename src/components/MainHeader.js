import {View, Text, Image} from 'react-native';
import React from 'react';
import {DEVICE_DIMENSION, LOGO} from '../constants/GLOBAL';

const MainHeader = () => {
  return (
    <View>
      <Image
        source={LOGO.TEXT_ICON_LOGO}
        resizeMode="contain"
        style={{width: DEVICE_DIMENSION.WIDTH, height: 100}}
      />
    </View>
  );
};

export default MainHeader;
