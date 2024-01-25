import * as React from 'react';
import PropTypes from 'prop-types';
import {Controller} from 'react-hook-form';

import cloneDeep from 'lodash/cloneDeep';
import Loader from 'src/components/Loader';
import Autocomplete from '../../Autocomplete';
import {HelperText, TextInput} from 'react-native-paper';
import palette from '../../../theme/palette';
import {PaperSelect} from 'react-native-paper-select';
import isFunction from 'lodash/isFunction';

const FormAutoComplete = ({
  variant,
  data,
  label,
  register,
  control,
  setValue,
  getOptions = () => {},
  loading,
  onSearch,
  multiple,
  validateSelection,
  style = {},
  ...restProps
}) => {
  const handleInputChange = React.useCallback(
    searchText => {
      setValue(register?.name, '');
      onSearch(searchText);
    },
    [onSearch, register?.name, setValue],
  );
  const [selectedValues, setSelectedValues] = React.useState({
    text: '',
    selectedList: [],
  });

  const handleValidateSelection = React.useCallback(
    (selected, onChange) => {
      if (isFunction(validateSelection)) {
        const isSelectionValid = validateSelection(selected, restProps);
        if (isSelectionValid) {
          setSelectedValues(selected);
          onChange(selected.selectedList);
        }
      } else {
        setSelectedValues(selected);
        onChange(selected.selectedList);
      }
    },
    [restProps, validateSelection],
  );
  return (
    <Controller
      control={control}
      {...register}
      render={({field, fieldState: {error}}) => {
        const {onChange} = field;
        return (
          <>
            <PaperSelect
              label={label}
              arrayList={data || []}
              multiEnable={multiple}
              checkboxProps={{checkboxLabelStyle: {color: palette.text.dark}}}
              selectedArrayList={selectedValues.selectedList}
              onSelection={selected =>
                handleValidateSelection(selected, onChange)
              }
              value={selectedValues.text}
              textInputStyle={{paddingHorizontal: 0, marginBottom: 8, ...style}}
              {...restProps}
              onSearch={handleInputChange}
            />
            <HelperText type="error">{restProps.error?.message}</HelperText>
          </>
        );
      }}
    />
  );
};

FormAutoComplete.defaultProps = {
  variant: 'combo-box-demo',
  data: [],
  label: '',
  register: {},
  error: '',
  getOptions: () => {},
  loading: false,
};

FormAutoComplete.propTypes = {
  variant: PropTypes.string,
  data: PropTypes.instanceOf(Object),
  label: PropTypes.string,
  register: PropTypes.instanceOf(Object),
  error: PropTypes.string,
  getOptions: PropTypes.func,
  loading: PropTypes.bool,
};

export default FormAutoComplete;
