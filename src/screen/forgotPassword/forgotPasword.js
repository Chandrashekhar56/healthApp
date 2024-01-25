/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */

import {useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Typography from 'src/components/Typography';
import CustomForm from 'src/components/form';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import LoadingButton from '../../components/CustomButton/loadingButton';
import Header from '../../components/Layout/header';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import useCRUD from '../../hooks/useCRUD';
import {emailValidatorPattern, requiredField} from '../../lib/constants';
import {verticalScale} from '../../lib/utils';
import {clearReadData} from '../../store/actions/crud';
import {FORGOT_PASSWORD, USER_DETAILS, USER_LOGIN} from '../../store/types';
import palette from '../../theme/palette';

export const forgotPasswordFormGroup = [
  {
    inputType: 'text',
    type: 'text',
    name: 'email',
    textLabel: 'Email',
    required: requiredField,
    containerStyle: {marginBottom: '1.875rem'},
    pattern: emailValidatorPattern,
  },
];

const ForgotPassword = () => {
  console.log('Rendering ForgotPassword');

  const [
    forgotPasswordResponse,
    forgotPasswordError,
    loading,
    callForgotPasswrodAPI,
    clearForgotPasswordData,
  ] = useCRUD({
    id: FORGOT_PASSWORD,
    url: API_URL.login,
  });

  const form = useForm({mode: 'onChange'});

  const {handleSubmit} = form;

  const handleLogin = useCallback(data => {
    console.log('🚀 ~ file: forgotPasword.js:52 ~ handleLogin ~ data:', data);
  }, []);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: palette.background.default,
        ...layoutPadding,
      }}>
      <Header />
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: verticalScale(70),
          }}>
          <Typography variant="displaySmall">Reset Password</Typography>
        </View>
        <View style={{alignItems: 'center', marginTop: verticalScale(30)}}>
          <Typography variant="bodyMedium" style={{textAlign: 'center'}}>
            Enter your email to receive the instructions to reset your password
          </Typography>
        </View>
        <View style={{marginTop: verticalScale(30)}}>
          <CustomForm
            formGroups={forgotPasswordFormGroup}
            columnsPerRow={1}
            form={form}
          />
          <LoadingButton
            id="submit-button"
            size="medium"
            type="submit"
            loading={loading}
            onPress={handleSubmit(handleLogin)}
            label="Send me now"
            style={{marginTop: verticalScale(40)}}
            disabled={loading}
          />
        </View>
        <View />
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;
