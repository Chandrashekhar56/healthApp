/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {verticalScale} from '../../../lib/utils';
import {FlatList, View} from 'react-native';
import MembersItemSkeleton from '../members/membersItemSkeleton';
import {layoutPadding} from '../../../components/Layout/layoutStyle';

function GroupDetailSkeleton({data}={}) {
  const renderItem = props => {
    return <MembersItemSkeleton {...props} />;
  };
  return (
    <FlatList
      ItemSeparatorComponent={<View style={{height: 20}} />}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
      contentContainerStyle={{
        paddingVertical: verticalScale(16),
        ...layoutPadding,
      }}
    />
  );
}

export default GroupDetailSkeleton;
