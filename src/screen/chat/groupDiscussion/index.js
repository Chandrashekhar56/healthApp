/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import { View} from 'react-native';
import Typography from '../../../components/Typography';
import palette from '../../../theme/palette';
import {layoutPadding} from '../../../components/Layout/layoutStyle';
import Header from '../../../components/Layout/header';
import defaultAvatar from '../../../assets/images/defaultAvatar.png';
import {TouchableRipple} from 'react-native-paper';
import FastImage from '../../../components/Image';
import {Icon} from '../../../components/icon';
import {useNavigation} from '@react-navigation/native';
import {UI_ROUTES} from '../../../lib/routeConstants';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {verticalScale} from '../../../lib/utils';
import useCRUD from '../../../hooks/useCRUD';
import {GET_GROUPS_DISCUSSION_LIST} from '../../../store/types';
import {API_URL, REQUEST_METHOD} from '../../../api/constants';
import RenderHTML from 'react-native-render-html';
import isEmpty from 'lodash/isEmpty';
import CustomButton from '../../../components/CustomButton';
import AddDiscussionModal from './addDiscussionModal';
import {ListEmptyComponent} from '../../../components/ListEmptyComponent';
import useQuery from '../../../hooks/useQuery';
import FlatList from '../../../components/FlatList/FlatList';

const listEmptyComponent = () => (
  <ListEmptyComponent emptyMessage={'No Discussion Started Yet !'} />
);
const GroupDiscussions = props => {
  const {route: {params = {}} = {}} = props || {};
  const {groupDetail} = params || {};
  const {forum} = groupDetail || {};
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [
    discussionList,
    discussionError,
    discussionListLoading,
    page,
    ,
    handlePageChange,
    resetList,
  ] = useQuery({
    listId: `${GET_GROUPS_DISCUSSION_LIST}-${forum}`,
    url: API_URL.groupDiscussionList,
    type: REQUEST_METHOD.get,
    queryParams: {parent: forum, _embed: true},
  });

  const handleClose = ({refetch} = {}) => {
    if (refetch) {
      resetList();
    }
    setShowModal(false);
  };
  const handleGroupItemClick = ({item, index}) => {
    navigation.navigate(UI_ROUTES.commentSection, {
      fourmDetail: item,
    });
  };

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
  const renderItem = ({item, index}) => {
    const {title = {}, avatar, sticky} = item || {};
    return (
      <TouchableRipple onPress={() => handleGroupItemClick({item, index})}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            gap: 10,
            ...layoutPadding,
          }}>
          <View style={{position: 'relative'}}>
            <FastImage
              source={defaultAvatar}
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
              }}
            />
            {sticky && (
              <View style={{position: 'absolute', right: 0}}>
                <Icon name="thumb-tack" />
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              // marginTop: 5,
              justifyContent: 'space-between',
              flex: 1,
              alignItems: 'center',
            }}>
            <View>
              <Typography>{title?.raw || title?.rendered}</Typography>
            </View>
          </View>
        </View>
      </TouchableRipple>
    );
  };

  return (
    <>
      <View style={{backgroundColor: palette.background.default, flex: 1}}>
        <Header />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            ...layoutPadding,
          }}>
          <View>
            <Typography variant="titleLarge">All Discussions</Typography>
          </View>
          <View>
            <CustomButton
              label={'Add Discussion'}
              onPress={() => setShowModal(true)}
            />
          </View>
        </View>
        <View style={{flex: 1, marginTop: verticalScale(20)}}>
          {discussionListLoading && isEmpty(discussionList) ? (
            renderSkeleton()
          ) : (
            <FlatList
              data={discussionList?.results || []}
              renderItem={renderItem}
              ListEmptyComponent={listEmptyComponent}
              contentContainerStyle={
                discussionList?.results?.length ? {} : {flex: 1}
              }
              error={discussionError}
              loading={discussionListLoading}
              pagination={true}
              page={page}
              totalPages={discussionList?.totalPages}
              handlePageChange={handlePageChange}
              onRefresh={resetList}
            />
          )}
        </View>
      </View>
      {showModal && (
        <AddDiscussionModal handleClose={handleClose} forum={forum} />
      )}
    </>
  );
};

export default GroupDiscussions;
