/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, View} from 'react-native';
import {layoutPadding} from '../../../components/Layout/layoutStyle';
import palette from '../../../theme/palette';
import CourseItemSkeleton from '../coureItemSkeleton';
import SingleCourseItem from './singleCourseItem';
import {ListEmptyComponent} from '../../../components/ListEmptyComponent';
import FlatList from '../../../components/FlatList/FlatList';

const SingleItemCourseList = props => {
  const {
    courses,
    coursesLoading,
    onItemClick = () => {},
    onComponentRefresh = () => {},
    ...rest
  } = props || {};
    console.log("🚀 ~ SingleItemCourseList ~ rest:", rest)

  const renderCourseSkeletonList = () => {
    const totalSkeletons = Array(10).fill(null);
    return (
      <FlatList
        // style={{flex: 1}}
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
        renderItem={CourseItemSkeleton}
        keyExtractor={(item, index) => index}
        data={totalSkeletons || []}
        contentContainerStyle={{
          paddingTop: 25,
          paddingBottom: 30,
          ...layoutPadding,
        }}
      />
    );
  };

  const renderItem = useCallback(
    ({item}) => {
      return <SingleCourseItem item={item} onItemClick={onItemClick} />;
    },
    [onItemClick],
  );

  const onRefresh = () => {
    onComponentRefresh();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: palette.background.default,
        // ...layoutPadding,
      }}>
      {coursesLoading && !courses ? (
        renderCourseSkeletonList()
      ) : (
        <FlatList
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          renderItem={renderItem}
          data={courses?.results || []}
          contentContainerStyle={{
            paddingBottom: 25,
            paddingTop: 25,
            ...layoutPadding,
            ...(!courses?.results?.length ? {flex: 1} : {}),
          }}
          ListEmptyComponent={() => (
            <ListEmptyComponent emptyMessage={'No Items To Show'} />
          )}
          onRefresh={onRefresh}
          {...rest}
        />
      )}
    </View>
  );
};

export default SingleItemCourseList;
