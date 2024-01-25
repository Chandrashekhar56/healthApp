import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MUICheckbox from '@mui/material/Checkbox';

const Checkbox = ({
  label,
  name,
  gridProps,
  labelPlacement,
  form,
  ...props
}) => (
  <FormGroup aria-label="position" row sx={{ mt: props.mt }}>
    <FormControlLabel
      control={
        <MUICheckbox
          name={name}
          {...props}
          sx={{
            '&.MuiButtonBase-root:hover': {
              bgcolor: 'transparent',
            },
            '&.MuiSvgIcon-root': {
              fontSize: '20px',
            },
          }}
        />
      }
      label={label}
      sx={{
        '& .MuiFormControlLabel-label': {
          fontSize: '14px',
        },
      }}
      labelPlacement={labelPlacement}
    />
  </FormGroup>
);

Checkbox.defaultProps = {
  label: '',
  register: {},
  labelPlacement: 'end',
};

Checkbox.propTypes = {
  label: PropTypes.string,
  labelPlacement: PropTypes.string,
  register: PropTypes.instanceOf(Object),
};

export default Checkbox;
