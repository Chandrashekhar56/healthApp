import React from 'react';
import CoursesStack from './CourseStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '../components/icon';
import SettingsStack from './SettingsStack';
import ProfileStack from './ProfileStack';
import BottomTabBar from './ButtomBar';
import GroupsStack from './GroupsStack';
import ChatStack from './ChatStack';
import {UI_ROUTES} from '../lib/routeConstants';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import CalendarStack from './CalendarStack';

const Tab = createBottomTabNavigator();

const AuthenticatedNavigator = () => {
  // Define the tabBarIcon components for each screen
  const courseTabBarIcon = ({color, size}) => (
    <Icon name="book" color={color} size={size} />
  );

  const settingsTabBarIcon = ({color, size}) => (
    <Icon name="cog" color={color} size={size} />
  );
  const groupsTabBarIcon = ({color, size}) => (
    <Icon name="group" color={color} size={size} />
  );
  const calendarTabBarIcon = ({color, size}) => (
    <Icon name="calendar" color={color} size={size} />
  );
  const chatsTabBarIcon = ({color, size}) => (
    <Icon name="comments" color={color} size={size} />
  );
  const profileTabBarIcon = ({color, size}) => (
    <Icon name="user" color={color} size={size} />
  );

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarVisible: (route => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'ChatTab';
          return routeName !== UI_ROUTES.chatScreen;
        })(route),
        headerShown: false,
      })}
      tabBar={BottomTabBar}>
      <Tab.Screen
        name="Course"
        component={CoursesStack}
        options={{
          tabBarIcon: courseTabBarIcon,
          title: 'Course',
        }}
      />
      <Tab.Screen
        name="GroupsStack"
        component={GroupsStack}
        options={{
          tabBarIcon: groupsTabBarIcon,
          title: 'Groups',
        }}
      />
      {/* <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={{
          tabBarIcon: calendarTabBarIcon,
          title: 'Calendar',
        }}
      /> */}
      <Tab.Screen
        name="ChatStack"
        component={ChatStack}
        options={{
          tabBarIcon: chatsTabBarIcon,
          title: 'Chat',
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          tabBarIcon: settingsTabBarIcon,
          title: 'Settings',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: profileTabBarIcon,
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthenticatedNavigator;
