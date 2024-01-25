import React from 'react';
import { RadioButton as PaperRadioButton, useTheme } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import Typography from '../../Typography';

const FormRadioButton = ({ options = [], control, register, textLabel, error }) => {
  const theme = useTheme();

  return (
    <Controller
      control={control}
      {...register}
      render={({ field }) => (
        <>
          <Typography style={{ marginBottom: 8 }}>{textLabel}</Typography>
          <PaperRadioButton.Group onValueChange={(value) => field.onChange(value)} value={field.value}>
            {options.map((item) => (
              <PaperRadioButton.Item
                key={item.value}
                label={item.label}
                value={item.value}
                color={theme.colors.primary} // Change to your preferred color
              />
            ))}
          </PaperRadioButton.Group>
          {error && <Typography style={{ color: theme.colors.error }}>{error}</Typography>}
        </>
      )}
    />
  );
};

export default FormRadioButton;
