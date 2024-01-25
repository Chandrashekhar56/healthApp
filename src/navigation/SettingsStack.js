import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { UI_ROUTES } from '../lib/routeConstants';
import Settings from '../screen/setting';

const Stack = createStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name={UI_ROUTES.settings} component={Settings} />

      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
};

export default SettingsStack;
