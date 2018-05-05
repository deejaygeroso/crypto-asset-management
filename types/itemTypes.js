
/* ----------------------------------------------------------------------------------
 * Used for storing an object to redux which is a state container of the app. 
 * 
 * -------------------------------------------------------------------------------- */
const item = {
  init : (SERVICE_NAME) => {
    return{
      SERVICE_NAME,
      SET         : `${SERVICE_NAME.toUpperCase()}_SET`,
      PATCH       : `${SERVICE_NAME.toUpperCase()}_PATCH`,
      CLEAR       : `${SERVICE_NAME.toUpperCase()}_CLEAR`,
      REMOVE      : `${SERVICE_NAME.toUpperCase()}_REMOVE`,
    }
  }
}

export default item;