// import Router from 'next/router';
import axios from 'axios';
import * as ACTION_TYPES from '../types/portfolioTypes';
import * as cryptoHistoryActions from './cryptoHistoryActions';

import { indexBy as __$indexBy } from 'underscore';

/*
 * set new item to store
 */
export const itemSet = ({payload}) => ({
    type: ACTION_TYPES.ITEM_SET,
    payload,
})

/*
 * clear item from store
 */
export const itemClear = () => ({
    type: ACTION_TYPES.ITEM_CLEAR,
})

/*
 * create new success message
 */
export const successSet = ({payload}) => ({
    type: ACTION_TYPES.SUCCESS_SET,
    payload,
})

/*
 * clear success message
 */
export const successClear = () => ({
    type: ACTION_TYPES.SUCCESS_CLEAR,
})

/*
 * set new error
 */
export const errorSet = ({payload}) => ({
    type: ACTION_TYPES.ERROR_SET,
    payload,
})

/*
 * clear error
 */
export const errorClear = () => ({
    type: ACTION_TYPES.ERROR_CLEAR,
})

/*
 * set new list of item (not used yet)
 */
export const itemListSet = ({payload}) => ({
    type: ACTION_TYPES.ITEMLIST_SET,
    payload,
})

/*
 * merge portfoliolist and coinmarketcapTicker data
 */
export const itemListCompose = ({portfolioList, coinmarketcapTicker}) => ({
    type: ACTION_TYPES.ITEMLIST_COMPOSE,
    portfolioList,
    coinmarketcapTicker,
});

/*
 * append an item on the list
 */
export const itemListAppend = ({item}) => ({
    type: ACTION_TYPES.ITEMLIST_APPEND,
    item,
})

/*
 * append an item on the list
 */
export const itemListPatch = ({item}) => ({
    type: ACTION_TYPES.ITEMLIST_PATCH,
    item,
})

/*
 * remove an item on the list
 */
export const itemListRemove = ({item}) => ({
    type: ACTION_TYPES.ITEMLIST_REMOVE,
    item,
})

/*
 * remove an item on the list
 */
export const itemListClear = () => ({
    type: ACTION_TYPES.ITEMLIST_CLEAR,
})

/*
 * sort data from the table
 */
export const itemsListSortData = ({sortFieldName}) => ({
    type: ACTION_TYPES.ITEMLIST_SORTDATA,
    sortFieldName,
})

/* ----------------------------------------------------------------------------------
 * Create new portfolio item on the database
 * -------------------------------------------------------------------------------- */
export const itemCreate = ({params}) => {
    return async dispatch => {
        try {
            // if success
            const res = await axios.post('/api/portfolio/create', params);
            dispatch(itemSet({payload: res.data}))
            
            dispatch(itemListAppend({item: res.data}));
            dispatch(successSet({payload: {message: 'Coin successfuly creatd!'} }));
            dispatch(errorClear());

        } catch (error) {
            const payload = { message: 'Fail to create coin!' }
            dispatch(errorSet({payload}));
            dispatch(successClear());
        }
    }
}

/* ----------------------------------------------------------------------------------
 * Update item from database by id
 * -------------------------------------------------------------------------------- */
export const itemUpdate = ({_id, params}) => {
    return async dispatch => {
        try {
            // if success
            const res = await axios.post('/api/portfolio/update', Object.assign({}, params, { _id }));
            
            dispatch(itemSet({payload: res.data}))
            dispatch(itemListPatch({item: res.data}));
            dispatch(successSet({payload: {message: 'Coin successfuly creatd!'} }));
            dispatch(errorClear());

        } catch (error) {
            const payload = { message: 'Fail to create coin!' }
            dispatch(errorSet({payload}));
            dispatch(successClear());
        }
    }
}

/* ----------------------------------------------------------------------------------
 * Remove item from database by id
 * -------------------------------------------------------------------------------- */
export const itemRemove = ({_id}) => {
    return async dispatch => {
        try {
            await axios.post('/api/portfolio/remove', {_id});
            const message = 'Coin successfuly removed!';
            dispatch(successSet({payload: {message} }));
            dispatch(itemListRemove({item: {_id}}));
            dispatch(errorClear());

        } catch (error) {
            // console.log('error', error);
        }
    }
}

/* ----------------------------------------------------------------------------------
 * Search for users portfolio & 7 day historyData, ath, atl based on his/her portfolio
 * -------------------------------------------------------------------------------- */
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
            dispatch(cryptoHistoryActions.calculatePriceAndVolumeAthAtl( {params: {ids} }));

        } catch (error) {
            const payload = { message: 'Unable to fetch your portfolio' }
            dispatch(errorSet({payload}));
        }
    }
}

export const itemListSortBy = ({sortData}) => {
    return async dispatch => {
        try {
            dispatch(itemsListSortData({sortData}));
        } catch (error) {
        }
    }
}