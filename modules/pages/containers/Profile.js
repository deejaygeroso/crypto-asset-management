import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Profile from '../account/Profile';
import * as userActions from '../../../actions/userActions';
import * as cryptoIdsActions from '../../../actions/cryptoIdsActions';

function mapStateToProps(state) {
  return {
    user: state.user,
    userSuccess: state.userSuccess,
    userError : state.userError,
    cryptoIds: state.cryptoIds,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      userActions: bindActionCreators(userActions, dispatch),
      cryptoIdsActions: bindActionCreators(cryptoIdsActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
