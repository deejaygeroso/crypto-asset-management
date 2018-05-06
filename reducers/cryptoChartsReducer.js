import itemListTypes from '../types/itemListTypes';
import {
  indexBy as __$indexBy,
  // findWhere as __findWhere$,
  // without as __without$,
} from 'underscore';
import moment from 'moment';
const initialItemListState = []

/* -------------------------------------------------------------------------------- */
/* ----------------------------- array list of data ------------------------------- */
/* -------------------------------------------------------------------------------- */
export function cryptoChartsList(state = initialItemListState, {type, list, item}){
      const ITEMLIST_TYPES = itemListTypes.init('cryptoCharts');
      switch (type) {
        /*
         * Return the intalItemListState. Usaually its just clearing the array.
         */
        case ITEMLIST_TYPES.CLEAR :
            return initialItemListState;

        /*
         * Set new dataList with date & value only used for showing charts on view portfolio.
         */
        case ITEMLIST_TYPES.SET: {
            const cryptoChartsList = [];
            const byId = __$indexBy(list, '_id');
            const allIds = Object.keys(byId);
            allIds && allIds.length!==0 && allIds.map(_id=>{
                cryptoChartsList.push({
                    date : moment(byId[_id].created).format('YYYY-MM-DD'),
                    value: parseFloat(byId[_id].market_cap_usd),
                });
            })

            return Object.assign([], cryptoChartsList);
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
