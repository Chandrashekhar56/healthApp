import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Card} from 'react-native-paper';
import palette from '../../theme/palette';
import {scale} from '../../lib/utils';

const CourseItemSkeleton = () => {
  return (
    <View
      style={{
        backgroundColor: palette.background.neutral,
        borderRadius: 12,
        paddingBottom: 20,
      }}>
      <SkeletonPlaceholder>
        <View style={{flexDirection: 'column'}}>
          <Card>
            <Card.Cover
              style={{
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                width: '100%',
                height: 200, // Adjust the height based on your design
              }}
            />
            <View
              style={{
                paddingTop: 8,
                backgroundColor: palette.background.default,
                borderRadius: 12,
                flexDirection: 'column',
                paddingHorizontal:16,
              }}>
              <View style={{marginBottom: 12}}>
                <View
                  style={{width: scale(800), height: 20, borderRadius: 4}}
                />
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <View style={{width: 20, height: 20, borderRadius: 4}} />
                <View style={{width: 60, height: 20, borderRadius: 4}} />
              </View>
            </View>
          </Card>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default CourseItemSkeleton;
