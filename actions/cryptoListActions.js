import * as API from '../api';

import * as ACTION_TYPES from '../types/cryptoListTypes';

export const cryptoGlobalSet = ({payload}) => ({
    type: ACTION_TYPES.CRYPTO_GLOBAL_SET,
    payload,
});

export const cryptoGlobalAppendTotalCrypto = ({payload}) => ({
    type: ACTION_TYPES.CRYPTO_GLOBAL_APPEND_TOTAL_CRYPTO,
    payload,
});

export const cryptoListSet = ({payload}) => ({
    type: ACTION_TYPES.CRYPTO_LIST_SET,
    payload,
});

export const cryptoListCompose = ({payload, user}) => ({
    type: ACTION_TYPES.CRYPTO_LIST_COMPOSE,
    payload,
    user,
});

export const portfolioCompose = ({payload, portfolio}) => ({
    type: ACTION_TYPES.CRYPTO_LIST_PORTFOLIO_COMPOSE,
    payload,
    portfolio,
});

export const portfolioAppend = ({item}) => ({
    type: ACTION_TYPES.CRYPTO_LIST_PORTFOLIO_APPEND,
    item,
});

export const cryptoListFetch = ({params}) => {
    return async dispatch => {
        try {
            const { user } = params;
            const res = await API.cryptoListFetchApi();
            dispatch(cryptoListCompose({payload : res.data, user}));
            dispatch(cryptoGlobalAppendTotalCrypto({payload : {total_crypto: res.data.length} }));
        } catch (err) {
            // console.error(err);
        }
    };
}

export const cryptoGlobalFetch = () => {
    return async dispatch => {
        try {
            const res = await API.cryptoGlobalFetchApi();
            dispatch(cryptoGlobalSet({payload : res.data}));
        } catch (err) {
            // console.log(err);
        }
    }
}
