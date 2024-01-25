/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import FastImage from '../../components/Image';
import Typography from '../../components/Typography';
import {getTimeFromDate} from '../../lib/dateUtil';
import palette from '../../theme/palette';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import startCase from 'lodash/startCase';

const ChatListItemRenderer = props => {
  const {
    handleChatItemClick,
    avatar,
    name,
    lastMessage,
    chatTime,
    unread_count,
  } = props || {};
  return (
    <TouchableRipple onPress={handleChatItemClick}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          gap: 10,
          ...layoutPadding,
        }}>
        <FastImage
          source={{uri: avatar}}
          style={{
            width: 60,
            height: 60,
            borderRadius: 50,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            // marginTop: 5,
            justifyContent: 'space-between',
            flex: 1,
            alignItems: 'center',
          }}>
          <View>
            <Typography variant="labelLarge">
              {startCase(name || '')}
            </Typography>
            <Typography variant="bodyMedium">{lastMessage}</Typography>
          </View>
        </View>
        <View>
          <Typography variant="bodyMedium">
            {getTimeFromDate(chatTime)}
          </Typography>
          {!!unread_count && (
            <View style={{alignItems: 'flex-end', flex: 1}}>
              <View
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 50,
                  backgroundColor: palette.background.main,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Typography
                  variant="bodySmall"
                  style={{color: palette.text.paper}}>
                  {unread_count}
                </Typography>
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableRipple>
  );
};

export default ChatListItemRenderer;
