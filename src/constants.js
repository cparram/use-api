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
  'NEW':     'apiNewState',
  'CREATE':  'apiCreateState',
  'UPDATE':  'apiUpdateState',
  'INDEX':   'apiIndexState',
  'SHOW':    'apiShowState',
  'EDIT':    'apiEditState',
  'DESTROY': 'apiDestroyState',
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