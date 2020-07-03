import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import LoginForm from './login_form.jsx';

const mapStateToProps = (state) => {  
  return {
    language: state.session.language,
    errors: state.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: user => dispatch(login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);