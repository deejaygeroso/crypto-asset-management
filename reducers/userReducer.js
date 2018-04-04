import * as ACTION_TYPES from '../types/userTypes';
import { indexBy as __$indexBy } from 'underscore';

const initialUser = { email: '' };
export const user = (state = initialUser, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.USER_SET: {
            return Object.assign({}, payload);
        }
        case ACTION_TYPES.USER_CLEAR:
            return initialUser;
        default:
            return state;
    }
}

// must double check latera
const initialUserSuccess = { message: '' };
export const userSuccess = (state = initialUserSuccess, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.USER_SUCCESS_SET: {
            const { message } = payload;
            return Object.assign({}, state, {message});
        }
        case ACTION_TYPES.USER_SUCCESS_CLEAR:
            return initialUserSuccess;
        default:
            return state;
    }
}

// must double check latera
const initialUserError = { message: '' };
export const userError = (state = initialUserError, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.USER_ERROR_SET: {
            const { message } = payload;
            return Object.assign({}, state, {message});
        }
        case ACTION_TYPES.USER_ERROR_CLEAR:
            return initialUserError;
        default:
            return state;
    }
}

const initialUsersList = { byId: {}, allIds: [] };
export const usersList = (state = initialUsersList, {type, payload, item}) => {
    switch (type) {
        case ACTION_TYPES.USERS_LIST_SET: {
            const byId = __$indexBy(payload, '_id');
            const allIds = Object.keys(byId)
            return Object.assign({}, state, { allIds, byId });
        }
        case ACTION_TYPES.USERS_LIST_APPEND: {
            const { byId } = state;
            byId[item._id] = item;
            const allIds = Array.prototype.concat([item._id], state.allIds)
            return Object.assign({}, state, { allIds, byId });
        }
        case ACTION_TYPES.USER_CLEAR:
            return initialUsersList;
        default:
            return state;
    }
}
