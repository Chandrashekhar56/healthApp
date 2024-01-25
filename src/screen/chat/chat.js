/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import useAuthUser from '../../hooks/useAuthUser';
import useCRUD from '../../hooks/useCRUD';
import {chatStatus} from '../../lib/constants';
import {
  GET_CHAT_LIST,
  GET_SINGLE_CHAT,
  SEND_CHAT_MESSAGE,
} from '../../store/types';
import palette from '../../theme/palette';
import ChatBody from './chatBody';
import ChatFooter from './chatFooter';
import ChatHeader from './chatHeader';
import {cloneDeep} from '../../lib/lodash';
import {ActivityIndicator} from 'react-native-paper';

const responseModifier = data => {
  const modifiedMessages = data?.messages?.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
  return {...data, messages: modifiedMessages};
};

const Chat = props => {
  const {route: {params = {}} = {}} = props || {};
  const {
    chatId,
    listRefetch = () => {},
    recipients,
    chatItem,
    isGroupChat,
  } = params || {};

  const [user] = useAuthUser();

  const [chats, , chatsLoading, getChats, clearChatData, updateChatData] =
    useCRUD({
      id: `${GET_CHAT_LIST}-${chatId || recipients?.user_id + '-' + user?.id}`,
      url: `${API_URL.singleChat}`,
      type: REQUEST_METHOD.get,
      responseModifier,
    });

  const [
    sentMessageData,
    sentMessageError,
    sendMessageLoading,
    sendMessageAPI,
    clearSendMessageData,
  ] = useCRUD({
    id: SEND_CHAT_MESSAGE,
    url: `${API_URL.chatList}`,
    type: REQUEST_METHOD.post,
  });
  useEffect(() => {
    if (sentMessageData) {
      listRefetch();
      updateChatData(sentMessageData);
      clearSendMessageData(true);
    }
  }, [sentMessageData]);

  const appendLocalChat = messageText => {
    const clonedChats = cloneDeep(chats);
    const newMessagePayload = {
      message: {raw: messageText},
      sender_id: user?.id,
      id: 'new_added',
      status: chatStatus.SENDING,
    };
    if (clonedChats?.messages) {
      clonedChats.messages.new_chat = newMessagePayload;
    } else {
      clonedChats.messages = {};
      clonedChats.messages.new_chat = newMessagePayload;
    }
    updateChatData(clonedChats);
  };
  const onSend = messageText => {
    appendLocalChat(messageText);
    if (isGroupChat) {
      sendMessageAPI({
        data: {
          message: messageText,
          group_id: 33,
          user_id: user?.id,
          type: 'private',
        },
      });
    } else {
      sendMessageAPI({
        data: {
          message: messageText,
          recipients: recipients?.user_id,
          sender_id: user?.id,
        },
      });
    }
  };
  const handleGetChat = () => {
    if (chatId) {
      getChats({}, `/${chatId}`);
    } else {
      getChats(
        {recipient_id: recipients?.user_id, user_id: user?.id},
        '/search-thread',
      );
    }
  };
  useEffect(() => {
    handleGetChat();
  }, []);

  return (
    <View
      style={{
        backgroundColor: palette.background.default,
        flex: 1,
      }}>
      <View
        style={
          {
            // ...layoutPadding,
          }
        }>
        <ChatHeader
          recipients={recipients}
          chatItem={chatItem}
          isGroupChat={isGroupChat}
        />
      </View>
      <View style={{flex: 1}}>
        {chatsLoading && <ActivityIndicator animating size={'small'} />}
        <ChatBody chats={chats} />
      </View>
      <View>
        <ChatFooter
          chats={chats}
          loading={sendMessageLoading}
          disabled={sendMessageLoading}
          onSend={onSend}
        />
      </View>
    </View>
  );
};

export default Chat;
