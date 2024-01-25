/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {API_URL, REQUEST_METHOD} from '../../../api/constants';
import ActionButton from '../../../components/CustomButton/actionButton';
import Header from '../../../components/Layout/header';
import {layoutPadding} from '../../../components/Layout/layoutStyle';
import {ListEmptyComponent} from '../../../components/ListEmptyComponent';
import Typography from '../../../components/Typography';
import {Icon} from '../../../components/icon';
import useCRUD from '../../../hooks/useCRUD';
import {scale, verticalScale} from '../../../lib/utils';
import {GET_GROUP_MEMBERS, GET_GROUP_ORGANIZERS} from '../../../store/types';
import palette from '../../../theme/palette';
import MembersItem from '../members/membersItem';
import GroupDetailSkeleton from './groupDetailSkeleton';
import Image from '../../../components/Image';
import {useNavigation} from '@react-navigation/native';
import {UI_ROUTES} from '../../../lib/routeConstants';
import FlatList from '../../../components/FlatList/FlatList';
import useQuery from '../../../hooks/useQuery';

const GroupDetail = props => {
  const {route: {params = {}} = {}} = props || {};
  const {id, author, groupDetail} = params || {};
  const navigation = useNavigation();

  const [
    groupMembers,
    groupMembersError,
    groupMembersLoading,
    groupMembersPage,
    ,
    handleGroupMembersPageChange,
    resetGroupMembersList,
  ] = useQuery({
    listId: `${GET_GROUP_MEMBERS}-${id}`,
    url: `${API_URL.groupsList}/${id}/members`,
    type: REQUEST_METHOD.get,
  });

  const [
    groupOrganizers,
    groupOrganizersError,
    groupOrganizersLoading,
    groupOrganizersPage,
    ,
    handleGroupOrganizersPageChange,
    resetGroupOrganizersList,
  ] = useQuery({
    listId: `${GET_GROUP_ORGANIZERS}-${id}`,
    url: `${API_URL.groupsList}/${id}/members`,
    type: REQUEST_METHOD.get,
    queryParams: {roles: 'admin'},
  });

  const renderItem = props => {
    return <MembersItem {...props} navigation={navigation} />;
  };

  const RenderList = useCallback(
    ({
      data = [],
      contentContainerStyle = {},
      style = {},
      skeletonSize = 1,
      emptyMessage = 'No Items',
      ...rest
    } = {}) => {
      if (!groupMembers && groupMembersLoading) {
        return <GroupDetailSkeleton data={Array(skeletonSize).fill(null)} />;
      }
      return (
        <FlatList
          ItemSeparatorComponent={<View style={{height: 20}} />}
          data={data?.results}
          renderItem={renderItem}
          keyExtractor={(item, index) => item?.id || index}
          style={{...style}}
          contentContainerStyle={{
            paddingTop: verticalScale(16),
            ...contentContainerStyle,
          }}
          ListEmptyComponent={() => (
            <ListEmptyComponent emptyMessage={emptyMessage} />
          )}
          {...rest}
        />
      );
    },
    [groupMembers, groupMembersLoading],
  );

  const actions = [
    {iconName: 'users', name: 'Follow', action: () => {}},
    {
      iconName: 'comments',
      name: 'Discussion',
      action: () => {
        navigation.navigate(UI_ROUTES.groupDiscussions, {
          groupDetail,
        });
      },
    },
    {iconName: 'share-alt', name: 'Share', action: () => {}},
  ];
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: palette.background.default,
        position: 'relative',
      }}>
      <View style={{position: 'relative'}}>
        <Header containerStyle={{position: 'absolute', zIndex: 1}} />
        <View style={{position: 'relative'}}>
          <Image
            source={{uri: groupDetail.cover_url}}
            style={{
              width: '100%',
              height: 250,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              // borderRadius: 12,
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: verticalScale(-60),
              left: '50%',
              transform: [{translateX: -scale(200)}], // Move back by half of width
              width: scale(400),
            }}>
            <Image
              source={{uri: groupDetail?.avatar_urls?.full}}
              style={{
                width: scale(400),
                height: verticalScale(120),
                borderRadius: 12,
              }}
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: scale(200),
            marginBottom: verticalScale(20),
            ...layoutPadding,
          }}>
          <View style={{marginTop: verticalScale(10)}}>
            <View>
              <Typography variant="titleLarge" style={{textAlign: 'center'}}>
                {groupDetail?.name}
              </Typography>
            </View>
            <View style={{marginTop: verticalScale(5)}}>
              <Typography variant="bodyMedium" style={{textAlign: 'justify'}}>
                {groupDetail?.description?.raw}
              </Typography>
            </View>
          </View>
          <View
            style={{
              marginTop: verticalScale(20),
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 30,
              flexWrap: 'wrap',
            }}>
            {actions.map(item => (
              <ActionButton
                key={item?.name}
                style={{
                  borderRadius: 12,
                  paddingHorizontal: 10,
                  paddingVertical: 14,
                  width: scale(350),
                }}
                onPress={item?.action}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5,
                  }}>
                  <Icon
                    name={item?.iconName}
                    color={palette.text.paper}
                    size={18}
                  />
                  <Typography style={{color: palette.text.paper}}>
                    {item?.name}
                  </Typography>
                </View>
              </ActionButton>
            ))}
          </View>
        </View>
      </View>
      <View>
        <View
          style={{
            backgroundColor: palette.background.gray,
            paddingVertical: verticalScale(14),
            ...layoutPadding,
          }}>
          <Typography variant="labelLarge">Organizers</Typography>
        </View>
        <RenderList
          data={groupOrganizers}
          contentContainerStyle={{paddingBottom: verticalScale(16)}}
          skeletonSize={1}
          emptyMessage={'No Organizers'}
          loading={groupOrganizersLoading}
          pagination={true}
          page={groupOrganizersPage}
          totalPages={groupOrganizers?.totalPages}
          handlePageChange={handleGroupOrganizersPageChange}
          error={groupOrganizersError}
        />
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: palette.background.gray,
            paddingVertical: verticalScale(14),
            ...layoutPadding,
          }}>
          <Typography variant="labelLarge">Members</Typography>
        </View>
        <RenderList
          data={groupMembers}
          contentContainerStyle={{paddingBottom: verticalScale(208), flex: 1}}
          skeletonSize={10}
          style={{flex: 1}}
          emptyMessage={'No Members'}
          loading={groupMembersLoading}
          pagination={true}
          page={groupMembersPage}
          totalPages={groupMembers?.totalPages}
          handlePageChange={handleGroupMembersPageChange}
          error={groupMembersError}
        />
      </View>
    </ScrollView>
  );
};
export default GroupDetail;
