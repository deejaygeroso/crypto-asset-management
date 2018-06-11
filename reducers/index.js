import { combineReducers } from 'redux';

import { user, userSuccess,  userError, usersList } from './userReducer';
import { portfolio, portfolioSuccess,  portfolioError, portfolioList } from './portfolioReducer';
import { cryptoIds, cryptoIdsError } from './cryptoIdsReducer';
import { cryptoHistory, priceAth, priceAtl, volumeAth, volumeAtl } from './cryptoHistoryReducer';
import { cryptoChartsList } from './cryptoChartsReducer';
import { itemListInit } from './itemListReducer'
import { itemInit } from './itemReducer'

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

    cryptoHistory,
    priceAth,
    priceAtl,
    volumeAth,
    volumeAtl,

    link     : itemInit('link'),
    linkList : itemListInit('link'),
    cryptoChartsList,

    transaction     : itemInit('transaction'),
    transactionList : itemListInit('transaction'),
});
