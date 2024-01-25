import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Icon} from '../../../components/icon';
import palette from '../../../theme/palette';

const AccordionSkeletonRenderer = () => {
  return (
    <SkeletonPlaceholder>
      <View style={{width: '70%', height: 20}} />
    </SkeletonPlaceholder>
  );
};

export default AccordionSkeletonRenderer;
