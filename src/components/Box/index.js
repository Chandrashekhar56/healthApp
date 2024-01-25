import React from 'react';
import PropTypes from 'prop-types';
import BoxMUI from '@mui/material/Box';

const Box = ({ children, ...props }) => (
  <BoxMUI {...props}>
    {children}
  </BoxMUI>
);

Box.defaultProps = {
  children: <span />,
};

Box.propTypes = {
  children: PropTypes.node,
};

export default Box;
