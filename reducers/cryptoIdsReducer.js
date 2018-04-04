import * as ACTION_TYPES from '../types/cryptoIdsTypes';

const initialCrypto = [];
export const cryptoIds = (state = initialCrypto, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.CRYPTO_IDS_SET: {
            let cryptoIds = [];
            payload.map(data =>{
                cryptoIds.push({id: data.id, value: data.id, label: data.name, symbol: data.symbol})
            });
            return cryptoIds;
        }
        case ACTION_TYPES.CRYPTO_IDS_CLEAR:
            return initialCrypto;
        default:
            return state;
    }
}

// must double check latera
const initialCryptoIdsError = { message: '' };
export const cryptoIdsError = (state = initialCryptoIdsError, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.CRYPTO_IDS_ERROR_SET: {
            const { message } = payload;
            return Object.assign({}, state, {message});
        }
        case ACTION_TYPES.CRYPTO_IDS_ERROR_CLEAR:
            return initialCryptoIdsError;
        default:
            return state;
    }
}
