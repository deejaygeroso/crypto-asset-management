// import * as API from '../api';
import * as ACTION_TYPES from '../types/cryptoIdsTypes';

export const itemSet = ({payload}) => ({
    type: ACTION_TYPES.ITEM_SET,
    payload,
})

export const errorClear = () => ({
    type: ACTION_TYPES.ERROR_CLEAR,
})

export const errorSet = () => ({
    type: ACTION_TYPES.ERROR_SET,
})
