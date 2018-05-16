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
import {
  ACTIONS,
  BACKEND_ACTIONS,
  API,
} from '../src/constants';

describe('Actions Module', () => {
  test('Exports actions correctly', () => {
    const actions = [
      apiNew,
      apiCreate,
      apiUpdate,
      apiIndex,
      apiShow,
      apiEdit,
      apiDestroy,
      clear,
    ];

    actions.forEach(action => {
      expect(action).not.toBeFalsy();
      expect(typeof action).toBe('function');
    });
  });

  test('Creates action to clear apiAction state', () => {
    const apiAction = BACKEND_ACTIONS.CREATE;
    const apiResource = 'resource';

    const action = {
      type: ACTIONS.CLEAR,
      payload: {
        apiAction,
        apiResource
      }
    };

    expect(clear(apiAction, apiResource)).toEqual(action);
  });

  const customProperty = 'test_customProperty';

  [true, false].forEach(custom => {
    const customTest = `${custom ? 'with' : 'without'} custom property`;

    test(`Creates RSAA action for ${BACKEND_ACTIONS.NEW} ${customTest}`, () => {
      const action = {
        [API]: {
          types: [
            ACTIONS.API_NEW_START,
            ACTIONS.API_NEW_SUCCESS,
            ACTIONS.API_NEW_FAILURE
          ],
          apiAction: BACKEND_ACTIONS.NEW,
        }
      };
      if (custom) {
        action[API]['customProperty'] = customProperty;
        expect(apiNew({ customProperty })).toEqual(action);
      } else 
        expect(apiNew()).toEqual(action);

    });

    test(`Creates RSAA action for ${BACKEND_ACTIONS.CREATE} ${customTest}`, () => {
      const action = {
        [API]: {
          method: 'POST',
          types: [
            ACTIONS.API_CREATE_START,
            ACTIONS.API_CREATE_SUCCESS,
            ACTIONS.API_CREATE_FAILURE
          ],
          apiAction: BACKEND_ACTIONS.CREATE,
        }
      };
      if (custom) {
        action[API]['customProperty'] = customProperty;
        expect(apiCreate({ customProperty })).toEqual(action);
      } else 
        expect(apiCreate()).toEqual(action);

    });

    test(`Creates RSAA action for ${BACKEND_ACTIONS.UPDATE} ${customTest}`, () => {
      const action = {
        [API]: {
          method: 'PUT',
          types: [
            ACTIONS.API_UPDATE_START,
            ACTIONS.API_UPDATE_SUCCESS,
            ACTIONS.API_UPDATE_FAILURE
          ],
          apiAction: BACKEND_ACTIONS.UPDATE,
        }
      };
      if (custom) {
        action[API]['customProperty'] = customProperty;
        expect(apiUpdate({ customProperty })).toEqual(action);
      } else 
        expect(apiUpdate()).toEqual(action);
    });

    [true, false].forEach(additive => {
      test(`Creates RSAA action for ${BACKEND_ACTIONS.INDEX} ${customTest}`, () => {
        const action = {
          [API]: {
            types: [
              ACTIONS.API_INDEX_START,
              {
                type: ACTIONS.API_INDEX_SUCCESS,
                payload: expect.any(Function),
                meta: {
                  additive
                }
              },
              ACTIONS.API_INDEX_FAILURE,
            ],
            apiAction: BACKEND_ACTIONS.INDEX,
          }
        };

        if (custom) {
          action[API]['customProperty'] = customProperty;
          expect(apiIndex({ customProperty, additive })).toMatchObject(action);
        } else 
          expect(apiIndex({ additive })).toMatchObject(action);
      });
    });

    test(`Creates RSAA action for ${BACKEND_ACTIONS.SHOW} ${customTest}`, () => {
      const action = {
        [API]: {
          types: [
            ACTIONS.API_SHOW_START,
            {
              type: ACTIONS.API_SHOW_SUCCESS,
              payload: expect.any(Function),
            },
            ACTIONS.API_SHOW_FAILURE,
          ],
          apiAction: BACKEND_ACTIONS.SHOW,
        }
      };

      if (custom) {
        action[API]['customProperty'] = customProperty;
        expect(apiShow({ customProperty })).toEqual(action);
      } else 
        expect(apiShow()).toEqual(action);
    });

    test(`Creates RSAA action for ${BACKEND_ACTIONS.EDIT} ${customTest}`, () => {
      const action = {
        [API]: {
          types: [
            ACTIONS.API_EDIT_START,
            ACTIONS.API_EDIT_SUCCESS,
            ACTIONS.API_EDIT_FAILURE
          ],
          apiAction: BACKEND_ACTIONS.EDIT,
        }
      };
      
      if (custom) {
        action[API]['customProperty'] = customProperty;
        expect(apiEdit({ customProperty })).toEqual(action);
      } else 
        expect(apiEdit()).toEqual(action);
    });

    test(`Creates RSAA action for ${BACKEND_ACTIONS.DESTROY} ${customTest}`, () => {
      const action = {
        [API]: {
          method: 'DELETE',
          types: [
            ACTIONS.API_DESTROY_START,
            ACTIONS.API_DESTROY_SUCCESS,
            ACTIONS.API_DESTROY_FAILURE
          ],
          apiAction: BACKEND_ACTIONS.DESTROY,
        }
      };

      if (custom) {
        action[API]['customProperty'] = customProperty;
        expect(apiDestroy({ customProperty })).toEqual(action);
      } else 
        expect(apiDestroy()).toEqual(action);
    });
  });
});

  