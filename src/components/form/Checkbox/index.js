import React from 'react';
import {Checkbox as PaperCheckbox, useTheme} from 'react-native-paper';
import {Controller} from 'react-hook-form';

const CheckboxLabel = ({label, register, control, ...props}) => {
  const theme = useTheme();

  return (
    <Controller
      control={control}
      {...register}
      render={({field}) => (
        <PaperCheckbox.Item
          label={label}
          status={field.value ? 'checked' : 'unchecked'}
          onPress={() => field.onChange(!field.value)}
          color={theme.colors.primary}
          {...props}
        />
      )}
    />
  );
};

export default CheckboxLabel;
