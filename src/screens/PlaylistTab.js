import {ImageBackground, ScrollView, StyleSheet, Text} from 'react-native';
import Playlist from '../components/Playlist';
import MainHeader from '../components/MainHeader';
import TitleHeader from '../components/TitleHeader';
import auth from '@react-native-firebase/auth';

import {
  BACKGROUND_IMAGES,
  TEXT_IMAGES,
  DEVICE_DIMENSION,
  DATA,
} from '../constants/GLOBAL';
import {useEffect, useState} from 'react';
import {getArtistByCategory} from '../backend/firebase-config';

const PlaylistTab = () => {
  const [maleArtist, setMaleArtist] = useState();
  const [femaleArtist, setFemaleArtist] = useState();
  const [groupArtist, setGroupArtist] = useState();

  useEffect(() => {
    getArtistByCategory('Male Artist', setMaleArtist);
    getArtistByCategory('Female Artist', setFemaleArtist);
    getArtistByCategory('Group Artist', setGroupArtist);
  }, []);
  return (
    <ImageBackground
      source={BACKGROUND_IMAGES.BG_BANDERITAS}
      resizeMode="cover"
      style={styles.mainContainer}>
      {/* header */}
      <MainHeader />

      <TitleHeader
        imageHeader={TEXT_IMAGES.PLAYLIST_TEXT}
        containerStyle={{paddingLeft: 20}}
        width={100}
        height={50}
      />

      {/* playlist */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Playlist
          data={maleArtist}
          imageHeader={TEXT_IMAGES.MALE_ARTIST_TEXT}
        />
        <Playlist
          data={femaleArtist}
          imageHeader={TEXT_IMAGES.FEMALE_ARTIST_TEXT}
        />
        <Playlist
          data={groupArtist}
          imageHeader={TEXT_IMAGES.GROUP_ARTIST_TEXT}
        />
        {/* <Playlist
          data={DATA.ALL_SONGS}
          imageHeader={TEXT_IMAGES.ALL_SONGS_TEXT}
        /> */}
      </ScrollView>
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

export default PlaylistTab;
