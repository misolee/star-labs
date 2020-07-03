import { 
  RECEIVE_CURRENT_USER, 
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGN_IN,
  CHANGE_LANGUAGE
} from '../actions/session_actions';

const initialState = {
  isAuthenticated: false,
  language: 'eng',
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        language: action.currentUser.language,
        user: action.currentUser
      };
    case RECEIVE_USER_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: undefined
      };
    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isSignedIn: true
      };
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language
      };
    default:
      return state;
  }
}