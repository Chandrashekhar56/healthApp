/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import palette from '../../theme/palette';

const ActionButton = ({
  onClick,
  label,
  variant,
  style,
  children,
  onPress,
  ...restProps
}) => (
  <TouchableRipple
    onPress={onPress}
    mode="contained"
    style={{
      paddingHorizontal: 20,
      paddingVertical: 5,
      fontFamily: 'Poppins',
      fontSize: 20,
      textAlign: 'center',
      borderRadius: 50,
      backgroundColor: palette.background.main,
      ...style,
    }}
    {...restProps}>
    {children || label}
  </TouchableRipple>
);

ActionButton.defaultProps = {
  label: 'hekko',
  onClick: () => {},
  variant: 'primary',
};

export default ActionButton;
