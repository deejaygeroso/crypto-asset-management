import Router from 'next/router';
import axios from 'axios';
import * as ACTION_TYPES from '../types/userTypes';
import { toasterSuccessMessage, toasterErrorMessage } from '../modules/lib/helpers';
import * as itemActions from './itemActions';

/*
 * set the list of data for the user
 */
export const itemListSet = ({payload}) => ({
    type: ACTION_TYPES.ITEMLIST_SET,
    payload,
})

/*
 * append an item to the list of users.
 */
export const itemListAppend = ({item}) => ({
    type: ACTION_TYPES.ITEMLIST_APPEND,
    item,
})

/* ----------------------------------------------------------------------------------
 * Patch a single item on the list. 
 * -------------------------------------------------------------------------------- */
export const itemListPatchItem = ({item}) => {
      return{
            type: ACTION_TYPES.ITEMLIST_PATCH_ITEM,
            item
      };
}

/*
 * remove an item from the list of users.
 */
export const itemListRemove = ({item}) => ({
    type: ACTION_TYPES.ITEMLIST_REMOVE,
    item,
})

/*
 * set user item.
 */
export const itemSet = ({payload}) => ({
    type: ACTION_TYPES.ITEM_SET,
    payload,
})

/*
 * clear item.
 */
export const itemClear = ({payload}) => ({
    type: ACTION_TYPES.ITEM_CLEAR,
    payload,
})

/*
 * set success message.
 */
export const successSet = ({payload}) => ({
    type: ACTION_TYPES.SUCCESS_SET,
    payload,
})

/*
 * clear success message.
 */
export const successClear = () => ({
    type: ACTION_TYPES.SUCCESS_CLEAR,
})

/*
 * set error message.
 */
export const errorSet = ({payload}) => ({
    type: ACTION_TYPES.ERROR_SET,
    payload,
})

/*
 * clear error message.
 */
export const errorClear = () => ({
    type: ACTION_TYPES.ERROR_CLEAR,
})

/* ----------------------------------------------------------------------------------
 * Find all users that is not an admin
 * -------------------------------------------------------------------------------- */
export const itemListFindAll = () => {
    return async dispatch => {
        try {
            const res = await axios.post('/api/account/users');
            dispatch(itemListSet({payload: res.data}));
            dispatch(errorClear());
        } catch (err) {
            toasterErrorMessage('Unable to fetch all users!');
        }
    }
}

/* ----------------------------------------------------------
 * This function is like the main entry point of all the data
 * all data and api call is acquired through here
 * -------------------------------------------------------- */
export const itemFind = ({params}) => {
    const {_id} = params;
    return async dispatch => {
        try {
            const res = await axios.post('/api/account/find', {_id});
            const user = res.data;
            dispatch(itemSet({payload: user}));
            dispatch(errorClear());

            // get the transaction information if user has not subscribed yet or request payment on coinpayments
            if(user.txn_id){
                dispatch(itemActions.apiCallFindByQuery({
                    serviceName: 'transaction',
                    item: {
                        txn_id : user.txn_id,
                    }
                }));
            }

        } catch (err) {
            toasterErrorMessage('Unable to find user!');
        }
    };
}

/* ----------------------------------------------------------------------------------
 * Used by admin when creating new user.
 * Only admin account can add a user client account. 
 * -------------------------------------------------------------------------------- */
export const itemCreate = ({params}) => {
    return async dispatch => {
        try {
            const res = await axios.post('/api/account/register', params);
            dispatch(itemSet({payload: res.data}));
            // dispatch(itemListAppend({item: res.data}));
            // toasterSuccessMessage('New account was created.');
            dispatch(login({params}));
        } catch (err) {
            toasterErrorMessage('Email already exist!');
        }
    };
}

/* ----------------------------------------------------------------------------------
 * Used for updating personal user information 
 * -------------------------------------------------------------------------------- */
export const itemUpdate = ({params}) => {
    return async dispatch => {
        try {
            const res = await axios.post('/api/account/update', params);
            dispatch(itemSet({payload: res.data}));
            toasterSuccessMessage('Update successful!');
        } catch (err) {
            toasterErrorMessage('Update Failed!');
        }
    };
}

/* ----------------------------------------------------------------------------------
 * Remove user form the list and from the database. Soft Delete only. 
 * -------------------------------------------------------------------------------- */
export const itemRemove = ({_id}) => {
    return async dispatch => {
        try {
            await axios.post('/api/account/remove', {_id});
            dispatch(itemListRemove({item: {_id}}));
            toasterSuccessMessage('User was deleted successfuly!');
            
        } catch (err) {
            toasterErrorMessage('Removing user Failed!');
        }
    }
}

/* ----------------------------------------------------------------------------------
 * Disable user form loggin in from the app.
 * -------------------------------------------------------------------------------- */
export const itemIsDisabled = ({_id, isDisabled}) => {
    return async dispatch => {
        try {
            const res = await axios.post('/api/account/isDisabled', {_id, isDisabled});
            dispatch(itemListPatchItem({item: res.data}));
            if(isDisabled){
                toasterSuccessMessage('User was disabled successfuly!');
            }else{
                toasterSuccessMessage('User account was enabled successfuly!');
            }
            
        } catch (err) {
            if(isDisabled){
                toasterErrorMessage('Disable user account failed!');
            }else{
                toasterErrorMessage('Enable user account failed!');
            }

        }
    }
}

/* ----------------------------------------------------------------------------------
 * Used for updating personal user information 
 * -------------------------------------------------------------------------------- */
export const itemActivatePremium = ({params}) => {
    return async dispatch => {
        try {
            const res = await axios.post('/api/account/activatePremium', params);
            dispatch(itemSet({payload: res.data}));
            toasterSuccessMessage(`${params.email} is now Premium account.`);
        } catch (err) {
            toasterErrorMessage('Premium Activation Failed!');
        }
    };
}

/* ----------------------------------------------------------------------------------
 * Used for updating personal user information 
 * -------------------------------------------------------------------------------- */
export const itemVerifyEmail = ({params}) => {
    const {_id, verificationCode} = params;
    return async () => {
        try {
            await axios.post('/api/account/verifyEmail', {_id, verificationCode});
            Router.push('/portfolio/list');
            
        } catch (err) {
            toasterErrorMessage('Invalid verification code!');

        }
    };
}

/* ----------------------------------------------------------------------------------
 * User Login. 
 * -------------------------------------------------------------------------------- */
export const login = ({params}) => {
    return async dispatch => {
        try {
            dispatch(errorClear());

            const res = await axios.post('/api/account/login', params);
            const user = res.data;
            dispatch(itemSet({payload: user}));

            if(user.isAdmin){
                // if user account is admin
                Router.push('/admin/manage');
            } else if(!user.isVerified){
                Router.push('/account/verify');
            } else if(user.isDisabled){
                const payload = { message: 'Account has been disabled by the admin.' }
                dispatch(errorSet({payload}));
                // if user account has been disabled
                Router.push('/login');
            } else if(user.isPremium===0){
                // if user account is expired
                Router.push('/account/subscribe');
            } else{
                // if user account is in Trial mode or is a Premium account
                Router.push('/portfolio/list');
            }

        } catch (err){
            const payload = { message: 'Email/password does not match!' }
            dispatch(errorSet({payload}));
        }
    };
}

/* ----------------------------------------------------------------------------------
 * User Logout. 
 * -------------------------------------------------------------------------------- */
export const logout = () => {
    return async dispatch => {
        try {
            const res = await axios.post('/account/logout');
            dispatch(itemSet({payload: res.data}));
            Router.push('/login');
        } catch (err){
            toasterErrorMessage('Unable to logout user.');
        }
    };
}
