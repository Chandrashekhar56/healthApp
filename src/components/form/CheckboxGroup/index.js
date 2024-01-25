import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { Controller } from 'react-hook-form';

const CheckboxGroup = ({
  label,
  register,
  name,
  form,
  control,
  setValue,
  options,
  ...restProps
}) => {
  const handleChange = useCallback(
    (value = []) => (item) => {
      const updatedValue = item.checked
        ? [...value, item.value]
        : value.filter((val) => val !== item.value);

      setValue(name, updatedValue);
    },
    [name, setValue]
  );

  return (
    <Controller
      name={name}
      control={control}
      {...register}
      defaultValue={[]}
      render={({ field }) => {
        const { value } = field;
        return (
          <View>
            <Text>{restProps?.textLabel}</Text>
            {options.map((option) => (
              <Checkbox.Item
                key={option.value}
                label={option.label}
                status={value.includes(option.value) ? 'checked' : 'unchecked'}
                onPress={() => handleChange(value)(option)}
                {...restProps}
              />
            ))}
          </View>
        );
      }}
      {...restProps}
    />
  );
};

CheckboxGroup.defaultProps = {
  options: [],
};

CheckboxGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
};

export default CheckboxGroup;
