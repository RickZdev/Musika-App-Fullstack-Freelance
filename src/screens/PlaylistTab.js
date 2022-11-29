import {ImageBackground, ScrollView, StyleSheet} from 'react-native';
import Playlist from '../components/Playlist';
import MainHeader from '../components/MainHeader';
import TitleHeader from '../components/TitleHeader';

import {
  DATA,
  BACKGROUND_IMAGES,
  TEXT_IMAGES,
  DEVICE_DIMENSION,
} from '../constants/GLOBAL';

const PlaylistTab = () => {
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
      <ScrollView>
        <Playlist
          data={DATA.MALE_ARTIST}
          imageHeader={TEXT_IMAGES.MALE_ARTIST_TEXT}
        />
        <Playlist
          data={DATA.FEMALE_ARTIST}
          imageHeader={TEXT_IMAGES.FEMALE_ARTIST_TEXT}
        />
        <Playlist
          data={DATA.GROUP_ARTIST}
          imageHeader={TEXT_IMAGES.GROUP_ARTIST_TEXT}
        />
        <Playlist
          data={DATA.ALL_SONGS}
          imageHeader={TEXT_IMAGES.ALL_SONGS_TEXT}
        />
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
