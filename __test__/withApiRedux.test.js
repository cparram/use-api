import React from 'react';
import withApiReduxConnected, { withApiRedux } from '../src/hocs/withApiRedux';
import configureMockStore from 'redux-mock-store';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { titleize, combine } from './utils';
import { getInit } from '../src/init';
import {
  BACKEND_ACTIONS
} from '../src/constants';
const mockStore = configureMockStore();



Enzyme.configure({ adapter: new Adapter() });

/**
 * Setup component to test
 *
 * @param {object} props - The props to the component (default: {}).
 */
const setup = Component => {
  const WithApiReduxConnected = withApiRedux(Component);

  const wrapper = mount(
    <WithApiReduxConnected
      onFetchingChange={jest.fn()}
      store={mockStore()}
    />
  );
  
  const ComponentWrapper = wrapper.find(Component);
  const componentInstance = ComponentWrapper.instance();
  return {
    wrapper,
    ComponentWrapper,
    componentInstance,
  };
};

describe('withApiRedux HOC', () => {

  const onComponentDidMount =  [
    'apiReduxNew',
    'apiReduxIndex',
    'apiReduxShow',
    'apiReduxEdit',
  ];

  combine(onComponentDidMount).forEach(methods => {  
    test(`Call ${methods} on componentDidMount`, () => {
      class Component extends React.Component {
        constructor(props) {
          super(props);

          methods.forEach(method => {
            this[method] = jest.fn();
          });
        }

        render() {
          return <div />;
        }
      }
      
      const {
        wrapper
      } = setup(Component);

      methods.forEach(method => {
        expect(wrapper.find(Component).instance()[method]).toHaveBeenCalledTimes(1);
      });
    });
  });

  combine(Object.keys(BACKEND_ACTIONS)).forEach(actions => {
    const backendActions = actions.map(action => BACKEND_ACTIONS[action]);

    test(`Call onFetchingChange when fetching change for ${backendActions}`, () => {
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }

      const {
        wrapper,
      } = setup(Component);

      [true, false].forEach(v => {
        const newProps = {};
        backendActions.forEach(backendAction => {
          newProps[backendAction] = {
            fetching: v
          };
        });
        wrapper.setProps(newProps);
        expect(wrapper.props().onFetchingChange).toHaveBeenLastCalledWith(v);
      });
    });
  });    
});