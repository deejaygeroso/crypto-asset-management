import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/Home';
import * as cryptoHistoryActions from '../actions/cryptoHistoryActions';

function mapStateToProps(state) {
  return {
    cryptoList : state.cryptoList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      cryptoHistoryActions: bindActionCreators(cryptoHistoryActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
