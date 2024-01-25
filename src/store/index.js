import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer, createTransform} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers';
import rootSaga from './sagas';
import {Map, isMap} from 'immutable';
import {USER_DETAILS, USER_LOGIN} from './types';

const convertToMap = obj => {
  const convertedObj = {};
  for (const [key, value] of Object.entries(obj)) {
    convertedObj[key] = isMap(value)
      ? value
      : typeof value === 'object'
      ? Map(Object.entries(value))
      : value;
  }
  return Map(convertedObj);
};

const inboundTransform = createTransform(
  (inboundState, key) => {
    let transformedState;
    if (inboundState?.rehydrated) {
      // Already a plain JavaScript object
      transformedState = inboundState;
    } else if (isMap(inboundState)) {
      // If already a Map, return as is
      transformedState = inboundState;
    } else {
      // Convert top level to Map
      transformedState = convertToMap(inboundState);
    }
    return transformedState;
  },

  (outboundState, key) => {
    // Convert outboundState to a plain JavaScript object
    let transformedState = {};

    if (outboundState.rehydrated) {
      transformedState = outboundState;
    } else {
      // Ensure outboundState is treated as an iterable (e.g., array or Map)
      const entries =
        outboundState instanceof Map
          ? outboundState.entries()
          : Object.entries(outboundState);

      for (const [prop, value] of entries) {
        transformedState[prop] = convertToMap(value);
      }
    }

    return Map(transformedState);
  },
);

const stateReconciler = (
  inboundState,
  originalState,
  reducedState,
  {debug},
) => {
  let filteredState = {...inboundState};

  // Add logic to filter out the state you don't want to persist
  if (filteredState.crud && filteredState.crud.getIn([USER_DETAILS, 'read'])) {
    filteredState.crud = filteredState.crud.deleteIn([USER_DETAILS, 'read']);
  }
  // if (filteredState.crud && filteredState.crud.getIn([USER_LOGIN, 'read'])) {
  //   filteredState.crud = filteredState.crud.deleteIn([USER_LOGIN, 'read']);
  // }

  // Add more conditions as needed for other states

  return filteredState;
};

const persistConfig = {
  key: 'primary',
  storage: AsyncStorage,
  transforms: [inboundTransform],
  stateReconciler,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  persistedReducer,
  {},
  composeEnhancer(applyMiddleware(sagaMiddleware)),
);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
