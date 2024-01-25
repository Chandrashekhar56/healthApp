/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Typography from 'src/components/Typography';
import CustomForm from 'src/components/form';
import useCRUD from '../../../hooks/useCRUD';
import { Divider, Surface } from 'react-native-paper';
import { API_URL, REQUEST_METHOD } from '../../../api/constants';
import { USER_DETAILS, USER_LOGIN } from '../../../store/types';
import { UI_ROUTES } from '../../lib/routeConstants';
import { requiredField } from '../../../lib/constants';
import LoadingButton from '../../../components/CustomButton/loadingButton';
import { ScrollView, View } from 'react-native';
import { scale, verticalScale } from '../../../lib/utils';
import Layout from '../../../components/Layout';
import { setLocalStorage } from '../../../lib/asyncStorage';
import palette from '../../../theme/palette';
import { layoutPadding } from '../../../components/Layout/layoutStyle';
import { Icon } from '../../../components/icon';
import { useDispatch } from 'react-redux';
import { setReadData } from '../../store/actions/crud';
import NoInternet from '../../../components/NetworkWrapper/noInternet';
import Header from '../../../components/Layout/header';
import { Image } from 'react-native';

export const loginFormGroups = [
    {
        inputType: 'checkBox',
        type: 'text',
        name: 'lose_weight',
        textLabel: 'Lose weight',
        required: requiredField,
        containerStyle: { marginBottom: 20, },
        inputStyle: {
            flexDirection: 'row-reverse',
            borderWidth: 1,
            borderColor: palette.background.main,
            borderRadius: 10,
        }
    },

    {
        inputType: 'checkBox',
        type: 'text',
        name: 'eat_better',
        textLabel: 'Eat better',
        required: requiredField,
        containerStyle: { marginBottom: 20, },
        inputStyle: {
            flexDirection: 'row-reverse',
            borderWidth: 1,
            borderColor: palette.background.main,
            borderRadius: 10,
        }
    },

    {
        inputType: 'checkBox',
        type: 'text',
        name: 'boost_my_exercise',
        textLabel: 'Boost my exercise',
        required: requiredField,
        containerStyle: {marginBottom: 20, },
        inputStyle: {
            flexDirection: 'row-reverse',
            borderWidth: 1,
            borderColor: palette.background.main,
            borderRadius: 10,
        }
    },
    {
        inputType: 'checkBox',
        type: 'text',
        name: 'manage_stress/improve_mental_health',
        textLabel: 'Manage stress/improve mental health',
        required: requiredField,
        containerStyle: {marginBottom: 20, },
        inputStyle: {
            flexDirection: 'row-reverse',
            borderWidth: 1,
            borderColor: palette.background.main,
            borderRadius: 10,
        }
    },
    {
        inputType: 'checkBox',
        type: 'text',
        name: 'get_better_sleep',
        textLabel: 'Get better sleep',
        required: requiredField,
        containerStyle: {marginBottom: 20, },
        inputStyle: {
            flexDirection: 'row-reverse',
            borderWidth: 1,
            borderColor: palette.background.main,
            borderRadius: 10,
        }
    },
    {
        inputType: 'checkBox',
        type: 'text',
        name: 'manage_conditions',
        textLabel: 'Manage conditions',
        required: requiredField,
        containerStyle: {marginBottom: 20, },
        inputStyle: {
            flexDirection: 'row-reverse',
            borderWidth: 1,
            borderColor: palette.background.main,
            borderRadius: 10,
        }
    },
    {
        inputType: 'checkBox',
        type: 'text',
        name: 'quit_smoking',
        textLabel: 'Quit smoking',
        required: requiredField,
        containerStyle: {marginBottom: 20, },
        inputStyle: {
            flexDirection: 'row-reverse',
            borderWidth: 1,
            borderColor: palette.background.main,
            borderRadius: 10,
        }
    },

    {
        inputType: 'checkBox',
        type: 'text',
        name: 'something_else',
        textLabel: 'Something else',
        required: requiredField,
        containerStyle: {marginBottom: 20, },
        inputStyle: {
            flexDirection: 'row-reverse',
            borderWidth: 1,
            borderColor: palette.background.main,
            borderRadius: 10,
        }
    },
];

let selectedRole;
const Step2 = ({ updateAuthentication } = {}) => {
    console.log('Rendering Step2');
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
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        marginTop: verticalScale(50),
                    }}>
                    <Typography variant="titleLarge" style={{ textAlign: 'left', fontWeight: 'bold' }}>What is your main health goal?</Typography>
                    <Typography>Pick one.</Typography>
                </View>
                <View style={{ marginTop: verticalScale(20) }}>
                    <CustomForm
                        formGroups={loginFormGroups}
                        columnsPerRow={1}
                        form={stepOneForm}
                    />
                </View>
            </View>
        </ScrollView>
    );
};
export default Step2;
