/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import Typography from '../Typography';
import {IconButton} from '../icon';

export const ModalHeader = React.memo(props => {
  const {header, modalCloseAction} = props || {};
  const {title = '', logo = null, closeIcon} = header || {};

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}>
        <View>
          {logo && (
            <img
              style={{width: 40, height: 40}}
              src={logo}
              alt=""
              loading="lazy"
            />
          )}
        </View>
        <View>
          <Typography>{title}</Typography>
        </View>
      </View>
      <View>{closeIcon || <IconButton onPress={modalCloseAction} />}</View>
    </View>
  );
});
