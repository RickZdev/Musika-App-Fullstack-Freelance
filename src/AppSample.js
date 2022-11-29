import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import TrackPlayer, {
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  Capability,
} from 'react-native-track-player';

const App = () => {
  const song = {
    id: 0,
    title: 'Happy w u',
    artist: 'Arthur Nery',
    url: require('./src/assets/Dawin.mp3'),
  };

  const [track, setTrack] = useState({});

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
      await TrackPlayer.play();
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
    };
    // setupPlayer();
    addSong();
    // skipTo(index);
    console.log(track, 'SONGSSS!!');
  }, []);

  return (
    <View>
      <Text>sadasdas</Text>
    </View>
  );
};

export default App;
