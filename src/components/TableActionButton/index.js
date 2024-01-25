import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import TableIcons from '../Table/TableActionIcons';

function TableActionButton(props) {
  const { buttons, row } = props;
return (
  <Box sx={{ flexDirection: 'row' }}>
    {buttons.map((item, index) => (
      <Tooltip key={item?.label} title={item?.label}>
        <IconButton
          key={index}
          size="small"
          sx={{
            width: '20px',
            height: '20px',
            ml: 1.5,
            ...(item?.preRender && item.preRender(row)),
          }}
          onClick={() => item?.action(row)}
        >
          {TableIcons(item.icon)}
        </IconButton>
      </Tooltip>
    ))}
  </Box>
);
}

export default TableActionButton;
