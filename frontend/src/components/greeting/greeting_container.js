import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Greeting from './greeting';

const mapStateToProps = (state) => {
  let sessionLanguage = state.session.language ? state.session.language : state.session.user.language;
  console.log('sessionLanguage', sessionLanguage)
  return {
    language: sessionLanguage,
    user: state.session.user
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);