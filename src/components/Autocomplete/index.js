import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete as AutoCompletePaper, Checkbox, Text } from 'react-native-paper';

const AutoComplete = ({
  variant,
  data,
  label,
  name,
  getOptions,
  loading,
  multiple,
  labelAccessor,
  placeholder,
  onSearch,
  onChange,
  ...restProps
}) => {
  const renderMultiSelectOptions = useMemo(
    () => ({
      renderOption: (option, { selected }) => (
        <Checkbox.Item label={Array.isArray(labelAccessor)
          ? labelAccessor.reduce((acc, key) => `${acc} ${option[key] || ''} `, '').trim()
          : option[labelAccessor]} status={selected ? 'checked' : 'unchecked'} />
      ),
    }),
    []
  );

  return (
    <AutoCompletePaper
      id={variant}
      data={data}
      onFocus={getOptions}
      fullWidth
      multiple={multiple}
      onSelect={(newValue) => {
        onChange(newValue);
      }}
      {...(multiple ? renderMultiSelectOptions : {})}
      renderInput={(params) => (
        <><Text>{label}</Text>
        <AutoCompletePaper.Input
          {...params}
          onChangeText={onSearch}
          placeholder={placeholder}
        /></>
      )}
      {...restProps}
      noItemsFoundText="Type to search"
    />
  );
};

AutoComplete.defaultProps = {
  variant: 'combo-box-demo',
  data: [],
  label: '',
  register: {},
  error: '',
  getOptions: () => {},
  loading: false,
};

AutoComplete.propTypes = {
  variant: PropTypes.string,
  data: PropTypes.instanceOf(Array),
  label: PropTypes.string,
  register: PropTypes.instanceOf(Object),
  error: PropTypes.string,
  getOptions: PropTypes.func,
  loading: PropTypes.bool,
};

export default AutoComplete;
