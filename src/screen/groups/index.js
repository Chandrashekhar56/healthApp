/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import AllGroupsListing from './allGroupsListing';
import MyGroupsListing from './myGroupsListing';
import Typography from '../../components/Typography';
import palette from '../../theme/palette';

const FirstRoute = props => <AllGroupsListing {...props} />;

const SecondRoute = props => <MyGroupsListing {...props} />;

const renderScene = SceneMap({
  allGroups: FirstRoute,
  myGroups: SecondRoute,
});

const GroupsTab = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'allGroups', title: 'All Groups'},
    {key: 'myGroups', title: 'My Groups'},
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
              {route.title}
            </Typography>
          );
        }}
        indicatorStyle={{backgroundColor: palette.background.main}}
        style={{backgroundColor: palette.background.default}}
        android_ripple={{color: palette.background.main}}
      />
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: palette.background.default}}>
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

export default GroupsTab;
