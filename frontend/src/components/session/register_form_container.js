import { connect } from 'react-redux';
import { register } from '../../actions/session_actions';
import RegisterForm from './register_form';

const mapStateToProps = (state) => {
  const { isSignedIn, language } = state.session;
  
  return {
    isSignedIn,
    language,
    errors: state.errors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (user) => dispatch(register(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);