import {
  FETCH_START, FETCH_SUCCESS, FETCH_FAILED,
} from './constants';

export const init = {
  fetching: false,
  error: false,
  data: undefined,
};

/**
 * Reducer for api actions.
 *
 * @param {object} state - The api state.
 * @param {object} action - The triggered action.
 * @returns {object} The new api State.
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
 * The reducer adapter
 *
 * @param {object} state - The redux state.
 * @param {object} action - The action triggered
 * @returns {object} The redux action.
 */
export const reducer = (state = {}, action) => {
  if (!/^FETCH_/.test(action.type)) return state;
  const key = action.meta;
  const apiState = state[key] || init;
  return {
    ...state,
    [key]: apiReducer(apiState, action),
  };
};
