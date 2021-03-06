import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MainPage from '../components/MainPage';
import * as userActions from '../../../actions/userActions';
import * as cryptoIdsActions from '../../../actions/cryptoIdsActions';
import * as portfolioActions from '../../../actions/portfolioActions';

function mapStateToProps(state) {
  return {
    user:                state.user,
    portfolioList:       state.portfolioList,
    cryptoHistory:       state.cryptoHistory,
    priceAth:            state.priceAth,
    priceAtl:            state.priceAtl,
    volumeAth:           state.volumeAth,
    volumeAtl:           state.volumeAtl,
    cryptoGlobal:        state.cryptoGlobal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      userActions: bindActionCreators(userActions, dispatch),
      cryptoIdsActions: bindActionCreators(cryptoIdsActions, dispatch),
      portfolioActions: bindActionCreators(portfolioActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
