/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Snackbar} from 'react-native-paper';

const SnackBar = props => {
  const {
    type = 'success',
    message = '',
    button = '',
    callback = () => {},
    hideSnackbar = () => {},
  } = props;

  return (
    <Snackbar
      visible={!!(type && message)}
      onDismiss={hideSnackbar}
      duration={3000}
      action={{
        label: button,
        onPress: callback,
      }}
      style={{
        backgroundColor: type === 'success' ? '#3A7D33' : '#b00020',
      }}>
      {message}
    </Snackbar>
  );
};

export default SnackBar;
