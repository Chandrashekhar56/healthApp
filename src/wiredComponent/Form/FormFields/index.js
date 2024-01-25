import {API_URL} from '../../../api/constants';

const groupResponseModifier = data => {
  const newData = data.reduce((acc, item) => {
    acc.push({value: item?.name, _id: item?.id});
    return acc;
  }, []);
  console.log('🚀 ~ file: index.js:8 ~ newData ~ newData:', newData);
  return newData;
};

const memberResponseModifier = data => {
  const newData = data.reduce((acc, item) => {
    acc.push({value: item?.name, _id: item?.id});
    return acc;
  }, []);
  console.log('🚀 ~ file: index.js:8 ~ newData ~ newData:', newData);
  return newData;
};

export const WiredGroupField = ({label, name, filter, code, ...otherInfo}) => ({
  name: name || 'groups',
  label,
  inputType: 'wiredSelect',
  url: API_URL.groupsList,
  labelAccessor: 'name',
  valueAccessor: 'id',
  params: {isActive: true, ...filter},
  code,
  fetchInitial: true,
  cache: false,
  responseModifier: groupResponseModifier,
  ...otherInfo,
});

export const WiredMemberField = ({
  label,
  name,
  filter,
  code,
  ...otherInfo
}) => ({
  name: name || 'members',
  label,
  inputType: 'wiredSelect',
  url: API_URL.groupsList,
  labelAccessor: 'name',
  valueAccessor: 'id',
  params: {isActive: true, ...filter},
  code,
  fetchInitial: true,
  cache: false,
  responseModifier: memberResponseModifier,
  ...otherInfo,
});
