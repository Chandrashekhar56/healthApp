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
const doctorImage = require("healthApp/src/assets/images/doctor.jpg");

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

const sectionData = [{
    title: `Collect basic health stats`
},
{
    title: `Determine which organization you belong to`
},
{
    title: `Connect to available health records for accurate info`
}]

let selectedRole;
const Step1 = ({ updateAuthentication } = {}) => {
    console.log('Rendering Step1');
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
                        marginTop: verticalScale(50),
                    }}>
                    <Typography variant="titleLarge" style={{
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>We'd like to learn a little{"\n"}more about you,Nage</Typography>
                </View>
                <View style={{
                    marginTop: verticalScale(30),
                    backgroundColor: palette.background.paper,
                }}>
                    <Typography variant="titleSmall" style={{
                        marginTop: verticalScale(10),
                        color: 'black',
                        textAlign: 'left'
                    }}> In this section
                    </Typography>
                    <View style={{ marginTop: verticalScale(5) }}>

                        {sectionData.map((item, index) => {
                            return <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Icon name='check-circle' color='green' size={26} />
                                <Typography variant="titleSmall" style={{
                                    textAlign: 'flex-start',
                                    marginTop: verticalScale(5),
                                    marginBottom: verticalScale(10),
                                    flex: 1
                                }}>
                                    {item?.title}
                                </Typography>
                            </View>
                        })

                        }
                    </View>
                </View>
                <Image
                    source={doctorImage}
                    resizeMode="contain"
                />
                <View >
                    <LoadingButton
                        id="submit-button"
                        size="medium"
                        type="submit"
                        loading={loading}
                        onPress={handleFormOneSubmit(handleLogin)}
                        label="Get Started Now"
                        style={{ marginTop: verticalScale(5), borderRadius: 30 }}
                        disabled={loading}
                    />
                </View>
            </View>
        </ScrollView>
    );
};
export default Step1;
