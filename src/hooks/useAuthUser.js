import {useDispatch} from 'react-redux';
import {clearStoreData} from '../store/actions/crud';
import {USER_DETAILS} from '../store/types';
import useCRUD from './useCRUD';
const {API_URL, REQUEST_METHOD} = require('src/api/constants');
const {useEffect} = require('react');

const useAuthUser = () => {
  const dispatch = useDispatch();
  const [
    userData,
    userDataError,
    userDataLoading,
    callUserDataAPI,
    clearUserData,
  ] = useCRUD({
    id: USER_DETAILS,
    url: API_URL.userDetail,
    type: REQUEST_METHOD.get,
  });

  // useEffect(() => {
  //   callUserDataAPI();
  // }, []);

  useEffect(() => {
    if (userDataError) {
      dispatch(clearStoreData());
    }
  }, [userDataError]);

  return [
    userData,
    userDataError,
    userDataLoading,
    callUserDataAPI,
    clearUserData,
  ];
};
export default useAuthUser;
