/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import isEmpty from 'lodash/isEmpty';

import {
  Grid,
  Badge,
  Checkbox,
  ListItemText,
  MenuItem,
  Select as MuiSelect,
  FormControl,
  ListSubheader,
} from '@mui/material';

import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import useCRUD from 'src/hooks/useCRUD';
import useReduxState from 'src/hooks/useReduxState';
import { API_URL, REQUEST_METHOD } from 'src/api/constants';
import { appointmentStatusOptions } from 'src/lib/constants';
import {
  GET_PRACTICES_LOCATION,
  GET_PRACTICES_SERVICES,
} from 'src/store/types';
import Typography from '../../components/Typography';
import './filterSelect.scss';

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: 400,
    },
  },
};

const PlaceHolderComponent = ({ selectedFilter }) => (
  <div className="placeholder-wrapper">
    <Badge
      color="error"
      overlap="circular"
      badgeContent={
        selectedFilter?.length ? (
          <Typography>{selectedFilter?.length}</Typography>
        ) : null
      }
    >
      <FilterAltRoundedIcon className="filter-icon" />
    </Badge>
    <Typography className="filter-heading">Filter</Typography>
  </div>
);

const FilterSelect = ({
  variant,
  label,
  control,
  loading,
  onChange,
  defaultValue,
  gridProps,
  // value,
  size = 'medium',
  fetchAppointment,
  apiParams,
  ...restProps
}) => {
  const [selectedValue, setSelectedValue] = useState([]);
  const [filters, setFilters] = useReduxState(
    'appointment-calendar-filters',
    {}
  );
  const [practicesLocationResponse, , , getLocation] = useCRUD({
    id: GET_PRACTICES_LOCATION,
    url: API_URL.getPractice,
    type: REQUEST_METHOD.get,
  });

  const [practicesServicesResponse, , , getServices] = useCRUD({
    id: GET_PRACTICES_SERVICES,
    url: API_URL.services,
    type: REQUEST_METHOD.get,
  });

  useEffect(() => {
    getLocation();
    getServices();
  }, []);

  const filterOptions = useMemo(() => {
    const parsedOptions = { status: [], service: [], location: [] };
    const appointmentStatus = appointmentStatusOptions();
    parsedOptions.status = appointmentStatus;
    if (practicesLocationResponse?.results?.length) {
      const practicesOptions = practicesLocationResponse?.results?.map(
        (item) => ({
          name: item.name,
          code: item.id,
          id: item.id,
        })
      );
      parsedOptions.location = practicesOptions;
    }
    if (practicesServicesResponse?.results?.length) {
      const servicesOptions = practicesServicesResponse?.results?.map(
        (item) => ({
          name: item.name,
          code: item.id,
          id: item.id,
        })
      );
      parsedOptions.service = servicesOptions;
    }
    return parsedOptions;
  }, [practicesLocationResponse?.results, practicesServicesResponse?.results]);

  useEffect(() => {
    if (!isEmpty(filters)) {
      const filterValues = [];
      Object.keys(filters)?.forEach((key) => {
        filterValues.push(...filters[key]);
      }, []);
      setSelectedValue(filterValues);

      apiParams.current = {
        ...apiParams.current,
        status: filters.status?.join(',') || undefined,
        service: filters.service?.join(',') || undefined,
        location: filters.location?.join(',') || undefined,
      };
    }
  }, []);

  const renderSelectOptions = useCallback(
    (options, dataType) => {
      const items = options[dataType].map((item) => (
        <MenuItem
          name={dataType}
          key={item.code}
          value={item.code}
          sx={{
            fontSize: '14px',
            height: '36px',
            paddingLeft: '4px',
            textWrap: 'wrap',
          }}
          size="small"
        >
          <Checkbox checked={selectedValue.indexOf(item.code) > -1} />
          <ListItemText
            className="list-item-text"
            primary={
              <Typography variant="body2" style={{ fontSize: '14px' }}>
                {item.name}
              </Typography>
            }
          />
        </MenuItem>
      ));
      return [
        <ListSubheader key={dataType} sx={{ height: '36px', fontWeight: 400 }}>
          Filter by {dataType}
        </ListSubheader>,
        items,
      ];
    },
    [selectedValue]
  );

  const handleChange = useCallback(
    (event, otherInfo) => {
      const { target: { value } = {} } = event;
      const { props } = otherInfo;
      const reduxFilters = { ...filters };

      if (reduxFilters[props.name]) {
        const index = reduxFilters[props.name].indexOf(props.value);
        if (index > -1) {
          reduxFilters[props.name].splice(index, 1);
        } else {
          reduxFilters[props.name].push(props.value);
        }
      } else {
        reduxFilters[props.name] = [props.value];
      }
      setFilters({ ...reduxFilters });
      setSelectedValue(typeof value === 'string' ? value.split(',') : value);
    },
    [filters, setFilters]
  );

  const handleFilterClose = useCallback(() => {
    // eslint-disable-next-line no-param-reassign
    apiParams.current = {
      ...apiParams.current,
      status: filters.status?.join(',') || undefined,
      service: filters.service?.join(',') || undefined,
      location: filters.location?.join(',') || undefined,
    };
    fetchAppointment({ ...apiParams.current });
  }, [
    apiParams,
    fetchAppointment,
    filters.location,
    filters.service,
    filters.status,
  ]);

  return (
    <Grid item xs={12} md={6} {...gridProps} className="filter-select-wrapper">
      <FormControl
        variant={variant}
        size={size}
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
        <MuiSelect
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          label={label}
          multiple
          onChange={handleChange}
          displayEmpty
          value={selectedValue}
          renderValue={(selectedFilter) => (
            <PlaceHolderComponent selectedFilter={selectedFilter} />
          )}
          onClose={handleFilterClose}
          MenuProps={MenuProps}
        >
          {Object.keys(filterOptions)?.map((dataType) =>
            renderSelectOptions(filterOptions, dataType)
          )}
        </MuiSelect>
      </FormControl>
    </Grid>
  );
};

export default FilterSelect;
