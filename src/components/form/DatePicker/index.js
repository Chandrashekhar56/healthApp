/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import dayjs from 'dayjs';
import {Controller} from 'react-hook-form';
import {useTheme} from 'react-native-paper';
import {DatePickerInput} from 'react-native-paper-dates';
import Typography from '../../Typography';
import {View} from 'react-native';
import palette from '../../../theme/palette';

const CustomDatePicker = ({
  label,
  register,
  setValue,
  defaultValue,
  control,
  required,
  style = {},
  ...restProps
}) => {
  return (
    <Controller
      control={control}
      {...register}
      render={({field, fieldState: {error}}) => {
        const {onChange, value} = field;
        const handleChange = date => {
          onChange(date);
          setValue(field.name, date);
        };

        return (
          <View style={{marginBottom: 8}}>
            <DatePickerInput
              locale="en"
              label={label}
              value={value}
              onChange={handleChange}
              inputMode="start"
              style={{
                paddingHorizontal: 0,
                // marginBottom: 8,
                ...style,
              }}
              {...restProps}
            />
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

export default CustomDatePicker;