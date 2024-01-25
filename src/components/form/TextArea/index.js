import React from 'react';
import {TextInput as PaperTextInput, useTheme} from 'react-native-paper';
import {Controller} from 'react-hook-form';
import Typography from '../../Typography';
import palette from '../../../theme/palette';
import {View} from 'react-native';

const TextAreaInput = ({
  register,
  control,
  textLabel,
  placeholder,
  containerStyle = {},
  style = {},
  disabled,
  ...restProps
}) => {
  return (
    <Controller
      control={control}
      {...register}
      ref={null}
      render={({field, fieldState: {error}}) => {
        return (
          <View style={{...containerStyle}}>
            <PaperTextInput
              multiline
              label={textLabel}
              disabled={disabled}
              error={!!error}
              {...restProps}
              {...field}
              onChangeText={field?.onChange}
              style={{paddingHorizontal: 0, marginBottom: 8, ...style}}
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

export default TextAreaInput;
