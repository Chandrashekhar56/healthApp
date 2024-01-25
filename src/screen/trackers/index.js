/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Typography from 'src/components/Typography';
import { API_URL, REQUEST_METHOD } from '../../api/constants';
import Header from '../../components/Layout/header';
import { layoutPadding } from '../../components/Layout/layoutStyle';
import { Icon } from '../../components/icon';
import useCRUD from '../../hooks/useCRUD';
import { setLocalStorage } from '../../lib/asyncStorage';
import { verticalScale } from '../../lib/utils';
import { USER_DETAILS, USER_LOGIN } from '../../store/types';
import palette from '../../theme/palette';
import LogBloodPressure from './logBloodPressure/logBloodPressure';

let selectedRole;

const TrackersApp = ({ updateAuthentication } = {}) => {
    console.log('Rendering TrackersApp');
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
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: verticalScale(40),
                        marginBottom: verticalScale(10),
                        flexDirection: 'row',
                    }}>
                    <View style={{ flex: 1, }}>
                        <Typography
                            style={{
                                textAlign: 'center',
                                fontWeight: 800,
                            }}
                            variant="titleLarge">
                            Good Morning Nage
                        </Typography>
                    </View>
                    <TouchableOpacity>
                        <View >
                            <Icon name='cog' color={palette.background.main} size={26} />
                        </View>
                    </TouchableOpacity>
                </View>
                <Divider />
                <View
                    style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                    <Typography
                        variant='titleMedium'
                        style={{
                            fontWeight: 800,
                        }}>Trackers</Typography>
                    <Typography>Edit Goals</Typography>
                </View>
                <View style={{
                    marginTop: verticalScale(12),
                }}>
                    <LogBloodPressure />
                </View>
            </View>
        </ScrollView>
    );
};

export default TrackersApp;
