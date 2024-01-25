/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {verticalScale} from '../../lib/utils';
import CustomButton from '../CustomButton';
import Typography from '../Typography';
import {IconButton} from '../icon';
import {layoutPadding, layoutPaddingRight} from './layoutStyle';

function Header(props) {
  const naivation = useNavigation();
  const {
    onBackPress,
    backIcon = true,
    title,
    containerStyle = {},
    titleStyle = {},
    backIconStyle = {},
    bigTitle,
    rigthButtonProps = {},
  } = props || {};
  const handleBackPress = () => {
    if (naivation.canGoBack()) {
      naivation.goBack();
    }
  };
  return (
    <>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: layoutPaddingRight,
          alignItem: 'center',
          gap: 10,
          ...containerStyle,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          {backIcon && (
            <IconButton
              style={{...backIconStyle}}
              onPress={onBackPress || handleBackPress}
            />
          )}
          {title && (
            <Typography
              variant="titleMedium"
              style={{flex: 1, flexWrap: 'wrap', ...titleStyle}}>
              {title}
            </Typography>
          )}
        </View>
        {rigthButtonProps?.action && rigthButtonProps?.title && (
          <View style={{...(rigthButtonProps?.style || {})}}>
            <CustomButton
              label={rigthButtonProps?.title}
              onPress={rigthButtonProps?.action}
              {...(rigthButtonProps?.buttonProps || {})}
              contentStyle={{
                flexDirection: undefined,
                alignItems: undefined,
                ...(rigthButtonProps?.buttonProps?.contentStyle || {}),
              }}
            />
          </View>
        )}
      </View>
      {bigTitle && (
        <View
          style={{
            marginTop: verticalScale(30),
            marginBottom: verticalScale(20),
            ...layoutPadding,
          }}>
          <Typography variant="displaySmall">{bigTitle}</Typography>
        </View>
      )}
    </>
  );
}

export default Header;
