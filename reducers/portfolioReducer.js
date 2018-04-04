import * as ACTION_TYPES from '../types/portfolioTypes';
import { indexBy as __$indexBy } from 'underscore';

const initialPortfolio = { email: '' };
export const portfolio = (state = initialPortfolio, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.PORTFOLIO_SET: {
            return Object.assign({}, payload);
        }
        case ACTION_TYPES.PORTFOLIO_CLEAR:
            return initialPortfolio;
        default:
            return state;
    }
}

// must double check latera
const initialPortfolioSuccess = { message: '' };
export const portfolioSuccess = (state = initialPortfolioSuccess, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.PORTFOLIO_SUCCESS_SET: {
            const { message } = payload;
            return Object.assign({}, state, {message});
        }
        case ACTION_TYPES.PORTFOLIO_SUCCESS_CLEAR:
            return initialPortfolioSuccess;
        default:
            return state;
    }
}

// must double check latera
const initialPortfolioError = { message: '' };
export const portfolioError = (state = initialPortfolioError, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.PORTFOLIO_ERROR_SET: {
            const { message } = payload;
            return Object.assign({}, state, {message});
        }
        case ACTION_TYPES.PORTFOLIO_ERROR_CLEAR:
            return initialPortfolioError;
        default:
            return state;
    }
}

const initialPortfoliosList = { byId: {}, allIds: [] };
export const portfoliosList = (state = initialPortfoliosList, {type, payload, item}) => {
    switch (type) {
        case ACTION_TYPES.PORTFOLIOS_LIST_SET: {
            const byId = __$indexBy(payload, '_id');
            const allIds = Object.keys(byId)
            return Object.assign({}, state, { allIds, byId });
        }
        case ACTION_TYPES.PORTFOLIOS_LIST_APPEND: {
            const { byId } = state;
            byId[item._id] = item;
            const allIds = Array.prototype.concat([item._id], state.allIds)
            return Object.assign({}, state, { allIds, byId });
        }
        case ACTION_TYPES.PORTFOLIO_CLEAR:
            return initialPortfoliosList;
        default:
            return state;
    }
}
