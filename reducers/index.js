import { combineReducers } from 'redux';

import { user, userSuccess,  userError, usersList } from './userReducer';
import { portfolio, portfolioSuccess,  portfolioError, portfoliosList } from './portfolioReducer';
import { cryptoIds, cryptoIdsError } from './cryptoIdsReducer';
import { cryptoList, cryptoListPortfolio, cryptoGlobal } from './cryptoListReducer';
import { cryptoHistory, cryptoAth, cryptoAtl } from './cryptoHistoryReducer';

export default combineReducers({
    user,
    userSuccess,
    userError,
    usersList,

    portfolio,
    portfolioSuccess,
    portfolioError,
    portfoliosList,

    cryptoIds,
    cryptoIdsError,

    cryptoList,
    cryptoListPortfolio,
    cryptoGlobal,

    cryptoHistory,
    cryptoAth,
    cryptoAtl,
});
