import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import TrackPlayer, {
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

import {BACKGROUND_IMAGES, COLORS, DEVICE_DIMENSION} from '../constants/GLOBAL';
import MainHeader from '../components/MainHeader';

const PlayerTab = () => {
  const song = {
    id: 0,
    title: "Babalik Sa'yo",
    artist: 'Moira Dela Torre',
    url: require('../assets/music/Dawin.mp3'),
    artwork: require('../assets/images/logo.png'),
  };

  // const index = route.params.index;
  // const songs = require('../assets/music/Dawin.mp3');

  const [track, setTrack] = useState({});
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const currentTime = new Date(progress.position * 1000)
    .toISOString()
    .substring(14, 19);
  const currentDuration = new Date(
    (progress.duration - progress.position) * 1000,
  )
    .toISOString()
    .substring(14, 19);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const currentTrack = await TrackPlayer.getTrack(event.nextTrack);
      setTrack(currentTrack);
    }
  });

  const addSong = async () => {
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add(song);
    } catch (err) {
      console.log(err.message);
    }
  };

  // const togglePlayback = async playbackState => {
  //   const currentTrack = await TrackPlayer.getCurrentTrack();
  //   if (currentTrack !== null) {
  //     playbackState === 'playing'
  //       ? await TrackPlayer.pause()
  //       : await TrackPlayer.play();
  //   }
  // };

  // const skipTo = async trackId => {
  //   const getCurrentTrack = await TrackPlayer.getCurrentTrack();
  //   if (getCurrentTrack !== trackId) {
  //     await TrackPlayer.skip(trackId);
  //   }
  //   await TrackPlayer.play();
  // };

  useEffect(() => {
    addSong();
    // skipTo(index);
    console.log(track, 'SONGSSS!!');
  }, []);

  useEffect(() => {
    // console.log(playbackState);
    console.log(track);
  }, [playbackState]);

  return (
    <ImageBackground
      source={BACKGROUND_IMAGES.BG_BANDERITAS}
      resizeMode="cover"
      style={styles.mainContainer}>
      <MainHeader />
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <CoverPhoto cover={song.artwork} />
          <SongDetails title={song.title} artist={song.artist} />
          <Controls />
          <Buttons />
        </View>
      </View>
    </ImageBackground>
  );
};

const CoverPhoto = ({cover}) => {
  return (
    <View style={styles.coverContainer}>
      <View style={styles.imageContainer}>
        <Image source={cover} resizeMode="cover" style={styles.image} />
      </View>
    </View>
  );
};

const SongDetails = ({title, artist}) => {
  return (
    <View style={{marginTop: 10}}>
      <Text style={styles.songTitle}>{title}</Text>
      <Text style={styles.songArtist}>{artist}</Text>
    </View>
  );
};

const Controls = () => {
  return (
    <View style={styles.controlsContainer}>
      {/* middle buttons */}

      {/* previous */}
      <TouchableOpacity
        onPress={async () => await TrackPlayer.skipToPrevious()}>
        <MaterialIcons name="skip-previous" size={50} color={COLORS.WHITE} />
      </TouchableOpacity>

      {/* play or pause */}
      <TouchableOpacity style={styles.playButton}>
        <FontAwesome5 name={'play'} size={25} color={COLORS.YELLOW} />
      </TouchableOpacity>

      {/* next */}
      <TouchableOpacity onPress={async () => await TrackPlayer.skipToNext()}>
        <MaterialIcons name="skip-next" size={50} color={COLORS.WHITE} />
      </TouchableOpacity>
    </View>
  );
};

const Buttons = () => {
  const iconSize = 45;
  return (
    <View style={styles.buttonContainer}>
      <AntDesign name="hearto" color={COLORS.WHITE} size={iconSize} />
      <Feather name="repeat" color={COLORS.WHITE} size={iconSize} />
      <Feather name="share" color={COLORS.WHITE} size={iconSize} />
      <Entypo
        name="dots-three-horizontal"
        color={COLORS.WHITE}
        size={iconSize}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    widtH: DEVICE_DIMENSION.WIDTH,
    height: DEVICE_DIMENSION.HEIGHT,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.YELLOW,
    borderRadius: 10,
  },
  coverContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  imageContainer: {
    width: 230,
    height: 230,
    backgroundColor: COLORS.RED,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  songTitle: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontSize: 32,
    fontWeight: '700',
  },
  songArtist: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontSize: 20,
    fontWeight: '500',
  },
  controlsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  playButton: {
    width: 69,
    height: 69,
    borderRadius: 69 / 2,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
  },
});

export default PlayerTab;
