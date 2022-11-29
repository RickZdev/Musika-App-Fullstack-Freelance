import {View, Image} from 'react-native';

const TitleHeader = ({imageHeader, containerStyle, width, height}) => {
  return (
    <View style={containerStyle}>
      <Image
        source={imageHeader}
        resizeMode="cover"
        style={{width: width, height: height}}
      />
    </View>
  );
};

export default TitleHeader;
