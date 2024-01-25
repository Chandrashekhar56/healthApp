import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native-paper';
import palette from '../../theme/palette';

const Typography = ({children, style = {}, ...props}) => (
  <Text
    style={{color: palette.text.primary, ...style}}
    {...props}
    data-testid="typography-test">
    {children}
  </Text>
);

Typography.defaultProps = {
  children: <Text />,
};

Typography.propTypes = {
  children: PropTypes.node,
};

export default Typography;
