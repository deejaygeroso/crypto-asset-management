import axios from 'axios';
import * as ACTION_TYPES from '../types/cryptoHistoryTypes';

export const cryptoHistorySet = ({payload}) => ({
    type: ACTION_TYPES.CRYPTO_HISTORY_SET,
    payload,
});

export const cryptoHistoryAthSet = ({payload}) => ({
    type: ACTION_TYPES.CRYPTO_ATH_SET,
    payload,
});

export const cryptoHistoryAtlSet = ({payload}) => ({
    type: ACTION_TYPES.CRYPTO_ATL_SET,
    payload,
});

export const cryptoHistoryFind = ({params}) => {
  return async dispatch => {
    try {
        // const nowDate = moment(new Date).utcOffset(0).set({hour:0,minute:0,second:0,millisecond:0}).format();
        const { ids } = params;
        const query = {
            'id': {
                $in: ids && ids.length!==0 ? ids : []
            },
        }
        const res = await axios.post('/api/cryptoHistory/find', query);
        dispatch(cryptoHistorySet({payload: res.data}))
        // dispatch(userErrorClear());
    } catch (err) {
        // console.log('errorr 1010', err);
        // console.error(err);
    }
  };
}

export const cryptoHistoryAth = ({params}) => {
  return async dispatch => {
    try {
        const { ids } = params;
        const query = {
            'id': {
                $in: ids && ids.length!==0 ? ids : []
            },
        }
        const res = await axios.post('/api/cryptoHistory/ath', query);

        dispatch(cryptoHistoryAthSet({payload: res.data}))
        dispatch(cryptoHistoryAtlSet({payload: res.data}))

    } catch (err) {
        // console.log('errorr 1010', err);
    }
  };
}
