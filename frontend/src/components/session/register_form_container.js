import { connect } from 'react-redux';
import { register, clearErrors } from '../../actions/session_actions';
import RegisterForm from './register_form';

const mapStateToProps = (state) => {
  const { isSignedIn, language } = state.session;
  
  return {
    isSignedIn,
    language,
    errors: state.errors.register,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (user) => dispatch(register(user)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);