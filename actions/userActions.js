import Router from 'next/router';
import axios from 'axios';
import * as ACTION_TYPES from '../types/userTypes';

export const usersListSet = ({payload}) => ({
    type: ACTION_TYPES.USERS_LIST_SET,
    payload,
})

export const usersListAppend = ({item}) => ({
    type: ACTION_TYPES.USERS_LIST_APPEND,
    item,
})

export const userSet = ({payload}) => ({
    type: ACTION_TYPES.USER_SET,
    payload,
})

export const userClear = ({payload}) => ({
    type: ACTION_TYPES.USER_CLEAR,
    payload,
})

export const userSuccessSet = ({payload}) => ({
    type: ACTION_TYPES.USER_SUCCESS_SET,
    payload,
})

export const userSuccessClear = () => ({
    type: ACTION_TYPES.USER_SUCCESS_CLEAR,
})

export const userErrorSet = ({payload}) => ({
    type: ACTION_TYPES.USER_ERROR_SET,
    payload,
})

export const userErrorClear = () => ({
    type: ACTION_TYPES.USER_ERROR_CLEAR,
})

export const usersListFindAll = () => {
    return async dispatch => {
        try {
            const res = await axios.post('/api/account/users');
            dispatch(usersListSet({payload: res.data}));
            dispatch(userErrorClear());
        } catch (err) {
            const payload = { message: 'Unable to fetch all users!' }
            dispatch(userErrorSet({payload}));
        }
    }
}

/* ----------------------------------------------------------
 * This function is like the main entry point of all the data
 * all data and api call is acquired through here
 * -------------------------------------------------------- */
export const userFind = ({params}) => {
    const {_id} = params;
    return async dispatch => {
        try {
            const res = await axios.post('/api/account/find', {_id});

            // global data used for current logged in user
            dispatch(userSet({payload: res.data}));

            // this is used for getting the last 7 days data of users selected crypto & ath and atl
            // dispatch(cryptoHistoryActions.find({params: {ids: res.data.crypto_ids}}));
            // dispatch(cryptoHistoryActions.calculatePriceAthAtl({params: {ids: res.data.crypto_ids}}));

            // getting of all crypto for dropdown select 2 and global data for crypto
            // dispatch(cryptoListFetch({params: { user: res.data }}));
            // dispatch(cryptoGlobalFetch());

            dispatch(userErrorClear());

        } catch (err) {
            const payload = { message: 'Unable to find user!' }
            dispatch(userErrorSet({payload}));
        }
    };
}

export const userCreate = ({params}) => {
    return async dispatch => {
        try {
            const res = await axios.post('/api/account/register', params);
            dispatch(userSet({payload: res.data}));
            dispatch(usersListAppend({item: res.data}));
            dispatch(userErrorClear());
        } catch (err) {
            const payload = { message: 'Email already exist!' }
            dispatch(userErrorSet({payload}));
        }
    };
}

// not yet used
export const userUpdate = ({params}) => {
    return async dispatch => {
        try {
            const res = await axios.post('/api/account/update', params);
            dispatch(userSet({payload: res.data}));
            dispatch(userSuccessSet({payload: {message: 'Update successful!'}}));
            dispatch(userErrorClear());
        } catch (err) {
            const payload = { message: 'Update Failed!' }
            dispatch(userErrorSet({payload}));
            dispatch(userSuccessClear());
        }
    };
}

export const userLogin = ({params}) => {
    return async dispatch => {
        try {
            const res = await axios.post('/api/account/login', params);
            dispatch(userSet({payload: res.data}));
            dispatch(userErrorClear());
            if(res.data.isAdmin){
                Router.push('/admin/user');
            }else{
                Router.push('/portfolio/list');
            }

        } catch (err){
            const payload = { message: 'Email/password does not match!' }
            dispatch(userErrorSet({payload}));
        }
    };
}

export const userLogout = () => {
    return async dispatch => {
        try {
            const res = await axios.post('/account/logout');
            dispatch(userSet({payload: res.data}));
            dispatch(userErrorClear());
            Router.push('/login');
        } catch (err){
            const payload = { message: 'Email/password does not match!' };
            dispatch(userErrorSet({payload}));
        }
    };
}
