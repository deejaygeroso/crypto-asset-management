import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Portfolio from '../components/Portfolio';
import * as userActions from '../actions/userActions';
import * as cryptoIdsActions from '../actions/cryptoIdsActions';
import * as portfolioActions from '../actions/portfolioActions';

function mapStateToProps(state) {
  return {
    user                : state.user,
    cryptoListPortfolio : state.cryptoListPortfolio,
    portfoliosList      : state.portfoliosList,
    cryptoGlobal        : state.cryptoGlobal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      userActions: bindActionCreators(userActions, dispatch),
      cryptoIdsActions: bindActionCreators(cryptoIdsActions, dispatch),
      portfolioActions: bindActionCreators(portfolioActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
