/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import Typography from '../../components/Typography';
import {scale, verticalScale} from '../../lib/utils';
import palette from '../../theme/palette';
import {Icon, IconButton} from '../../components/icon';
import useAuthUser from '../../hooks/useAuthUser';
import {chatStatus} from '../../lib/constants';

export const MessageItem = ({item, index}) => {
  const [user] = useAuthUser();

  const {sender_id, avatar, message} = item || {};
  const {raw: rawMessage = ''} = message || {};
  const isSender = sender_id === user?.id;

  return (
    <View
      style={{
        marginBottom: 10,
        justifyContent: isSender ? 'flex-end' : 'flex-start',
        alignItems: isSender ? 'flex-end' : 'flex-start',
        ...(index === 0 ? {marginTop: verticalScale(26)} : {}),
      }}>
      <TouchableRipple onLongPress={() => {}}>
        <>
          <View
            style={{
              backgroundColor: isSender
                ? palette.background.main
                : palette.background.gray,
              paddingVertical: 6,
              paddingHorizontal: 14,
              borderRadius: 18,
              ...(isSender
                ? {borderTopRightRadius: 0}
                : {borderTopLeftRadius: 0}),
              width: '80%',
              minWidth: scale(360),
            }}>
            {rawMessage && (
              <Typography
                variant="labelLarge"
                style={{color: isSender ? 'white' : 'black'}}>
                {rawMessage}
              </Typography>
            )}
            {item?.image && (
              <View>
                <Image
                  source={{uri: avatar?.[0]?.thumb}}
                  style={{
                    width: verticalScale(200),
                    height: verticalScale(200),
                    borderRadius: 18,
                  }}
                />
                <View style={{position: 'absolute', right: 0, top: 0}}>
                  <IconButton name="download" />
                </View>
              </View>
            )}
            {
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  gap: 10,
                  marginTop: 5,
                }}>
                <View>
                  <Typography
                    variant="bodySmall"
                    style={{color: palette.text.primary}}>
                    {item?.display_date}
                  </Typography>
                </View>
                {item?.status === chatStatus.SENDING && (
                  <Icon name="clock-o" size={16} color={palette.text.primary} />
                )}
              </View>
            }
          </View>
        </>
      </TouchableRipple>
    </View>
  );
};
