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

const SongList = ({artist}) => {
  return (
    <ImageBackground
      source={BACKGROUND_IMAGES.BG_GRADIENT}
      resizeMode="cover"
      style={styles.mainContainer}>
      <FlatList
        data={artist}
        keyExtractor={item => item.id}
        style={{paddingHorizontal: 15, paddingVertical: 15}}
        renderItem={({item, index}) => <Card song={item} index={index} />}
      />
    </ImageBackground>
  );
};

const Card = ({song, index}) => {
  const navigation = useNavigation();
  console.log(song);
  console.log(index);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PlayerScreen', {index, song})}
      style={{
        flexDirection: 'row',
        paddingRight: 20,
        width: '100%',
        height: 100,
        backgroundColor: COLORS.YELLOW,
        marginBottom: 16,
        borderRadius: 15,
        overflow: 'hidden',
      }}>
      {/* image */}
      <View style={{width: 120, height: '100%'}}>
        <Image
          source={song.artwork}
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}
        />
      </View>

      {/* details */}
      <View
        style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
        <Text>{song.title}</Text>
        <Text style={{fontSize: 10, color: COLORS.BLACK}}>{song.artist}</Text>
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
