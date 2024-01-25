/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import palette from '../../theme/palette';
import Header from './header';
import {layoutStyle} from './layoutStyle';
function Layout({children, ...restProps}) {
  const {showHeader = true, header: CustomeHeader} = restProps || {};

  return (
    <View style={{flex: 1, backgroundColor: palette.background.default}}>
      {CustomeHeader && <CustomeHeader />}
      {showHeader && <Header {...restProps} />}
      <View style={{...layoutStyle}}>{children}</View>
    </View>
  );
}

export default Layout;
