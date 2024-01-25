/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {View} from 'react-native';
import {IconButton} from '../../components/icon';
import palette from '../../theme/palette';
import {openGallery} from '../../lib/utils';
import {GET_CHAT_LIST} from '../../store/types';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import useCRUD from '../../hooks/useCRUD';
import useAuthUser from '../../hooks/useAuthUser';
import {useDispatch} from 'react-redux';
import {setReadData} from '../../store/actions/reduxState';
import {chatStatus} from '../../lib/constants';

const ChatFooter = ({onSend = () => {}, loading, disabled, chats} = {}) => {
  const [messageText, setMessageText] = useState('');
  const [user] = useAuthUser();

console.log("🚀 ~ file: chatFooter.js:68 ~ ChatFooter ~ chats:", chats)


  const handleSendMessage = () => {
    if (messageText) {
      const newMessage = messageText;
      onSend(newMessage);
      setMessageText('');
    }
  };
  const setMessageData = message => {
    setMessageText(message);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        backgroundColor: palette.background.paper,
        alignItems: 'center',
        gap: 18,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <TextInput
            multiline
            placeholder="Type your message here ..."
            onChangeText={setMessageData}
            value={messageText}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <IconButton name="paperclip" onPress={() => openGallery()} />
          <IconButton
            name="send"
            onPress={handleSendMessage}
            loading={loading}
            disabled={disabled || !messageText}
          />
        </View>
      </View>
    </View>
  );
};

export default ChatFooter;
