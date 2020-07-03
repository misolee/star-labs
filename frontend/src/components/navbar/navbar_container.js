import { connect } from 'react-redux';
import { changeLanguage } from '../../actions/session_actions';
import Navbar from './navbar';

const mapStateToProps = (state) => {
  return {
    language: state.session.language,
  };
};

const mapDispatchToProps = dispatch => ({
  changeLanguage: (language) => dispatch(changeLanguage(language))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);