import { FETCH_START, FETCH_FAILED, FETCH_SUCCESS } from './constants';

/**
 * Redux action triggered before fetching.
 *
 * @param {string} meta - The resource name.
 * @returns {object} A redux action.
 */
const start = meta => ({
  type: FETCH_START,
  meta,
});

/**
 * Redux action triggered after ending fetching successfully.
 *
 * @param {string} meta - The resource name.
 * @param {object} payload - The request response.
 * @returns {object} A redux action.
 */
const success = (meta, payload) => ({
  type: FETCH_SUCCESS,
  payload,
  meta,
});

/**
 * Redux action triggered after ending fetching with errors.
 *
 * @param {string} meta - The resource name.
 * @param {object} payload - The request response.
 * @return {object} A redux action.
 */
const failure = (meta, payload) => ({
  type: FETCH_FAILED,
  payload,
  meta,
});

/**
 * Action responsible to manage api call.
 *
 * @param {string} resource - The resource api.
 * @param {object} opts - The opts passed to fetch.
 * @returns {func} A nested function used on redux.
 */
export default (resource, opts) => (dispatch) => {
  dispatch(start(resource));

  const {
    endpoint,
    headers: origHeaders,
    body,
    onResponse = json => json,
    ...other
  } = opts;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...origHeaders,
  };

  return fetch(endpoint, {
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
