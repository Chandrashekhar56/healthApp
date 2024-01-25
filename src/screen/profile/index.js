/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Divider} from 'react-native-paper';
import Layout from '../../components/Layout';
import Typography from '../../components/Typography';
import {Icon} from '../../components/icon';
import {clearLocalStorage} from '../../lib/asyncStorage';
import {verticalScale} from '../../lib/utils';
import {clearStoreData} from '../../store/actions/crud';
import {store} from '../../store/index';
import {useNavigation} from '@react-navigation/native';
import {UI_ROUTES} from '../../lib/routeConstants';

const lists = [
  {
    name: 'Edit Profile',
    onPress: ({navigation}) => {
      navigation.navigate(UI_ROUTES.editProfile, {});
    },
    icon: <Icon name="edit" />,
  },

  {
    name: 'My Courses',
    onPress: ({navigation}) => {
      navigation.navigate(UI_ROUTES.myCourseList, {});
    },
    icon: <Icon name="book" />,
  },
];

const ItemComponent = ({item, navigation}) => {
  const {name, icon, onPress} = item;
  return (
    <View key={name}>
      <TouchableOpacity
        onPress={() => onPress({navigation})}
        style={{
          paddingVertical: verticalScale(20),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Typography variant="titleSmall">{item.name}</Typography>
        {icon && icon}
      </TouchableOpacity>

      <Divider />
    </View>
  );
};

export const Profile = () => {
  const navigation = useNavigation();
  return (
    <Layout bigTitle={'Profile'}>
      <View>
        <View>
          {lists.map(item => {
            return (
              <ItemComponent
                key={item.name}
                item={item}
                navigation={navigation}
              />
            );
          })}
        </View>
      </View>
    </Layout>
  );
};
export default Profile;
