import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const DEVICE_DIMENSION = {
  WIDTH: width,
  HEIGHT: height,
};

export const COLORS = {
  YELLOW: '#ffdc5a',
  RED: '#ff1317',
  WHITE: '#fff',
  BLACK: '#000',
};

export const BACKGROUND_IMAGES = {
  BG_BANDERITAS: require('../assets/background-images/bgwithbanderitas.png'),
  BG_GRADIENT: require('../assets/background-images/gradientbg.png'),
};

export const TEXT_IMAGES = {
  PLAYLIST_TEXT: require('../assets/text-images/playlist.png'),
  ALL_SONGS_TEXT: require('../assets/text-images/allsongs.png'),
  FEMALE_ARTIST_TEXT: require('../assets/text-images/femaleartist.png'),
  MALE_ARTIST_TEXT: require('../assets/text-images/maleartist.png'),
  GROUP_ARTIST_TEXT: require('../assets/text-images/groupartist.png'),
  FAVORITES_TEXT: require('../assets/text-images/favorites.png'),
};

export const LOGO = {
  ICON: require('../assets/logo/logo.png'),
  TEXT_ICON_LOGO: require('../assets/logo/musika-header.png'),
  TEXT_LOGO: require('../assets/logo/musika-text.png'),
};
