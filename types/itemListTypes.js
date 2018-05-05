
/* ----------------------------------------------------------------------------------
 * Used mainly for saving array list of data to redux which is a state container of the app.
 * itemList action types.
 * -------------------------------------------------------------------------------- */
const itemList = {
  init : (SERVICE_NAME) => {
    return{
      SERVICE_NAME,
      SET         : `${SERVICE_NAME.toUpperCase()}_LIST_SET`,
      CLEAR       : `${SERVICE_NAME.toUpperCase()}_LIST_CLEAR`,
      PATCH_ITEM  : `${SERVICE_NAME.toUpperCase()}_LIST_PATCH_ITEM`,
      APPEND_ITEM : `${SERVICE_NAME.toUpperCase()}_LIST_APPEND_ITEM`,
      REMOVE_ITEM : `${SERVICE_NAME.toUpperCase()}_LIST_REMOVE_ITEM`,
    } 
  }
}

export default itemList;