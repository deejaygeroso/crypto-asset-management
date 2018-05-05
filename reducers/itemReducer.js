import itemTypes from '../types/itemTypes';

/* ----------------------------------------------------------
 * Reducer for itemsregistration and itemslogin
 * -------------------------------------------------------- */
 export function itemInit(serviceName){
    const ITEM_TYPES = itemTypes.init(serviceName);
    return function item(state = {}, {type, item}){
      switch (type) {
        /*
         * Clear the object.
         */
        case ITEM_TYPES.CLEAR:
          return {}
        /*
         * Set newly assigned data to the item
         */
        case ITEM_TYPES.SET:
          return Object.assign({}, item);

        /*
         * Update data from the fields
         */
        case ITEM_TYPES.PATCH:
          return Object.assign({}, state, item);

        /*
         * Clear the item
         */
        case ITEM_TYPES.REMOVE:
          return {};
          
        /*
         * Return the current state of the item
         */
        default:
          return state;
      }
    }
}
