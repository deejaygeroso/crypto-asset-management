import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserPortfolio from '../../components/admin/UserPortfolio';
import * as userActions from '../../actions/userActions';
import * as cryptoIdsActions from '../../actions/cryptoIdsActions';
import * as portfolioActions from '../../actions/portfolioActions';

function mapStateToProps(state) {
  return {
    user                : state.user,
    portfoliosList      : state.portfoliosList,
    cryptoListPortfolio : state.cryptoListPortfolio,
    cryptoGlobal        : state.cryptoGlobal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      userActions      : bindActionCreators(userActions, dispatch),
      cryptoIdsActions : bindActionCreators(cryptoIdsActions, dispatch),
      portfolioActions : bindActionCreators(portfolioActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPortfolio);
