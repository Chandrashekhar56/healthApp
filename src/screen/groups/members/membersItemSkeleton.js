import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

function MembersItemSkeleton({item, index}) {
  return (
    <SkeletonPlaceholder>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <View style={{height: 70, width: 70, borderRadius: 50}} />
          <View>
            <View style={{width: 50, height: 10,marginBottom:10}} />
            <View style={{width: 80, height: 10}} />
          </View>
        </View>
        <View>
          <View
            style={{
              borderRadius: 50,
              height: 30,
              width: 30,
              backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
}

export default MembersItemSkeleton;
