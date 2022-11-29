import {View, Text, StyleSheet, Image} from 'react-native';
import {COLORS} from '../constants/GLOBAL';

const ArtistCard = ({artist}) => {
  return (
    <View style={[styles.imageContainer]}>
      <Image
        source={artist.coverPhoto}
        resizeMode="cover"
        style={styles.image}
      />

      <View style={styles.textContainer}>
        <Text style={styles.text}>{artist.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: COLORS.YELLOW,
    width: 120,
    height: 160,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.YELLOW,
    borderRadius: 10,
    overflow: 'hidden',
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
