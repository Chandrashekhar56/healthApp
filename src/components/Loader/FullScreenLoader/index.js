import { CircularProgress, Modal } from '@mui/material';
import Box from '../../Box';

import './FullScreenLoader.scss';

const FullScreenLoader = ({ color }) => (
  <Modal open>
    <Box className="loader_container">
      <CircularProgress color={color} disableShrink />
    </Box>
  </Modal>
);

export default FullScreenLoader;
