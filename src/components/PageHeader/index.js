import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Grid, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import BackIcon from 'src/assets/images/svg/back.svg';
import { get, isFunction } from '../../lib/lodash';

import Box from '../Box';
import ActionButton from '../ActionButton';
import FabButton from '../FabButton';
import Typography from '../Typography';
import MoreActions from '../Table/MoreActions';
import Chip from '../Chip';

import './pageHeader.scss';

const PageHeader = (props) => {
  const { title, showBackIcon, onPressBackIcon, rightContent, leftContent } =
    props;
  const theme = useTheme();
  const navigate = useNavigate();
  const pageHeaderColor = get(theme, 'palette.pageHeader', {});
  return (
    <Grid
      container
      className="page_header_container"
      data-testid="page-header-test"
    >
      <Box sx={{ display: 'flex', marginBottom: '8px', alignItems: 'center' }}>
        {showBackIcon && (
          <IconButton
            variant="secondary"
            sx={{
              boxShadow: 'none',
              padding: 0,
              minWidth: 'unset',
              backgroundColor: 'transparent',
              borderRadius: '50%',
            }}
            onClick={
              isFunction(onPressBackIcon) ? onPressBackIcon : () => navigate(-1)
            }
          >
            <img
              src={BackIcon}
              alt="login"
              style={{
                cursor: 'pointer',
                padding: '6px',
                width: 30,
                height: 30,
              }}
            />
          </IconButton>
        )}
        {title && (
          <Typography sx={{ ml: 1, mr: 1 }} variant="h6">
            {title}
          </Typography>
        )}
        <div className="header_right_content" data-testid="button-test">
          {leftContent?.map((item) => {
            const { render, type, ...restProps } = item;
            if (item?.render) {
              return item?.render;
            }
            switch (item.type) {
              case 'chip':
                return <Chip {...restProps} />;
              default:
                return <div />;
            }
          })}
        </div>
      </Box>
      <div className="header_right_content" data-testid="button-test">
        {rightContent?.map((item) => {
          const { render, type, ...restProps } = item;
          if (item?.render) {
            return item?.render;
          }
          switch (item.type) {
            case 'action':
            case 'save':
              return (
                <ActionButton className="page_header_button" {...restProps} />
              );
            case 'fabButtonSave':
              return <FabButton {...restProps} />;
            case 'cancel':
              return (
                <ActionButton
                  className="page_header_button"
                  style={{
                    border: `1px solid ${pageHeaderColor?.buttonBackgroundColor}`,
                    color: pageHeaderColor?.buttonBackgroundColor,
                    backgroundColor: 'transparent',
                  }}
                  {...restProps}
                />
              );
            case 'moreAction':
              return <MoreActions {...restProps} />;
            case 'chip':
              return <Chip {...restProps} />;
            default:
              return <div />;
          }
        })}
      </div>
    </Grid>
  );
};

PageHeader.defaultProps = {
  title: '',
  showBackIcon: false,
  onPressBackIcon: () => {},
  isBreadCrumbVisible: false,
};

PageHeader.propTypes = {
  title: PropTypes.string,
  showBackIcon: PropTypes.bool,
  onPressBackIcon: PropTypes.func,
  isBreadCrumbVisible: PropTypes.bool,
};

export default PageHeader;
