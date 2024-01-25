/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import LoadingButton from '../CustomButton/loadingButton';
import {View} from 'react-native';

const ModalFooter = props => {
  const {footer} = props || {};
  const {leftActions = [], rightActions = [],containerStyle={}} = footer || {};

  return (
    <View
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection:'row',
        ...containerStyle
      }}>
      <View style={{flexDirection:'row'}}>
        {leftActions.map(item => (
          <LoadingButton
            key={item.label}
            loading={item.loading}
            loadingPosition="start"
            onPress={item.action}
            disabled={item.disabled}
            style={item.style}
            label={item?.label}
          />
        ))}
      </View>
      <View style={{flexDirection:'row'}}>
        {rightActions.map(item => (
          <LoadingButton
            key={item.label}
            loading={item.loading}
            loadingPosition="start"
            onPress={item.action}
            disabled={item.disabled}
            style={item.style}
            label={item?.label}
          />
        ))}
      </View>
    </View>
  );
};

export default ModalFooter;
