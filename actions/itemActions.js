import axios from 'axios';
import itemTypes from '../types/itemTypes';
import * as itemListActions from './itemListActions';
import { toasterSuccessMessage, toasterErrorMessage } from '../modules/lib/helpers';
/* ----------------------------------------------------------------------------------
 * Clear item. Same as removing item.
 * -------------------------------------------------------------------------------- */
export const clear = ({serviceName}) => {
      const ITEM_TYPES = itemTypes.init(serviceName);
      return {
            type: ITEM_TYPES.CLEAR,
            serviceName,
      }
}

/* ----------------------------------------------------------------------------------
 * Set new data.
 * -------------------------------------------------------------------------------- */
export const set = ({serviceName, item}) => {
      const ITEM_TYPES = itemTypes.init(serviceName);
      return {
            type: ITEM_TYPES.SET,
            serviceName,
            item,
      }
}

/* ----------------------------------------------------------------------------------
 * Patch the data 
 * -------------------------------------------------------------------------------- */
export const patch = ({serviceName, _id, params}) => {
      const ITEM_TYPES = itemTypes.init(serviceName);
      return{
            type: ITEM_TYPES.PATCH,
            serviceName,
            _id,
            params,
      }
}

export const remove = ({serviceName, _id}) => {
      const ITEM_TYPES = itemTypes.init(serviceName);
      return{
            type: ITEM_TYPES.REMOVE,
            serviceName,
            _id,
      }
}

/* ----------------------------------------------------------------------------------
 * Remove the data. Same as clearing it. 
 * -------------------------------------------------------------------------------- */
export const apiCallRemove = ({serviceName, _id}) => {
      return async dispatch => {
            try{
                  await axios.post(`/api/${serviceName}/remove`, {_id});
                  dispatch(remove({serviceName, _id}))
                  dispatch(itemListActions.removeItem({serviceName, item: {_id}}));
                  toasterSuccessMessage('Link successfully removed!');
            } catch (err) {
                  toasterErrorMessage(`Fail to remove ${serviceName}!`);
            }
      }
}

/* ----------------------------------------------------------------------------------
 * Create new item 
 * -------------------------------------------------------------------------------- */
export const apiCallCreate = ({serviceName, item}) => {
      return async dispatch => {
            try{
                  const res = await axios.post(`/api/${serviceName}/create`, item);
                  dispatch(itemListActions.appendItem({serviceName, item: res && res.data}))
                  toasterSuccessMessage('Item successfuly created!');
            } catch (error) {
                  toasterErrorMessage(`Fail to create ${serviceName}!`);
            }
      }
}

export const apiCallUpdate = ({serviceName, item}) => {
      return async dispatch => {
            try{
                  const res = await axios.post(`/api/${serviceName}/update`, item);
                  dispatch(itemListActions.patchItem({serviceName, item: res.data}));
                  toasterSuccessMessage('Item successfuly updated!');
            } catch (error) {
                  toasterErrorMessage(`Fail to update ${serviceName}!`);
            }
      }
}

/* ----------------------------------------------------------------------------------
 * Find One
 * -------------------------------------------------------------------------------- */
export const apiCallFindByQuery = ({serviceName, item}) => {
      return async dispatch => {
            try {
                  const res = await axios.post(`/api/${serviceName.toLowerCase()}/find/query`, item);
                  dispatch(set({serviceName, item: res.data[0]}));
            } catch (error) {
                  toasterErrorMessage(`Unable to fetch all ${serviceName}!`);
            }
      }
}

