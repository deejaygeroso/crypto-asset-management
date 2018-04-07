import Router from 'next/router';
import axios from 'axios';
import * as ACTION_TYPES from '../types/userTypes';

export const itemListSet = ({payload}) => ({
    type: ACTION_TYPES.USERS_LIST_SET,
    payload,
})

export const itemListAppend = ({item}) => ({
    type: ACTION_TYPES.USERS_LIST_APPEND,
    item,
})

export const itemSet = ({payload}) => ({
    type: ACTION_TYPES.USER_SET,
    payload,
})

export const itemClear = ({payload}) => ({
    type: ACTION_TYPES.USER_CLEAR,
    payload,
})

export const successSet = ({payload}) => ({
    type: ACTION_TYPES.USER_SUCCESS_SET,
    payload,
})

export const successClear = () => ({
    type: ACTION_TYPES.USER_SUCCESS_CLEAR,
})

export const errorSet = ({payload}) => ({
    type: ACTION_TYPES.USER_ERROR_SET,
    payload,
})

export const errorClear = () => ({
    type: ACTION_TYPES.USER_ERROR_CLEAR,
})

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

            // global data used for current logged in user
            dispatch(itemSet({payload: res.data}));
            dispatch(errorClear());

        } catch (err) {
            const payload = { message: 'Unable to find user!' }
            dispatch(errorSet({payload}));
        }
    };
}

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

// not yet used
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

export const login = ({params}) => {
    return async dispatch => {
        try {
            const res = await axios.post('/api/account/login', params);
            dispatch(itemSet({payload: res.data}));
            dispatch(errorClear());
            if(res.data.isAdmin){
                Router.push('/admin/user');
            }else{
                Router.push('/portfolio/list');
            }

        } catch (err){
            const payload = { message: 'Email/password does not match!' }
            dispatch(errorSet({payload}));
        }
    };
}

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
