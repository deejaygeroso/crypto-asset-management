import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navbar from '../components/Navbar';
import * as userActions from '../actions/userActions';

function mapStateToProps(state) {
  return {
    user : state.user,
    userError : state.userError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      userActions: bindActionCreators(userActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
