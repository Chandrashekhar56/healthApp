import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Searchbar, TextInput } from 'react-native-paper';

import { googleMapApiKey } from 'src/lib/constants';
import { getFormattedAddressNew } from 'src/lib/utils';

const FormMapAutocomplete = ({
  label,
  register,
  control,
  setValue,
  getOptions = () => {},
  size,
  ...restProps
}) => (
  <Controller
    control={control}
    {...register}
    render={(props) => (
      <AutoCompleteRenderer
        getOptions={getOptions}
        label={label}
        setValue={setValue}
        register={register}
        size={size}
        {...props}
      />
    )}
  />
);

const AutoCompleteRenderer = ({
  field,
  fieldState: { error },
  getOptions,
  label,
  restProps,
  size,
  setValue,
  register,
}) => {
  const { ref, onChange, value } = field;
  const [searchText, setSearchText] = useState('');

  const handleSearch = useCallback((text) => {
    setSearchText(text);
    // Perform your search logic here and update suggestions accordingly
    getOptions(text);
  }, [getOptions]);

  const onPlaceSelect = useCallback(
    (place) => {
      if (place === null) {
        setValue(register?.name, {
          description: searchText,
        });
        onChange({
          description: '',
          stateCode: '',
          postalCode: '',
          countryCode: '',
          addressLine1: '',
          addressLine2: '',
        });
      }

      // Handle the selected place details
      // You may need to replace this logic with the appropriate code for your use case
      const location = getFormattedAddressNew(place);
      setValue(register?.name, location);
      onChange(location);
      setSearchText('');
    },
    [setValue, onChange, register?.name, searchText]
  );

  return (
    <>
      <Searchbar
        placeholder={label}
        onChangeText={handleSearch}
        value={searchText}
        {...restProps}
      />
      <TextInput
        label={label}
        value={value?.description || ''}
        {...restProps}
        onChangeText={(text) => handleSearch(text)}
        onBlur={() => onPlaceSelect(null)} // Assuming onBlur triggers place selection
      />
    </>
  );
};

FormMapAutocomplete.defaultProps = {
  label: '',
  register: {},
  error: '',
  size: 'small',
};

FormMapAutocomplete.propTypes = {
  label: PropTypes.string,
  register: PropTypes.instanceOf(Object),
  error: PropTypes.string,
  size: PropTypes.string,
};

export default FormMapAutocomplete;
