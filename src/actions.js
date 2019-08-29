/** @module actions */
import { FETCH_START, FETCH_FAILED, FETCH_SUCCESS } from './constants';

/**
 * @description Redux action triggered before fetching.
 * @param {string} meta - The resource name.
 * @example
 * // returns { type: 'FETCH_START', meta: 'posts' }
 * start('posts');
 * @returns {Object} A redux action.
 */
const start = meta => ({
  type: FETCH_START,
  meta,
});

/**
 * @description Redux action triggered after ending fetching successfully.
 * @param {string} meta - The resource name.
 * @param {Object} payload - The request response.
 * @example
 * // returns { type: 'FETCH_SUCCESS', payload: { data: true } , meta: 'posts' }
 * success('posts', { data: true });
 * @returns {Object} A redux action.
 */
const success = (meta, payload) => ({
  type: FETCH_SUCCESS,
  payload,
  meta,
});

/**
 * @description Redux action triggered after ending fetching with errors.
 * @param {string} meta - The resource name.
 * @param {Object} payload - The request response.
 * @example
 * // returns { type: 'FETCH_FAILED', payload: { data: true }, meta: 'posts' }
 * failure('posts', { data: true });
 * @returns {Object} A redux action.
 */
const failure = (meta, payload) => ({
  type: FETCH_FAILED,
  payload,
  meta,
});

/**
 * @description Action responsible to manage api call.
 * @param {string} resource - The resource api.
 * @param {Object} opts - The opts passed to fetch.
 * @example
 * request('posts', { method: 'GET' });
 * @returns {function(): Promise} A nested function used on redux.
 */
const request = (resource, opts) => (dispatch) => {
  dispatch(start(resource));

  const {
    endpoint,
    headers: origHeaders,
    body,
    onResponse = json => json,
    baseUrl,
    path,
    ...other
  } = opts;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...origHeaders,
  };

  return fetch(endpoint || `${baseUrl}${path}`, {
    headers,
    body: body ? JSON.stringify(body) : undefined,
    ...other,
  }).then(response => response.json().then((json) => {
    const requestResponse = {
      response,
      data: json,
    };
    const args = [resource, onResponse(json, response)];
    dispatch(response.ok ? success(...args) : failure(...args));
    return requestResponse;
  }));
};
export default request;
