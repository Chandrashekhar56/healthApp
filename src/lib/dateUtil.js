import moment from 'moment';

const getTimeFromDate = (date, {format = 'hh:mm a'} = {}) => {
  return moment(date).format(format);
};

const getFormattedDate = (
  date,
  {format = 'YYYY-MM-DD', requiredFormat = 'YYYY-MM-DD'} = {},
) => {
  return moment(date, format).format(requiredFormat);
};

export {getTimeFromDate, getFormattedDate};
