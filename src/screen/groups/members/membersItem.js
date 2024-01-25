/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import Avatar from '../../../components/Avatar';
import Typography from '../../../components/Typography';
import palette from '../../../theme/palette';
import {TouchableRipple} from 'react-native-paper';
import {layoutPadding} from '../../../components/Layout/layoutStyle';
import {Icon, IconButton} from '../../../components/icon';
import {UI_ROUTES} from '../../../lib/routeConstants';
import useAuthUser from '../../../hooks/useAuthUser';

function MembersItem({item, index, navigation}) {
  const [user] = useAuthUser();
  return (
    <TouchableRipple onPress={() => {}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          ...layoutPadding,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Avatar
            source={{
              uri: item?.avatar_urls?.full,
            }}
            size={70}
          />
          <View>
            <Typography>{item?.name}</Typography>
            <Typography>Software Eng.</Typography>
          </View>
        </View>
        <View>
          {item?.id !== user?.id && (
            <View>
              <IconButton
                name="comment"
                onPress={() => {
                  navigation.navigate(UI_ROUTES.chatScreen, {
                    // chatId: 7,
                    listRefetch: () => {},
                    recipients: {
                      name: item?.name,
                      user_avatars: item?.avatar_urls,
                      user_id: item?.id,
                    },
                    chatItem: {...item, start_date: new Date()},
                    isGroupChat: false,
                  });
                }}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableRipple>
  );
}

export default MembersItem;
