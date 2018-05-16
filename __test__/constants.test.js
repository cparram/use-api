import {
  API,
  NAME,
  ACTIONS,
  BACKEND_ACTIONS
} from '../src/constants';

describe('Constants Module', () => {
  test('Exports API, NAME, ACTIONS and BACKEND_ACTIONS', () => {
    const constants = [
      API,
      NAME,
      ACTIONS,
      BACKEND_ACTIONS
    ];

    constants.forEach(constant => expect(constant).not.toBeFalsy());
  });

  test('Exports valid API', () => {
    expect(typeof API).toBe('string');
  });

  test('Exports valid NAME', () => {
    expect(typeof NAME).toBe('string');
  });

  test('Exports valid ACTIONS', () => {
    expect(typeof ACTIONS).toBe('object');

    const constants = [
      ACTIONS.API_NEW_START,
      ACTIONS.API_NEW_SUCCESS,
      ACTIONS.API_NEW_FAILURE,
      ACTIONS.API_CREATE_START,
      ACTIONS.API_CREATE_SUCCESS,
      ACTIONS.API_CREATE_FAILURE,
      ACTIONS.API_UPDATE_START,
      ACTIONS.API_UPDATE_SUCCESS,
      ACTIONS.API_UPDATE_FAILURE,
      ACTIONS.API_INDEX_START,
      ACTIONS.API_INDEX_SUCCESS,
      ACTIONS.API_INDEX_FAILURE,
      ACTIONS.API_SHOW_START,
      ACTIONS.API_SHOW_SUCCESS,
      ACTIONS.API_SHOW_FAILURE,
      ACTIONS.API_EDIT_START,
      ACTIONS.API_EDIT_SUCCESS,
      ACTIONS.API_EDIT_FAILURE,
      ACTIONS.API_DESTROY_START,
      ACTIONS.API_DESTROY_SUCCESS,
      ACTIONS.API_DESTROY_FAILURE,
      ACTIONS.CLEAR
    ];

    constants.forEach(constant => {
      expect(constant).not.toBeFalsy();
      expect(typeof constant).toBe('string');
    });

    const uniqTypes = constants.filter((current, i, list) => {
      return list.indexOf(current) === i;
    });
      
    expect(uniqTypes.length).toBe(constants.length);
  });

  test('Exports valid BACKEND_ACTIONS', () => {
    const constants = [
      BACKEND_ACTIONS.NEW,
      BACKEND_ACTIONS.CREATE,
      BACKEND_ACTIONS.UPDATE,
      BACKEND_ACTIONS.INDEX,
      BACKEND_ACTIONS.SHOW,
      BACKEND_ACTIONS.EDIT,
      BACKEND_ACTIONS.DESTROY,
    ];

    constants.forEach(constant => {
      expect(constant).not.toBeFalsy();
      expect(typeof constant).toBe('string');
    });

    const uniqTypes = constants.filter((current, i, list) => {
      return list.indexOf(current) === i;
    });
      
    expect(uniqTypes.length).toBe(constants.length);
  });
});

  