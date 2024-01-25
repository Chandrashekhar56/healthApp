import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from '@mui/material';
import { isEmpty } from 'src/lib/lodash';
import useResponsive from 'src/hooks/useResponsive';
import MoreActions from './MoreActions';
import TableActionButton from '../TableActionButton';
import './table.scss';

const TableMenu = ({ row, itemStyle, actionButtons, moreActions }) => {
  const mdUp = useResponsive('up', 'md');

  let moreActionData = [];
  if (
    !isEmpty(actionButtons) &&
    actionButtons.length > 1 &&
    isEmpty(moreActions) &&
    !mdUp
  )
    moreActionData = [...actionButtons];

  if (!isEmpty(moreActions) && mdUp) moreActionData = [...moreActions];
  else if (!isEmpty(moreActions))
    moreActionData = [...moreActions, ...(actionButtons || [])];

  return (
    <>
      {!isEmpty(actionButtons) && (mdUp || actionButtons.length === 1) && (
        <TableCell
          className="pinnedRows"
          style={{
            // borderBlock: 'none',
            ...itemStyle,
            width: actionButtons.length * 50,
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <TableActionButton buttons={actionButtons} row={row} />
        </TableCell>
      )}

      {!isEmpty(moreActionData) && (
        <TableCell
          className="pinnedRows"
          style={{
            // borderBlock: 'none',
            ...itemStyle,
            width: '50px',
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MoreActions actions={moreActionData} data={row} />
        </TableCell>
      )}
    </>
  );
};

TableMenu.defaultProps = {
  row: {},
  itemStyle: {},
  actionButtons: [],
  moreActions: [],
};

TableMenu.propTypes = {
  row: PropTypes.instanceOf(Object),
  itemStyle: PropTypes.instanceOf(Object),
  actionButtons: PropTypes.instanceOf(Array),
  moreActions: PropTypes.instanceOf(Array),
};

export default TableMenu;
