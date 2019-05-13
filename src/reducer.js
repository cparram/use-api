/** @module reducer */
import {
  FETCH_START, FETCH_SUCCESS, FETCH_FAILED,
} from './constants';

export const init = {
  fetching: false,
  error: false,
  data: undefined,
};

/**
 * @description Reducer for api actions.
 * @param {Object} state - The api state.
 * @param {Object} action - The triggered action.
 * @example
 * // returns { fetching: true, data: undefined, error: false }
 * state = { fetching: false, data: undefined, error: false };
 * action = { type: 'FETCH_START', meta: 'posts' };
 * apiReducer(state, action);
 * @returns {Object} The new api State.
 */
function apiReducer(state, action) {
  const { payload: data } = action;
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: false,
        data,
      };
    case FETCH_FAILED:
      return {
        ...state,
        fetching: false,
        error: true,
        data,
      };
    default:
      return state;
  }
}
/**
 * @description The reducer adapter.
 * @param {Object} state - The redux state.
 * @param {Object} action - The action triggered.
 * @example
 * // returns { posts: { fetching: true, data: undefined, error: false }}
 * state = { posts: { fetching: false, data: undefined, error: false } };
 * action = { type: 'FETCH_START', meta: 'posts' };
 * reducer(state, action);
 * @returns {Object} The redux action.
 */
const reducer = (state = {}, action) => {
  if (!/^FETCH_/.test(action.type)) return state;
  const key = action.meta;
  const apiState = state[key] || init;
  return {
    ...state,
    [key]: apiReducer(apiState, action),
  };
};
export default reducer;
