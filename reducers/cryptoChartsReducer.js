import itemListTypes from '../types/itemListTypes';
import {
//   indexBy as __$indexBy,
  pluck as __$pluck,
  // findWhere as __findWhere$,
  // without as __without$,
} from 'underscore';
import moment from 'moment';
const initialItemListState = {};

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
            var labels = [];
            var price_eth = [];
            list && list.length!==0 && list.map(data=>{
                labels.push(moment.unix(data.last_updated).format("LL"))
                price_eth.push(data && data.price_eth ? data.price_eth : 0);
            })
            // const labels = __$pluck(list, 'last_updated')
            const price_usd = __$pluck(list, 'price_usd')
            const price_btc = __$pluck(list, 'price_btc')

            return Object.assign({}, {labels, price_usd, price_btc, price_eth});
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
