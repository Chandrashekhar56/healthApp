/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, useTheme } from '@mui/material';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

import { get, isFunction, isEmpty } from 'src/lib/lodash';
import palette from 'src/theme/palette';
import useSelection from './tableHook/useSelection';
import { convertWithTimezone, dateFormatter } from '../../lib/utils';
import CheckboxLabel from '../form/Checkbox';
import ActionButton from '../ActionButton';
import Pagination from '../Pagination';
import SimpleLoader from '../Loader';
import './table.scss';
import Icon from '../icon/icon';
import Typography from '../Typography';
import TableMenu from './TableMenu';
import TableChips from './tableChips';

const StickyHeadTable = ({
  columns,
  data,
  headerStyle,
  itemStyle,
  containerStyle,
  wrapperStyle,
  rowsPerPage,
  loading,
  headerComponent: TableHeader,
  pagination,
  totalCount,
  page,
  handlePageChange,
  onRowClick,
  moreActions,
  getSelectedIds,
  defaultSelectedIDs,
  handleSort,
  sort,
  actionButtons,
  timezone,
}) => {
  const theme = useTheme();
  const tableColor = get(theme, 'palette.table', {});

  // const [sortedData, setSortedData] = useState(data);
  // const [sortedColumns, setSortedColumns] = useState([]);
  // const [sortedDirectionData, setSortedDirectionData] = useState({});
  const [selectedIDs, handleOnSelected, handleOnAllSelected] = useSelection({
    tableData: data,
    getSelectedIds,
    defaultSelectedIDs,
  });
  const checkedSelectionIntermediate = useMemo(
    () => data?.filter((ele) => selectedIDs[ele?._id]).length,
    [selectedIDs, data]
  );

  const allChecked = useMemo(
    () =>
      Object.keys(selectedIDs).length
        ? data?.every((ele) => selectedIDs[ele?._id])
        : false,
    [selectedIDs, data]
  );

  const handleRowClick = useCallback(
    (row) => () => {
      if (isFunction(onRowClick)) {
        onRowClick(row);
      }
    },
    [onRowClick]
  );

  const handleSorting = useCallback(
    (dataKey, order) => () => {
      if (isFunction(handleSort)) {
        handleSort(dataKey, order);
      }
    },
    [handleSort]
  );

  return (
    <div
      className="table_paper"
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: palette.background.paper,
        ...wrapperStyle,
        border: 'none',
      }}
    >
      {TableHeader}
      <TableContainer className="table_container" style={{ ...containerStyle }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow
              sx={{
                '& th': {
                  backgroundColor: palette.background.accentBlue,
                },
              }}
            >
              {columns.map((column) => (
                <TableCell
                  size="small"
                  key={column?.id}
                  style={{ width: column?.width }}
                  data-testId={`${column?.dataKey}-column`}
                  className={column.fixed ? 'pinnedColumn' : 'header'}
                  sx={{
                    backgroundColor: tableColor?.headerBackground,
                    color: palette.text.primary,
                    // borderBlock: 'none',
                    fontSize: '0.7rem',
                    maxWidth: column.maxWidth || '4rem',
                    ...headerStyle,
                  }}
                >
                  <div className="header_cell">
                    {column?.label}
                    {column?.type === 'selection' && (
                      <CheckboxLabel
                        key={column?._id}
                        indeterminate={
                          checkedSelectionIntermediate > 0 &&
                          checkedSelectionIntermediate < data?.length
                        }
                        checked={allChecked}
                        onChange={handleOnAllSelected}
                      />
                    )}
                    {column.sort ? (
                      <div className="sortLabel" data-testId="sorting">
                        <Icon
                          onClick={handleSorting(column?.dataKey, 1)}
                          icon="mingcute:arrow-down-line"
                          cursor="pointer"
                          ml={-0.5}
                          sx={{
                            width: 14,
                            padding: 0,
                            color:
                              !isEmpty(sort) && sort[column?.dataKey] === 1
                                ? 'green'
                                : 'inherit',
                          }}
                        />
                        <Icon
                          onClick={handleSorting(column?.dataKey, -1)}
                          icon="mingcute:arrow-up-line"
                          cursor="pointer"
                          ml={-0.5}
                          sx={{
                            width: 14,
                            color:
                              !isEmpty(sort) && sort[column?.dataKey] === -1
                                ? 'green'
                                : 'inherit',
                          }}
                        />
                      </div>
                    ) : null}
                  </div>
                </TableCell>
              ))}
              {!isEmpty(
                typeof actionButtons === 'function'
                  ? actionButtons({})
                  : actionButtons
              ) ? (
                <TableCell
                  className="pinnedColumn"
                  sx={{
                    backgroundColor: tableColor?.headerBackground,
                    color: tableColor?.itemColor,
                    // borderBlock: 'none',
                    ...headerStyle,
                  }}
                />
              ) : null}
              {!isEmpty(
                typeof moreActions === 'function'
                  ? moreActions({})
                  : moreActions
              ) ? (
                <TableCell
                  className="pinnedColumn"
                  sx={{
                    backgroundColor: tableColor?.headerBackground,
                    color: tableColor?.itemColor,
                    // borderBlock: 'none',
                    ...headerStyle,
                  }}
                />
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableCell
                align="center"
                colSpan={columns?.length}
                className="table_loader"
              >
                <SimpleLoader type="circular" loading={loading} />
              </TableCell>
            ) : !loading && isEmpty(data) ? (
              <TableCell
                align="center"
                colSpan={columns?.length}
                className="table_loader"
              >
                <Typography>No Result Found!</Typography>
              </TableCell>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.code}
                  onClick={handleRowClick(row)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'inherit',
                    },
                  }}
                  data-testid="tableBody_test"
                >
                  {columns.map((column) => {
                    if (column?.render) {
                      const Component = column?.render;
                      return (
                        <TableCell
                          key={column?.dataKey}
                          style={{
                            // borderBlock: 'none',
                            cursor: 'pointer',
                            ...itemStyle,
                          }}
                          onClick={(e) => e?.stopPropagation()}
                        >
                          <Component data={row} {...column} index={rowIndex} />
                        </TableCell>
                      );
                    }
                    switch (column?.type) {
                      case 'index':
                        return (
                          <TableCell
                            key={column?.dataKey}
                            className={
                              column.fixed ? 'pinnedRows' : 'table_cell'
                            }
                            style={{
                              // borderBlock: 'none',
                              ...itemStyle,
                            }}
                          >
                            {rowIndex + 1}
                          </TableCell>
                        );
                      case 'selection':
                        return (
                          <TableCell
                            key={column?.dataKey}
                            className={
                              column?.fixed ? 'pinnedRows' : 'table_cell'
                            }
                            style={{
                              // borderBlock: 'none',
                              ...itemStyle,
                            }}
                          >
                            <CheckboxLabel
                              checked={selectedIDs[row?._id] || false}
                              onChange={(event) => handleOnSelected(event, row)}
                            />
                          </TableCell>
                        );
                      case 'text':
                        return (
                          <TableCell
                            key={column?.dataKey}
                            className={
                              column?.fixed ? 'pinnedRows' : 'table_cell'
                            }
                            style={{
                              // borderBlock: 'none',
                              ...itemStyle,
                             
                              maxWidth: column.maxWidth || '6rem',
                              ...column?.cellStyle,
                            }}
                            onClick={(e) =>
                              column?.onClick ? column.onClick(row, e) : {}
                            }
                          >
                              <Tooltip 
                                placement='bottom-start'
                                 title={get(row, column?.dataKey, '')}>
                                <div  style={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}>{get(row, column?.dataKey, '')} </div> 
                              </Tooltip>
                          </TableCell>
                        );
                      case 'date':
                        return (
                          <TableCell
                            key={column?.dataKey}
                            className={
                              column?.fixed ? 'pinnedRows' : 'table_cell'
                            }
                            style={{
                              // borderBlock: 'none',
                              ...itemStyle,
                              ...column?.cellStyle,
                            }}
                            onClick={(e) =>
                              column?.onClick ? column.onClick(row, e) : {}
                            }
                          >
                            <Tooltip
                              title={
                                !timezone
                                  ? dateFormatter(
                                      get(row, column?.dataKey, ''),
                                      column?.format
                                    )
                                  : convertWithTimezone(
                                      get(row, column?.dataKey, ''),
                                      { format: column?.format }
                                    )
                              }
                            >
                              {!timezone
                                ? dateFormatter(
                                    get(row, column?.dataKey, ''),
                                    column?.format
                                  )
                                : convertWithTimezone(
                                    get(row, column?.dataKey, ''),
                                    { format: column?.format }
                                  )}
                            </Tooltip>
                          </TableCell>
                        );
                      case 'button':
                        return (
                          <TableCell
                            key={column?.dataKey}
                            className={
                              column.fixed ? 'pinnedRows' : 'table_cell'
                            }
                            style={{
                              // borderBlock: 'none',
                              color: tableColor?.cellItemColor,
                              ...itemStyle,
                            }}
                          >
                            <ActionButton
                              label={column?.buttonLabel}
                              className="buttonStyle"
                              style={{
                                backgroundColor:
                                  theme?.palette?.actionButtonBackground,
                              }}
                            />
                          </TableCell>
                        );

                      case 'boolean':
                        return (
                          <TableCell
                            key={column?.dataKey}
                            className={
                              column.fixed ? 'pinnedRows' : 'table_cell'
                            }
                            style={{
                              // borderBlock: 'none',
                              color: tableColor?.cellItemColor,
                              ...itemStyle,
                              maxWidth: column.maxWidth || '3rem',
                            }}
                          >
                            {row?.isActive
                              ? column?.activeData
                              : column?.inActiveData}
                          </TableCell>
                        );
                      case 'chips':
                        return (
                          <TableCell
                            key={column?.dataKey}
                            className={
                              column.fixed ? 'pinnedRows' : 'table_cell'
                            }
                            style={{
                              // borderBlock: 'none',
                              ...itemStyle,
                            }}
                          >
                            <TableChips row={row} column={column} />
                          </TableCell>
                        );
                      default:
                        return (
                          <TableCell
                            style={{
                              // borderBlock: 'none',
                              ...itemStyle,
                            }}
                          />
                        );
                    }
                  })}
                  <TableMenu
                    moreActions={
                      typeof moreActions === 'function'
                        ? moreActions(row)
                        : moreActions
                    }
                    actionButtons={
                      typeof actionButtons === 'function'
                        ? actionButtons(row)
                        : actionButtons
                    }
                    row={row}
                    itemStyle={itemStyle}
                  />
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <Pagination
          totalCount={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};
StickyHeadTable.defaultProps = {
  columns: [],
  data: [],
  headerStyle: {},
  containerStyle: {},
  wrapperStyle: {},
  itemStyle: {},
  rowsPerPage: 0,
  loading: false,
  headerComponent: () => {},
  pagination: false,
  totalCount: 0,
  page: 1,
  handlePageChange: () => {},
  moreActions: [],
  onRowClick: () => {},
  getSelectedIds: () => {},
  defaultSelectedIDs: [],
};

StickyHeadTable.propTypes = {
  columns: PropTypes.instanceOf(Object),
  data: PropTypes.instanceOf(Object),
  headerStyle: PropTypes.instanceOf(Object),
  containerStyle: PropTypes.instanceOf(Object),
  wrapperStyle: PropTypes.instanceOf(Object),
  itemStyle: PropTypes.instanceOf(Object),
  rowsPerPage: PropTypes.number,
  loading: PropTypes.bool,
  headerComponent: PropTypes.element,
  pagination: PropTypes.bool,
  totalCount: PropTypes.number,
  page: PropTypes.number,
  handlePageChange: PropTypes.func,
  moreActions: PropTypes.instanceOf(Object),
  onRowClick: PropTypes.func,
  getSelectedIds: PropTypes.func,
  defaultSelectedIDs: PropTypes.instanceOf(Object),
};

export default StickyHeadTable;
