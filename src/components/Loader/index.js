import React from 'react';
import { ActivityIndicator, View } from 'react-native-paper';

const LoaderWrapper = (props) => (
  <View {...props} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1301, width: '100%' }} />
);

const CircularLoaderWrapper = (props) => (
  <View {...props} style={{ width: '80%', alignItems: 'center' }} />
);

const LoaderType = {
  circular: (color, restProps) => (
    <CircularLoaderWrapper>
      <ActivityIndicator animating color={color} {...restProps} />
    </CircularLoaderWrapper>
  ),
  fullScreen: (color, restProps) => <FullScreenLoader color={color} {...restProps} />,
  linear: (color, restProps) => (
    <LoaderWrapper>
      <ActivityIndicator animating color={color} {...restProps} />
    </LoaderWrapper>
  ),
};

const Loader = ({
  type = 'linear', color = 'secondary', loading = false, ...restProps
}) => {
  const LoaderComponent = LoaderType[type](color, restProps);
  return loading ? <View>{LoaderComponent}</View> : null;
};

export default Loader;
