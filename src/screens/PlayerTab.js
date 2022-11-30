import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Slider from '@react-native-community/slider';
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
import {getLastPlayedSong} from '../backend/firebase-config';

const PlayerTab = () => {
  const [song, setSong] = useState({});

  useEffect(() => {
    getLastPlayedSong(setSong);

    const addSong = async () => {
      await TrackPlayer.add(song);
      await TrackPlayer.play();
    };

    addSong();
  }, []);

  const numOfSongs = song.numOfSongs;

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

  const togglePlayback = async playbackState => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      playbackState === 'playing'
        ? await TrackPlayer.pause()
        : await TrackPlayer.play();
    }
  };

  return (
    <ImageBackground
      source={BACKGROUND_IMAGES.BG_BANDERITAS}
      resizeMode="cover"
      style={styles.mainContainer}>
      <MainHeader />
      <View style={styles.contentContainer}>
        {song.firstTime ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>NO CURRENTLY PLAYING</Text>
          </View>
        ) : (
          <View style={styles.content}>
            <CoverPhoto artwork={track?.artwork} />
            <SongDetails
              title={track?.title ?? song?.title}
              artist={track?.artist ?? song?.artist}
            />
            <ProgressSlider
              progress={progress}
              currentDuration={currentDuration}
              currentTime={currentTime}
            />
            <Controls
              track={track}
              numOfSongs={numOfSongs}
              togglePlayback={togglePlayback}
              playbackState={playbackState}
            />
            <Buttons />
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const CoverPhoto = ({artwork}) => {
  return (
    <View style={styles.coverContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: artwork}}
          resizeMode="cover"
          style={styles.image}
        />
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

const ProgressSlider = ({progress, currentTime, currentDuration}) => {
  return (
    <View style={{marginTop: 20}}>
      <Slider
        value={progress.position}
        minimumValue={0}
        maximumValue={progress.duration}
        thumbTintColor={COLORS.WHITE}
        minimumTrackTintColor={COLORS.WHITE}
        maximumTrackTintColor={COLORS.WHITE}
        onSlidingComplete={async value => {
          await TrackPlayer.seekTo(value);
        }}
      />

      {/* time */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 25,
        }}>
        <Text style={{color: COLORS.WHITE, fontSize: 12, fontWeight: '600'}}>
          {currentTime}
        </Text>
        <Text style={{color: COLORS.WHITE, fontSize: 12, fontWeight: '600'}}>
          {currentDuration}
        </Text>
      </View>
    </View>
  );
};

const Controls = ({track, numOfSongs, playbackState, togglePlayback}) => {
  return (
    <View style={styles.controlsContainer}>
      {/* middle buttons */}

      {/* previous */}
      <TouchableOpacity
        disabled={track.songId === 0 && true}
        onPress={async () => await TrackPlayer.skipToPrevious()}>
        <MaterialIcons
          name="skip-previous"
          size={50}
          color={track.songId === 0 ? 'gray' : COLORS.WHITE}
        />
      </TouchableOpacity>

      {/* play or pause */}
      <TouchableOpacity
        onPress={() => togglePlayback(playbackState)}
        style={styles.playButton}>
        <FontAwesome5
          name={playbackState === State.Playing ? 'pause' : 'play'}
          size={25}
          color={COLORS.YELLOW}
        />
      </TouchableOpacity>

      {/* next */}
      <TouchableOpacity
        disabled={track.songId === numOfSongs - 1 && true}
        onPress={async () => await TrackPlayer.skipToNext()}>
        <MaterialIcons
          name="skip-next"
          size={50}
          color={track.songId === numOfSongs - 1 ? 'gray' : COLORS.WHITE}
        />
      </TouchableOpacity>
    </View>
  );
};

const Buttons = () => {
  const iconSize = 30;
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity>
        <AntDesign name="hearto" color={COLORS.WHITE} size={iconSize} />
      </TouchableOpacity>

      <TouchableOpacity>
        <Feather name="repeat" color={COLORS.WHITE} size={iconSize} />
      </TouchableOpacity>

      <TouchableOpacity>
        <Feather name="share" color={COLORS.WHITE} size={iconSize} />
      </TouchableOpacity>

      <TouchableOpacity>
        <Entypo
          name="dots-three-horizontal"
          color={COLORS.WHITE}
          size={iconSize}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PlayerTab;

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
    backgroundColor: 'gray',
    width: 220,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
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
  },
});
