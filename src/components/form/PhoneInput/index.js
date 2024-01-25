import React from 'react';
import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

// eslint-disable-next-line import/no-extraneous-dependencies
import { PhoneNumberUtil } from 'google-libphonenumber';

import palette from 'src/theme/palette';
import { View } from 'react-native';
import Typography from '../../Typography';

const phoneUtil = PhoneNumberUtil.getInstance();

const FormPhoneInput = ({
  textLabel,
  register,
  control,
  gridProps,
  required,
  disabled = false,
}) => {
  const isValid = (value, { iso2 }, error) => {
    try {
      if (error) {
        return `${textLabel}${required ? '*' : ''}`;
      }
      if (value) {
        const parsedNumber = phoneUtil.parse(value, iso2);
        return phoneUtil.isValidNumber(parsedNumber) ? true : 'Invalid Number';
      }
      return true;
    } catch (err) {
      return false;
    }
  };
  return (
    <Controller
      name={register?.name}
      control={control}
      rules={{
        required: required?.value ? 'Please enter mandatory field' : null,
      }}
      render={({ field: { ref, ...field }, fieldState: { error } }) => console.log("error >>>", error) || (
        <View item sm={12} md={6} {...gridProps}>
          <PhoneInput
            {...field}
            specialLabel={`${textLabel}${required ? '*' : ''}`}
            id={register?.name}
            name={register?.name}
            disabled={disabled}
            autoFormat
            inputStyle={{
              width: '100%',
              fontSize: '14px',
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              color: error ? palette.error.main : palette.grey[800],
            }}
            inputProps={{
              ref,
              required: true,
            }}
            isValid={(value, country) => isValid(value, country, error)}
          />
          {error && (
            <Typography
              sx={{
                color: palette.error.main,
                fontSize: '12px',
                mx: '14px',
                mt: '4px',
              }}
            >
              {error.message}
            </Typography>
          )}
        </View>
      )}
    />
  );
};
export default FormPhoneInput;
