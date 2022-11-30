import {useEffect, useState} from 'react';
import {ImageBackground, ScrollView, StyleSheet} from 'react-native';

import Playlist from '../components/Playlist';
import MainHeader from '../components/MainHeader';
import TitleHeader from '../components/TitleHeader';
import {getArtistByCategory} from '../backend/firebase-config';
import {
  BACKGROUND_IMAGES,
  TEXT_IMAGES,
  DEVICE_DIMENSION,
} from '../constants/GLOBAL';

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
