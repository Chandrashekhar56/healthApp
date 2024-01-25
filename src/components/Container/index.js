import PropTypes from 'prop-types';

import Loader from '../Loader';

const Container = ({ loading, children, style={}, ...restProps }) => (
  <div {...restProps} style={{...style, height: '100%', display: 'flex', flexDirection: 'column'}} data-testid="container_test">
    <Loader loading={loading} />
    {children}
  </div>
);

Container.defaultProps = {
  loading: false,
  children: <span />,
};

Container.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
};

export default Container;
