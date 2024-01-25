/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import FlatList from '../../components/FlatList/FlatList';
import {ListEmptyComponent} from '../../components/ListEmptyComponent';
import useQuery from '../../hooks/useQuery';
import {UI_ROUTES} from '../../lib/routeConstants';
import {GET_GROUPS_CHATS_LIST} from '../../store/types';
import ChatListItemRenderer from './chatListItemRenderer';

const ListEmpty = () => (
  <ListEmptyComponent emptyMessage={'No Groups To Show !'} />
);

const ChatMessage = ({item, listRefetch}) => {
  const navigation = useNavigation();

  const {id, name, avatar_urls} = item || {};

  const handleChatItemClick = () => {
    navigation.navigate(UI_ROUTES.groupDiscussions, {
      groupDetail: item,
    });
  };
  const itemProps = {
    avatar: avatar_urls?.thumb,
    name: name,
    unread_count: 0,
    lastMessage: 'This is group message',
    chatTime: new Date(),
    handleChatItemClick,
  };
  return <ChatListItemRenderer {...itemProps} />;
};

const GroupChatList = () => {
  const [chats, chatsError, chatsLoading, page, , handlePageChange, resetList] =
    useQuery({
      listId: GET_GROUPS_CHATS_LIST,
      url: API_URL.groupsList,
      type: REQUEST_METHOD.get,
    });

  return (
    <>
      <FlatList
        data={chats?.results || []}
        renderItem={({item}) => (
          <ChatMessage item={item} listRefetch={resetList} />
        )}
        contentContainerStyle={chats?.results?.length ? {} : {flex: 1}}
        ListEmptyComponent={ListEmpty}
        error={chatsError}
        loading={chatsLoading}
        pagination={true}
        page={page}
        totalPages={chats?.totalPages}
        handlePageChange={handlePageChange}
        onRefresh={resetList}
      />
    </>
  );
};

export default GroupChatList;
