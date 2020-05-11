# useReduxApi [![Build Status](https://travis-ci.com/cparram/use-redux-api.svg?branch=master)](https://travis-ci.com/cparram/use-redux-api)

React Hook to manages Api calls with redux.

## Getting Started

These instructions will get you a copy of this package  up and running on your project.

### Install dependencies

Ensure packages are installed with correct version numbers by running:
  ```sh
  (
    export PKG=@cparram/use-redux-api;
    npm info "$PKG" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g; s/ *//g' | xargs npm install --save "$PKG"
  )
  ```

  Which produces and runs a command like:

  ```sh
  npm install --save @cparram/use-redux-api react@>=#.## react-redux@>=#.## redux@>=#.##
  ```

## Usage

1. Connect reducer into store configuration:

```js
import { combineReducers } from 'redux';
import { apiReducer } from '@cparram/use-redux-api';

const appReducer = combineReducers({
  api: apiReducer,
  // ... other reducers.
});
```

2. Use Hook into funcional components:
```js
import React, { useEffect } from 'react';
import useReduxApi from '@cparram/use-redux-api';

const Component = props => {
  const [api, apiCall] = useReduxApi('redux-store-key')
  // Call api on component mount
  useEffect(() => {
    apiCall({ endpoint: 'your-endpoint.com' })
  }, []) 
  // ... rest of the component
}
```
[![Edit @cparram/use-redux-api](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/cparramuse-redux-api-5g07i?autoresize=1&fontsize=14)

## CONTRIBUTING

As this project is build over node v11, the recomendation for development is docker. You can also use nvm.

### Development

#### Installing

A step by step series of examples that tell you how to get a development env running.

```sh
docker run -it --rm -v "$PWD":/app -w /app node:12 npm i 
```

#### Running the tests

Plese refer to travis config file

```sh
docker run -it --rm -v "$PWD":/app -w /app node:12 npm audit 
docker run -it --rm -v "$PWD":/app -w /app node:12 npm run lint
docker run -it --rm -v "$PWD":/app -w /app node:12 npm run build
docker run -it --rm -v "$PWD":/app -w /app node:12 npm run size
```

## Built With

* [Docker](https://www.docker.com) - Package Software into Standardized Units for Development, Shipment and Deployment.
* [React](https://reactjs.org) - Frontend framework.
* [Redux](https://redux.js.org) - A predictable state container for JavaScript.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/cparram/use-redux-api/tags). 

## Authors

* **César Parra** - *Initial work* - [@cparram](https://github.com/cparram)

See also the list of [contributors](https://github.com/cparram/use-redux-api/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details