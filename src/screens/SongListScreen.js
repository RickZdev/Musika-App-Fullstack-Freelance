import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import BackButton from '../components/BackButton';
import {DEVICE_DIMENSION} from '../constants/GLOBAL';
import SongList from '../components/SongList';

const SongListScreen = ({navigation, route}) => {
  const artist = route.params;
  const songs = artist.songs;
  return (
    <View style={{flex: 1}}>
      <ImageHeaderScrollView
        maxHeight={DEVICE_DIMENSION.HEIGHT / 2 - 80}
        minHeight={100}
        showsVerticalScrollIndicator={false}
        headerImage={{uri: artist.coverPhoto}}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0}
        renderForeground={() => (
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View style={styles.backButtonContainer}>
              <BackButton onPress={() => navigation.goBack()} />
            </View>
          </View>
        )}>
        <TriggeringView style={{flex: 1}}>
          <SongList songs={songs} />
        </TriggeringView>
      </ImageHeaderScrollView>
    </View>
  );
};

export default SongListScreen;

const styles = StyleSheet.create({
  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 32,
    zIndex: 50,
  },
});
