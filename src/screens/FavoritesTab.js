import {View, Text, StyleSheet, ImageBackground, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BACKGROUND_IMAGES,
  DEVICE_DIMENSION,
  TEXT_IMAGES,
} from '../constants/GLOBAL';
import MainHeader from '../components/MainHeader';
import TitleHeader from '../components/TitleHeader';
import {getFavoriteArtist} from '../backend/firebase-config';
import ArtistCard from '../components/ArtistCard';

const FavoritesTab = () => {
  const [favoriteArtist, setFavoriteArtist] = useState();

  useEffect(() => {
    getFavoriteArtist(setFavoriteArtist);
  }, []);
  return (
    <ImageBackground
      source={BACKGROUND_IMAGES.BG_BANDERITAS}
      resizeMode="cover"
      style={styles.mainContainer}>
      <MainHeader />

      <TitleHeader
        imageHeader={TEXT_IMAGES.FAVORITES_TEXT}
        containerStyle={{paddingLeft: 20}}
        width={100}
        height={50}
      />

      <View style={{paddingLeft: 5}}>
        <FlatList
          data={favoriteArtist}
          numColumns={3}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item}) => <ArtistCard artist={item} />}
        />
      </View>
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
