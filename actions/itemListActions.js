import axios from 'axios';
export const ITEMLIST_ACTION_SET      = 'ITEMLIST_ACTION_SET';
import itemListTypes from '../types/itemListTypes';
import { toasterErrorMessage } from '../modules/lib/helpers';

/* ----------------------------------------------------------------------------------
 * Set new list of data. 
 * -------------------------------------------------------------------------------- */
export const set = ({serviceName, list}) => {
      const ITEMLIST_TYPES = itemListTypes.init(serviceName);
      return ({
            type: ITEMLIST_TYPES.SET,
            serviceName,
            list,
      });
}

/* ----------------------------------------------------------------------------------
 * Patch a single item on the list. 
 * -------------------------------------------------------------------------------- */
export const patchItem = ({serviceName, item}) => {
      const ITEMLIST_TYPES = itemListTypes.init(serviceName);
      return{
            type: ITEMLIST_TYPES.PATCH_ITEM,
            serviceName,
            item
      };
}

/* ----------------------------------------------------------------------------------
 * Append new item on the list. 
 * -------------------------------------------------------------------------------- */
export const appendItem = ({serviceName, item}) => {
      const ITEMLIST_TYPES = itemListTypes.init(serviceName);
      return{
            type: ITEMLIST_TYPES.APPEND_ITEM,
            serviceName,
            item,
      };
}

/* ----------------------------------------------------------------------------------
 * Remove an item on the list. 
 * -------------------------------------------------------------------------------- */
export const removeItem = ({serviceName, item}) => {
      const ITEMLIST_TYPES = itemListTypes.init(serviceName);
      return {
            type:  ITEMLIST_TYPES.REMOVE_ITEM,
            item: {
                  _id: item._id,
            }
      }
}

/* ----------------------------------------------------------------------------------
 * Find all 
 * -------------------------------------------------------------------------------- */
export const findAll = ({serviceName}) => {
      return async dispatch => {
            try {
                  const res = await axios.post(`/api/${serviceName.toLowerCase()}/find/all`);
                  dispatch(set({serviceName, list: res.data}));
            } catch (error) {
                  toasterErrorMessage('Unable to fetch all users!');
            }
      }
}

/* ----------------------------------------------------------------------------------
 * Find all 
 * -------------------------------------------------------------------------------- */
export const findByQuery = ({serviceName, query}) => {
      return async dispatch => {
            try {
                  const res = await axios.post(`/api/${serviceName.toLowerCase()}/find/query`, query);
                  dispatch(set({serviceName, list: res.data}));
            } catch (error) {
                  toasterErrorMessage('Unable to fetch all users!');
            }
      }
}
