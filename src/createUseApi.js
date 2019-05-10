import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-use-redux';
import request from './actions';
import { init } from './reducer';

/**
 * Simplest hook to manage api calls
 *
 * @param {string} key - The resource associated to the api conecction.
 * @param {object} apiConfig - The default callApi options.
 * @returns {func} The hook to use api.
 */
export default (key, apiConfig = {}) => {
  const apiState = useSelector(state => state.api[key] || init, key);

  const dispatch = useDispatch();
  const apiCall = useCallback(opts => dispatch(request(key, { ...apiConfig, ...opts })), [key]);

  return [apiState, apiCall];
};
