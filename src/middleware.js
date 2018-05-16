import {
  RSAA,
} from 'redux-api-middleware';
import {
  API,
} from './constants';


String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

/**
 * Generic middleware used to trigger RSAA actions.
 */
const middleware = (config = {}) => _store => next => action => {
  if (!action.hasOwnProperty(API)) return next(action);

  let {
    path,
    types = [],
    apiAction,
    apiResource,
    endpoint,
    body = {},    
    method = 'GET',
    headers = {},
    authorize = true,
  } = action[API];

  // Set default headers.
  headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...headers,
  };

  if (authorize && config.session && config.auth) {
    const {
      token,
      login,
      user = 'user',
    } = config.session;

    const {
      storage,
      encode,
      decode,
    } = config.auth;

    const tokenStored = storage.getItem(encode(token));
    const loginStored = storage.getItem(encode(login));

    headers = {
      ...headers,
      [`X-${user.capitalize()}-Token`]: decode(tokenStored),
      [`X-${user.capitalize()}-Email`]: decode(loginStored),
    };
  }

  let [
    requestType = '',
    successType = '',
    failureType = ''
  ] = types;

  if (typeof requestType === 'string' ) {
    requestType = {
      type: requestType,
      meta: {
        apiAction,
        apiResource,
      },
    };
  } else {
    requestType = {
      ...requestType,
      meta: {
        ...requestType.meta,
        apiAction,
        apiResource,
      },
    };
  }

  if (typeof successType === 'string' ) {
    successType = {
      type: successType,
      meta: {
        apiAction,
        apiResource,
      },
    };
  } else {
    successType = {
      ...successType,
      meta: {
        ...successType.meta,
        apiAction,
        apiResource,
      }
    };
  }

  if (typeof failureType === 'string' ) {
    failureType = {
      type: failureType,
      meta: (_action, _state, res) => {
        return  {
          status: {
            code: res.status,
          },
          apiAction,
          apiResource
        };
      }
    };
  } else {
    failureType = {
      ...failureType,
      meta: (_action, _state, res) => {
        return  {
          status: {
            code: res.status,
          },
          apiAction,
          apiResource,
          ...failureType.meta,
        };
      },
    };
  }

  // Trigger redux api middleware action.
  return next({
    [RSAA]: {
      endpoint: endpoint || `${config.baseUrl}/${path}`,
      body: method === 'GET' ? null : JSON.stringify(body),
      types: [
        requestType,
        successType,
        failureType
      ],
      headers,
      method,
    }
  });
};

export default middleware;