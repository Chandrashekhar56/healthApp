import React from 'react';
import { FAB } from 'react-native-paper';
import { Icon } from '../icon';

const FabButton = ({ style, icon, iconSize, ...restProps }) => (
  <FAB
    small
    icon={() => <Icon size={iconSize} icon={icon || 'eva:plus-fill'} />}
    style={{
      height: 38,
      width: 38,
      marginBottom: 4,
      ...style,
    }}
    {...restProps}
  />
);

export default FabButton;
