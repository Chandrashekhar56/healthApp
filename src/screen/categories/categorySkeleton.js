import React from 'react'
import { View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

function CategorySkeleton() {
  return (
    <SkeletonPlaceholder>
        <View style={{flexDirection: 'column', paddingTop: 30, width:80,borderRadius:12}}></View>
      </SkeletonPlaceholder>
  )
}

export default CategorySkeleton