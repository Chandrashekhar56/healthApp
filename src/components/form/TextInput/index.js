/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput as PaperTextInput, useTheme} from 'react-native-paper';
import {Controller} from 'react-hook-form';
import Typography from '../../Typography';

const CustomTextInput = ({
  type,
  disabled,
  required,
  formVariant,
  InputProps,
  register,
  label,
  textLabel,
  control = {},
  defaultValue,
  setValue,
  style = {},
  isShrink = false,
  containerStyle,
  ...restProps
}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleOnShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Controller
      control={control}
      {...register}
      ref={null}
      render={({field, fieldState: {error}}) => {
        return (
          <View style={{...containerStyle}}>
            <PaperTextInput
              secureTextEntry={showPassword ? false : type === 'password'}
              label={textLabel}
              disabled={disabled}
              error={!!error}
              {...restProps}
              {...field}
              onChangeText={field?.onChange}
              style={{paddingHorizontal: 0, marginBottom: 8, ...style}}
              right={
                type === 'password' ? (
                  <PaperTextInput.Icon
                    icon={!showPassword ? 'eye-off' : 'eye'}
                    onPress={handleOnShowPassword}
                  />
                ) : null
              }
            />
            {error && (
              <Typography style={{color: theme.colors.error}}>
                {error.message}
              </Typography>
            )}
          </View>
        );
      }}
    />
  );
};

export default CustomTextInput;
