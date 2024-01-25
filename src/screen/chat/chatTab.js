/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {FlatList, Image, View, useWindowDimensions} from 'react-native';
import {Searchbar, TouchableRipple} from 'react-native-paper';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import chatPerson from '../../assets/images/chatPersonNew.jpg';
import chatTwo from '../../assets/images/chatTwo.jpg';
import chatThree from '../../assets/images/chatThree.jpg';
import chatFour from '../../assets/images/chatFour.jpg';
import chatFive from '../../assets/images/chatFive.jpg';

import {layoutPadding} from '../../components/Layout/layoutStyle';
import Typography from '../../components/Typography';
import {verticalScale} from '../../lib/utils';
import palette from '../../theme/palette';
import {useNavigation} from '@react-navigation/native';
import {UI_ROUTES} from '../../lib/routeConstants';
import ChatList from './chatList';
import SearchInput from '../../components/SearchInput';
import GroupChatList from './groupChatList';

const renderScene = SceneMap({
  indivituals: ChatList,
  groups: GroupChatList,
});

const ChatTab = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'indivituals', title: 'Indivituals'},
    {key: 'groups', title: 'Groups'},
  ]);

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        renderLabel={({focused, route}) => {
          return (
            <Typography
              variant="labelLarge"
              style={{...(focused ? {color: palette.text.main} : {})}}>
              {route?.title}
            </Typography>
          );
        }}
        indicatorStyle={{backgroundColor: palette.background.main, height: 3}}
        style={{backgroundColor: palette.background.default, elevation: 4}}
        android_ripple={{color: palette.background.main}}
      />
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: palette.background.default}}>
      <View style={{marginBottom: 10, marginTop: 20, ...layoutPadding}}>
        <Typography variant="titleMedium">Chat</Typography>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};
export default ChatTab;
