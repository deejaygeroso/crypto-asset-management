import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Subscribe from '../components/Subscribe';
import * as userActions from '../../../actions/userActions';
import * as itemActions from '../../../actions/itemActions';

function mapStateToProps(state) {
  return {
    user : state.user,
    transaction : state.transaction,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      userActions: bindActionCreators(userActions, dispatch),
      itemActions: bindActionCreators(itemActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);
