import * as ACTION_TYPES from '../types/portfolioTypes';
import { 
    indexBy as __$indexBy,
    findWhere as __$findWhere,
} from 'underscore';

const initialPortfolio = { email: '' };
export const portfolio = (state = initialPortfolio, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.ITEM_SET: {
            return Object.assign({}, payload);
        }
        case ACTION_TYPES.ITEM_CLEAR:
            return initialPortfolio;
        default:
            return state;
    }
}

// must double check latera
const initialPortfolioSuccess = { message: '' };
export const portfolioSuccess = (state = initialPortfolioSuccess, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.SUCCESS_SET: {
            const { message } = payload;
            return Object.assign({}, state, {message});
        }
        case ACTION_TYPES.SUCCESS_CLEAR:
            return initialPortfolioSuccess;
        default:
            return state;
    }
}

// must double check latera
const initialPortfolioError = { message: '' };
export const portfolioError = (state = initialPortfolioError, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.ERROR_SET: {
            const { message } = payload;
            return Object.assign({}, state, {message});
        }
        case ACTION_TYPES.ERROR_CLEAR:
            return initialPortfolioError;
        default:
            return state;
    }
}

const initialPortfoliosList = { byId: {}, allIds: [] };
export const portfolioList = (state = initialPortfoliosList, {type, payload, item, portfolioList, coinmarketcapTicker}) => {
    switch (type) {
        case ACTION_TYPES.ITEMLIST_SET: {
            const byId = __$indexBy(payload, '_id');
            const allIds = Object.keys(byId)
            return Object.assign({}, state, { allIds, byId });
        }
        case ACTION_TYPES.ITEMLIST_COMPOSE: {
            const newPortfolioList = [];
            Object.keys(portfolioList).map(i=>{
                // find from the coinmarketcap ticker Data fetched from coinmarket api that matches the portfolio of user
                const coinmarketcapTickerMatched = __$findWhere(coinmarketcapTicker, {id: portfolioList[i]['id']})
                // combine the coinmarketcap ticker Data and the portfolio that matched
                newPortfolioList.push( Object.assign({}, coinmarketcapTickerMatched, portfolioList[i] ) );
            })

            // normalize using _id. We did not use id to allow duplication of data
            const byId = __$indexBy(newPortfolioList, '_id');
            const allIds = Object.keys(byId);
            return  Object.assign({}, { byId, allIds });
        }
        case ACTION_TYPES.ITEMLIST_APPEND: {
            const { byId } = state;
            byId[item._id] = item;
            const allIds = Array.prototype.concat([item._id], state.allIds)
            return Object.assign({}, state, { allIds, byId });
        }
        case ACTION_TYPES.ITEMLIST_PATCH:{
            state.byId[item._id] = item;
            return Object.assign({}, state);
        }
        case ACTION_TYPES.ITEMLIST_REMOVE: {
            const { _id } = item;
            var index = state.allIds.indexOf(_id);
            if (index > -1) {
                state.allIds.splice(index, 1);
            }
            return Object.assign({}, state);
        }
        case ACTION_TYPES.ITEMLIST_CLEAR:
            return initialPortfoliosList;
        default:
            return state;
    }
}
