/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import Typography from '../Typography';

const ListEmptyComponent = ({emptyMessage} = {}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Typography variant="titleLarge">{emptyMessage}</Typography>
    </View>
  );
};

export {ListEmptyComponent};
