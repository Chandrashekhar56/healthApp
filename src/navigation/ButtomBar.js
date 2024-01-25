/* eslint-disable react-native/no-inline-styles */
// BottomTabBar.js
import React from 'react';
import {BottomNavigation, Surface} from 'react-native-paper';
import {CommonActions} from '@react-navigation/native';
import palette from '../theme/palette';
import {UI_ROUTES} from '../lib/routeConstants';

const BottomTabBar = ({navigation, state, descriptors, insets}) => {
  const onChatScreen = state.routes[state.index].state?.routes.some(
    route => route.name === UI_ROUTES.chatScreen,
  );
  if (onChatScreen) {
    // If we're on the 'Chat' screen, don't render the tab bar
    return null;
  }
  return (
    <Surface
      style={{elevation: 8, backgroundColor: palette.background.default}}>
      <BottomNavigation.Bar
        style={{backgroundColor: palette.background.default}}
        navigationState={state}
        safeAreaInsets={insets}
        onTabPress={({route, preventDefault}) => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (event.defaultPrevented) {
            preventDefault();
          } else {
            navigation.dispatch({
              ...CommonActions.navigate(route.name, route.params),
              target: state.key,
            });
          }
        }}
        renderIcon={({route, focused, color}) => {
          const {options} = descriptors[route.key];
          if (options.tabBarIcon) {
            return options.tabBarIcon({focused, color, size: 24});
          }

          return null;
        }}
        getLabelText={({route}) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.title;

          return label;
        }}
      />
    </Surface>
  );
};

export default BottomTabBar;
