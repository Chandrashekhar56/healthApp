import React from 'react';
import palette from 'src/theme/palette';
import  startCase from 'lodash/startCase';
import { getChipColor } from '../Table/tableChips';
import { Chip as PaperChip } from 'react-native-paper';

const Chip = ({ label, ...restProps }) => (
<PaperChip  {...restProps}>{startCase(label)}</PaperChip>
);

export default Chip;
