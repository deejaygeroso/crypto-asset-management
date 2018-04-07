import axios from 'axios';
import * as ACTION_TYPES from '../types/cryptoHistoryTypes';

/* 
 * Set the data for the cryptohistory
 */
export const set = ({payload}) => ({
    type: ACTION_TYPES.ITEMLIST_SET,
    payload,
});

/* 
 * Set the All time high data of price
 */
export const priceAthSet = ({payload}) => ({
    type: ACTION_TYPES.PRICE_ATH_SET,
    payload,
});


/* 
 * Set the All time low data of price
 */
export const priceAtlSet = ({payload}) => ({
    type: ACTION_TYPES.PRICE_ATL_SET,
    payload,
});

/* 
 * Set the All time high data of price
 */
export const volumeAthSet = ({payload}) => ({
    type: ACTION_TYPES.VOLUME_ATH_SET,
    payload,
});

/* ----------------------------------------------------------------------------------
 * Set the All time low data of price
 * -------------------------------------------------------------------------------- */
export const volumeAtlSet = ({payload}) => ({
    type: ACTION_TYPES.VOLUME_ATL_SET,
    payload,
});

/* ----------------------------------------------------------------------------------
 * Fin the 7 day historical data of crypto
 * -------------------------------------------------------------------------------- */
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

/* ----------------------------------------------------------------------------------
 * Get the price ath and atl then calculate
 * -------------------------------------------------------------------------------- */
export const calculatePriceAndVolumeAthAtl = ({params}) => {
  return async dispatch => {
    try {
        const { ids } = params;
        const query = {
            'id': {
                $in: ids && ids.length!==0 ? ids : []
            },
        }
        const res = await axios.post('/api/cryptoHistory/priceAndVolumeAthAtl', query);

        dispatch(priceAthSet({payload: res.data}))
        dispatch(priceAtlSet({payload: res.data}))
        dispatch(volumeAthSet({payload: res.data}))
        dispatch(volumeAtlSet({payload: res.data}))

    } catch (err) {
        // console.log('errorr 1010', err);
    }
  };
}
