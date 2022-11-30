import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import BottomTab from './BottomTab';
import PlayerTab from '../screens/PlayerTab';
import FavoritesTab from '../screens/FavoritesTab';
import ProfileTab from '../screens/ProfileTab';
import SongListScreen from '../screens/SongListScreen';
import PlayerScreen from '../screens/PlayerScreen';

const Stack = createStackNavigator();

const PlaylistStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={BottomTab}>
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen
        name="SongListScreen"
        component={SongListScreen}
        options={{...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="PlayerScreen"
        component={PlayerScreen}
        options={{...TransitionPresets.ModalPresentationIOS}}
      />
    </Stack.Navigator>
  );
};

const PlayerStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={PlayerTab}>
      <Stack.Screen name="PlayerTab" component={PlayerTab} />
    </Stack.Navigator>
  );
};

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={FavoritesTab}>
      <Stack.Screen name="FavoritesTab" component={FavoritesTab} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={ProfileTab}>
      <Stack.Screen name="ProfileTab" component={ProfileTab} />
    </Stack.Navigator>
  );
};

export {PlaylistStack, PlayerStack, FavoritesStack, ProfileStack};
