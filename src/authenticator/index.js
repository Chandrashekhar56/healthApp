import React, {useEffect} from 'react';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import useAuthUser from '../hooks/useAuthUser';
import AppNavigator from '../navigation/AppNavigator';

const AppAuthenticator = () => {
  const [
    userData,
    userDataError,
    userDataLoading,
    callUserDataAPI,
    clearUserData,
  ] = useAuthUser();

  useEffect(() => {
    callUserDataAPI();
  }, []);

  useEffect(() => {
    if (!userDataLoading && (userData || userDataError)) {
      setTimeout(() => {
        LottieSplashScreen.hide();
      }, 1000);
    }
  }, [userData, userDataError, userDataLoading]);

  return <AppNavigator isAuthenticated={userData} />;
};

export default AppAuthenticator;
