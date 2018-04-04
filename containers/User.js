import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import User from '../components/User';
import * as userActions from '../actions/userActions';
import * as cryptoListActions from '../actions/cryptoListActions';
import * as cryptoHistoryActions from '../actions/cryptoHistoryActions';

function mapStateToProps(state) {
  return {
    user: state.user,
    cryptoList : state.cryptoList,
    cryptoHistory : state.cryptoHistory,
    cryptoAth: state.cryptoAth,
    cryptoAtl: state.cryptoAtl,
    cryptoGlobal: state.cryptoGlobal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      userActions: bindActionCreators(userActions, dispatch),
      cryptoListActions: bindActionCreators(cryptoListActions, dispatch),
      cryptoHistoryActions: bindActionCreators(cryptoHistoryActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
