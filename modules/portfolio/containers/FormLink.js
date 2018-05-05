import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormLink from '../components/FormLink';

import * as itemActions from '../../../actions/itemActions';
import * as itemListActions from '../../../actions/itemListActions';

function mapStateToProps(state) {
  return {
    user             : state.user,
    linkList         : state.linkList,
    portfolio        : state.portfolio,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      itemActions: bindActionCreators(itemActions, dispatch),
      itemListActions: bindActionCreators(itemListActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLink);