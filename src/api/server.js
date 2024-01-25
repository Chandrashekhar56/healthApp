import axios from 'axios';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import {triggerEvents} from 'src/lib/utils';
// import { getDecryptedParams } from 'src/utils/decryption/Decryption';
// import { getEncryptedParams } from 'src/utils/encryption/Encryption';
import {API_URL, BASE_URL} from './constants';
import {clearLocalStorage, getLocalStorage} from '../lib/asyncStorage';
import {showSnackbar} from '../lib/utils';
import {errorMessage} from '../lib/errorConstants';
import {store} from '../store';
import {clearStoreData} from '../store/actions/crud';

/**
 * Server address (for api)
 * @private
 * @constant
 */

const PROTOCOL = process.env.SSL ? 'https' : 'http';
const PATH = process.env.API_PATH ? `/${process.env.API_PATH}` : '';
const API = process.env.API
  ? `${PROTOCOL}://${process.env.API}${PATH}/`
  : BASE_URL;

const API_PATH = API || (PATH ? `${PATH}/` : '');

const cancelTokenSource = axios.CancelToken.source();

const server = axios.create({
  baseURL: API_PATH,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const multipartServer = axios.create({
  baseURL: API_PATH,
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});

let refreshInstance = false;
const getRefreshToken = () => {
  if (refreshInstance) {
    return refreshInstance;
  }

  refreshInstance = fetch(`${BASE_URL}${API_URL.refreshToken}`, {
    method: 'POST',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    xhrFields: {withCredentials: true},
    cache: 'no-cache',
    mode: 'cors',
    body: '',
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(data => data)
    .finally(() => {
      refreshInstance = false;
    })
    .catch(err => {
      console.log('err', err);
      // clearLocalStorage();
      return {error: true};
    });
  return refreshInstance;
};
const debouncedRefreshApiFn = debounce(getRefreshToken, 1000, {
  leading: true,
  trailing: false,
});

const refreshTokenHandler = async (err, resolve, reject) => {
  const originalReq = err.config;

  if (
    err?.response?.status === 401 &&
    err.config &&
    !err.config.__isRetryRequest &&
    !process.env.TEST_ENV
  ) {
    const data = await debouncedRefreshApiFn();
    if (!get(data, 'error')) {
      return server(originalReq)
        .then(resp => resolve(resp))
        .catch(error => reject(error));
    }
    triggerEvents('showSnackbar', {
      message: err?.response?.data?.message,
      severity: 'error',
    });
    triggerEvents('logout');
    return reject();
  }
  return reject(err);
};

server.interceptors.request.use(
  async config => {
    const {url} = config;
    // Get the token from wherever you store it (e.g., Redux state, AsyncStorage)
    const {jwt_token} =
      store.getState().crud?.get('USER_LOGIN')?.get('create')?.get('data') ||
      {};
    if (!jwt_token && url === API_URL.userDetail) {
      const CancelToken = axios.CancelToken;
      return {
        ...config,
        cancelToken: new CancelToken(cancel =>
          cancel(errorMessage.CANCELED_REQUEST),
        ),
      };
    } else {
      // Set the Authorization header with the Bearer token
      config.headers.Authorization = `Bearer ${jwt_token}`;
    }
    // config.headers.Authorization = `Bearer ${jwt_token}`;

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
// const encryptRequest = (data) => {
//   const encyptedData = getEncryptedParams(data, ENCRYPT_REQUEST_KEY);
//   return encyptedData;
// };

// const decryptResponse = (data) => {
//   const encyptedData = getDecryptedParams(data, DECRYPT_RESPONSE_KEY);
//   return encyptedData;
// }

// const getQueryParams = (params) => {
//   const paramsJson = {};
//   const pairs = params.split('&');
//   pairs.forEach((p) => {
//     const pair = p.split('=');
//     const key = pair[0];
//     const value = decodeURIComponent(pair[1] || '');

//     if (paramsJson[key]) {
//       if (Object.prototype.toString.call(paramsJson[key]) === '[object Array]') {
//         paramsJson[key].push(value);
//       } else {
//         paramsJson[key] = [paramsJson[key], value];
//       }
//     } else {
//       paramsJson[key] = value;
//     }
//   });
//   return paramsJson;
// }

// server.interceptors.request.use((config) => {
//   const { data, url } = config || {};
//   let { params } = config || {};
//   const newConfig = { ...config };
//   if (ENVIRONMENT !== 'development') {
//     if (url.includes("?")) {
//       const [newurl, queryParams] = url.split('?');
//       newConfig.url = newurl;
//       const paramsJson = getQueryParams(queryParams);
//       params = { ...params, ...paramsJson }
//     }
//     if (params) {
//       const encryptParams = encryptRequest(params);
//       newConfig.params = encryptParams;
//     }
//     if (data) {
//       const encryptedData = encryptRequest(data);
//       newConfig.data = JSON.stringify(encryptedData);
//     }
//   }
//   return newConfig;
// }, (error) => Promise.reject(error));

// server.interceptors.response.use(
//   (response) => {
//     let { data } = response || {};
//     if (data && ENVIRONMENT !== 'development') {
//       data = decryptResponse(data);
//     }
//     return data;
//   },
//   (err) => new Promise((resolve, reject) => refreshTokenHandler(err, resolve, reject)),
// );

// server.interceptors.response.use(response => response?.data);
server.interceptors.response.use(
  response => {
    if (response?.headers?.['x-wp-total']) {
      return {
        results: response?.data,
        totalPages: response?.headers?.['x-wp-totalpages'],
        totalRecords: response?.headers?.['x-wp-total'],
      };
    } else {
      return response?.data;
    }
  },
  error => {
    const {response: {data = {}} = {}} = error || {};
    console.log('🚀 ~ file: server.js:135 ~ error:', error, data);
    if (data.error === 'INVALID_SIGNATURE') {
      store.dispatch(clearStoreData());
    }
    return Promise.reject(error);
  },
);
// server.interceptors.request.use((request) => request, (error) => Promise.reject(error));

// multipartServer.interceptors.response.use(
//   response => {
//     let {data} = response || {};
//     if (data && ENVIRONMENT !== 'development') {
//       data = decryptResponse(data);
//     }
//     return data;
//   },
//   err =>
//     new Promise((resolve, reject) => refreshTokenHandler(err, resolve, reject)),
// );

export default server;
