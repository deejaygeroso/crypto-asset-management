// import * as API from '../api';
// this action is mainly used for dropdown menu of coin form
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
