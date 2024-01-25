/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import Typography from '../../../components/Typography';
import FastImage from '../../../components/Image';
import persionOne from '../../../assets/images/chatFour.jpg';
import {Icon, IconButton} from '../../../components/icon';
import palette from '../../../theme/palette';
import {layoutPadding} from '../../../components/Layout/layoutStyle';
import {scale, verticalScale} from '../../../lib/utils';
import Header from '../../../components/Layout/header';
import CustomButton from '../../../components/CustomButton';
import AddCommentModal from './addCommentModal';
import isEmpty from 'lodash/isEmpty';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {ListEmptyComponent} from '../../../components/ListEmptyComponent';
import {GET_COMMENTS, GET_GROUPS_DISCUSSION_LIST} from '../../../store/types';
import {API_URL, REQUEST_METHOD} from '../../../api/constants';
import useCRUD from '../../../hooks/useCRUD';
import useQuery from '../../../hooks/useQuery';
import FlatList from '../../../components/FlatList/FlatList';

const listEmptyComponent = () => (
  <ListEmptyComponent emptyMessage={'No Replies Yet !'} />
);
const CommentSkeleton = () => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item
      flexDirection="row"
      alignItems="center"
      margin={20}>
      <SkeletonPlaceholder.Item width={50} height={50} borderRadius={50} />
      <SkeletonPlaceholder.Item marginLeft={20}>
        <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
        <SkeletonPlaceholder.Item
          marginTop={6}
          width={80}
          height={20}
          borderRadius={4}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

const Comment = ({comment, onReplyPress}) => {
  const commnetUser = comment?._embedded?.user?.[0] || {};
  return (
    <View style={{paddingHorizontal: scale(30)}}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          marginBottom: 10,
        }}>
        <View
          style={{
            borderLeftWidth: 2,
            borderColor: 'gray',
            height: '100%',
            marginRight: 8,
            borderStyle: 'dashed',
          }}
        />
        <View
          style={{
            flex: 1,
            paddingVertical: 10,
            paddingHorizontal: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                flex: 1,
              }}>
              <FastImage
                source={{uri: commnetUser?.avatar_urls?.thumb}}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}
              />
              <View style={{flex: 1}}>
                <Typography
                  variant="labelLarge"
                  style={{flexWrap: 'wrap', flex: 1}}>
                  {commnetUser.name}
                </Typography>
                <Typography
                  variant="bodyMedium"
                  style={{flexWrap: 'wrap', flex: 1}}>
                  {comment.short_content}
                </Typography>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <IconButton
                size={18}
                name="reply"
                style={{
                  backgroundColor: palette.background.gray,
                }}
                onPress={() =>
                  onReplyPress({
                    replyId: comment?.id,
                    replyUserName: commnetUser?.name,
                    tagLine: comment?.text,
                  })
                }
              />
              {/* <IconButton size={18} name="ellipsis-vertical" /> */}
            </View>
          </View>
          <FlatList
            data={comment.replies}
            renderItem={({item}) => (
              <Comment comment={item} onReplyPress={onReplyPress} />
            )}
          />
        </View>
      </View>
    </View>
  );
};

const CommentSection = props => {
  const {route: {params = {}} = {}} = props || {};
  const {fourmDetail} = params || {};
  console.log('🚀 ~ CommentSection ~ fourmDetail:', fourmDetail);
  const {id: fourmId} = fourmDetail || {};
  const fourmUser = fourmDetail?._embedded?.user?.[0] || {};
  const [selectedReply, setSelectedReply] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const [
    comments,
    commentsError,
    commentsLoading,
    page,
    ,
    handlePageChange,
    resetList,
  ] = useQuery({
    listId: `${GET_COMMENTS}-${fourmId}`,
    url: API_URL.getComments,
    type: REQUEST_METHOD.get,
    queryParams: {
      parent: fourmId,
      _embed: true,
      orderby: ['date'],
      order: 'asc',
    },
  });

  const fetchComments = () => {
    resetList();
  };

  useEffect(() => {
    setRefreshing(false);
  }, [comments]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchComments();
  };
  const onReplyPress = replyItem => {
    setSelectedReply(replyItem);
  };
  const handleClose = ({refetch} = {}) => {
    setSelectedReply({});
    if (refetch) {
      onRefresh();
    }
  };
  return (
    <>
      <ScrollView
        style={{backgroundColor: palette.background.default, flex: 1}}
        contentContainerStyle={comments?.length ? {} : {flex: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Header />
        <View style={{...layoutPadding}}>
          <View style={{gap: 10, marginTop: verticalScale(4)}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Typography variant="headlineLarge">
                  {fourmDetail?.title?.raw}
                </Typography>
              </View>
              {fourmDetail?.sticky && (
                <View>
                  <Icon name="thumb-tack" />
                </View>
              )}
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 30,
                }}>
                <Typography
                  variant="bodyLarge"
                  style={{flex: 1, flexWrap: 'wrap'}}>
                  {fourmDetail?.short_content}
                </Typography>
                <View>
                  <CustomButton
                    label={'Reply'}
                    onPress={() => {
                      onReplyPress({
                        replyId: 123,
                        replyUserName: fourmUser?.name,
                        tagLine: fourmDetail?.short_content,
                      });
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', gap: 10}}>
              {!!fourmDetail?.topic_tags &&
                fourmDetail?.topic_tags?.split(',').map(item => {
                  return (
                    <View style={{flexDirection: 'row', gap: 8}} key={item}>
                      <Icon name="tag" />
                      <Typography variant="bodyMedium">
                        {item.trim()}
                      </Typography>
                    </View>
                  );
                })}
            </View>
          </View>
          <View
            style={{
              marginTop: verticalScale(20),
              marginBottom: verticalScale(14),
            }}>
            <Typography variant="titleLarge">All Replies</Typography>
          </View>
        </View>
        <View style={{...layoutPadding, flex: 1}}>
          {commentsLoading && !comments ? (
            <FlatList
              data={Array(10).fill(null)}
              renderItem={CommentSkeleton}
            />
          ) : (
            <FlatList
              data={comments?.results || []}
              renderItem={({item}) => (
                <Comment comment={item} onReplyPress={onReplyPress} />
              )}
              contentContainerStyle={comments?.results?.length ? {} : {flex: 1}}
              ListEmptyComponent={listEmptyComponent}
              error={commentsError}
              loading={commentsLoading}
              pagination={true}
              page={page}
              totalPages={comments?.totalPages}
              handlePageChange={handlePageChange}
              onRefresh={resetList}
            />
          )}
        </View>
      </ScrollView>
      {!isEmpty(selectedReply) && (
        <AddCommentModal
          selectedReply={selectedReply}
          handleClose={handleClose}
          setSelectedReply={setSelectedReply}
          topic_id={fourmId}
        />
      )}
    </>
  );
};

export default CommentSection;
