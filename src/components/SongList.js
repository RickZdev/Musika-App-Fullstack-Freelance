import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {BACKGROUND_IMAGES, COLORS, DEVICE_DIMENSION} from '../constants/GLOBAL';

const SongList = ({songs}) => {
  return (
    <ImageBackground
      source={BACKGROUND_IMAGES.BG_GRADIENT}
      resizeMode="cover"
      style={styles.mainContainer}>
      <View style={{paddingHorizontal: 15, paddingVertical: 15}}>
        {songs.map((item, index) => (
          <Card songs={songs} song={item} index={index} />
        ))}
      </View>
    </ImageBackground>
  );
};

const Card = ({songs, song, index}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PlayerScreen', {index, song, songs})}
      style={{
        flexDirection: 'row',
        paddingRight: 20,
        width: '100%',
        height: 100,
        backgroundColor: COLORS.YELLOW,
        marginBottom: 16,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 7,
      }}
      key={song.id}
      activeOpacity={0.6}>
      {/* image */}
      <View style={{width: 120, height: '100%'}}>
        <Image
          source={{uri: song?.artwork}}
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}
        />
      </View>

      {/* details */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginLeft: 12,
        }}>
        <Text style={{fontSize: 16, color: COLORS.BLACK, fontWeight: '700'}}>
          {song.title}
        </Text>
        <Text style={{fontSize: 12, color: 'gray'}}>{song.artist}</Text>
      </View>

      {/* control */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <Feather
          name="heart"
          size={27}
          color={COLORS.WHITE}
          style={{marginLeft: 10}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SongList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    widtH: DEVICE_DIMENSION.WIDTH,
    height: DEVICE_DIMENSION.HEIGHT,
  },
});
