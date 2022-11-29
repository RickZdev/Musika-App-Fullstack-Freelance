import 'react-native-gesture-handler';
import {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import TrackPlayer, {Capability} from 'react-native-track-player';

import AuthStack from './src/navigations/AuthStack';

const App = () => {
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

    setupPlayer();
  }, []);

  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default App;
