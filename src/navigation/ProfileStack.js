import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {UI_ROUTES} from '../lib/routeConstants';
import CourseDetails from '../screen/course/courseDetails';
import MyCourseList from '../screen/course/myCourseList';
import Profile from '../screen/profile';
import EditProfile from '../screen/profile/editProfile';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={UI_ROUTES.profileSection} component={Profile} />
      <Stack.Screen name={UI_ROUTES.myCourseList} component={MyCourseList} />
      <Stack.Screen name={UI_ROUTES.courseDetail} component={CourseDetails} />
      <Stack.Screen name={UI_ROUTES.editProfile} component={EditProfile} />

      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
};

export default ProfileStack;
