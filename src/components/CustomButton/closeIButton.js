import React from 'react';
import { IconButton } from 'react-native-paper';

const CloseButton = ({ onPress }) => {
  return (
    <IconButton
      icon="close" // You can use a different icon name as needed
      color="#000" // Customize the color
      size={24} // Adjust the size as needed
      onPress={onPress}
    />
  );
};

export default CloseButton;
