import React from 'react';
import {TextInput as RNTextInput} from 'react-native-paper';
import palette from '../../theme/palette';

const TextInput = props => (
  <RNTextInput
    placeholder="Type your message here ..."
    placeholderTextColor={palette.text.secondary}
    {...props}
  />
);

export default TextInput;
