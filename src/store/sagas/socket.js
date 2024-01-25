import {put, all, select, actionChannel, take} from 'redux-saga/effects';
import {setReadData} from '../actions/crud';
import {SET_SOCKET_DATA_READ} from '../actions/socket';

export const handleReadSocketEvents = function* ({
  id,
  event,
  responseModifier,
  handleSocketData,
}) {
  const {operation} = event || {};
  let {data} = event || {};
  if (data) {
    const existingData = yield select(
      state => state?.crud?.get(id)?.get('read')?.get('data') || [],
    );
    if (handleSocketData) {
      const modifiedData = handleSocketData({
        id,
        event,
        responseModifier,
        existingData,
      });
      yield put(setReadData(id, modifiedData));
    } else {
      if (responseModifier && typeof responseModifier === 'function') {
        data = responseModifier(data);
      }

      if (operation === 'created') {
        let newData;
        if (Array.isArray(existingData)) {
          newData = [data, ...existingData];
        } else if (
          existingData.results &&
          Array.isArray(existingData.results)
        ) {
          // Preserve the existing 'results' object structure
          newData = {
            ...existingData,
            results: [data, ...existingData.results],
          };
        }
        yield put(setReadData(id, newData));
      }
      if (operation === 'updated') {
        let updatedData;
        if (Array.isArray(existingData)) {
          updatedData = existingData.map(item =>
            item.id === data.id ? data : item,
          );
        } else if (
          existingData.results &&
          Array.isArray(existingData.results)
        ) {
          // Preserve the existing 'results' object structure
          let dataMatched = false;
          const newData = existingData.results.map(item => {
            if (item.id === data.id) {
              dataMatched = true;
              return data;
            }
            return item;
          });
          if (!dataMatched) {
            newData.unshift(data);
          }
          updatedData = {
            ...existingData,
            results: newData,
          };
        } else if (existingData.results) {
          // Preserve the existing 'results' object structure
          updatedData = {
            ...existingData,
            results: {...data},
          };
        }

        yield put(setReadData(id, updatedData));
      }
      if (operation === 'remove') {
        let updatedData = existingData;
        if (Array.isArray(existingData)) {
          updatedData = existingData.filter(item => item?.id !== data?.id);
        } else if (
          existingData?.results &&
          Array.isArray(existingData.results)
        ) {
          updatedData = {
            ...existingData,
            results: existingData.results.filter(item => item?.id !== data?.id),
          };
        }
        yield put(setReadData(id, updatedData));
      }
    }
  }
};

export const watchSocketEvents = function* () {
  const channel = yield actionChannel(SET_SOCKET_DATA_READ);

  while (true) {
    const action = yield take(channel);
    yield handleReadSocketEvents(action);
  }
};

export default function* root() {
  yield all([watchSocketEvents()]);
}
