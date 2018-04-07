import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormPage from '../../components/portfolio/FormPage';
import * as userActions from '../../actions/userActions';
import * as cryptoIdsActions from '../../actions/cryptoIdsActions';
import * as portfolioActions from '../../actions/portfolioActions';

function mapStateToProps(state) {
  return {
    user             : state.user,
    cryptoIds        : state.cryptoIds,
    portfolio        : state.portfolio,
    portfolioError   : state.portfolioError,
    portfolioSuccess : state.portfolioSuccess,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      userActions: bindActionCreators(userActions, dispatch),
      cryptoIdsActions: bindActionCreators(cryptoIdsActions, dispatch),
      portfolioActions: bindActionCreators(portfolioActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
