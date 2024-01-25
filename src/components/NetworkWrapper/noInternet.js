import React, {useEffect} from 'react';
import {Image} from 'react-native';
import Typography from '../Typography';
import {Surface} from 'react-native-paper';
import palette from '../../theme/palette';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import noInterNetImage from '../../assets/images/noInternet.png';
function NoInternet() {
  useEffect(() => {
    setTimeout(() => {
      LottieSplashScreen.hide();
    }, 0);
  }, []);
  return (
    <Surface
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: palette.background.paper,
      }}>
      <Image
        source={noInterNetImage}
        style={{width: '100%', height: 400, objectFit: 'contain'}}
      />
      <Typography variant="headlineLarge" style={{marginTop: 30}}>
        No Internet Connected
      </Typography>
    </Surface>
  );
}

export default NoInternet;
