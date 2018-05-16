import {
  BACKEND_ACTIONS
} from './constants';

// Define initial states.
const initCreate = {};
const initNew = {};
const initUpdate = {};
const initEdit = {};
const initShow = {
  headers: {}
};
const initDestroy = {};
const initIndex = {
  pagination: {
    total: 0,
    perPage: 10,
    page: 1
  }
};

// Group actions by resource granulation.
const SINGLE_RESOURCE = [
  initCreate,
  initNew,
  initUpdate,
  initEdit,
  initShow,
  initDestroy
];
const PLURAL_RESOURCES = [
  initIndex
];

// Completes keys on states by granularity.
SINGLE_RESOURCE.forEach(init => {
  init.record = null;
  init.fetching = false;
  init.error = null;
});
PLURAL_RESOURCES.forEach(init => {
  init.records = null;
  init.fetching = false;
  init.error = null;
});

/**
 * Get the initial state for given action
 *
 * @param {string} action - The action requested.
 */
const getInit = action => {
  const initialStates = {
    [BACKEND_ACTIONS.CREATE]: initCreate,
    [BACKEND_ACTIONS.NEW]: initNew,
    [BACKEND_ACTIONS.UPDATE]: initUpdate,
    [BACKEND_ACTIONS.EDIT]: initEdit,
    [BACKEND_ACTIONS.SHOW]: initShow,
    [BACKEND_ACTIONS.DESTROY]: initDestroy,
    [BACKEND_ACTIONS.INDEX]: initIndex,
  };

  return initialStates[action];
};

export {
  initCreate,
  initNew,
  initUpdate,
  initEdit,
  initShow,
  initDestroy,
  initIndex,
  getInit,
};