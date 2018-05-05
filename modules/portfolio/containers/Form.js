import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Form from '../components/Form';
import * as itemActions from '../../../actions/itemActions';
import * as itemListActions from '../../../actions/itemListActions';
import * as userActions from '../../../actions/userActions';
import * as cryptoIdsActions from '../../../actions/cryptoIdsActions';
import * as portfolioActions from '../../../actions/portfolioActions';

function mapStateToProps(state) {
  return {
    user             : state.user,
    cryptoIds        : state.cryptoIds,
    portfolio        : state.portfolio,
    portfolioError   : state.portfolioError,
    portfolioSuccess : state.portfolioSuccess,
    linkList         : state.linkList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      itemActions: bindActionCreators(itemActions, dispatch),
      itemListActions: bindActionCreators(itemListActions, dispatch),
      userActions: bindActionCreators(userActions, dispatch),
      cryptoIdsActions: bindActionCreators(cryptoIdsActions, dispatch),
      portfolioActions: bindActionCreators(portfolioActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
