const alpha = (color, alphaValue) => {
  // Convert alphaValue to a valid range between 0 and 1.
  const clampedAlpha = Math.min(1, Math.max(0, alphaValue));

  // Extract the RGB values from the hex color.
  const hexColor = color.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (m, r, g, b) => '#' + r + r + g + g + b + b,
  );

  const bigint = parseInt(hexColor.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Return the color with adjusted transparency.
  return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
};

// ----------------------------------------------------------------------

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#f0f0f0',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#9D9D9D',
  700: '#454F5B',
  800: '#303030',
  900: '#161C24',
  1000: '#84818A',
};

const PRIMARY = {
  lighter: '#D1E9FC',
  light: '#76B0F1',
  main: '#07B2FB',
  dark: '#029cde',
  darker: '#061B64',
  contrastText: '#fff',
};

const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#fff',
};

const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff',
  paleRed: '#FFCACA',
  dimGray: '#636363',
};

const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[800],
};

const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#fff',
};

const palette = {
  common: {black: '#000', white: '#fff', icon: '#636363'},
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: 'rgb(74, 69, 78)',
    secondary: GREY[600],
    disabled: GREY[500],
    dark: '#000',
    main: '#f1a08f',
    paper:'#fff',
  },
  background: {
    paper: '#fff',
    main: '#f1a08f',
    default: GREY[100],
    neutral: GREY[200],
    offWhite: GREY[300],
    accentBlue: '#EAF0F7',
    lightRed: '#f1a08f',
    appleGreen: '#34B239',
    pizazz: '#FF9500',
    pomegranate: '#EF3030',
    mediumPurple: '#9F47E3',
    transparent: '#fff0',
    dark: '#000',
    gray: '#dadce0',
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
  pageHeader: {
    titleColor: '#18395E',
  },
  appointmentStatus: {
    Missed: '#ff0000',
    Confirmed: '#34B239',
    'Pending Confirmation': '#ffc0cb',
    Cancelled: '#0000ff',
    'Check In': '#FF9500',
    Completed: '#808080',
    'Ready For Practitioner': '#808000',
    'Waiting Room': '#800080',
  },
  bmiCategory: {
    Underweight: '#FF9500',
    Normal: '#34B239',
    Overweight: '#ff0000',
    Obesity: '#8c0404',
  },
};

export default palette;
