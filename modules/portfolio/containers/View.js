import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import View from '../components/View';
import * as itemActions from '../../../actions/itemActions';
import * as itemListActions from '../../../actions/itemListActions';
import * as userActions from '../../../actions/userActions';
import * as cryptoIdsActions from '../../../actions/cryptoIdsActions';
import * as portfolioActions from '../../../actions/portfolioActions';
import * as cryptoChartsActions from '../../../actions/cryptoChartsActions';

function mapStateToProps(state) {
  return {
    user             : state.user,
    cryptoIds        : state.cryptoIds,
    portfolio        : state.portfolio,
    portfolioError   : state.portfolioError,
    portfolioSuccess : state.portfolioSuccess,
    linkList         : state.linkList,
    cryptoChartsList : state.cryptoChartsList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      itemActions: bindActionCreators(itemActions, dispatch),
      itemListActions: bindActionCreators(itemListActions, dispatch),
      userActions: bindActionCreators(userActions, dispatch),
      cryptoIdsActions: bindActionCreators(cryptoIdsActions, dispatch),
      portfolioActions: bindActionCreators(portfolioActions, dispatch),
      cryptoChartsActions: bindActionCreators(cryptoChartsActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(View);
