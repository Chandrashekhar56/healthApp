import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import palette from 'src/theme/palette';

dayjs.extend(utc);
dayjs.extend(timezone);

const contentType = {
  MULTIPART: 'multipart',
};

const DRAWER_WIDTH = 236;
const HEADER_MOBILE = 54;
const HEADER_DESKTOP = 62;
// validations

const inputLength = {
  firstName: {value: 50},
  name: {value: 128},
  email: {value: 300},
  commonTextLength: {value: 300},
  amountLength: {value: 6},
  textArea: {value: 1000},
};

const Regex = {
  firstName: /^[a-zA-Z-' ]+$/,
  name: /^[a-zA-Z-' ]+$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  number: /^[0-9]+$/i,
  onlyAlphabet: /^[A-Za-z ]+$/i,
  textArea: /^[\w\-.@#!?,$/ \n()]+$/,
  commonText: /^[ A-Za-z0-9_@./#&+,-\s]*$/,
  alphanumeric: /^[a-zA-Z0-9_' ]+$/,
  noHtmlTagRegex: /^(?!.*<[^>]+>)(?!.*&[#\w]+;)[^<>]*$/i,
  numberDec: /^\d+(\.\d*)?$/,
  postalCode: /^[0-9-]+$/,
  alphabetAndSpaces: /^[A-Za-z\s]+$/,
};
const regName = Regex.name;

const alphanumericPattern = Regex.alphanumeric;

const regexAlphanumeric = {
  value: alphanumericPattern,
  message: ' should be alphabet, special symbols are not allowed',
};

const emailValidatorPattern = {
  value: Regex.email,
  message: 'Please enter valid Email',
};
const onlyAlphabet = {
  value: Regex.onlyAlphabet,
  message: 'Please enter only alphabet',
};

const noHtmlTagPattern = {
  value: Regex.noHtmlTagRegex,
  message: 'Invalid characters used. Please remove <  or > and try again',
};

const requiredField = {value: true};
const onlyNumber = {value: Regex.number, message: ' should be numeric'};
const regDecimal = {
  value: Regex.numberDec,
  message: ' should be numeric/decimal',
};
const regFirstname = {
  value: Regex.firstName,
  message: ' should be alphabet',
};
const regexName = {
  value: regName,
  message: ' should be alphabet, special symbols are not allowed',
}; // patient name, staff name
const regEmail = {
  value: Regex.email,
  message: 'Invalid Email',
};

const regTextArea = {
  value: Regex.textArea,
  message: 'Invalid character',
};

const regPassword = {
  value:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#^().])[A-Za-z\d@$!%*?&_#^().]{8,}$/,
  message:
    'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and has a minimum length of 8 characters.',
};

const regexCommonText = {
  value: Regex.commonText,
  message: ' special character not allowed',
}; // servicename, clinicename, templatename, emailsubject, mastername, description,

const maxLength = (name, value = 10) => ({
  value,
  message: `${name} cannot be longer than ${value} characters`,
});

const regMobile = {value: /^[0-9]+$/i, message: 'Invalid Number'};

const regexUrl = {
  value: /^(ftp|http|https):\/\/[^ "]+$/,
  message: 'Invalid Url',
};

const minDOB = dayjs().subtract(125, 'year');

const genders = {
  male: {
    label: 'Male',
    value: 'male',
  },
  female: {
    label: 'Female',
    value: 'female',
  },
  other: {
    label: 'Other',
    value: 'other',
  },
};

const dateFormats = {
  YYYYMMDD: 'YYYY-MM-DD',
  MMDDYYYY: 'MM-DD-YYYY',
  YYYDDMMHHMMSS: 'YYYY-MM-DDThh:mm:ss.sssZ',
  MMMDDYYYYHHMMSS: 'MMM DD, YYYY hh:mm A',
  MMMDDHHMMa: 'MMM DD hh:mm A',
  YYYYMMMDDDTHHmmssZ: 'YYYY-MM-DDTHH:mm:ss.sssZ',
};

const timeFormats = {
  HHmm: 'HH:mm',
  hhmma: 'hh:mm a',
};

const mobileWidth = '(max-width:600px)';

const chatStatus = {
  PENDING: 'pendding',
  SENT: 'sent',
  SENDING: 'sending',
};

const quizQuestionTypes = {
  SINGLE: 'single',
  MULTIPLE: 'multiple',
};

const progressStatus = {
  COMPLETED: 'completed',
  NOT_STARTED: 'not-started',
  IN_PROGRESS: 'in-progress',
};

export {
  emailValidatorPattern,
  contentType,
  onlyAlphabet,
  requiredField,
  onlyNumber,
  regDecimal,
  minDOB,
  regName,
  regexName,
  regFirstname,
  regEmail,
  regTextArea,
  regexCommonText,
  regMobile,
  regPassword,
  regexAlphanumeric,
  noHtmlTagPattern,
  maxLength,
  chatStatus,
  quizQuestionTypes,
  progressStatus,
};
