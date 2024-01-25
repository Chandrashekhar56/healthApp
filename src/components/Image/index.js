import React from 'react';
import RNFastImage from 'react-native-fast-image';

const FastImage = ({source, style, ...restProps} = {}) => {
  return <RNFastImage source={source} style={{...style}} {...restProps} />;
};

export default FastImage;
