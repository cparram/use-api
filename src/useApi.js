/** @module useReduxApi */
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import request from './actions';
import { init } from './reducer';

/**
 * @description Simplest hook to manage api calls.
 * @param {string} key - The resource associated to the api conecction.
 * @param {Object} apiConfig - The default callApi options.
 * @example
 * import useReduxApi from '@cparram/use-redux-api'
 *
 * const FunctionalComponent = () => {
 *   // returns [{fechtching: false, data: undefined, error: false}, function()]
 *   const [apiState, apiCall] = useReduxApi('posts');
 * }
 * @returns {Array} The hook to use api.
 */
const useReduxApi = (key, apiConfig = {}) => {
  const apiState = useSelector(state => state.api[key] || init, key);

  const dispatch = useDispatch();
  const apiCall = useCallback(opts => dispatch(request(key, { ...apiConfig, ...opts })), [key]);

  return [apiState, apiCall];
};
export default useReduxApi;
