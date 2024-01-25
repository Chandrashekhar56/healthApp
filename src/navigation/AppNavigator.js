import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthenticatedNavigator from './AuthenticatedNavigator';
import LoginScreen from '../screen/login/loginScreen';
import {UI_ROUTES} from '../lib/routeConstants';
import ForgotPassword from '../screen/forgotPassword/forgotPasword';

const Stack = createStackNavigator();

const AppNavigator = ({isAuthenticated = false}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isAuthenticated ? (
        <Stack.Screen
          name={UI_ROUTES.authenticated}
          component={AuthenticatedNavigator}
        />
      ) : (
        <>
          <Stack.Screen name={UI_ROUTES.login} component={LoginScreen} />
          <Stack.Screen
            name={UI_ROUTES.forgotPassword}
            component={ForgotPassword}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
