import itemListTypes from '../types/itemListTypes';
import {
  indexBy as __$indexBy,
  // findWhere as __findWhere$,
  // without as __without$,
} from 'underscore';
const initialItemListState = {}

/* -------------------------------------------------------------------------------- */
/* ----------------------------- array list of data ------------------------------- */
/* -------------------------------------------------------------------------------- */
export function itemListInit(serviceName){
  const ITEMLIST_TYPES = itemListTypes.init(serviceName);
  return function itemsList(state = initialItemListState, {type, list, item}){
      switch (type) {

        /*
         * Return the intalItemListState. Usaually its just clearing the array.
         */
        case ITEMLIST_TYPES.CLEAR :
            return initialItemListState;

        /*
         * Set new dataList.
         */
        case ITEMLIST_TYPES.SET: {
            const byId = __$indexBy(list, '_id');
            const allIds = Object.keys(byId);
            return Object.assign({}, { byId, allIds});
        }

        /*
         * Append one data item to the dataList.
         */
        case ITEMLIST_TYPES.APPEND_ITEM: {
            const {allIds, byId} = state; // get current data
            byId[item._id] = item;
            allIds.push(item._id);

            return Object.assign({}, {byId, allIds});
        }

        /*
         * Update data from the item.
         */
        case ITEMLIST_TYPES.PATCH_ITEM: {
          const { byId } = state;
          byId[item._id] = item;
          return Object.assign({}, state, { byId });
        }

        /*
         * Only delete the item from the state.allIds but the data still remain on state.byId.
         */
        case ITEMLIST_TYPES.REMOVE_ITEM: {
            const allIds = state.allIds;
            allIds.splice(allIds.indexOf(item._id), 1); // remove id from state.allIds array

            return Object.assign({}, state, { allIds });
        }

        /* 
         * Just return the current list saved on the state.
         */
        default:
            return state;
      }
    }
}
