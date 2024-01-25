import * as React from 'react';
import isArray from 'lodash/isArray';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MuiSelect from '@mui/material/Select';

import './select.scss';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: '250px',
      width: '250px',
    },
  },
};

const Select = ({
  name,
  variant,
  data,
  label,
  control,
  loading,
  onChange,
  defaultValue,
  gridProps,
  size = 'small',
  valueAccessor = 'value',
  labelAccessor = 'label',
  getOptionLabel,
  options,
  showPlaceholder = false,
  placeholder,
  ...restProps
}) => (
  <FormControl
    variant={variant}
    size={size}
    fullWidth
    sx={{
      '& .MuiFormLabel-root': {
        fontSize: '14px',
      },
      '& .mui-select .MuiSelect-select': {
        color: 'black',
      },
    }}
    {...restProps}
  >
    <InputLabel id="demo-select-medium-label">{label}</InputLabel>
    <MuiSelect
      name={name}
      labelId="demo-select-medium-label"
      id="demo-select-medium"
      className="mui-select"
      defaultValue={defaultValue}
      label={label}
      onChange={onChange}
      MenuProps={MenuProps}
      displayEmpty={showPlaceholder}
    >
      {placeholder && (
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
      )}
      {(data || options)?.map((item) => (
        <MenuItem
          key={item[valueAccessor] || item.value}
          value={item[valueAccessor] || item.label}
          sx={{
            fontSize: '14px',
            height: 'auto',
            textWrap: 'wrap',
          }}
          size="small"
        >
          {isArray(labelAccessor) ? getOptionLabel(item) : item[labelAccessor]}
        </MenuItem>
      ))}
    </MuiSelect>
  </FormControl>
);

export default Select;
