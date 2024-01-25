import React, {useEffect, useRef} from 'react';
import {FlatList, View} from 'react-native';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import {MessageItem} from './messageItem';

const ChatBody = ({chats = {}} = {}) => {
  const flatRef = useRef();
  const {messages = {}} = chats || {};

  const renderItem = ({item, index}) => (
    <MessageItem item={item} index={index} />
  );
  return (
    <View
    //  style={{marginTop: verticalScale(30)}}
    >
      <FlatList
        ref={flatRef}
        data={Object.values(messages) || []}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          ...layoutPadding,
        }}
        onLayout={() => flatRef.current.scrollToEnd({animated: false})}
      />
    </View>
  );
};

export default ChatBody;
