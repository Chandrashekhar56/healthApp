import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'src/components/Typography';

const TextLabel = ({ variant, text, gridProps, ...restProps } = {}) => (
  <Typography variant={variant} {...restProps} fullWidth>
    {text}
  </Typography>
);

TextLabel.defaultProps = {
  variant: 'body1',
};

TextLabel.propTypes = {
  variant: PropTypes.string,
};

export default TextLabel;
