const NAME = 'api.redux';
const API = `${NAME}@middleware`;

// Api actions.
const API_ACTIONS = [
  'NEW',
  'CREATE',
  'UPDATE',
  'INDEX',
  'SHOW',
  'EDIT',
  'DESTROY'
];

// Backend actions.
const BACKEND_ACTIONS = {
  'NEW':     '@_new_@',
  'CREATE':  '@_create_@',
  'UPDATE':  '@_update_@',
  'INDEX':   '@_index_@',
  'SHOW':    '@_show_@',
  'EDIT':    '@_edit_@',
  'DESTROY': '@_destroy_@',
};

// Redux actions.
const ACTIONS = {
  'CLEAR': `${NAME}.CLEAR`,
};
const REDUX_STATES = [
  'START',
  'SUCCESS',
  'FAILURE'
];

/**
 * Build the name of action api type.
 *
 * @param {string} apiAction - The action name (Ex: NEW).
 * @param {string} state     - The redux state (Ex: START).
 */
const apiTypeKey = (apiAction, state) => `API_${apiAction}_${state}`;


// Build generic actions.
API_ACTIONS.forEach(apiAction => {
  REDUX_STATES.forEach(state => {
    const action = apiTypeKey(apiAction, state);

    ACTIONS[action] = `${NAME}.${action}`;
  });
});

export {
  API,
  NAME,
  ACTIONS,
  BACKEND_ACTIONS,
};