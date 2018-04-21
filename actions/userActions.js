import Router from 'next/router';
import axios from 'axios';
import * as ACTION_TYPES from '../types/userTypes';

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
            const payload = { message: 'Unable to fetch all users!' }
            dispatch(errorSet({payload}));
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
            dispatch(itemSet({payload: res.data}));
            dispatch(errorClear());

        } catch (err) {
            // console.log('itemFind err', err)
            const payload = { message: 'Unable to find user!' }
            dispatch(errorSet({payload}));
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
            dispatch(itemListAppend({item: res.data}));
            dispatch(errorClear());
        } catch (err) {
            const payload = { message: 'Email already exist!' }
            dispatch(errorSet({payload}));
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
            dispatch(successSet({payload: {message: 'Update successful!'}}));
            dispatch(errorClear());
        } catch (err) {
            const payload = { message: 'Update Failed!' }
            dispatch(errorSet({payload}));
            dispatch(successClear());
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
            dispatch(successSet({payload: {message: 'User deleted!'}}));
            dispatch(errorClear());
            
        } catch (err) {
            const payload = { message: 'Removing user Failed!' }
            dispatch(errorSet({payload}));
            dispatch(successClear());
        }
    }
}

/* ----------------------------------------------------------------------------------
 * User Login. 
 * -------------------------------------------------------------------------------- */
export const login = ({params}) => {
    return async dispatch => {
        try {
            const res = await axios.post('/api/account/login', params);
            
            dispatch(itemSet({payload: res.data}));
            dispatch(errorClear());
            if(res.data.isAdmin){
                Router.push('/admin/manage');
            }else{
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
            dispatch(errorClear());
            Router.push('/login');
        } catch (err){
            const payload = { message: 'Email/password does not match!' };
            dispatch(errorSet({payload}));
        }
    };
}
