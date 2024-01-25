import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import palette from '../../theme/palette';

const AppLoading = ({containerStyle={},animationStyle={}}={}) => {
  return (
    <View style={{...styles.container,...containerStyle}}>
      <LottieView
        source={require('../../assets/json/appLoadingAnimation.json')}
        autoPlay
        loop
        style={{...styles.animationStyle,...animationStyle}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:palette.background.transparent,
    },
    animationStyle: {
      height: '100%',
      width: '100%',
    },
  });

export default AppLoading;
