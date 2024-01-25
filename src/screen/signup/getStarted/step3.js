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
        name: 'anxiety',
        textLabel: 'Anxiety',
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
        name: 'arrhythmia',
        textLabel: 'Arrhythmia',
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
        name: 'asthma',
        textLabel: 'Asthma',
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
        name: 'back_pain',
        textLabel: 'Back pain',
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
        name: 'congestive_heart_failure(chf)',
        textLabel: 'Congestive heart failure (CHF)',
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
        name: 'copd',
        textLabel: 'COPD',
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
        name: 'depression',
        textLabel: 'Depression',
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
        name: 'diabetes',
        textLabel: 'Diabetes',
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
        name: 'high_blood_pressure',
        textLabel: 'High blood pressure',
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
        name: 'high_cholesterol',
        textLabel: 'High cholesterol',
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
        name: 'peripheral_artery/vascular_disease',
        textLabel: 'Peripheral rtery/vascular_disease',
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
        name: 'prediabetes',
        textLabel: 'Prediabetes',
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
        name: 'sleep_apnea',
        textLabel: 'Sleep apnea',
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
        name: 'sleep_problems',
        textLabel: 'Sleep problems',
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
        name: 'smoking/nicotine_use',
        textLabel: 'Smoking/nicotine use',
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
        name: 'other',
        textLabel: 'Other',
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
const Step3 = ({ updateAuthentication } = {}) => {
    console.log('Rendering Step3');
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
                        alignItems: 'center',
                        marginTop: verticalScale(40),
                    }}>
                    <Typography style={{ textAlign: 'center', fontWeight: 'bold' }} variant="titleLarge">Do you have any of the following conditions ?</Typography>
                </View>
                <Divider />
                <View style={{ marginTop: verticalScale(30) }}>
                    <View>
                        <CustomForm
                            formGroups={loginFormGroups}
                            columnsPerRow={1}
                            form={stepOneForm}
                        />
                    </View>
                    <LoadingButton
                        id="submit-button"
                        size="medium"
                        type="submit"
                        loading={loading}
                        onPress={handleFormOneSubmit(handleLogin)}
                        label="Next"
                        style={{ marginTop: verticalScale(40), marginBottom: verticalScale(20), borderRadius: 30 }}
                        disabled={loading}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default Step3;
