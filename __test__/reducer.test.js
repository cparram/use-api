import reducer from '../src/reducer';
import apiReduxMiddleware from '../src/middleware';
import { apiMiddleware, RSAA } from 'redux-api-middleware';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import {
  ACTIONS,
  BACKEND_ACTIONS,
  API,
} from '../src/constants';
import {
  apiNew,
  apiCreate,
  apiUpdate,
  apiIndex,
  apiShow,
  apiEdit,
  apiDestroy,
  clear,
} from '../src/actions';
import { getInit } from '../src/init';
const middlewares = [
  apiReduxMiddleware(), 
  apiMiddleware
];
const mockStore = configureMockStore(middlewares);
let store;

describe('Reducer Module', () => {
  describe('Api actions', () => {
    beforeEach(() => {
      store = mockStore();
    });

    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    const apiResource = '@_resource_@';
    const endpoint = '/test';
    const response = { response: 'message' };
    const getAction = (action, actionType) => {
      store = mockStore();
      return store.dispatch(action)
        .then(() => store.getActions())
        .then(actions => actions.filter(a => a.type === actionType)[0]);
    };
    const configs = [
      // New actions
      {
        actionType: ACTIONS.API_NEW_START,
        action: (apiResource, endpoint) => apiNew({
          apiResource,
          endpoint
        }),
        backendAction: BACKEND_ACTIONS.NEW,
        expected: apiResource => ({
          [apiResource]: {
            [BACKEND_ACTIONS.NEW]: {
              record: null,
              fetching: true,
              error: null
            }
          }
        }),
        keep: 'record'
      },
      {
        actionType: ACTIONS.API_NEW_SUCCESS,
        action: (apiResource, endpoint) => apiNew({
          apiResource,
          endpoint
        }),
        backendAction: BACKEND_ACTIONS.NEW,
        expected: apiResource => ({
          [apiResource]: {
            [BACKEND_ACTIONS.NEW]: {
              record: response,
              fetching: false,
              error: null
            }
          }
        }),
        fetchResponse: {
          status: 200,
          body: response
        }
      },
      {
        actionType: ACTIONS.API_NEW_FAILURE,
        action: (apiResource, endpoint) => apiNew({
          apiResource,
          endpoint
        }),
        backendAction: BACKEND_ACTIONS.NEW,
        expected: apiResource => ({
          [apiResource]: {
            [BACKEND_ACTIONS.NEW]: {
              record: null,
              fetching: false,
              error: {
                code: 400,
                messages: response,
              }
            }
          }
        }),
        fetchResponse: {
          status: 400,
          body: response
        },
        keep: 'record'
      },
      // Create actions
      {
        actionType: ACTIONS.API_CREATE_START,
        action: (apiResource, endpoint) => apiCreate({
          apiResource,
          endpoint
        }),
        backendAction: BACKEND_ACTIONS.CREATE,
        expected: apiResource => ({
          [apiResource]: {
            [BACKEND_ACTIONS.CREATE]: {
              record: null,
              fetching: true,
              error: null
            }
          }
        }),
        keep: 'record'
      },
      {
        actionType: ACTIONS.API_CREATE_SUCCESS,
        action: (apiResource, endpoint) => apiCreate({
          apiResource,
          endpoint
        }),
        backendAction: BACKEND_ACTIONS.CREATE,
        expected: apiResource => ({
          [apiResource]: {
            [BACKEND_ACTIONS.CREATE]: {
              record: response,
              fetching: false,
              error: null
            }
          }
        }),
        fetchResponse: {
          status: 200,
          body: response
        },
        fetchOptions: {
          method: 'POST'
        }
      },
      {
        actionType: ACTIONS.API_CREATE_FAILURE,
        action: (apiResource, endpoint) => apiCreate({
          apiResource,
          endpoint
        }),
        backendAction: BACKEND_ACTIONS.CREATE,
        expected: apiResource => ({
          [apiResource]: {
            [BACKEND_ACTIONS.CREATE]: {
              record: null,
              fetching: false,
              error: {
                code: 400,
                messages: response,
              }
            }
          }
        }),
        fetchResponse: {
          status: 400,
          body: response,
        },
        fetchOptions: {
          method: 'POST'
        },
        keep: 'record'
      },
      // Update actions
      {
        actionType: ACTIONS.API_UPDATE_START,
        action: (apiResource, endpoint) => apiUpdate({
          apiResource,
          endpoint
        }),
        backendAction: BACKEND_ACTIONS.UPDATE,
        expected: apiResource => ({
          [apiResource]: {
            [BACKEND_ACTIONS.UPDATE]: {
              record: null,
              fetching: true,
              error: null
            }
          }
        }),
        keep: 'record'
      },
      {
        actionType: ACTIONS.API_UPDATE_SUCCESS,
        action: (apiResource, endpoint) => apiUpdate({
          apiResource,
          endpoint
        }),
        backendAction: BACKEND_ACTIONS.UPDATE,
        expected: apiResource => ({
          [apiResource]: {
            [BACKEND_ACTIONS.UPDATE]: {
              record: response,
              fetching: false,
              error: null
            }
          }
        }),
        fetchResponse: {
          status: 200,
          body: response
        },
        fetchOptions: {
          method: 'PUT'
        }
      },
      {
        actionType: ACTIONS.API_UPDATE_FAILURE,
        action: (apiResource, endpoint) => apiUpdate({
          apiResource,
          endpoint
        }),
        backendAction: BACKEND_ACTIONS.UPDATE,
        expected: apiResource => ({
          [apiResource]: {
            [BACKEND_ACTIONS.UPDATE]: {
              record: null,
              fetching: false,
              error: {
                code: 400,
                messages: response,
              }
            }
          }
        }),
        fetchResponse: {
          status: 400,
          body: response,
        },
        fetchOptions: {
          method: 'PUT'
        },
        keep: 'record'
      },
      // Index actions
      {
        actionType: ACTIONS.API_INDEX_START,
        action: (apiResource, endpoint) => apiIndex({
          apiResource,
          endpoint
        }),
        backendAction: BACKEND_ACTIONS.INDEX,
        expected: apiResource => ({
          [apiResource]: {
            [BACKEND_ACTIONS.INDEX]: {
              records: null,
              fetching: true,
              error: null,
              pagination: {
                total: 0,
                perPage: 10,
                page: 1
              }
            }
          }
        }),
        keep: 'records'
      },
      {
        actionType: ACTIONS.API_INDEX_SUCCESS,
        action: (apiResource, endpoint) => apiIndex({
          apiResource,
          endpoint
        }),
        backendAction: BACKEND_ACTIONS.INDEX,
        expected: apiResource => ({
          [apiResource]: {
            [BACKEND_ACTIONS.INDEX]: {
              records: response,
              fetching: false,
              error: null,
              pagination: {
                total: 20,
                perPage: 10,
                page: 2
              },
            }
          }
        }),
        fetchResponse: {
          status: 200,
          body: response,
          headers: {
            'X-Total': 20,
            'X-Per-Page': 10,
            'X-Page': 2
          }
        }
      },
      {
        actionType: ACTIONS.API_INDEX_FAILURE,
        action: (apiResource, endpoint) => apiIndex({
          apiResource,
          endpoint
        }),
        backendAction: BACKEND_ACTIONS.INDEX,
        expected: apiResource => ({
          [apiResource]: {
            [BACKEND_ACTIONS.INDEX]: {
              records: null,
              fetching: false,
              error: {
                code: 400,
                messages: response,
              },
              pagination: {
                total: 0,
                perPage: 10,
                page: 1
              }
            }
          }
        }),
        fetchResponse: {
          status: 400,
          body: response,
        },
        keep: 'records'
      },
      // Edit actions
      {
        actionType: ACTIONS.API_EDIT_START,
        action: (apiResource, endpoint) => apiEdit({
          apiResource,
          endpoint
        }),
        backendAction: BACKEND_ACTIONS.EDIT,
        expected: apiResource => ({
          [apiResource]: {
            [BACKEND_ACTIONS.EDIT]: {
              record: null,
              fetching: true,
              error: null
            }
          }
        }),
        keep: 'record'
      },
      {
        actionType: ACTIONS.API_EDIT_SUCCESS,
        action: (apiResource, endpoint) => apiEdit({
          apiResource,
          endpoint
        }),
        backendAction: BACKEND_ACTIONS.EDIT,
        expected: apiResource => ({
          [apiResource]: {
            [BACKEND_ACTIONS.EDIT]: {
              record: response,
              fetching: false,
              error: null
            }
          }
        }),
        fetchResponse: {
          status: 200,
          body: response
        }
      },
      {
        actionType: ACTIONS.API_EDIT_FAILURE,
        action: (apiResource, endpoint) => apiEdit({
          apiResource,
          endpoint
        }),
        backendAction: BACKEND_ACTIONS.EDIT,
        expected: apiResource => ({
          [apiResource]: {
            [BACKEND_ACTIONS.EDIT]: {
              record: null,
              fetching: false,
              error: {
                code: 400,
                messages: response,
              }
            }
          }
        }),
        fetchResponse: {
          status: 400,
          body: response
        },
        keep: 'record'
      },
      // Destroy actions
      {
        actionType: ACTIONS.API_DESTROY_START,
        action: (apiResource, endpoint) => apiDestroy({
          apiResource,
          endpoint
        }),
        backendAction: BACKEND_ACTIONS.DESTROY,
        expected: apiResource => ({
          [apiResource]: {
            [BACKEND_ACTIONS.DESTROY]: {
              record: null,
              fetching: true,
              error: null
            }
          }
        }),
        keep: 'record'
      },
      {
        actionType: ACTIONS.API_DESTROY_SUCCESS,
        action: (apiResource, endpoint) => apiDestroy({
          apiResource,
          endpoint
        }),
        backendAction: BACKEND_ACTIONS.DESTROY,
        expected: apiResource => ({
          [apiResource]: {
            [BACKEND_ACTIONS.DESTROY]: {
              record: response,
              fetching: false,
              error: null
            }
          }
        }),
        fetchResponse: {
          status: 200,
          body: response
        },
        fetchOptions: {
          method: 'DELETE'
        }
      },
      {
        actionType: ACTIONS.API_DESTROY_FAILURE,
        action: (apiResource, endpoint) => apiDestroy({
          apiResource,
          endpoint
        }),
        backendAction: BACKEND_ACTIONS.DESTROY,
        expected: apiResource => ({
          [apiResource]: {
            [BACKEND_ACTIONS.DESTROY]: {
              record: null,
              fetching: false,
              error: {
                code: 400,
                messages: response,
              }
            }
          }
        }),
        fetchResponse: {
          status: 400,
          body: response,
        },
        fetchOptions: {
          method: 'DELETE'
        },
        keep: 'record'
      },
    ];

    configs.forEach(config => {
      const actionType = config.actionType;
        

      test(`Handle ${actionType}`, () => {
        fetchMock.mock(
          endpoint,
          config.fetchResponse || {},
          config.fetchOptions
        );

        const action = config.action(apiResource, endpoint);

        return getAction(action, actionType).then(action => {
          const state = reducer(config.initState || {}, action);
          expect(state).toEqual(config.expected(apiResource));
        });
      });

      // Test isolation states.
      configs.filter(config => config.actionType !== actionType)
        .forEach(nestedConfig => {

          test(`Handle ${actionType} and ${nestedConfig.actionType} to different apiResource`, () => {
            fetchMock.mock(
              endpoint,
              config.fetchResponse || {},
              config.fetchOptions
            );

            const nestedApiResource = '@_resource_2_@';
            const nestedEndpoint = '/test_1';

            fetchMock.mock(
              nestedEndpoint,
              nestedConfig.fetchResponse || {},
              nestedConfig.fetchOptions
            );

            const action1 = config.action(apiResource, endpoint);
            const action2 = nestedConfig.action(nestedApiResource, nestedEndpoint);

            return getAction(action1, actionType).then(action => {
              const state1 = reducer({}, action);

              return getAction(action2, nestedConfig.actionType).then(action => {
                const state2 = reducer(state1, action);

                expect(state2).toEqual({
                  ...config.expected(apiResource),
                  ...nestedConfig.expected(nestedApiResource)
                });
              });
            });
          });
        });
    });

    test(`Handle ${ACTIONS.API_INDEX_SUCCESS} in addition mode`, () => {
      fetchMock.mock(endpoint, {
        status: 200,
        body: [2],
        headers: {
          'X-Total': 20,
          'X-Per-Page': 10,
          'X-Page': 2
        }
      });
      const action = apiIndex({
        additive: true,
        apiResource,
        endpoint
      });
      return getAction(action, ACTIONS.API_INDEX_SUCCESS).then(action => {
        const state = reducer({
          [apiResource]: {
            [BACKEND_ACTIONS.INDEX]: {
              records: [1],
              fetching: true,
              error: null,
              pagination: {
                total: 20,
                perPage: 10,
                page: 1
              }
            }
          }
        }, action);
        expect(state).toEqual({
          [apiResource]: {
            [BACKEND_ACTIONS.INDEX]: {
              records: [1, 2],
              fetching: false,
              error: null,
              pagination: {
                total: 20,
                perPage: 10,
                page: 2
              }
            }
          }
        });
      });
    });

    configs.filter(config => !!config.keep).forEach(config => {
      test(`Keep ${config.keep} on ${config.actionType}`, () => {
        fetchMock.mock(
          endpoint,
          config.fetchResponse || {},
          config.fetchOptions
        );

        const action = config.action(apiResource, endpoint);

        return getAction(action, config.actionType).then(action => {
          const state = reducer({
            [apiResource]: {
              [config.backendAction]: {
                ...getInit(config.backendAction),
                [config.keep]: 'random'
              }
            }
          }, action);
          expect(state).toEqual({
            [apiResource]: {
              [config.backendAction]: {
                ...config.expected(apiResource)[apiResource][config.backendAction],
                [config.keep]: 'random'
              }
            }
          });
        });
      });
    });
  });
});