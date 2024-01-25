/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import isFunction from 'lodash/isFunction';
import React, {useCallback, useEffect, useState} from 'react';
import {Controller} from 'react-hook-form';
import {
  ActivityIndicator,
  HelperText,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {PaperSelect} from 'react-native-paper-select';
import palette from '../../../theme/palette';
import {View} from 'react-native';
import Typography from '../../Typography';
import isEmpty from 'lodash/isEmpty';

const intialState = {
  text: '',
  selectedList: [],
};
const FormSelect = ({
  variant,
  data = [],
  label,
  register,
  control,
  setValue,
  loading,
  onSearch,
  onChange: handleChange = () => {},
  defaultValue,
  valueAccessor = 'value',
  labelAccessor = 'label',
  getOptionLabel = () => {},
  multiple,
  options,
  validateSelection,
  sx,
  extraAPIParams,
  style = {},
  containerStyle = {},
  ...restProps
}) => {

  const [selectedValues, setSelectedValues] = useState(intialState);

  useEffect(() => {
    if (extraAPIParams?.restValue) {
      setSelectedValues(intialState);
      setValue(register?.name, []);
    }
  }, [extraAPIParams]);

  // useEffect(() => {
  //   const subscription = watch((value, {name}) => {
  //     // if (type === 'change') {
  //     if (name === register.name) {
  //       if (isEmpty(value[name])) {
  //         setSelectedValues(intialState);
  //       }
  //     }
  //     // }
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  const handleValidateSelection = useCallback(
    (selected, onChange) => {
      if (isFunction(validateSelection)) {
        const isSelectionValid = validateSelection(selected, restProps);
        if (isSelectionValid) {
          setSelectedValues(selected);
          handleChange(register?.name, selected.selectedList);
          onChange(selected.selectedList);
        }
      } else {
        setSelectedValues(selected);
        handleChange(register?.name, selected.selectedList);
        onChange(selected.selectedList);
      }
    },
    [handleChange, register?.name, restProps, validateSelection],
  );

  return (
    <Controller
      control={control}
      {...register}
      render={({field, fieldState: {error}, ...rest}) => {
        const {onChange} = field;
        return (
          <View>
            <View style={{flexDirection: 'row'}}>
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
                textInputStyle={{
                  paddingHorizontal: 0,
                  // marginBottom: 8,
                  ...style,
                }}
                containerStyle={{marginBottom: 0, ...containerStyle}}
                textInputProps={{
                  right: loading ? (
                    <TextInput.Icon
                      icon={() => (
                        <ActivityIndicator
                          size="small"
                          color={palette.background.gray}
                        />
                      )}
                    />
                  ) : (
                    <TextInput.Icon icon="chevron-down" />
                  ),
                }}
                {...restProps}
              />
            </View>
            {error && (
              <Typography style={{color: palette.error.main}}>
                {error.message}
              </Typography>
            )}
          </View>
        );
      }}
    />
  );
};

export default FormSelect;
