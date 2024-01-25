import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {UI_ROUTES} from '../lib/routeConstants';
import ChatTab from '../screen/chat/chatTab';
import Chat from '../screen/chat/chat';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import GroupDiscussions from '../screen/chat/groupDiscussion';
import CommentSection from '../screen/chat/groupDiscussion/commentSection';

const Stack = createStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={UI_ROUTES.chatList} component={ChatTab} />
      <Stack.Screen name={UI_ROUTES.chatScreen} component={Chat} />
      <Stack.Screen
        name={UI_ROUTES.groupDiscussions}
        component={GroupDiscussions}
      />
      <Stack.Screen
        name={UI_ROUTES.commentSection}
        component={CommentSection}
      />

      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
};

export default ChatStack;
