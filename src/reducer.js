import {
  handleActions
} from 'redux-actions';
import { 
  ACTIONS,
  NAME,
} from './constants';
import {
  getInit
} from './init';

const init = {};

/**
 * Generic reducer for start actions.
 */
const apiStart = key => (state, action) => ({
  ...getInit(action.meta.apiAction),
  [key]: state[key],
  fetching: true,
});

/**
 * Generic reducer for start failure actions.
 */
const apiFailure = key => (state, action) => {
  const {
    meta,
    payload,
  } = action;

  return {
    ...getInit(meta.apiAction),
    [key]: state[key],
    error: {
      code: meta.status.code,
      messages: payload.response,
    }
  };
};

/**
 * Generic reducer for success actions.
 */
const apiSuccess = (_state, action) => ({
  ...getInit(action.meta.apiAction),
  record: action.payload,
});

/**
 * Reducer for success index action.
 */
const apiIndexSuccess = (state, action) => {
  const {
    payload,
    meta
  } = action;

  // Record list.
  const records = !meta.additive ? payload.records : [
    ...(state.records || []),
    ...payload.records,
  ];

  return {
    ...getInit(meta.apiAction),
    pagination: payload.pagination,
    records
  };
};

/**
 * Reducer for success show action.
 */
const apiShowSuccess = (_state, action, apiAction) => {
  const {
    payload
  } = action;

  return {
    ...getInit(apiAction),
    record: payload.record,
    headers: payload.headers,
  };
};

/**
 * Generic reducer for to clear action.
 */
const clear = (_state, action) => getInit(action.payload.apiAction);

const handleApiActions = () => {
  return handleActions({
    // Handler for CREATE
    [ACTIONS.API_CREATE_START]: apiStart('record'),
    [ACTIONS.API_CREATE_SUCCESS]: apiSuccess,
    [ACTIONS.API_CREATE_FAILURE]: apiFailure('record'),

    // Handler for NEW
    [ACTIONS.API_NEW_START]: apiStart('record'),
    [ACTIONS.API_NEW_SUCCESS]: apiSuccess,
    [ACTIONS.API_NEW_FAILURE]: apiFailure('record'),

    // Handler for UPDATE
    [ACTIONS.API_UPDATE_START]: apiStart('record'),
    [ACTIONS.API_UPDATE_SUCCESS]: apiSuccess,
    [ACTIONS.API_UPDATE_FAILURE]: apiFailure('record'),

    // Handler for INDEX
    [ACTIONS.API_INDEX_START]: apiStart('records'),
    [ACTIONS.API_INDEX_SUCCESS]: apiIndexSuccess,
    [ACTIONS.API_INDEX_FAILURE]: apiFailure('records'),

    // Handler for SHOW
    [ACTIONS.API_SHOW_START]: apiStart('record'),
    [ACTIONS.API_SHOW_SUCCESS]: apiShowSuccess,
    [ACTIONS.API_SHOW_FAILURE]: apiFailure('record'),

    // Handler for EDIT
    [ACTIONS.API_EDIT_START]: apiStart('record'),
    [ACTIONS.API_EDIT_SUCCESS]: apiSuccess,
    [ACTIONS.API_EDIT_FAILURE]: apiFailure('record'),

    // Handler for DESTROY
    [ACTIONS.API_DESTROY_START]: apiStart('record'),
    [ACTIONS.API_DESTROY_SUCCESS]: apiSuccess,
    [ACTIONS.API_DESTROY_FAILURE]: apiFailure('record'),

    [ACTIONS.CLEAR]: clear
  }, {});
};

// eslint-disable-next-line no-useless-escape
const regexp = new RegExp(`^${NAME}.API_\\w+$`);

const handleAction = actionType => {
  return regexp.test(actionType) || actionType === ACTIONS.CLEAR;
};

/**
 * Reducer adapter to api actions.
 */
const apiReducerAdapter = (state = init, action) => {
  if (!handleAction(action.type)) return state;

  const source = regexp.test(action.type) ? action.meta : action.payload;
  const {
    apiAction,
    apiResource,
  } = source;

  // Get Api Redux state of resource.
  const resourceState = state[apiResource] || {};

  // Get State of Api action about resource.
  // If not defined then get initial state of action.
  const apiActionState = resourceState[apiAction] || getInit(apiAction);

  return {
    ...state,
    [apiResource]: {
      ...resourceState,
      [apiAction]: handleApiActions()(apiActionState, action)
    }
  };
};

export default apiReducerAdapter;