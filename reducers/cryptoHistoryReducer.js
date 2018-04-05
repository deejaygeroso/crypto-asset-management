import * as ACTION_TYPES from '../types/cryptoHistoryTypes';
import {
    // indexBy as __$indexBy,
    groupBy as __$groupBy,
    reduce  as __$reduce,
} from 'underscore';

export const cryptoHistory = (state = {}, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.CRYPTO_HISTORY_SET: {
            return __$groupBy(payload, (data)=>{ return data.id; });
        }
        default:
            return state;
    }
}

export const cryptoAth = (state = {}, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.CRYPTO_ATH_SET: {

            // group crypto data by its id
            const groupedData = __$groupBy(payload, (data)=>{ return data.id; });

            const cryptoAth = {}
            Object.keys(groupedData).map((key)=>{

                // get all volume_history value converted to float in array form
                let volume_history = groupedData[key].map(a => {
                    if(a['price_usd']){
                        return parseFloat(a['price_usd']);
                    }else{
                        return 0;
                    }
                });

                // highest value of ath
                const ath = __$reduce(volume_history, function(a,b){ return a>b?a:b });
                cryptoAth[key] = ath
            })

            return Object.assign({}, cryptoAth);
        }
        default:
            return state;
    }
}

export const cryptoAtl = (state = {}, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.CRYPTO_ATL_SET: {

            // group crypto data by its id
            const groupedData = __$groupBy(payload, (data)=>{ return data.id; });

            const cryptoAtl = {}
            Object.keys(groupedData).map((key)=>{

                // get all volume_history value converted to float in array form
                let volume_history = groupedData[key].map(a => {
                    if(a['price_usd']){
                        return parseFloat(a['price_usd']);
                    }else{
                        return 0;
                    }
                });

                // lowest value of of the list of volume history per coin
                const ath = __$reduce(volume_history, function(a,b){ return a<b?a:b });
                cryptoAtl[key] = ath
            })

            return Object.assign({}, cryptoAtl);
        }
        default:
            return state;
    }
}
