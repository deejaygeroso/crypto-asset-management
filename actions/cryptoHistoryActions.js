import axios from 'axios';
import * as ACTION_TYPES from '../types/cryptoHistoryTypes';

/* 
 * Set the data for the cryptohistory
 */
export const set = ({payload}) => ({
    type: ACTION_TYPES.CRYPTO_HISTORY_SET,
    payload,
});

/* 
 * Set the All time high data of price
 */
export const athSet = ({payload}) => ({
    type: ACTION_TYPES.CRYPTO_ATH_SET,
    payload,
});


/* 
 * Set the All time low data of price
 */
export const atlSet = ({payload}) => ({
    type: ACTION_TYPES.CRYPTO_ATL_SET,
    payload,
});

/* 
 * Fin the 7 day historical data of crypto
 */
export const find = ({params}) => {
  return async dispatch => {
    try {
        const { ids } = params;
        const query = {
            'id': {
                $in: ids && ids.length!==0 ? ids : []
            },
        }
        const res = await axios.post('/api/cryptoHistory/find', query);

        dispatch(set({payload: res.data}))
        // dispatch(userErrorClear());
    } catch (err) {
        // console.log('errorr 1010', err);
        // console.error(err);
    }
  };
}


/* 
 * Get the price ath and atl then calculate
 */
export const calculatePriceAthAtl = ({params}) => {
  return async dispatch => {
    try {
        const { ids } = params;
        const query = {
            'id': {
                $in: ids && ids.length!==0 ? ids : []
            },
        }
        const res = await axios.post('/api/cryptoHistory/priceAthAtl', query);

        dispatch(athSet({payload: res.data}))
        dispatch(atlSet({payload: res.data}))

    } catch (err) {
        // console.log('errorr 1010', err);
    }
  };
}
