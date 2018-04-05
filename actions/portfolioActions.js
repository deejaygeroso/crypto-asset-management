// import Router from 'next/router';
import axios from 'axios';
import * as ACTION_TYPES from '../types/portfolioTypes';
import * as cryptoListActions from './cryptoListActions';
import * as cryptoHistoryActions from './cryptoHistoryActions';

import { indexBy as __$indexBy } from 'underscore';

export const itemSet = ({payload}) => ({
    type: ACTION_TYPES.ITEM_SET,
    payload,
})

export const itemClear = () => ({
    type: ACTION_TYPES.ITEM_CLEAR,
})

export const successSet = ({payload}) => ({
    type: ACTION_TYPES.SUCCESS_SET,
    payload,
})
export const successClear = () => ({
    type: ACTION_TYPES.SUCCESS_CLEAR,
})

export const errorSet = ({payload}) => ({
    type: ACTION_TYPES.ERROR_SET,
    payload,
})
export const errorClear = () => ({
    type: ACTION_TYPES.ERROR_CLEAR,
})


export const itemListSet = ({payload}) => ({
    type: ACTION_TYPES.ITEMLIST_SET,
    payload,
})

export const itemListCompose = ({portfolioList, coinmarketcapTicker}) => ({
    type: ACTION_TYPES.ITEMLIST_COMPOSE,
    portfolioList,
    coinmarketcapTicker,
});

export const itemListAppend = ({item}) => ({
    type: ACTION_TYPES.ITEMLIST_APPEND,
    item,
})


export const portfolioCreate = ({params}) => {
    return async dispatch => {
        try {
            // if success
            const res = await axios.post('/api/portfolio/create', params);
            dispatch(itemSet({payload: res.data}))
            dispatch(itemListAppend({item: res.data}));
            const message = 'Coin successfuly creatd!';
            dispatch(successSet({payload: {message} }));
            dispatch(errorClear());

        } catch (error) {
            const payload = { message: 'Fail to create coin!' }
            dispatch(errorSet({payload}));
            dispatch(successClear());
        }
    }
}

export const portfolioUpdate = ({_id, params}) => {
    return async dispatch => {
        try {
            // if success
            const res = await axios.post('/api/portfolio/update', Object.assign({}, params, { _id }));
            dispatch(itemSet({payload: res.data}))
            dispatch(cryptoListActions.portfolioAppend({item: res.data}));
            const message = 'Coin successfuly creatd!';
            dispatch(successSet({payload: {message} }));
            dispatch(errorClear());

        } catch (error) {
            const payload = { message: 'Fail to create coin!' }
            dispatch(errorSet({payload}));
            dispatch(successClear());
        }
    }
}

export const portfolioRemove = ({_id}) => {
    return async dispatch => {
        try {
            await axios.post('/api/portfolio/remove', {_id});
            const message = 'Coin successfuly removed!';
            dispatch(successSet({payload: {message} }));
            dispatch(errorClear());

        } catch (error) {
            // console.log('error', error);
        }
    }
}

/* 
 * Search for users portfolio & 7 day historyData, ath, atl based on his/her portfolio
 */
export const itemListFindByUserId = ({params, coinmarketcapTicker}) => {
    return async dispatch => {
        try {
            const { user_id } = params;
            const res = await axios.post('/api/portfolio/list', {user_id});

            dispatch(itemListCompose({portfolioList: res.data, coinmarketcapTicker}));

            // get all the id of crypto to be used in fetching historydata & ath,atl of price
            const byId = __$indexBy(res.data, 'id');
            const ids = Object.keys(byId)

            // get historydata & ath,atl of price
            dispatch(cryptoHistoryActions.find({ params: {ids} }));
            dispatch(cryptoHistoryActions.calculatePriceAthAtl( {params: {ids} }));

        } catch (error) {
            console.log('error', error);
            
            const payload = { message: 'Unable to fetch your portfolio' }
            dispatch(errorSet({payload}));
        }
    }
}
