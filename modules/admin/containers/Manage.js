import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Manage from '../components/Manage';
import * as userActions from '../../../actions/userActions';
import * as portfolioActions from '../../../actions/portfolioActions';

function mapStateToProps(state) {
  return {
    user        : state.user,
    userError   : state.userError,
    userSuccess : state.userSuccess,
    usersList   : state.usersList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      userActions: bindActionCreators(userActions, dispatch),
      portfolioActions: bindActionCreators(portfolioActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
