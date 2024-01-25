import * as React from 'react';
import {Avatar as PaperAvatar} from 'react-native-paper';

const Avatar = ({source = '', style = {}, size = 24, ...restProps} = {}) => {
  return <PaperAvatar.Image size={size} source={source} style={{...style}} />;
};

export default Avatar;
