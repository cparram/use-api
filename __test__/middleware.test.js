import middleware from '../src/middleware';
import {
  ACTIONS,
  BACKEND_ACTIONS,
  API,
} from '../src/constants';
import {
  RSAA,
} from 'redux-api-middleware';

const create = config => {
  const next = jest.fn();
  const invoke = action => middleware(config || {})()(next)(action);

  return {
    next,
    invoke
  };
};

describe('Middlware module', () => {
  test('Passes through non-function action', () => {
    const { next, invoke } = create();
    const action = { type: 'TEST' };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  describe('Passes RSAA action', () => {
    test('With endpoint', () => {
      const { next, invoke } = create();
      const endpoint = 'test';

      const action = {
        [API]: {
          endpoint,
        }
      };
      invoke(action);

      expect(next).toHaveBeenCalledWith({
        [RSAA]: {
          endpoint,
          body: null,
          types: expect.anything(),
          headers: expect.anything(),
          method: expect.anything()
        }
      });
    });

    test('With baseUrl and path', () => {
      const baseUrl = 'http://localhost.com/';
      const { next, invoke } = create({ baseUrl });
      const path = 'test';

      const action = {
        [API]: {
          path,
        }
      };
      invoke(action);

      expect(next).toHaveBeenCalledWith({
        [RSAA]: {
          endpoint: `${baseUrl}/${path}`,
          body: null,
          types: expect.anything(),
          headers: expect.anything(),
          method: expect.anything()
        }
      });
    });

    test('With default GET method', () => {
      const { next, invoke } = create();

      const action = {
        [API]: {
        }
      };
      invoke(action);

      expect(next).toHaveBeenCalledWith({
        [RSAA]: {
          endpoint: expect.anything(),
          body: null,
          types: expect.anything(),
          headers: expect.anything(),
          method: 'GET'
        }
      });
    });

    test('With custom method', () => {
      const { next, invoke } = create();

      const action = {
        [API]: {
          method: 'custom'
        }
      };
      invoke(action);

      expect(next).toHaveBeenCalledWith({
        [RSAA]: {
          endpoint: expect.anything(),
          body: expect.anything(),
          types: expect.anything(),
          headers: expect.anything(),
          method: 'custom'
        }
      });
    });

    test('With default headers', () => {
      const { next, invoke } = create();

      const action = {
        [API]: {
        }
      };
      invoke(action);

      expect(next).toHaveBeenCalledWith({
        [RSAA]: {
          endpoint: expect.anything(),
          body: null,
          types: expect.anything(),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'GET'
        }
      });
    });

    test('With custom headers', () => {
      const { next, invoke } = create();

      const action = {
        [API]: {
          headers: {
            'x-custom-header': 'custom'
          }
        }
      };
      invoke(action);

      expect(next).toHaveBeenCalledWith({
        [RSAA]: {
          endpoint: expect.anything(),
          body: null,
          types: expect.anything(),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-custom-header': 'custom'
          },
          method: 'GET'
        }
      });
    });

    test('With null body for GET method', () => {
      const { next, invoke } = create();

      const action = {
        [API]: {
          method: 'GET',
          body: { message: 'safd' }
        }
      };
      invoke(action);

      expect(next).toHaveBeenCalledWith({
        [RSAA]: {
          endpoint: expect.anything(),
          body: null,
          types: expect.anything(),
          headers: expect.anything(),
          method: expect.anything()
        }
      });
    });

    test('With custom body', () => {
      const { next, invoke } = create();

      const action = {
        [API]: {
          method: 'other',
          body: { message: 'safd' }
        }
      };
      invoke(action);

      expect(next).toHaveBeenCalledWith({
        [RSAA]: {
          endpoint: expect.anything(),
          body: JSON.stringify({ message: 'safd' }),
          types: expect.anything(),
          headers: expect.anything(),
          method: expect.anything()
        }
      });
    });

    test('Adding apiAction and apiResource as meta for each string type', () => {
      const { next, invoke } = create();
      const apiResource = '@_resource_@';
      const apiAction = BACKEND_ACTIONS.NEW;

      const action = {
        [API]: {
          types: [
            'START',
            'SUCCESS',
            'FAILURE'
          ],
          apiResource,
          apiAction
        }
      };
      invoke(action);

      expect(next).toHaveBeenCalledWith({
        [RSAA]: {
          endpoint: expect.anything(),
          body: null,
          types: [
            {
              type: 'START',
              meta: {
                apiAction,
                apiResource
              }
            },
            {
              type: 'SUCCESS',
              meta: {
                apiAction,
                apiResource
              }
            },
            {
              type: 'FAILURE',
              meta: expect.any(Function)
            }
          ],
          headers: expect.anything(),
          method: expect.anything()
        }
      });
    });

    test('Adding apiAction and apiResource as meta for each object type', () => {
      const { next, invoke } = create();
      const apiResource = '@_resource_@';
      const apiAction = BACKEND_ACTIONS.NEW;

      const action = {
        [API]: {
          types: [
            { type: 'START' },
            { type: 'SUCCESS'},
            { type: 'FAILURE'}
          ],
          apiResource,
          apiAction
        }
      };
      invoke(action);

      expect(next).toHaveBeenCalledWith({
        [RSAA]: {
          endpoint: expect.anything(),
          body: null,
          types: [
            {
              type: 'START',
              meta: {
                apiAction,
                apiResource
              }
            },
            {
              type: 'SUCCESS',
              meta: {
                apiAction,
                apiResource
              }
            },
            {
              type: 'FAILURE',
              meta: expect.any(Function)
            }
          ],
          headers: expect.anything(),
          method: expect.anything()
        }
      });
    });

  });
    
});