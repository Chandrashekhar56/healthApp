/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Divider, TouchableRipple} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import Typography from 'src/components/Typography';
import CustomForm from 'src/components/form';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import LoadingButton from '../../components/CustomButton/loadingButton';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import {Icon} from '../../components/icon';
import useCRUD from '../../hooks/useCRUD';
import {requiredField} from '../../lib/constants';
import {verticalScale} from '../../lib/utils';
import {clearReadData} from '../../store/actions/crud';
import {USER_DETAILS, USER_LOGIN} from '../../store/types';
import palette from '../../theme/palette';
import {UI_ROUTES} from '../../lib/routeConstants';
import useAuthUser from '../../hooks/useAuthUser';

export const loginFormGroups = [
  {
    inputType: 'text',
    type: 'text',
    name: 'username',
    textLabel: 'Username',
    required: requiredField,
  },
  {
    inputType: 'text',
    type: 'password',
    name: 'password',
    textLabel: 'Password',
    required: requiredField,
  },
];

const appleIcon = () => {
  return <Icon name="apple" color="white" />;
};
const facebookIcon = () => {
  return <Icon name="facebook" color="white" />;
};

const LoginScreen = props => {
  const {navigation} = props || {};
  const dispatch = useDispatch();

  const [
    userLoginResponse,
    userLoginResponseError,
    loading,
    callUserLoginAPI,
    clearUserLoginResponse,
  ] = useCRUD({
    id: USER_LOGIN,
    url: API_URL.login,
  });
  console.log(">>>>>>>>>>>>>userLoginResponse",userLoginResponse)
  const [
    userData,
    userDataError,
    userDataLoading,
    callUserDataAPI,
    clearUserData,
  ] = useAuthUser();

  const form = useForm({mode: 'onChange'});

  useEffect(() => {
    if (userLoginResponse) {
      callUserDataAPI();
    }
  }, [userLoginResponse]);

  useEffect(() => {
    if (userLoginResponseError) {
      dispatch(clearReadData());
    }
  }, [userLoginResponseError]);

  const {handleSubmit} = form;

  const handleLogin = useCallback(data => {
    const userCred = {
      username: data.username,
      password: data.password,
    };
    const {username, password} = userCred;

    if (username && password) {
      callUserLoginAPI({
        data: userCred,
      });
    }
  }, []);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: palette.background.default,
        ...layoutPadding,
      }}>
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: verticalScale(70),
          }}>
          <Typography variant="displaySmall">Log in</Typography>
        </View>
        <View style={{alignItems: 'center', marginTop: verticalScale(10)}}>
          {/* <Typography variant="titleSmall" style={{color: palette.error.main}}>
            {loginError}
          </Typography> */}
        </View>
        <View style={{marginTop: verticalScale(30)}}>
          <CustomForm
            formGroups={loginFormGroups}
            columnsPerRow={1}
            form={form}
          />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(UI_ROUTES.forgotPassword);
            }}
            style={{alignSelf: 'flex-end'}}>
            <Typography
              style={{
                textAlign: 'right',
                marginTop: verticalScale(15),
              }}>
              Forgot password?
            </Typography>
          </TouchableOpacity>
          <LoadingButton
            id="submit-button"
            size="medium"
            type="submit"
            loading={loading || userDataLoading}
            onPress={handleSubmit(handleLogin)}
            label="Sign in"
            style={{marginTop: verticalScale(40)}}
            disabled={loading}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 30,
            }}>
            <Divider style={{flex: 1, height: 1, marginRight: 10}} />
            <Typography>Or</Typography>
            <Divider style={{flex: 1, height: 1, marginLeft: 10}} />
          </View>
        </View>
        <View style={{paddingBottom: verticalScale(50)}}>
          <LoadingButton
            id="submit-button"
            size="medium"
            type="submit"
            onPress={() => {}}
            label="Connect with Apple"
            style={{backgroundColor: '#252428'}}
            icon={appleIcon}
          />

          <LoadingButton
            id="submit-button"
            size="medium"
            type="submit"
            onPress={() => {}}
            label="Connect with Facebook"
            style={{marginTop: verticalScale(20), backgroundColor: '#2e6ed7'}}
            icon={facebookIcon}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
