import {useCallback, useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {REQUEST_METHOD} from 'src/api/constants';
import {subscribe, unsubscribe} from 'src/lib/socket';
import {v4} from 'uuid';
import isEmpty from 'lodash/isEmpty';
import {setSocketReadData} from 'src/store/actions/socket';
import {showSnackbar} from '../lib/utils';
import {
  requestRead,
  requestCreate,
  requestUpdate,
  clearData,
  requestDelete,
  clearReadData,
  requestCreateWithDebounce,
  setReadData,
} from '../store/actions/crud';
import {errorMessage} from '../lib/errorConstants';

export default function useCRUD({
  id,
  url,
  type = REQUEST_METHOD.post,
  shouldClearError = true,
  responseModifier,
  subscribeSocket,
  handleSocketData,
  page,
}) {
  const dispatch = useDispatch();
  const response = useSelector(state => state?.crud?.get(id)?.get(type));
  const {message} = response?.get('error') || {};

  const metaData = useMemo(
    () => response?.get('data')?._metaData || '',
    [response],
  );

  const op = {};
  /* Function to make read request to server for type READ */
  op.read = useCallback(
    (params = {}, extraURL = '') => {
      if (subscribeSocket) {
        Object.assign(params, {subscribeSocket});
      }
      dispatch(
        requestRead(id, `${url}${extraURL}`, params, responseModifier, page),
      );
    },
    [dispatch, id, url, subscribeSocket, responseModifier, page],
  );
  /* ******************* */
  /* Function to make read request to server for type CREATE */
  op.create = useCallback(
    (params = {}, extraURL = '', cacheResponse = false) => {
      dispatch(
        requestCreate(
          id,
          `${url}${extraURL}`,
          params,
          cacheResponse,
          responseModifier,
        ),
      );
    },
    [id, url, dispatch, responseModifier],
  );
  /* ******************* */
  /* Function to make read request to server for type UPDATE */
  op.update = useCallback(
    (params = {}, extraURL = '', cacheResponse = false) => {
      dispatch(requestUpdate(id, `${url}${extraURL}`, params, cacheResponse));
    },
    [id, url, dispatch],
  ); /* ******************* */
  /* Function to make read request to server for type DELETE */
  op.delete = useCallback(
    (params = {}, extraURL = '') => {
      dispatch(requestDelete(id, `${url}${extraURL}`, params));
    },
    [id, url, dispatch],
  );
  /* ******************* */
  /* Function to make read request to server for type CREATE WITH DEBOUNCE */
  op.createWithDebounce = useCallback(
    (params = {}, extraURL = '', cacheResponse = false) => {
      dispatch(
        requestCreateWithDebounce(
          id,
          `${url}${extraURL}`,
          params,
          cacheResponse,
        ),
      );
    },
    [id, url, dispatch],
  );
  /* ******************* */

  const clear = useCallback(
    read => {
      dispatch(clearData(id));
      if (read) {
        dispatch(clearReadData(id));
      }
    },
    [dispatch, id],
  );

  const updateReadData = useCallback(
    data => {
      dispatch(setReadData(id, data));
    },
    [dispatch, id],
  );

  useEffect(() => {
    const serverErrorMessage =
      response?.get('error')?.response?.data?.message ||
      response?.get('error')?.response?.data?.error_description ||
      response?.get('error')?.response?.data?.error ||
      message;

    if (shouldClearError && serverErrorMessage) {
      if (serverErrorMessage === 'Token expired.') {
        // localStorage.clear();
        showSnackbar({
          message: 'Session expired',
          severity: 'error',
        });
      } else {
        if (errorMessage.CANCELED_REQUEST !== serverErrorMessage) {
          showSnackbar({
            message: serverErrorMessage,
            severity: 'error',
          });
        }
      }
      clear(type === REQUEST_METHOD.get);
    }
  }, [message, response]);

  useEffect(() => {
    if (id && subscribeSocket && !isEmpty(metaData)) {
      const socketRoomId = `${id}-${v4()}`;
      subscribe({uid: socketRoomId, _metaData: metaData}, event => {
        dispatch(
          setSocketReadData(
            id,
            socketRoomId,
            event,
            responseModifier,
            handleSocketData,
          ),
        );
      });
      return () => {
        unsubscribe({uid: socketRoomId, _metaData: metaData});
      };
    }
    return () => {};
  }, [metaData]);

  return [
    response?.get('data'),
    response?.get('error')?.response?.data?.message ||
      response?.get('error')?.response?.data?.error_description ||
      response?.get('error')?.response?.data?.error ||
      message ||
      response?.get('error'),
    !!response?.get('loading'),
    op[type],
    clear,
    updateReadData,
  ];
}
