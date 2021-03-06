import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER,
  CLEAR_ERRORS
} from '../actions/session_actions';

export default function(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      const errorMap = {};
      errorMap[action.page] = action.errors;
      return errorMap;
    case RECEIVE_CURRENT_USER:
      return {};
    case CLEAR_ERRORS:
      return {}
    default:
      return state;
  }
};