import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';

import PlaylistTab from '../screens/PlaylistTab';
import {FavoritesStack, PlayerStack, ProfileStack} from './AppStack';
import {COLORS} from '../constants/GLOBAL';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const iconSize = 20;

  return (
    <Tab.Navigator
      initialRouteName={PlaylistTab}
      screenOptions={{
        unmountOnBlur: false,
        tabBarStyle: {
          backgroundColor: COLORS.RED,
          height: 55,
        },
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.YELLOW,
        tabBarInactiveTintColor: COLORS.WHITE,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: 10,
          top: -5,
        },
      }}>
      <Tab.Screen
        name="PlaylistTab"
        component={PlaylistTab}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="playlist-music"
              color={color}
              size={iconSize}
            />
          ),
          tabBarLabel: 'Playlist',
        }}
      />

      <Tab.Screen
        name="PlayerStack"
        component={PlayerStack}
        options={{
          tabBarIcon: ({color}) => (
            <Foundation name="play" color={color} size={iconSize} />
          ),
          tabBarLabel: 'Player',
        }}
      />

      <Tab.Screen
        name="FavoritesStack"
        component={FavoritesStack}
        options={{
          tabBarIcon: ({color}) => (
            <Foundation name="heart" color={color} size={iconSize} />
          ),
          tabBarLabel: 'Favorites',
        }}
      />

      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome name="user" color={color} size={iconSize} />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
