import { combineReducers } from 'redux';

import { user, userSuccess,  userError, usersList } from './userReducer';
import { portfolio, portfolioSuccess,  portfolioError, portfolioList } from './portfolioReducer';
import { cryptoIds, cryptoIdsError } from './cryptoIdsReducer';
import { cryptoList, cryptoListPortfolio, cryptoGlobal } from './cryptoListReducer';
import { cryptoHistory, priceAth, priceAtl, volumeAth, volumeAtl } from './cryptoHistoryReducer';

export default combineReducers({
    user,
    userSuccess,
    userError,
    usersList,

    portfolio,
    portfolioSuccess,
    portfolioError,
    portfolioList,

    cryptoIds,
    cryptoIdsError,

    cryptoList,
    cryptoListPortfolio,
    cryptoGlobal,

    cryptoHistory,
    priceAth,
    priceAtl,
    volumeAth,
    volumeAtl,
});
