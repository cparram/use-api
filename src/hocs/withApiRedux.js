import React from 'react';
import { connect } from 'react-redux';
import {
  apiNew,
  apiCreate,
  apiUpdate,
  apiIndex,
  apiShow,
  apiEdit,
  apiDestroy,
  clear
} from '../actions';
import {
  BACKEND_ACTIONS,
} from '../constants';
import {
  getApiReduxByResource
} from '../selectors';
import {
  getDisplayName
} from './utils';
import {
  initCreate,
  initNew,
  initUpdate,
  initEdit,
  initShow,
  initDestroy,
  initIndex,
} from '../init';
import PropType from 'prop-types';

export const withApiRedux = (WrappedComponent) => {

  const propTypes = {
    onFetchingChange: PropType.func
  };

  const defaultProps = {
    [BACKEND_ACTIONS.CREATE]: initCreate,
    [BACKEND_ACTIONS.NEW]: initNew,
    [BACKEND_ACTIONS.UPDATE]: initUpdate,
    [BACKEND_ACTIONS.EDIT]: initEdit,
    [BACKEND_ACTIONS.SHOW]: initShow,
    [BACKEND_ACTIONS.DESTROY]: initDestroy,
    [BACKEND_ACTIONS.INDEX]: initIndex,
  };

  /**
   * HOC Component that wrapps api actions and state for any component.
   *
   * @author [César Parra](https://github.com/cparram)
   */
  class WithApiRedux extends React.Component {

    componentDidMount() {
      const {
        apiReduxNew,
        apiReduxIndex,
        apiReduxShow,
        apiReduxEdit,
      } = this.getWrapped();

      apiReduxNew && apiReduxNew();
      apiReduxIndex && apiReduxIndex();
      apiReduxShow && apiReduxShow();
      apiReduxEdit && apiReduxEdit();
    }

    componentDidUpdate(prevProps, _prevState) {
      const {
        onFetchingChange,
      } = this.props;      

      const actions = [
        { action: 'New' },
        { action: 'Create' },
        { action: 'Update' },
        { action: 'Show' },
        { action: 'Edit' },
        { action: 'Destroy' },
        { action: 'Index', scope: 'Records' },
      ];

      const fetching = this.isFetching(actions, this.props);
      const prevFetching = this.isFetching(actions, prevProps);

      if (fetching !== prevFetching)
        onFetchingChange &&
          onFetchingChange(fetching);

      actions.forEach(({action, scope = 'Record'}) => {
        const apiAction = this.props[BACKEND_ACTIONS[action.toUpperCase()]];
        const prevAction = prevProps[BACKEND_ACTIONS[action.toUpperCase()]];

        if (apiAction.fetching === prevAction.fetching ||
              apiAction.fetching)
          return;

        const method = `onApiRedux${action}`;
        this.getWrapped()[method] &&
          this.getWrapped()[method](apiAction.error || apiAction[scope.toLowerCase()]);
      });
    }

    isFetching(actions, props) {
      return actions.reduce((acc, { action }) => {
        const apiAction = props[BACKEND_ACTIONS[action.toUpperCase()]];
        return acc || apiAction.fetching;
      }, false);
    }

    getWrapped = () => this.apiReduxRef || this.wrapped;

    render() {
      return (
        <WrappedComponent
          apiReduxRef={ref => this.apiReduxRef = ref}
          ref={ref => this.wrapped = ref}
          { ...this.props }
        />
      );
    }
  }
  WithApiRedux.displayName = `WithApiRedux(${getDisplayName(WrappedComponent)})`;
  WithApiRedux.propTypes = propTypes;
  WithApiRedux.defaultProps = defaultProps;
  
  return WithApiRedux;
};

export default (WrappedComponent) => {

  const mapStateToProps = getApiReduxByResource;

  const mapDispatchToProps = (dispatch, { apiResource }) => ({
    apiNewRequest: opts => {
      return dispatch(apiNew({ apiResource, ...opts }));
    },
    apiCreateRequest: opts => {
      dispatch(apiCreate({ apiResource, ...opts }));
    },
    apiUpdateRequest: opts => {
      dispatch(apiUpdate({ apiResource, ...opts }));
    },
    apiIndexRequest: opts => {
      dispatch(apiIndex({ apiResource, ...opts }));
    },
    apiShowRequest: opts => {
      dispatch(apiShow({ apiResource, ...opts }));
    },
    apiEditRequest: opts => {
      dispatch(apiEdit({ apiResource, ...opts }));
    },
    apiDestroyRequest: opts => {
      dispatch(apiDestroy({ apiResource, ...opts }));
    },
    clearAction: (apiAction, apiResource) => {
      dispatch(clear(apiAction, apiResource));
    }
  });

  const component = withApiRedux(WrappedComponent);
  
  return connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { withRef: true }
  )(component);
};