/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import CustomButton from '../CustomButton';
import {View} from 'react-native';
import Typography from '../Typography';
import CloseButton from '../CustomButton/closeIButton';
import {IconButton} from '../icon';

const ModalHeader = props => {
  const {header, modalCloseAction} = props || {};
  const {title, logo, showCloseIcon} = header || {};
  const isMobile = true;
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
          margin: isMobile ? ' 0px 18px' : '0px 24px',
        }}>
        <View>
          {showCloseIcon && <IconButton onPress={modalCloseAction} />}
          {logo && (
            <img
              style={{width: 40, height: 40}}
              src={logo}
              alt=""
              loading="lazy"
            />
          )}
          {showCloseIcon && !isMobile && (
            <CloseButton onClick={modalCloseAction} />
          )}
        </View>
        <View
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <Typography
            style={{
              color: '#18395E',
            }}>
            {title}
          </Typography>
        </View>
      </View>
    </View>
  );
};

export default ModalHeader;
