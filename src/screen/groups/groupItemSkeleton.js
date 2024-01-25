/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale, verticalScale} from '../../lib/utils';
import palette from '../../theme/palette';

const GroupItemSkeleton = () => {
  return (
    <View
      style={{backgroundColor: palette.background.neutral, borderRadius: 12}}>
      <SkeletonPlaceholder>
        <View>
          <View>
            <View style={{position: 'relative'}}>
              {/* Cover Image */}
              <View
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
                <View
                  style={{
                    width: scale(400),
                    height: verticalScale(120),
                    borderRadius: 12,
                  }}
                />
              </View>
            </View>
            <View
              style={{paddingBottom: verticalScale(28), paddingHorizontal: 16}}>
              <View
                style={{paddingTop: verticalScale(80), alignItems: 'center'}}>
                <View variant={'titleLarge'} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                    marginTop: 6,
                  }}>
                  <View
                    variant={'labelMedium'}
                    style={{width: 40, height: 10}}
                  />
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 50,
                    }}
                  />
                  <View
                    variant={'labelMedium'}
                    style={{width: 40, height: 10}}
                  />
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
                  <View style={{width: 40, height: 20}} />
                  <View style={{width: 20, height: 20}} />
                </View>
                <View
                  icon={'check'}
                  label={'Organizer'}
                  style={{
                    borderRadius: 12,
                    width: 100,
                    height: 50,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default GroupItemSkeleton;
