/* eslint-disable react-native/no-inline-styles */
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import { RefreshControl, View} from 'react-native';
import {Card} from 'react-native-paper';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import CustomButton from '../../components/CustomButton';
import Image from '../../components/Image';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import Typography from '../../components/Typography';
import useCRUD from '../../hooks/useCRUD';
import {UI_ROUTES} from '../../lib/routeConstants';
import {scale, verticalScale} from '../../lib/utils';
import {GET_GROUPS_LIST} from '../../store/types';
import palette from '../../theme/palette';
import GroupItemSkeleton from './groupItemSkeleton';
import {ListEmptyComponent} from '../../components/ListEmptyComponent';
import useQuery from '../../hooks/useQuery';
import FlatList from '../../components/FlatList/FlatList';

const ListEmpty = () => (
  <ListEmptyComponent emptyMessage={'No Groups To Show'} />
);

const AllGroupsListing = props => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const [
    groups,
    groupsError,
    groupsLoading,
    page,
    ,
    handlePageChange,
    resetList,
  ] = useQuery({
    listId: GET_GROUPS_LIST,
    url: API_URL.groupsList,
    type: REQUEST_METHOD.get,
    queryParams: {_embed: true},
  });
  useFocusEffect(
    React.useCallback(() => {
      // getGroups({_embed: true});
    }, []), // Empty dependency array to mimic the behavior of componentDidMount
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
        {groupsLoading && !groups ? (
          renderGroupSkeletonList()
        ) : (
          <FlatList
            data={groups?.results}
            renderItem={renderItem}
            ItemSeparatorComponent={<View style={{height: 20}} />}
            contentContainerStyle={{
              paddingBottom: verticalScale(30),
              paddingTop: 25,
              ...layoutPadding,
              ...(groups?.results?.length ? {} : {flex: 1}),
            }}
            ListEmptyComponent={ListEmpty}
            error={groupsError}
            loading={groupsLoading}
            pagination={true}
            page={page}
            totalPages={groups?.totalPages}
            handlePageChange={handlePageChange}
            onRefresh={resetList}
          />
        )}
      </View>
    </View>
  );
};

export default AllGroupsListing;
