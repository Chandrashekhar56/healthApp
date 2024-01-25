import PropTypes from 'prop-types';

import Loader from '../Loader';

const PageContent = ({ loading, children, style, ...restProps }) => (
  <div
    {...restProps}
    data-testid="page_content"
    style={{
      backgroundColor: '#fff',
      padding: '20px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      ...style,
    }}
  >
    <Loader loading={loading} />
    {children}
  </div>
);

PageContent.defaultProps = {
  loading: false,
  children: <span />,
};

PageContent.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
};

export default PageContent;
