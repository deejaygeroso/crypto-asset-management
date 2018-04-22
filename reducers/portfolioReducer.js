import * as ACTION_TYPES from '../types/portfolioTypes';
import { 
    indexBy as __$indexBy,
    findWhere as __$findWhere,
    uniq as __$uniq,
} from 'underscore';
import __sort, { ASC, DESC } from 'sort-array-objects';

/* ----------------------------------------------------------------------------------
 * For editing specific portfolio only 
 * -------------------------------------------------------------------------------- */
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

/* ----------------------------------------------------------------------------------
 * For portfolio success message 
 * -------------------------------------------------------------------------------- */
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

/* ----------------------------------------------------------------------------------
 * For portfolio error message
 * -------------------------------------------------------------------------------- */
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

/* ----------------------------------------------------------------------------------
 * This will be the data that will be shown on portfolio page 
 * -------------------------------------------------------------------------------- */
const initialPortfoliosList = { 
    byId: {}, 
    allIds: [],
    allIds_profitMargin: [],
    list: [],
};
export const portfolioList = (state = initialPortfoliosList, {
    type, payload, item, portfolioList, coinmarketcapTicker, sortFieldName, sortFieldStatus,
}) => {
    switch (type) {
        /*
         * depecrated use compose instead
         */
        case ACTION_TYPES.ITEMLIST_SET: {
            const byId = __$indexBy(payload, '_id');
            const allIds = Object.keys(byId)
            return Object.assign({}, state, { allIds, byId });
        }
        /*
         * combnes cmcTicker with users portfolio
         */
        case ACTION_TYPES.ITEMLIST_COMPOSE: {
            const newPortfolioList = [];
            Object.keys(portfolioList).map(i=>{
                if(portfolioList[i].isCustom){
                    // if portfolio is custom or does not exist yet on coinmarket api then set default 0 values
                    newPortfolioList.push(getNewPortfolioWithFloatData(portfolioList[i], {}));
                }else{
                    // find from the coinmarketcap ticker Data fetched from coinmarket api that matches the portfolio of user
                    const coinmarketcapTickerMatched = __$findWhere(coinmarketcapTicker, {id: portfolioList[i]['id']})
                    // add the new portfolio to the list with converted float values
                    newPortfolioList.push(getNewPortfolioWithFloatData(portfolioList[i], coinmarketcapTickerMatched));
                }
            })

            const totalValuation = calculateTotalValuation(newPortfolioList) || 0;

            // calcualte allocation which needs total valuation of portfolio
            calculateAllocation(newPortfolioList, totalValuation);

            // normalize using _id. We did not use id to allow duplication of data
            const byId = __$indexBy(newPortfolioList, '_id');
            const allIds = Object.keys(byId);

            // normalized to avoid duplication of the data this will be used on other stats and volume overview and no custom coin
            const uniqId = __$uniq(newPortfolioList, 'id');
            const allIds_withoutCustomPortfolio = []
            uniqId.map(portfolio =>{
                if(!portfolio.isCustom){
                    allIds_withoutCustomPortfolio.push(portfolio._id);
                }
            }); // get all the _id from newPortfolioList (uniqe crypto name. data that has been pushed already from the array were ommitted)


            return  Object.assign({}, { 
                        byId, // list of all portfolio data which is in object with _id as its key
                        allIds, // array of _ids of user's portfolio. Not used by any components anymore but as reference only.
                        list: newPortfolioList, // just list of portolio data which is in array
                        allIds_profitMargin: allIds, // used under profit margin
                        allIds_otherStats: allIds_withoutCustomPortfolio, // used under other stats & volume overview
                        totalValuation, // total valuation of all portfolio
                    });
        }
        /*
         * append the newly created portfolio here
         * I should check whether if adding new data will have a cmcTicker data
         */
        case ACTION_TYPES.ITEMLIST_APPEND: {
            const { byId } = state;
            byId[item._id] = item;
            const allIds = Array.prototype.concat([item._id], state.allIds)
            const allIds_profitMargin = Array.prototype.concat([item._id], state.allIds_profitMargin)
            const allIds_otherStats   = Array.prototype.concat([item._id], state.allIds_otherStats)
            return Object.assign({}, state, { allIds, byId, allIds_profitMargin, allIds_otherStats });
        }
        /*
         * update data from a specific portfolio on byId
         */
        case ACTION_TYPES.ITEMLIST_PATCH:{
            state.byId[item._id] = item;
            return Object.assign({}, state);
        }
        /*
         * Remove data from allIds
         * Need to double check later for sorting
         */
        case ACTION_TYPES.ITEMLIST_REMOVE: {
            const { _id } = item;
            const newState = Object.assign({}, state);
            // just remove the id/key from the allIds though not used by component anymore but only as reference.
            const index = newState.allIds.indexOf(_id);
            if (index > -1) {
                newState.allIds.splice(index, 1);
            }

            // just remove the id/key from the allIds_profitMargin
            const index_profitMargin = newState && newState.allIds_otherStats && newState.allIds_profitMargin.indexOf(_id);
            if (index_profitMargin > -1) {
                newState.allIds_profitMargin.splice(index_profitMargin, 1);
            }

            // just remove the id/key from the allIds_otherstats
            const index_otherStats = newState && newState.allIds_otherStats && newState.allIds_otherStats.indexOf(_id);
            if (index_otherStats > -1) {
                newState.allIds_otherStats.splice(index_otherStats, 1);
            }

            return Object.assign({}, newState);
        }
        /*
         * clear all list
         */
        case ACTION_TYPES.ITEMLIST_CLEAR: {
            return initialPortfoliosList;
        }
        /*
         * sorting of profit margin
         */
        case ACTION_TYPES.ITEMLIST_SORTDATA:{

            const { list } = state;
            
            let sortList = [];
            if(sortFieldStatus==='up'){
                sortList = __sort(list, [sortFieldName], ASC);
            }
            if(sortFieldStatus==='down'){
                sortList = __sort(list, [sortFieldName], DESC);
            }
            
            const byId = __$indexBy(sortList, '_id');
            
            const allIds_profitMargin = Object.keys(byId);
            return Object.assign({}, state, { allIds_profitMargin });
        }
        /*
         * sorting of other stats
         */
        case ACTION_TYPES.ITEMLIST_OTHER_STATS_SORTDATA:{

            const { list } = state;
            
            let sortList = [];
            if(sortFieldStatus==='up'){
                sortList = __sort(list, [sortFieldName], ASC);
            }
            if(sortFieldStatus==='down'){
                sortList = __sort(list, [sortFieldName], DESC);
            }
            
            const byId = __$indexBy(sortList, '_id');
            
            const allIds_otherStats = Object.keys(byId);
            return Object.assign({}, state, { allIds_otherStats });
        }
        default:
            return state;
    }

}

/* ----------------------------------------------------------------------------------
 * Combine portfolio data and coinmarketcapTicker data with converted float values
 * float vaues will be used for sorting data. 
 * -------------------------------------------------------------------------------- */
function getNewPortfolioWithFloatData(portfolio, coinmarketcapTicker){
    // instantiate and copy portfolio to the newly created object. 
    // data not converted will remain as they are
    const newPortfolio = Object.assign({}, portfolio, coinmarketcapTicker)

    // user's portfolio data
    newPortfolio['amount']        = parseFloat(portfolio['amount'] || 0);
    newPortfolio['buy_price_btc'] = parseFloat(portfolio['buy_price_btc'] || 0);
    newPortfolio['buy_price_eth'] = parseFloat(portfolio['buy_price_eth'] || 0);
    newPortfolio['buy_price_usd'] = parseFloat(portfolio['buy_price_usd'] || 0);

    // coinmarketcapTicker data
    newPortfolio['24h_volume_eth']     = parseFloat(coinmarketcapTicker['24h_volume_eth'] || 0);
    newPortfolio['24h_volume_usd']     = parseFloat(coinmarketcapTicker['24h_volume_usd'] || 0);
    newPortfolio['available_supply']   = parseFloat(coinmarketcapTicker['available_supply'] || 0);
    newPortfolio['market_cap_eth']     = parseFloat(coinmarketcapTicker['market_cap_eth'] || 0);
    newPortfolio['market_cap_usd']     = parseFloat(coinmarketcapTicker['market_cap_usd'] || 0);
    newPortfolio['max_supply']         = parseFloat(coinmarketcapTicker['max_supply'] || 0);
    newPortfolio['percent_change_1h']  = parseFloat(coinmarketcapTicker['percent_change_1h'] || 0);
    newPortfolio['percent_change_7d']  = parseFloat(coinmarketcapTicker['percent_change_7d'] || 0);
    newPortfolio['percent_change_24h'] = parseFloat(coinmarketcapTicker['percent_change_24h'] || 0);
    newPortfolio['price_btc']          = parseFloat(coinmarketcapTicker['price_btc'] || 0);
    newPortfolio['price_eth']          = parseFloat(coinmarketcapTicker['price_eth'] || 0);
    newPortfolio['price_usd']          = parseFloat(coinmarketcapTicker['price_usd'] || 0);
    newPortfolio['total_supply']       = parseFloat(coinmarketcapTicker['total_supply'] || 0);
    
    // rank number is exception it doesnt need to be parsed int
    newPortfolio['rank'] = parseInt(coinmarketcapTicker['rank']);
    
    // portfolio that involves valuation calculation
    newPortfolio['valuation_usd'] = newPortfolio['amount'] * newPortfolio['price_usd'];
    newPortfolio['valuation_btc'] = newPortfolio['amount'] * newPortfolio['price_btc'];
    newPortfolio['valuation_eth'] = newPortfolio['amount'] * newPortfolio['price_eth'];

    // portfolio that involves profit/loss calculation
    newPortfolio['profit_loss_usd'] = calculateProfitOrLoss(newPortfolio['price_usd'], newPortfolio['buy_price_usd']);
    newPortfolio['profit_loss_btc'] = calculateProfitOrLoss(newPortfolio['price_btc'], newPortfolio['buy_price_btc']);
    newPortfolio['profit_loss_eth'] = calculateProfitOrLoss(newPortfolio['price_eth'], newPortfolio['buy_price_eth']);

    return newPortfolio;
}

/* ----------------------------------------------------------------------------------
 * Calculate percentage whether its a profit or a loss
 * Formulat: (market_price - buy_price) / market_price
 * -------------------------------------------------------------------------------- */
function calculateProfitOrLoss(market_price, buy_price){
    const profitOrLoss = ((market_price - buy_price) / buy_price) * 100;

    if (profitOrLoss == Number.POSITIVE_INFINITY || profitOrLoss == Number.NEGATIVE_INFINITY){
        return "0.00";
    }
    return profitOrLoss;
}

/* ----------------------------------------------------------------------------------
* Sum of all valutaion
* Formulat: coin1Valuation + coin2Valuation ...
* -------------------------------------------------------------------------------- */
function calculateTotalValuation(portfolioList){
    let totalValuation = 0;
    portfolioList && portfolioList.map((portfolio)=>{
        totalValuation = totalValuation + (portfolio['amount'] * portfolio['price_usd']);
    })
    return totalValuation;
}

/* ----------------------------------------------------------------------------------
 * Calculate allocation value for each portfolio 
 * -------------------------------------------------------------------------------- */
function calculateAllocation(portfolioList, totalValuation){
    portfolioList && portfolioList.map((portfolio, key)=>{
        let currentValuation = portfolio['amount'] * portfolio['price_usd'];
        portfolioList[key]['allocation'] = (currentValuation/totalValuation) * 100;
    })
}
