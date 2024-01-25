import { View } from 'react-native';

const {default: AppLoading} = require('../../screen/loading/appLoading');

const SplashScreen = () => {
  return (
    <View style={{flex: 1}}>
      <AppLoading />
    </View>
  );
};

export default SplashScreen