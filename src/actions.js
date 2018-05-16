import {
  ACTIONS,
  API,
  BACKEND_ACTIONS
} from './constants';
import {
  getJSON
} from 'redux-api-middleware';

/**
 * Builds a request type action.
 */
const apiRequest = config => ({
  [API]: config
});

/**
 * Build action for new request type action.
 */
const apiNew = (opts = {}) => apiRequest({
  ...opts,
  types: [
    ACTIONS.API_NEW_START,
    ACTIONS.API_NEW_SUCCESS,
    ACTIONS.API_NEW_FAILURE
  ],
  apiAction: BACKEND_ACTIONS.NEW
});

/**
 * Build action for create request type action.
 */
const apiCreate = (opts = {}) => apiRequest({
  ...opts,
  method: 'POST',
  types: [
    ACTIONS.API_CREATE_START,
    ACTIONS.API_CREATE_SUCCESS,
    ACTIONS.API_CREATE_FAILURE
  ],
  apiAction: BACKEND_ACTIONS.CREATE
});

/**
 * Build action for update request type action.
 */
const apiUpdate = (opts = {}) => apiRequest({
  ...opts,
  method: 'PUT',
  types: [
    ACTIONS.API_UPDATE_START,
    ACTIONS.API_UPDATE_SUCCESS,
    ACTIONS.API_UPDATE_FAILURE
  ],
  apiAction: BACKEND_ACTIONS.UPDATE
});

/**
 * Build action for index request type action.
 */
const apiIndex = ({ additive = false, ...opts} = {}) => apiRequest({
  ...opts,
  types: [
    ACTIONS.API_INDEX_START,
    {
      type: ACTIONS.API_INDEX_SUCCESS,
      payload: (_action, _state, res) => {
        const headers = res.headers;

        return getJSON(res).then((json) => ({
          records: json,
          pagination: {
            total: parseInt(headers.get('X-Total')),
            perPage: parseInt(headers.get('X-Per-Page')),
            page: parseInt(headers.get('X-Page')),
          }
        }));
      },
      meta: {
        additive
      }
    },
    ACTIONS.API_INDEX_FAILURE,
  ],
  apiAction: BACKEND_ACTIONS.INDEX
});

/**
 * Build action for show request type action.
 */
const apiShow = (opts = {}) => apiRequest({
  ...opts,
  types: [
    ACTIONS.API_SHOW_START,
    {
      type: ACTIONS.API_SHOW_SUCCESS,
      payload: (_action, _state, res) => {
        const headers = res.headers;

        return getJSON(res).then((json) => ({
          record: json,
          headers: {
            'Etag' : headers.get('Etag'),
            'Last-Modified': headers.get('Last-Modified')
          }
        }));
      }
    },
    ACTIONS.API_SHOW_FAILURE,
  ],
  apiAction: BACKEND_ACTIONS.SHOW
});

/**
 * Build action for edit request type action.
 */
const apiEdit = (opts = {}) => apiRequest({
  ...opts,
  types: [
    ACTIONS.API_EDIT_START,
    ACTIONS.API_EDIT_SUCCESS,
    ACTIONS.API_EDIT_FAILURE
  ],
  apiAction: BACKEND_ACTIONS.EDIT
});

/**
 * Build action for destroy request type action.
 */
const apiDestroy = (opts = {}) => apiRequest({
  ...opts,
  method: 'DELETE',
  types: [
    ACTIONS.API_DESTROY_START,
    ACTIONS.API_DESTROY_SUCCESS,
    ACTIONS.API_DESTROY_FAILURE
  ],
  apiAction: BACKEND_ACTIONS.DESTROY
});

/**
 * Build action to clear api action state.
 */
const clear = (apiAction, apiResource) => ({
  type: ACTIONS.CLEAR,
  payload: {
    apiAction,
    apiResource
  }
});

export {
  apiNew,
  apiCreate,
  apiUpdate,
  apiIndex,
  apiShow,
  apiEdit,
  apiDestroy,
  clear,
};