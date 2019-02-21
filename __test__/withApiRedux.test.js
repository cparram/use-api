import React from 'react';
import withApiReduxConnected, { withApiRedux } from '../src/hocs/withApiRedux';
import configureMockStore from 'redux-mock-store';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
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

  test(`Use apiReduxRef overrides ref`, () => {
    class Component extends React.Component {
      componentDidMount() {
        this.props.apiReduxRef(this)
      };

      render() {
        return <div />;
      }
    }

    class Parent extends React.Component {      
      render() {
        return <Component {...this.props}/>;
      }
    }

    const {
      wrapper,
    } = setup(Parent);

    expect(wrapper.instance().getWrapped().constructor.name).toBe('Component')
  });

  const truthy = [true, -1, 1, ' ', [], {}];
  const falsy  = [false, 0, '', null, undefined, NaN];

  [
    ['Index', 'records'],
    ['New', 'record'],
    ['Create', 'record'],
    ['Update', 'record'],
    ['Show', 'record'],
    ['Edit', 'record'],
    ['Destroy', 'record']
  ].forEach(config => {
    const [action, scope] = config;
    const method = `onApiRedux${action}`;

    truthy.forEach(t => {
      const t_v = JSON.stringify(t);

      falsy.forEach(f => {
        [true, false].forEach(arg => {
          test(`Call ${method} with ${arg} argument when error is "${arg ? f : t_v}" and ${scope} is "${arg ? t_v : f}"`, () => {
            class Component extends React.Component {
              constructor(props) {
                super(props);
                this[method] = jest.fn();
              }

              render() {
                return <div />;
              }
            }
            
            const {
              wrapper,
              componentInstance
            } = setup(Component);

            [true, false].forEach(fetching => {
              wrapper.setProps({
                [BACKEND_ACTIONS[action.toUpperCase()]]: {
                  [scope]: arg ? t : f,
                  error: arg ? f : t,
                  fetching
                }
              });
            });
            expect(componentInstance[method]).toHaveBeenCalledTimes(1);
            expect(componentInstance[method]).toBeCalledWith(arg);
          });
        });
      });
    });
  });

      
});