import * as API from '../api';
import * as ACTION_TYPES from '../types/cryptoIdsTypes';
// import axios from 'axios';

export const cryptoIdsSet = ({payload}) => ({
    type: ACTION_TYPES.CRYPTO_IDS_SET,
    payload,
})

export const cryptoIdsErrorClear = () => ({
    type: ACTION_TYPES.CRYPTO_IDS_ERROR_CLEAR,
})

export const cryptoIdsErrorSet = () => ({
    type: ACTION_TYPES.CRYPTO_IDS_ERROR_SET,
})


export function cryptoIdsFindAll() {
    return async dispatch => {
        try {
            // const res = await axios.post('/api/crypto/findAll');
            const res = await API.cryptoListFetchApi();
            dispatch(cryptoIdsSet({payload: res.data}));
            dispatch(cryptoIdsErrorClear());
        } catch (err) {
            const payload = { message: 'Unable to fetch all crypo ids!' }
            dispatch(cryptoIdsErrorSet({payload}));
        }

    }
}
