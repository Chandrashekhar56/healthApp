import {scale} from '../../lib/utils';
import palette from '../../theme/palette';

export const layoutPaddingLeft = scale(80);
export const layoutPaddingRight = scale(80);
export const layoutPadding = {
  paddingLeft: layoutPaddingLeft,
  paddingRight: layoutPaddingRight,
};

export const layoutStyle = {
  flex: 1,
  backgroundColor: palette.background.default,
  ...layoutPadding,
};
