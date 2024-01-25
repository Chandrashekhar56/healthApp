import SliderMUI from '@mui/material/Slider';

const Slider = ({...props }) => (
    <SliderMUI
      valueLabelDisplay="auto"
      {...props}
    />
);

export default Slider;
