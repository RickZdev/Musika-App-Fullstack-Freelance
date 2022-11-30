import {View, FlatList} from 'react-native';
import React from 'react';

import TitleHeader from './TitleHeader';
import ArtistCard from './ArtistCard';

const Playlist = ({data, imageHeader}) => {
  return (
    <View style={{flexDirection: 'column'}}>
      <TitleHeader
        imageHeader={imageHeader}
        containerStyle={{paddingLeft: 20, paddingVertical: 10}}
        width={120}
        height={20}
      />
      <FlatList
        data={data}
        keyExtractor={(_item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        renderItem={({item, index}) => (
          <View style={{marginLeft: index === 0 ? 20 : 0, marginBottom: 10}}>
            <ArtistCard artist={item} />
          </View>
        )}
      />
    </View>
  );
};

export default Playlist;
