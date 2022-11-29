import {Dimensions} from 'react-native';
import auth from '@react-native-firebase/auth';

const {width, height} = Dimensions.get('window');

export const DEVICE_DIMENSION = {
  WIDTH: width,
  HEIGHT: height,
};

export const DATA = {
  FEMALE_ARTIST: [
    {
      id: 0,
      name: 'Moira Dela Torre',
      coverPhoto: require('../assets/artist-cover/moira-dela-torre.jpg'),
    },
    {
      id: 1,
      name: 'Sarah Geronimo',
      coverPhoto: require('../assets/artist-cover/sarah-geronimo.jpg'),
    },
    {
      id: 2,
      name: 'KZ Tandingan',
      coverPhoto: require('../assets/artist-cover/kz-tandingan.jpg'),
    },
    {
      id: 3,
      name: 'Morissette',
      coverPhoto: require('../assets/artist-cover/morissette.jpg'),
    },
  ],
  MALE_ARTIST: [
    {
      id: 0,
      name: 'Zack Tabudlo',
      coverPhoto: require('../assets/artist-cover/zach-tabudlo.jpg'),
      song: [
        {
          id: 0,
          title: 'Binibini',
          artist: 'Zack Tabudlo',
          url: require('../assets/music/Zack/ZackTabudlo-Binibini.mp3'),
          artwork: require('../assets/images/logo.png'),
        },
        {
          id: 1,
          title: 'Habang Buhay',
          artist: 'Zack Tabudlo',
          url: require('../assets/music/Zack/ZackTabudlo-HabangBuhay.mp3'),
          artwork: require('../assets/images/logo.png'),
        },
        {
          id: 2,
          title: 'Nangangamba',
          artist: 'Zack Tabudlo',
          url: require('../assets/music/Zack/ZackTabudlo-Nangangamba.mp3'),
          artwork: require('../assets/images/logo.png'),
        },
        {
          id: 3,
          title: 'Pano',
          artist: 'Zack Tabudlo',
          url: require('../assets/music/Zack/ZackTabudlo-Pano.mp3'),
          artwork: require('../assets/images/logo.png'),
        },
        {
          id: 4,
          title: 'Yakap',
          artist: 'Zack Tabudlo',
          url: require('../assets/music/Zack/ZackTabudlo-Yakap.mp3'),
          artwork: require('../assets/images/logo.png'),
        },
      ],
    },
    {
      id: 1,
      name: 'Arthur Nery',
      coverPhoto: require('../assets/artist-cover/arthur-nery.jpg'),
    },
    {
      id: 2,
      name: 'Adie',
      coverPhoto: require('../assets/artist-cover/adie.png'),
    },
    {
      id: 3,
      name: 'James Reid',
      coverPhoto: require('../assets/artist-cover/james-reid.jpg'),
    },
    {
      id: 4,
      name: 'Juan Karlos Labajo',
      coverPhoto: require('../assets/artist-cover/juan-karlos-labajo.jpg'),
    },
  ],
  GROUP_ARTIST: [
    {
      id: 0,
      name: 'SB19',
      coverPhoto: require('../assets/artist-cover/sb19.jpg'),
    },
    {
      id: 1,
      name: 'BINI',
      coverPhoto: require('../assets/artist-cover/bini.jpg'),
    },
    {
      id: 2,
      name: 'BGYO',
      coverPhoto: require('../assets/artist-cover/bgyo.png'),
    },
    {
      id: 3,
      name: 'Rivermaya',
      coverPhoto: require('../assets/artist-cover/rivermaya.jpg'),
    },
    {
      id: 4,
      name: 'Callalily',
      coverPhoto: require('../assets/artist-cover/callalily.jpg'),
    },
  ],
  ALL_SONGS: [
    {
      id: 0,
      song: require('../assets/music/Dawin.mp3'),
      coverPhoto: require('../assets/images/logo.png'),
    },
  ],
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
};

export const SPACING = {
  PADDING_HORIZONTAL: 20,
};

export const USER_AUTH = {
  ID: auth().currentUser?.uid,
  NAME: auth().currentUser?.displayName,
  EMAIL: auth().currentUser?.email,
  PHOTO: auth().currentUser?.photoURL,
};
