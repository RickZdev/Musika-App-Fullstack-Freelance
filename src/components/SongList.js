import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {BACKGROUND_IMAGES, COLORS, DEVICE_DIMENSION} from '../constants/GLOBAL';
import {useEffect, useState} from 'react';
import {addToLikes, checkLikes} from '../backend/firebase-config';

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
  const [isLike, setIsLike] = useState(false);

  const handleAddToLikes = () => {
    addToLikes(song);
  };

  useEffect(() => {
    checkLikes(song?.title, setIsLike);
  }, []);

  return (
    <TouchableOpacity
      key={index}
      onPress={() => navigation.navigate('PlayerScreen', {index, song, songs})}
      style={styles.cardContainer}
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
      <View style={styles.detailsContainer}>
        <Text style={styles.titleText}>{song.title}</Text>
        <Text style={styles.artistText}>{song.artist}</Text>
      </View>

      {/* control */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={() => handleAddToLikes()}>
          <AntDesign
            name={isLike ? 'heart' : 'hearto'}
            size={27}
            color={isLike ? COLORS.RED : COLORS.WHITE}
            style={{marginLeft: 10}}
          />
        </TouchableOpacity>

        <FontAwesome5
          name="play"
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
  cardContainer: {
    flexDirection: 'row',
    paddingRight: 20,
    width: '100%',
    height: 100,
    backgroundColor: COLORS.YELLOW,
    marginBottom: 16,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 7,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 12,
  },
  titleText: {
    fontSize: 16,
    color: COLORS.BLACK,
    fontWeight: '700',
  },
  artistText: {
    fontSize: 12,
    color: 'gray',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
