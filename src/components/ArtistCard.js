import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {addToFavorites} from '../backend/firebase-config';

import {COLORS} from '../constants/GLOBAL';

const ArtistCard = ({artist}) => {
  const navigation = useNavigation();
  const [favorite, setFavorite] = useState(false);

  const addToFavoriteArtist = () => {
    setFavorite(!favorite);
    addToFavorites(artist);
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('SongListScreen', artist)}
      style={[styles.imageContainer]}
      activeOpacity={0.6}>
      <Image
        source={{uri: artist?.coverPhoto}}
        resizeMode="cover"
        style={styles.image}
      />

      <View style={styles.textContainer}>
        <Text style={styles.text}>{artist.name}</Text>
      </View>

      <TouchableOpacity
        onPress={() => addToFavoriteArtist()}
        style={{position: 'absolute', right: 5, top: 5, zIndex: 9999}}>
        <AntDesign name={'star'} size={22} color={COLORS.YELLOW} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: COLORS.YELLOW,
    width: 120,
    height: 160,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.YELLOW,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    zIndex: 100,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  text: {
    paddingBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 12,
    color: COLORS.WHITE,
  },
});

export default ArtistCard;
