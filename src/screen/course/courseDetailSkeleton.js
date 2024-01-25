import React from 'react';
import {ScrollView, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Surface, Typography} from 'react-native-paper';
import Header from '../../components/Layout/header';
import {verticalScale} from '../../lib/utils';
import palette from '../../theme/palette';

const CourseDetailsSkeleton = () => {
  return (
    <Surface
      style={{
        flex: 1,
        backgroundColor: palette.background.default,
        position: 'relative',
      }}>
      <ScrollView>
        <View>
          <SkeletonPlaceholder>
            <View style={{width: '100%', height: verticalScale(450)}} />
          </SkeletonPlaceholder>
          <View style={{padding: 20, paddingTop: verticalScale(20)}}>
            <SkeletonPlaceholder>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                <View
                style={{width:'80%'}}
                ><View style={{width: '100%', height: 20,marginBottom:5}} />
                <View style={{width: '100%', height: 20}} />
                </View>

                <View style={{width: 30, height: 30, borderRadius: 15}} />
              </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: verticalScale(20),
                }}>
                <View style={{flexDirection: 'column', gap: verticalScale(5)}}>
                  <View style={{width: 90, height: 20}} variant="labelMedium">
                    Duration
                  </View>
                  <View style={{width: 70, height: 20}} variant="labelLarge">
                    3 min
                  </View>
                </View>
                <View style={{flexDirection: 'column', gap: verticalScale(5)}}>
                  <View style={{width: 90, height: 20}} variant="labelMedium">
                    Type
                  </View>
                  <View style={{width: 60, height: 20}} variant="labelLarge">
                    Snock
                  </View>
                </View>
                <View style={{flexDirection: 'column', gap: verticalScale(5)}}>
                  <View style={{width: 90, height: 20}} variant="labelMedium">
                    Level
                  </View>
                  <View style={{width: 50, height: 20}} variant="labelLarge">
                    Entry
                  </View>
                </View>
              </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <View style={{paddingTop: verticalScale(30)}}>
                <View
                  style={{width: '100%', height: 20, marginBottom: 10}}
                  variant="bodyLarge"
                  numberOfLines={3}
                />
                <View
                  style={{width: '100%', height: 20, marginBottom: 10}}
                  variant="bodyLarge"
                  numberOfLines={3}
                />
                <View
                  style={{width: '80%', height: 20, marginBottom: 10}}
                  variant="bodyLarge"
                  numberOfLines={3}
                />
              </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <View
                style={{alignItems: 'center', paddingTop: verticalScale(30)}}>
                <View style={{width: 300, height: 60, borderRadius: 12}} />
              </View>
            </SkeletonPlaceholder>
          </View>
        </View>
      </ScrollView>
    </Surface>
  );
};

export default CourseDetailsSkeleton;
