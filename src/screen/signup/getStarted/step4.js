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
        name: 'not_at_all',
        textLabel: 'Not at all',
        required: requiredField,
        containerStyle: {
            // shadowOffset: { width: 0, height: 0 },
            // shadowOpacity: 1,
            // shadowRadius: 0,
            // shadowColor: palette.background.main,
            // elevation: 1,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: palette.background.main,
            borderRadius: 10,
        },
        inputStyle: {
            flexDirection: 'row-reverse',
        }
    },

    {
        inputType: 'checkBox',
        type: 'text',
        name: 'several_days',
        textLabel: 'Several days',
        required: requiredField,
        containerStyle: { marginBottom: 10 },
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
        name: 'more_than_half_the_days',
        textLabel: 'More than half the days',
        required: requiredField,
        containerStyle: { marginBottom: 10 },
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
        name: 'nearly_every_day',
        textLabel: 'Nearly every day',
        required: requiredField,
        containerStyle: { marginBottom: 10 },
        inputStyle: {
            flexDirection: 'row-reverse',
            borderWidth: 1,
            borderColor: palette.background.main,
            borderRadius: 10,
        }
    },
];

let selectedRole;
const Step4 = ({ updateAuthentication } = {}) => {
    console.log('Rendering Step4');
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
        }, [callUserLoginAPI],);
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
                        // alignItems: 'center',
                        marginTop: verticalScale(40),
                    }}>
                    <Typography style={{
                        textAlign: 'left',
                        fontWeight: 800
                    }}
                        variant="titleLarge">Wellness Survey</Typography>
                    <Typography>1 of 15</Typography>
                    <Typography style={{
                        marginTop: verticalScale(10),
                    }} variant='titleMedium'
                    >
                        Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?
                    </Typography>
                </View>
                {/* <Divider /> */}
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

export default Step4;
