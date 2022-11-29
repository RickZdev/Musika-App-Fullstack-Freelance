import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';
import {
  BACKGROUND_IMAGES,
  DEVICE_DIMENSION,
  TEXT_IMAGES,
} from '../constants/GLOBAL';
import MainHeader from '../components/MainHeader';
import TitleHeader from '../components/TitleHeader';

const FavoritesTab = () => {
  return (
    <ImageBackground
      source={BACKGROUND_IMAGES.BG_BANDERITAS}
      resizeMode="cover"
      style={styles.mainContainer}>
      <MainHeader />

      <TitleHeader
        imageHeader={TEXT_IMAGES.PLAYLIST_TEXT}
        containerStyle={{paddingLeft: 20}}
        width={100}
        height={50}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    widtH: DEVICE_DIMENSION.WIDTH,
    height: DEVICE_DIMENSION.HEIGHT,
  },
});

export default FavoritesTab;
