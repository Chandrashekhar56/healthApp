/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Typography from 'src/components/Typography';
import CustomForm from 'src/components/form';
import useCRUD from '../../hooks/useCRUD';
import { Divider, Surface } from 'react-native-paper';
import { API_URL, REQUEST_METHOD } from '../../api/constants';
import { USER_DETAILS, USER_LOGIN } from '../../store/types';
import { UI_ROUTES } from '../../lib/routeConstants';
import { requiredField } from '../../lib/constants';
import LoadingButton from '../../components/CustomButton/loadingButton';
import { ScrollView, View } from 'react-native';
import { scale, verticalScale } from '../../lib/utils';
import Layout from '../../components/Layout';
import { setLocalStorage } from '../../lib/asyncStorage';
import palette from '../../theme/palette';
import { layoutPadding } from '../../components/Layout/layoutStyle';
import { Icon } from '../../components/icon';
import { useDispatch } from 'react-redux';
import { setReadData } from '../../store/actions/crud';
import NoInternet from '../../components/NetworkWrapper/noInternet';
import Header from '../../components/Layout/header';

export const loginFormGroups = [
    {
        inputType: 'text',
        type: 'text',
        name: 'firstName',
        textLabel: 'First Name*',
        required: requiredField,
        containerStyle: { marginBottom: '1.875rem' },
    },

    {
        inputType: 'text',
        type: 'text',
        name: 'lastName',
        textLabel: 'Last Name*',
        required: requiredField,
        containerStyle: { marginBottom: '1.875rem' },
    },

    {
        inputType: 'text',
        type: 'text',
        name: 'email',
        textLabel: 'Email*',
        required: requiredField,
        containerStyle: { marginBottom: '1.875rem' },
    },
    {
        inputType: 'text',
        type: 'password',
        name: 'password',
        textLabel: 'Password*',
        required: requiredField,
        containerStyle: { marginBottom: '1.875rem' },
    },
    {
        inputType: 'text',
        type: 'password',
        name: 'confirmPassword',
        textLabel: 'Confirm Password*',
        required: requiredField,
        containerStyle: { marginBottom: '1.875rem' },
    },
];

let selectedRole;
const SingupScreen = ({ updateAuthentication } = {}) => {
    console.log('Rendering SingupScreen');
    const [loginError, setLoginError] = useState(null);
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

    const [
        userData,
        userDataError,
        userDataLoading,
        callUserDataAPI,
        clearUserData,
    ] = useCRUD({
        id: USER_DETAILS,
        url: API_URL.userDetail,
        type: REQUEST_METHOD.get,
    });

    const stepOneForm = useForm({ mode: 'onChange' });

    useEffect(() => {
        if (userLoginResponse) {
            callUserDataAPI();
            setLocalStorage({ key: 'isAuthenticated', value: 'true' });
            setLocalStorage({
                key: 'userLogin',
                value: JSON.stringify(userLoginResponse),
            });

            updateAuthentication(true);
            setLoginError(null);
        }
    }, [userLoginResponse]);
    useEffect(() => {
        return () => clearUserLoginResponse(true);
    }, []);
    useEffect(() => {
        if (userLoginResponseError) {
            setLoginError(userLoginResponseError);
        }
    }, [userLoginResponseError]);

    const { handleSubmit: handleFormOneSubmit } = stepOneForm;


    const handleLogin = useCallback(
        data => {
            const userCred = {
                username: 'brijeshp' || data.email,
                password: 'Cv)0jH20b2r$WrQN%2C6^osK' || data.password,
            };
            const { username, password } = userCred;

            if (username && password) {
                callUserLoginAPI({
                    data: userCred,
                });
            }
        },
        [callUserLoginAPI],
    );
    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: palette.background.default,
                ...layoutPadding,
            }}>
            <View>
                <Header />
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: verticalScale(70),
                    }}>
                    <Typography variant="displaySmall">Sing Up</Typography>
                </View>
                <View style={{ alignItems: 'center', marginTop: verticalScale(10) }}>
                    <Typography variant="titleSmall" style={{ color: palette.error.main }}>
                        {loginError}
                    </Typography>
                </View>
                <View style={{ margisnTop: verticalScale(30) }}>
                    <CustomForm
                        formGroups={loginFormGroups}
                        columnsPerRow={1}
                        form={stepOneForm}
                    />
                    
                    <LoadingButton
                        id="submit-button"
                        size="medium"
                        type="submit"
                        loading={loading}
                        onPress={handleFormOneSubmit(handleLogin)}
                        label="Sign up"
                        style={{ marginTop: verticalScale(40), borderRadius: 30}}
                        disabled={loading}
                    />
                </View>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: verticalScale(30),

                    }}>
                    <Typography variant="bodyLarge" style={{ textAlign: 'center'}}>By signing up you agree to our Terms of {"\n"} Use and Privacy Policy</Typography>
                </View>
            </View>
        </ScrollView>
    );
};

export default SingupScreen;
