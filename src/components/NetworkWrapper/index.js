import {useNetInfoInstance} from '@react-native-community/netinfo';
import NoInternet from './noInternet';

const NetworkWrapper = ({children} = {}) => {
  const {
    netInfo: {type, isConnected},
    refresh,
  } = useNetInfoInstance();

  if (isConnected === false) {
    return <NoInternet />;
  }
  return children;
};

export default NetworkWrapper;
