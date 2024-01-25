import React, { useMemo } from 'react';

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';
import PaginationMUI from '@mui/material/Pagination';
import {get} from 'src/lib/lodash';

import './pagination.scss';

const Pagination = ({
  totalCount, page, rowsPerPage, handlePageChange,
}) => {
  const theme = useTheme();
  const tableColor = get(theme, 'palette.table', {});

  const count = useMemo(
    () => Math.ceil((totalCount) / rowsPerPage),
    [totalCount, rowsPerPage],
  );

  return (
    <div className="pagination_container" data-testid="pagination_test">
      <PaginationMUI
        color="primary"
        className="pagination_button"
        count={count}
        variant="outlined"
        page={page}
        onChange={handlePageChange}
        sx={{
          color: theme.palette?.table?.paginationItemColor,
          '& .css-110ksil-MuiButtonBase-root-MuiPaginationItem-root': {
            color: tableColor?.pagination?.inactiveItemColor,
          },
          '& .Mui-disabled': {
            backgroundColor: `${tableColor?.pagination?.paginationNextPreviousDisabledButtonColor} !important`,
          },
          '& .Mui-selected': {
            backgroundColor: `${tableColor?.pagination?.paginationNextPreviousDisabledButtonColor} !important`,
          },
          '& .MuiPaginationItem-previousNext': {
            backgroundColor: tableColor?.pagination?.previousNextBackground,
            color: tableColor?.pagination?.paginationNextPreviousButtonColor,
          },
        }}
      />
    </div>
  );
};

Pagination.defaultProps = {
  totalCount: 0,
  rowsPerPage: 1,
  page: 0,
  handlePageChange: () => {},
};

Pagination.propTypes = {
  totalCount: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  handlePageChange: PropTypes.func,
};

export default Pagination;
