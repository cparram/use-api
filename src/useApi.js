/** @module useReduxApi */
import { useCallback, useContext } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import merge from 'lodash/merge';
import request from './actions';
import { init } from './reducer';
import ConfigContext from './config_context';

/**
 * @description Simplest hook to manage api calls.
 * @param {string} key - The resource associated to the api conecction.
 * @example
 * import useReduxApi from '@cparram/use-redux-api';
 *
 * // Within functional component.
 * const [apiState, apiCall] = useReduxApi('posts');
 * @returns {Array} The hook to use api.
 */
const useReduxApi = (key) => {
  const config = useContext(ConfigContext);
  const apiState = useSelector(state => state.api[key] || init, shallowEqual);

  const dispatch = useDispatch();
  const apiCall = useCallback(opts => dispatch(request(key, merge(config, opts))), [key]);

  return [apiState, apiCall];
};
export default useReduxApi;
