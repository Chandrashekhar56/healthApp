/* eslint-disable react-native/no-inline-styles */
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, View} from 'react-native';
import {ActivityIndicator, TouchableRipple} from 'react-native-paper';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import FastImage from '../../components/Image';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import Typography from '../../components/Typography';
import useAuthUser from '../../hooks/useAuthUser';
import useCRUD from '../../hooks/useCRUD';
import {getTimeFromDate} from '../../lib/dateUtil';
import {UI_ROUTES} from '../../lib/routeConstants';
import {GET_CHAT_LIST} from '../../store/types';
import palette from '../../theme/palette';
import SearchInput from '../../components/SearchInput';
import startCase from 'lodash/startCase';
import ChatListItemRenderer from './chatListItemRenderer';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import useQuery from '../../hooks/useQuery';
import FlatList from '../../components/FlatList/FlatList';
import {ListEmptyComponent} from '../../components/ListEmptyComponent';

const ListEmpty = () => (
  <ListEmptyComponent emptyMessage={'No Chat Started Yet !'} />
);

const ChatMessage = ({item, listRefetch}) => {
  const navigation = useNavigation();

  const {id, excerpt, date: chatTime, unread_count, recipients} = item || {};
  const recipientUser = Object.values(recipients)?.[0] || {};

  const {rendered: lastMessage = ''} = excerpt || {};

  const handleChatItemClick = () => {
    navigation.navigate(UI_ROUTES.chatScreen, {
      chatId: id,
      listRefetch,
      recipients: recipientUser,
      chatItem: item,
      isGroupChat: false,
    });
  };
  const itemProps = {
    avatar: recipientUser?.user_avatars?.thumb,
    name: recipientUser?.name,
    unread_count,
    lastMessage,
    chatTime,
    handleChatItemClick,
  };
  return <ChatListItemRenderer {...itemProps} />;
};

const ChatList = () => {
  const [user] = useAuthUser();
  const [refreshing, setRefreshing] = useState(false);

  const [chats, chatsError, chatsLoading, page, , handlePageChange, resetList] =
    useQuery({
      listId: GET_CHAT_LIST,
      url: API_URL.chatList,
      type: REQUEST_METHOD.get,
      queryParams: {_embed: true, user_id: user?.id},
    });

  useEffect(() => {
    setRefreshing(false);
  }, [chats]);

  useFocusEffect(
    useCallback(() => {
      resetList();
    }, []),
  );

  const skeletonItemRender = () => (
    <SkeletonPlaceholder>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          gap: 10,
          ...layoutPadding,
        }}>
        <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            alignItems: 'center',
          }}>
          <View>
            <SkeletonPlaceholder.Item
              width={120}
              height={20}
              marginBottom={6}
            />
            <SkeletonPlaceholder.Item width={200} height={14} />
          </View>
        </View>
      </View>
    </SkeletonPlaceholder>
  );

  const renderSkeleton = () => {
    return (
      <FlatList data={Array(20).fill(null)} renderItem={skeletonItemRender} />
    );
  };
  return (
    <>
      {/* <SearchInput
        placeholder="Search"
        onChange={handleSearch}
        loading={chatsLoading}
      /> */}
      {chatsLoading && !chats ? (
        renderSkeleton()
      ) : (
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
      )}
    </>
  );
};

export default ChatList;
