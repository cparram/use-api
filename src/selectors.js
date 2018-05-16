import {
  createSelectorCreator
} from 'reselect';
import {
  NAME,
  BACKEND_ACTIONS
} from './constants';
import {
  getInit
} from './init';
import memoize from 'lodash/memoize';
import isEqual from 'lodash/isEqual';

// Create custom selector.
const hashFn = (...args) => args.reduce(
  (acc, val) => acc + '-' + JSON.stringify(val),
  ''
);
const createApiReduxSelector = createSelectorCreator(
  memoize,
  hashFn,
  isEqual
);

/**
 * Get Api Redux state.
 */
const getApiRedux = state => state[NAME] || {};

/**
 * Get Api Resource scope.
 */
const getResource = (_state, props) => props.apiResource;

/**
 * Get Api Redux state by Resource.
 */
const getApiReduxByResource = createApiReduxSelector(
  [getApiRedux, getResource],
  (apiRedux, resource) => {
    const apiStates = apiRedux[resource] || {};

    Object.keys(BACKEND_ACTIONS).forEach(action => {
      const apiAction = BACKEND_ACTIONS[action];
      
      apiStates[apiAction] = apiStates[apiAction] || getInit(apiAction);
    });

    
    return apiStates;
  }
);

export {
  getApiReduxByResource,
};