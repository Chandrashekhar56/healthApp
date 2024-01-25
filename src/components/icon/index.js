import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  ActivityIndicator,
  Button,
  IconButton as RNIconButton,
} from 'react-native-paper';
import VectorIcon from 'react-native-vector-icons/FontAwesome';
import palette from '../../theme/palette';

const Icon = props => {
  return (
    <VectorIcon
      name="arrow-left"
      size={20}
      color={'rgb(74, 69, 78)'}
      {...props}
    />
  );
};

const IconButton = props => {
  const {
    name,
    loading,
    color = palette.background.dark,
    ...restProps
  } = props || {};
  return (
    <RNIconButton
      icon={
        loading
          ? () => <ActivityIndicator size="small" color={color} />
          : () => <Icon name={name || 'arrow-left'} color={color} />
      }
      size={24}
      onPress={() => console.log('Pressed')}
      {...restProps}
    />
  );
};
export {Icon, IconButton};
