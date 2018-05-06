
import axios from 'axios';
export const ITEMLIST_ACTION_SET      = 'ITEMLIST_ACTION_SET';
// import itemListTypes from '../types/itemListTypes';
import { set } from './itemListActions';
import { toasterErrorMessage } from '../modules/lib/helpers';

/* ----------------------------------------------------------------------------------
 * Find all 
 * -------------------------------------------------------------------------------- */
export const findByQuery = ({serviceName, query}) => {
      return async dispatch => {
            try {
                  const res = await axios.post(`/api/${serviceName.toLowerCase()}/find/query`, query);
                  dispatch(set({serviceName: 'cryptoCharts', list: res.data}));
            } catch (error) {
                  toasterErrorMessage(`Unable to fetch all ${serviceName}!`);
            }
      }
}