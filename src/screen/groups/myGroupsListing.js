/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import palette from '../../theme/palette';
import Typography from '../../components/Typography';
import { RefreshControl, View} from 'react-native';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import {GET_GROUPS_LIST, GET_MY_GROUPS_LIST} from '../../store/types';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import useCRUD from '../../hooks/useCRUD';
import {Card} from 'react-native-paper';
import Image from '../../components/Image';
import {scale, verticalScale} from '../../lib/utils';
import Avatar from '../../components/Avatar';
import CustomButton from '../../components/CustomButton';
import {Icon} from '../../components/icon';
import GroupItemSkeleton from './groupItemSkeleton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {UI_ROUTES} from '../../lib/routeConstants';
import useAuthUser from '../../hooks/useAuthUser';
import {ListEmptyComponent} from '../../components/ListEmptyComponent';
import useQuery from '../../hooks/useQuery';
import FlatList from '../../components/FlatList/FlatList';

const ListEmpty = () => (
  <ListEmptyComponent emptyMessage={'No Groups To Show'} />
);

const MyGroupsListing = props => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [user] = useAuthUser();

  const [
    myGroups,
    myGroupsError,
    myGroupsLoading,
    page,
    ,
    handlePageChange,
    resetList,
  ] = useQuery({
    listId: GET_MY_GROUPS_LIST,
    url: API_URL.groupsList,
    type: REQUEST_METHOD.get,
    queryParams: {_embed: true, user_id: user?.id},
  });

  useFocusEffect(
    React.useCallback(() => {
      // getMyGroups({_embed: true, user_id: user?.id});
    }, []),
  );


  const renderGroupSkeletonList = () => {
    const totalSkeletons = Array(10).fill(null);
    return (
      <FlatList
        data={totalSkeletons}
        renderItem={GroupItemSkeleton}
        ItemSeparatorComponent={<View style={{height: 20}} />}
        keyExtractor={(item, index) => index}
        contentContainerStyle={{
          paddingBottom: verticalScale(30),
          paddingTop: 25,
          ...layoutPadding,
        }}
      />
    );
  };

  const onItemClick = useCallback(
    ({item}) => {
      const {id, _embedded: {user} = {}} = item || {};
      navigation.navigate(UI_ROUTES.groupDetail, {
        id,
        author: user?.[0] || {},
        groupDetail: item,
      });
    },
    [navigation],
  );
  const renderItem = ({item, index}) => {
    // return <GroupItemSkeleton/>
    return (
      <View>
        <Card
          style={{backgroundColor: palette.background.paper}}
          onPress={() => {
            onItemClick({item});
          }}>
          <View style={{position: 'relative'}}>
            {/* Cover Image */}
            <Image
              source={{uri: item.cover_url}}
              style={{
                width: '100%',
                height: 200,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderRadius: 12,
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
              {/* Profile Image */}
              <Image
                source={{uri: item?.avatar_urls?.full}}
                style={{
                  width: scale(400),
                  height: verticalScale(120),
                  borderRadius: 12,
                }}
              />
            </View>
          </View>
          <Card.Content style={{paddingBottom: verticalScale(28)}}>
            <View style={{paddingTop: verticalScale(80), alignItems: 'center'}}>
              <Typography variant={'titleLarge'}>{item?.name}</Typography>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginTop: 6,
                }}>
                <Typography
                  variant={'labelMedium'}
                  style={{color: palette.text.secondary}}>
                  Public
                </Typography>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 50,
                    backgroundColor: palette.text.secondary,
                  }}
                />
                <Typography
                  variant={'labelMedium'}
                  style={{color: palette.text.secondary}}>
                  Club
                </Typography>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: verticalScale(30),
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                <Typography
                  variant={'labelLarge'}
                  style={{color: palette.text.primary}}>
                  Members:
                </Typography>
                <Typography
                  variant={'labelLarge'}
                  style={{color: palette.text.primary}}>
                  {item?.members_count}
                </Typography>
              </View>
              <CustomButton
                icon={'check'}
                label={'Organizer'}
                style={{
                  backgroundColor: palette.background.gray,
                  borderRadius: 12,
                }}
                textColor={palette.text.primary}
              />
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };
  return (
    <View
      style={{
        // ...layoutPadding,
        backgroundColor: palette.background.default,
        flex: 1,
      }}>
      <View style={{flex: 1}}>
        {myGroupsLoading && !myGroups ? (
          renderGroupSkeletonList()
        ) : (
          <FlatList
            data={myGroups?.results}
            renderItem={renderItem}
            ItemSeparatorComponent={<View style={{height: 20}} />}
            contentContainerStyle={{
              paddingBottom: verticalScale(30),
              paddingTop: 25,
              ...layoutPadding,
              ...(myGroups?.results?.length ? {} : {flex: 1}),
            }}
            ListEmptyComponent={ListEmpty}
            error={myGroupsError}
            loading={myGroupsLoading}
            pagination={true}
            page={page}
            totalPages={myGroups?.totalPages}
            handlePageChange={handlePageChange}
            onRefresh={resetList}
          />
        )}
      </View>
    </View>
  );
};

export default MyGroupsListing;
