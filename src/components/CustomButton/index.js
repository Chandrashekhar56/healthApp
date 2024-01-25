/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button} from 'react-native-paper';

const CustomButton = ({
  onClick,
  label,
  variant,
  style,
  onPress,
  children,
  ...restProps
}) => (
  <Button
    onPress={onPress}
    mode="contained"
    style={{
      paddingHorizontal: 20,
      paddingVertical: 5,
      fontFamily: 'Poppins',
      fontSize: 20,
      textAlign: 'center',
      borderRadius: 50,
      ...style,
    }}
    {...restProps}>
    {children || label}
  </Button>
);

CustomButton.defaultProps = {
  label: '',
  onClick: () => {},
  variant: 'primary',
};

export default CustomButton;
