import { connect } from 'react-redux';
import { changeLanguage } from '../../actions/session_actions';
import Navbar from './navbar';

const mapStateToProps = (state) => {
  let sessionLanguage = state.session.language ? state.session.language : state.session.user.language;
  
  return {
    language: sessionLanguage,
  };
};

const mapDispatchToProps = dispatch => ({
  changeLanguage: (language) => dispatch(changeLanguage(language))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);