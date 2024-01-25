import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {UI_ROUTES} from '../lib/routeConstants';
import GroupsTab from '../screen/groups';
import GroupDetail from '../screen/groups/groupDetail';
import Chat from '../screen/chat/chat';
import GroupDiscussions from '../screen/chat/groupDiscussion';
import CommentSection from '../screen/chat/groupDiscussion/commentSection';

const Stack = createStackNavigator();

const GroupsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={UI_ROUTES.groupsListing} component={GroupsTab} />
      <Stack.Screen name={UI_ROUTES.groupDetail} component={GroupDetail} />
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

export default GroupsStack;
