import * as ACTION_TYPES from '../types/userTypes';
import { indexBy as __$indexBy } from 'underscore';

const initialUser = { email: '' };
export const user = (state = initialUser, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.ITEM_SET: {
            return Object.assign({}, payload);
        }
        case ACTION_TYPES.ITEM_CLEAR:
            return initialUser;
        default:
            return state;
    }
}

// must double check latera
const initialUserSuccess = { message: '' };
export const userSuccess = (state = initialUserSuccess, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.SUCCESS_SET: {
            const { message } = payload;
            return Object.assign({}, state, {message});
        }
        case ACTION_TYPES.SUCCESS_CLEAR:
            return initialUserSuccess;
        default:
            return state;
    }
}

// must double check latera
const initialUserError = { message: '' };
export const userError = (state = initialUserError, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.ERROR_SET: {
            const { message } = payload;
            return Object.assign({}, state, {message});
        }
        case ACTION_TYPES.ERROR_CLEAR:
            return initialUserError;
        default:
            return state;
    }
}

const initialUsersList = { byId: {}, allIds: [] };
export const usersList = (state = initialUsersList, {type, payload, item}) => {
    switch (type) {
        case ACTION_TYPES.ITEMLIST_SET: {
            const byId = __$indexBy(payload, '_id');
            const allIds = Object.keys(byId)
            return Object.assign({}, state, { allIds, byId });
        }
        case ACTION_TYPES.ITEMLIST_APPEND: {
            const { byId } = state;
            byId[item._id] = item;
            const allIds = Array.prototype.concat([item._id], state.allIds)
            return Object.assign({}, state, { allIds, byId });
        }
        /*
         * Update item from users list data.
         */
        case ACTION_TYPES.ITEMLIST_PATCH_ITEM: {
          const { byId } = state;
          byId[item._id] = item;
          return Object.assign({}, state, { byId });
        }
        case ACTION_TYPES.ITEMLIST_REMOVE: {
            const { _id } = item;

            // just remove the id/key from the allIds though not used by component anymore but only as reference.
            const index = state.allIds.indexOf(_id);
            if (index > -1) {
                state.allIds.splice(index, 1);
            }

            return Object.assign({}, state);
        }
        case ACTION_TYPES.ITEMLIST_CLEAR:
            return initialUsersList;
        default:
            return state;
    }
}
