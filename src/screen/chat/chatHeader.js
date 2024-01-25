/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import startCase from 'lodash/startCase';
import React from 'react';
import {View} from 'react-native';
import Typography from '../../components/Typography';
import {IconButton} from '../../components/icon';
import {getFormattedDate} from '../../lib/dateUtil';
import {verticalScale} from '../../lib/utils';
import palette from '../../theme/palette';
import FastImage from '../../components/Image';

const ChatHeader = props => {
  const {recipients, isGroupChat = false, chatItem = {}} = props || {};
  const navigation = useNavigation();
  return (
    <View
      style={{
        borderBottomWidth: 1,
        paddingBottom: verticalScale(14),
        borderColor: palette.background.gray,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 0}}>
        <IconButton
          onPress={() => {
            navigation.goBack();
          }}
          name="arrow-left"
        />
        <View style={{flexDirection: 'row', gap: 10}}>
          <FastImage
            source={{uri: recipients?.user_avatars?.thumb}}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
            }}
          />
          <View style={{marginTop: 0}}>
            <Typography variant="labelLarge">
              {startCase(recipients?.name)}
            </Typography>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              {isGroupChat && (
                <>
                  <Typography variant="bodyMedium">15 Members</Typography>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 50,
                      backgroundColor: palette.text.secondary,
                    }}
                  />
                </>
              )}
              <Typography variant="bodyMedium">
                {`Created on ${getFormattedDate(chatItem?.start_date, {
                  requiredFormat: 'DD MMMM YYYY',
                })}`}
              </Typography>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatHeader;
