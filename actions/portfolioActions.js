// import Router from 'next/router';
import axios from 'axios';
import * as ACTION_TYPES from '../types/portfolioTypes';
import * as cryptoListActions from './cryptoListActions';

export const portfolioSet = ({payload}) => ({
    type: ACTION_TYPES.PORTFOLIO_SET,
    payload,
})

export const portfolioClear = () => ({
    type: ACTION_TYPES.PORTFOLIO_CLEAR,
})

export const portfolioSuccessSet = ({payload}) => ({
    type: ACTION_TYPES.PORTFOLIO_SUCCESS_SET,
    payload,
})
export const portfolioSuccessClear = () => ({
    type: ACTION_TYPES.PORTFOLIO_SUCCESS_CLEAR,
})

export const portfolioErrorSet = ({payload}) => ({
    type: ACTION_TYPES.PORTFOLIO_ERROR_SET,
    payload,
})
export const portfolioErrorClear = () => ({
    type: ACTION_TYPES.PORTFOLIO_ERROR_CLEAR,
})


export const portfoliosListSet = ({payload}) => ({
    type: ACTION_TYPES.PORTFOLIOS_LIST_SET,
    payload,
})

export const portfoliosListAppend = ({item}) => ({
    type: ACTION_TYPES.PORTFOLIOS_LIST_APPEND,
    item,
})


export const portfolioCreate = ({params}) => {
    return async dispatch => {
        try {
            // if success
            const res = await axios.post('/api/portfolio/create', params);
            dispatch(portfolioSet({payload: res.data}))
            dispatch(portfoliosListAppend({item: res.data}));
            const message = 'Coin successfuly creatd!';
            dispatch(portfolioSuccessSet({payload: {message} }));
            dispatch(portfolioErrorClear());

        } catch (error) {
            const payload = { message: 'Fail to create coin!' }
            dispatch(portfolioErrorSet({payload}));
            dispatch(portfolioSuccessClear());
        }
    }
}

export const portfolioUpdate = ({_id, params}) => {
    return async dispatch => {
        try {
            // if success
            const res = await axios.post('/api/portfolio/update', Object.assign({}, params, { _id }));
            dispatch(portfolioSet({payload: res.data}))
            dispatch(cryptoListActions.portfolioAppend({item: res.data}));
            const message = 'Coin successfuly creatd!';
            dispatch(portfolioSuccessSet({payload: {message} }));
            dispatch(portfolioErrorClear());

        } catch (error) {
            const payload = { message: 'Fail to create coin!' }
            dispatch(portfolioErrorSet({payload}));
            dispatch(portfolioSuccessClear());
        }
    }
}

export const portfolioRemove = ({_id}) => {
    return async dispatch => {
        try {
            await axios.post('/api/portfolio/remove', {_id});
            const message = 'Coin successfuly removed!';
            dispatch(portfolioSuccessSet({payload: {message} }));
            dispatch(portfolioErrorClear());

        } catch (error) {
            // console.log('error', error);
        }
    }
}

/*
 * after finding user then
 */
export const findByUserId = ({params, coinmarketcapTicker}) => {
    return async dispatch => {
        try {
            const { user_id } = params;
            const res = await axios.post('/api/portfolio/list', {user_id});
            dispatch(cryptoListActions.portfolioCompose({portfolio: res.data, payload: coinmarketcapTicker}));
            dispatch(portfoliosListSet({payload: res.data}));
        } catch (error) {
            const payload = { message: 'Unable to fetch your portfolio' }
            dispatch(portfolioErrorSet({payload}));
        }
    }
}
