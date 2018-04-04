import * as ACTION_TYPES from '../types/cryptoListTypes';
import {
    indexBy as __$indexBy,
    findWhere as __$findWhere,
    // pluck as __$pluck,
} from 'underscore';

/* ----------------------------------------------------------
 * This is used for the main page list only base on user profile
 * -------------------------------------------------------- */
export const cryptoList = (state = {}, {type, payload, user}) => {
    switch (type) {
        case ACTION_TYPES.CRYPTO_LIST_SET: {
            const byId = __$indexBy(payload, 'id');
            const allIds = Object.keys(byId);
            return Object.assign({}, { byId, allIds });
        }
        case ACTION_TYPES.CRYPTO_LIST_COMPOSE: {
            const { crypto_ids } = user;
            const coinData = []

            // get only the coin that the user needs from all the payload fretched from coinmarket api
            crypto_ids.map(coin=>{
                coinData.push(__$findWhere(payload, {id: coin}));
            })

            // normalize
            const byId = __$indexBy(coinData, 'id');
            const allIds = Object.keys(byId);
            return Object.assign({}, { byId, allIds });
        }
        default:
            return state;
    }
}

/* ----------------------------------------------------------
 * CryptoList only for portfolio usage based on users portfolio
 * -------------------------------------------------------- */
export const cryptoListPortfolio = (state = {}, {type, payload, portfolio, item}) => {
    switch (type) {
        case ACTION_TYPES.CRYPTO_LIST_PORTFOLIO_APPEND: {
            const { byId } = state;
            byId[item._id] = item;
            const allIds = Array.prototype.concat([item._id], state.allIds)
            return Object.assign({}, state, { allIds, byId });
        }
        case ACTION_TYPES.CRYPTO_LIST_PORTFOLIO_COMPOSE: {
            const newPortfolioList = [];

            Object.keys(portfolio).map(i=>{
                // find from the cryptoList fetched from coinmarket api that matches the uses portfolio
                const payloadMatch = __$findWhere(payload, {id: portfolio[i]['id']})
                // combine the amount & _id from the current coin of portfolio to the new portfoliolist
                newPortfolioList.push( Object.assign({}, payloadMatch, portfolio[i] ) );
            })

            // normalize using _id. We did not use id to allow duplication of data
            const byId = __$indexBy(newPortfolioList, '_id');
            const allIds = Object.keys(byId);
            return  Object.assign({}, { byId, allIds });
        }
        case ACTION_TYPES.CRYPTO_LIST_PORTFOLIO_CLEAR:
            return {};
        default:
            return state;
    }
}

export const cryptoGlobal = (state={}, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.CRYPTO_GLOBAL_SET:
            return payload
        case ACTION_TYPES.CRYPTO_GLOBAL_APPEND_TOTAL_CRYPTO:
            return Object.assign({}, state, payload)
        default:
            return state;
    }
}
