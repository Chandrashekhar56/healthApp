import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {UI_ROUTES} from '../lib/routeConstants';
import MeetingCalendar from '../screen/meeting';

const Stack = createStackNavigator();

const CalendarStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={UI_ROUTES.calender} component={MeetingCalendar} />

      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
};

export default CalendarStack;
